"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon, UserGroupIcon, AiBrain01Icon, Message02Icon,
  Analytics01Icon, Settings01Icon, BookOpen01Icon, FlashIcon, Logout01Icon, VaultIcon
} from "@hugeicons/core-free-icons";

const nav = [
  { href: "/dashboard", icon: Home01Icon, label: "Home" },
  { href: "/vault", icon: VaultIcon, label: "My Vault" },
  { href: "/pull-profile", icon: AiBrain01Icon, label: "Pull Profile" },
  { href: "/coach", icon: Message02Icon, label: "AI Coach" },
  { href: "/reports", icon: Analytics01Icon, label: "Reports" },
  { href: "/journey", icon: FlashIcon, label: "My Journey" },
  { href: "/journal", icon: BookOpen01Icon, label: "Journal" },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside
      className="fixed top-0 left-0 h-screen w-[220px] flex flex-col z-40"
      style={{ background: "var(--surface)", borderRight: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
    >
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #7c2232 0%, #b03040 100%)" }}>
          <span className="font-display font-bold text-sm text-white">P</span>
        </div>
        <div>
          <p className="text-sm font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>THEPULL</p>
          <p className="text-[10px] tracking-wide" style={{ color: "var(--text-muted)" }}>Intelligence</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {nav.map(({ href, icon: Icon, label }) => {
          const active = path === href || (href !== "/dashboard" && path.startsWith(href));
          return (
            <Link key={href} href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                active
                  ? "text-[var(--brand)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"
              )}
              style={active ? { background: "var(--brand-light)" } : {}}
            >
              <HugeiconsIcon icon={Icon} size={17}
                className={active ? "text-[var(--brand)]" : "text-[var(--text-muted)]"} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 space-y-1" style={{ borderTop: "1px solid var(--border)" }}>
        <Link href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-[var(--text-secondary)] hover:bg-[var(--surface-2)]">
          <HugeiconsIcon icon={Settings01Icon} size={17} className="text-[var(--text-muted)]" />
          Settings
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-[var(--text-secondary)] hover:bg-[var(--surface-2)]">
          <HugeiconsIcon icon={Logout01Icon} size={17} className="text-[var(--text-muted)]" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
