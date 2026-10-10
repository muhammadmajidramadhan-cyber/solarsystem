interface ControlsProps {
  isPlaying: boolean;
  speed: number;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function Controls({ isPlaying, speed, onTogglePlay, onSpeedChange }: ControlsProps) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-2xl z-20">
      {/* Play/Pause Button */}
      <button
        onClick={onTogglePlay}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-110 active:scale-95"
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
            <rect x="3" y="2" width="4" height="12" rx="1" />
            <rect x="9" y="2" width="4" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
            <path d="M4 2 L14 8 L4 14 Z" />
          </svg>
        )}
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-white/20" />

      {/* Speed Control */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-white/50 font-medium">Speed</span>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="w-28 h-1.5 appearance-none bg-white/20 rounded-full cursor-pointer accent-blue-400
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400 
            [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(96,165,250,0.5)]
            [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <span className="text-xs text-white/70 font-mono w-10 text-right">{speed.toFixed(1)}x</span>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-white/20" />

      {/* Speed Presets */}
      <div className="flex items-center gap-1.5">
        {[0.5, 1, 2, 5].map((preset) => (
          <button
            key={preset}
            onClick={() => onSpeedChange(preset)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              Math.abs(speed - preset) < 0.05
                ? "bg-blue-500/30 text-blue-300 border border-blue-400/40"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70 border border-transparent"
            }`}
          >
            {preset}x
          </button>
        ))}
      </div>
    </div>
  );
}
