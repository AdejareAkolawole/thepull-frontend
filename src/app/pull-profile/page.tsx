"use client";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, TrendingUpIcon, AiSparklesIcon, Activity01Icon, UserCircleIcon, Target01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { mockUser, mockDimensions } from "@/lib/mock";

const f = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: d, ease: [0.22, 1, 0.36, 1] } });
const Card = ({ children, className = "", style = {} }: any) => (
  <div className={`rounded-2xl ${className}`} style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", ...style }}>
    {children}
  </div>
);

const traits = [
  "Deeply analytical before emotional disclosure",
  "High empathy with selective vulnerability",
  "Strong pattern recognition in social dynamics",
  "Tendency to over-explain when nervous",
  "Values authenticity above social approval",
];

const history = [
  { label: "Sep 1", score: 68, note: "Baseline" },
  { label: "Sep 14", score: 71, note: "+3" },
  { label: "Sep 21", score: 74, note: "+3" },
];

export default function PullProfilePage() {
  return (
    <div className="space-y-4 py-2">
      {/* Hero */}
      <motion.div {...f(0)} className="relative rounded-2xl md:rounded-3xl overflow-hidden p-5 md:p-8"
        style={{ background: "linear-gradient(135deg, #6b1c2b 0%, #8c2535 40%, #b03040 100%)" }}>
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07), transparent 65%)" }} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-white/50 mb-3">Pull Profile</p>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                {mockUser.initials}
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-semibold text-white">{mockUser.name}</h1>
                <p className="text-sm text-white/60 mt-0.5">{mockUser.archetype}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}>
                <HugeiconsIcon icon={TrendingUpIcon} size={11} /> Rising trajectory
              </span>
              <span className="text-xs text-white/60">Top 18% of users</span>
            </div>
          </div>
          <div className="flex items-center gap-4 md:flex-col md:items-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <svg className="absolute inset-0 -rotate-90 w-full h-full">
                <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5%" />
                <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="5%"
                  strokeLinecap="round" strokeDasharray={`${74 * 2.826} 282.6`} />
              </svg>
              <p className="text-3xl md:text-4xl font-bold text-white">{mockUser.pull_score}</p>
              <p className="text-[10px] tracking-widest uppercase text-white/50 mt-0.5">Pull Score</p>
            </div>
            <Link href="/coach"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:bg-white/95"
              style={{ background: "white", color: "var(--brand)" }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={12} /> Ask about my profile
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Dimensions */}
        <motion.div {...f(0.1)} className="md:col-span-5">
          <Card className="p-5">
            <p className="text-[13px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>Intelligence Dimensions</p>
            <div className="space-y-4">
              {mockDimensions.map((d, i) => (
                <div key={d.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{d.label}</span>
                    <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{d.score}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg)" }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #7c2232, #c0404f)" }}
                      initial={{ width: 0 }} animate={{ width: `${d.score}%` }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.07 }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Overall</p>
              <p className="text-lg font-bold" style={{ color: "var(--brand)" }}>73.6 / 100</p>
            </div>
          </Card>
        </motion.div>

        <div className="md:col-span-7 flex flex-col gap-4">
          {/* Traits */}
          <motion.div {...f(0.14)}>
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <HugeiconsIcon icon={UserCircleIcon} size={16} style={{ color: "var(--brand)" }} />
                <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>Core Traits</p>
              </div>
              <div className="space-y-2.5">
                {traits.map((t) => (
                  <div key={t} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "var(--brand)" }} />
                    <p className="text-sm leading-snug" style={{ color: "var(--text-secondary)" }}>{t}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Score history */}
          <motion.div {...f(0.18)}>
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={Activity01Icon} size={16} style={{ color: "var(--brand)" }} />
                  <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>Score History</p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#f0fdf4", color: "#16a34a" }}>+6 this month</span>
              </div>
              <div className="flex items-end gap-4 h-24">
                {history.map((h, i) => (
                  <div key={h.label} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{h.score}</span>
                    <motion.div className="w-full rounded-t-lg flex-1"
                      style={{ background: i === history.length - 1 ? "var(--brand)" : "var(--bg)", border: "1px solid var(--border)", maxHeight: `${h.score}%` }}
                      initial={{ scaleY: 0, originY: 1 }} animate={{ scaleY: 1 }}
                      transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }} />
                    <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{h.note}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div {...f(0.22)}>
            <div className="rounded-2xl p-4 md:p-5 flex items-center justify-between"
              style={{ background: "var(--brand-light)", border: "1px solid #f5c6cc" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--brand)" }}>
                  <HugeiconsIcon icon={Target01Icon} size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--brand)" }}>Complete Emotional Landscape</p>
                  <p className="text-xs" style={{ color: "var(--brand)", opacity: 0.65 }}>Next assessment unlocks new insights</p>
                </div>
              </div>
              <Link href="/journey"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white flex-shrink-0 ml-3"
                style={{ background: "var(--brand)" }}>
                Start <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
