"use client";

import { Weapon } from "@/lib/types";
import StatBar from "./StatBar";

interface WeaponSelectorProps {
  label: string;
  weapons: Weapon[];
  selected: Weapon | null;
  onSelect: (weapon: Weapon | null) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  assault: "AR",
  smg: "SMG",
  lmg: "LMG",
  sniper: "SNR",
  shotgun: "SG",
  pistol: "PST",
  launcher: "LNC",
  melee: "MEL",
  special: "SPC",
};

export default function WeaponSelector({ label, weapons, selected, onSelect }: WeaponSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="section-label">{label}</div>
      <div className="flex flex-col gap-1 max-h-52 overflow-y-auto pr-1">
        {weapons.map((weapon) => (
          <button
            key={weapon.id}
            onClick={() => onSelect(selected?.id === weapon.id ? null : weapon)}
            className={`select-item text-left px-3 py-2 ${selected?.id === weapon.id ? "selected" : ""}`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span style={{ fontSize: "1rem" }}>{weapon.icon}</span>
                <div className="flex flex-col min-w-0">
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {weapon.name}
                  </span>
                  <span style={{ fontSize: "0.55rem", letterSpacing: "0.1em", color: "#4a5568" }}>
                    [{CATEGORY_LABELS[weapon.category] || weapon.category.toUpperCase()}]
                  </span>
                </div>
              </div>
              {selected?.id === weapon.id && (
                <span style={{ fontSize: "0.6rem", color: "#00d4ff", flexShrink: 0 }}>✓ EQUIPPED</span>
              )}
            </div>
            {selected?.id === weapon.id && (
              <div className="mt-2 flex flex-col gap-1">
                <StatBar label="DMG" value={weapon.damage} compact />
                <StatBar label="RNG" value={weapon.range} color="#22c55e" compact />
                <StatBar label="MOB" value={weapon.mobility} color="#f59e0b" compact />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
