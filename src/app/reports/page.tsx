"use client";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Analytics01Icon, ArrowRight01Icon, Download02Icon, EyeIcon, AiSparklesIcon, Calendar03Icon, UserGroupIcon, TrendingUpIcon } from "@hugeicons/core-free-icons";

const f = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: d, ease: "easeOut" } });
const Card = ({ children, className = "", style = {} }: any) => (
  <div className={`rounded-2xl ${className}`} style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", ...style }}>
    {children}
  </div>
);

const reports = [
  { id: "1", title: "Jordan — Relationship Report", date: "Sep 5, 2026", type: "Relationship", score: 88, pages: 12, status: "complete" },
  { id: "2", title: "Mara — Compatibility Analysis", date: "Sep 3, 2026", type: "Compatibility", score: 71, pages: 8, status: "complete" },
  { id: "3", title: "Theo — Communication Pattern", date: "Aug 28, 2026", type: "Communication", score: 56, pages: 10, status: "complete" },
  { id: "4", title: "September Intelligence Summary", date: "Sep 1, 2026", type: "Monthly", score: 74, pages: 20, status: "complete" },
];

const typeColor: Record<string, { bg: string; color: string }> = {
  Relationship: { bg: "#fdf2f4", color: "#7c2232" },
  Compatibility: { bg: "#eff6ff", color: "#3b82f6" },
  Communication: { bg: "#fffbeb", color: "#f59e0b" },
  Monthly: { bg: "#f5f3ff", color: "#8b5cf6" },
};

export default function ReportsPage() {
  return (
    <div className="space-y-5 py-2">
      <motion.div {...f(0)} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Reports</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Intelligence reports and relationship analyses</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ background: "var(--brand)" }}>
          <HugeiconsIcon icon={AiSparklesIcon} size={15} /> Generate Report
        </button>
      </motion.div>

      {/* Summary cards */}
      <motion.div {...f(0.05)} className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Reports", value: "4", icon: Analytics01Icon, color: "#7c2232", bg: "#fdf2f4" },
          { label: "People Analysed", value: "3", icon: UserGroupIcon, color: "#3b82f6", bg: "#eff6ff" },
          { label: "Avg Score", value: "73", icon: TrendingUpIcon, color: "#22c55e", bg: "#f0fdf4" },
          { label: "This Month", value: "2", icon: Calendar03Icon, color: "#8b5cf6", bg: "#f5f3ff" },
        ].map((s) => (
          <Card key={s.label} className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
              <HugeiconsIcon icon={s.icon} size={18} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Reports list */}
      <motion.div {...f(0.1)}>
        <Card className="overflow-hidden">
          <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>All Reports</p>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {reports.map((r, i) => {
              const tc = typeColor[r.type] || { bg: "var(--bg)", color: "var(--text-muted)" };
              return (
                <motion.div key={r.id} {...f(0.12 + i * 0.05)}
                  className="flex items-center gap-4 px-5 py-4 group hover:bg-[var(--bg)] transition-all cursor-pointer">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: tc.bg }}>
                    <HugeiconsIcon icon={Analytics01Icon} size={18} style={{ color: tc.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{r.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: tc.bg, color: tc.color }}>{r.type}</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{r.date}</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>· {r.pages} pages</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{r.score}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>score</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-[var(--surface)]"
                      style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                      <HugeiconsIcon icon={EyeIcon} size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-[var(--brand-light)]"
                      style={{ color: "var(--brand)", border: "1px solid var(--border)" }}>
                      <HugeiconsIcon icon={Download02Icon} size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Generate CTA */}
      <motion.div {...f(0.3)}>
        <div className="rounded-2xl p-6 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #6b1c2b, #8c2535)", boxShadow: "0 6px 24px rgba(108,28,43,0.2)" }}>
          <div>
            <p className="text-sm font-bold text-white mb-1">Ready to generate a new report?</p>
            <p className="text-xs text-white/55 max-w-sm">Select a person from your vault to generate a deep relationship intelligence report powered by your full profile.</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-white/95 flex-shrink-0 ml-6"
            style={{ background: "white", color: "var(--brand)" }}>
            Get started <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
