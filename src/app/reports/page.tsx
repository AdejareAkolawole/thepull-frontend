"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ScaleIcon, AiSparklesIcon, SentIcon,
  ArrowRight01Icon, CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

const WINE  = "#3d0e1a";
const WINE2 = "#c0404f";
const CREAM = "#f5f0e8";
const DARK  = "#2d1a14";
const MID   = "#7c5c50";
const GOLD  = "#c9a84c";

export default function RealityCheckPage() {
  const [what, setWhat]     = useState("");
  const [means, setMeans]   = useState("");
  const [action, setAction] = useState("");
  const [ran, setRan]       = useState(false);

  const canRun = what.trim().length > 0;

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 0 }}>

      {/* Header */}
      <motion.div {...f(0)} style={{ marginBottom: 32 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(61,14,26,0.07)", border: "1px solid rgba(61,14,26,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <HugeiconsIcon icon={ScaleIcon} size={18} style={{ color: MID }} />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: DARK, letterSpacing: "-0.03em", lineHeight: 1 }}>Reality Check</h1>
        </div>
        <p style={{ fontSize: 14, color: MID, lineHeight: 1.7, maxWidth: 500 }}>
          A focused first read: where your view of yourself and your own patterns may be pulling differently. One discrepancy at a time — stated honestly, with the confidence The Pull actually has.
        </p>
      </motion.div>

      {/* Form card */}
      <motion.div {...f(0.08)} style={{
        background: "linear-gradient(160deg,#1a0910 0%,#26101a 65%,#1e0c14 100%)",
        borderRadius: 24,
        border: "1px solid rgba(245,240,232,0.07)",
        boxShadow: "0 12px 48px rgba(0,0,0,0.3), inset 0 1px 0 rgba(245,240,232,0.07)",
        overflow: "hidden",
        marginBottom: 16,
      }}>

        {/* Q1 */}
        <div style={{ padding: "28px 28px 24px", borderBottom: "1px solid rgba(245,240,232,0.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.5)" }}>What happened?</p>
            <span style={{ fontSize: 10, color: "rgba(245,240,232,0.25)" }}>· required</span>
          </div>
          <textarea
            value={what}
            onChange={e => setWhat(e.target.value)}
            placeholder="The situation that's on your mind — what actually went on."
            rows={4}
            style={{
              width: "100%", resize: "none", background: "rgba(245,240,232,0.04)",
              border: "1px solid rgba(245,240,232,0.1)", borderRadius: 14,
              padding: "14px 16px", fontSize: 14, color: "rgba(245,240,232,0.82)",
              lineHeight: 1.65, outline: "none", fontFamily: "inherit",
              transition: "border-color 0.15s",
            }}
            onFocus={e => (e.target.style.borderColor = "rgba(192,64,79,0.4)")}
            onBlur={e => (e.target.style.borderColor = "rgba(245,240,232,0.1)")}
          />
        </div>

        {/* Q2 */}
        <div style={{ padding: "24px 28px", borderBottom: "1px solid rgba(245,240,232,0.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.5)" }}>What are you thinking it means?</p>
            <span style={{ fontSize: 10, color: "rgba(245,240,232,0.2)" }}>· optional</span>
          </div>
          <textarea
            value={means}
            onChange={e => setMeans(e.target.value)}
            placeholder="Optional — the interpretation you're adding to the facts."
            rows={3}
            style={{
              width: "100%", resize: "none", background: "rgba(245,240,232,0.04)",
              border: "1px solid rgba(245,240,232,0.1)", borderRadius: 14,
              padding: "14px 16px", fontSize: 14, color: "rgba(245,240,232,0.82)",
              lineHeight: 1.65, outline: "none", fontFamily: "inherit",
              transition: "border-color 0.15s",
            }}
            onFocus={e => (e.target.style.borderColor = "rgba(192,64,79,0.4)")}
            onBlur={e => (e.target.style.borderColor = "rgba(245,240,232,0.1)")}
          />
        </div>

        {/* Q3 */}
        <div style={{ padding: "24px 28px 28px", borderBottom: "1px solid rgba(245,240,232,0.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.5)" }}>What are you considering doing?</p>
            <span style={{ fontSize: 10, color: "rgba(245,240,232,0.2)" }}>· optional</span>
          </div>
          <textarea
            value={action}
            onChange={e => setAction(e.target.value)}
            placeholder="Optional — the action you're weighing."
            rows={3}
            style={{
              width: "100%", resize: "none", background: "rgba(245,240,232,0.04)",
              border: "1px solid rgba(245,240,232,0.1)", borderRadius: 14,
              padding: "14px 16px", fontSize: 14, color: "rgba(245,240,232,0.82)",
              lineHeight: 1.65, outline: "none", fontFamily: "inherit",
              transition: "border-color 0.15s",
            }}
            onFocus={e => (e.target.style.borderColor = "rgba(192,64,79,0.4)")}
            onBlur={e => (e.target.style.borderColor = "rgba(245,240,232,0.1)")}
          />
        </div>

        {/* Footer row */}
        <div style={{ padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" as const }}>
          <p style={{ fontSize: 12, color: "rgba(245,240,232,0.25)", fontStyle: "italic", lineHeight: 1.5, maxWidth: 300 }}>
            The Pull reasons from the intelligence it has actually built about you.
          </p>
          <button
            disabled={!canRun}
            onClick={() => setRan(true)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "12px 24px", borderRadius: 99,
              fontSize: 13, fontWeight: 700, cursor: canRun ? "pointer" : "not-allowed",
              background: canRun ? "linear-gradient(135deg,#7c2232,#c0404f)" : "rgba(245,240,232,0.08)",
              border: "none",
              color: canRun ? "#fff" : "rgba(245,240,232,0.25)",
              boxShadow: canRun ? "0 4px 20px rgba(192,64,79,0.35)" : "none",
              transition: "all 0.2s",
            }}>
            <HugeiconsIcon icon={SentIcon} size={13} />
            Run Reality Check
          </button>
        </div>
      </motion.div>

      {/* Result placeholder */}
      {ran && (
        <motion.div {...f(0)} style={{
          background: CREAM, borderRadius: 20, padding: "24px 28px",
          border: "1px solid rgba(45,26,20,0.1)",
          boxShadow: "0 4px 24px rgba(45,26,20,0.08)",
          marginBottom: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <HugeiconsIcon icon={CheckmarkCircle01Icon} size={14} style={{ color: WINE2 }} />
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: WINE2 }}>Reality Check complete</p>
          </div>
          <p style={{ fontSize: 14, color: MID, lineHeight: 1.75 }}>
            The Pull has read your situation against your intelligence profile. A full read requires more signal — keep sharing moments and patterns will sharpen over time.
          </p>
        </motion.div>
      )}

      {/* Footer note */}
      <motion.div {...f(0.2)}>
        <p style={{ fontSize: 12, color: MID, textAlign: "center" as const, fontStyle: "italic", opacity: 0.6, marginTop: 8 }}>
          Reality Check reads your intelligence — it never changes your Pull Score.
        </p>
      </motion.div>

    </div>
  );
}
