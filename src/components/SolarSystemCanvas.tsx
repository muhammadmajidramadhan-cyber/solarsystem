import { useRef, useEffect, useCallback } from "react";
import { planets, PlanetData } from "../data/planets";

interface SolarSystemCanvasProps {
  isPlaying: boolean;
  speed: number;
  selectedPlanet: PlanetData | null;
  onSelectPlanet: (planet: PlanetData | null) => void;
  hoveredPlanet: string | null;
  onHoverPlanet: (name: string | null) => void;
}

export default function SolarSystemCanvas({
  isPlaying,
  speed,
  selectedPlanet,
  onSelectPlanet,
  hoveredPlanet,
  onHoverPlanet,
}: SolarSystemCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const anglesRef = useRef<number[]>(planets.map(() => Math.random() * Math.PI * 2));
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const planetPositionsRef = useRef<{ x: number; y: number; r: number; planet: PlanetData }[]>([]);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw starfield background
      drawStars(ctx, width, height);

      // Draw orbit paths
      planets.forEach((planet) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle =
          selectedPlanet?.name === planet.name
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = selectedPlanet?.name === planet.name ? 1.5 : 0.5;
        ctx.setLineDash(selectedPlanet?.name === planet.name ? [] : [4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw Sun
      drawSun(ctx, centerX, centerY);

      // Draw planets
      const positions: { x: number; y: number; r: number; planet: PlanetData }[] = [];
      planets.forEach((planet, i) => {
        const angle = anglesRef.current[i];
        const x = centerX + Math.cos(angle) * planet.orbitRadius;
        const y = centerY + Math.sin(angle) * planet.orbitRadius;

        positions.push({ x, y, r: planet.radius, planet });

        // Planet glow
        const isSelected = selectedPlanet?.name === planet.name;
        const isHovered = hoveredPlanet === planet.name;

        if (isSelected || isHovered) {
          const gradient = ctx.createRadialGradient(x, y, planet.radius, x, y, planet.radius * 3);
          gradient.addColorStop(0, planet.glowColor + "80");
          gradient.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(x, y, planet.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Planet body
        const planetGradient = ctx.createRadialGradient(
          x - planet.radius * 0.3,
          y - planet.radius * 0.3,
          0,
          x,
          y,
          planet.radius
        );
        planetGradient.addColorStop(0, lightenColor(planet.color, 40));
        planetGradient.addColorStop(0.7, planet.color);
        planetGradient.addColorStop(1, planet.glowColor);

        ctx.beginPath();
        ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = planetGradient;
        ctx.fill();

        // Saturn's rings
        if (planet.name === "Saturn") {
          ctx.beginPath();
          ctx.ellipse(x, y, planet.radius * 2.2, planet.radius * 0.5, -0.3, 0, Math.PI * 2);
          ctx.strokeStyle = "#e8d5a080";
          ctx.lineWidth = 2.5;
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(x, y, planet.radius * 1.8, planet.radius * 0.4, -0.3, 0, Math.PI * 2);
          ctx.strokeStyle = "#c9b07060";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Planet label
        if (isSelected || isHovered) {
          ctx.font = "bold 11px Inter, system-ui, sans-serif";
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.fillText(planet.name, x, y - planet.radius - 8);
        }
      });

      planetPositionsRef.current = positions;
    },
    [selectedPlanet, hoveredPlanet]
  );

  const animate = useCallback(
    (timestamp: number) => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      if (isPlaying) {
        const delta = timestamp - lastTimeRef.current;
        const baseSpeed = 0.0003;

        planets.forEach((planet, i) => {
          anglesRef.current[i] += baseSpeed * planet.speed * speed * delta;
        });
      }

      lastTimeRef.current = timestamp;
      draw(ctx, width, height);
      animationRef.current = requestAnimationFrame(animate);
    },
    [isPlaying, speed, draw]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let clicked = false;
    for (const pos of planetPositionsRef.current) {
      const dist = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      const hitRadius = Math.max(pos.r + 5, 12);
      if (dist <= hitRadius) {
        onSelectPlanet(pos.planet);
        clicked = true;
        break;
      }
    }
    if (!clicked) {
      onSelectPlanet(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let found = false;
    for (const pos of planetPositionsRef.current) {
      const dist = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      const hitRadius = Math.max(pos.r + 5, 12);
      if (dist <= hitRadius) {
        onHoverPlanet(pos.planet.name);
        canvas.style.cursor = "pointer";
        found = true;
        break;
      }
    }
    if (!found) {
      onHoverPlanet(null);
      canvas.style.cursor = "default";
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className="w-full h-full"
    />
  );
}

// Helper functions
function drawStars(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // Use seeded positions based on canvas size for consistent stars
  const starCount = 150;
  for (let i = 0; i < starCount; i++) {
    const seed = i * 7919;
    const x = (seed * 13) % width;
    const y = (seed * 17) % height;
    const size = ((seed * 3) % 3) * 0.4 + 0.3;
    const alpha = ((seed * 11) % 100) / 200 + 0.3;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
  }
}

function drawSun(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Outer glow
  const outerGlow = ctx.createRadialGradient(x, y, 15, x, y, 50);
  outerGlow.addColorStop(0, "rgba(255, 200, 50, 0.4)");
  outerGlow.addColorStop(0.5, "rgba(255, 150, 0, 0.1)");
  outerGlow.addColorStop(1, "transparent");
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI * 2);
  ctx.fillStyle = outerGlow;
  ctx.fill();

  // Sun body
  const sunGradient = ctx.createRadialGradient(x - 5, y - 5, 0, x, y, 25);
  sunGradient.addColorStop(0, "#fff8e0");
  sunGradient.addColorStop(0.3, "#ffdd44");
  sunGradient.addColorStop(0.7, "#ffaa00");
  sunGradient.addColorStop(1, "#ff6600");
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  ctx.fillStyle = sunGradient;
  ctx.fill();

  // Inner corona
  const corona = ctx.createRadialGradient(x, y, 22, x, y, 35);
  corona.addColorStop(0, "rgba(255, 200, 50, 0.3)");
  corona.addColorStop(1, "transparent");
  ctx.beginPath();
  ctx.arc(x, y, 35, 0, Math.PI * 2);
  ctx.fillStyle = corona;
  ctx.fill();
}

function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + percent);
  const g = Math.min(255, ((num >> 8) & 0xff) + percent);
  const b = Math.min(255, (num & 0xff) + percent);
  return `rgb(${r}, ${g}, ${b})`;
}
