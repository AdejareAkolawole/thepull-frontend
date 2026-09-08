"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon, AiBrain01Icon, BookOpen01Icon, Message02Icon,
  FlashIcon, ScaleIcon, Notification01Icon, UserCircleIcon,
  CreditCardIcon, Settings01Icon, AiSparklesIcon, CompassIcon,
  SidebarLeft01Icon,
} from "@hugeicons/core-free-icons";

const mainNav = [
  { href: "/dashboard",    icon: Home01Icon,      label: "Home" },
  { href: "/pull-profile", icon: AiSparklesIcon,  label: "Pull Profile" },
  { href: "/journal",      icon: BookOpen01Icon,  label: "Journal" },
  { href: "/coach",        icon: AiBrain01Icon,   label: "Ask The Pull" },
  { href: "/reports",      icon: ScaleIcon,       label: "Reality Check" },
  { href: "/journey",      icon: CompassIcon,     label: "Journey" },
];

const bottomNav = [
  { href: "/notifications",    icon: Notification01Icon, label: "Notifications" },
  { href: "/settings/profile", icon: UserCircleIcon,     label: "My Profile" },
  { href: "/upgrade",          icon: CreditCardIcon,     label: "Subscription" },
  { href: "/settings",         icon: Settings01Icon,     label: "Settings" },
];

export default function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("sb");
    if (saved === "0") setOpen(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("sb", open ? "1" : "0");
    document.documentElement.classList.toggle("sidebar-collapsed", !open);
  }, [open]);

  const isActive = (href: string) =>
    href === "/dashboard" ? path === href : path.startsWith(href);

  return (
    <aside className="app-sidebar" style={{
      position: "fixed", top: 0, left: 0, height: "100vh",
      width: open ? 240 : 68,
      display: "flex", flexDirection: "column",
      zIndex: 40,
      background: "var(--bg)",
      borderRight: "1px solid var(--border)",
      transition: "width 0.22s cubic-bezier(0.4,0,0.2,1)",
      overflowX: "hidden", overflowY: "auto",
    }}>

      {/* Header */}
      <div style={{
        height: 56, flexShrink: 0,
        display: "flex", alignItems: "center",
        padding: open ? "0 16px 0 16px" : "0 0 0 0",
        justifyContent: open ? "space-between" : "center",
        borderBottom: "1px solid var(--border)",
      }}>
        {open ? (
          <>
            <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", overflow: "hidden" }}>
              <img src="/logo.jpg" alt="ThePull" style={{ height: 28, width: "auto", borderRadius: 0, background: "none", flexShrink: 0 }} />
              <div style={{ overflow: "hidden" }}>
                <p style={{ fontSize: 12.5, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>MyPullScore</p>
                <p style={{ fontSize: 8.5, color: "var(--text-muted)", whiteSpace: "nowrap", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", maxWidth: 148 }}>Personal intelligence that grows with you.</p>
              </div>
            </Link>
            <button onClick={() => setOpen(false)} style={toggleBtn}>
              <HugeiconsIcon icon={SidebarLeft01Icon} size={15} style={{ color: "var(--text-muted)" }} />
            </button>
          </>
        ) : (
          <button onClick={() => setOpen(true)} title="Expand" style={{ ...toggleBtn, width: 36, height: 36 }}>
            <HugeiconsIcon icon={SidebarLeft01Icon} size={15} style={{ color: "var(--text-muted)", transform: "scaleX(-1)" }} />
          </button>
        )}
      </div>

      {/* Main nav */}
      <nav style={{ flex: 1, padding: "28px 8px 4px" }}>
        {mainNav.map(({ href, icon, label }) => {
          const active = isActive(href);
          return (
            <Link key={href} href={href} title={!open ? label : undefined} style={{
              display: "flex", alignItems: "center",
              gap: 10,
              height: 38,
              padding: open ? "0 10px" : "0",
              justifyContent: open ? "flex-start" : "center",
              borderRadius: 10,
              textDecoration: "none",
              marginBottom: 2,
              fontWeight: active ? 600 : 400,
              fontSize: 13.5,
              color: active ? "var(--brand)" : "var(--text-secondary)",
              background: active ? "var(--brand-light)" : "transparent",
              transition: "background 0.12s, color 0.12s",
              whiteSpace: "nowrap",
              overflow: "hidden",
              position: "relative",
            }}>
              {/* Active left bar */}
              {active && (
                <span style={{
                  position: "absolute", left: 0, top: "20%", height: "60%",
                  width: 3, borderRadius: 99, background: "var(--brand)",
                }} />
              )}
              <HugeiconsIcon icon={icon} size={17} style={{
                color: active ? "var(--brand)" : "var(--text-muted)",
                flexShrink: 0,
                marginLeft: active ? 6 : (open ? 0 : 0),
              }} />
              {open && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--border)", margin: "0 8px" }} />

      {/* Bottom nav */}
      <div style={{ padding: "8px 8px" }}>
        {/* User row — expanded only */}
        {open && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 10px", marginBottom: 4,
            borderRadius: 10,
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 9, flexShrink: 0,
              background: "linear-gradient(135deg,#7c2232,#c0404f)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 800, color: "#fff",
            }}>AA</div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap" }}>Good Morning 👋</p>
              <p style={{ fontSize: 10, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 148 }}>adejare.akolawole@gmail.com</p>
            </div>
          </div>
        )}
        {!open && (
          <div style={{
            width: 30, height: 30, borderRadius: 9, margin: "8px auto 6px",
            background: "linear-gradient(135deg,#7c2232,#c0404f)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, fontWeight: 800, color: "#fff",
          }}>AA</div>
        )}

        {bottomNav.map(({ href, icon, label }) => {
          const active = isActive(href);
          return (
            <Link key={href} href={href} title={!open ? label : undefined} style={{
              display: "flex", alignItems: "center",
              gap: 10, height: 36,
              padding: open ? "0 10px" : "0",
              justifyContent: open ? "flex-start" : "center",
              borderRadius: 10,
              textDecoration: "none",
              marginBottom: 2,
              fontWeight: active ? 600 : 400,
              fontSize: 13,
              color: active ? "var(--brand)" : "var(--text-secondary)",
              background: active ? "var(--brand-light)" : "transparent",
              whiteSpace: "nowrap", overflow: "hidden",
              position: "relative",
            }}>
              {active && (
                <span style={{ position: "absolute", left: 0, top: "20%", height: "60%", width: 3, borderRadius: 99, background: "var(--brand)" }} />
              )}
              <HugeiconsIcon icon={icon} size={16} style={{ color: active ? "var(--brand)" : "var(--text-muted)", flexShrink: 0, marginLeft: active ? 6 : 0 }} />
              {open && <span>{label}</span>}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

const toggleBtn: React.CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "center",
  width: 30, height: 30, borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--surface)",
  cursor: "pointer", flexShrink: 0,
  transition: "background 0.12s",
};
