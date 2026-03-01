"use client";

import { Attachment } from "@/lib/types";

interface AttachmentSelectorProps {
  attachments: Attachment[];
  selected: Attachment[];
  maxAttachments?: number;
  onToggle: (attachment: Attachment) => void;
}

const CATEGORY_ORDER = ["muzzle", "barrel", "optic", "underbarrel", "stock", "laser", "magazine"];

export default function AttachmentSelector({
  attachments,
  selected,
  maxAttachments = 5,
  onToggle,
}: AttachmentSelectorProps) {
  const grouped = CATEGORY_ORDER.reduce<Record<string, Attachment[]>>((acc, cat) => {
    const items = attachments.filter((a) => a.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  const isSelected = (id: string) => selected.some((a) => a.id === id);
  const isFull = selected.length >= maxAttachments;

  return (
    <div className="flex flex-col gap-2">
      <div className="section-label flex items-center justify-between">
        <span>// ATTACHMENTS</span>
        <span style={{ color: selected.length === maxAttachments ? "#ff3b3b" : "#00d4ff", fontSize: "0.6rem" }}>
          {selected.length}/{maxAttachments}
        </span>
      </div>
      <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <div style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "#4a5568", textTransform: "uppercase", marginBottom: "0.3rem" }}>
              — {category}
            </div>
            <div className="flex flex-col gap-1">
              {items.map((att) => {
                const sel = isSelected(att.id);
                const disabled = !sel && isFull;
                return (
                  <button
                    key={att.id}
                    onClick={() => !disabled && onToggle(att)}
                    disabled={disabled}
                    className={`select-item text-left px-3 py-1.5 flex items-center justify-between ${sel ? "selected" : ""} ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: "0.8rem" }}>{att.icon}</span>
                      <span style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}>{att.name}</span>
                    </div>
                    <span style={{ fontSize: "0.55rem", color: sel ? "#00d4ff" : "#4a5568", letterSpacing: "0.05em" }}>
                      {att.bonus}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
