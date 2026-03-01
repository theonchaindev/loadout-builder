"use client";

import { GameMode } from "@/lib/types";

interface GameSelectorProps {
  selected: GameMode;
  onSelect: (mode: GameMode) => void;
}

const GAMES: { id: GameMode; label: string; subtitle: string; icon: string; className: string }[] = [
  {
    id: "modern",
    label: "Modern Warfare",
    subtitle: "Ground War Tactics",
    icon: "🎖️",
    className: "modern",
  },
  {
    id: "blackops",
    label: "Black Ops",
    subtitle: "Cold War Arsenal",
    icon: "☠️",
    className: "blackops",
  },
  {
    id: "futuristic",
    label: "Future Warfare",
    subtitle: "Sci-Fi Combat",
    icon: "🚀",
    className: "futuristic",
  },
];

export default function GameSelector({ selected, onSelect }: GameSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="section-label">// SELECT GAME MODE</div>
      <div className="flex flex-col gap-2 sm:flex-row">
        {GAMES.map((game) => (
          <button
            key={game.id}
            onClick={() => onSelect(game.id)}
            className={`game-badge ${game.className} ${selected === game.id ? "active" : ""}`}
            style={{ flex: 1, flexDirection: "column", gap: "0.15rem", padding: "0.6rem 0.75rem", alignItems: "flex-start" }}
          >
            <span style={{ fontSize: "1rem" }}>{game.icon}</span>
            <span style={{ fontWeight: 700, letterSpacing: "0.08em" }}>{game.label}</span>
            <span style={{ fontSize: "0.55rem", opacity: 0.7, letterSpacing: "0.1em" }}>{game.subtitle}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
