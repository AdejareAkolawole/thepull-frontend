"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const WINE  = "#3d0e1a";
const GOLD  = "#c9a84c";
const CREAM = "#f5f0e8";
const DARK  = "#0f0a14";
const MID   = "#6b5c52";

/* ─── tiny helpers ─── */
const Tag = ({ children, dark = false }: { children: string; dark?: boolean }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "4px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700,
    background: dark ? "rgba(201,168,76,0.15)" : "rgba(61,14,26,0.08)",
    color: dark ? GOLD : WINE, border: `1px solid ${dark ? "rgba(201,168,76,0.3)" : "rgba(61,14,26,0.18)"}`,
    letterSpacing: "0.06em", textTransform: "uppercase" as const,
  }}>
    <span style={{ width: 5, height: 5, borderRadius: "50%", background: dark ? GOLD : WINE, flexShrink: 0 }} />
    {children}
  </span>
);

const PrimaryBtn = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} style={{
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "13px 28px", borderRadius: 99, background: WINE,
    color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none",
    boxShadow: "0 4px 20px rgba(61,14,26,0.28)",
  }}>
    {children} →
  </Link>
);

const OutlineBtn = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} style={{
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "13px 28px", borderRadius: 99,
    border: `1.5px solid rgba(61,14,26,0.25)`,
    color: DARK, fontSize: 14, fontWeight: 600, textDecoration: "none",
    background: "transparent",
  }}>
    {children}
  </Link>
);

/* ─── FAQ ─── */
const faqs = [
  { q: "What does ThePull actually do for me?", a: "ThePull maps your personality, emotional patterns, and behavioural tendencies into a living intelligence profile — your Pull Score. It evolves the more you share, so the insights keep getting sharper over time." },
  { q: "What is the Pull Score?", a: "Your Pull Score is a composite measure of your personal intelligence across dimensions like emotional depth, communication style, self-awareness, and relationship patterns. It updates every time you add a journal entry or complete a reality check." },
  { q: "Is my data private?", a: "Yes. Your data is encrypted, never sold, and only used to build your personal intelligence profile. You control what you share and can delete your data at any time." },
  { q: "How is this different from a personality test?", a: "Personality tests give a snapshot. ThePull is a living model — it learns from your journal entries, conversations with the AI coach, and real-life moments you choose to share. It gets smarter the longer you use it." },
  { q: "Can I use ThePull for free?", a: "Yes. The free plan gives you access to your Pull Score, your archetype, and limited monthly sessions with the AI coach and reality check. Premium unlocks unlimited sessions and deeper intelligence reports." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {faqs.map((f, i) => (
        <div key={i} style={{ borderBottom: "1px solid rgba(15,10,20,0.09)" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: DARK }}>{f.q}</span>
            <span style={{ fontSize: 20, color: MID, flexShrink: 0, lineHeight: 1, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
          </button>
          {open === i && (
            <p style={{ fontSize: 14, color: MID, lineHeight: 1.75, paddingBottom: 20, marginTop: -4 }}>{f.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── HOW IT WORKS stepper ─── */
const steps = [
  { label: "Create an account", desc: "Sign up free in under a minute — no credit card needed." },
  { label: "Complete your assessment", desc: "Answer a short onboarding questionnaire so ThePull can build your initial intelligence profile.", active: true },
  { label: "Get your Pull Score", desc: "Receive your first Pull Score and archetype — your personalised map of who you are." },
  { label: "Grow your intelligence", desc: "Journal daily moments, run reality checks, and chat with your AI coach to keep your profile evolving." },
];

function HowItWorks() {
  const [active, setActive] = useState(1);
  const descriptions = [
    "Sign up with your email or Google account. No credit card, no friction — just you.",
    "Answer a focused set of questions about your life, relationships, and patterns. Takes about 5 minutes.",
    "Your Pull Score and primary archetype are calculated instantly from your assessment data.",
    "Every journal entry and coach conversation deepens the model. Your intelligence profile is always evolving.",
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
      {/* Left — stepper */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {steps.map((s, i) => (
          <div key={i} onClick={() => setActive(i)} style={{ display: "flex", gap: 16, cursor: "pointer", paddingBottom: 28, position: "relative" }}>
            {/* line */}
            {i < steps.length - 1 && (
              <div style={{ position: "absolute", left: 11, top: 24, width: 2, height: "calc(100% - 8px)", background: i < active ? WINE : "rgba(15,10,20,0.1)" }} />
            )}
            {/* dot */}
            <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, border: `2px solid ${i === active ? WINE : "rgba(15,10,20,0.15)"}`, background: i === active ? WINE : "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {i < active && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>}
            </div>
            <div style={{ paddingTop: 2 }}>
              <p style={{ fontSize: 14, fontWeight: i === active ? 700 : 500, color: i === active ? DARK : MID, marginBottom: 4 }}>{s.label}</p>
              {i === active && <p style={{ fontSize: 13, color: MID, lineHeight: 1.65 }}>{descriptions[i]}</p>}
            </div>
          </div>
        ))}
      </div>
      {/* Right — illustration card */}
      <div style={{ borderRadius: 24, overflow: "hidden", background: "#1a0a10", position: "relative", minHeight: 320, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28 }}>
        <Image src="/logo.jpg" alt="ThePull" fill style={{ objectFit: "cover", opacity: 0.35 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(15,5,12,0.92) 100%)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "16px 20px", marginBottom: 12 }}>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase" }}>Step {active + 1} of {steps.length}</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{steps[active].label}</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4, lineHeight: 1.6 }}>{descriptions[active]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function LandingPage() {
  return (
    <div style={{ fontFamily: "Aeonik, system-ui, sans-serif", background: "#fff", color: DARK, overflowX: "hidden" }}>

      {/* ══ NAV ══ */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(15,10,20,0.07)", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: WINE, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: GOLD, fontWeight: 900, fontSize: 14 }}>P</span>
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, color: DARK, letterSpacing: "-0.02em" }}>ThePull</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["Features", "How it works", "Pricing", "FAQ"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} style={{ fontSize: 14, color: MID, textDecoration: "none", fontWeight: 500 }}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/login" style={{ fontSize: 14, fontWeight: 600, color: DARK, textDecoration: "none" }}>Sign in</Link>
          <Link href="/register" style={{ padding: "9px 20px", borderRadius: 99, background: WINE, color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Get started</Link>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section style={{ padding: "96px 40px 80px", textAlign: "center", background: "linear-gradient(180deg, #faf7f2 0%, #fff 100%)" }}>
        <Tag>Personal Intelligence Platform</Tag>
        <h1 style={{ fontSize: "clamp(42px, 6vw, 76px)", fontWeight: 800, color: DARK, lineHeight: 1.06, letterSpacing: "-0.03em", marginTop: 24, marginBottom: 20 }}>
          Know yourself<br />at a deeper level.
        </h1>
        <p style={{ fontSize: 18, color: MID, maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7 }}>
          ThePull maps your emotional patterns, personality, and behavioural tendencies into a living intelligence profile that evolves with you.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <PrimaryBtn href="/register">Start for free</PrimaryBtn>
          <OutlineBtn href="#how-it-works">See how it works</OutlineBtn>
        </div>

        {/* Hero card mockup */}
        <div style={{ marginTop: 64, maxWidth: 880, margin: "64px auto 0", position: "relative" }}>
          <div style={{ borderRadius: 28, overflow: "hidden", background: "linear-gradient(140deg, #1a0a10 0%, #3d0e1a 50%, #0f0a14 100%)", padding: "40px 40px 0", boxShadow: "0 32px 80px rgba(61,14,26,0.22), 0 0 0 1px rgba(61,14,26,0.12)" }}>
            {/* fake browser bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              {["#f87171","#fbbf24","#34d399"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
            </div>
            {/* dashboard preview */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 0 }}>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: "20px 18px" }}>
                <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>Pull Score</p>
                <p style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-0.04em" }}>78</p>
                <p style={{ fontSize: 11, color: GOLD, marginTop: 6, fontWeight: 600 }}>↑ +6 this month</p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: "20px 18px" }}>
                <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>Archetype</p>
                <p style={{ fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>The Quiet Strategist</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>Confidence 84%</p>
              </div>
              <div style={{ background: "rgba(201,168,76,0.12)", borderRadius: 16, padding: "20px 18px", border: "1px solid rgba(201,168,76,0.2)" }}>
                <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", marginBottom: 10 }}>Today's Insight</p>
                <p style={{ fontSize: 13, color: "#fff", lineHeight: 1.55 }}>Your analytical nature is your greatest strength in uncertain situations.</p>
              </div>
            </div>
            {/* bar chart row */}
            <div style={{ display: "flex", gap: 8, padding: "20px 0 0", alignItems: "flex-end", height: 80 }}>
              {[55,70,62,78,65,82,74,78].map((h, i) => (
                <div key={i} style={{ flex: 1, borderRadius: "4px 4px 0 0", background: i === 7 ? GOLD : "rgba(255,255,255,0.12)", height: `${h}%`, transition: "height 0.3s" }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SOLUTION ══ */}
      <section style={{ padding: "96px 40px", background: "#fff" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Tag>Solution</Tag>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, color: DARK, letterSpacing: "-0.025em", lineHeight: 1.1, marginTop: 16, marginBottom: 16 }}>
              One platform that puts<br />you back in charge
            </h2>
            <p style={{ fontSize: 16, color: MID, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              Understand every part of yourself — your patterns, your edges, and your growth — all in one place.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr 1fr", gap: 16 }}>
            {/* card 1 */}
            <div style={{ borderRadius: 22, border: "1px solid rgba(15,10,20,0.08)", padding: "28px 24px", background: CREAM }}>
              <Tag>Journal</Tag>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: DARK, margin: "16px 0 8px", letterSpacing: "-0.01em" }}>Track your patterns</h3>
              <p style={{ fontSize: 13, color: MID, lineHeight: 1.7, marginBottom: 20 }}>Log real moments from your life. ThePull's AI extracts the emotional signals that define your patterns.</p>
              <div style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", border: "1px solid rgba(15,10,20,0.07)" }}>
                <p style={{ fontSize: 11, color: MID, marginBottom: 8 }}>Today's entry</p>
                <p style={{ fontSize: 13, color: DARK, lineHeight: 1.6, fontStyle: "italic" }}>"Had a hard conversation with my manager about boundaries today. Held my ground but felt guilty after…"</p>
                <div style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["Self-advocacy","Boundaries","Guilt pattern"].map(t => (
                    <span key={t} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 99, background: "rgba(61,14,26,0.07)", color: WINE, fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* card 2 — featured */}
            <div style={{ borderRadius: 22, background: WINE, padding: "28px 24px", boxShadow: "0 16px 48px rgba(61,14,26,0.28)", transform: "translateY(-8px)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700, background: "rgba(201,168,76,0.2)", color: GOLD, border: "1px solid rgba(201,168,76,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD }} />Reality Check
              </span>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "16px 0 8px", letterSpacing: "-0.01em" }}>Challenge your thinking</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 20 }}>Pause and re-examine your narratives. Get an honest AI-powered perspective on any situation.</p>
              <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "16px 18px", border: "1px solid rgba(255,255,255,0.12)" }}>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Reality check result</p>
                <p style={{ fontSize: 13, color: "#fff", lineHeight: 1.6 }}>Your reaction here is rooted in a fear of abandonment — not the situation itself. Consider what you'd tell a friend in your place.</p>
                <div style={{ marginTop: 14, height: 4, borderRadius: 99, background: "rgba(255,255,255,0.1)" }}>
                  <div style={{ height: "100%", width: "72%", borderRadius: 99, background: GOLD }} />
                </div>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 5 }}>Confidence 72%</p>
              </div>
            </div>

            {/* card 3 */}
            <div style={{ borderRadius: 22, border: "1px solid rgba(15,10,20,0.08)", padding: "28px 24px", background: CREAM }}>
              <Tag>Intelligence</Tag>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: DARK, margin: "16px 0 8px", letterSpacing: "-0.01em" }}>Know what's shaping you</h3>
              <p style={{ fontSize: 13, color: MID, lineHeight: 1.7, marginBottom: 20 }}>See your evolving Pull Score and archetype so you always know where you stand.</p>
              <div style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", border: "1px solid rgba(15,10,20,0.07)" }}>
                {[["Emotional IQ","82%","#c0404f"],["Communication","74%","#60a5fa"],["Self-Awareness","68%","#f59e0b"]].map(([l,p,c]) => (
                  <div key={l as string} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: DARK }}>{l}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: c as string }}>{p}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 99, background: "rgba(15,10,20,0.08)" }}>
                      <div style={{ height: "100%", width: p as string, borderRadius: 99, background: c as string }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section id="features" style={{ padding: "96px 40px", background: "#faf7f2" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Tag>Features</Tag>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, color: DARK, letterSpacing: "-0.025em", lineHeight: 1.1, marginTop: 16, marginBottom: 16 }}>
              Everything you need to<br />understand yourself
            </h2>
            <p style={{ fontSize: 16, color: MID, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              ThePull handles the deep work behind the scenes so you can focus on what matters — growing.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Feature 1 */}
            <div style={{ borderRadius: 22, background: "#fff", border: "1px solid rgba(15,10,20,0.08)", padding: "28px 28px 0", overflow: "hidden" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: DARK, marginBottom: 8 }}>AI Coach — Ask The Pull</h3>
              <p style={{ fontSize: 13, color: MID, lineHeight: 1.7, marginBottom: 24 }}>Have real conversations with an AI that knows your full intelligence profile. Get honest, contextual guidance — not generic advice.</p>
              <div style={{ background: "linear-gradient(160deg, #faf7f2, #f0ebe2)", borderRadius: "16px 16px 0 0", padding: "20px 20px 0", border: "1px solid rgba(15,10,20,0.06)", borderBottom: "none" }}>
                {[
                  { from: "you", text: "I keep self-sabotaging in relationships. Why?" },
                  { from: "pull", text: "Your pattern of pre-emptive withdrawal kicks in when intimacy hits a certain threshold. It's a protection mechanism rooted in early attachment styles." },
                ].map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: m.from === "you" ? "flex-end" : "flex-start", marginBottom: 10 }}>
                    <div style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: m.from === "you" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.from === "you" ? WINE : "#fff", color: m.from === "you" ? "#fff" : DARK, fontSize: 12, lineHeight: 1.55, border: m.from === "pull" ? "1px solid rgba(15,10,20,0.08)" : "none" }}>
                      {m.text}
                    </div>
                  </div>
                ))}
                <div style={{ height: 16 }} />
              </div>
            </div>

            {/* Feature 2 */}
            <div style={{ borderRadius: 22, background: DARK, border: "1px solid rgba(255,255,255,0.06)", padding: "28px 28px 0", overflow: "hidden" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Auto-detection of patterns</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 24 }}>Automatically detects recurring behavioural signals from your journal entries before they become invisible habits.</p>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "16px 16px 0 0", padding: "20px 20px 0", border: "1px solid rgba(255,255,255,0.07)", borderBottom: "none" }}>
                <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>New pattern detected</p>
                {[
                  { label: "People-pleasing spike", count: "5 entries", color: "#c0404f" },
                  { label: "Avoidant communication", count: "3 entries", color: "#f59e0b" },
                  { label: "Creative flow state",   count: "7 entries", color: "#34d399" },
                ].map(p => (
                  <div key={p.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{p.label}</span>
                    </div>
                    <span style={{ fontSize: 11, color: p.color, fontWeight: 700 }}>{p.count}</span>
                  </div>
                ))}
                <div style={{ height: 20 }} />
              </div>
            </div>

            {/* Feature 3 */}
            <div style={{ borderRadius: 22, background: "#fff", border: "1px solid rgba(15,10,20,0.08)", padding: "28px 28px 0", overflow: "hidden" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: DARK, marginBottom: 8 }}>Pull Score Analytics</h3>
              <p style={{ fontSize: 13, color: MID, lineHeight: 1.7, marginBottom: 24 }}>See how your dimensions are scored and how they move over time. Built from real data — not questionnaire guesses.</p>
              <div style={{ background: "#faf7f2", borderRadius: "16px 16px 0 0", padding: "20px 20px 0", border: "1px solid rgba(15,10,20,0.06)", borderBottom: "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                  <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: MID }}>Pull Score trend</p>
                  <span style={{ fontSize: 22, fontWeight: 800, color: DARK }}>78 <span style={{ fontSize: 12, color: "#34d399", fontWeight: 600 }}>↑ +6</span></span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 72 }}>
                  {[48,55,52,63,59,68,72,78].map((h, i) => (
                    <div key={i} style={{ flex: 1, borderRadius: "4px 4px 0 0", background: i === 7 ? WINE : "rgba(61,14,26,0.1)", height: `${(h / 80) * 100}%` }} />
                  ))}
                </div>
                <div style={{ height: 16 }} />
              </div>
            </div>

            {/* Feature 4 — image */}
            <div style={{ borderRadius: 22, overflow: "hidden", position: "relative", minHeight: 340 }}>
              <Image src="/logo.jpg" alt="ThePull" fill style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(15,10,20,0.65) 0%, rgba(61,14,26,0.85) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700, background: "rgba(201,168,76,0.2)", color: GOLD, border: "1px solid rgba(201,168,76,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD }} />Journey
                  </span>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginTop: 16, marginBottom: 10, lineHeight: 1.25, letterSpacing: "-0.01em" }}>Your growth,<br />mapped over time</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>See your milestones, breakthroughs, and evolving archetype on a timeline that belongs to you.</p>
                </div>
                <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 99, background: GOLD, color: DARK, fontSize: 13, fontWeight: 700, textDecoration: "none", alignSelf: "flex-start" }}>
                  Start your journey →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="how-it-works" style={{ padding: "96px 40px", background: "#fff" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <Tag dark>How it works</Tag>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, color: DARK, letterSpacing: "-0.025em", lineHeight: 1.1, marginTop: 16, marginBottom: 12 }}>
              See how it all<br />comes together
            </h2>
            <p style={{ fontSize: 16, color: MID, maxWidth: 440, lineHeight: 1.7 }}>A smarter way to build self-awareness and keep your personal intelligence growing.</p>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* ══ PULL PROFILE CTA ══ */}
      <section style={{ padding: "0 40px 96px", background: "#fff" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ borderRadius: 28, background: CREAM, border: "1px solid rgba(15,10,20,0.08)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, overflow: "hidden" }}>
            <div style={{ padding: "52px 48px" }}>
              <Tag>Pull Profile</Tag>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 800, color: DARK, letterSpacing: "-0.025em", lineHeight: 1.15, marginTop: 16, marginBottom: 12 }}>
                One profile for every dimension of you
              </h2>
              <p style={{ fontSize: 15, color: MID, lineHeight: 1.75, marginBottom: 32 }}>
                Use your Pull Profile to understand your full archetype, track your dimension scores, and share your intelligence with the people who matter.
              </p>
              <PrimaryBtn href="/register">Get your Pull Profile →</PrimaryBtn>
            </div>
            <div style={{ background: "linear-gradient(140deg, #1a0a10, #3d0e1a)", position: "relative", minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
              <div style={{ width: "100%", maxWidth: 280 }}>
                <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 20, padding: 20, border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}>
                  <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>Primary Archetype</p>
                  <p style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>The Quiet Strategist</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 18 }}>Thoughtful and analytical, always a step ahead.</p>
                  <div style={{ display: "flex", gap: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <div><p style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3 }}>Score</p><p style={{ fontSize: 22, fontWeight: 800, color: GOLD }}>78</p></div>
                    <div style={{ width: 1, background: "rgba(255,255,255,0.08)" }} />
                    <div><p style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3 }}>Confidence</p><p style={{ fontSize: 22, fontWeight: 800, color: "#c0404f" }}>84%</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ padding: "96px 40px", background: "#faf7f2" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Tag>FAQ</Tag>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: DARK, letterSpacing: "-0.025em", lineHeight: 1.1, marginTop: 16 }}>
              Questions you&apos;re<br />probably having
            </h2>
            <p style={{ fontSize: 14, color: MID, marginTop: 12 }}>Everything you need to know about ThePull</p>
          </div>
          <FAQ />
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section style={{ padding: "0 40px 96px", background: "#faf7f2" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ borderRadius: 28, overflow: "hidden", background: "linear-gradient(140deg, #1a0a10 0%, #3d0e1a 60%, #6b1c2b 100%)", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 340, position: "relative" }}>
            <Image src="/logo.jpg" alt="" fill style={{ objectFit: "cover", opacity: 0.15, mixBlendMode: "luminosity" }} />
            <div style={{ position: "relative", padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: 14 }}>
                Know yourself<br />at a deeper level.
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 32 }}>
                Start free. Build your intelligence profile. Grow into the most self-aware version of yourself.
              </p>
              <div>
                <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 99, background: GOLD, color: DARK, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                  Get started free →
                </Link>
              </div>
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
              <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 22, padding: "24px 26px", width: "100%", maxWidth: 300 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: WINE, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: GOLD, fontWeight: 900, fontSize: 16 }}>P</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>ThePull</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Personal Intelligence</p>
                  </div>
                </div>
                {[
                  { label: "Pull Score", val: "78", up: true },
                  { label: "Archetype", val: "Quiet Strategist", up: false },
                  { label: "Insights ready", val: "3 new", up: true },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{r.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: r.up ? GOLD : "#fff" }}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: DARK, padding: "60px 40px 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 32, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: WINE, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: GOLD, fontWeight: 900, fontSize: 14 }}>P</span>
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>ThePull</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxWidth: 220 }}>Your personal intelligence, finally under control.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pull Profile", "AI Coach", "Journal", "Pricing"] },
              { title: "Company", links: ["About us", "Careers", "News", "Contact"] },
              { title: "Resources", links: ["Docs", "Blog", "Changelog", "Support"] },
              { title: "Social", links: ["X.com", "LinkedIn", "Instagram"] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>{col.title}</p>
                {col.links.map(l => (
                  <p key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 10, cursor: "pointer" }}>{l}</p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© ThePull 2026</p>
            <div style={{ display: "flex", gap: 20 }}>
              <Link href="/terms" style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>Terms</Link>
              <Link href="/privacy" style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>Privacy</Link>
            </div>
          </div>
        </div>
        {/* big wordmark */}
        <p style={{ fontSize: "clamp(48px, 10vw, 120px)", fontWeight: 900, color: "rgba(255,255,255,0.04)", textAlign: "center", letterSpacing: "-0.04em", marginTop: 24, lineHeight: 1 }}>ThePull</p>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          nav > div:nth-child(2) { display: none; }
          [style*="gridTemplateColumns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: 2fr 1fr 1fr 1fr 1fr"] { grid-template-columns: 1fr 1fr !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          nav { padding: 0 20px !important; }
          footer { padding: 40px 20px 24px !important; }
        }
      `}</style>
    </div>
  );
}
