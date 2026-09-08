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

      {/* ── DARK IDENTITY ZONE ── */}
      <div style={{
        background: "linear-gradient(150deg,#0f0a14 0%,#140d18 40%,#0c0a10 100%)",
        position: "relative", overflow: "hidden",
        padding: "72px 24px 80px",
      }}>
        {/* Ambient glows */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", left: "20%", width: "60%", height: "60%", background: "radial-gradient(ellipse, rgba(245,240,232,0.04) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", bottom: "5%", right: "10%", width: "50%", height: "50%", background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 65%)" }} />
        </div>

        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20, position: "relative", zIndex: 2 }}>

          {/* Section heading */}
          <motion.div {...f(0.08)} style={{ marginBottom: 8 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.32)", marginBottom: 10, fontWeight: 700 }}>Your Living Identity</p>
            <h2 style={{ fontSize: 52, fontWeight: 800, color: CREAM, letterSpacing: "-0.03em", lineHeight: 1 }}>Who Am I?</h2>
          </motion.div>

          {/* Archetype + Story */}
          <div className="profile-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {/* Archetype */}
            <motion.div {...f(0.12)} style={{ ...glass(0.06), padding: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, border: `1.5px solid rgba(201,168,76,0.38)`, background: "rgba(201,168,76,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <HugeiconsIcon icon={ShieldIcon} size={20} style={{ color: GOLD }} />
                </div>
                <div>
                  <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", fontWeight: 700 }}>Your Current Lens</p>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 9px", borderRadius: 99, background: "rgba(245,240,232,0.08)", color: "rgba(245,240,232,0.6)", border: "1px solid rgba(245,240,232,0.14)" }}>{mockUser.archetype_stage}</span>
                </div>
              </div>
              <h3 style={{ fontSize: 26, fontWeight: 800, color: CREAM, lineHeight: 1.15, marginBottom: 8, letterSpacing: "-0.02em" }}>{mockUser.archetype}</h3>
              <p style={{ fontSize: 13, color: "rgba(245,240,232,0.42)", lineHeight: 1.7, marginBottom: 24 }}>{mockUser.archetype_tagline}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 13px", borderRadius: 99, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}>
                  <HugeiconsIcon icon={FavouriteIcon} size={11} style={{ color: GOLD }} />
                  <span style={{ fontSize: 11, color: GOLD, fontWeight: 700 }}>Confidence {mockUser.archetype_confidence}%</span>
                </div>
                <div style={{ height: 3, flex: 1, borderRadius: 99, background: "rgba(245,240,232,0.08)", overflow: "hidden" }}>
                  <motion.div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg,${GOLD},rgba(201,168,76,0.5))` }}
                    initial={{ width: 0 }} animate={{ width: `${mockUser.archetype_confidence}%` }} transition={{ duration: 1.2, delay: 0.6 }} />
                </div>
              </div>
            </motion.div>

            {/* Story */}
            <motion.div {...f(0.15)} style={{ ...glass(0.04), padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.28)", marginBottom: 18, fontWeight: 700 }}>A Glimpse Of Your Story</p>
                <p style={{ fontSize: 16, color: "rgba(245,240,232,0.72)", lineHeight: 1.8, fontStyle: "italic", fontFamily: "Georgia, serif" }}>
                  "{mockUser.archetype_tagline} Your identity is built on the quiet strength of dependability, where your primary mission is to ensure that the ground remains solid beneath your feet."
                </p>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
                <button style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 11, background: CREAM, color: WINE, fontSize: 12, fontWeight: 800, border: "none", cursor: "pointer" }}>
                  Living Report <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
                </button>
                <button style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 11, background: "rgba(245,240,232,0.06)", border: "1px solid rgba(245,240,232,0.11)", color: "rgba(245,240,232,0.42)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  Continue Reading
                </button>
              </div>
            </motion.div>
          </div>

          {/* Greeting + Achievements */}
          <div className="profile-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {/* Greeting */}
            <motion.div {...f(0.18)} style={{ ...glass(0.06), padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: CREAM, lineHeight: 1.25, marginBottom: 10 }}>A quiet moment, {mockUser.name}.</h2>
                <p style={{ fontSize: 14, color: "rgba(245,240,232,0.5)", marginBottom: 6 }}>Here's your intelligence today.</p>
                <p style={{ fontSize: 14, color: GOLD, fontWeight: 600 }}>New patterns are beginning to surface.</p>
              </div>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(245,240,232,0.08)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(245,240,232,0.1)" }} />
                  <span style={{ fontSize: 8, letterSpacing: "0.28em", color: "rgba(245,240,232,0.3)", fontWeight: 700 }}>THE PULL</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(245,240,232,0.1)" }} />
                </div>
                <p style={{ fontSize: 13, color: "rgba(245,240,232,0.4)", lineHeight: 1.65 }}>Your personal intelligence, as The Pull has come to know it — and as it keeps evolving.</p>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div {...f(0.2)} style={{ ...glass(0.05), padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <HugeiconsIcon icon={FavouriteIcon} size={14} style={{ color: GOLD }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: CREAM }}>Achievements</span>
                </div>
                <span style={{ fontSize: 11, color: "rgba(245,240,232,0.3)" }}>{unlockedCount}/{mockAchievements.length}</span>
              </div>
              <div className="profile-achievements" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {mockAchievements.map((a) => (
                  <div key={a.label} style={{ borderRadius: 14, padding: "12px 8px 10px", background: a.done ? `${a.color}15` : "rgba(245,240,232,0.03)", border: `1px solid ${a.done ? `${a.color}30` : "rgba(245,240,232,0.07)"}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, position: "relative" }}>
                    {a.done && <div style={{ position: "absolute", top: 6, right: 6, width: 6, height: 6, borderRadius: "50%", background: a.color }} />}
                    <div style={{ width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: a.done ? `${a.color}18` : "rgba(245,240,232,0.04)" }}>
                      {a.done
                        ? <HugeiconsIcon icon={achievementIconMap[a.iconKey]} size={15} style={{ color: a.color }} />
                        : <HugeiconsIcon icon={LockIcon} size={13} style={{ color: "rgba(245,240,232,0.2)" }} />}
                    </div>
                    <p style={{ fontSize: 9, fontWeight: 700, color: a.done ? CREAM : "rgba(245,240,232,0.28)", textAlign: "center", lineHeight: 1.3 }}>{a.label}</p>
                    <p style={{ fontSize: 8, color: a.done ? "rgba(245,240,232,0.4)" : "rgba(245,240,232,0.18)", textAlign: "center", lineHeight: 1.3 }}>{a.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Relationship Style */}
          <motion.div {...f(0.24)}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <HugeiconsIcon icon={HeartIcon} size={12} style={{ color: "rgba(245,240,232,0.3)" }} />
              <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", fontWeight: 700 }}>Your Relationship Style</p>
            </div>
            <div className="profile-rel-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
              {relationshipDimensions.map((d, i) => (
                <motion.div key={d.label} {...f(0.26 + i * 0.04)}>
                  <div style={{ ...glass(0.05), padding: "22px 18px 20px", height: "100%" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 11, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                      <HugeiconsIcon icon={d.icon} size={15} style={{ color: GOLD }} />
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: CREAM, marginBottom: 3, lineHeight: 1.3 }}>{d.label}</p>
                    <p style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.24)", marginBottom: 10 }}>{d.sub}</p>
                    <p style={{ fontSize: 10, color: "rgba(245,240,232,0.36)", fontStyle: "italic" }}>Still discovering</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Identity Vector + Coverage */}
          <div className="profile-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {/* Identity Vector */}
            <motion.div {...f(0.3)} style={{ ...glass(0.05), padding: "28px" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.28)", fontWeight: 700, marginBottom: 20 }}>Identity Vector — Behavioural Alignment</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                {mockIdentityVector.map((v, i) => (
                  <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? CREAM : "rgba(245,240,232,0.32)", minWidth: 148, flexShrink: 0 }}>{v.label}</span>
                    <div style={{ flex: 1, height: 3, borderRadius: 99, background: "rgba(245,240,232,0.07)", overflow: "hidden" }}>
                      <motion.div style={{ height: "100%", borderRadius: 99, background: i === 0 ? `linear-gradient(90deg,${GOLD},rgba(201,168,76,0.55))` : "rgba(245,240,232,0.2)" }}
                        initial={{ width: 0 }} animate={{ width: `${v.pct}%` }} transition={{ duration: 1, delay: 0.7 + i * 0.06 }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? GOLD : "rgba(245,240,232,0.22)", minWidth: 34, textAlign: "right" as const }}>{v.pct}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Coverage */}
            <motion.div {...f(0.32)} style={{ ...glass(0.05), padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                  <div>
                    <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.28)", fontWeight: 700, marginBottom: 8 }}>Identity Coverage</p>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: CREAM }}>Foundation Complete</h3>
                    <p style={{ fontSize: 12, color: "rgba(245,240,232,0.35)", marginTop: 3 }}>7 core dimensions gathered.</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 26, fontWeight: 800, color: CREAM }}><span style={{ fontStyle: "italic" }}>II</span><span style={{ fontSize: 13, fontWeight: 400, color: "rgba(245,240,232,0.35)" }}>/12</span></p>
                    <p style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.28)" }}>Overall Coverage</p>
                  </div>
                </div>
                {[
                  { label: "Core Dimensions",   gathered: 7, total: 7, color: "#4ade80" },
                  { label: "Deeper Dimensions", gathered: 4, total: 5, color: GOLD },
                  { label: "Coming Soon",        gathered: 0, total: 3, color: "rgba(245,240,232,0.15)", note: "3 new domains" },
                ].map((row, i) => (
                  <div key={row.label} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: i < 2 ? CREAM : "rgba(245,240,232,0.28)" }}>{row.label}</span>
                      <span style={{ fontSize: 11, color: "rgba(245,240,232,0.3)" }}>{row.note ?? `${row.gathered} / ${row.total}`}</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: "rgba(245,240,232,0.07)", overflow: "hidden" }}>
                      <motion.div style={{ height: "100%", borderRadius: 99, background: row.color }}
                        initial={{ width: 0 }} animate={{ width: row.total > 0 ? `${(row.gathered / row.total) * 100}%` : "4%" }}
                        transition={{ duration: 1.2, delay: 0.5 + i * 0.12 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 14, border: "1px solid rgba(245,240,232,0.1)", background: "rgba(245,240,232,0.04)", cursor: "pointer", marginTop: 4 }}>
                <HugeiconsIcon icon={LockIcon} size={13} style={{ color: GOLD }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: CREAM }}>Unlock with Premium</p>
                  <p style={{ fontSize: 10, color: "rgba(245,240,232,0.3)", marginTop: 2 }}>Deeper dimensions await.</p>
                </div>
                <HugeiconsIcon icon={ArrowRight01Icon} size={12} style={{ color: "rgba(245,240,232,0.28)", flexShrink: 0 }} />
              </div>
            </motion.div>
          </div>

          {/* Ask The Pull */}
          <motion.div {...f(0.36)} style={{ ...glass(0.05), padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <HugeiconsIcon icon={AiSparklesIcon} size={18} style={{ color: GOLD }} />
              </div>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.55)", fontWeight: 700 }}>Ask The Pull</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: CREAM }}>Your Intelligence Guide</p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(245,240,232,0.42)", lineHeight: 1.65, marginBottom: 16 }}>The more The Pull learns about you, the more specific its answers become.</p>
            <div style={{ padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(201,168,76,0.15)", background: "rgba(0,0,0,0.15)", marginBottom: 14 }}>
              <p style={{ fontSize: 10, color: "rgba(245,240,232,0.28)", marginBottom: 4 }}>Suggested question</p>
              <p style={{ fontSize: 12, color: GOLD, fontStyle: "italic" }}>"What's changed about me since I last checked in?"</p>
            </div>
            <Link href="/coach" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "rgba(245,240,232,0.6)", background: "rgba(245,240,232,0.05)", border: "1px solid rgba(245,240,232,0.09)", textDecoration: "none" }}>
              <HugeiconsIcon icon={Message02Icon} size={13} /> Ask The Pull <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
