import { useState, useEffect, useCallback } from "react";
import SolarSystemCanvas from "./components/SolarSystemCanvas";
import PlanetInfoPanel from "./components/PlanetInfoPanel";
import PlanetList from "./components/PlanetList";
import Controls from "./components/Controls";
import { PlanetData } from "./data/planets";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(Math.max(0.1, Math.min(10, newSpeed)));
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleTogglePlay();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setSpeed((prev) => {
        const delta = e.deltaY > 0 ? -0.2 : 0.2;
        return Math.max(0.1, Math.min(10, prev + delta));
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handleTogglePlay]);

  return (
    <div className="w-screen h-screen bg-[#0a0a1a] overflow-hidden relative">
      {/* Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
        <h1 className="text-2xl font-bold text-white/90 tracking-wide">
          ☀️ Solar System Explorer
        </h1>
        <p className="text-xs text-white/40 mt-1">Click on a planet to learn more</p>
      </div>

      {/* Canvas */}
      <div className="w-full h-full">
        <SolarSystemCanvas
          isPlaying={isPlaying}
          speed={speed}
          selectedPlanet={selectedPlanet}
          onSelectPlanet={setSelectedPlanet}
          hoveredPlanet={hoveredPlanet}
          onHoverPlanet={setHoveredPlanet}
        />
      </div>

      {/* Planet List */}
      <PlanetList
        selectedPlanet={selectedPlanet}
        onSelectPlanet={setSelectedPlanet}
        hoveredPlanet={hoveredPlanet}
      />

      {/* Info Panel */}
      <PlanetInfoPanel planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />

      {/* Controls */}
      <Controls
        isPlaying={isPlaying}
        speed={speed}
        onTogglePlay={handleTogglePlay}
        onSpeedChange={handleSpeedChange}
      />

      {/* Keyboard hint */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-[10px] text-white/20 z-10 pointer-events-none">
        Space to play/pause • Scroll to adjust speed
      </div>
    </div>
  );
}
