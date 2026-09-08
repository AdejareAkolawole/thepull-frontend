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
        <Sidebar />
        <TopNav />
        <IntelligenceBar />
        <main className="with-sidebar" style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 24px 80px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
