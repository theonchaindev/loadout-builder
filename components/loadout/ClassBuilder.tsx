"use client";

import { useState, useCallback } from "react";
import { GameMode, Loadout, Weapon, Attachment, Perk, Equipment } from "@/lib/types";
import weaponsData from "@/data/weapons.json";
import attachmentsData from "@/data/attachments.json";
import perksData from "@/data/perks.json";
import equipmentData from "@/data/equipment.json";
import GameSelector from "./GameSelector";
import WeaponSelector from "./WeaponSelector";
import AttachmentSelector from "./AttachmentSelector";
import PerkSelector from "./PerkSelector";
import EquipmentSelector from "./EquipmentSelector";
import LoadoutCard from "./LoadoutCard";
import ShareButton from "./ShareButton";

const weapons = weaponsData as unknown as Record<string, { primary: Weapon[]; secondary: Weapon[] }>;
const attachments = attachmentsData as unknown as Record<string, Attachment[]>;
const perks = perksData as unknown as Record<string, { tier1: Perk[]; tier2: Perk[]; tier3: Perk[] }>;
const equipment = equipmentData as unknown as Record<string, { tactical: Equipment[]; lethal: Equipment[] }> & {
  fieldUpgrades: Record<string, Equipment[]>;
};

const DEFAULT_LOADOUT: Loadout = {
  className: "",
  gameMode: "modern",
  primary: null,
  secondary: null,
  attachments: [],
  tactical: null,
  lethal: null,
  perk1: null,
  perk2: null,
  perk3: null,
  fieldUpgrade: null,
};

type ActiveSection =
  | "primary"
  | "secondary"
  | "attachments"
  | "tactical"
  | "lethal"
  | "perk1"
  | "perk2"
  | "perk3"
  | "fieldupgrade"
  | null;

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export default function ClassBuilder() {
  const [loadout, setLoadout] = useState<Loadout>(DEFAULT_LOADOUT);
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  const mode = loadout.gameMode;
  const modeWeapons = weapons[mode];
  const modeAttachments = attachments[mode] || [];
  const modePerks = perks[mode];
  const modeEquipment = equipment[mode] || { tactical: [], lethal: [] };
  const modeFieldUpgrades = equipment.fieldUpgrades?.[mode] || [];

  const setMode = useCallback((gameMode: GameMode) => {
    setLoadout({ ...DEFAULT_LOADOUT, gameMode, className: loadout.className });
    setActiveSection(null);
  }, [loadout.className]);

  const setClassName = (name: string) => setLoadout((l) => ({ ...l, className: name }));

  const setPrimary = (w: Weapon | null) => setLoadout((l) => ({ ...l, primary: w }));
  const setSecondary = (w: Weapon | null) => setLoadout((l) => ({ ...l, secondary: w }));

  const toggleAttachment = (att: Attachment) => {
    setLoadout((l) => {
      const exists = l.attachments.find((a) => a.id === att.id);
      if (exists) return { ...l, attachments: l.attachments.filter((a) => a.id !== att.id) };
      if (l.attachments.length >= 5) return l;
      return { ...l, attachments: [...l.attachments, att] };
    });
  };

  const setTactical = (e: Equipment | null) => setLoadout((l) => ({ ...l, tactical: e }));
  const setLethal = (e: Equipment | null) => setLoadout((l) => ({ ...l, lethal: e }));
  const setPerk1 = (p: Perk | null) => setLoadout((l) => ({ ...l, perk1: p }));
  const setPerk2 = (p: Perk | null) => setLoadout((l) => ({ ...l, perk2: p }));
  const setPerk3 = (p: Perk | null) => setLoadout((l) => ({ ...l, perk3: p }));
  const setFieldUpgrade = (e: Equipment | null) => setLoadout((l) => ({ ...l, fieldUpgrade: e }));

  const randomize = () => {
    const newLoadout: Loadout = {
      className: ["GHOST", "REAPER", "PHANTOM", "HUNTER", "NEMESIS", "WRAITH", "SHADOW"][
        Math.floor(Math.random() * 7)
      ],
      gameMode: mode,
      primary: getRandom(modeWeapons.primary),
      secondary: getRandom(modeWeapons.secondary),
      attachments: pickN(modeAttachments, Math.floor(Math.random() * 3) + 2),
      tactical: getRandom(modeEquipment.tactical),
      lethal: getRandom(modeEquipment.lethal),
      perk1: getRandom(modePerks.tier1),
      perk2: getRandom(modePerks.tier2),
      perk3: getRandom(modePerks.tier3),
      fieldUpgrade: getRandom(modeFieldUpgrades),
    };
    setLoadout(newLoadout);
    setActiveSection(null);
  };

  const clearClass = () => {
    setLoadout({ ...DEFAULT_LOADOUT, gameMode: mode, className: "" });
    setActiveSection(null);
  };

  const toggle = (section: ActiveSection) =>
    setActiveSection((prev) => (prev === section ? null : section));

  const slotFilled = (val: unknown) => val !== null && val !== undefined;

  type SlotDef = {
    id: ActiveSection;
    label: string;
    value: string;
    filled: boolean;
  };

  const slots: SlotDef[] = [
    {
      id: "primary",
      label: "PRIMARY",
      value: loadout.primary?.name ?? "— SELECT —",
      filled: slotFilled(loadout.primary),
    },
    {
      id: "attachments",
      label: "ATTACHMENTS",
      value:
        loadout.attachments.length > 0
          ? `${loadout.attachments.length} EQUIPPED`
          : "— SELECT —",
      filled: loadout.attachments.length > 0,
    },
    {
      id: "secondary",
      label: "SECONDARY",
      value: loadout.secondary?.name ?? "— SELECT —",
      filled: slotFilled(loadout.secondary),
    },
    {
      id: "tactical",
      label: "TACTICAL",
      value: loadout.tactical?.name ?? "— SELECT —",
      filled: slotFilled(loadout.tactical),
    },
    {
      id: "lethal",
      label: "LETHAL",
      value: loadout.lethal?.name ?? "— SELECT —",
      filled: slotFilled(loadout.lethal),
    },
    {
      id: "perk1",
      label: "PERK 1",
      value: loadout.perk1?.name ?? "— SELECT —",
      filled: slotFilled(loadout.perk1),
    },
    {
      id: "perk2",
      label: "PERK 2",
      value: loadout.perk2?.name ?? "— SELECT —",
      filled: slotFilled(loadout.perk2),
    },
    {
      id: "perk3",
      label: "PERK 3",
      value: loadout.perk3?.name ?? "— SELECT —",
      filled: slotFilled(loadout.perk3),
    },
    {
      id: "fieldupgrade",
      label: "FIELD UPGRADE",
      value: loadout.fieldUpgrade?.name ?? "— SELECT —",
      filled: slotFilled(loadout.fieldUpgrade),
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* ─── LEFT PANEL: Builder ─── */}
      <div
        className="hud-panel flex flex-col gap-4 p-4 w-full lg:w-96 lg:min-w-96 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 100px)" }}
      >
        {/* Game Mode */}
        <GameSelector selected={mode} onSelect={setMode} />

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(0,212,255,0.2), transparent)" }} />

        {/* Class Name */}
        <div className="flex flex-col gap-1.5">
          <div className="section-label">// CLASS NAME</div>
          <input
            type="text"
            value={loadout.className}
            onChange={(e) => setClassName(e.target.value.toUpperCase())}
            placeholder="ENTER CLASS NAME"
            maxLength={24}
            style={{
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "#e2e8f0",
              padding: "0.5rem 0.75rem",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              width: "100%",
              outline: "none",
              fontFamily: "var(--font-mono), 'Courier New', monospace",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(0,212,255,0.6)";
              e.target.style.boxShadow = "0 0 12px rgba(0,212,255,0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(0,212,255,0.2)";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(0,212,255,0.2), transparent)" }} />

        {/* Slot Buttons */}
        <div className="section-label">// BUILD YOUR CLASS</div>
        <div className="flex flex-col gap-1">
          {slots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => toggle(slot.id)}
              className={`text-left px-3 py-2 flex items-center justify-between transition-all ${
                activeSection === slot.id
                  ? "selected select-item"
                  : slot.filled
                  ? "select-item"
                  : "select-item"
              }`}
              style={{
                borderColor:
                  activeSection === slot.id
                    ? "#00d4ff"
                    : slot.filled
                    ? "rgba(0,212,255,0.3)"
                    : undefined,
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontSize: "0.45rem",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: slot.filled ? "#00d4ff" : "#1e2832",
                    display: "inline-block",
                    boxShadow: slot.filled ? "0 0 6px #00d4ff" : "none",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "0.6rem", letterSpacing: "0.1em", color: "#8899aa" }}>
                  {slot.label}
                </span>
              </div>
              <span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.04em",
                  color: slot.filled ? "#e2e8f0" : "#2a3a4a",
                  maxWidth: "140px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {slot.value}
              </span>
              <span
                style={{
                  fontSize: "0.55rem",
                  color: activeSection === slot.id ? "#00d4ff" : "#2a3a4a",
                  flexShrink: 0,
                }}
              >
                {activeSection === slot.id ? "▲" : "▼"}
              </span>
            </button>
          ))}
        </div>

        {/* Expanded Selector Panel */}
        {activeSection && (
          <div
            className="hud-panel p-3 fade-in"
            style={{ borderColor: "rgba(0,212,255,0.25)" }}
          >
            {activeSection === "primary" && (
              <WeaponSelector
                label="// SELECT PRIMARY WEAPON"
                weapons={modeWeapons.primary}
                selected={loadout.primary}
                onSelect={setPrimary}
              />
            )}
            {activeSection === "secondary" && (
              <WeaponSelector
                label="// SELECT SECONDARY WEAPON"
                weapons={modeWeapons.secondary}
                selected={loadout.secondary}
                onSelect={setSecondary}
              />
            )}
            {activeSection === "attachments" && (
              <AttachmentSelector
                attachments={modeAttachments}
                selected={loadout.attachments}
                onToggle={toggleAttachment}
              />
            )}
            {activeSection === "tactical" && (
              <EquipmentSelector
                label="// SELECT TACTICAL"
                items={modeEquipment.tactical}
                selected={loadout.tactical}
                onSelect={setTactical}
              />
            )}
            {activeSection === "lethal" && (
              <EquipmentSelector
                label="// SELECT LETHAL"
                items={modeEquipment.lethal}
                selected={loadout.lethal}
                onSelect={setLethal}
              />
            )}
            {activeSection === "perk1" && (
              <PerkSelector
                label="// PERK 1"
                tier="TIER I"
                perks={modePerks.tier1}
                selected={loadout.perk1}
                onSelect={setPerk1}
              />
            )}
            {activeSection === "perk2" && (
              <PerkSelector
                label="// PERK 2"
                tier="TIER II"
                perks={modePerks.tier2}
                selected={loadout.perk2}
                onSelect={setPerk2}
              />
            )}
            {activeSection === "perk3" && (
              <PerkSelector
                label="// PERK 3"
                tier="TIER III"
                perks={modePerks.tier3}
                selected={loadout.perk3}
                onSelect={setPerk3}
              />
            )}
            {activeSection === "fieldupgrade" && (
              <EquipmentSelector
                label="// SELECT FIELD UPGRADE"
                items={modeFieldUpgrades}
                selected={loadout.fieldUpgrade}
                onSelect={setFieldUpgrade}
              />
            )}
          </div>
        )}

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(0,212,255,0.2), transparent)" }} />

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button onClick={randomize} className="btn-gold px-4 py-2.5 flex items-center justify-center gap-2">
            <span>🎲</span>
            <span>RANDOM LOADOUT</span>
          </button>
          <button onClick={clearClass} className="btn-danger px-4 py-2.5 flex items-center justify-center gap-2">
            <span>✕</span>
            <span>CLEAR CLASS</span>
          </button>
        </div>
      </div>

      {/* ─── RIGHT PANEL: Preview Card ─── */}
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        {/* Card Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="section-label" style={{ fontSize: "0.65rem" }}>
            // LOADOUT PREVIEW
          </div>
          <div className="flex items-center gap-2">
            <ShareButton />
          </div>
        </div>

        {/* The Card */}
        <LoadoutCard loadout={loadout} />

        {/* Hint */}
        <div
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.1em",
            color: "#1e2832",
            textAlign: "center",
          }}
        >
          Click &quot;SHARE TO X&quot; to capture this card as an image and open X (Twitter)
        </div>
      </div>
    </div>
  );
}
