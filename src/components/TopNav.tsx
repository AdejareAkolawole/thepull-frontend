"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon, AiBrain01Icon, Message02Icon, BookOpen01Icon,
  FlashIcon, Settings01Icon, AiSparklesIcon, ScaleIcon, CompassIcon,
  Logout01Icon,
} from "@hugeicons/core-free-icons";
import { logout } from "@/lib/api";

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
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  function handleLogout() {
    logout();
    router.push("/login");
  }

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

          {/* Profile chip + logout */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #7c2232, #c0404f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white" }}>
              AA
            </div>
            <button onClick={handleLogout} title="Log out" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32, borderRadius: 10,
              border: "1px solid rgba(192,64,79,0.2)",
              background: "rgba(192,64,79,0.06)",
              cursor: "pointer",
            }}>
              <HugeiconsIcon icon={Logout01Icon} size={15} style={{ color: "#c0404f" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile bottom bar — floating pill */}
      <div className="desktop-hide-mobile-nav" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", justifyContent: "center", alignItems: "flex-end",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
        pointerEvents: "none",
        transform: hidden ? "translateY(120%)" : "translateY(0)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        <nav style={{
          display: "flex", alignItems: "center", gap: 4,
          padding: "8px 10px",
          borderRadius: 99,
          background: "rgba(15,10,20,0.88)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.18)",
          border: "1px solid rgba(255,255,255,0.08)",
          pointerEvents: "all",
        }}>
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = path === href || (href !== "/dashboard" && path.startsWith(href));
            return (
              <Link key={href} href={href} style={{
                display: "flex", alignItems: "center",
                gap: active ? 6 : 0,
                padding: active ? "8px 16px" : "8px 14px",
                borderRadius: 99,
                textDecoration: "none",
                background: active ? "rgba(192,64,79,0.22)" : "transparent",
                transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                whiteSpace: "nowrap" as const,
                overflow: "hidden",
                maxWidth: active ? 140 : 44,
              }}>
                <HugeiconsIcon icon={Icon} size={20} style={{ color: active ? "#c0404f" : "rgba(255,255,255,0.45)", flexShrink: 0 }} />
                {active && <span style={{ fontSize: 12, fontWeight: 700, color: "#c0404f" }}>{label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <style>{`
        /* TopNav header: hide on desktop — sidebar takes over */
        @media (min-width: 1024px) {
          .topnav-header { display: none !important; }
        }
        /* Mobile bottom nav: hide ≥768px */
        @media (min-width: 768px) {
          .desktop-hide-mobile-nav { display: none !important; }
        }
        /* Desktop nav links: hide on mobile */
        @media (max-width: 767px) {
          .desktop-nav-links { display: none !important; }
        }
      `}</style>
    </>
  );
}
