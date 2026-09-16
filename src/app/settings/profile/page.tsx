"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, Logout01Icon, CreditCardIcon, Edit01Icon, Tick01Icon, StarIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { getDashboard, updateProfile, logout, isLoggedIn } from "@/lib/api";

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
    is_founding_member: boolean; founder_number: number | null;
    founding_price: number | null; founder_pricing_locked: boolean;
    founding_member_status: string | null;
  } | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) { window.location.href = "/login"; return; }
    getDashboard().then(res => {
      const p = (res.profile || {}) as Record<string, unknown>;
      const arch = res.archetype as Record<string, unknown> | null;
      const name = (res.user.name as string) || (res.user.email as string).split("@")[0];
      setDash({
        name,
        email: res.user.email as string,
        initials: (res.user.initials as string) || name.slice(0, 2).toUpperCase(),
        pull_score: res.pull_score as number | null,
        archetype: (arch?.name as string) ?? null,
        plan: (p.subscription_tier as string) || "free",
        is_founding_member: p.is_founding_member === true,
        founder_number: typeof p.founder_number === "number" ? p.founder_number : null,
        founding_price: typeof p.founding_price === "number" ? p.founding_price : null,
        founder_pricing_locked: p.founder_pricing_locked === true,
        founding_member_status: (p.founding_member_status as string) || null,
      });
      setNameInput(name);
    }).catch(() => {});
  }, [router]);

  async function saveName() {
    if (!nameInput.trim() || nameInput === dash?.name) { setEditingName(false); return; }
    setSaving(true);
    setError("");
    try {
      await updateProfile({ display_name: nameInput.trim() });
      setDash(d => d ? { ...d, name: nameInput.trim(), initials: nameInput.trim().slice(0, 2).toUpperCase() } : d);
      setEditingName(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to save name.");
    } finally {
      setSaving(false);
    }
  }

  function handleSignOut() { logout(); window.location.href = "/login"; }

  const isPremium = dash?.plan !== "free";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <motion.div {...f(0)}>
        <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Account</p>
        <h1 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.1 }}>My Profile</h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Your identity and account details</p>
      </motion.div>

      {dash?.is_founding_member && dash.founder_number && (
        <motion.div {...f(0.08)}>
          <Card style={{ maxWidth: 480, padding: 24, background: "linear-gradient(135deg, #1a0a10 0%, #3d0e1a 100%)", border: "1px solid rgba(201,168,76,0.28)", boxShadow: "0 8px 28px rgba(61,14,26,0.18)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(201,168,76,0.13)", border: "1px solid rgba(201,168,76,0.3)" }}>
                  <HugeiconsIcon icon={StarIcon} size={21} style={{ color: "#e2c36a" }} />
                </div>
                <div>
                  <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(226,195,106,0.7)", marginBottom: 5 }}>Permanent Founding 500 Badge</p>
                  <p style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Founder #{String(dash.founder_number).padStart(3, "0")}</p>
                </div>
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, padding: "4px 9px", borderRadius: 99, color: dash.founding_member_status === "active" ? "#4ade80" : "rgba(255,255,255,0.55)", background: dash.founding_member_status === "active" ? "rgba(74,222,128,0.12)" : "rgba(255,255,255,0.08)", whiteSpace: "nowrap" as const }}>{dash.founding_member_status === "active" ? "ACTIVE" : "FOUNDING MEMBER"}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
              {dash.founder_pricing_locked && <span style={{ fontSize: 11, color: "rgba(245,240,232,0.7)", padding: "5px 10px", borderRadius: 99, background: "rgba(255,255,255,0.07)" }}>${dash.founding_price?.toFixed(2) ?? "19.99"}/month locked while subscribed</span>}
              <span style={{ fontSize: 11, color: "rgba(245,240,232,0.7)", padding: "5px 10px", borderRadius: 99, background: "rgba(255,255,255,0.07)" }}>Early access included</span>
            </div>
            <Link href="/founder-certificate" style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 20, color: "#e2c36a", fontSize: 12, fontWeight: 800, textDecoration: "none" }}>
              View Founder Certificate <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
            </Link>
          </Card>
        </motion.div>
      )}

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

            {/* Editable name */}
            {editingName ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <input
                  autoFocus
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") saveName(); if (e.key === "Escape") setEditingName(false); }}
                  style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", border: "none", borderBottom: "2px solid var(--brand)", outline: "none", textAlign: "center", background: "transparent", width: 200 }}
                />
                <button onClick={saveName} disabled={saving} style={{ background: "none", border: "none", cursor: "pointer", color: "#34d399", padding: 0 }}>
                  <HugeiconsIcon icon={Tick01Icon} size={18} />
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <p style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>{dash?.name ?? "—"}</p>
                <button onClick={() => setEditingName(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0, display: "flex" }}>
                  <HugeiconsIcon icon={Edit01Icon} size={14} />
                </button>
              </div>
            )}
            {error && <p style={{ fontSize: 12, color: "#f87171", marginBottom: 4 }}>{error}</p>}
            {saved && <p style={{ fontSize: 12, color: "#34d399", marginBottom: 4 }}>Name saved!</p>}

            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{dash?.email ?? "—"}</p>
            <span style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 99, background: "rgba(192,64,79,0.1)", color: "var(--brand)", border: "1px solid rgba(192,64,79,0.2)" }}>
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={11} /> {isPremium ? "Premium" : "Free"} Member
            </span>
          </div>

          {/* Stats */}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Pull Score", value: dash?.pull_score ?? "—", color: "var(--brand)" },
              { label: "Plan", value: isPremium ? "Premium" : "Free", color: "var(--brand)" },
              { label: "Archetype", value: dash?.archetype ?? "Emerging", color: "var(--text-primary)" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                <span style={{ color: "var(--text-muted)" }}>{item.label}</span>
                <span style={{ fontWeight: 700, color: item.color }}>{item.value as React.ReactNode}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            {!isPremium && (
              <button
                onClick={() => window.location.href = "/upgrade"}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(192,64,79,0.25)" }}
              >
                <HugeiconsIcon icon={CreditCardIcon} size={15} /> Upgrade to Understand Me
              </button>
            )}
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
