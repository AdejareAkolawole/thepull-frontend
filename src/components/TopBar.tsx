"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification02Icon, Search01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";

export default function TopBar() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5"
      style={{ background: "rgba(244,247,251,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>

      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
        <HugeiconsIcon icon={Calendar03Icon} size={15} />
        <span>{today}</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)", minWidth: 180 }}>
          <HugeiconsIcon icon={Search01Icon} size={14} />
          <span>Search...</span>
        </div>

        {/* Notification */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-white"
          style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
          <HugeiconsIcon icon={Notification02Icon} size={16} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: "var(--brand)" }} />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
          AA
        </div>
      </div>
    </header>
  );
}
