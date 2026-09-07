"use client";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, AddCircleIcon, FlashIcon, Target01Icon, ArrowRight01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";
import { mockJourneySteps } from "@/lib/mock";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

const G = ({ children, className = "", style = {} }: any) => (
  <div className={`rounded-2xl ${className}`} style={{
    background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)", ...style,
  }}>{children}</div>
);

const milestones = [
  { label: "Joined THEPULL", date: "Sep 1, 2026", done: true },
  { label: "Completed first assessment", date: "Sep 2, 2026", done: true },
  { label: "Added first person to vault", date: "Sep 3, 2026", done: true },
  { label: "First AI Coach session", date: "Sep 4, 2026", done: true },
  { label: "Generated first relationship report", date: "Sep 5, 2026", done: true },
  { label: "Complete Emotional Landscape assessment", date: "Upcoming", done: false },
  { label: "Reach Pull Score 80+", date: "Upcoming", done: false },
  { label: "30-day insight streak", date: "Upcoming", done: false },
];

export default function JourneyPage() {
  const done = milestones.filter(m => m.done).length;
  const pct = Math.round((done / milestones.length) * 100);
  return (
    <div className="space-y-4 py-2">
      <motion.div {...f(0)}>
        <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--text-muted)" }}>Growth path</p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold" style={{ color: "var(--text-primary)" }}>My Journey</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Your personal intelligence timeline</p>
      </motion.div>

      {/* Hero progress */}
      <motion.div {...f(0.05)} className="rounded-2xl relative overflow-hidden" style={{ minHeight: 200 }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a0810 0%, #2d0f1a 40%, #0f0820 80%, #07070f 100%)" }} />
        <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(192,64,79,0.3), transparent)", filter: "blur(40px)" }} />
        <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="flex-1">
            <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Journey Progress</p>
            <p className="font-display text-4xl md:text-5xl font-semibold text-white">{done}<span className="text-2xl font-light" style={{ color: "rgba(255,255,255,0.35)" }}>/{milestones.length}</span></p>
            <p className="text-sm mt-1 mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>Milestones complete · {pct}% through foundation</p>
            {/* Progress bar */}
            <div className="max-w-sm">
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <motion.div className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #7c2232, #e05060)" }}
                  initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.2, delay: 0.4 }} />
              </div>
            </div>
            {/* Stats row */}
            <div className="flex items-center gap-6 mt-5">
              {[
                { label: "Complete", value: done },
                { label: "Remaining", value: milestones.length - done },
                { label: "Day streak", value: 12 },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-3">
                  {i > 0 && <div className="w-px h-6" style={{ background: "rgba(255,255,255,0.12)" }} />}
                  <div>
                    <p className="text-xl font-bold text-white">{s.value}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Pct circle */}
          <div className="relative w-28 h-28 flex-shrink-0">
            <svg viewBox="0 0 112 112" style={{ width: "100%", height: "100%" }}>
              <circle cx="56" cy="56" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
              <circle cx="56" cy="56" r="46" fill="none" stroke="url(#journeyGrad)" strokeWidth="5"
                strokeLinecap="round" strokeDasharray={`${(pct / 100) * 289.03} 289.03`}
                transform="rotate(-90 56 56)" />
              <defs>
                <linearGradient id="journeyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c2232" />
                  <stop offset="100%" stopColor="#e05060" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-2xl font-bold text-white">{pct}%</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,7fr) minmax(0,5fr)", gap: 12 }}>
        {/* Timeline */}
        <motion.div {...f(0.1)}>
          <G className="p-5 h-full">
            <p className="text-[13px] font-bold mb-5" style={{ color: "var(--text-primary)" }}>Milestones</p>
            <div className="relative">
              <div className="absolute left-[18px] top-0 bottom-0 w-px" style={{ background: "rgba(0,0,0,0.07)" }} />
              <div className="space-y-4">
                {milestones.map((m, i) => (
                  <motion.div key={m.label} {...f(0.12 + i * 0.04)} className="flex items-start gap-4">
                    <div className="flex-shrink-0 z-10 w-9 flex justify-center">
                      <HugeiconsIcon icon={m.done ? CheckmarkCircle02Icon : AddCircleIcon} size={20}
                        style={{ color: m.done ? "#34d399" : "rgba(0,0,0,0.15)" }} />
                    </div>
                    <div className="flex-1 pb-1">
                      <p className="text-sm font-semibold" style={{ color: m.done ? "var(--text-primary)" : "var(--text-muted)" }}>{m.label}</p>
                      <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                        <HugeiconsIcon icon={Calendar03Icon} size={10} /> {m.date}
                      </p>
                    </div>
                    {m.done && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
                        Done
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </G>
        </motion.div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Steps */}
          <motion.div {...f(0.14)}>
            <G className="p-5">
              <p className="text-[13px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>Journey Steps</p>
              <div className="space-y-3">
                {mockJourneySteps.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={{
                        background: s.done ? "rgba(224,80,96,0.15)" : "rgba(0,0,0,0.04)",
                        color: s.done ? "var(--brand)" : "var(--text-muted)",
                        border: `1px solid ${s.done ? "rgba(224,80,96,0.25)" : "rgba(0,0,0,0.08)"}`,
                      }}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold" style={{ color: s.done ? "var(--text-primary)" : "var(--text-muted)" }}>{s.label}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.description}</p>
                    </div>
                    {s.done && <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} style={{ color: "#34d399", flexShrink: 0 }} />}
                  </div>
                ))}
              </div>
            </G>
          </motion.div>

          {/* Streak */}
          <motion.div {...f(0.18)}>
            <G className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.2)" }}>
                  <HugeiconsIcon icon={FlashIcon} size={17} style={{ color: "#fbbf24" }} />
                </div>
                <div>
                  <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>12-Day Streak</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Personal best — keep going!</p>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-md"
                    style={{
                      background: i < 12 ? `rgba(251,191,36,${0.35 + i * 0.05})` : "rgba(255,255,255,0.04)",
                      border: i < 12 ? "1px solid rgba(251,191,36,0.3)" : "1px solid rgba(255,255,255,0.06)",
                    }} />
                ))}
              </div>
            </G>
          </motion.div>

          {/* Next step CTA */}
          <motion.div {...f(0.22)}>
            <div className="rounded-2xl p-4 flex items-center justify-between relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1a0810, #2d0f1a)", border: "1px solid rgba(192,64,79,0.25)" }}>
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(192,64,79,0.3), transparent)", filter: "blur(16px)" }} />
              <div className="flex items-center gap-3 relative">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(224,80,96,0.2)", border: "1px solid rgba(224,80,96,0.3)" }}>
                  <HugeiconsIcon icon={Target01Icon} size={14} style={{ color: "var(--brand)" }} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>Next: Emotional Landscape</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>~8 min assessment</p>
                </div>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white flex-shrink-0 relative transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #7c2232, #c0404f)" }}>
                Start <HugeiconsIcon icon={ArrowRight01Icon} size={10} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
