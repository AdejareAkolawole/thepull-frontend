"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon, AiBrain01Icon, Message02Icon, BookOpen01Icon,
  FlashIcon, Settings01Icon, AiSparklesIcon, ScaleIcon, CompassIcon,
} from "@hugeicons/core-free-icons";

// Mobile bottom nav — 5 most important
const navItems = [
  { href: "/dashboard", icon: Home01Icon, label: "Home" },
  { href: "/pull-profile", icon: AiSparklesIcon, label: "Pull Profile" },
  { href: "/coach", icon: AiBrain01Icon, label: "Ask The Pull" },
  { href: "/journey", icon: CompassIcon, label: "Journey" },
  { href: "/settings", icon: Settings01Icon, label: "Settings" },
];

// Desktop top nav — full list matching sidebar
const allNavItems = [
  { href: "/dashboard", icon: Home01Icon, label: "Home" },
  { href: "/pull-profile", icon: AiSparklesIcon, label: "Pull Profile" },
  { href: "/journal", icon: BookOpen01Icon, label: "Journal" },
  { href: "/coach", icon: AiBrain01Icon, label: "Ask The Pull" },
  { href: "/reports", icon: ScaleIcon, label: "Reality Check" },
  { href: "/journey", icon: CompassIcon, label: "Journey" },
  { href: "/upgrade", icon: FlashIcon, label: "Subscription" },
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
      {/* Desktop sticky top bar — hidden on desktop (sidebar replaces it) and on mobile */}
      <header className="topnav-header" style={{
        position: "sticky", top: 0, zIndex: 50, width: "100%",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 1px 12px rgba(0,0,0,0.05)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 56 }}>
          {/* Logo */}
          <Link href="/dashboard" style={{ marginRight: 32, flexShrink: 0, display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <img src="/logo.jpg" alt="THEPULL" style={{ height: 30, width: "auto", display: "block", borderRadius: 7 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#0f0a14", lineHeight: 1.2, letterSpacing: "-0.02em" }}>MyPullScore</p>
              <p className="nav-logo-tagline" style={{ fontSize: 9, color: "rgba(15,10,20,0.38)", lineHeight: 1.2 }}>Personal intelligence that grows with you.</p>
            </div>
          </Link>

          {/* Nav links — hidden on mobile */}
          <nav className="desktop-nav-links" style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
            {allNavItems.map(({ href, icon: Icon, label }) => {
              const active = path === href || (href !== "/dashboard" && path.startsWith(href));
              return (
                <Link key={href} href={href}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "6px 14px", borderRadius: 99,
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
        transform: hidden ? "translateY(100%)" : "translateY(0)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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

      <style>{`
        /* Mobile bottom nav: hide ≥768px */
        @media (min-width: 768px) {
          .desktop-hide-mobile-nav { display: none !important; }
        }
        /* Desktop nav links: hide on mobile */
        @media (max-width: 767px) {
          .desktop-nav-links { display: none !important; }
        }
        /* TopNav header: hide on desktop (≥1024px) — sidebar takes over */
        @media (min-width: 1024px) {
          .topnav-header { display: none !important; }
        }
      `}</style>
    </>
  );
}
