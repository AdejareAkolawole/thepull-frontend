import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import IntelligenceBar from "@/components/IntelligenceBar";

export const metadata: Metadata = {
  title: "THEPULL — Personal Intelligence",
  description: "Personal intelligence that grows with you.",
  icons: { icon: "/logo.jpg", apple: "/logo.jpg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "var(--bg)", minHeight: "100vh" }}>
        {/* Sidebar: visible only on desktop (≥1024px) via CSS */}
        <Sidebar />

        {/* TopNav: sticky top bar on mobile/tablet; logo-only on desktop */}
        <TopNav />

        <IntelligenceBar />

        {/* with-sidebar adds margin-left: 236px on desktop via CSS */}
        <main className="with-sidebar" style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 24px 80px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
