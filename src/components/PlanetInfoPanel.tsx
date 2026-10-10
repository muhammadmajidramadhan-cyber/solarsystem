import { PlanetData, planets } from "../data/planets";

interface PlanetInfoPanelProps {
  planet: PlanetData | null;
  onClose: () => void;
}

export default function PlanetInfoPanel({ planet, onClose }: PlanetInfoPanelProps) {
  if (!planet) return null;

  return (
    <div className="absolute top-4 right-4 w-80 bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl z-20 animate-slide-in">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white"
      >
        ✕
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${lighten(planet.color)}, ${planet.color})`,
            boxShadow: `0 0 20px ${planet.glowColor}60`,
          }}
        >
          {planet.emoji}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{planet.name}</h2>
          <p className="text-xs text-white/50">Planet #{planets.indexOf(planet) + 1} from the Sun</p>
        </div>
      </div>

      <p className="text-sm text-white/70 mb-4 leading-relaxed">{planet.description}</p>

      <div className="space-y-2.5">
        <InfoRow icon="📏" label="Diameter" value={planet.realDiameter} />
        <InfoRow icon="🌞" label="Distance from Sun" value={planet.realDistance} />
        <InfoRow icon="🔄" label="Orbital Period" value={planet.orbitalPeriod} />
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2">
      <span className="text-lg">{icon}</span>
      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-wider text-white/40">{label}</p>
        <p className="text-sm font-medium text-white/90">{value}</p>
      </div>
    </div>
  );
}

function lighten(hex: string): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + 60);
  const g = Math.min(255, ((num >> 8) & 0xff) + 60);
  const b = Math.min(255, (num & 0xff) + 60);
  return `rgb(${r}, ${g}, ${b})`;
}


