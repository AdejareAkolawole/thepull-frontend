"use client";
import { useEffect } from "react";

export default function UpgradeLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = "#ffffff";
    return () => { document.body.style.background = prev; };
  }, []);

  return (
    <div style={{ margin: "-20px -24px -80px", minWidth: "calc(100% + 48px)" }}>
      {children}
    </div>
  );
}
