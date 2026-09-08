"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon, AiBrain01Icon, BookOpen01Icon, Message02Icon,
  FlashIcon, ScaleIcon, Notification01Icon, UserCircleIcon,
  CreditCardIcon, Settings01Icon, AiSparklesIcon, CompassIcon,
  ArrowLeft01Icon, ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

const mainNav = [
  { href: "/dashboard",   icon: Home01Icon,       label: "Home" },
  { href: "/pull-profile",icon: AiSparklesIcon,   label: "Pull Profile" },
  { href: "/journal",     icon: BookOpen01Icon,   label: "Journal" },
  { href: "/coach",       icon: AiBrain01Icon,    label: "Ask The Pull" },
  { href: "/reports",     icon: ScaleIcon,        label: "Reality Check" },
  { href: "/journey",     icon: CompassIcon,      label: "Journey" },
];

const bottomNav = [
  { href: "/notifications",    icon: Notification01Icon, label: "Notifications" },
  { href: "/settings/profile", icon: UserCircleIcon,     label: "My Profile" },
  { href: "/upgrade",          icon: CreditCardIcon,     label: "Subscription" },
  { href: "/settings",         icon: Settings01Icon,     label: "Settings" },
];

const W_OPEN = 236;
const W_CLOSED = 64;

export default function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(true);

  // sync CSS class on <html> so main content can offset correctly
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-open");
    if (saved === "false") setOpen(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-open", String(open));
    document.documentElement.classList.toggle("sidebar-collapsed", !open);
  }, [open]);

  const isActive = (href: string) =>
    href === "/dashboard" ? path === href : path.startsWith(href);

  const NavItem = ({ href, icon, label }: { href: string; icon: any; label: string }) => {
    const active = isActive(href);
    return (
      <Link href={href} title={!open ? label : undefined} style={{
        display: "flex",
        alignItems: "center",
        gap: open ? 10 : 0,
        padding: open ? "9px 14px" : "9px 0",
        justifyContent: open ? "flex-start" : "center",
        borderRadius: 99,
        textDecoration: "none",
        fontSize: 13.5,
        fontWeight: active ? 700 : 500,
        color: active ? "#c0404f" : "rgba(15,10,20,0.55)",
        background: active ? "rgba(192,64,79,0.09)" : "transparent",
        transition: "all 0.2s",
        marginBottom: 2,
        overflow: "hidden",
        whiteSpace: "nowrap" as const,
      }}>
        <HugeiconsIcon icon={icon} size={18} style={{ color: active ? "#c0404f" : "rgba(15,10,20,0.38)", flexShrink: 0 }} />
        {open && <span style={{ transition: "opacity 0.15s", opacity: open ? 1 : 0 }}>{label}</span>}
      </Link>
    );
  };

  return (
    <aside className="app-sidebar" style={{
      position: "fixed",
      top: 0, left: 0,
      height: "100vh",
      width: open ? W_OPEN : W_CLOSED,
      display: "flex",
      flexDirection: "column",
      zIndex: 40,
      background: "#f5f4f0",
      borderRight: "1px solid rgba(15,10,20,0.07)",
      overflowY: "auto",
      overflowX: "hidden",
      transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
    }}>

      {/* Logo + collapse toggle */}
      <div style={{
        padding: open ? "20px 14px 16px" : "20px 0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: open ? "space-between" : "center",
        gap: 8,
        transition: "padding 0.25s",
      }}>
        {open && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
            <img src="/logo.jpg" alt="ThePull" style={{ height: 32, width: "auto", borderRadius: 8, flexShrink: 0 }} />
            <div style={{ overflow: "hidden" }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#0f0a14", lineHeight: 1.2, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>MyPullScore</p>
              <p style={{ fontSize: 9.5, color: "rgba(15,10,20,0.4)", lineHeight: 1.3, marginTop: 1, whiteSpace: "nowrap" }}>Personal intelligence that grows with you.</p>
            </div>
          </div>
        )}
        {!open && (
          <img src="/logo.jpg" alt="ThePull" style={{ height: 32, width: 32, borderRadius: 8, objectFit: "cover" }} />
        )}
        <button onClick={() => setOpen(o => !o)} title={open ? "Collapse sidebar" : "Expand sidebar"} style={{
          width: 28, height: 28, borderRadius: 8,
          border: "1px solid rgba(15,10,20,0.1)",
          background: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", flexShrink: 0,
          color: "rgba(15,10,20,0.45)",
          transition: "background 0.15s",
        }}>
          <HugeiconsIcon icon={open ? ArrowLeft01Icon : ArrowRight01Icon} size={13} />
        </button>
      </div>

      {/* Main nav */}
      <nav style={{ flex: 1, padding: open ? "4px 10px" : "4px 8px", overflowY: "auto", overflowX: "hidden" }}>
        {mainNav.map(item => <NavItem key={item.href} {...item} />)}
      </nav>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(15,10,20,0.08)", margin: open ? "0 10px" : "0 8px" }} />

      {/* Bottom section */}
      <div style={{ padding: open ? "12px 10px" : "12px 8px" }}>
        <NavItem href="/notifications" icon={Notification01Icon} label="Notifications" />

        {/* User greeting — only when expanded */}
        {open && (
          <div style={{ padding: "10px 14px", marginBottom: 2 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#0f0a14", whiteSpace: "nowrap" }}>Good Morning 👋</p>
            <p style={{ fontSize: 11, color: "rgba(15,10,20,0.42)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>adejare.akolawole@gmail.com</p>
          </div>
        )}

        <NavItem href="/settings/profile" icon={UserCircleIcon}  label="My Profile" />
        <NavItem href="/upgrade"          icon={CreditCardIcon}  label="Subscription" />
        <NavItem href="/settings"         icon={Settings01Icon}  label="Settings" />
      </div>
    </aside>
  );
}
