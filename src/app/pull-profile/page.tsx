"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon, ArrowDown01Icon, Share01Icon, FavouriteIcon } from "@hugeicons/core-free-icons";
import { mockUser } from "@/lib/mock";

const CREAM = "#f5f0e8";
const DARK = "#2d1a14";
const MID = "#7c5c50";
const ACCENT = "#6b1c2b";

const forces = [
  {
    label: "Attraction",
    sub: "What draws you toward someone",
    value: "31.22",
    expanded: true,
    whatThisMeans: "You prioritise stability and predictability over emotional intensity.",
    whyWeBelieve: "Across 10 signals across 7 areas of your intelligence, your responses consistently reflect your choices and instincts around who draws you in.",
    growthInsight: "Notice consistency alongside chemistry before making major relationship decisions.",
  },
  {
    label: "Compatibility",
    sub: "How your self-intelligence aligns with others",
    value: "Early alignment",
    note: "Interpretive view",
    valueSmall: true,
  },
  {
    label: "Communication",
    sub: "How you express and listen",
    value: "68.04",
  },
  {
    label: "Conflict",
    sub: "How you navigate friction",
    value: "63.34",
  },
  {
    label: "Attachment",
    sub: "How you bond and trust",
    value: "48.8",
  },
  {
    label: "Growth",
    sub: "How complete your intelligence foundation is",
    value: "47%",
    badge: "FOUNDATION ESTABLISHED",
  },
];

export default function PullProfilePage() {
  const [expanded, setExpanded] = useState<string | null>("Attraction");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 80 }}>
      {/* Main cream card */}
      <div style={{
        width: "100%", maxWidth: 640,
        background: CREAM,
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 8px 48px rgba(45,26,20,0.10)",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "44px 40px 0" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: MID, marginBottom: 28 }}>Your Pull Score</p>

          {/* Score */}
          <p style={{ fontSize: 120, fontWeight: 800, color: DARK, lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: 10 }}>
            {mockUser.pull_score}
          </p>

          {/* Archetype stage */}
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT, marginBottom: 18 }}>
            {mockUser.archetype_stage}
          </p>

          {/* Confidence badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, border: `1px solid rgba(107,28,43,0.25)`, background: "rgba(107,28,43,0.04)", marginBottom: 22 }}>
            <HugeiconsIcon icon={FavouriteIcon} size={11} style={{ color: ACCENT }} />
            <span style={{ fontSize: 11, color: ACCENT }}>Confidence <strong>{mockUser.archetype_confidence}%</strong></span>
          </div>

          {/* Tagline */}
          <p style={{ fontSize: 15, fontStyle: "italic", color: MID, lineHeight: 1.6, marginBottom: 36 }}>
            The first strokes of a clearer picture are forming.
          </p>
        </div>

        {/* Forces section */}
        <div style={{ padding: "0 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <span style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: MID }}>Forces</span>
            <div style={{ flex: 1, height: 1, background: "rgba(45,26,20,0.12)" }} />
          </div>

          {forces.map((f, i) => {
            const isOpen = expanded === f.label;
            const hasDetail = !!f.whatThisMeans;
            return (
              <div key={f.label}>
                <div
                  onClick={() => hasDetail && setExpanded(isOpen ? null : f.label)}
                  style={{
                    paddingTop: 18, paddingBottom: isOpen ? 0 : 18,
                    cursor: hasDetail ? "pointer" : "default",
                    display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16,
                  }}
                >
                  <div>
                    <p style={{ fontSize: 28, fontWeight: 500, color: DARK, lineHeight: 1, marginBottom: 4, fontFamily: "Georgia, serif" }}>{f.label}</p>
                    <p style={{ fontSize: 11, color: MID }}>{f.sub}</p>
                    {f.note && <p style={{ fontSize: 10, fontStyle: "italic", color: MID, marginTop: 2 }}>{f.note}</p>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <span style={{
                      fontSize: f.valueSmall ? 14 : 28,
                      fontWeight: f.valueSmall ? 400 : 600,
                      color: DARK,
                      textAlign: "right",
                    }}>{f.value}</span>
                    {f.badge && (
                      <span style={{ fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: MID, marginLeft: 4, display: "block", textAlign: "right", lineHeight: 1.4 }}>{f.badge}</span>
                    )}
                    {hasDetail && (
                      <HugeiconsIcon icon={isOpen ? ArrowUp01Icon : ArrowDown01Icon} size={14} style={{ color: MID }} />
                    )}
                    {!hasDetail && !f.badge && (
                      <HugeiconsIcon icon={ArrowDown01Icon} size={14} style={{ color: MID, opacity: 0.4 }} />
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && f.whatThisMeans && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, paddingTop: 16, paddingBottom: 20 }}>
                        {[
                          { heading: "What This Means", body: f.whatThisMeans },
                          { heading: "Why We Believe This", body: f.whyWeBelieve },
                          { heading: "Growth Insight", body: f.growthInsight },
                        ].map(col => (
                          <div key={col.heading}>
                            <p style={{ fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: MID, marginBottom: 8 }}>{col.heading}</p>
                            <p style={{ fontSize: 12, color: DARK, lineHeight: 1.65 }}>{col.body}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {i < forces.length - 1 && (
                  <div style={{ height: 1, background: "rgba(45,26,20,0.1)" }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Reading section */}
        <div style={{ margin: "32px 40px 0", padding: "24px 0", borderTop: "1px solid rgba(45,26,20,0.1)" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: MID, marginBottom: 16 }}>Reading</p>
          <p style={{ fontSize: 17, color: DARK, lineHeight: 1.75 }}>
            Your Pull Score reflects a developing foundation of self-awareness and relationship curiosity. Your strongest intelligence right now is in communication, handling tension, what you value. As your Living Profile grows — you are at 81% coverage — your Pull Score will continue evolving.
          </p>
        </div>

        <div style={{ height: 40 }} />
      </div>

      {/* Share button */}
      <div style={{ marginTop: 28 }}>
        <button style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "11px 24px", borderRadius: 99,
          background: "rgba(245,240,232,0.9)",
          border: "1px solid rgba(45,26,20,0.15)",
          color: DARK, fontSize: 13, fontWeight: 500,
          cursor: "pointer",
          boxShadow: "0 2px 12px rgba(45,26,20,0.08)",
        }}>
          <HugeiconsIcon icon={Share01Icon} size={14} style={{ color: MID }} />
          Share Your Pull Score
        </button>
      </div>
    </div>
  );
}
