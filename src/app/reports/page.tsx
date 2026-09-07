"use client";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Analytics01Icon, ArrowRight01Icon, Download02Icon, EyeIcon, AiSparklesIcon, Calendar03Icon, UserGroupIcon, TrendingUpIcon } from "@hugeicons/core-free-icons";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" } });

const G = ({ children, className = "", style = {} }: any) => (
  <div className={`rounded-2xl ${className}`} style={{
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)", boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)", ...style,
  }}>{children}</div>
);

const reports = [
  { id: "1", title: "Jordan — Relationship Report", date: "Sep 5, 2026", type: "Relationship", score: 88, pages: 12, accent: "#e05060" },
  { id: "2", title: "Mara — Compatibility Analysis", date: "Sep 3, 2026", type: "Compatibility", score: 71, pages: 8, accent: "#60a5fa" },
  { id: "3", title: "Theo — Communication Pattern", date: "Aug 28, 2026", type: "Communication", score: 56, pages: 10, accent: "#fbbf24" },
  { id: "4", title: "September Intelligence Summary", date: "Sep 1, 2026", type: "Monthly", score: 74, pages: 20, accent: "#a78bfa" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-4 py-2">
      {/* Header */}
      <motion.div {...f(0)} className="flex items-end justify-between">
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--text-muted)" }}>Intelligence</p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold" style={{ color: "var(--text-primary)" }}>Reports</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Deep relationship intelligence analyses</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #7c2232, #c0404f)", boxShadow: "0 4px 16px rgba(192,64,79,0.3)" }}>
          <HugeiconsIcon icon={AiSparklesIcon} size={14} /> Generate Report
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div {...f(0.05)} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Reports", value: "4", icon: Analytics01Icon, accent: "#e05060", glow: "rgba(224,80,96,0.15)" },
          { label: "People Analysed", value: "3", icon: UserGroupIcon, accent: "#60a5fa", glow: "rgba(96,165,250,0.12)" },
          { label: "Avg Score", value: "73", icon: TrendingUpIcon, accent: "#34d399", glow: "rgba(52,211,153,0.12)" },
          { label: "This Month", value: "2", icon: Calendar03Icon, accent: "#a78bfa", glow: "rgba(167,139,250,0.12)" },
        ].map((s) => (
          <G key={s.label} className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: s.glow, border: `1px solid ${s.accent}25` }}>
              <HugeiconsIcon icon={s.icon} size={17} style={{ color: s.accent }} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
            </div>
          </G>
        ))}
      </motion.div>

      {/* Reports list */}
      <motion.div {...f(0.1)}>
        <G className="overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>All Reports</p>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>{reports.length} reports</span>
          </div>
          <div>
            {reports.map((r, i) => (
              <motion.div key={r.id} {...f(0.12 + i * 0.05)}
                className="flex items-center gap-4 px-5 py-4 cursor-pointer transition-all hover:bg-white/5"
                style={{ borderBottom: i < reports.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${r.accent}15`, border: `1px solid ${r.accent}25` }}>
                  <HugeiconsIcon icon={Analytics01Icon} size={17} style={{ color: r.accent }} />
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{r.title}</p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: `${r.accent}15`, color: r.accent }}>{r.type}</span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{r.date}</span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>· {r.pages} pages</span>
                  </div>
                </div>
                {/* Score */}
                <div className="text-right flex-shrink-0 hidden sm:block">
                  <p className="text-xl font-bold" style={{ color: r.accent }}>{r.score}</p>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>score</p>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/10"
                    style={{ color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <HugeiconsIcon icon={EyeIcon} size={13} />
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                    style={{ color: r.accent, border: `1px solid ${r.accent}30`, background: `${r.accent}10` }}>
                    <HugeiconsIcon icon={Download02Icon} size={13} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </G>
      </motion.div>

      {/* CTA banner */}
      <motion.div {...f(0.3)}>
        <div className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1a0810 0%, #2d0f1a 50%, #0f0820 100%)", border: "1px solid rgba(192,64,79,0.25)", boxShadow: "0 0 60px rgba(192,64,79,0.1)" }}>
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(192,64,79,0.25), transparent)", filter: "blur(30px)" }} />
          <div className="relative">
            <p className="text-base font-bold text-white mb-1">Ready to generate a new report?</p>
            <p className="text-sm max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Select a person from your vault to generate a deep relationship intelligence report powered by your full profile.
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold flex-shrink-0 relative transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #7c2232, #c0404f)", color: "white", boxShadow: "0 4px 16px rgba(192,64,79,0.3)" }}>
            Get started <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
