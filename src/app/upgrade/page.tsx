"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle01Icon, AiSparklesIcon, AiBrain01Icon,
  HeartIcon, Message02Icon, Analytics01Icon, ShieldIcon,
  ArrowRight01Icon, Target01Icon, FlashIcon, FavouriteIcon,
  Activity01Icon, LockIcon, ArrowUp01Icon,
} from "@hugeicons/core-free-icons";

const WINE  = "#3d0e1a";
const WINE2 = "#c0404f";
const GOLD  = "#c9a84c";
const T1    = "#0f0a14";
const T2    = "rgba(15,10,20,0.5)";
const T3    = "rgba(15,10,20,0.32)";

const f = (d = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d, ease: "easeOut" as const },
});

const FREE_FEATURES = [
  "Your Pull Score",
  "Your Pull Archetype",
  "Foundational intelligence across every dimension",
  "The evidence behind what The Pull sees in you",
  "Early Living Intelligence — emerging patterns as they form",
  "Ask The Pull — 5 conversations per month",
  "A living profile that begins to grow with you",
];

const PRO_FEATURES = [
  "Everything in Free",
  "Deeper Intelligence Access",
  "Full Living Intelligence History",
  "Advanced Change Tracking",
  "Outcomes & Impact Insights",
  "Ask The Pull (Unlimited)",
  "Reality Check",
  "Priority Processing",
  "Early Access to New Insights",
];

export default function UpgradePage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", marginTop: -20, paddingBottom: 120 }}>

      {/* ── HERO ── */}
      <div style={{ textAlign: "center", padding: "80px 24px 64px", position: "relative", overflow: "hidden" }}>
        <motion.div {...f(0)} style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, background: "rgba(15,10,20,0.05)", border: "1px solid rgba(15,10,20,0.1)", marginBottom: 32 }}>
            <HugeiconsIcon icon={AiSparklesIcon} size={11} style={{ color: WINE2 }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: T2, letterSpacing: "0.12em", textTransform: "uppercase" }}>Premium Intelligence</span>
          </div>
          <h1 style={{ fontSize: 72, fontWeight: 800, color: "#0f0a14", lineHeight: 1, letterSpacing: "-0.04em", marginBottom: 22 }}>
            Know yourself<br /><span style={{ color: T1 }}>completely.</span>
          </h1>
          <p style={{ fontSize: 17, color: T2, lineHeight: 1.75, maxWidth: 480, margin: "0 auto" }}>
            Free gives you a foundation. Pro unlocks the full picture — deeper dimensions, living reports, unlimited guidance.
          </p>
        </motion.div>
      </div>

      {/* ── BILLING TOGGLE ── */}
      <motion.div {...f(0.1)} style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
        <div style={{ display: "inline-flex", background: "rgba(61,14,26,0.06)", border: "1px solid rgba(61,14,26,0.1)", borderRadius: 99, padding: 4 }}>
          {(["monthly", "annual"] as const).map(b => (
            <button key={b} onClick={() => setBilling(b)} style={{
              padding: "9px 22px", borderRadius: 99,
              background: billing === b ? WINE2 : "transparent",
              border: "none",
              color: billing === b ? T1 : T2,
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              transition: "all 0.2s",
              letterSpacing: "0.02em",
            }}>
              {b === "monthly" ? "Monthly" : "Annual · Save 17%"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── PLAN CARDS ── */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* FREE */}
        <motion.div {...f(0.14)} style={{
          background: "#faf7f2",
          border: "1px solid rgba(15,10,20,0.08)",
          borderRadius: 28, padding: "40px 36px 36px",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ marginBottom: 36 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: T3, fontWeight: 700, marginBottom: 10 }}>Free</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 18 }}>
              <span style={{ fontSize: 72, fontWeight: 800, color: "#0f0a14", lineHeight: 1, letterSpacing: "-0.04em" }}>$0</span>
              <span style={{ fontSize: 15, color: T3, paddingBottom: 10 }}>forever</span>
            </div>
            <p style={{ fontSize: 14, color: T2, lineHeight: 1.7 }}>
              The Pull gives you a foundational understanding of who you are. Genuinely useful on its own — and it grows as you do.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 13, flex: 1, marginBottom: 36 }}>
            {FREE_FEATURES.map(feat => (
              <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <HugeiconsIcon icon={CheckmarkCircle01Icon} size={15} style={{ color: T3, flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 13, color: T2, lineHeight: 1.55 }}>{feat}</span>
              </div>
            ))}
          </div>

          <button style={{ width: "100%", padding: "15px", borderRadius: 16, background: "transparent", border: "1px solid rgba(15,10,20,0.12)", color: "rgba(15,10,20,0.35)", fontSize: 13, fontWeight: 700, cursor: "default", letterSpacing: "0.04em" }}>
            Current Plan
          </button>
        </motion.div>

        {/* PRO */}
        <motion.div {...f(0.2)} style={{
          background: "linear-gradient(160deg, #1c1208 0%, #130e05 50%, #1a1007 100%)",
          border: "1px solid rgba(192,64,79,0.2)",
          borderRadius: 28, padding: "40px 36px 36px",
          display: "flex", flexDirection: "column",
          position: "relative", overflow: "hidden",
          boxShadow: "0 0 80px rgba(192,64,79,0.06)",
        }}>
          {/* Glow */}
          <div style={{ position: "absolute", top: -60, right: -40, width: 240, height: 240, background: "radial-gradient(circle, rgba(192,64,79,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />

          {/* Badge */}
          <div style={{ position: "absolute", top: 20, right: 20, background: billing === "annual" ? "rgba(74,222,128,0.12)" : "rgba(192,64,79,0.1)", border: `1px solid ${billing === "annual" ? "rgba(74,222,128,0.3)" : "rgba(192,64,79,0.25)"}`, borderRadius: 99, padding: "4px 12px" }}>
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.16em", color: billing === "annual" ? "#4ade80" : WINE2 }}>
              {billing === "annual" ? "BEST VALUE" : "MOST CHOSEN"}
            </span>
          </div>

          <div style={{ marginBottom: 36, position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,168,76,0.5)", fontWeight: 700, marginBottom: 10 }}>Pro</p>

            {billing === "monthly" ? (
              <>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 12 }}>
                  <span style={{ fontSize: 72, fontWeight: 800, color: T1, lineHeight: 1, letterSpacing: "-0.04em" }}>$24</span>
                  <span style={{ fontSize: 28, fontWeight: 800, color: T1, lineHeight: 1, paddingBottom: 8 }}>.99</span>
                  <span style={{ fontSize: 15, color: "rgba(245,240,232,0.3)", paddingBottom: 10 }}>/month</span>
                </div>
                {/* Founding pill */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, background: "rgba(192,64,79,0.08)", border: "1px solid rgba(201,168,76,0.22)", marginBottom: 18 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: WINE2 }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: "0.06em" }}>FOUNDING 500 · $19.99 LOCKED</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 12 }}>
                  <span style={{ fontSize: 72, fontWeight: 800, color: T1, lineHeight: 1, letterSpacing: "-0.04em" }}>$249</span>
                  <span style={{ fontSize: 28, fontWeight: 800, color: T1, lineHeight: 1, paddingBottom: 8 }}>.99</span>
                  <span style={{ fontSize: 15, color: "rgba(245,240,232,0.3)", paddingBottom: 10 }}>/year</span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, marginBottom: 18 }}>
                  <div style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.22)" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#4ade80" }}>$20.83/mo billed annually</span>
                  </div>
                  <div style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.22)" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#4ade80" }}>Save $49.89 vs monthly</span>
                  </div>
                </div>
              </>
            )}

            <p style={{ fontSize: 14, color: "rgba(245,240,232,0.42)", lineHeight: 1.7 }}>
              For people who want The Pull to know them more deeply.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 13, flex: 1, marginBottom: 36, position: "relative", zIndex: 1 }}>
            {PRO_FEATURES.map((feat, i) => (
              <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <HugeiconsIcon icon={CheckmarkCircle01Icon} size={15} style={{ color: i === 0 ? T3 : WINE2, flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 13, color: i === 0 ? "rgba(245,240,232,0.4)" : "rgba(245,240,232,0.75)", lineHeight: 1.55, fontWeight: i === 0 ? 400 : 500 }}>{feat}</span>
              </div>
            ))}
          </div>

          <button style={{
            width: "100%", padding: "16px", borderRadius: 16,
            background: `linear-gradient(135deg,${WINE},${WINE2})`,
            border: "none", color: WINE,
            fontSize: 14, fontWeight: 800, cursor: "pointer",
            letterSpacing: "0.05em", textTransform: "uppercase" as const,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            boxShadow: "0 8px 32px rgba(201,168,76,0.18)",
            position: "relative", zIndex: 1,
          }}>
            <HugeiconsIcon icon={AiSparklesIcon} size={15} />
            Start Pro{billing === "annual" ? " · Annual" : ""}
          </button>
        </motion.div>
      </div>

      {/* ── TRUST LINE ── */}
      <motion.div {...f(0.3)} style={{ textAlign: "center", marginTop: 28 }}>
        <p style={{ fontSize: 12, color: T3 }}>Cancel any time · Founding 500 price locked forever · No surprise charges</p>
      </motion.div>

      {/* ── BOTTOM CTA ── */}
      <div style={{ textAlign: "center", padding: "80px 24px 0" }}>
        <motion.div {...f(0.1)}>
          <h2 style={{ fontSize: 48, fontWeight: 800, color: "#0f0a14", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 18 }}>
            Your intelligence<br /><span style={{ color: T1 }}>is waiting.</span>
          </h2>
          <p style={{ fontSize: 15, color: T2, lineHeight: 1.7, maxWidth: 400, margin: "0 auto 36px" }}>
            Start with Pro and let The Pull go deeper with you.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 30px", borderRadius: 16, background: `linear-gradient(135deg,${WINE},${WINE2})`, border: "none", color: WINE, fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 24px rgba(192,64,79,0.25)", letterSpacing: "0.04em" }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={14} />
              START PRO
            </button>
            <Link href="/pull-profile" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 16, background: "rgba(15,10,20,0.04)", border: "1px solid rgba(15,10,20,0.1)", color: T2, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              View My Profile
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
