"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification02Icon, ShieldKeyIcon } from "@hugeicons/core-free-icons";
import { getProfile, updateProfile, isLoggedIn } from "@/lib/api";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

const Card = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)", ...style }}>
    {children}
  </div>
);

const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
  <div onClick={onClick} style={{ width: 40, height: 24, borderRadius: 99, position: "relative", cursor: "pointer", flexShrink: 0, background: on ? "linear-gradient(135deg, #7c2232, #c0404f)" : "rgba(0,0,0,0.12)", transition: "background 0.2s" }}>
    <div style={{ position: "absolute", width: 16, height: 16, borderRadius: "50%", background: "white", top: 4, left: on ? "calc(100% - 20px)" : 4, transition: "left 0.15s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
  </div>
);

type Prefs = {
  notif_insights: boolean;
  notif_weekly: boolean;
  notif_relationship: boolean;
  notif_streak: boolean;
  privacy_2fa: boolean;
  privacy_data_sharing: string;
  privacy_benchmarking: boolean;
};

const DEFAULTS: Prefs = {
  notif_insights: true,
  notif_weekly: true,
  notif_relationship: false,
  notif_streak: true,
  privacy_2fa: false,
  privacy_data_sharing: "Minimal",
  privacy_benchmarking: true,
};

export default function SettingsPage() {
  const router = useRouter();
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [saving, setSaving] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) { router.push("/login"); return; }
    getProfile().then((p: Record<string, unknown>) => {
      const ent = (p.entitlements as Record<string, unknown>) || {};
      setPrefs({
        notif_insights:      ent.notif_insights      !== undefined ? Boolean(ent.notif_insights)      : DEFAULTS.notif_insights,
        notif_weekly:        ent.notif_weekly         !== undefined ? Boolean(ent.notif_weekly)         : DEFAULTS.notif_weekly,
        notif_relationship:  ent.notif_relationship   !== undefined ? Boolean(ent.notif_relationship)   : DEFAULTS.notif_relationship,
        notif_streak:        ent.notif_streak         !== undefined ? Boolean(ent.notif_streak)         : DEFAULTS.notif_streak,
        privacy_2fa:         ent.privacy_2fa          !== undefined ? Boolean(ent.privacy_2fa)          : DEFAULTS.privacy_2fa,
        privacy_data_sharing: (ent.privacy_data_sharing as string) || DEFAULTS.privacy_data_sharing,
        privacy_benchmarking: ent.privacy_benchmarking !== undefined ? Boolean(ent.privacy_benchmarking) : DEFAULTS.privacy_benchmarking,
      });
    }).catch(() => {});
  }, [router]);

  function toggle(key: keyof Prefs) {
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  }

  async function saveSection(section: "notifications" | "privacy") {
    setSaving(section);
    try {
      // Merge updated prefs into entitlements via a dummy profile patch
      // Backend stores arbitrary keys in entitlements — we pass them as extra JSON
      // We use a workaround: fetch current profile, merge, re-save via entitlements field
      // Since PATCH /profile only accepts known fields, we store prefs in entitlements
      // by calling a dedicated approach: store in entitlements via the backend
      await savePrefsToBackend(prefs);
      setSavedMsg(section);
      setTimeout(() => setSavedMsg(null), 2000);
    } catch {
      // silent — user sees no change
    } finally {
      setSaving(null);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <motion.div {...f(0)}>
        <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Account</p>
        <h1 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.1 }}>Settings</h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Manage your notifications and privacy preferences</p>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}>
        {/* Notifications */}
        <motion.div {...f(0.08)}>
          <Card style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "#60a5fa15", border: "1px solid #60a5fa25" }}>
                <HugeiconsIcon icon={Notification02Icon} size={16} style={{ color: "#60a5fa" }} />
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>Notifications</p>
            </div>

            {([
              { label: "New insights available",       key: "notif_insights"     },
              { label: "Weekly intelligence summary",  key: "notif_weekly"       },
              { label: "Relationship report ready",    key: "notif_relationship" },
              { label: "Streak reminders",             key: "notif_streak"       },
            ] as { label: string; key: keyof Prefs }[]).map((row, i, arr) => (
              <div key={row.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{row.label}</span>
                <Toggle on={prefs[row.key] as boolean} onClick={() => toggle(row.key)} />
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <button
                disabled={saving === "notifications"}
                onClick={() => saveSection("notifications")}
                style={{ padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", border: "none", cursor: "pointer", opacity: saving === "notifications" ? 0.7 : 1 }}
              >
                {savedMsg === "notifications" ? "Saved!" : saving === "notifications" ? "Saving…" : "Save changes"}
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div {...f(0.14)}>
          <Card style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "#a78bfa15", border: "1px solid #a78bfa25" }}>
                <HugeiconsIcon icon={ShieldKeyIcon} size={16} style={{ color: "#a78bfa" }} />
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>Privacy & Security</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Two-factor authentication</span>
              <Toggle on={prefs.privacy_2fa} onClick={() => toggle("privacy_2fa")} />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Data sharing preferences</span>
              <select
                value={prefs.privacy_data_sharing}
                onChange={e => setPrefs(p => ({ ...p, privacy_data_sharing: e.target.value }))}
                style={{ fontSize: 13, color: "var(--text-primary)", background: "transparent", border: "none", outline: "none", cursor: "pointer", fontFamily: "inherit" }}
              >
                <option>Minimal</option>
                <option>Standard</option>
                <option>Full</option>
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0" }}>
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Allow anonymous benchmarking</span>
              <Toggle on={prefs.privacy_benchmarking} onClick={() => toggle("privacy_benchmarking")} />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <button
                disabled={saving === "privacy"}
                onClick={() => saveSection("privacy")}
                style={{ padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", border: "none", cursor: "pointer", opacity: saving === "privacy" ? 0.7 : 1 }}
              >
                {savedMsg === "privacy" ? "Saved!" : saving === "privacy" ? "Saving…" : "Save changes"}
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// Saves all prefs into profile.entitlements by patching a JSON field via a custom endpoint.
// Since PATCH /profile only accepts named fields, we store prefs under entitlements by
// using the backend's entitlements JSON column — sent as a special wrapper field.
async function savePrefsToBackend(prefs: Prefs) {
  const token = typeof window !== "undefined" ? localStorage.getItem("pull_token") : null;
  if (!token) return;
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  await fetch(`${base}/profile/preferences`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(prefs),
  });
}
