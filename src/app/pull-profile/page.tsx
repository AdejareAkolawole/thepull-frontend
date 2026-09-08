"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp01Icon, ArrowDown01Icon, Share01Icon, FavouriteIcon,
  AiSparklesIcon, AiBrain01Icon, Analytics01Icon,
  EyeIcon, FireIcon, Target01Icon, LockIcon,
  ArrowRight01Icon, HeartIcon, Message02Icon,
  ShieldIcon, Activity01Icon, CheckmarkCircle01Icon,
  Add01Icon, Time01Icon,
} from "@hugeicons/core-free-icons";
import { mockUser, mockAchievements, mockIdentityVector } from "@/lib/mock";

const WINE  = "#3d0e1a";
const WINE2 = "#c0404f";
const GOLD  = "#c9a84c";
const CREAM = "#f5f0e8";
const DARK  = "#2d1a14";
const MID   = "#7c5c50";

const f = (d = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d, ease: "easeOut" as const },
});

const glass = (alpha = 0.06) => ({
  background: `rgba(245,240,232,${alpha})`,
  backdropFilter: "blur(28px)",
  WebkitBackdropFilter: "blur(28px)",
  border: "1px solid rgba(245,240,232,0.11)",
  borderRadius: 22,
});

const achievementIconMap: Record<string, any> = {
  brain: AiBrain01Icon, eye: EyeIcon, chart: Analytics01Icon,
  star: FavouriteIcon, fire: FireIcon, target: Target01Icon,
};

const relationshipDimensions = [
  { label: "How You Love",           sub: "ATTACHMENT",              icon: HeartIcon     },
  { label: "How You Communicate",    sub: "COMMUNICATION STYLE",     icon: Message02Icon },
  { label: "How You Handle Conflict",sub: "CONFLICT STYLE",          icon: Activity01Icon},
  { label: "How You Build Trust",    sub: "RELATIONSHIP CONSTITUTION",icon: ShieldIcon   },
  { label: "What You Value",         sub: "LOVE STYLE",              icon: Target01Icon  },
];

const forces = [
  {
    label: "Attraction",
    sub: "What draws you toward someone",
    value: "31.22",
    whatThisMeans: "You prioritise stability and predictability over emotional intensity.",
    whyWeBelieve: "Across 10 signals across 7 areas of your intelligence, your responses consistently reflect your choices and instincts around who draws you in.",
    growthInsight: "Notice consistency alongside chemistry before making major relationship decisions.",
  },
  { label: "Compatibility", sub: "How your self-intelligence aligns with others", value: "Early alignment", note: "Interpretive view", valueSmall: true },
  { label: "Communication", sub: "How you express and listen",    value: "68.04" },
  { label: "Conflict",      sub: "How you navigate friction",     value: "63.34" },
  { label: "Attachment",    sub: "How you bond and trust",        value: "48.8"  },
  { label: "Growth",        sub: "How complete your intelligence foundation is", value: "47%", badge: "FOUNDATION ESTABLISHED" },
];

export default function PullProfilePage() {
  const [expanded, setExpanded] = useState<string | null>("Attraction");
  const unlockedCount = mockAchievements.filter(a => a.done).length;

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* ── SCORE CARD (cream, centred) ── */}
      <div style={{ background: "linear-gradient(180deg,#faf7f2 0%,#fff 100%)", padding: "48px 24px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.div {...f(0)} style={{ width: "100%", maxWidth: 600 }}>
          <div style={{ background: CREAM, borderRadius: 28, overflow: "hidden", boxShadow: "0 12px 60px rgba(45,26,20,0.10)" }}>
            {/* Score header */}
            <div className="profile-score-pad" style={{ textAlign: "center", padding: "48px 44px 0" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: MID, marginBottom: 24, fontWeight: 700 }}>Your Pull Score</p>
              <p style={{ fontSize: 120, fontWeight: 800, color: DARK, lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: 12 }}>{mockUser.pull_score}</p>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: WINE, marginBottom: 18 }}>{mockUser.archetype_stage}</p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, border: `1px solid rgba(61,14,26,0.22)`, background: "rgba(61,14,26,0.04)", marginBottom: 22 }}>
                <HugeiconsIcon icon={FavouriteIcon} size={11} style={{ color: WINE }} />
                <span style={{ fontSize: 11, color: WINE }}>Confidence <strong>{mockUser.archetype_confidence}%</strong></span>
              </div>
              <p style={{ fontSize: 15, fontStyle: "italic", color: MID, lineHeight: 1.65, marginBottom: 40 }}>
                The first strokes of a clearer picture are forming.
              </p>
            </div>

            {/* Forces */}
            <div className="profile-forces-pad" style={{ padding: "0 44px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <span style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: MID, fontWeight: 700 }}>Forces</span>
                <div style={{ flex: 1, height: 1, background: "rgba(45,26,20,0.1)" }} />
              </div>
              {forces.map((force, i) => {
                const isOpen = expanded === force.label;
                const hasDetail = !!force.whatThisMeans;
                return (
                  <div key={force.label}>
                    <div onClick={() => hasDetail && setExpanded(isOpen ? null : force.label)}
                      style={{ paddingTop: 18, paddingBottom: isOpen ? 0 : 18, cursor: hasDetail ? "pointer" : "default", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                      <div>
                        <p style={{ fontSize: 26, fontWeight: 500, color: DARK, lineHeight: 1, marginBottom: 4, fontFamily: "Georgia, serif" }}>{force.label}</p>
                        <p style={{ fontSize: 11, color: MID }}>{force.sub}</p>
                        {force.note && <p style={{ fontSize: 10, fontStyle: "italic", color: MID, marginTop: 2 }}>{force.note}</p>}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: force.valueSmall ? 14 : 26, fontWeight: force.valueSmall ? 400 : 600, color: DARK }}>{force.value}</span>
                          {force.badge && <p style={{ fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: MID, lineHeight: 1.4, marginTop: 2 }}>{force.badge}</p>}
                        </div>
                        {hasDetail
                          ? <HugeiconsIcon icon={isOpen ? ArrowUp01Icon : ArrowDown01Icon} size={14} style={{ color: MID }} />
                          : <HugeiconsIcon icon={ArrowDown01Icon} size={14} style={{ color: MID, opacity: 0.3 }} />}
                      </div>
                    </div>
                    <AnimatePresence>
                      {isOpen && force.whatThisMeans && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                          <div className="profile-forces-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, paddingTop: 16, paddingBottom: 22 }}>
                            {[
                              { heading: "What This Means",    body: force.whatThisMeans },
                              { heading: "Why We Believe This",body: force.whyWeBelieve  },
                              { heading: "Growth Insight",     body: force.growthInsight  },
                            ].map(col => (
                              <div key={col.heading}>
                                <p style={{ fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: MID, marginBottom: 8, fontWeight: 700 }}>{col.heading}</p>
                                <p style={{ fontSize: 12, color: DARK, lineHeight: 1.65 }}>{col.body}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {i < forces.length - 1 && <div style={{ height: 1, background: "rgba(45,26,20,0.09)" }} />}
                  </div>
                );
              })}
            </div>

            {/* Reading */}
            <div className="profile-reading-pad" style={{ margin: "32px 44px 0", padding: "24px 0", borderTop: "1px solid rgba(45,26,20,0.09)" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: MID, marginBottom: 14, fontWeight: 700 }}>Reading</p>
              <p style={{ fontSize: 16, color: DARK, lineHeight: 1.8 }}>
                Your Pull Score reflects a developing foundation of self-awareness and relationship curiosity. Your strongest intelligence right now is in communication, handling tension, what you value. As your Living Profile grows — you are at 81% coverage — your Pull Score will continue evolving.
              </p>
            </div>
            <div style={{ height: 44 }} />
          </div>

          {/* Share */}
          <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
            <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 26px", borderRadius: 99, background: CREAM, border: "1px solid rgba(45,26,20,0.14)", color: DARK, fontSize: 13, fontWeight: 500, cursor: "pointer", boxShadow: "0 2px 12px rgba(45,26,20,0.07)" }}>
              <HugeiconsIcon icon={Share01Icon} size={14} style={{ color: MID }} />
              Share Your Pull Score
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── HOW YOUR PULL SCORE WAS BUILT ── */}
      <div style={{ maxWidth: 600, margin: "32px auto 0", padding: "0 24px" }}>
        <motion.div {...f(0.1)} style={{ background: CREAM, borderRadius: 24, overflow: "hidden", boxShadow: "0 4px 24px rgba(45,26,20,0.08)", marginBottom: 16 }}>
          <div style={{ padding: "20px 28px", borderBottom: `1px solid rgba(45,26,20,0.09)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <HugeiconsIcon icon={ArrowRight01Icon} size={12} style={{ color: MID }} />
              <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: MID, fontWeight: 700 }}>How Your Pull Score Was Built</span>
            </div>
            <p style={{ fontSize: 11, color: MID, lineHeight: 1.65 }}>
              SUM(engine_score × weight × confidence) / SUM(weight × confidence) — one contribution per engine (multi-row engines aggregated by mean); score null when numeric-model coverage &lt; 0.5
            </p>
          </div>

          {[
            { label: "How You Connect",       confidence: 74, level: "likely",   evidence: 25, score: 5.5, weight: 15 },
            { label: "How You Communicate",   confidence: 47, level: "possible", evidence: 25, score: 3.2, weight: 10 },
            { label: "Your Foundation",       confidence: 67, level: "likely",   evidence: 25, score: 3.1, weight: 15 },
            { label: "How You Handle Tension",confidence: 34, level: "possible", evidence: 25, score: 2.1, weight: 10 },
            { label: "What You Value",        confidence: 26, level: "possible", evidence: 25, score: 1.3, weight: 10 },
            { label: "Your Personality",      confidence: 29, level: "possible", evidence: 4,  score: 0.5, weight: 15 },
            { label: "Your Emotional Rhythm", confidence: 40, level: "possible", evidence: 25, score: 0.0, weight: 10 },
          ].map((row, i, arr) => (
            <div key={row.label} style={{ padding: "18px 28px", borderBottom: i < arr.length - 1 ? `1px solid rgba(45,26,20,0.07)` : "none" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 500, color: DARK, marginBottom: 5 }}>{row.label}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, color: MID }}>{row.confidence}% confidence</span>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: row.level === "likely" ? "rgba(37,99,235,0.1)" : "rgba(217,119,6,0.1)", color: row.level === "likely" ? "#2563eb" : "#d97706" }}>{row.level}</span>
                    <span style={{ fontSize: 11, color: MID }}>{row.evidence} evidence</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" as const, flexShrink: 0 }}>
                  <p style={{ fontSize: 22, fontWeight: 700, color: DARK, lineHeight: 1 }}>{row.score.toFixed(1)}</p>
                  <p style={{ fontSize: 10, color: MID, marginTop: 3 }}>weight {row.weight}%</p>
                </div>
              </div>
            </div>
          ))}

          <div style={{ padding: "20px 28px", borderTop: `1px solid rgba(45,26,20,0.1)` }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: MID, fontWeight: 700, marginBottom: 4 }}>Your Pull Score</p>
                <p style={{ fontSize: 11, color: MID, marginBottom: 12 }}>The sum of every layer's contribution</p>
                <p style={{ fontSize: 11, color: MID }}>
                  Coverage: <strong style={{ color: DARK }}>complete</strong> · 47% of available weight · 40% of 85%
                </p>
              </div>
              <p style={{ fontSize: 52, fontWeight: 800, color: DARK, lineHeight: 1, letterSpacing: "-0.04em" }}>{mockUser.pull_score}</p>
            </div>
          </div>
        </motion.div>

        {/* Identity Story */}
        <motion.div {...f(0.15)} style={{ background: CREAM, borderRadius: 24, padding: "24px 28px", marginBottom: 16, boxShadow: "0 4px 24px rgba(45,26,20,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <HugeiconsIcon icon={AiSparklesIcon} size={13} style={{ color: MID }} />
            <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: MID, fontWeight: 700 }}>Your Identity Story</span>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `rgba(45,26,20,0.07)`, border: `1px solid rgba(45,26,20,0.1)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={18} style={{ color: MID }} />
            </div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 600, color: DARK, marginBottom: 6 }}>Still emerging...</p>
              <p style={{ fontSize: 13, color: MID, lineHeight: 1.7 }}>
                As you complete more of your intelligence journey, The Pull will reveal the archetype you are becoming — and the story behind it.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Insight sections */}
        {([
          {
            icon: AiSparklesIcon,
            tag: "Here's what The Pull is noticing",
            sub: "The Pull doesn't say something because the day changed. It speaks only when your experiences have earned it.",
            cardTitle: "The Pull is still getting to know you",
            cardBody: "There isn't enough here yet for The Pull to say something meaningful — and it won't pretend otherwise. Share a real experience and the pattern-finding begins.",
            actions: [
              { label: "Tell The Pull what happened", icon: Add01Icon, primary: true },
              { label: "Ask The Pull", icon: Message02Icon, primary: false },
            ],
          },
          {
            icon: CheckmarkCircle01Icon,
            tag: "What The Pull Is Learning",
            sub: "The Pull gets smarter about you as your experiences accumulate — your score measures intelligence, this shows what it's learning over time.",
            cardTitle: "The Pull is still getting to know you",
            cardBody: "As you use The Pull and share real experiences, patterns will begin to emerge here. The more you bring, the more The Pull notices.",
            actions: [
              { label: "Ask The Pull something", icon: Message02Icon, primary: false },
            ],
          },
          {
            icon: Activity01Icon,
            tag: "What's Changing",
            sub: "The Pull watches how your evidence shifts over time — this is change in evidence, not a new score.",
            cardTitle: "Your Pull is still gathering experience",
            cardBody: "To see how you're changing, The Pull needs a meaningful run of experiences to compare across time. It won't claim a change until the evidence can honestly support one.",
            actions: [
              { label: "Tell The Pull what happened", icon: Add01Icon, primary: false },
            ],
          },
          {
            icon: Time01Icon,
            tag: "Since you last checked in",
            sub: "The Pull only shows changes here when its understanding actually moved — never just to give you something to read.",
            cardTitle: null,
            cardBody: null,
            actions: [],
          },
        ] as const).map((section, i) => (
          <motion.div key={section.tag} {...f(0.18 + i * 0.05)} style={{ marginBottom: 20 }}>
            {/* Section card */}
            <div style={{
              background: "linear-gradient(160deg,#1a0910 0%,#26101a 60%,#1e0c14 100%)",
              borderRadius: 24,
              overflow: "hidden",
              border: "1px solid rgba(245,240,232,0.06)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(245,240,232,0.06)",
            }}>
              {/* Card header strip */}
              <div style={{
                padding: "18px 24px 16px",
                borderBottom: "1px solid rgba(245,240,232,0.07)",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: "rgba(245,240,232,0.07)",
                  border: "1px solid rgba(245,240,232,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <HugeiconsIcon icon={section.icon} size={13} style={{ color: "rgba(245,240,232,0.6)" }} />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(245,240,232,0.85)", letterSpacing: "0.01em" }}>{section.tag}</p>
                  <p style={{ fontSize: 10.5, color: "rgba(245,240,232,0.35)", marginTop: 2, lineHeight: 1.5 }}>{section.sub}</p>
                </div>
              </div>

              {/* Card body */}
              {section.cardTitle ? (
                <div style={{ padding: "40px 28px 36px", textAlign: "center" as const, position: "relative" as const }}>
                  {/* Subtle glow blob */}
                  <div style={{
                    position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                    width: 180, height: 80,
                    background: "radial-gradient(ellipse,rgba(192,64,79,0.12) 0%,transparent 70%)",
                    pointerEvents: "none",
                  }} />
                  {/* Icon circle */}
                  <div style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: "rgba(245,240,232,0.05)",
                    border: "1px solid rgba(245,240,232,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}>
                    <HugeiconsIcon icon={section.icon} size={22} style={{ color: "rgba(245,240,232,0.45)" }} />
                  </div>
                  <p style={{
                    fontSize: 19, fontWeight: 600, color: "rgba(245,240,232,0.92)",
                    marginBottom: 10, fontFamily: "Georgia, 'Times New Roman', serif",
                    lineHeight: 1.3, letterSpacing: "-0.01em",
                  }}>{section.cardTitle}</p>
                  <p style={{
                    fontSize: 13, color: "rgba(245,240,232,0.38)",
                    lineHeight: 1.75, maxWidth: 340, margin: "0 auto 28px",
                  }}>{section.cardBody}</p>
                  <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" as const }}>
                    {section.actions.map((a: { label: string; icon: typeof Add01Icon; primary: boolean }) => (
                      <button key={a.label} style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "11px 22px", borderRadius: 99,
                        fontSize: 13, fontWeight: 600, cursor: "pointer",
                        background: a.primary ? "rgba(192,64,79,0.2)" : "rgba(245,240,232,0.06)",
                        border: `1px solid ${a.primary ? "rgba(192,64,79,0.35)" : "rgba(245,240,232,0.12)"}`,
                        color: a.primary ? "rgba(245,192,200,0.95)" : "rgba(245,240,232,0.65)",
                        letterSpacing: "0.005em",
                        transition: "all 0.15s",
                      }}>
                        <HugeiconsIcon icon={a.icon} size={13} />
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ padding: "28px 24px", textAlign: "center" as const }}>
                  <p style={{ fontSize: 13, color: "rgba(245,240,232,0.3)", fontStyle: "italic" }}>Nothing new since your last check-in.</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
