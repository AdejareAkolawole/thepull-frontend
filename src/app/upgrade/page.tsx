"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle01Icon, AiSparklesIcon, ArrowRight01Icon,
  LockIcon, FlashIcon, StarIcon,
} from "@hugeicons/core-free-icons";

const WINE  = "#3d0e1a";
const WINE2 = "#c0404f";
const T1    = "#0f0a14";
const T2    = "rgba(15,10,20,0.5)";
const T3    = "rgba(15,10,20,0.28)";

const f = (d = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d, ease: "easeOut" as const },
});

const KNOW_ME_FEATURES = [
  "Everything in Pro",
  "What The Pull Knows About You",
  "Deepest longitudinal intelligence",
  "Deep Synthesis — how your intelligence reinforces & where it diverges",
  "How Your Understanding Is Evolving",
  "Priority Feature Access",
];

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

  const price  = billing === "monthly" ? "24.99" : "249.99";
  const period = billing === "monthly" ? "/month" : "/year";

  return (
    <div style={{ background: "#fff", minHeight: "100vh", marginTop: -20, paddingBottom: 100 }}>

      {/* ── FOUNDING 500 CARD ───────────────────────────────── */}
      <motion.div {...f(0)} style={{ padding: "32px 24px 0", maxWidth: 840, margin: "0 auto" }}>
        <div style={{
          position: "relative", overflow: "hidden", borderRadius: 24,
          background: "linear-gradient(135deg,rgba(26,10,16,0.92) 0%,rgba(42,16,26,0.88) 100%)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(201,168,76,0.18)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18), inset 0 1px 0 rgba(201,168,76,0.1)",
          padding: "28px 28px 24px",
        }}>
          {/* Glow blob */}
          <div style={{ position: "absolute", top: -60, right: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,168,76,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Top row: label + price */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16, flexWrap: "wrap" as const }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.22)", marginBottom: 10 }}>
                  <HugeiconsIcon icon={StarIcon} size={10} style={{ color: "rgba(201,168,76,0.8)" }} />
                  <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase" as const, color: "rgba(201,168,76,0.85)" }}>The Founding 500</span>
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 4 }}>
                  You&apos;re early. Make it count.
                </h2>
                <p style={{ fontSize: 12, color: "rgba(245,240,232,0.4)", lineHeight: 1.6 }}>
                  Lock in <span style={{ color: "rgba(201,168,76,0.9)", fontWeight: 600 }}>$19.99/month</span> for life · Regular $24.99/month
                </p>
              </div>
              {/* Price badge */}
              <div style={{ textAlign: "right" as const, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: "rgba(201,168,76,0.95)", lineHeight: 1, letterSpacing: "-0.03em" }}>$19</span>
                  <span style={{ fontSize: 13, color: "rgba(201,168,76,0.55)", paddingBottom: 4 }}>.99/mo</span>
                </div>
                <p style={{ fontSize: 9, color: "rgba(245,240,232,0.25)", textAlign: "right" as const, marginTop: 2 }}>founding rate</p>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: "rgba(245,240,232,0.3)" }}>347 spots claimed</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(201,168,76,0.7)" }}>153 remaining</span>
              </div>
              <div style={{ height: 4, borderRadius: 99, background: "rgba(245,240,232,0.06)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: "69.4%", borderRadius: 99, background: "linear-gradient(90deg,rgba(201,168,76,0.5),rgba(201,168,76,0.85))" }} />
              </div>
            </div>

            {/* Footer row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" as const }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <HugeiconsIcon icon={LockIcon} size={10} style={{ color: "rgba(245,240,232,0.22)" }} />
                <span style={{ fontSize: 10, color: "rgba(245,240,232,0.28)", fontStyle: "italic" }}>Rate locked while continuously subscribed</span>
              </div>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "10px 22px", borderRadius: 99,
                background: "linear-gradient(135deg,#b8922a,#c9a84c,#e2c36a)",
                border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 800, color: "#1a0a10",
                boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
                flexShrink: 0,
              }}>
                <HugeiconsIcon icon={AiSparklesIcon} size={12} />
                Claim Founding Membership
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* HERO */}
      <motion.div {...f(0)} style={{ textAlign: "center", padding: "80px 24px 56px" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: WINE2, fontWeight: 700, marginBottom: 18 }}>Upgrade</p>
        <h1 style={{ fontSize: 64, fontWeight: 800, color: T1, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: 18 }}>
          Know yourself<br />completely.
        </h1>
        <p style={{ fontSize: 16, color: T2, lineHeight: 1.75, maxWidth: 440, margin: "0 auto" }}>
          Free gives you the foundation. Pro gives you the full picture.
        </p>
      </motion.div>

      {/* TOGGLE */}
      <motion.div {...f(0.08)} style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
        <div style={{ display: "inline-flex", background: "#f5f4f7", borderRadius: 99, padding: 4 }}>
          {(["monthly", "annual"] as const).map(b => (
            <button key={b} onClick={() => setBilling(b)} style={{
              padding: "10px 24px", borderRadius: 99,
              background: billing === b ? WINE : "transparent",
              border: "none",
              color: billing === b ? "#fff" : T2,
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              transition: "all 0.2s",
            }}>
              {b === "monthly" ? "Monthly" : "Annual · Save 17%"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* CARDS */}
      <div className="upgrade-grid" style={{ maxWidth: 840, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>

        {/* FREE */}
        <motion.div {...f(0.12)} style={{
          background: "#faf9f7",
          border: "1px solid rgba(15,10,20,0.08)",
          borderRadius: 24, padding: "36px 32px",
          display: "flex", flexDirection: "column", gap: 0,
        }}>
          <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T3, fontWeight: 700, marginBottom: 20 }}>Free</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 5, marginBottom: 20 }}>
            <span style={{ fontSize: 64, fontWeight: 800, color: T1, lineHeight: 1, letterSpacing: "-0.04em" }}>$0</span>
            <span style={{ fontSize: 14, color: T3, paddingBottom: 8 }}>forever</span>
          </div>
          <p style={{ fontSize: 14, color: T2, lineHeight: 1.7, marginBottom: 28 }}>
            The Pull gives you a foundational understanding of who you are. Genuinely useful on its own — and it grows as you do.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
            {FREE_FEATURES.map(feat => (
              <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <HugeiconsIcon icon={CheckmarkCircle01Icon} size={15} style={{ color: T3, flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 13, color: T2, lineHeight: 1.55 }}>{feat}</span>
              </div>
            ))}
          </div>
          <button style={{ width: "100%", padding: "14px", borderRadius: 14, background: "transparent", border: "1px solid rgba(15,10,20,0.12)", color: T3, fontSize: 13, fontWeight: 700, cursor: "default" }}>
            Current Plan
          </button>
        </motion.div>

        {/* PRO */}
        <motion.div {...f(0.18)} style={{
          background: WINE,
          borderRadius: 24, padding: "36px 32px",
          display: "flex", flexDirection: "column", gap: 0,
          position: "relative", overflow: "hidden",
          boxShadow: "0 20px 60px rgba(61,14,26,0.2)",
        }}>
          {/* subtle glow */}
          <div style={{ position: "absolute", top: -80, right: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,64,79,0.35) 0%, transparent 70%)", pointerEvents: "none" }} />

          {/* badge */}
          <div style={{ position: "absolute", top: 20, right: 20, background: billing === "annual" ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.1)", border: `1px solid ${billing === "annual" ? "rgba(74,222,128,0.35)" : "rgba(255,255,255,0.18)"}`, borderRadius: 99, padding: "4px 12px" }}>
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.16em", color: billing === "annual" ? "#4ade80" : "rgba(255,255,255,0.7)" }}>
              {billing === "annual" ? "BEST VALUE" : "MOST CHOSEN"}
            </span>
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontWeight: 700, marginBottom: 20 }}>Pro</p>

            <div style={{ display: "flex", alignItems: "flex-end", gap: 5, marginBottom: billing === "monthly" ? 14 : 10 }}>
              <span style={{ fontSize: 64, fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-0.04em" }}>${price}</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", paddingBottom: 8 }}>{period}</span>
            </div>

            {billing === "monthly" && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 13px", borderRadius: 99, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.16)", marginBottom: 18 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: WINE2 }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "0.06em" }}>FOUNDING 500 · $19.99 LOCKED</span>
              </div>
            )}

            {billing === "annual" && (
              <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" as const }}>
                <div style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#4ade80" }}>$20.83/mo billed annually</span>
                </div>
                <div style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#4ade80" }}>Save $49.89 vs monthly</span>
                </div>
              </div>
            )}

            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 28 }}>
              For people who want The Pull to know them more deeply.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {PRO_FEATURES.map((feat, i) => (
                <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} size={15} style={{ color: i === 0 ? "rgba(255,255,255,0.25)" : WINE2, flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: i === 0 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.85)", lineHeight: 1.55 }}>{feat}</span>
                </div>
              ))}
            </div>

            <button style={{
              width: "100%", padding: "15px", borderRadius: 14,
              background: WINE2, border: "none",
              color: "#fff", fontSize: 14, fontWeight: 800,
              cursor: "pointer", letterSpacing: "0.03em",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: "0 4px 20px rgba(192,64,79,0.4)",
            }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={15} />
              Start Pro{billing === "annual" ? " · Annual" : ""}
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── KNOW ME CARD ──────────────────────────────────────── */}
      <motion.div {...f(0.25)} style={{ maxWidth: 840, margin: "16px auto 0", padding: "0 24px" }}>
        <div style={{
          position: "relative", overflow: "hidden", borderRadius: 24,
          background: "linear-gradient(150deg,#0d0608 0%,#1a0c12 50%,#120608 100%)",
          border: "1px solid rgba(201,168,76,0.14)",
          boxShadow: "0 16px 56px rgba(0,0,0,0.28), inset 0 1px 0 rgba(201,168,76,0.08)",
          padding: "36px 36px 32px",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40,
        }}>
          {/* Glow blobs */}
          <div style={{ position: "absolute", top: -80, left: "30%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,168,76,0.08) 0%,transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, right: "10%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(192,64,79,0.06) 0%,transparent 70%)", filter: "blur(20px)", pointerEvents: "none" }} />

          {/* LEFT: info */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
              <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(201,168,76,0.7)" }}>Know Me</span>
            </div>
            <h3 style={{ fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 6 }}>KNOW ME</h3>
            <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(201,168,76,0.8)", marginBottom: 6 }}>Know yourself at the deepest level.</p>
            <p style={{ fontSize: 12, color: "rgba(245,240,232,0.3)", fontStyle: "italic", marginBottom: 16 }}>Your Pull understands how you are evolving.</p>
            <p style={{ fontSize: 13, color: "rgba(245,240,232,0.5)", lineHeight: 1.75, marginBottom: 24 }}>
              KNOW ME turns everything The Pull has learned into the deepest personal intelligence — cross-engine synthesis, full historical depth, and pattern confidence analysis, so you can act with the full weight of your own evidence behind you.
            </p>

            {/* Pricing */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}>$69</span>
                <span style={{ fontSize: 13, color: "rgba(245,240,232,0.35)", paddingBottom: 5 }}>.99/month</span>
              </div>
              <div style={{ width: 1, height: 28, background: "rgba(245,240,232,0.1)" }} />
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: "rgba(245,240,232,0.5)", lineHeight: 1, letterSpacing: "-0.02em" }}>$699</span>
                <span style={{ fontSize: 12, color: "rgba(245,240,232,0.25)", paddingBottom: 4 }}>/year</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
              {["$58.25/month billed annually", "Save $140.88 vs monthly"].map(tag => (
                <span key={tag} style={{ fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 99, background: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.25)", color: "#4ade80" }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* RIGHT: features + CTAs */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column" as const }}>
            <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.3)", marginBottom: 20 }}>What&apos;s Included</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 20px", flex: 1, marginBottom: 24 }}>
              {KNOW_ME_FEATURES.map(feat => (
                <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <HugeiconsIcon icon={AiSparklesIcon} size={11} style={{ color: "rgba(201,168,76,0.6)", flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: 12, color: "rgba(245,240,232,0.65)", lineHeight: 1.55 }}>{feat}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: "rgba(245,240,232,0.2)", fontStyle: "italic", marginBottom: 16 }}>The deepest understanding for those who want it all.</p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
              {["Monthly", "Annual"].map(period => (
                <button key={period} style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
                  padding: "14px", borderRadius: 14,
                  background: period === "Monthly"
                    ? "linear-gradient(135deg,#b8922a,#c9a84c,#e2c36a)"
                    : "linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.25))",
                  border: period === "Annual" ? "1px solid rgba(201,168,76,0.25)" : "none",
                  color: period === "Monthly" ? "#1a0a10" : "rgba(201,168,76,0.85)",
                  fontSize: 13, fontWeight: 800, cursor: "pointer",
                  boxShadow: period === "Monthly" ? "0 4px 24px rgba(201,168,76,0.25)" : "none",
                  letterSpacing: "0.01em",
                }}>
                  <HugeiconsIcon icon={AiSparklesIcon} size={13} />
                  START KNOW ME · {period}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* TRUST */}
      <motion.div {...f(0.3)} style={{ textAlign: "center", marginTop: 24 }}>
        <p style={{ fontSize: 12, color: T3 }}>Cancel any time · Founding 500 price locked forever · No surprise charges</p>
      </motion.div>

      {/* ── CHOOSE YOUR DEPTH ──────────────────────────────────── */}
      <motion.div {...f(0.32)} style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(170deg,#150608 0%,#200c14 55%,#160a0f 100%)",
        margin: "48px 0 0", padding: "80px 24px 72px",
      }}>
        {/* Glow blobs */}
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(192,64,79,0.1) 0%,transparent 65%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, right: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,168,76,0.07) 0%,transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 840, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.32em", textTransform: "uppercase" as const, color: "rgba(201,168,76,0.6)", marginBottom: 20 }}>Choose Your Depth</p>
            <h2 style={{ fontSize: 48, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.08, marginBottom: 14, fontFamily: "Georgia,'Times New Roman',serif" }}>
              The Pull doesn&apos;t just assess you once.
            </h2>
            <p style={{ fontSize: 17, color: "rgba(245,240,232,0.55)", marginBottom: 10 }}>It gets to know you. Choose how deeply.</p>
            <p style={{ fontSize: 13, color: "rgba(245,240,232,0.3)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 16px" }}>
              Start by understanding yourself. Let The Pull learn you over time. Eventually, use what it knows to make better decisions.
            </p>
            <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(201,168,76,0.8)", fontStyle: "italic" }}>Personal intelligence that grows with you.</p>
          </div>

          {/* 3-tier row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, borderRadius: 20, overflow: "hidden", border: "1px solid rgba(245,240,232,0.07)", marginBottom: 64 }}>
            {[
              { tag: "Learn", name: "LEARN ME",        sub: "Start understanding yourself.",    dim: false },
              { tag: "Understand", name: "UNDERSTAND ME", sub: "Understand yourself more deeply.", dim: false },
              { tag: "Know", name: "KNOW ME",           sub: "Know yourself at the deepest level.", dim: false },
            ].map((tier, i) => (
              <div key={tier.name} style={{
                padding: "32px 28px",
                background: i === 1 ? "rgba(245,240,232,0.04)" : "rgba(245,240,232,0.02)",
                borderLeft: i > 0 ? "1px solid rgba(245,240,232,0.07)" : "none",
                textAlign: "center" as const,
              }}>
                <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "rgba(201,168,76,0.55)", marginBottom: 14 }}>{tier.tag}</p>
                <p style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 8 }}>{tier.name}</p>
                <p style={{ fontSize: 12, color: "rgba(245,240,232,0.35)", fontStyle: "italic" }}>{tier.sub}</p>
              </div>
            ))}
          </div>

          {/* WHY section */}
          <div style={{ borderTop: "1px solid rgba(245,240,232,0.07)", paddingTop: 64 }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.25)", marginBottom: 20 }}>Why The Pull Gets More Valuable With Time</p>
              <h3 style={{ fontSize: 40, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 6, fontFamily: "Georgia,'Times New Roman',serif" }}>
                Most assessments tell you who you are once.
              </h3>
              <p style={{ fontSize: 40, fontWeight: 800, color: "rgba(201,168,76,0.85)", letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 28, fontFamily: "Georgia,'Times New Roman',serif", fontStyle: "italic" }}>
                The Pull keeps learning.
              </p>
              <p style={{ fontSize: 14, color: "rgba(245,240,232,0.38)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
                On day one, The Pull establishes your foundation — your Pull Score, your archetype, the shape of who you are. Then it shifts. As you live, you bring experience. The Pull notices patterns. As patterns repeat, its confidence grows. Eventually, The Pull can tell you things it could not have known on day one.
              </p>
            </div>

            {/* 5-step journey */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 0, marginBottom: 64, flexWrap: "wrap" as const }}>
              {[
                { n: 1, label: "Foundation",        sub: "Who you are, today" },
                { n: 2, label: "Experience",        sub: "You live, you share" },
                { n: 3, label: "Pattern",           sub: "The Pull notices" },
                { n: 4, label: "Learning",          sub: "Confidence grows" },
                { n: 5, label: "Deeper Intelligence", sub: "What it could not know on day one" },
              ].map((step, i) => (
                <div key={step.n} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ textAlign: "center" as const, width: 120 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: i < 2 ? "rgba(192,64,79,0.2)" : i === 2 ? "rgba(201,168,76,0.15)" : "rgba(245,240,232,0.06)",
                      border: `1px solid ${i < 2 ? "rgba(192,64,79,0.35)" : i === 2 ? "rgba(201,168,76,0.3)" : "rgba(245,240,232,0.12)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 12px",
                      fontSize: 14, fontWeight: 800,
                      color: i < 2 ? "rgba(192,64,79,0.9)" : i === 2 ? "rgba(201,168,76,0.85)" : "rgba(245,240,232,0.35)",
                    }}>{step.n}</div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(245,240,232,0.75)", marginBottom: 4 }}>{step.label}</p>
                    <p style={{ fontSize: 10, color: "rgba(245,240,232,0.3)", lineHeight: 1.5 }}>{step.sub}</p>
                  </div>
                  {i < 4 && (
                    <div style={{ width: 32, flexShrink: 0, display: "flex", justifyContent: "center", paddingBottom: 28 }}>
                      <HugeiconsIcon icon={ArrowRight01Icon} size={13} style={{ color: "rgba(245,240,232,0.15)" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 3-column footer */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, borderTop: "1px solid rgba(245,240,232,0.07)", paddingTop: 40 }}>
              {[
                { tag: "Pull Score",          q: "What is my current intelligence profile?" },
                { tag: "Living Intelligence", q: "What has The Pull learned about me over time?" },
                { tag: "Ask The Pull",        q: "What can I ask about what it knows?" },
              ].map((col, i) => (
                <div key={col.tag} style={{ padding: "0 24px", borderLeft: i > 0 ? "1px solid rgba(245,240,232,0.07)" : "none" }}>
                  <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.25)", marginBottom: 10 }}>{col.tag}</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "rgba(245,240,232,0.6)", lineHeight: 1.5, fontStyle: "italic" }}>{col.q}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* BOTTOM CTA */}
      <motion.div {...f(0.35)} style={{ textAlign: "center", padding: "80px 24px 0" }}>
        <h2 style={{ fontSize: 44, fontWeight: 800, color: T1, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
          Your intelligence<br />is waiting.
        </h2>
        <p style={{ fontSize: 15, color: T2, lineHeight: 1.7, maxWidth: 380, margin: "0 auto 32px" }}>
          Start with Pro and let The Pull go deeper with you.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 30px", borderRadius: 14, background: WINE, border: "none", color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 28px rgba(61,14,26,0.2)", letterSpacing: "0.02em" }}>
            <HugeiconsIcon icon={AiSparklesIcon} size={14} />
            Start Pro
          </button>
          <Link href="/pull-profile" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 14, background: "#f5f4f7", border: "none", color: T2, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            View My Profile
          </Link>
        </div>
      </motion.div>

    </div>
  );
}
