"use client";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserCircleIcon, Notification02Icon, ShieldKeyIcon, Logout01Icon, CheckmarkCircle02Icon, TrendingUpIcon } from "@hugeicons/core-free-icons";
import { mockUser } from "@/lib/mock";

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

const sections = [
  {
    icon: UserCircleIcon, label: "Profile", accent: "#e05060",
    fields: [
      { label: "Full Name", value: "Adejare Akolawole", type: "text" },
      { label: "Email", value: "adejare.akolawole@gmail.com", type: "email" },
      { label: "Display Name", value: "Adejare", type: "text" },
      { label: "Archetype", value: "The Analytical Connector", type: "text" },
    ],
  },
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

export default function SettingsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <motion.div {...f(0)}>
        <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Account</p>
        <h1 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.1 }}>Settings</h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Manage your account and preferences</p>
      </motion.div>

      <div data-cols="sidebar">
        {/* Profile card */}
        <motion.div {...f(0.06)}>
          <Card style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", height: "100%" }}>
            {/* Avatar */}
            <div style={{ position: "relative", marginBottom: 16 }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: "white", background: "linear-gradient(135deg, #7c2232, #b03040)", boxShadow: "0 4px 20px rgba(124,34,50,0.4)" }}>
                {mockUser.initials}
              </div>
              <div style={{ position: "absolute", bottom: -4, right: -4, width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#34d399", border: "2px solid white" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />
              </div>
            </div>

            <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Adejare Akolawole</p>
            <p style={{ fontSize: 12, marginTop: 2, color: "var(--text-muted)" }}>adejare.akolawole@gmail.com</p>
            <span style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 99, background: "rgba(192,64,79,0.1)", color: "var(--brand)", border: "1px solid rgba(192,64,79,0.2)" }}>
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={11} /> Premium Member
            </span>

            <div style={{ width: "100%", marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Pull Score", value: mockUser.pull_score, color: "var(--brand)" },
                { label: "Member since", value: "Sep 2026", color: "var(--text-primary)" },
                { label: "Plan", value: "Premium", color: "var(--brand)" },
                { label: "Streak", value: "12 days", color: "#fbbf24" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                  <span style={{ color: "var(--text-muted)" }}>{item.label}</span>
                  <span style={{ fontWeight: 700, color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20, padding: 12, borderRadius: 12, width: "100%", background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
              <HugeiconsIcon icon={TrendingUpIcon} size={14} style={{ color: "#34d399" }} />
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>Score rising</p>
                <p style={{ fontSize: 10, color: "var(--text-muted)" }}>+6 pts this month</p>
              </div>
            </div>

            <div style={{ width: "100%", marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <button style={{ width: "100%", padding: "10px 0", borderRadius: 12, fontSize: 13, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(192,64,79,0.25)" }}>
                Upgrade Plan
              </button>
              <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 0", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "#f87171", background: "transparent", border: "1px solid rgba(248,113,113,0.25)", cursor: "pointer" }}>
                <HugeiconsIcon icon={Logout01Icon} size={14} /> Sign Out
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Settings sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                          style={{ fontSize: 13, background: "transparent", border: "none", borderBottom: "1px solid transparent", outline: "none", textAlign: "right", maxWidth: 200, color: "var(--text-primary)" }}
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
    </div>
  );
}
