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

    </div>
  );
}
