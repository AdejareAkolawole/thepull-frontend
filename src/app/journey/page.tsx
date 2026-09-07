"use client";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, AddCircleIcon, FlashIcon, Target01Icon, ArrowRight01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";
import { mockJourneySteps } from "@/lib/mock";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

const Card = ({ children, style = {} }: any) => (
  <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)", ...style }}>
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
  const pct = Math.round((done / milestones.length) * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <motion.div {...f(0)}>
        <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Growth path</p>
        <h1 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.1 }}>My Journey</h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Your personal intelligence timeline</p>
      </motion.div>

      {/* Hero progress */}
      <motion.div {...f(0.05)} style={{ borderRadius: 20, position: "relative", overflow: "hidden", minHeight: 200 }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #3d0e1a 0%, #6b1c2b 45%, #a03040 100%)" }} />
        <div style={{ position: "absolute", top: -64, left: -64, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,64,79,0.3), transparent)", filter: "blur(40px)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "32px 40px", display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>Journey Progress</p>
            <p className="font-display" style={{ fontSize: 48, fontWeight: 600, color: "white", lineHeight: 1 }}>
              {done}<span style={{ fontSize: 24, fontWeight: 300, color: "rgba(255,255,255,0.35)" }}>/{milestones.length}</span>
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4, marginBottom: 20 }}>Milestones complete · {pct}% through foundation</p>
            <div style={{ maxWidth: 340, height: 6, borderRadius: 99, overflow: "hidden", background: "rgba(255,255,255,0.1)" }}>
              <motion.div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #7c2232, #e05060)" }}
                initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                transition={{ duration: 1.2, delay: 0.4 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 20 }}>
              {[{ label: "Complete", value: done }, { label: "Remaining", value: milestones.length - done }, { label: "Day streak", value: 12 }].map((s, i) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {i > 0 && <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.12)" }} />}
                  <div>
                    <p style={{ fontSize: 20, fontWeight: 800, color: "white" }}>{s.value}</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Ring */}
          <div style={{ position: "relative", width: 112, height: 112, flexShrink: 0 }}>
            <svg viewBox="0 0 112 112" style={{ width: 112, height: 112 }}>
              <circle cx="56" cy="56" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
              <circle cx="56" cy="56" r="46" fill="none" stroke="url(#jg)" strokeWidth="5"
                strokeLinecap="round" strokeDasharray={`${(pct / 100) * 289.03} 289.03`}
                transform="rotate(-90 56 56)" />
              <defs>
                <linearGradient id="jg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c2232" /><stop offset="100%" stopColor="#e05060" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ fontSize: 22, fontWeight: 800, color: "white" }}>{pct}%</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content grid */}
      <div data-cols="journey">
        {/* Timeline */}
        <motion.div {...f(0.1)}>
          <Card style={{ padding: 20, height: "100%" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>Milestones</p>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 18, top: 0, bottom: 0, width: 1, background: "rgba(0,0,0,0.07)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {milestones.map((m, i) => (
                  <motion.div key={m.label} {...f(0.12 + i * 0.04)} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{ flexShrink: 0, zIndex: 1, width: 36, display: "flex", justifyContent: "center" }}>
                      <HugeiconsIcon icon={m.done ? CheckmarkCircle02Icon : AddCircleIcon} size={20}
                        style={{ color: m.done ? "#34d399" : "rgba(0,0,0,0.15)" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: m.done ? "var(--text-primary)" : "var(--text-muted)" }}>{m.label}</p>
                      <p style={{ fontSize: 11, marginTop: 2, display: "flex", alignItems: "center", gap: 4, color: "var(--text-muted)" }}>
                        <HugeiconsIcon icon={Calendar03Icon} size={10} /> {m.date}
                      </p>
                    </div>
                    {m.done && (
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, flexShrink: 0, background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
                        Done
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Steps */}
          <motion.div {...f(0.14)}>
            <Card style={{ padding: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Journey Steps</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {mockJourneySteps.map((s, i) => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 700, background: s.done ? "rgba(224,80,96,0.15)" : "rgba(0,0,0,0.04)", color: s.done ? "var(--brand)" : "var(--text-muted)", border: `1px solid ${s.done ? "rgba(224,80,96,0.25)" : "rgba(0,0,0,0.08)"}` }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: s.done ? "var(--text-primary)" : "var(--text-muted)" }}>{s.label}</p>
                      <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.description}</p>
                    </div>
                    {s.done && <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} style={{ color: "#34d399", flexShrink: 0 }} />}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Streak */}
          <motion.div {...f(0.18)}>
            <Card style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.2)" }}>
                  <HugeiconsIcon icon={FlashIcon} size={17} style={{ color: "#fbbf24" }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>12-Day Streak</p>
                  <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Personal best — keep going!</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} style={{ aspectRatio: "1", borderRadius: 6, background: i < 12 ? `rgba(251,191,36,${0.35 + i * 0.04})` : "rgba(0,0,0,0.04)", border: i < 12 ? "1px solid rgba(251,191,36,0.3)" : "1px solid rgba(0,0,0,0.06)" }} />
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Next step CTA */}
          <motion.div {...f(0.22)}>
            <div style={{ borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #3d0e1a, #6b1c2b)", border: "1px solid rgba(192,64,79,0.25)" }}>
              <div style={{ position: "absolute", top: -24, right: -24, width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,64,79,0.3), transparent)", filter: "blur(16px)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "rgba(224,80,96,0.2)", border: "1px solid rgba(224,80,96,0.3)" }}>
                  <HugeiconsIcon icon={Target01Icon} size={14} style={{ color: "var(--brand)" }} />
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "white" }}>Next: Emotional Landscape</p>
                  <p style={{ fontSize: 10, marginTop: 2, color: "rgba(255,255,255,0.4)" }}>~8 min assessment</p>
                </div>
              </div>
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", border: "none", cursor: "pointer", flexShrink: 0, position: "relative", marginLeft: 16 }}>
                Start <HugeiconsIcon icon={ArrowRight01Icon} size={10} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
