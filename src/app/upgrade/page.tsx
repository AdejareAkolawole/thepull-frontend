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

      {/* ── FOUNDING 500 BANNER ─────────────────────────────── */}
      <motion.div {...f(0)} style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg,#150608 0%,#2a0d14 45%,#1a0a10 100%)", padding: "72px 24px 64px" }}>
        {/* Ambient glows */}
        <div style={{ position: "absolute", top: -120, left: "20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(192,64,79,0.18) 0%,transparent 65%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, right: "15%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,168,76,0.1) 0%,transparent 65%)", filter: "blur(40px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>

          {/* Label */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 99, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", marginBottom: 28 }}>
            <HugeiconsIcon icon={StarIcon} size={11} style={{ color: "rgba(201,168,76,0.8)" }} />
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "rgba(201,168,76,0.85)" }}>The Founding 500</span>
          </div>

          {/* Headline */}
          <h2 style={{ fontSize: 56, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.06, marginBottom: 20, fontFamily: "Georgia, 'Times New Roman', serif" }}>
            You&apos;re early.<br />Make it count.
          </h2>

          {/* Body */}
          <p style={{ fontSize: 16, color: "rgba(245,240,232,0.55)", lineHeight: 1.8, marginBottom: 8, maxWidth: 520, margin: "0 auto 8px" }}>
            Join the first 500 members of The Pull and lock in{" "}
            <span style={{ color: "rgba(201,168,76,0.9)", fontWeight: 700 }}>Pull at $19.99/month</span>
            {" "}for as long as you remain subscribed.
          </p>
          <p style={{ fontSize: 13, color: "rgba(245,240,232,0.28)", lineHeight: 1.6, marginBottom: 40 }}>
            Regular price: $24.99/month · Founding Members also receive 7-day early access to Living Mastery when it launches.
          </p>

          {/* Scarcity pill + bar */}
          <div style={{ maxWidth: 420, margin: "0 auto 40px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: "rgba(245,240,232,0.35)" }}>Spots claimed</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(201,168,76,0.75)" }}>347 / 500</span>
            </div>
            {/* Progress bar */}
            <div style={{ height: 6, borderRadius: 99, background: "rgba(245,240,232,0.07)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: "69.4%", borderRadius: 99, background: "linear-gradient(90deg,rgba(201,168,76,0.6) 0%,rgba(201,168,76,0.9) 100%)" }} />
            </div>
            <p style={{ fontSize: 10, color: "rgba(245,240,232,0.22)", marginTop: 8, textAlign: "center" as const }}>153 founding memberships remaining</p>
          </div>

          {/* CTA button */}
          <button style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "17px 40px", borderRadius: 99,
            background: "linear-gradient(135deg,#c9a84c 0%,#e2c36a 50%,#c9a84c 100%)",
            backgroundSize: "200% 100%",
            border: "none", cursor: "pointer",
            fontSize: 15, fontWeight: 800, color: "#1a0a10",
            letterSpacing: "0.01em",
            boxShadow: "0 8px 40px rgba(201,168,76,0.35), 0 2px 0 rgba(255,255,255,0.15) inset",
          }}>
            <HugeiconsIcon icon={AiSparklesIcon} size={16} />
            Claim Founding Membership
          </button>

          {/* Lock line */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 16 }}>
            <HugeiconsIcon icon={LockIcon} size={11} style={{ color: "rgba(245,240,232,0.25)" }} />
            <span style={{ fontSize: 11, color: "rgba(245,240,232,0.28)", fontStyle: "italic" }}>$19.99/month · Founding Rate locked while continuously subscribed</span>
          </div>
        </div>
      </motion.div>

      {/* Thin divider */}
      <div style={{ height: 1, background: "rgba(15,10,20,0.06)" }} />

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

      {/* TRUST */}
      <motion.div {...f(0.3)} style={{ textAlign: "center", marginTop: 24 }}>
        <p style={{ fontSize: 12, color: T3 }}>Cancel any time · Founding 500 price locked forever · No surprise charges</p>
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
