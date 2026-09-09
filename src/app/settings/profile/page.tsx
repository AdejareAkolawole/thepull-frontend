"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, TrendingUpIcon, Logout01Icon, CreditCardIcon } from "@hugeicons/core-free-icons";
import { getDashboard, logout, isLoggedIn } from "@/lib/api";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

const Card = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)", ...style }}>
    {children}
  </div>
);

export default function ProfilePage() {
  const router = useRouter();
  const [dash, setDash] = useState<{
    name: string; email: string; initials: string; pull_score: number | null;
    archetype: string | null; plan: string;
  } | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) { router.push("/login"); return; }
    getDashboard().then(res => {
      const p = (res.profile || {}) as Record<string, unknown>;
      const arch = res.archetype as Record<string, unknown> | null;
      setDash({
        name: (res.user.name as string) || (res.user.email as string).split("@")[0],
        email: res.user.email as string,
        initials: (res.user.initials as string) || "?",
        pull_score: res.pull_score as number | null,
        archetype: (arch?.name as string) ?? null,
        plan: (p.subscription_tier as string) || "free",
      });
    }).catch(() => {});
  }, [router]);

  function handleSignOut() { logout(); router.push("/login"); }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <motion.div {...f(0)}>
        <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Account</p>
        <h1 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.1 }}>My Profile</h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Your identity and account details</p>
      </motion.div>

      <motion.div {...f(0.06)}>
        <Card style={{ padding: 32, maxWidth: 480 }}>
          {/* Avatar */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 28 }}>
            <div style={{ position: "relative", marginBottom: 16 }}>
              <div style={{ width: 88, height: 88, borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, color: "white", background: "linear-gradient(135deg, #7c2232, #b03040)", boxShadow: "0 6px 24px rgba(124,34,50,0.35)" }}>
                {dash?.initials ?? "?"}
              </div>
              <div style={{ position: "absolute", bottom: -4, right: -4, width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#34d399", border: "2.5px solid white" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />
              </div>
            </div>

            <p style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>{dash?.name ?? "—"}</p>
            <p style={{ fontSize: 13, marginTop: 3, color: "var(--text-muted)" }}>{dash?.email ?? "—"}</p>
            <span style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 99, background: "rgba(192,64,79,0.1)", color: "var(--brand)", border: "1px solid rgba(192,64,79,0.2)" }}>
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={11} /> {dash?.plan === "free" ? "Free" : "Premium"} Member
            </span>
          </div>

          {/* Stats */}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Pull Score", value: dash?.pull_score ?? "—", color: "var(--brand)" },
              { label: "Plan", value: dash?.plan === "free" ? "Free" : "Premium", color: "var(--brand)" },
              { label: "Archetype", value: dash?.archetype ?? "Emerging", color: "var(--text-primary)" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                <span style={{ color: "var(--text-muted)" }}>{item.label}</span>
                <span style={{ fontWeight: 700, color: item.color }}>{item.value as React.ReactNode}</span>
              </div>
            ))}
          </div>

          {/* Score rising */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20, padding: 14, borderRadius: 12, background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <HugeiconsIcon icon={TrendingUpIcon} size={15} style={{ color: "#34d399" }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Score rising</p>
              <p style={{ fontSize: 11, color: "var(--text-muted)" }}>+6 pts this month</p>
            </div>
          </div>

          {/* Actions */}
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              onClick={() => router.push("/upgrade")}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(192,64,79,0.25)" }}
            >
              <HugeiconsIcon icon={CreditCardIcon} size={15} /> Upgrade Plan
            </button>
            <button
              onClick={handleSignOut}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#f87171", background: "transparent", border: "1px solid rgba(248,113,113,0.25)", cursor: "pointer" }}
            >
              <HugeiconsIcon icon={Logout01Icon} size={15} /> Sign Out
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
