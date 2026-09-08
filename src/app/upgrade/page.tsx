"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle01Icon, AiSparklesIcon, AiBrain01Icon,
  HeartIcon, Message02Icon, Analytics01Icon, ShieldIcon,
  ArrowRight01Icon, Target01Icon, FlashIcon, FavouriteIcon,
  Activity01Icon, LockIcon,
} from "@hugeicons/core-free-icons";

const WINE  = "#3d0e1a";
const WINE2 = "#c0404f";
const GOLD  = "#c9a84c";
const CREAM = "#f5f0e8";

const f = (d = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay: d, ease: "easeOut" as const },
});

const CHECK_COLOR = "rgba(201,168,76,0.75)";

const FREE_FEATURES = [
  "Your Pull Score",
  "Your Pull Archetype",
  "Foundational intelligence across every dimension",
  "The evidence behind what The Pull sees in you",
  "Early Living Intelligence — emerging patterns as they form",
  "Ask The Pull — 5 conversations per month",
  "A living profile that begins to grow with you",
];

const PREMIUM_FEATURES = [
  "Everything in LEARN ME",
  "Deeper Intelligence Access",
  "Full Living Intelligence History",
  "Advanced Change Tracking",
  "Outcomes & Impact Insights",
  "Ask The Pull (Unlimited)",
  "Reality Check",
  "Priority Processing",
  "Early Access to New Insights",
];

const TESTIMONIALS = [
  { name: "Zara M.", role: "Executive Coach", quote: "I've done every personality test out there. The Pull is the first one that actually evolves as I do." },
  { name: "Kwame A.", role: "Entrepreneur", quote: "The deeper dimensions unlocked something I couldn't name. My relationship with conflict is completely different now." },
  { name: "Sofia L.", role: "Therapist", quote: "I recommend it to clients who want a living mirror, not a static snapshot." },
];

function CheckItem({ label, dim = false }: { label: string; dim?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
      <HugeiconsIcon icon={CheckmarkCircle01Icon} size={15} style={{ color: dim ? "rgba(245,240,232,0.25)" : CHECK_COLOR, flexShrink: 0, marginTop: 1 }} />
      <span style={{ fontSize: 14, color: dim ? "rgba(245,240,232,0.35)" : "rgba(245,240,232,0.75)", lineHeight: 1.55 }}>{label}</span>
    </div>
  );
}

export default function UpgradePage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div style={{ background: "#0c0a10", minHeight: "100vh", marginTop: -20 }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", overflow: "hidden", padding: "80px 24px 56px", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", left: "25%", width: "50%", height: "70%", background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 65%)" }} />
        </div>
        <motion.div {...f(0)} style={{ position: "relative", zIndex: 2, maxWidth: 560, margin: "0 auto" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,168,76,0.55)", fontWeight: 700, marginBottom: 20 }}>Upgrade</p>
          <h1 style={{ fontSize: 56, fontWeight: 800, color: CREAM, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: 18 }}>
            Know yourself<br /><span style={{ color: GOLD }}>completely.</span>
          </h1>
          <p style={{ fontSize: 16, color: "rgba(245,240,232,0.42)", lineHeight: 1.7 }}>
            Your free profile is a foundation. Premium unlocks the full picture — deeper dimensions, living reports, and intelligence that grows with you.
          </p>
        </motion.div>
      </div>

      {/* ── PLAN CARDS ── */}
      <div style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>

          {/* LEARN ME — Free */}
          <motion.div {...f(0.1)} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(245,240,232,0.08)",
            borderRadius: 24, padding: "36px 32px 32px",
            display: "flex", flexDirection: "column", gap: 0,
          }}>
            <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", fontWeight: 700, marginBottom: 10 }}>Learn Me</p>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: CREAM, marginBottom: 6, letterSpacing: "-0.02em" }}>LEARN ME</h2>
            <p style={{ fontSize: 14, color: GOLD, fontStyle: "italic", marginBottom: 2 }}>Start understanding yourself.</p>
            <p style={{ fontSize: 13, color: "rgba(245,240,232,0.35)", fontStyle: "italic", marginBottom: 28 }}>The Pull starts learning you.</p>

            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 64, fontWeight: 800, color: CREAM, lineHeight: 1, letterSpacing: "-0.04em" }}>$0</span>
              <span style={{ fontSize: 16, color: "rgba(245,240,232,0.38)", marginLeft: 8 }}>/ Free</span>
            </div>

            <p style={{ fontSize: 13, color: "rgba(245,240,232,0.45)", lineHeight: 1.7, marginBottom: 28 }}>
              The Pull gives you a foundational understanding of who you are — your Pull Score, your archetype, and the first patterns The Pull begins to notice. It is genuinely useful on its own, and it grows as you do.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
              {FREE_FEATURES.map(f => <CheckItem key={f} label={f} />)}
            </div>

            <p style={{ fontSize: 12, fontStyle: "italic", color: "rgba(245,240,232,0.25)", marginBottom: 20, textAlign: "center" }}>Your foundation.</p>

            <button style={{ width: "100%", padding: "15px", borderRadius: 14, background: "rgba(245,240,232,0.06)", border: "1px solid rgba(245,240,232,0.1)", color: GOLD, fontSize: 14, fontWeight: 700, cursor: "default", letterSpacing: "0.02em" }}>
              Current Plan
            </button>
          </motion.div>

          {/* UNDERSTAND ME — right column with toggle */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

            {/* Toggle */}
            <motion.div {...f(0.14)} style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {(["monthly", "annual"] as const).map(b => (
                <button key={b} onClick={() => setBilling(b)} style={{
                  flex: 1, padding: "10px", borderRadius: 12,
                  background: billing === b ? "rgba(201,168,76,0.12)" : "rgba(245,240,232,0.04)",
                  border: billing === b ? "1px solid rgba(201,168,76,0.3)" : "1px solid rgba(245,240,232,0.07)",
                  color: billing === b ? GOLD : "rgba(245,240,232,0.35)",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase" as const,
                }}>
                  {b === "monthly" ? "Monthly" : "Annual · Best Value"}
                </button>
              ))}
            </motion.div>

            {/* UNDERSTAND ME card */}
            <motion.div {...f(0.18)} style={{
              background: "linear-gradient(145deg,#1a100a 0%,#241408 50%,#1a100a 100%)",
              border: "1px solid rgba(201,168,76,0.22)",
              borderRadius: 24, padding: "36px 32px 32px",
              position: "relative", overflow: "hidden",
            }}>
              {/* Most Chosen / Best Long-Term Value badge */}
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: billing === "monthly" ? "rgba(245,240,232,0.12)" : "#1a6b4a", borderRadius: "0 0 14px 14px", padding: "5px 20px" }}>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.18em", color: billing === "monthly" ? CREAM : "#fff" }}>
                  {billing === "monthly" ? "MOST CHOSEN" : "BEST LONG-TERM VALUE"}
                </span>
              </div>

              <div style={{ marginTop: 16 }}>
                <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,168,76,0.55)", fontWeight: 700, marginBottom: 10 }}>
                  {billing === "monthly" ? "$24.99/MONTH" : "$249.99/YEAR"}
                </p>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: CREAM, marginBottom: 6, letterSpacing: "-0.02em" }}>
                  UNDERSTAND ME{billing === "annual" ? " · Annual" : ""}
                </h2>
                <p style={{ fontSize: 14, color: GOLD, fontStyle: "italic", marginBottom: 2 }}>Understand yourself more deeply.</p>
                <p style={{ fontSize: 13, color: "rgba(245,240,232,0.35)", fontStyle: "italic", marginBottom: 24 }}>Your Pull understands you.</p>

                {/* Founding badge (monthly only) */}
                {billing === "monthly" && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 99, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", marginBottom: 22 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: GOLD }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.06em" }}>FOUNDING 500 · $19.99 LOCKED</span>
                  </div>
                )}

                <div style={{ marginBottom: billing === "monthly" ? 8 : 10 }}>
                  <span style={{ fontSize: 60, fontWeight: 800, color: CREAM, lineHeight: 1, letterSpacing: "-0.04em" }}>
                    ${billing === "monthly" ? "24.99" : "249.99"}
                  </span>
                  <span style={{ fontSize: 16, color: "rgba(245,240,232,0.38)", marginLeft: 6 }}>
                    /{billing === "monthly" ? "month" : "year"}
                  </span>
                </div>

                {/* Annual savings pills */}
                {billing === "annual" && (
                  <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" as const }}>
                    <div style={{ padding: "5px 12px", borderRadius: 99, background: "rgba(26,107,74,0.2)", border: "1px solid rgba(26,107,74,0.35)" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#4ade80" }}>$20.83/month billed annually</span>
                    </div>
                    <div style={{ padding: "5px 12px", borderRadius: 99, background: "rgba(26,107,74,0.2)", border: "1px solid rgba(26,107,74,0.35)" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#4ade80" }}>Save $49.89 vs monthly</span>
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28, marginTop: billing === "monthly" ? 20 : 0 }}>
                  {PREMIUM_FEATURES.map(feat => <CheckItem key={feat} label={feat} />)}
                </div>

                <p style={{ fontSize: 12, fontStyle: "italic", color: "rgba(245,240,232,0.28)", marginBottom: 20, textAlign: "center" }}>
                  For people who want The Pull to know them more deeply.
                </p>

                <button style={{
                  width: "100%", padding: "16px", borderRadius: 14,
                  background: `linear-gradient(135deg,${GOLD},rgba(201,168,76,0.8))`,
                  border: "none", color: WINE,
                  fontSize: 14, fontWeight: 800, cursor: "pointer",
                  letterSpacing: "0.04em", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: "0 8px 32px rgba(201,168,76,0.2)",
                }}>
                  <HugeiconsIcon icon={AiSparklesIcon} size={16} />
                  START UNDERSTAND ME{billing === "annual" ? " · ANNUAL" : ""}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(245,240,232,0.05)", padding: "72px 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <motion.div {...f(0.1)} style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.28)", fontWeight: 700, marginBottom: 12 }}>What people say</p>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: CREAM, letterSpacing: "-0.03em" }}>It actually evolves.</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} {...f(0.14 + i * 0.06)} style={{ background: "rgba(245,240,232,0.04)", border: "1px solid rgba(245,240,232,0.07)", borderRadius: 20, padding: "28px 24px" }}>
                <p style={{ fontSize: 14, color: "rgba(245,240,232,0.68)", lineHeight: 1.75, fontStyle: "italic", fontFamily: "Georgia, serif", marginBottom: 22 }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg,${WINE},${WINE2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: CREAM }}>{t.name}</p>
                    <p style={{ fontSize: 11, color: "rgba(245,240,232,0.35)" }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div style={{ borderTop: "1px solid rgba(245,240,232,0.05)", padding: "72px 24px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", left: "30%", width: "40%", height: "80%", background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 65%)" }} />
        </div>
        <motion.div {...f(0.1)} style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: 48, fontWeight: 800, color: CREAM, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 18 }}>
            Your intelligence<br /><span style={{ color: GOLD }}>is waiting.</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(245,240,232,0.38)", lineHeight: 1.7, maxWidth: 420, margin: "0 auto 36px" }}>
            Start with UNDERSTAND ME and let The Pull go deeper with you.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const }}>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "15px 32px", borderRadius: 16, background: `linear-gradient(135deg,${GOLD},rgba(201,168,76,0.8))`, border: "none", color: WINE, fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 32px rgba(201,168,76,0.2)", letterSpacing: "0.03em" }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={15} />
              START UNDERSTAND ME
            </button>
            <Link href="/pull-profile" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "15px 28px", borderRadius: 16, background: "rgba(245,240,232,0.05)", border: "1px solid rgba(245,240,232,0.1)", color: "rgba(245,240,232,0.45)", fontSize: 14, fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>
              View My Profile
            </Link>
          </div>
          <p style={{ fontSize: 11, color: "rgba(245,240,232,0.2)", marginTop: 20 }}>Cancel any time · Founding 500 pricing locked in forever</p>
        </motion.div>
      </div>

    </div>
  );
}
