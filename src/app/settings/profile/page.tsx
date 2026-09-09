"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, Logout01Icon, CreditCardIcon, Edit01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { getDashboard, getProfile, updateProfile, logout, isLoggedIn } from "@/lib/api";

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
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) { router.push("/login"); return; }
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

  function handleSignOut() { logout(); router.push("/login"); }

  const isPremium = dash?.plan !== "free";

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
                onClick={() => router.push("/upgrade")}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(192,64,79,0.25)" }}
              >
                <HugeiconsIcon icon={CreditCardIcon} size={15} /> Upgrade to Premium
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
