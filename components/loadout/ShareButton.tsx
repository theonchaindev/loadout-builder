"use client";

import { useState } from "react";

interface ShareButtonProps {
  className?: string;
}

export default function ShareButton({ className }: ShareButtonProps) {
  const [status, setStatus] = useState<"idle" | "capturing" | "done" | "error">("idle");

  const handleShare = async () => {
    try {
      setStatus("capturing");
      const html2canvas = (await import("html2canvas")).default;
      const el = document.getElementById("share-card");
      if (!el) throw new Error("Share card not found");

      const canvas = await html2canvas(el, {
        scale: 2,
        backgroundColor: "#0a0c0e",
        logging: false,
        useCORS: true,
      });

      // Download PNG
      const link = document.createElement("a");
      link.download = "my-loadout.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

      setStatus("done");

      // Open Twitter intent
      setTimeout(() => {
        window.open(
          "https://twitter.com/intent/tweet?text=Check%20out%20my%20loadout!%20%23LoadoutBuilder%20%23Gaming",
          "_blank",
          "noopener,noreferrer"
        );
        setStatus("idle");
      }, 800);
    } catch (err) {
      console.error("Share failed:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={status === "capturing"}
      className={`btn-primary px-4 py-2.5 ${className ?? ""}`}
      style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
    >
      {status === "idle" && (
        <>
          <span style={{ fontSize: "0.9rem" }}>𝕏</span>
          <span>SHARE TO X</span>
        </>
      )}
      {status === "capturing" && (
        <>
          <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span>
          <span>CAPTURING...</span>
        </>
      )}
      {status === "done" && (
        <>
          <span>✓</span>
          <span>OPENING X...</span>
        </>
      )}
      {status === "error" && (
        <>
          <span>✗</span>
          <span>FAILED</span>
        </>
      )}
    </button>
  );
}
