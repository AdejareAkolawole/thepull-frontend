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
  { href: "/coach", icon: Message02Icon, label: "AI Coach" },
  { href: "/reports", icon: Analytics01Icon, label: "Reports" },
  { href: "/journey", icon: FlashIcon, label: "Journey" },
  { href: "/journal", icon: BookOpen01Icon, label: "Journal" },
  { href: "/settings", icon: Settings01Icon, label: "Settings" },
];

export default function TopNav() {
  const path = usePathname();
  return (
    <>
      {/* Desktop pill nav */}
      <header className="hidden md:flex sticky top-0 z-50 w-full justify-center pt-4 pb-2"
        style={{ pointerEvents: "none" }}>
        <nav className="flex items-center gap-0.5 p-1.5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 2px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.8) inset",
            pointerEvents: "auto",
          }}>
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = path === href || (href !== "/dashboard" && path.startsWith(href));
            return (
              <Link key={href} href={href} title={label}
                className="relative flex items-center justify-center rounded-xl transition-all duration-200 group"
                style={{
                  background: active ? "linear-gradient(135deg, #7c2232, #c0404f)" : "transparent",
                  boxShadow: active ? "0 2px 12px rgba(192,64,79,0.3), inset 0 1px 0 rgba(255,255,255,0.2)" : "none",
                  padding: active ? "0 14px" : "0",
                  height: 38,
                  minWidth: 38,
                  gap: active ? 6 : 0,
                }}>
                <HugeiconsIcon icon={Icon} size={16}
                  style={{ color: active ? "#fff" : "rgba(15,10,20,0.4)", flexShrink: 0, transition: "color 0.2s" }} />
                {active && (
                  <span className="text-[12px] font-semibold text-white whitespace-nowrap">{label}</span>
                )}
                {!active && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10"
                    style={{ background: "#0f0a14", color: "white" }}>
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-1"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(0,0,0,0.07)",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.06)",
          paddingTop: 8,
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)",
        }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = path === href || (href !== "/dashboard" && path.startsWith(href));
          return (
            <Link key={href} href={href}
              className="flex flex-col items-center gap-0.5 transition-all"
              style={{ minWidth: 40, opacity: active ? 1 : 0.4 }}>
              <div className="w-10 h-7 flex items-center justify-center rounded-lg transition-all"
                style={{ background: active ? "rgba(192,64,79,0.1)" : "transparent" }}>
                <HugeiconsIcon icon={Icon} size={19}
                  style={{ color: active ? "var(--brand)" : "rgba(15,10,20,0.5)" }} />
              </div>
              <span className="text-[9px] font-semibold"
                style={{ color: active ? "var(--brand)" : "rgba(15,10,20,0.35)" }}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
