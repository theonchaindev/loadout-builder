"use client";

import { Perk } from "@/lib/types";

interface PerkSelectorProps {
  label: string;
  tier: string;
  perks: Perk[];
  selected: Perk | null;
  onSelect: (perk: Perk | null) => void;
}

export default function PerkSelector({ label, tier, perks, selected, onSelect }: PerkSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <span className="section-label" style={{ borderBottom: "none", paddingBottom: 0 }}>{label}</span>
        <span style={{ fontSize: "0.5rem", color: "#4a5568", letterSpacing: "0.15em" }}>{tier}</span>
      </div>
      <div className="flex flex-col gap-1">
        {perks.map((perk) => (
          <button
            key={perk.id}
            onClick={() => onSelect(selected?.id === perk.id ? null : perk)}
            className={`select-item text-left px-3 py-1.5 flex items-center gap-2 ${selected?.id === perk.id ? "selected" : ""}`}
          >
            <span style={{ fontSize: "1rem", flexShrink: 0 }}>{perk.icon}</span>
            <div className="flex flex-col min-w-0">
              <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em" }}>{perk.name}</span>
              <span style={{ fontSize: "0.55rem", color: "#4a5568", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {perk.description}
              </span>
            </div>
            {selected?.id === perk.id && (
              <span style={{ fontSize: "0.55rem", color: "#00d4ff", marginLeft: "auto", flexShrink: 0 }}>✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
