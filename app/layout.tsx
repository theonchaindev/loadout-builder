import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOADOUT BUILDER — Military Sci-Fi Class Creator",
  description: "Build and share your ultimate loadout. Choose your weapons, attachments, perks and equipment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
