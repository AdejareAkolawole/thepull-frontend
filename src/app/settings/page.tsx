"use client";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Settings01Icon, UserCircleIcon, Notification02Icon, ShieldKeyIcon, CreditCardIcon, Logout01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { mockUser } from "@/lib/mock";

const f = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: d, ease: [0.22, 1, 0.36, 1] } });
const Card = ({ children, className = "", style = {} }: any) => (
  <div className={`rounded-2xl ${className}`} style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", ...style }}>
    {children}
  </div>
);

const sections = [
  {
    icon: UserCircleIcon, label: "Profile", color: "var(--brand)", bg: "var(--brand-light)",
    fields: [
      { label: "Full Name", value: "Adejare Akolawole", type: "text" },
      { label: "Email", value: "adejare.akolawole@gmail.com", type: "email" },
      { label: "Display Name", value: "Adejare", type: "text" },
      { label: "Archetype", value: "The Analytical Connector", type: "text" },
    ],
  },
  {
    icon: Notification02Icon, label: "Notifications", color: "#3b82f6", bg: "#eff6ff",
    fields: [
      { label: "New insights available", value: "On", type: "toggle" },
      { label: "Weekly intelligence summary", value: "On", type: "toggle" },
      { label: "Relationship report ready", value: "Off", type: "toggle" },
      { label: "Streak reminders", value: "On", type: "toggle" },
    ],
  },
  {
    icon: ShieldKeyIcon, label: "Privacy & Security", color: "#8b5cf6", bg: "#f5f3ff",
    fields: [
      { label: "Two-factor authentication", value: "Off", type: "toggle" },
      { label: "Data sharing preferences", value: "Minimal", type: "text" },
      { label: "Allow anonymous benchmarking", value: "On", type: "toggle" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-5 py-2">
      <motion.div {...f(0)}>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Settings</h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Manage your account and preferences</p>
      </motion.div>

      <div className="grid grid-cols-12 gap-5">
        {/* Profile card */}
        <motion.div {...f(0.06)} className="col-span-4">
          <Card className="p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mb-4"
              style={{ background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
              {mockUser.initials}
            </div>
            <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Adejare Akolawole</p>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>adejare.akolawole@gmail.com</p>
            <span className="mt-3 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5"
              style={{ background: "var(--brand-light)", color: "var(--brand)" }}>
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={11} /> Premium Member
            </span>

            <div className="w-full mt-5 pt-5 space-y-3" style={{ borderTop: "1px solid var(--border)" }}>
              {[
                { label: "Pull Score", value: mockUser.pull_score, color: "var(--brand)" },
                { label: "Member since", value: "Sep 2026", color: "var(--text-primary)" },
                { label: "Plan", value: "Premium", color: "var(--brand)" },
                { label: "Streak", value: "12 days", color: "#f59e0b" },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-xs">
                  <span style={{ color: "var(--text-muted)" }}>{item.label}</span>
                  <span className="font-bold" style={{ color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>

            <div className="w-full mt-5 space-y-2">
              <button className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: "var(--brand)" }}>Upgrade Plan</button>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-red-50"
                style={{ border: "1px solid #fecaca", color: "#ef4444" }}>
                <HugeiconsIcon icon={Logout01Icon} size={14} /> Sign Out
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Settings sections */}
        <div className="col-span-8 space-y-4">
          {sections.map((s, si) => (
            <motion.div key={s.label} {...f(0.1 + si * 0.06)}>
              <Card className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                    <HugeiconsIcon icon={s.icon} size={17} style={{ color: s.color }} />
                  </div>
                  <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>{s.label}</p>
                </div>
                <div className="space-y-1">
                  {s.fields.map((field) => (
                    <div key={field.label} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{field.label}</span>
                      {field.type === "toggle" ? (
                        <div className="w-10 h-6 rounded-full relative cursor-pointer transition-all"
                          style={{ background: field.value === "On" ? "var(--brand)" : "var(--border)" }}>
                          <div className="absolute w-4 h-4 rounded-full bg-white top-1 transition-all"
                            style={{ left: field.value === "On" ? "calc(100% - 20px)" : 4 }} />
                        </div>
                      ) : (
                        <input defaultValue={field.value} className="text-sm bg-transparent text-right outline-none border-b border-transparent transition-all focus:border-[var(--brand)] max-w-[200px]"
                          style={{ color: "var(--text-primary)" }} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <button className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                    style={{ background: "var(--brand)" }}>Save changes</button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
