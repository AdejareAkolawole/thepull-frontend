"use client";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Analytics01Icon, ArrowRight01Icon, Download02Icon, EyeIcon, AiSparklesIcon, Calendar03Icon, UserGroupIcon, TrendingUpIcon } from "@hugeicons/core-free-icons";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

const Card = ({ children, style = {} }: any) => (
  <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)", ...style }}>
    {children}
  </div>
);

const reports = [
  { id: "1", title: "Jordan — Relationship Report", date: "Sep 5, 2026", type: "Relationship", score: 88, pages: 12, accent: "#e05060" },
  { id: "2", title: "Mara — Compatibility Analysis", date: "Sep 3, 2026", type: "Compatibility", score: 71, pages: 8, accent: "#60a5fa" },
  { id: "3", title: "Theo — Communication Pattern", date: "Aug 28, 2026", type: "Communication", score: 56, pages: 10, accent: "#fbbf24" },
  { id: "4", title: "September Intelligence Summary", date: "Sep 1, 2026", type: "Monthly", score: 74, pages: 20, accent: "#a78bfa" },
];

export default function ReportsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <motion.div {...f(0)} className="page-header-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Intelligence</p>
          <h1 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.1 }}>Reports</h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Deep relationship intelligence analyses</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 12, fontSize: 13, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", boxShadow: "0 4px 16px rgba(192,64,79,0.3)", border: "none", cursor: "pointer" }}>
          <HugeiconsIcon icon={AiSparklesIcon} size={14} /> Generate Report
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div {...f(0.05)} data-cols="4">
        {[
          { label: "Total Reports", value: "4", icon: Analytics01Icon, accent: "#e05060", glow: "rgba(224,80,96,0.12)" },
          { label: "Insights Generated", value: "18", icon: UserGroupIcon, accent: "#60a5fa", glow: "rgba(96,165,250,0.12)" },
          { label: "Avg Score", value: "73", icon: TrendingUpIcon, accent: "#34d399", glow: "rgba(52,211,153,0.12)" },
          { label: "This Month", value: "2", icon: Calendar03Icon, accent: "#a78bfa", glow: "rgba(167,139,250,0.12)" },
        ].map(s => (
          <Card key={s.label} style={{ padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: s.glow, border: `1px solid ${s.accent}30` }}>
              <HugeiconsIcon icon={s.icon} size={17} style={{ color: s.accent }} />
            </div>
            <div>
              <p style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)" }}>{s.value}</p>
              <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.label}</p>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Reports list */}
      <motion.div {...f(0.1)}>
        <Card>
          <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>All Reports</p>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{reports.length} reports</span>
          </div>
          <div>
            {reports.map((r, i) => (
              <motion.div key={r.id} {...f(0.12 + i * 0.05)} style={{
                display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", cursor: "pointer",
                borderBottom: i < reports.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
              }}>
                {/* Icon */}
                <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: `${r.accent}15`, border: `1px solid ${r.accent}25` }}>
                  <HugeiconsIcon icon={Analytics01Icon} size={17} style={{ color: r.accent }} />
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{r.title}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: `${r.accent}15`, color: r.accent }}>{r.type}</span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.date}</span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>· {r.pages} pages</span>
                  </div>
                </div>
                {/* Score */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: 20, fontWeight: 800, color: r.accent }}>{r.score}</p>
                  <p style={{ fontSize: 10, color: "var(--text-muted)" }}>score</p>
                </div>
                {/* Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <button style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", border: "1px solid rgba(0,0,0,0.07)", background: "transparent", cursor: "pointer" }}>
                    <HugeiconsIcon icon={EyeIcon} size={13} />
                  </button>
                  <button style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: r.accent, border: `1px solid ${r.accent}30`, background: `${r.accent}10`, cursor: "pointer" }}>
                    <HugeiconsIcon icon={Download02Icon} size={13} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* CTA banner */}
      <motion.div {...f(0.3)}>
        <div className="cta-banner" style={{ borderRadius: 16, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #3d0e1a 0%, #6b1c2b 50%, #a03040 100%)", border: "1px solid rgba(192,64,79,0.25)", boxShadow: "0 8px 40px rgba(61,14,26,0.2)" }}>
          <div style={{ position: "absolute", top: -48, left: -48, width: 192, height: 192, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,64,79,0.25), transparent)", filter: "blur(30px)" }} />
          <div style={{ position: "relative" }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 6 }}>Ready to generate a new report?</p>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.45)", maxWidth: 380 }}>
              Generate a new intelligence report powered by your full profile, dimensions, and behavioural data.
            </p>
          </div>
          <button className="cta-banner-btn" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, fontSize: 13, fontWeight: 700, color: "white", background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", flexShrink: 0, position: "relative" }}>
            Get started <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
