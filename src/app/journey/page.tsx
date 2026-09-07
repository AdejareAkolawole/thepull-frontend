"use client";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, AddCircleIcon, FlashIcon, Target01Icon, ArrowRight01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";
import { mockJourneySteps } from "@/lib/mock";

const f = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: d, ease: "easeOut" } });
const Card = ({ children, className = "", style = {} }: any) => (
  <div className={`rounded-2xl ${className}`} style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", ...style }}>
    {children}
  </div>
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
  return (
    <div className="space-y-5 py-2">
      <motion.div {...f(0)}>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>My Journey</h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Your personal intelligence timeline</p>
      </motion.div>

      {/* Progress hero */}
      <motion.div {...f(0.05)} className="rounded-3xl p-8"
        style={{ background: "linear-gradient(135deg, #6b1c2b 0%, #b03040 100%)", boxShadow: "0 8px 32px rgba(108,28,43,0.22)" }}>
        <div className="flex items-center justify-between gap-8">
          <div className="flex-1">
            <p className="text-xs tracking-[0.2em] uppercase text-white/50 mb-2">Journey Progress</p>
            <p className="font-display text-4xl font-semibold text-white">{done}/{milestones.length} Milestones</p>
            <p className="text-white/60 text-sm mt-2">You're {Math.round(done/milestones.length*100)}% through your foundation journey</p>
            <div className="mt-5 max-w-sm">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div className="h-full rounded-full bg-white"
                  initial={{ width: 0 }} animate={{ width: `${done/milestones.length*100}%` }}
                  transition={{ duration: 1.2, delay: 0.3 }} />
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="text-center">
                <p className="text-xl font-bold text-white">{done}</p>
                <p className="text-xs text-white/50">Complete</p>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="text-center">
                <p className="text-xl font-bold text-white">{milestones.length - done}</p>
                <p className="text-xs text-white/50">Remaining</p>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="text-center">
                <p className="text-xl font-bold text-white">12</p>
                <p className="text-xs text-white/50">Day streak</p>
              </div>
            </div>
          </div>
          <div className="w-28 h-28 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <p className="text-3xl font-bold text-white">{Math.round(done/milestones.length*100)}%</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-4">
        {/* Timeline */}
        <motion.div {...f(0.1)} className="col-span-7">
          <Card className="p-5">
            <p className="text-[13px] font-bold mb-5" style={{ color: "var(--text-primary)" }}>Milestones</p>
            <div className="relative">
              <div className="absolute left-[18px] top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
              <div className="space-y-4">
                {milestones.map((m, i) => (
                  <motion.div key={m.label} {...f(0.12 + i * 0.04)} className="flex items-start gap-4">
                    <div className="flex-shrink-0 z-10 w-9 flex justify-center">
                      <HugeiconsIcon icon={m.done ? CheckmarkCircle02Icon : AddCircleIcon} size={20}
                        style={{ color: m.done ? "#22c55e" : "var(--border)" }} />
                    </div>
                    <div className="flex-1 pb-1">
                      <p className="text-sm font-semibold" style={{ color: m.done ? "var(--text-primary)" : "var(--text-muted)" }}>{m.label}</p>
                      <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                        <HugeiconsIcon icon={Calendar03Icon} size={10} /> {m.date}
                      </p>
                    </div>
                    {m.done && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "#f0fdf4", color: "#16a34a" }}>Done</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Right */}
        <div className="col-span-5 flex flex-col gap-4">
          <motion.div {...f(0.14)}>
            <Card className="p-5">
              <p className="text-[13px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>Journey Steps</p>
              <div className="space-y-3">
                {mockJourneySteps.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={{ background: s.done ? "var(--brand-light)" : "var(--bg)", color: s.done ? "var(--brand)" : "var(--text-muted)", border: `1px solid ${s.done ? "transparent" : "var(--border)"}` }}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold" style={{ color: s.done ? "var(--text-primary)" : "var(--text-muted)" }}>{s.label}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.description}</p>
                    </div>
                    {s.done && <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} style={{ color: "#22c55e", flexShrink: 0 }} />}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Streak */}
          <motion.div {...f(0.18)}>
            <Card className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#fffbeb" }}>
                  <HugeiconsIcon icon={FlashIcon} size={18} style={{ color: "#f59e0b" }} />
                </div>
                <div>
                  <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>12-Day Streak</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Personal best — keep going!</p>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1.5 mt-3">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-md"
                    style={{ background: i < 12 ? "#f59e0b" : "var(--bg)", opacity: i < 12 ? Math.min(1, 0.4 + i * 0.05) : 1 }} />
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Next step CTA */}
          <motion.div {...f(0.22)}>
            <div className="rounded-2xl p-4 flex items-center justify-between"
              style={{ background: "var(--brand-light)", border: "1px solid #f5c6cc" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--brand)" }}>
                  <HugeiconsIcon icon={Target01Icon} size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "var(--brand)" }}>Next: Emotional Landscape</p>
                  <p className="text-[10px]" style={{ color: "var(--brand)", opacity: 0.6 }}>~8 min assessment</p>
                </div>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white flex-shrink-0"
                style={{ background: "var(--brand)" }}>
                Start <HugeiconsIcon icon={ArrowRight01Icon} size={10} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
