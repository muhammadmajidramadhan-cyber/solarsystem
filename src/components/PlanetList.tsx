import { planets, PlanetData } from "../data/planets";

interface PlanetListProps {
  selectedPlanet: PlanetData | null;
  onSelectPlanet: (planet: PlanetData) => void;
  hoveredPlanet: string | null;
}

export default function PlanetList({ selectedPlanet, onSelectPlanet, hoveredPlanet }: PlanetListProps) {
  return (
    <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl z-20">
      <h3 className="text-xs uppercase tracking-wider text-white/40 mb-3 font-medium">Planets</h3>
      <div className="space-y-1">
        {planets.map((planet) => {
          const isSelected = selectedPlanet?.name === planet.name;
          const isHovered = hoveredPlanet === planet.name;
          return (
            <button
              key={planet.name}
              onClick={() => onSelectPlanet(planet)}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left transition-all duration-200 ${
                isSelected
                  ? "bg-white/15 text-white"
                  : isHovered
                  ? "bg-white/8 text-white/90"
                  : "text-white/60 hover:bg-white/5 hover:text-white/80"
              }`}
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: planet.color,
                  boxShadow: isSelected || isHovered ? `0 0 8px ${planet.glowColor}` : "none",
                }}
              />
              <span className="text-sm font-medium">{planet.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
