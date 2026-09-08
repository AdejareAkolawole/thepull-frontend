"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon, AiBrain01Icon, BookOpen01Icon, Message02Icon,
  FlashIcon, ScaleIcon, Notification01Icon, UserCircleIcon,
  CreditCardIcon, Settings01Icon, AiSparklesIcon, CompassIcon,
} from "@hugeicons/core-free-icons";

const mainNav = [
  { href: "/dashboard", icon: Home01Icon, label: "Home" },
  { href: "/pull-profile", icon: AiSparklesIcon, label: "Pull Profile" },
  { href: "/journal", icon: BookOpen01Icon, label: "Journal" },
  { href: "/coach", icon: AiBrain01Icon, label: "Ask The Pull" },
  { href: "/reports", icon: ScaleIcon, label: "Reality Check" },
  { href: "/journey", icon: CompassIcon, label: "Journey" },
];

export default function Sidebar() {
  const path = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? path === href : path.startsWith(href);

  const NavItem = ({ href, icon, label }: { href: string; icon: any; label: string }) => {
    const active = isActive(href);
    return (
      <Link
        href={href}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "9px 14px",
          borderRadius: 99,
          textDecoration: "none",
          fontSize: 13.5,
          fontWeight: active ? 700 : 500,
          color: active ? "#c0404f" : "rgba(15,10,20,0.55)",
          background: active ? "rgba(192,64,79,0.09)" : "transparent",
          transition: "all 0.15s",
          marginBottom: 2,
        }}
      >
        <HugeiconsIcon icon={icon} size={17} style={{ color: active ? "#c0404f" : "rgba(15,10,20,0.38)", flexShrink: 0 }} />
        {label}
      </Link>
    );
  };

  return (
    <aside style={{
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: 236,
      display: "flex",
      flexDirection: "column",
      zIndex: 40,
      background: "#f5f4f0",
      borderRight: "1px solid rgba(15,10,20,0.07)",
    }}>

      {/* Logo */}
      <div style={{ padding: "22px 18px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <img src="/logo.jpg" alt="ThePull" style={{ height: 32, width: "auto", borderRadius: 8, flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: 13, fontWeight: 800, color: "#0f0a14", lineHeight: 1.2, letterSpacing: "-0.02em" }}>MyPullScore</p>
          <p style={{ fontSize: 9.5, color: "rgba(15,10,20,0.4)", lineHeight: 1.3, marginTop: 1 }}>Personal intelligence that grows with you.</p>
        </div>
      </div>

      {/* Main nav */}
      <nav style={{ flex: 1, padding: "4px 10px", overflowY: "auto" }}>
        {mainNav.map(item => <NavItem key={item.href} {...item} />)}
      </nav>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(15,10,20,0.08)", margin: "0 10px" }} />

      {/* Bottom section */}
      <div style={{ padding: "12px 10px" }}>
        <NavItem href="/notifications" icon={Notification01Icon} label="Notifications" />

        {/* User greeting */}
        <div style={{ padding: "10px 14px", marginBottom: 2 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#0f0a14" }}>Good Morning 👋</p>
          <p style={{ fontSize: 11, color: "rgba(15,10,20,0.42)", marginTop: 1 }}>adejare.akolawole@gmail.com</p>
        </div>

        <NavItem href="/settings/profile" icon={UserCircleIcon} label="My Profile" />
        <NavItem href="/upgrade" icon={CreditCardIcon} label="Subscription" />
        <NavItem href="/settings" icon={Settings01Icon} label="Settings" />
      </div>
    </aside>
  );
}
