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
      {/* Desktop sticky top bar — hidden on mobile via CSS */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50, width: "100%",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 1px 12px rgba(0,0,0,0.05)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 56 }}>
          {/* Logo */}
          <span style={{ fontSize: 15, fontWeight: 800, color: "#0f0a14", letterSpacing: "-0.02em", marginRight: 32, flexShrink: 0 }}>
            THE<span style={{ color: "#c0404f" }}>PULL</span>
          </span>

          {/* Nav links — hidden on mobile */}
          <nav className="desktop-nav-links" style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
            {navItems.map(({ href, icon: Icon, label }) => {
              const active = path === href || (href !== "/dashboard" && path.startsWith(href));
              return (
                <Link key={href} href={href}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "6px 12px", borderRadius: 10,
                    fontSize: 13, fontWeight: active ? 700 : 500,
                    color: active ? "#c0404f" : "rgba(15,10,20,0.5)",
                    background: active ? "rgba(192,64,79,0.08)" : "transparent",
                    textDecoration: "none",
                    transition: "all 0.15s",
                  }}>
                  <HugeiconsIcon icon={Icon} size={15} />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Profile chip */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #7c2232, #c0404f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white" }}>
              AA
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom bar — hidden on desktop via globals.css .desktop-hide-mobile-nav */}
      <nav className="desktop-hide-mobile-nav" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 8,
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)",
      }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = path === href || (href !== "/dashboard" && path.startsWith(href));
          return (
            <Link key={href} href={href}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minWidth: 40, textDecoration: "none", opacity: active ? 1 : 0.4 }}>
              <div style={{ width: 40, height: 28, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, background: active ? "rgba(192,64,79,0.1)" : "transparent" }}>
                <HugeiconsIcon icon={Icon} size={19} style={{ color: active ? "#c0404f" : "rgba(15,10,20,0.5)" }} />
              </div>
              <span style={{ fontSize: 9, fontWeight: 600, color: active ? "#c0404f" : "rgba(15,10,20,0.4)" }}>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Inline style to hide mobile nav on desktop, and desktop nav links on mobile */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-hide-mobile-nav { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav-links { display: none !important; }
        }
      `}</style>
    </>
  );
}
