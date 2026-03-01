import ClassBuilder from "@/components/loadout/ClassBuilder";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0c0e",
        padding: "0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ─── Top HUD Bar ─── */}
      <header
        style={{
          background: "rgba(10,12,14,0.95)",
          borderBottom: "1px solid rgba(0,212,255,0.15)",
          padding: "0.6rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        {/* Logo left */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 8,
              height: 8,
              background: "#00d4ff",
              boxShadow: "0 0 8px #00d4ff",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.85rem",
              fontWeight: 900,
              letterSpacing: "0.25em",
              color: "#e2e8f0",
              textTransform: "uppercase",
            }}
          >
            LOADOUT
            <span style={{ color: "#00d4ff", textShadow: "0 0 8px rgba(0,212,255,0.6)" }}>
              {" "}BUILDER
            </span>
          </span>
        </div>

        {/* Center title */}
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.3em",
            color: "#2a3a4a",
            textTransform: "uppercase",
            display: "none",
          }}
          className="sm:block"
        >
          CREATE A CLASS // MILITARY SCI-FI
        </div>

        {/* Right status */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 6px #22c55e",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.15em",
              color: "#4a5568",
            }}
          >
            SYSTEM ONLINE
          </span>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main
        style={{
          flex: 1,
          padding: "1.25rem",
          maxWidth: "1600px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <ClassBuilder />
      </main>

      {/* ─── Footer ─── */}
      <footer
        style={{
          borderTop: "1px solid rgba(0,212,255,0.08)",
          padding: "0.6rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.15em",
            color: "#1e2832",
          }}
        >
          LOADOUT BUILDER — ORIGINAL CONTENT — NOT AFFILIATED WITH ANY GAME PUBLISHER
        </span>
      </footer>
    </div>
  );
}
