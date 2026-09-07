"use client";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserCircleIcon, Notification02Icon, ShieldKeyIcon, Logout01Icon, CheckmarkCircle02Icon, TrendingUpIcon } from "@hugeicons/core-free-icons";
import { mockUser } from "@/lib/mock";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" } });

const G = ({ children, className = "", style = {} }: any) => (
  <div className={`rounded-2xl ${className}`} style={{
    background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)", ...style,
  }}>{children}</div>
);

const Toggle = ({ on }: { on: boolean }) => (
  <div className="w-10 h-6 rounded-full relative cursor-pointer transition-all flex-shrink-0"
    style={{ background: on ? "linear-gradient(135deg, #7c2232, #c0404f)" : "rgba(255,255,255,0.1)" }}>
    <div className="absolute w-4 h-4 rounded-full bg-white top-1 transition-all shadow-sm"
      style={{ left: on ? "calc(100% - 20px)" : 4 }} />
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
    <div className="space-y-4 py-2">
      <motion.div {...f(0)}>
        <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--text-muted)" }}>Account</p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold" style={{ color: "var(--text-primary)" }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Manage your account and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Profile card */}
        <motion.div {...f(0.06)} className="md:col-span-4">
          <G className="p-6 flex flex-col items-center text-center h-full">
            {/* Avatar */}
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
                style={{ background: "linear-gradient(135deg, #7c2232, #b03040)", boxShadow: "0 4px 20px rgba(124,34,50,0.4)" }}>
                {mockUser.initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: "#34d399", border: "2px solid #07070f" }}>
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>

            <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Adejare Akolawole</p>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>adejare.akolawole@gmail.com</p>
            <span className="mt-3 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5"
              style={{ background: "rgba(224,80,96,0.12)", color: "var(--brand)", border: "1px solid rgba(224,80,96,0.2)" }}>
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={11} /> Premium Member
            </span>

            <div className="w-full mt-5 pt-5 space-y-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              {[
                { label: "Pull Score", value: mockUser.pull_score, color: "var(--brand)" },
                { label: "Member since", value: "Sep 2026", color: "var(--text-primary)" },
                { label: "Plan", value: "Premium", color: "var(--brand)" },
                { label: "Streak", value: "12 days", color: "#fbbf24" },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-xs">
                  <span style={{ color: "var(--text-muted)" }}>{item.label}</span>
                  <span className="font-bold" style={{ color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Score ring small */}
            <div className="flex items-center gap-3 mt-5 p-3 rounded-xl w-full"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <HugeiconsIcon icon={TrendingUpIcon} size={14} style={{ color: "#34d399" }} />
              <div className="flex-1 text-left">
                <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Score rising</p>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>+6 pts this month</p>
              </div>
            </div>

            <div className="w-full mt-4 space-y-2">
              <button className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #7c2232, #c0404f)", boxShadow: "0 4px 12px rgba(192,64,79,0.25)" }}>
                Upgrade Plan
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-black/[0.02]"
                style={{ border: "1px solid rgba(248,113,113,0.25)", color: "#f87171" }}>
                <HugeiconsIcon icon={Logout01Icon} size={14} /> Sign Out
              </button>
            </div>
          </G>
        </motion.div>

        {/* Settings sections */}
        <div className="md:col-span-8 space-y-3">
          {sections.map((s, si) => (
            <motion.div key={s.label} {...f(0.1 + si * 0.06)}>
              <G className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}25` }}>
                    <HugeiconsIcon icon={s.icon} size={16} style={{ color: s.accent }} />
                  </div>
                  <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>{s.label}</p>
                </div>
                <div>
                  {s.fields.map((field, fi) => (
                    <div key={field.label} className="flex items-center justify-between py-3"
                      style={{ borderBottom: fi < s.fields.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{field.label}</span>
                      {field.type === "toggle" ? (
                        <Toggle on={field.value === "On"} />
                      ) : (
                        <input defaultValue={field.value}
                          className="text-sm bg-transparent text-right outline-none border-b border-transparent transition-colors max-w-[200px]"
                          style={{ color: "var(--text-primary)" }}
                          onFocus={e => (e.currentTarget.style.borderColor = "var(--brand)")}
                          onBlur={e => (e.currentTarget.style.borderColor = "transparent")} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <button className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #7c2232, #c0404f)" }}>
                    Save changes
                  </button>
                </div>
              </G>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
