"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon, VaultIcon, AiBrain01Icon, Message02Icon, Analytics01Icon,
  FlashIcon, BookOpen01Icon, Settings01Icon, AiSparklesIcon,
} from "@hugeicons/core-free-icons";

const navItems = [
  { href: "/dashboard", icon: Home01Icon, label: "Home" },
  { href: "/pull-profile", icon: AiBrain01Icon, label: "Pull Profile" },
  { href: "/coach", icon: Message02Icon, label: "Ask The Pull" },
  { href: "/journey", icon: FlashIcon, label: "Journey" },
  { href: "/upgrade", icon: FlashIcon, label: "Upgrade" },
  { href: "/settings", icon: Settings01Icon, label: "Settings" },
];

const allNavItems = [
  { href: "/dashboard", icon: Home01Icon, label: "Home" },
  { href: "/pull-profile", icon: AiBrain01Icon, label: "Pull Profile" },
  { href: "/journal", icon: BookOpen01Icon, label: "Journal" },
  { href: "/coach", icon: Message02Icon, label: "Ask The Pull" },
  { href: "/reports", icon: Analytics01Icon, label: "Reality Check" },
  { href: "/journey", icon: FlashIcon, label: "Journey" },
  { href: "/upgrade", icon: AiSparklesIcon, label: "Upgrade" },
  { href: "/settings", icon: Settings01Icon, label: "Settings" },
];

export default function TopNav() {
  const path = usePathname();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Hide when scrolling down past 60px, show when scrolling up
      if (y > lastY.current && y > 60) {
        setHidden(true);
      } else if (y < lastY.current) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop sticky top bar — hidden on mobile */}
      <header className="desktop-nav-links" style={{
        position: "sticky", top: 0, zIndex: 50, width: "100%",
        background: "rgba(245,244,247,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(15,10,20,0.06)",
        padding: "10px 32px",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>

          {/* Logo */}
          <Link href="/dashboard" style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <img src="/logo.jpg" alt="THEPULL" style={{ height: 30, width: "auto", display: "block" }} />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#0f0a14", letterSpacing: "-0.01em", lineHeight: 1.1 }}>MyPullScore</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#c0404f", letterSpacing: "0.01em", lineHeight: 1.3 }}>Personal Intelligence That Grows You.</span>
            </div>
          </Link>

          {/* Pill nav — icon only, label on hover */}
          <nav style={{
            display: "flex", alignItems: "center", gap: 2,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(15,10,20,0.1)",
            borderRadius: 99,
            padding: "6px 8px",
            boxShadow: "0 4px 32px rgba(15,10,20,0.1)",
          }}>
            {allNavItems.map(({ href, icon: Icon, label }) => {
              const active = path === href || (href !== "/dashboard" && path.startsWith(href));
              return (
                <Link key={href} href={href} className="pill-nav-item" style={{
                  display: "flex", alignItems: "center", gap: 0,
                  padding: "9px 13px", borderRadius: 99,
                  fontSize: 13, fontWeight: 700,
                  color: active ? "#fff" : "rgba(15,10,20,0.45)",
                  background: active ? "linear-gradient(135deg,#7c2232,#c0404f)" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
                  boxShadow: active ? "0 4px 14px rgba(192,64,79,0.3)" : "none",
                  overflow: "hidden",
                  whiteSpace: "nowrap" as const,
                }}>
                  <HugeiconsIcon icon={Icon} size={18} />
                  <span className="pill-nav-label" style={{ maxWidth: 0, opacity: 0, overflow: "hidden", transition: "max-width 0.22s cubic-bezier(0.4,0,0.2,1), opacity 0.18s, margin 0.22s", marginLeft: 0 }}>
                    {label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Profile chip */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: 99, background: "linear-gradient(135deg,#7c2232,#c0404f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white" }}>
              AA
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom bar — pill-shaped floating nav */}
      <nav className="desktop-hide-mobile-nav" style={{
        position: "fixed", bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
        left: "50%", transform: hidden ? "translateX(-50%) translateY(calc(100% + 32px))" : "translateX(-50%) translateY(0)",
        zIndex: 50,
        background: "rgba(15,10,20,0.88)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(255,255,255,0.06)",
        borderRadius: 99,
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "6px 8px",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = path === href || (href !== "/dashboard" && path.startsWith(href));
          return (
            <Link key={href} href={href}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, textDecoration: "none", padding: "6px 14px", borderRadius: 99, background: active ? "rgba(192,64,79,0.18)" : "transparent", transition: "background 0.15s" }}>
              <HugeiconsIcon icon={Icon} size={18} style={{ color: active ? "#c0404f" : "rgba(255,255,255,0.45)" }} />
              <span style={{ fontSize: 9, fontWeight: 600, color: active ? "#c0404f" : "rgba(255,255,255,0.35)", letterSpacing: "0.02em" }}>{label}</span>
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
