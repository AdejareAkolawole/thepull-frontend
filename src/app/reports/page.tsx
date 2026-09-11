"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ScaleIcon, SentIcon, CheckmarkCircle01Icon, ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { runRealityCheck, getRealityCheckUsage } from "@/lib/api";
import { trackActivity } from "@/lib/streaks";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

const WINE2 = "#c0404f";
const CREAM = "#f5f0e8";
const DARK  = "#2d1a14";
const MID   = "#7c5c50";

const taStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box", resize: "none",
  background: "rgba(245,240,232,0.04)",
  border: "1px solid rgba(245,240,232,0.1)", borderRadius: 14,
  padding: "12px 14px", fontSize: 14, color: "rgba(245,240,232,0.82)",
  lineHeight: 1.65, outline: "none", fontFamily: "inherit",
  transition: "border-color 0.15s",
};

type Usage = {
  tier: string;
  used: number;
  limit: number | null;
  remaining: number | null;
  limit_reached: boolean;
};

export default function RealityCheckPage() {
  const [what, setWhat]     = useState("");
  const [means, setMeans]   = useState("");
  const [action, setAction] = useState("");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError]   = useState(false);
  const [usage, setUsage]   = useState<Usage | null>(null);

  useEffect(() => {
    getRealityCheckUsage().then(setUsage).catch(() => {});
  }, []);

  const limitReached = usage?.limit_reached === true;
  const isFree = usage?.tier === "free";
  const canRun = what.trim().length > 0 && !running && !limitReached;

  async function handleRun() {
    if (!canRun) return;
    setRunning(true);
    setResult(null);
    setError(false);
    try {
      const res = await runRealityCheck({ situation: what, thinking: means, considering: action }) as Record<string, unknown>;
      trackActivity("reality_check");
      setResult(res.result as string ?? res.analysis as string ?? "Check complete.");
      // refresh usage count
      if (res.usage) {
        setUsage(prev => prev ? { ...prev, used: (res.usage as Record<string,number>).used, remaining: (res.usage as Record<string,number>).remaining, limit_reached: (res.usage as Record<string,number>).remaining === 0 } : prev);
      } else {
        getRealityCheckUsage().then(setUsage).catch(() => {});
      }
    } catch (err: unknown) {
      const e = err as { status?: number; detail?: { message?: string } };
      if (e?.status === 429) {
        setUsage(prev => prev ? { ...prev, limit_reached: true, remaining: 0 } : prev);
        setResult(null);
      } else {
        setError(true);
        setResult("Something went wrong. Please try again.");
      }
    } finally {
      setRunning(false);
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 0, padding: "0 0 40px" }}>

      {/* Header */}
      <motion.div {...f(0)} style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14, flexWrap: "wrap" as const }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(61,14,26,0.07)", border: "1px solid rgba(61,14,26,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <HugeiconsIcon icon={ScaleIcon} size={17} style={{ color: MID }} />
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: DARK, letterSpacing: "-0.03em", lineHeight: 1 }}>Reality Check</h1>
          </div>

          {/* Usage pill — free users only */}
          {isFree && usage && (
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "5px 10px", borderRadius: 99,
              background: limitReached ? "rgba(192,64,79,0.1)" : "rgba(45,26,20,0.06)",
              border: `1px solid ${limitReached ? "rgba(192,64,79,0.25)" : "rgba(45,26,20,0.1)"}`,
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: limitReached ? WINE2 : MID }}>
                {usage.used} / {usage.limit} used
              </span>
              {!limitReached && (
                <span style={{ fontSize: 11, color: "rgba(124,92,80,0.55)" }}>this month</span>
              )}
            </div>
          )}
        </div>
        <p style={{ fontSize: 13, color: MID, lineHeight: 1.7 }}>
          A focused first read: where your view of yourself and your own patterns may be pulling differently.
        </p>
      </motion.div>

      {/* Limit reached banner */}
      {limitReached && (
        <motion.div {...f(0.04)} style={{
          background: "rgba(192,64,79,0.06)",
          border: "1px solid rgba(192,64,79,0.2)",
          borderRadius: 14, padding: "16px 18px",
          marginBottom: 14,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" as const,
        }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: WINE2, marginBottom: 2 }}>Monthly limit reached</p>
            <p style={{ fontSize: 12, color: MID, lineHeight: 1.5 }}>
              Free plan includes 3 reality checks per month. Resets on the 1st.
            </p>
          </div>
          <a href="/upgrade" style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "8px 14px", borderRadius: 10,
            background: "linear-gradient(135deg,#7c2232,#c0404f)",
            color: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none",
            whiteSpace: "nowrap" as const,
          }}>
            Upgrade <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
          </a>
        </motion.div>
      )}

      {/* Form card */}
      <motion.div {...f(0.08)} style={{
        background: "linear-gradient(160deg,#4a0f1a 0%,#7c2232 65%,#5c1525 100%)",
        borderRadius: 20,
        border: "1px solid rgba(245,240,232,0.07)",
        boxShadow: "0 12px 48px rgba(0,0,0,0.3), inset 0 1px 0 rgba(245,240,232,0.07)",
        overflow: "hidden",
        marginBottom: 14,
        opacity: limitReached ? 0.55 : 1,
        pointerEvents: limitReached ? "none" as const : "auto" as const,
      }}>

        {/* Q1 */}
        <div style={{ padding: "22px 20px 20px", borderBottom: "1px solid rgba(245,240,232,0.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 12, flexWrap: "wrap" as const }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.5)" }}>What happened?</p>
            <span style={{ fontSize: 10, color: "rgba(245,240,232,0.25)" }}>· required</span>
          </div>
          <textarea
            value={what}
            onChange={e => setWhat(e.target.value)}
            placeholder="The situation that's on your mind — what actually went on."
            rows={4}
            style={taStyle}
            onFocus={e => (e.target.style.borderColor = "rgba(192,64,79,0.4)")}
            onBlur={e => (e.target.style.borderColor = "rgba(245,240,232,0.1)")}
          />
        </div>

        {/* Q2 */}
        <div style={{ padding: "20px", borderBottom: "1px solid rgba(245,240,232,0.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 12, flexWrap: "wrap" as const }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.5)" }}>What are you thinking it means?</p>
            <span style={{ fontSize: 10, color: "rgba(245,240,232,0.2)" }}>· optional</span>
          </div>
          <textarea
            value={means}
            onChange={e => setMeans(e.target.value)}
            placeholder="Optional — the interpretation you're adding to the facts."
            rows={3}
            style={taStyle}
            onFocus={e => (e.target.style.borderColor = "rgba(192,64,79,0.4)")}
            onBlur={e => (e.target.style.borderColor = "rgba(245,240,232,0.1)")}
          />
        </div>

        {/* Q3 */}
        <div style={{ padding: "20px", borderBottom: "1px solid rgba(245,240,232,0.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 12, flexWrap: "wrap" as const }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.5)" }}>What are you considering doing?</p>
            <span style={{ fontSize: 10, color: "rgba(245,240,232,0.2)" }}>· optional</span>
          </div>
          <textarea
            value={action}
            onChange={e => setAction(e.target.value)}
            placeholder="Optional — the action you're weighing."
            rows={3}
            style={taStyle}
            onFocus={e => (e.target.style.borderColor = "rgba(192,64,79,0.4)")}
            onBlur={e => (e.target.style.borderColor = "rgba(245,240,232,0.1)")}
          />
        </div>

        {/* Footer row */}
        <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column" as const, gap: 14 }}>
          <p style={{ fontSize: 11, color: "rgba(245,240,232,0.22)", fontStyle: "italic", lineHeight: 1.5 }}>
            The Pull reasons from the intelligence it has actually built about you.
          </p>
          <button
            disabled={!canRun}
            onClick={handleRun}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
              width: "100%", padding: "13px", borderRadius: 12,
              fontSize: 13, fontWeight: 700, cursor: canRun ? "pointer" : "not-allowed",
              background: canRun ? "linear-gradient(135deg,#7c2232,#c0404f)" : "rgba(245,240,232,0.08)",
              border: "none",
              color: canRun ? "#fff" : "rgba(245,240,232,0.25)",
              boxShadow: canRun ? "0 4px 20px rgba(192,64,79,0.35)" : "none",
              transition: "all 0.2s",
            }}>
            <HugeiconsIcon icon={SentIcon} size={13} />
            {running ? "Analysing…" : "Run Reality Check"}
          </button>
        </div>
      </motion.div>

      {/* Result */}
      {result && (
        <motion.div {...f(0)} style={{
          background: CREAM, borderRadius: 18, padding: "20px",
          border: `1px solid ${error ? "rgba(192,64,79,0.2)" : "rgba(45,26,20,0.1)"}`,
          boxShadow: "0 4px 24px rgba(45,26,20,0.08)",
          marginBottom: 14,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <HugeiconsIcon icon={CheckmarkCircle01Icon} size={14} style={{ color: WINE2 }} />
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: WINE2 }}>Reality Check</p>
          </div>
          <p style={{ fontSize: 14, color: DARK, lineHeight: 1.85, whiteSpace: "pre-wrap" }}>
            {result}
          </p>
        </motion.div>
      )}

      {/* Footer note */}
      <motion.div {...f(0.2)}>
        <p style={{ fontSize: 11, color: MID, textAlign: "center" as const, fontStyle: "italic", opacity: 0.55, marginTop: 6 }}>
          Reality Check reads your intelligence — it never changes your Pull Score.
        </p>
      </motion.div>

    </div>
  );
}
