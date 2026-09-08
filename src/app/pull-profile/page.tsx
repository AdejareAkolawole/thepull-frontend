"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  TrendingUpIcon, AiSparklesIcon, AiBrain01Icon, Analytics01Icon,
  EyeIcon, FavouriteIcon, FireIcon, Target01Icon, LockIcon,
  CheckmarkCircle01Icon, ArrowRight01Icon, HeartIcon, Message02Icon,
  ShieldIcon, Activity01Icon,
} from "@hugeicons/core-free-icons";
import { mockUser, mockAchievements, mockIdentityVector } from "@/lib/mock";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

const achievementIconMap: Record<string, any> = {
  brain: AiBrain01Icon, eye: EyeIcon, chart: Analytics01Icon,
  star: FavouriteIcon, fire: FireIcon, target: Target01Icon,
};

const relationshipDimensions = [
  { label: "How You Love", sub: "ATTACHMENT", icon: HeartIcon },
  { label: "How You Communicate", sub: "COMMUNICATION STYLE", icon: Message02Icon },
  { label: "How You Handle Conflict", sub: "CONFLICT STYLE", icon: Activity01Icon },
  { label: "How You Build Trust", sub: "RELATIONSHIP CONSTITUTION", icon: ShieldIcon },
  { label: "What You Value", sub: "LOVE STYLE", icon: Target01Icon },
];

export default function PullProfilePage() {
  const unlockedCount = mockAchievements.filter(a => a.done).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Row 1: Quiet moment + Achievements */}
      <motion.div {...f(0)} data-cols="2-hero">
        {/* Left: warm greeting card */}
        <div style={{
          borderRadius: 20, padding: "36px 32px",
          background: "linear-gradient(140deg, #faf5ec 0%, #f5e8d4 100%)",
          border: "1px solid rgba(180,140,80,0.15)",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}>
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: "#1a0e04", lineHeight: 1.2, marginBottom: 10 }}>
              A quiet moment, {mockUser.name}.
            </h2>
            <p style={{ fontSize: 15, color: "#5a3e22", marginBottom: 6 }}>Here's your intelligence today.</p>
            <p style={{ fontSize: 14, color: "#c9a84c", fontWeight: 600 }}>New patterns are beginning to surface.</p>
          </div>
          <div style={{ marginTop: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1, height: 1, background: "rgba(180,140,80,0.3)" }} />
              <span style={{ fontSize: 9, letterSpacing: "0.25em", color: "#c9a84c", fontWeight: 700 }}>THE PULL</span>
              <div style={{ flex: 1, height: 1, background: "rgba(180,140,80,0.3)" }} />
            </div>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#1a0e04", lineHeight: 1.3, marginBottom: 8 }}>
              This is what The Pull understands about you.
            </p>
            <p style={{ fontSize: 13, color: "#7a5c38", lineHeight: 1.6 }}>
              Your personal intelligence, as The Pull has come to know it — and as it keeps evolving.
            </p>
          </div>
        </div>

        {/* Right: Achievements */}
        <div style={{
          borderRadius: 20, padding: "20px",
          background: "linear-gradient(145deg, #1a0508 0%, #2d0b14 100%)",
          border: "1px solid rgba(192,64,79,0.2)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <HugeiconsIcon icon={FavouriteIcon} size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>Achievements</span>
            </div>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{unlockedCount}/{mockAchievements.length}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {mockAchievements.map((a, i) => (
              <div key={a.label} style={{
                borderRadius: 12, padding: "12px 8px 10px",
                background: a.done ? `${a.color}18` : "rgba(255,255,255,0.03)",
                border: `1px solid ${a.done ? `${a.color}35` : "rgba(255,255,255,0.06)"}`,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                position: "relative",
              }}>
                {a.done && (
                  <div style={{ position: "absolute", top: 6, right: 6, width: 7, height: 7, borderRadius: "50%", background: a.color }} />
                )}
                <div style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: a.done ? `${a.color}20` : "rgba(255,255,255,0.05)" }}>
                  {a.done
                    ? <HugeiconsIcon icon={achievementIconMap[a.iconKey]} size={16} style={{ color: a.color }} />
                    : <HugeiconsIcon icon={LockIcon} size={14} style={{ color: "rgba(255,255,255,0.2)" }} />
                  }
                </div>
                <p style={{ fontSize: 9, fontWeight: 700, color: a.done ? "white" : "rgba(255,255,255,0.3)", textAlign: "center", lineHeight: 1.3 }}>{a.label}</p>
                <p style={{ fontSize: 8, color: a.done ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.2)", textAlign: "center", lineHeight: 1.3 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Your Living Identity heading */}
      <motion.div {...f(0.06)} style={{ textAlign: "center", padding: "20px 0 8px" }}>
        <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(180,140,80,0.8)", marginBottom: 10 }}>Your Living Identity</p>
        <h2 style={{ fontSize: 52, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1 }}>Who Am I?</h2>
      </motion.div>

      {/* Archetype / Current Lens */}
      <motion.div {...f(0.1)}>
        <div style={{
          borderRadius: 20, padding: "28px 28px",
          background: "linear-gradient(145deg, #0d0306 0%, #1a0508 50%, #0d0306 100%)",
          border: "1px solid rgba(192,64,79,0.15)",
          display: "flex", alignItems: "center", gap: 24,
        }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, border: "2px solid rgba(96,165,250,0.5)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(96,165,250,0.08)", flexShrink: 0 }}>
            <HugeiconsIcon icon={ShieldIcon} size={32} style={{ color: "#60a5fa" }} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.8)" }}>Your Current Lens</p>
              <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: "rgba(192,64,79,0.15)", color: "rgba(192,64,79,0.9)", border: "1px solid rgba(192,64,79,0.25)" }}>
                {mockUser.archetype_stage}
              </span>
            </div>
            <p style={{ fontSize: 28, fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: 4 }}>{mockUser.archetype}</p>
            <p style={{ fontSize: 13, color: "rgba(201,168,76,0.7)", fontStyle: "italic" }}>Steady presence is the strongest love.</p>
          </div>
        </div>
      </motion.div>

      {/* A Glimpse of Your Story */}
      <motion.div {...f(0.13)}>
        <div style={{
          borderRadius: 20, padding: "24px 28px",
          background: "linear-gradient(140deg, #faf5ec 0%, #f5e8d4 100%)",
          border: "1px solid rgba(180,140,80,0.15)", marginBottom: 4,
        }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 12 }}>A Glimpse Of Your Story</p>
          <p style={{ fontSize: 14, color: "#2d1a0a", lineHeight: 1.75 }}>
            {mockUser.archetype_tagline} Your identity is built on the quiet strength of dependability, where your primary mission is to ensure that the ground remains solid beneath your feet. You carry a deep sense of responsibility, acting as an anchor in an unpredictable world, finding your greatest fulfilment in being reliably present.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, fontSize: 13, fontWeight: 700, color: "#1a0e04", background: "#c9a84c", border: "none", cursor: "pointer" }}>
            Open Living Report <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "var(--text-primary)", background: "transparent", border: "1px solid rgba(0,0,0,0.12)", cursor: "pointer" }}>
            Continue Reading
          </button>
        </div>
      </motion.div>

      {/* Identity Coverage */}
      <motion.div {...f(0.16)}>
        <div style={{ borderRadius: 20, overflow: "hidden", background: "linear-gradient(145deg, #1a0508 0%, #2d0b14 100%)", border: "1px solid rgba(192,64,79,0.15)" }}>
          {/* Header */}
          <div style={{ padding: "24px 28px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: 8 }}>Identity Coverage</p>
              <h3 style={{ fontSize: 26, fontWeight: 700, color: "#c9a84c", marginBottom: 4 }}>Foundation Complete</h3>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Your 7 core dimensions are complete.</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 28, fontWeight: 800, color: "rgba(255,255,255,0.9)" }}>
                <span style={{ fontStyle: "italic" }}>II</span>
                <span style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>/12</span>
              </p>
              <p style={{ fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Overall Domain Coverage</p>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.04)" }}>
            <div style={{ padding: "18px 24px", background: "linear-gradient(145deg, #1a0508, #2d0b14)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(167,139,250,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <HugeiconsIcon icon={AiBrain01Icon} size={15} style={{ color: "#a78bfa" }} />
                </div>
                <div>
                  <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Profile Version</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color: "white" }}>{mockUser.archetype_version}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <p style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Last Updated</p>
                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Today</p>
              </div>
            </div>
            <div style={{ padding: "18px 24px", background: "linear-gradient(145deg, #1a0508, #2d0b14)", display: "flex", alignItems: "center", gap: 16 }}>
              {/* Circular progress */}
              <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
                <svg viewBox="0 0 52 52" style={{ width: 52, height: 52, transform: "rotate(-90deg)" }}>
                  <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
                  <circle cx="26" cy="26" r="22" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={`${(47 / 100) * 138.2} 138.2`} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "white" }}>47</span>
                </div>
              </div>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Behavioural Confidence</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Building</p>
              </div>
            </div>
          </div>

          {/* Pull Confidence */}
          <div style={{ padding: "18px 24px", display: "flex", alignItems: "center", gap: 16, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
              <svg viewBox="0 0 52 52" style={{ width: 52, height: 52, transform: "rotate(-90deg)" }}>
                <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
                <circle cx="26" cy="26" r="22" fill="none" stroke="#c9a84c" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={`${(mockUser.archetype_confidence / 100) * 138.2} 138.2`} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "white" }}>{mockUser.archetype_confidence}</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 2 }}>Pull Confidence</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Building</p>
            </div>
            <button style={{ fontSize: 11, color: "rgba(201,168,76,0.7)", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
              Explain <span style={{ fontSize: 10 }}>↓</span>
            </button>
          </div>

          {/* Identity Summary */}
          <div style={{ padding: "18px 24px 22px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>Identity Summary</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
              Your identity is still emerging. As you complete intelligence domains, your behavioural archetype and confidence will reveal themselves.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Identity Coverage Progress */}
      <motion.div {...f(0.19)}>
        <div style={{ borderRadius: 20, padding: "24px 28px", background: "linear-gradient(145deg, #1a0508 0%, #2d0b14 100%)", border: "1px solid rgba(192,64,79,0.15)" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: 20 }}>Identity Coverage Progress</p>

          {[
            { label: "Core Dimensions", gathered: 7, total: 7, color: "#22c55e" },
            { label: "Deeper Dimensions", gathered: 4, total: 5, color: "#c9a84c" },
            { label: "Coming Soon", gathered: 0, total: 3, color: "rgba(255,255,255,0.2)", note: "3 new domains" },
          ].map((row, i) => (
            <div key={row.label} style={{ marginBottom: i < 2 ? 18 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{row.label}</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{row.note ?? `${row.gathered} / ${row.total} gathered`}</p>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                <motion.div
                  style={{ height: "100%", borderRadius: 99, background: row.color }}
                  initial={{ width: 0 }} animate={{ width: row.total > 0 ? `${(row.gathered / row.total) * 100}%` : "0%" }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                />
              </div>
            </div>
          ))}

          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", lineHeight: 1.6, marginTop: 20, marginBottom: 16 }}>
            Coverage counts gathered results, not access. Core dimensions include synthesised perspectives that draw on the same lived evidence and journey activity rather than a separate measurement.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", cursor: "pointer" }}>
            <HugeiconsIcon icon={LockIcon} size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Unlock deeper understanding with Premium</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Expand your identity through deeper dimensions — how you handle tension, what sustains you, your emotional rhythm.</p>
            </div>
            <HugeiconsIcon icon={ArrowRight01Icon} size={13} style={{ color: "rgba(255,255,255,0.35)", flexShrink: 0 }} />
          </div>
        </div>
      </motion.div>

      {/* Your Relationship Style */}
      <motion.div {...f(0.22)}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <HugeiconsIcon icon={HeartIcon} size={13} style={{ color: "#c0404f" }} />
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>Your Relationship Style</p>
        </div>
        <div data-cols="3" style={{ gap: 10 }}>
          {relationshipDimensions.map((d, i) => (
            <motion.div key={d.label} {...f(0.24 + i * 0.04)}>
              <div style={{
                borderRadius: 16, padding: "20px",
                background: "linear-gradient(140deg, #faf5ec 0%, #f5e8d4 100%)",
                border: "1px solid rgba(180,140,80,0.15)",
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(180,140,80,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <HugeiconsIcon icon={d.icon} size={16} style={{ color: "rgba(100,70,30,0.5)" }} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#2d1a0a", marginBottom: 2 }}>{d.label}</p>
                <p style={{ fontSize: 8, letterSpacing: "0.15em", color: "rgba(100,70,30,0.5)", marginBottom: 12 }}>{d.sub}</p>
                <p style={{ fontSize: 12, color: "#c0404f", fontStyle: "italic", marginBottom: 4 }}>Still being discovered</p>
                <p style={{ fontSize: 11, color: "rgba(100,70,30,0.5)" }}>Complete assessments to unlock</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Identity Vector */}
      <motion.div {...f(0.3)}>
        <div style={{ borderRadius: 20, padding: "24px 28px", background: "linear-gradient(145deg, #1a0508 0%, #2d0b14 100%)", border: "1px solid rgba(192,64,79,0.15)" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>Identity Vector — Behavioural Alignment</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mockIdentityVector.map((v, i) => (
              <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 11, color: i === 0 ? "white" : "rgba(255,255,255,0.45)", fontWeight: i === 0 ? 700 : 400, minWidth: 140, flexShrink: 0 }}>{v.label}</span>
                <div style={{ flex: 1, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                  <motion.div
                    style={{ height: "100%", borderRadius: 99, background: i === 0 ? `linear-gradient(90deg, #7c2232, ${v.color})` : v.color, opacity: i === 0 ? 1 : 0.5 }}
                    initial={{ width: 0 }} animate={{ width: `${v.pct}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.07 }}
                  />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? "white" : "rgba(255,255,255,0.35)", minWidth: 32, textAlign: "right" }}>{v.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Ask The Pull */}
      <motion.div {...f(0.34)}>
        <div style={{ borderRadius: 20, padding: "24px 28px", background: "linear-gradient(145deg, #1a0508 0%, #2d0b14 100%)", border: "1px solid rgba(192,64,79,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(192,64,79,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={16} style={{ color: "#c0404f" }} />
            </div>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)" }}>Ask The Pull</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: "white" }}>Your Intelligence Guide</p>
            </div>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 16 }}>
            The more The Pull learns about you, the more specific its answers become.
          </p>
          <div style={{ padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(201,168,76,0.2)", background: "rgba(0,0,0,0.2)", marginBottom: 12 }}>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Suggested question</p>
            <p style={{ fontSize: 12, color: "#c9a84c", fontStyle: "italic" }}>"What's changed about me since I last checked in?"</p>
          </div>
          <Link href="/coach" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "12px", borderRadius: 12, fontSize: 13, fontWeight: 600,
            color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none",
          }}>
            <HugeiconsIcon icon={Message02Icon} size={13} /> Ask The Pull <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
          </Link>
        </div>
      </motion.div>

    </div>
  );
}
