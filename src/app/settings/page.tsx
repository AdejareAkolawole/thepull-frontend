"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification02Icon, ShieldKeyIcon } from "@hugeicons/core-free-icons";
import { isLoggedIn } from "@/lib/api";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

const Card = ({ children, style = {} }: any) => (
  <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)", ...style }}>
    {children}
  </div>
);

const Toggle = ({ on }: { on: boolean }) => (
  <div style={{ width: 40, height: 24, borderRadius: 99, position: "relative", cursor: "pointer", flexShrink: 0, background: on ? "linear-gradient(135deg, #7c2232, #c0404f)" : "rgba(0,0,0,0.12)" }}>
    <div style={{ position: "absolute", width: 16, height: 16, borderRadius: "50%", background: "white", top: 4, left: on ? "calc(100% - 20px)" : 4, transition: "left 0.15s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
  </div>
);

export default function SettingsPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) { router.push("/login"); return; }
  }, [router]);

  const sections = [
    {
      icon: Notification02Icon, label: "Notifications", accent: "#60a5fa",
      fields: [
        { label: "New insights available", value: "On", type: "toggle" },
        { label: "Weekly intelligence summary", value: "On", type: "toggle" },
        { label: "Relationship report ready", value: "Off", type: "toggle" },
        { label: "Streak reminders", value: "On", type: "toggle" },
      ],
    },
    {
      icon: ShieldKeyIcon, label: "Privacy & Security", accent: "#a78bfa",
      fields: [
        { label: "Two-factor authentication", value: "Off", type: "toggle" },
        { label: "Data sharing preferences", value: "Minimal", type: "text" },
        { label: "Allow anonymous benchmarking", value: "On", type: "toggle" },
      ],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <motion.div {...f(0)}>
        <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Account</p>
        <h1 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.1 }}>Settings</h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Manage your account and preferences</p>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}>
        {sections.map((s, si) => (
          <motion.div key={s.label} {...f(0.1 + si * 0.06)}>
            <Card style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `${s.accent}15`, border: `1px solid ${s.accent}25` }}>
                  <HugeiconsIcon icon={s.icon} size={16} style={{ color: s.accent }} />
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{s.label}</p>
              </div>
              <div>
                {s.fields.map((field, fi) => (
                  <div key={field.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: fi < s.fields.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{field.label}</span>
                    {field.type === "toggle" ? (
                      <Toggle on={field.value === "On"} />
                    ) : (
                      <input defaultValue={field.value}
                        style={{ fontSize: 13, background: "transparent", border: "none", borderBottom: "1px solid transparent", outline: "none", textAlign: "right", maxWidth: "min(200px, 50vw)", color: "var(--text-primary)" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "var(--brand)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "transparent")} />
                    )}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                <button style={{ padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", border: "none", cursor: "pointer" }}>
                  Save changes
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
