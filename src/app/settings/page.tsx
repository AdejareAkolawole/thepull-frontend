"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification02Icon, ShieldKeyIcon } from "@hugeicons/core-free-icons";
import { getProfile, updateProfile, isLoggedIn, deleteAccount } from "@/lib/api";

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
  privacy_data_sharing: string;
  privacy_benchmarking: boolean;
};

const DEFAULTS: Prefs = {
  privacy_data_sharing: "Minimal",
  privacy_benchmarking: true,
};

export default function SettingsPage() {
  const router = useRouter();
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [saving, setSaving] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) { window.location.href = "/login"; return; }
    getProfile().then((p: Record<string, unknown>) => {
      const ent = (p.entitlements as Record<string, unknown>) || {};
      setPrefs({
        privacy_data_sharing: (ent.privacy_data_sharing as string) || DEFAULTS.privacy_data_sharing,
        privacy_benchmarking: ent.privacy_benchmarking !== undefined ? Boolean(ent.privacy_benchmarking) : DEFAULTS.privacy_benchmarking,
      });
    }).catch(() => {});
  }, [router]);

  function toggle(key: keyof Prefs) {
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  }

  async function saveSection(section: "privacy") {
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "#60a5fa15", border: "1px solid #60a5fa25" }}>
                  <HugeiconsIcon icon={Notification02Icon} size={16} style={{ color: "#60a5fa" }} />
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>Notifications</p>
              </div>
              <a href="/notifications" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 99, background: "rgba(96,165,250,0.1)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.2)", textDecoration: "none" }}>View →</a>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
              Your Pull activity, insights, streaks, and achievements — all in one place.
            </p>
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
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 99, background: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.2)" }}>Coming Soon</span>
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

        {/* Danger Zone */}
        <motion.div {...f(0.18)}>
          <Card style={{ padding: 20, border: "1px solid rgba(192,64,79,0.2)" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#c0404f", marginBottom: 6 }}>Danger Zone</p>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 16 }}>
              Permanently delete your account and all associated data — your profile, scores, journal, and intelligence history. This cannot be undone.
            </p>
            <DeleteAccountButton />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function DeleteAccountButton() {
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteAccount();
      localStorage.removeItem("pull_token");
      window.location.href = "/login";
    } catch {
      setDeleting(false);
      setConfirm(false);
      alert("Failed to delete account. Please try again.");
    }
  }

  if (!confirm) {
    return (
      <button
        onClick={() => setConfirm(true)}
        style={{
          padding: "10px 20px", borderRadius: 10, border: "1px solid rgba(192,64,79,0.3)",
          background: "rgba(192,64,79,0.06)", color: "#c0404f",
          fontSize: 13, fontWeight: 700, cursor: "pointer",
        }}
      >
        Delete my account
      </button>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#c0404f" }}>Are you sure? This is permanent.</p>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{
            padding: "10px 20px", borderRadius: 10, border: "none",
            background: "#c0404f", color: "#fff",
            fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: deleting ? 0.7 : 1,
          }}
        >
          {deleting ? "Deleting…" : "Yes, delete everything"}
        </button>
        <button
          onClick={() => setConfirm(false)}
          style={{
            padding: "10px 20px", borderRadius: 10, border: "1px solid var(--border)",
            background: "var(--surface)", color: "var(--text-secondary)",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}
        >
          Cancel
        </button>
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
