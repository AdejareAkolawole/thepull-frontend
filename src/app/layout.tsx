import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/components/TopNav";

export const metadata: Metadata = {
  title: "THEPULL — Personal Intelligence",
  description: "Personal intelligence that grows with you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "var(--bg)", minHeight: "100vh" }}>
        <TopNav />
        {/* pb-24 on mobile to clear the bottom tab bar */}
        <main style={{ maxWidth: 1400, margin: "0 auto", padding: "0 16px 40px" }}
          className="md:px-6 pb-24 md:pb-10">
          {children}
        </main>
      </body>
    </html>
  );
}
