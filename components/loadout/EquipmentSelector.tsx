"use client";

import { Equipment } from "@/lib/types";

interface EquipmentSelectorProps {
  label: string;
  items: Equipment[];
  selected: Equipment | null;
  onSelect: (item: Equipment | null) => void;
}

export default function EquipmentSelector({ label, items, selected, onSelect }: EquipmentSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="section-label">{label}</div>
      <div className="grid grid-cols-2 gap-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(selected?.id === item.id ? null : item)}
            className={`select-item text-left px-2 py-1.5 flex items-center gap-1.5 ${selected?.id === item.id ? "selected" : ""}`}
          >
            <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>{item.icon}</span>
            <div className="flex flex-col min-w-0">
              <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.name}
              </span>
              <span style={{ fontSize: "0.5rem", color: "#4a5568", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.description}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
