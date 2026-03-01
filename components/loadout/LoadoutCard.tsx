"use client";

import { Loadout } from "@/lib/types";
import StatBar from "./StatBar";

interface LoadoutCardProps {
  loadout: Loadout;
}

const GAME_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  modern: { label: "MODERN WARFARE", color: "#6ea8d4", bg: "rgba(58,110,168,0.15)" },
  blackops: { label: "BLACK OPS", color: "#d46e6e", bg: "rgba(138,58,58,0.15)" },
  futuristic: { label: "FUTURE WARFARE", color: "#6ed4a8", bg: "rgba(58,138,110,0.15)" },
};

function EmptySlot({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: "0.5rem 0.75rem",
        border: "1px dashed rgba(255,255,255,0.08)",
        color: "#2a3a4a",
        fontSize: "0.6rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      {label} — EMPTY
    </div>
  );
}

function WeaponBlock({ label, weapon }: { label: string; weapon: Loadout["primary"] }) {
  if (!weapon) return <EmptySlot label={label} />;
  return (
    <div
      style={{
        padding: "0.6rem 0.75rem",
        background: "rgba(0,0,0,0.4)",
        border: "1px solid rgba(0,212,255,0.15)",
      }}
    >
      <div style={{ fontSize: "0.55rem", letterSpacing: "0.18em", color: "#4a5568", marginBottom: "0.2rem" }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "1.2rem" }}>{weapon.icon}</span>
        <span style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", color: "#e2e8f0" }}>
          {weapon.name}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: "0.5rem",
            background: "rgba(0,212,255,0.1)",
            border: "1px solid rgba(0,212,255,0.25)",
            color: "#00d4ff",
            padding: "0.1rem 0.4rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {weapon.category}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <StatBar label="DMG" value={weapon.damage} compact />
        <StatBar label="RNG" value={weapon.range} color="#22c55e" compact />
        <StatBar label="MOB" value={weapon.mobility} color="#f59e0b" compact />
        <StatBar label="ACC" value={weapon.accuracy} color="#a855f7" compact />
      </div>
    </div>
  );
}

export default function LoadoutCard({ loadout }: LoadoutCardProps) {
  const game = GAME_LABELS[loadout.gameMode];
  const hasAnyContent =
    loadout.primary ||
    loadout.secondary ||
    loadout.perk1 ||
    loadout.perk2 ||
    loadout.perk3 ||
    loadout.tactical ||
    loadout.lethal ||
    loadout.fieldUpgrade ||
    loadout.attachments.length > 0;

  return (
    <div
      id="share-card"
      style={{
        background: "linear-gradient(160deg, #0d1117 0%, #0a0c0e 50%, #0d1117 100%)",
        border: "1px solid rgba(0,212,255,0.2)",
        padding: "1.5rem",
        position: "relative",
        minHeight: "600px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Corner accents */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 20, height: 20, borderTop: "2px solid #00d4ff", borderLeft: "2px solid #00d4ff" }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: 20, height: 20, borderTop: "2px solid #00d4ff", borderRight: "2px solid #00d4ff" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 20, height: 20, borderBottom: "2px solid #00d4ff", borderLeft: "2px solid #00d4ff" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderBottom: "2px solid #00d4ff", borderRight: "2px solid #00d4ff" }} />

      {/* Subtle grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ position: "relative", marginBottom: "1rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.4rem",
          }}
        >
          <div
            style={{
              fontSize: "0.55rem",
              letterSpacing: "0.25em",
              color: game.color,
              background: game.bg,
              padding: "0.2rem 0.6rem",
              border: `1px solid ${game.color}40`,
            }}
          >
            {game.label}
          </div>
          <div style={{ fontSize: "0.5rem", letterSpacing: "0.15em", color: "#2a3a4a" }}>
            LOADOUT BUILDER v1.0
          </div>
        </div>

        <div
          style={{
            fontSize: "1.4rem",
            fontWeight: 900,
            letterSpacing: "0.12em",
            color: "#e2e8f0",
            textTransform: "uppercase",
            textShadow: "0 0 20px rgba(0,212,255,0.3)",
            borderBottom: "1px solid rgba(0,212,255,0.15)",
            paddingBottom: "0.6rem",
          }}
        >
          {loadout.className || "UNNAMED CLASS"}
        </div>
      </div>

      {!hasAnyContent ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "300px",
            color: "#2a3a4a",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "2rem" }}>⚔️</span>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}>NO LOADOUT CONFIGURED</span>
          <span style={{ fontSize: "0.55rem", letterSpacing: "0.1em", color: "#1a2432" }}>
            Select weapons and perks to build your class
          </span>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", position: "relative" }}>
          {/* Weapons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <WeaponBlock label="// PRIMARY" weapon={loadout.primary} />
            <WeaponBlock label="// SECONDARY" weapon={loadout.secondary} />
          </div>

          {/* Attachments */}
          {loadout.attachments.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.18em",
                  color: "#4a5568",
                  marginBottom: "0.3rem",
                  textTransform: "uppercase",
                }}
              >
                // ATTACHMENTS ({loadout.attachments.length}/5)
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                {loadout.attachments.map((att) => (
                  <div
                    key={att.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      padding: "0.2rem 0.5rem",
                      background: "rgba(0,212,255,0.05)",
                      border: "1px solid rgba(0,212,255,0.15)",
                      fontSize: "0.6rem",
                      color: "#8899aa",
                      letterSpacing: "0.04em",
                    }}
                  >
                    <span style={{ fontSize: "0.7rem" }}>{att.icon}</span>
                    {att.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Perks row */}
          <div>
            <div style={{ fontSize: "0.55rem", letterSpacing: "0.18em", color: "#4a5568", marginBottom: "0.3rem", textTransform: "uppercase" }}>
              // PERKS
            </div>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              {[
                { perk: loadout.perk1, tier: "I" },
                { perk: loadout.perk2, tier: "II" },
                { perk: loadout.perk3, tier: "III" },
              ].map(({ perk, tier }) =>
                perk ? (
                  <div
                    key={perk.id}
                    style={{
                      flex: 1,
                      padding: "0.4rem 0.5rem",
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.2rem",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>{perk.icon}</span>
                    <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", color: "#e2e8f0", textAlign: "center" }}>
                      {perk.name}
                    </span>
                    <span style={{ fontSize: "0.45rem", color: "#4a5568", letterSpacing: "0.1em" }}>PERK {tier}</span>
                  </div>
                ) : (
                  <div
                    key={tier}
                    style={{
                      flex: 1,
                      padding: "0.4rem 0.5rem",
                      border: "1px dashed rgba(255,255,255,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.55rem",
                      color: "#1a2432",
                      letterSpacing: "0.1em",
                    }}
                  >
                    PERK {tier}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Equipment row */}
          <div>
            <div style={{ fontSize: "0.55rem", letterSpacing: "0.18em", color: "#4a5568", marginBottom: "0.3rem", textTransform: "uppercase" }}>
              // EQUIPMENT
            </div>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              {loadout.tactical && (
                <div
                  style={{
                    flex: 1,
                    padding: "0.4rem 0.6rem",
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(34,197,94,0.15)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>{loadout.tactical.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "#e2e8f0" }}>{loadout.tactical.name}</div>
                    <div style={{ fontSize: "0.5rem", color: "#4a5568", letterSpacing: "0.08em" }}>TACTICAL</div>
                  </div>
                </div>
              )}
              {loadout.lethal && (
                <div
                  style={{
                    flex: 1,
                    padding: "0.4rem 0.6rem",
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,59,59,0.15)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>{loadout.lethal.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "#e2e8f0" }}>{loadout.lethal.name}</div>
                    <div style={{ fontSize: "0.5rem", color: "#4a5568", letterSpacing: "0.08em" }}>LETHAL</div>
                  </div>
                </div>
              )}
              {loadout.fieldUpgrade && (
                <div
                  style={{
                    flex: 1,
                    padding: "0.4rem 0.6rem",
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(201,162,39,0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>{loadout.fieldUpgrade.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "#e2e8f0" }}>{loadout.fieldUpgrade.name}</div>
                    <div style={{ fontSize: "0.5rem", color: "#4a5568", letterSpacing: "0.08em" }}>FIELD UPGRADE</div>
                  </div>
                </div>
              )}
              {!loadout.tactical && !loadout.lethal && !loadout.fieldUpgrade && (
                <div style={{ fontSize: "0.6rem", color: "#1a2432", letterSpacing: "0.1em" }}>NO EQUIPMENT</div>
              )}
            </div>
          </div>

          {/* Footer watermark */}
          <div
            style={{
              marginTop: "0.5rem",
              paddingTop: "0.5rem",
              borderTop: "1px solid rgba(0,212,255,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "0.5rem", letterSpacing: "0.15em", color: "#1a2432" }}>
              LOADOUT BUILDER — SHARE YOUR CLASS
            </span>
            <span style={{ fontSize: "0.5rem", letterSpacing: "0.1em", color: "#00d4ff", opacity: 0.4 }}>
              ⚔ TACTICAL ADVANTAGE
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
