"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const W = "#3d0e1a";   // wine
const G = "#c9a84c";   // gold
const CR = "#f5f0e8";  // cream
const DK = "#0f0a14";  // dark
const MID = "#6b7280";

/* ── FAQ data ── */
const FAQS = [
  { q: "What does ThePull actually do for me?", a: "It shows you every pattern, tendency, and blind spot you have — who you really are, why you react the way you do, and what's shaping your relationships. It learns from everything you share and warns you before a pattern becomes a problem." },
  { q: "What is the Pull Score?", a: "Your Pull Score is a composite intelligence rating built from your emotional depth, communication style, self-awareness, and relationship patterns. It updates every time you journal or run a reality check." },
  { q: "Do I have to complete the assessment at once?", a: "No. You can pause and return to your onboarding assessment at any time. Your answers are saved automatically as you go." },
  { q: "What happens when my score changes?", a: "Your archetype and all dimension scores update in real time. You'll see a shift in your profile and receive an AI insight explaining what changed and why." },
  { q: "How is ThePull different from a personality test?", a: "Personality tests give a one-time snapshot. ThePull is a living model — it evolves from your daily entries, coach conversations, and real life moments you choose to share." },
  { q: "Is my data safe?", a: "Yes. Your data is encrypted, never sold, and only ever used to build your personal intelligence profile. You can delete everything at any time." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      {FAQS.map((f, i) => (
        <div key={i} style={{ borderBottom: "1px solid rgba(15,10,20,0.1)" }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", background: "none", border: "none", cursor: "pointer", gap: 24, textAlign: "left" }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: DK, lineHeight: 1.4 }}>{f.q}</span>
            <span style={{ color: MID, fontSize: 18, flexShrink: 0, lineHeight: 1, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>∨</span>
          </button>
          {open === i && <p style={{ fontSize: 14, color: MID, lineHeight: 1.8, paddingBottom: 22, marginTop: -6 }}>{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

/* ── How it works stepper ── */
const STEPS = [
  { label: "Create an account" },
  { label: "Complete your assessment", active: true },
  { label: "Get your Pull Score" },
  { label: "Grow your intelligence" },
];
const STEP_DETAIL = [
  "Sign up with email or Google — no credit card needed.",
  "Answer a short set of questions about your life, relationships, and patterns. Takes about 5 minutes.",
  "Your Pull Score and primary archetype are generated instantly from your data.",
  "Journal daily moments, run reality checks, and talk to your AI coach. Your profile keeps evolving.",
];

function HowItWorks() {
  const [active, setActive] = useState(1);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 40, alignItems: "stretch" }}>
      {/* stepper */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 0, paddingTop: 8 }}>
        {STEPS.map((s, i) => (
          <div key={i} onClick={() => setActive(i)} style={{ display: "flex", gap: 14, cursor: "pointer", paddingBottom: 32, position: "relative" }}>
            {i < STEPS.length - 1 && (
              <div style={{ position: "absolute", left: 7, top: 20, bottom: 0, width: 1, background: i < active ? G : "rgba(255,255,255,0.12)" }} />
            )}
            <div style={{ width: 15, height: 15, borderRadius: "50%", flexShrink: 0, marginTop: 3, border: `2px solid ${i === active ? G : "rgba(255,255,255,0.2)"}`, background: i === active ? G : "transparent" }} />
            <p style={{ fontSize: 14, fontWeight: i === active ? 700 : 400, color: i === active ? "#fff" : "rgba(255,255,255,0.4)", lineHeight: 1.3 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* card */}
      <div style={{ borderRadius: 20, overflow: "hidden", background: "#1a0d14", border: "1px solid rgba(255,255,255,0.08)", padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flex: 1 }}>
          {/* left: logo photo */}
          <div style={{ borderRadius: 14, overflow: "hidden", position: "relative", minHeight: 220 }}>
            <Image src="/logo.jpg" alt="ThePull" fill style={{ objectFit: "cover", opacity: 0.8 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(10,5,12,0.7) 100%)" }} />
          </div>
          {/* right: step detail card */}
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "20px 18px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: G }}>{STEPS[active].label}</span>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginTop: 10 }}>{STEP_DETAIL[active]}</p>
            </div>
            <div style={{ marginTop: 20 }}>
              {["Your data", "Your patterns", "Your growth"].map((t, i) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: i <= active ? G : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {i <= active && <span style={{ fontSize: 9, color: DK, fontWeight: 900 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 12, color: i <= active ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.25)" }}>{t}</span>
                </div>
              ))}
            </div>
            <Link href="/register" style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 99, background: G, color: DK, fontSize: 12, fontWeight: 700, textDecoration: "none", alignSelf: "flex-start" }}>
              Get started →
            </Link>
          </div>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", textAlign: "center" }}>
          Complete the assessment to generate your intelligence profile and unlock your Pull Score.
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN LANDING PAGE
══════════════════════════════════════ */
export default function LandingPage() {
  return (
    <div style={{ fontFamily: "Aeonik, system-ui, sans-serif", background: "#fff", color: DK, overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(15,10,20,0.07)", height: 60, display: "flex", alignItems: "center", padding: "0 48px", gap: 40 }}>
        <Link href="/landing" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginRight: "auto" }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: W, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: G, fontWeight: 900, fontSize: 13, lineHeight: 1 }}>P</span>
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, color: DK, letterSpacing: "-0.02em" }}>ThePull</span>
        </Link>
        <div className="nav-links" style={{ display: "flex", gap: 28 }}>
          {["Features", "How it works", "FAQ"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} style={{ fontSize: 13, color: MID, textDecoration: "none", fontWeight: 500 }}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
          <Link href="/login" style={{ fontSize: 13, fontWeight: 600, color: DK, textDecoration: "none", padding: "7px 16px" }}>Sign in</Link>
          <Link href="/register" style={{ fontSize: 13, fontWeight: 700, color: "#fff", background: W, padding: "8px 20px", borderRadius: 99, textDecoration: "none" }}>Get started</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: "88px 48px 72px", background: "linear-gradient(180deg, #fdfaf6 0%, #fff 100%)", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, background: "rgba(61,14,26,0.07)", border: "1px solid rgba(61,14,26,0.14)", marginBottom: 28 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: W }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: W, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>Personal Intelligence Platform</span>
        </div>
        <h1 style={{ fontSize: "clamp(44px, 6.5vw, 80px)", fontWeight: 800, color: DK, lineHeight: 1.04, letterSpacing: "-0.03em", marginBottom: 20 }}>
          Know yourself<br />at a deeper level.
        </h1>
        <p style={{ fontSize: 17, color: MID, maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.75 }}>
          ThePull maps your emotional patterns, personality, and behavioural tendencies into a living intelligence profile that grows with you.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 30px", borderRadius: 99, background: W, color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 6px 24px rgba(61,14,26,0.25)" }}>
            Start for free →
          </Link>
          <a href="#how-it-works" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 30px", borderRadius: 99, border: "1.5px solid rgba(15,10,20,0.14)", color: DK, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            See how it works
          </a>
        </div>

        {/* App screenshot mockup */}
        <div style={{ maxWidth: 900, margin: "64px auto 0" }}>
          <div style={{ borderRadius: 24, overflow: "hidden", background: "linear-gradient(135deg, #1a0a10 0%, #2d0e1a 50%, #0f0a14 100%)", padding: "0 32px", boxShadow: "0 40px 100px rgba(61,14,26,0.25), 0 0 0 1px rgba(61,14,26,0.15)" }}>
            {/* browser bar */}
            <div style={{ padding: "18px 0 14px", display: "flex", alignItems: "center", gap: 7, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["#f87171","#fbbf24","#34d399"].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.7 }} />)}
              <div style={{ flex: 1, height: 22, borderRadius: 6, background: "rgba(255,255,255,0.05)", marginLeft: 10 }} />
            </div>
            {/* content row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, padding: "24px 0 0" }}>
              {/* Score */}
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 20 }}>
                <p style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.18em", textTransform: "uppercase" as const, marginBottom: 10 }}>Pull Score</p>
                <p style={{ fontSize: 52, fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-0.04em" }}>78</p>
                <p style={{ fontSize: 11, color: G, marginTop: 8, fontWeight: 600 }}>↑ +6 this month</p>
                <div style={{ marginTop: 16, display: "flex", gap: 4, alignItems: "flex-end", height: 36 }}>
                  {[40,55,48,62,55,70,72,78].map((h, i) => (
                    <div key={i} style={{ flex: 1, borderRadius: "3px 3px 0 0", background: i === 7 ? G : "rgba(255,255,255,0.1)", height: `${(h/80)*100}%` }} />
                  ))}
                </div>
              </div>
              {/* Archetype */}
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 20 }}>
                <p style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.18em", textTransform: "uppercase" as const, marginBottom: 10 }}>Archetype</p>
                <div style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 99, background: "rgba(192,64,79,0.15)", border: "1px solid rgba(192,64,79,0.25)", marginBottom: 8 }}>
                  <span style={{ fontSize: 9, color: "#c0404f", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Emerging Identity</span>
                </div>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>The Quiet Strategist</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>Confidence 84%</p>
                <div style={{ marginTop: 10, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.08)" }}>
                  <div style={{ height: "100%", width: "84%", borderRadius: 99, background: "#c0404f" }} />
                </div>
              </div>
              {/* Insight */}
              <div style={{ background: `rgba(201,168,76,0.1)`, borderRadius: 14, padding: 20, border: "1px solid rgba(201,168,76,0.18)" }}>
                <p style={{ fontSize: 9, color: "rgba(201,168,76,0.6)", letterSpacing: "0.18em", textTransform: "uppercase" as const, marginBottom: 10 }}>Today's Insight</p>
                <p style={{ fontSize: 13, color: "#fff", lineHeight: 1.65 }}>Your analytical nature is your greatest asset in moments of uncertainty. Trust it more.</p>
                <div style={{ marginTop: 16, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["Self-Awareness","Analytical"].map(t => (
                    <span key={t} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 99, background: "rgba(201,168,76,0.12)", color: G, fontWeight: 600, border: "1px solid rgba(201,168,76,0.2)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* bottom bar chart strip */}
            <div style={{ display: "flex", gap: 8, padding: "16px 0 0", alignItems: "flex-end", height: 64 }}>
              {[42,55,50,68,60,74,70,78,65,78].map((h, i) => (
                <div key={i} style={{ flex: 1, borderRadius: "3px 3px 0 0", background: i === 9 ? `rgba(61,14,26,0.8)` : "rgba(255,255,255,0.07)", height: `${(h/80)*100}%` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION — 3 CARDS ── */}
      <section style={{ padding: "88px 48px", background: "#fff" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: "rgba(61,14,26,0.07)", marginBottom: 18 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: W }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: W, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>Solution</span>
            </div>
            <h2 style={{ fontSize: "clamp(32px, 4.5vw, 54px)", fontWeight: 800, color: DK, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 14 }}>
              One app that puts<br />you back in charge
            </h2>
            <p style={{ fontSize: 15, color: MID, maxWidth: 440, margin: "0 auto", lineHeight: 1.75 }}>
              Manage every insight, pattern, and moment effortlessly in one place, keeping your self-awareness organised and growing.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.08fr 1fr", gap: 14, alignItems: "start" }}>
            {/* Card 1 — Track */}
            <div style={{ borderRadius: 20, border: "1px solid rgba(15,10,20,0.09)", padding: "26px 22px", background: CR }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(61,14,26,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 14 }}>📊</span>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, marginBottom: 8, letterSpacing: "-0.01em" }}>Track your patterns</h3>
              <p style={{ fontSize: 13, color: MID, lineHeight: 1.7, marginBottom: 20 }}>Get a clear view of your recurring emotional patterns and how they add up, all in one place.</p>
              {/* mini mockup */}
              <div style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", border: "1px solid rgba(15,10,20,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: W }} />
                  <span style={{ fontSize: 11, color: MID, fontWeight: 500 }}>Total Patterns ⓘ</span>
                </div>
                <p style={{ fontSize: 28, fontWeight: 800, color: DK, letterSpacing: "-0.03em" }}>14 <span style={{ fontSize: 13, fontWeight: 600, color: "#34d399" }}>↑ 12% last month</span></p>
                <div style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[W, "#60a5fa", "#f59e0b"].map((c, i) => (
                    <div key={i} style={{ width: 22, height: 22, borderRadius: "50%", background: c, border: "2px solid #fff", marginLeft: i > 0 ? -8 : 0 }} />
                  ))}
                  <span style={{ fontSize: 11, color: MID, marginLeft: 4 }}>+11 patterns</span>
                </div>
              </div>
            </div>

            {/* Card 2 — Featured: Reality Check */}
            <div style={{ borderRadius: 20, background: `linear-gradient(150deg, ${W} 0%, #6b1c2b 60%, #3d0e1a 100%)`, padding: "26px 22px", boxShadow: "0 20px 60px rgba(61,14,26,0.3)", transform: "translateY(-10px)" }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 14 }}>⚡</span>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.01em" }}>Reality Check when you need to</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 20 }}>Run a reality check on any situation directly from ThePull and pick back up when you're ready.</p>
              {/* floating card */}
              <div style={{ background: "rgba(255,255,255,0.09)", borderRadius: 14, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: G, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 12, color: DK, fontWeight: 900 }}>P</span>
                    </div>
                    <span style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>Ask The Pull</span>
                  </div>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Just now</span>
                </div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Your reaction here is rooted in fear, not the actual situation. Here's what's really happening…</p>
                <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
                  <button style={{ fontSize: 11, padding: "6px 12px", borderRadius: 99, background: G, color: DK, border: "none", cursor: "pointer", fontWeight: 700 }}>Go deeper →</button>
                  <button style={{ fontSize: 11, padding: "6px 12px", borderRadius: 99, background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer" }}>Dismiss</button>
                </div>
              </div>
            </div>

            {/* Card 3 — Intelligence */}
            <div style={{ borderRadius: 20, border: "1px solid rgba(15,10,20,0.09)", padding: "26px 22px", background: CR }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(61,14,26,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 14 }}>🧠</span>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, marginBottom: 8, letterSpacing: "-0.01em" }}>Know what's shaping you</h3>
              <p style={{ fontSize: 13, color: MID, lineHeight: 1.7, marginBottom: 20 }}>See upcoming intelligence shifts ahead of time, so patterns don't catch you off guard.</p>
              {/* calendar/scores mockup */}
              <div style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", border: "1px solid rgba(15,10,20,0.07)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 11, color: MID }}>← Sep 2026</span>
                  <span style={{ fontSize: 11, color: MID }}>→</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, textAlign: "center" }}>
                  {["M","T","W","T","F","S","S"].map((d, i) => <span key={i} style={{ fontSize: 9, color: MID, fontWeight: 600 }}>{d}</span>)}
                  {[...Array(30)].map((_, i) => (
                    <div key={i} style={{ fontSize: 10, color: i === 0 ? "#fff" : MID, fontWeight: i === 0 ? 700 : 400, width: 20, height: 20, borderRadius: "50%", background: i === 0 ? W : i === 14 || i === 21 ? "rgba(201,168,76,0.2)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES 2×2 ── */}
      <section id="features" style={{ padding: "88px 48px", background: "#faf7f2" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: "rgba(61,14,26,0.07)", marginBottom: 18 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: W }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: W, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>Features</span>
            </div>
            <h2 style={{ fontSize: "clamp(32px, 4.5vw, 54px)", fontWeight: 800, color: DK, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 14 }}>
              Everything you need to<br />understand yourself
            </h2>
            <p style={{ fontSize: 15, color: MID, maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
              ThePull handles the deep analysis behind the scenes, giving you the tools to detect, prepare for, understand, and reshape your recurring patterns.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {/* F1 — Journal */}
            <div style={{ borderRadius: 20, background: CR, border: "1px solid rgba(15,10,20,0.08)", padding: "26px 26px 0", overflow: "hidden" }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, marginBottom: 6 }}>Journal Intelligence</h3>
              <p style={{ fontSize: 13, color: MID, lineHeight: 1.7, marginBottom: 22 }}>Keep a journal of your real moments. ThePull extracts the emotional signals behind every entry and feeds them into your profile.</p>
              {/* chat mockup */}
              <div style={{ background: "#fff", borderRadius: "14px 14px 0 0", padding: "18px 16px 0", border: "1px solid rgba(15,10,20,0.07)", borderBottom: "none" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: W, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: G, fontSize: 11, fontWeight: 900 }}>P</span>
                  </div>
                  <div style={{ background: "#f5f0e8", borderRadius: "0 12px 12px 12px", padding: "9px 13px", fontSize: 12, color: DK, lineHeight: 1.55, flex: 1 }}>
                    I noticed a boundary-pushing pattern in your last 3 entries. Want me to break it down?
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                  <div style={{ background: W, borderRadius: "12px 0 12px 12px", padding: "9px 13px", fontSize: 12, color: "#fff", lineHeight: 1.55, maxWidth: "75%" }}>
                    Yes, show me what's driving it.
                  </div>
                </div>
              </div>
            </div>

            {/* F2 — Coach */}
            <div style={{ borderRadius: 20, background: CR, border: "1px solid rgba(15,10,20,0.08)", padding: "26px 26px 0", overflow: "hidden" }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, marginBottom: 6 }}>AI Coach — Ask The Pull</h3>
              <p style={{ fontSize: 13, color: MID, lineHeight: 1.7, marginBottom: 22 }}>Have real conversations with an AI that knows your full intelligence profile. Get honest, contextual guidance — not generic advice.</p>
              {/* frozen-style mockup */}
              <div style={{ background: "#fff", borderRadius: "14px 14px 0 0", padding: "18px 16px 0", border: "1px solid rgba(15,10,20,0.07)", borderBottom: "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 11, color: MID, fontWeight: 600 }}>Coach session</span>
                  <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 99, background: "rgba(52,211,153,0.12)", color: "#34d399", fontWeight: 700 }}>Active</span>
                </div>
                {[
                  { label: "Sessions used", val: "3 / 5", pct: 60 },
                  { label: "Insights generated", val: "12", pct: 80 },
                  { label: "Profile depth", val: "74%", pct: 74 },
                ].map(r => (
                  <div key={r.label} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: MID }}>{r.label}</span>
                      <span style={{ fontSize: 11, color: DK, fontWeight: 700 }}>{r.val}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 99, background: "rgba(15,10,20,0.07)" }}>
                      <div style={{ height: "100%", width: `${r.pct}%`, borderRadius: 99, background: W }} />
                    </div>
                  </div>
                ))}
                <div style={{ height: 18 }} />
              </div>
            </div>

            {/* F3 — Pull Score */}
            <div style={{ borderRadius: 20, background: CR, border: "1px solid rgba(15,10,20,0.08)", padding: "26px 26px 0", overflow: "hidden" }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, marginBottom: 6 }}>Pull Score Analytics</h3>
              <p style={{ fontSize: 13, color: MID, lineHeight: 1.7, marginBottom: 22 }}>See how your scores add up across dimensions and categories, giving you a clearer view of your recurring intelligence trends.</p>
              <div style={{ background: "#fff", borderRadius: "14px 14px 0 0", padding: "18px 16px 0", border: "1px solid rgba(15,10,20,0.07)", borderBottom: "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                  <span style={{ fontSize: 11, color: MID }}>Score breakdown</span>
                  <span style={{ fontSize: 24, fontWeight: 800, color: DK, letterSpacing: "-0.02em" }}>$1,655 <span style={{ fontSize: 11, color: "#34d399", fontWeight: 600 }}>↑ 10%</span></span>
                </div>
                {/* mini donut chart sim */}
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: `conic-gradient(${W} 0% 42%, #60a5fa 42% 65%, #f59e0b 65% 82%, ${G} 82% 100%)`, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    {[["Emotional IQ", W, "42%"],["Communication","#60a5fa","23%"],["Self-Aware","#f59e0b","17%"],["Relational",G,"18%"]].map(([l,c,p]) => (
                      <div key={l as string} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: c as string, flexShrink: 0 }} />
                        <span style={{ fontSize: 10, color: MID, flex: 1 }}>{l}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: DK }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ height: 20 }} />
              </div>
            </div>

            {/* F4 — Dark photo card */}
            <div style={{ borderRadius: 20, overflow: "hidden", position: "relative", minHeight: 360 }}>
              <Image src="/logo.jpg" alt="ThePull" fill style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(15,10,20,0.55) 0%, rgba(61,14,26,0.9) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, padding: "26px 26px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.3)", marginBottom: 16 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: G }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>Auto Detection</span>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: 10 }}>Automatically identifies recurring patterns before they become invisible habits</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>ThePull detects your behavioural signals across journal entries and surfaces them before they become fixed.</p>
                </div>
                <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 99, background: G, color: DK, fontSize: 13, fontWeight: 700, textDecoration: "none", alignSelf: "flex-start" }}>
                  Get Started →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — DARK ── */}
      <section id="how-it-works" style={{ padding: "88px 48px", background: "#fff" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ borderRadius: 24, background: DK, padding: "52px 48px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.25)", marginBottom: 22 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: G }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>How it works</span>
                </div>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: 12 }}>
                  See how it all<br />comes together
                </h2>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: 40 }}>
                  A smarter way to build self-awareness and keep your personal intelligence growing continuously.
                </p>
                <HowItWorks />
              </div>
              {/* right: big photo */}
              <div style={{ borderRadius: 18, overflow: "hidden", position: "relative", minHeight: 420 }}>
                <Image src="/logo.jpg" alt="ThePull" fill style={{ objectFit: "cover", opacity: 0.7 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(10,5,12,0.85) 100%)" }} />
                <div style={{ position: "absolute", bottom: 24, left: 20, right: 20 }}>
                  <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "16px 18px" }}>
                    <p style={{ fontSize: 11, color: G, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 6 }}>Complete your assessment</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {["Name, birth date and background", "Key relationships and patterns", "Current emotional challenges"].map((t, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid rgba(201,168,76,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {i < 2 && <span style={{ fontSize: 9, color: G }}>✓</span>}
                          </div>
                          <span style={{ fontSize: 12, color: i < 2 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)" }}>{t}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, padding: "9px 18px", borderRadius: 99, background: G, color: DK, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                      Get started →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PULL PROFILE — centre phone ── */}
      <section style={{ padding: "0 48px 88px", background: "#fff" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderRadius: 24, overflow: "hidden", border: "1px solid rgba(15,10,20,0.08)" }}>
            {/* left */}
            <div style={{ padding: "52px 48px", background: CR, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: "rgba(61,14,26,0.08)", marginBottom: 20, alignSelf: "flex-start" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: W }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: W, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>Pull Profile</span>
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: DK, letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: 14 }}>
                One profile for every dimension of you
              </h2>
              <p style={{ fontSize: 14, color: MID, lineHeight: 1.8, marginBottom: 32 }}>
                Use a dedicated profile for your intelligence, keeping every dimension visible, separate, and easier to track.
              </p>
              <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", borderRadius: 99, background: W, color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none", alignSelf: "flex-start", boxShadow: "0 6px 20px rgba(61,14,26,0.22)" }}>
                Get your Pull Profile →
              </Link>
            </div>
            {/* right — mock phone */}
            <div style={{ background: "linear-gradient(135deg, #1a0a10, #3d0e1a)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px", position: "relative", overflow: "hidden" }}>
              {/* floating spend-limit style cards */}
              <div style={{ width: "100%", maxWidth: 260, display: "flex", flexDirection: "column", gap: 10 }}>
                {/* main card */}
                <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 18, padding: "20px 20px", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <p style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: "0.16em", textTransform: "uppercase" as const, marginBottom: 6 }}>Pull Score</p>
                  <p style={{ fontSize: 44, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>78</p>
                  <div style={{ display: "flex", gap: 10, marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <span style={{ fontSize: 10, color: G, fontWeight: 700 }}>↑ +6 pts</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>this month</span>
                  </div>
                </div>
                {/* spend limit equivalent */}
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Intelligence Depth</span>
                    <span style={{ fontSize: 11, color: "#fff", fontWeight: 700 }}>74% used</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 99, background: "rgba(255,255,255,0.07)" }}>
                    <div style={{ height: "100%", width: "74%", borderRadius: 99, background: `linear-gradient(90deg, ${W}, ${G})` }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>$0</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>$100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: "88px 48px", background: "#faf7f2" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: "rgba(61,14,26,0.07)", marginBottom: 18 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: W }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: W, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>FAQ</span>
            </div>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, color: DK, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 8 }}>
              Questions you&apos;re<br />probably having
            </h2>
            <p style={{ fontSize: 14, color: MID, marginTop: 10 }}>Everything you need to know about ThePull</p>
          </div>
          <FAQ />
        </div>
      </section>

      {/* ── FINAL CTA — photo banner ── */}
      <section style={{ padding: "0 48px 88px", background: "#faf7f2" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ borderRadius: 24, overflow: "hidden", position: "relative", minHeight: 360, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <Image src="/logo.jpg" alt="" fill style={{ objectFit: "cover", opacity: 0.25 }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(120deg, rgba(245,240,232,0.97) 0%, rgba(245,240,232,0.92) 50%, rgba(245,240,232,0.6) 100%)` }} />
            {/* left text */}
            <div style={{ position: "relative", padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800, color: DK, letterSpacing: "-0.025em", lineHeight: 1.12, marginBottom: 14 }}>
                Know yourself<br />at a deeper level.
              </h2>
              <p style={{ fontSize: 14, color: MID, lineHeight: 1.8, marginBottom: 32, maxWidth: 340 }}>
                Switch to ThePull and unlock deeper self-awareness, smarter pattern tracking, and total clarity.
              </p>
              <div>
                <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 99, background: W, color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 6px 20px rgba(61,14,26,0.25)" }}>
                  Download the App →
                </Link>
              </div>
            </div>
            {/* right — floating app cards */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 260 }}>
                <div style={{ background: "#fff", borderRadius: 16, padding: "16px 18px", boxShadow: "0 8px 32px rgba(15,10,20,0.12)", border: "1px solid rgba(15,10,20,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: DK }}>Recent Activity</span>
                    <span style={{ fontSize: 10, color: MID }}>Today</span>
                  </div>
                  {[["Journal entry added","#34d399"],["Reality check complete","#60a5fa"],["Pull Score updated ↑6",G]].map(([l,c]) => (
                    <div key={l as string} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderTop: "1px solid rgba(15,10,20,0.05)" }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: c as string, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: MID }}>{l}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#fff", borderRadius: 16, padding: "14px 18px", boxShadow: "0 8px 32px rgba(15,10,20,0.1)", border: "1px solid rgba(15,10,20,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: DK }}>New pattern found</span>
                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: "rgba(192,64,79,0.1)", color: "#c0404f", fontWeight: 700 }}>Review</span>
                  </div>
                  <p style={{ fontSize: 12, color: MID }}>Avoidant communication · 4 entries this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: DK, padding: "56px 48px 0" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 32, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: W, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: G, fontWeight: 900, fontSize: 12 }}>P</span>
                </div>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>ThePull</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", lineHeight: 1.75, maxWidth: 200 }}>Your personal intelligence, finally under control.</p>
            </div>
            {[
              { title: "Product", links: ["Features","Pull Profile","AI Coach","Journal","Pricing"] },
              { title: "Company", links: ["About us","Careers","News","Contact"] },
              { title: "Resources", links: ["Docs","Blog","Changelog","Support"] },
              { title: "Social", links: ["X.com","LinkedIn","Instagram","Facebook"] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>{col.title}</p>
                {col.links.map(l => <p key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 10, cursor: "pointer" }}>{l}</p>)}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0" }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© ThePull 2026</p>
            <div style={{ display: "flex", gap: 20 }}>
              <Link href="/terms" style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textDecoration: "none" }}>Terms</Link>
              <Link href="/privacy" style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textDecoration: "none" }}>Privacy</Link>
            </div>
          </div>
        </div>
        <p style={{ fontSize: "clamp(60px, 12vw, 140px)", fontWeight: 900, color: "rgba(255,255,255,0.03)", textAlign: "center", letterSpacing: "-0.04em", lineHeight: 0.9, marginTop: 8, paddingBottom: 0, userSelect: "none" }}>
          ThePull
        </p>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          section, footer { padding-left: 20px !important; padding-right: 20px !important; }
          [style*="gridTemplateColumns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: 240px 1fr"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: 2fr 1fr 1fr 1fr 1fr"] { grid-template-columns: 1fr 1fr !important; }
          [style*="gridTemplateColumns: 1fr 1.08fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="transform: translateY(-10px)"] { transform: none !important; }
        }
      `}</style>
    </div>
  );
}
