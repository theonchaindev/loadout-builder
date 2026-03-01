"use client";

interface StatBarProps {
  label: string;
  value: number;
  color?: string;
  compact?: boolean;
}

export default function StatBar({ label, value, color = "#00d4ff", compact = false }: StatBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={compact ? "flex items-center gap-2" : "flex flex-col gap-1"}>
      {!compact && (
        <div className="flex justify-between items-center">
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: "#8899aa", textTransform: "uppercase" }}>
            {label}
          </span>
          <span style={{ fontSize: "0.6rem", color, fontWeight: 700 }}>{clamped}</span>
        </div>
      )}
      {compact && (
        <span style={{ fontSize: "0.55rem", letterSpacing: "0.1em", color: "#8899aa", textTransform: "uppercase", whiteSpace: "nowrap", minWidth: "52px" }}>
          {label}
        </span>
      )}
      <div
        className="stat-bar-track"
        style={{ flex: compact ? 1 : undefined }}
      >
        <div
          className="stat-bar-fill"
          style={{
            width: `${clamped}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 6px ${color}60`,
          }}
        />
      </div>
      {compact && (
        <span style={{ fontSize: "0.55rem", color, fontWeight: 700, minWidth: "20px", textAlign: "right" }}>
          {clamped}
        </span>
      )}
    </div>
  );
}
