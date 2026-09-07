"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon, VaultIcon, AiBrain01Icon, Message02Icon, Analytics01Icon,
  FlashIcon, BookOpen01Icon, Settings01Icon,
} from "@hugeicons/core-free-icons";

const navItems = [
  { href: "/dashboard", icon: Home01Icon, label: "Home" },
  { href: "/vault", icon: VaultIcon, label: "Vault" },
  { href: "/pull-profile", icon: AiBrain01Icon, label: "Profile" },
  { href: "/coach", icon: Message02Icon, label: "Coach" },
  { href: "/reports", icon: Analytics01Icon, label: "Reports" },
  { href: "/journey", icon: FlashIcon, label: "Journey" },
  { href: "/journal", icon: BookOpen01Icon, label: "Journal" },
  { href: "/settings", icon: Settings01Icon, label: "Settings" },
];

export default function TopNav() {
  const path = usePathname();

  return (
    <>
      {/* ── Desktop: floating top pill ── */}
      <header className="hidden md:flex sticky top-0 z-50 w-full justify-center pt-4 pb-2"
        style={{ pointerEvents: "none" }}>
        <nav className="flex items-center gap-1 p-1.5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.07)",
            pointerEvents: "auto",
          }}>
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = path === href || (href !== "/dashboard" && path.startsWith(href));
            return (
              <Link key={href} href={href} title={label}
                className="relative flex items-center justify-center rounded-xl transition-all duration-200 group"
                style={{
                  background: active ? "linear-gradient(135deg, #7c2232, #b03040)" : "transparent",
                  boxShadow: active ? "0 2px 10px rgba(124,34,50,0.30)" : "none",
                  padding: active ? "0 14px" : "0",
                  height: 40,
                  minWidth: 40,
                  gap: active ? 6 : 0,
                  overflow: "hidden",
                }}>
                <HugeiconsIcon icon={Icon} size={18}
                  style={{ color: active ? "#ffffff" : "#94a3b8", flexShrink: 0, transition: "color 0.2s" }} />
                {active && (
                  <span className="text-xs font-bold text-white whitespace-nowrap"
                    style={{ maxWidth: active ? 80 : 0, overflow: "hidden", transition: "max-width 0.25s ease" }}>
                    {label}
                  </span>
                )}
                {/* Hover tooltip for inactive */}
                {!active && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                    style={{ background: "rgba(13,17,23,0.85)", color: "white" }}>
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* ── Mobile: fixed bottom tab bar ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 pb-safe"
        style={{
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.07)",
          paddingTop: 8,
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)",
        }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = path === href || (href !== "/dashboard" && path.startsWith(href));
          return (
            <Link key={href} href={href}
              className="flex flex-col items-center gap-0.5 transition-all"
              style={{ minWidth: 44, opacity: active ? 1 : 0.5 }}>
              <div className="w-10 h-8 flex items-center justify-center rounded-xl transition-all"
                style={{ background: active ? "var(--brand-light)" : "transparent" }}>
                <HugeiconsIcon icon={Icon} size={20}
                  style={{ color: active ? "var(--brand)" : "#64748b" }} />
              </div>
              <span className="text-[9px] font-semibold"
                style={{ color: active ? "var(--brand)" : "#94a3b8" }}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
