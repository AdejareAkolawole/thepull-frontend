"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiBrain01Icon, BookOpen01Icon, Analytics01Icon, SparklesIcon,
  ShieldCheckIcon, ArrowRight01Icon, CheckmarkCircle02Icon,
  ChartLineData03Icon, UserCircleIcon, FlashIcon, Target01Icon,
  Message02Icon, EyeIcon, Activity01Icon, StarIcon,
  CompassIcon, LockIcon, Globe02Icon, TrendingUpIcon,
  ArrowDown01Icon, Menu01Icon, Cancel01Icon,
} from "@hugeicons/core-free-icons";

/* ─── tokens ─── */
const W = "#3d0e1a", G = "#c9a84c", CR = "#f5f0e8", DK = "#0f0a14";

/* ─── animation variants ─── */
const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } } };
const stagger = (delay = 0) => ({ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: delay } } });
const fadeIn  = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } };

function Section({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger()} initial="hidden" animate={inView ? "show" : "hidden"} style={style}>
      {children}
    </motion.div>
  );
}

/* ─── FAQ ─── */
const FAQS = [
  { q: "What does MyPullScore actually do for me?", a: "It maps every pattern, tendency, and blind spot in your personality into a living intelligence profile — updated every time you share a moment. It warns you before a pattern becomes a problem and helps you understand why you react the way you do." },
  { q: "What is the Pull Score?", a: "Your Pull Score is a composite intelligence rating built from emotional depth, communication style, self-awareness, and relationship patterns. It evolves every time you journal or run a reality check." },
  { q: "How is this different from a personality test?", a: "Personality tests give a one-time snapshot. MyPullScore is a living model — it evolves from your daily entries, coach conversations, and real moments you choose to share. It gets smarter the longer you use it." },
  { q: "Is my data private and secure?", a: "Yes. Your data is encrypted end-to-end, never sold, and only ever used to build your personal intelligence profile. You control everything and can delete it at any time." },
  { q: "Can I start for free?", a: "Yes. The free plan gives you your Pull Score, primary archetype, and 5 monthly coach sessions. Premium unlocks unlimited sessions, deep reports, and advanced intelligence features." },
  { q: "How quickly will I see results?", a: "Your first Pull Score and archetype are generated immediately after your onboarding assessment — usually within 5 minutes. Your profile deepens the more you engage." },
];

/* ─── features ─── */
const FEATURES = [
  { icon: AiBrain01Icon,        title: "AI Coach",          desc: "Have real conversations with an AI that knows your full intelligence profile. Get honest, contextual guidance — not generic advice.",                             color: "#c0404f" },
  { icon: BookOpen01Icon,       title: "Smart Journal",     desc: "Log real moments. MyPullScore's AI extracts the emotional signals behind every entry and feeds them into your evolving profile.",                                  color: "#60a5fa" },
  { icon: Analytics01Icon,      title: "Pull Score",        desc: "A composite intelligence score built from your emotional depth, communication style, self-awareness, and relationship patterns.",                                 color: G },
  { icon: Target01Icon,         title: "Reality Check",     desc: "Pause on any situation. Get an honest AI perspective that cuts through your narratives and tells you what's really happening.",                                   color: "#a78bfa" },
  { icon: CompassIcon,          title: "Journey Map",       desc: "Watch your milestones, breakthroughs, and archetype evolution plotted on a timeline that belongs entirely to you.",                                               color: "#34d399" },
  { icon: EyeIcon,              title: "Auto Detection",    desc: "Automatically surfaces recurring behavioural signals from your journal before they become invisible habits you can't see.",                                       color: "#f97316" },
];

const STATS = [
  { val: "98%",    label: "Profile accuracy" },
  { val: "5 min",  label: "To your first score" },
  { val: "50+",    label: "Intelligence dimensions" },
  { val: "∞",      label: "Profile depth over time" },
];

/* ─── MAIN ─── */
export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "Aeonik, system-ui, sans-serif", background: DK, color: "#fff", overflowX: "hidden" }}>

      {/* ══ NAV ══ */}
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 64, display: "flex", alignItems: "center", padding: "0 40px", background: "rgba(15,10,20,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginRight: "auto" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, overflow: "hidden", position: "relative", flexShrink: 0 }}>
            <Image src="/logo.jpg" alt="MyPullScore" fill style={{ objectFit: "cover" }} />
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>MyPullScore</span>
        </Link>
        <div className="nav-links" style={{ display: "flex", gap: 32, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {[["Features","#features"],["How it works","#howitworks"],["Pricing","#pricing"],["FAQ","#faq"]].map(([l, h]) => (
            <a key={l} href={h} style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/login" style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "8px 16px" }}>Sign in</Link>
          <Link href="/register" style={{ fontSize: 13, fontWeight: 700, color: DK, background: "#fff", padding: "9px 20px", borderRadius: 99, textDecoration: "none" }}>Get started</Link>
        </div>
      </motion.nav>

      {/* ══ HERO ══ */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        {/* bg glow */}
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, rgba(61,14,26,0.7) 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "10%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "30%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)`, pointerEvents: "none" }} />

        <motion.div initial="hidden" animate="show" variants={stagger(0.1)} style={{ maxWidth: 820, textAlign: "center", position: "relative" }}>
          <motion.div variants={fadeUp}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px 6px 8px", borderRadius: 99, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(201,168,76,0.2)", padding: "3px 10px", borderRadius: 99 }}>
                <HugeiconsIcon icon={SparklesIcon} size={11} style={{ color: G }} />
                <span style={{ fontSize: 10, fontWeight: 800, color: G, letterSpacing: "0.1em", textTransform: "uppercase" }}>New</span>
              </div>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Intelligence profiles now include relationship patterns</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
            </div>
          </motion.div>

          <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.04em", marginBottom: 24 }}>
            <span style={{ color: "#fff" }}>Know yourself</span><br />
            <span style={{ background: `linear-gradient(135deg, ${G} 0%, #e8c96a 50%, ${G} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>at a deeper level.</span>
          </motion.h1>

          <motion.p variants={fadeUp} style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 40px" }}>
            MyPullScore maps your emotional patterns, personality, and behavioural tendencies into a living intelligence profile — updated every time you share a moment.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 99, background: "#fff", color: DK, fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 0 40px rgba(255,255,255,0.1)" }}>
              Start for free <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </Link>
            <a href="#howitworks" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 99, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              See how it works
            </a>
          </motion.div>

          <motion.div variants={fadeUp} style={{ marginTop: 64, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            {["No credit card", "Free to start", "Cancel anytime"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={12} style={{ color: "rgba(255,255,255,0.3)" }} />
                {t}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* hero dashboard card */}
        <motion.div initial={{ opacity: 0, y: 60, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", maxWidth: 960, margin: "72px auto 0", borderRadius: 24, overflow: "hidden", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 40px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)" }}>
          {/* top bar */}
          <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.02)" }}>
            {["#f87171","#fbbf24","#34d399"].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.7 }} />)}
            <div style={{ flex: 1, height: 20, borderRadius: 6, background: "rgba(255,255,255,0.04)", marginLeft: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>app.mypullscore.com/dashboard</span>
            </div>
          </div>
          {/* dashboard grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "rgba(255,255,255,0.04)" }}>
            {/* score */}
            <div style={{ background: DK, padding: "28px 24px" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
                <HugeiconsIcon icon={ChartLineData03Icon} size={10} /> Pull Score
              </p>
              <p style={{ fontSize: 64, fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-0.05em", marginBottom: 8 }}>78</p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 99, background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.2)" }}>
                <HugeiconsIcon icon={TrendingUpIcon} size={10} style={{ color: "#34d399" }} />
                <span style={{ fontSize: 11, color: "#34d399", fontWeight: 700 }}>+6 this month</span>
              </div>
              <div style={{ marginTop: 20, display: "flex", gap: 4, alignItems: "flex-end", height: 40 }}>
                {[40,55,48,62,55,68,72,78].map((h, i) => (
                  <div key={i} style={{ flex: 1, borderRadius: "3px 3px 0 0", background: i === 7 ? G : "rgba(255,255,255,0.07)", height: `${(h/80)*100}%`, transition: "height 0.3s" }} />
                ))}
              </div>
            </div>
            {/* archetype */}
            <div style={{ background: DK, padding: "28px 24px" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
                <HugeiconsIcon icon={UserCircleIcon} size={10} /> Archetype
              </p>
              <div style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 99, background: "rgba(192,64,79,0.15)", border: "1px solid rgba(192,64,79,0.2)", marginBottom: 10 }}>
                <span style={{ fontSize: 9, color: "#c0404f", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Emerging Identity</span>
              </div>
              <p style={{ fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 6 }}>The Quiet Strategist</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Confidence 84%</p>
              <div style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.06)" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: "84%" }} transition={{ duration: 1.2, delay: 1, ease: "easeOut" }} style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${W}, #c0404f)` }} />
              </div>
            </div>
            {/* insight */}
            <div style={{ background: DK, padding: "28px 24px" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.5)", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
                <HugeiconsIcon icon={FlashIcon} size={10} style={{ color: G }} /> Today's Insight
              </p>
              <p style={{ fontSize: 14, color: "#fff", lineHeight: 1.7, marginBottom: 16 }}>Your analytical nature is your greatest asset in moments of uncertainty. Trust it more.</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["Self-Awareness","Analytical","Growth"].map(t => (
                  <span key={t} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 99, background: `rgba(201,168,76,0.1)`, color: G, fontWeight: 600, border: "1px solid rgba(201,168,76,0.15)" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* scroll cue */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ marginTop: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll to explore</span>
          <HugeiconsIcon icon={ArrowDown01Icon} size={16} style={{ color: "rgba(255,255,255,0.2)" }} />
        </motion.div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "40px 48px", background: "rgba(255,255,255,0.02)" }}>
        <Section style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {STATS.map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} style={{ textAlign: "center", padding: "0 24px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <p style={{ fontSize: 40, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{s.val}</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 8 }}>{s.label}</p>
            </motion.div>
          ))}
        </Section>
      </section>

      {/* ══ SOLUTION — 3 CARDS ══ */}
      <section style={{ padding: "120px 48px", background: DK }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Section>
            <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, background: "rgba(61,14,26,0.4)", border: "1px solid rgba(61,14,26,0.6)", marginBottom: 20 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: W }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Solution</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 16 }}>
                One platform that puts<br />you back in charge
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>
                Understand every part of yourself — your patterns, your edges, and your growth — all in one living profile.
              </p>
            </motion.div>
          </Section>

          <Section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr 1fr", gap: 16, alignItems: "start" }}>
              {/* Card 1 */}
              <motion.div variants={fadeUp} style={{ borderRadius: 24, border: "1px solid rgba(255,255,255,0.07)", padding: "28px 24px 24px", background: "rgba(255,255,255,0.03)" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(96,165,250,0.12)", border: "1px solid rgba(96,165,250,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <HugeiconsIcon icon={BookOpen01Icon} size={18} style={{ color: "#60a5fa" }} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>Track your patterns</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: 24 }}>Log real moments from your life. The AI extracts emotional signals from every entry and feeds them into your profile.</p>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "16px 18px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginBottom: 10 }}>Today's entry</p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, fontStyle: "italic" }}>"Had a hard conversation with my manager about boundaries. Held my ground but felt guilty after…"</p>
                  <div style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {["Self-advocacy", "Guilt pattern"].map(t => (
                      <span key={t} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 99, background: "rgba(96,165,250,0.1)", color: "#60a5fa", fontWeight: 600, border: "1px solid rgba(96,165,250,0.15)" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Card 2 — featured */}
              <motion.div variants={fadeUp} style={{ borderRadius: 24, background: `linear-gradient(150deg, ${W} 0%, #5a1525 50%, #2a0810 100%)`, padding: "28px 24px 24px", boxShadow: "0 24px 64px rgba(61,14,26,0.5), 0 0 0 1px rgba(201,168,76,0.1)", transform: "translateY(-12px)" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <HugeiconsIcon icon={Target01Icon} size={18} style={{ color: G }} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>Reality Check anything</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 24 }}>Pause and re-examine your narratives. Get an honest AI-powered perspective that cuts through the noise.</p>
                <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 16, padding: "16px 18px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 8, overflow: "hidden", position: "relative" }}>
                      <Image src="/logo.jpg" alt="" fill style={{ objectFit: "cover" }} />
                    </div>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>Ask The Pull</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#fff", lineHeight: 1.65 }}>Your reaction here is rooted in fear — not the situation itself. Here's what's actually happening…</p>
                  <div style={{ marginTop: 14, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.08)" }}>
                    <div style={{ height: "100%", width: "72%", borderRadius: 99, background: G }} />
                  </div>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 5 }}>Confidence 72%</p>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div variants={fadeUp} style={{ borderRadius: 24, border: "1px solid rgba(255,255,255,0.07)", padding: "28px 24px 24px", background: "rgba(255,255,255,0.03)" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <HugeiconsIcon icon={ChartLineData03Icon} size={18} style={{ color: "#a78bfa" }} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>Know what's shaping you</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: 24 }}>See your evolving Pull Score and all dimension scores so you always know where you stand and where you're headed.</p>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "16px 18px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {[["Emotional IQ","#c0404f",82],["Communication","#60a5fa",74],["Self-Awareness","#a78bfa",68]].map(([l,c,p]) => (
                    <div key={l as string} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{l}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: c as string }}>{p}%</span>
                      </div>
                      <div style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.06)" }}>
                        <div style={{ height: "100%", width: `${p}%`, borderRadius: 99, background: c as string }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* ══ FEATURES GRID ══ */}
      <section id="features" style={{ padding: "120px 48px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Section>
            <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 72 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 20 }}>
                <HugeiconsIcon icon={SparklesIcon} size={11} style={{ color: G }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Features</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 16 }}>
                Everything you need to<br />understand yourself
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>
                MyPullScore handles the deep work behind the scenes so you can focus on what matters — growing.
              </p>
            </motion.div>
          </Section>

          <Section>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(255,255,255,0.05)", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} variants={fadeUp}
                  style={{ padding: "36px 32px", background: DK, cursor: "default", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                  onMouseLeave={e => (e.currentTarget.style.background = DK)}>
                  <div style={{ width: 44, height: 44, borderRadius: 13, background: `${f.color}15`, border: `1px solid ${f.color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <HugeiconsIcon icon={f.icon} size={20} style={{ color: f.color }} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.75 }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="howitworks" style={{ padding: "120px 48px", background: DK }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              {/* left */}
              <motion.div variants={fadeUp}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", marginBottom: 24 }}>
                  <HugeiconsIcon icon={CompassIcon} size={11} style={{ color: G }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: "0.1em", textTransform: "uppercase" }}>How it works</span>
                </div>
                <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
                  See how it all<br />comes together
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: 48 }}>
                  A smarter way to build self-awareness and keep your personal intelligence growing continuously.
                </p>
                {[
                  { n: "01", icon: UserCircleIcon, title: "Create your account", desc: "Sign up with email or Google in under a minute. No credit card required." },
                  { n: "02", icon: Activity01Icon, title: "Complete the assessment", desc: "Answer focused questions about your life, relationships and patterns. Takes 5 minutes." },
                  { n: "03", icon: ChartLineData03Icon, title: "Get your Pull Score", desc: "Your score and archetype are generated instantly from your assessment data." },
                  { n: "04", icon: TrendingUpIcon, title: "Grow your intelligence", desc: "Every journal entry and coach session deepens your model. Your profile never stops evolving." },
                ].map((s, i) => (
                  <div key={s.n} style={{ display: "flex", gap: 20, marginBottom: i < 3 ? 32 : 0, position: "relative" }}>
                    {i < 3 && <div style={{ position: "absolute", left: 19, top: 42, bottom: -16, width: 1, background: "rgba(255,255,255,0.06)" }} />}
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <HugeiconsIcon icon={s.icon} size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", fontWeight: 700, letterSpacing: "0.15em", marginBottom: 4 }}>{s.n}</p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{s.title}</p>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* right — big photo card */}
              <motion.div variants={fadeUp} style={{ borderRadius: 24, overflow: "hidden", position: "relative", aspectRatio: "4/5" }}>
                <Image src="/logo.jpg" alt="MyPullScore" fill style={{ objectFit: "cover", opacity: 0.6 }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(15,10,20,0.2) 0%, rgba(61,14,26,0.85) 100%)` }} />
                <div style={{ position: "absolute", inset: 0, padding: 28, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <div style={{ background: "rgba(15,10,20,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "20px 22px" }}>
                    <p style={{ fontSize: 10, color: G, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Complete your assessment</p>
                    {["Your background & patterns", "Key relationships", "Current challenges"].map((t, i) => (
                      <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <div style={{ width: 18, height: 18, borderRadius: 5, background: i < 2 ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.05)", border: `1px solid ${i < 2 ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {i < 2 && <span style={{ fontSize: 9, color: G }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 13, color: i < 2 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)" }}>{t}</span>
                      </div>
                    ))}
                    <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, padding: "10px 18px", borderRadius: 99, background: "#fff", color: DK, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                      Get started <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" style={{ padding: "120px 48px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Section>
            <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 20 }}>
                <HugeiconsIcon icon={StarIcon} size={11} style={{ color: G }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Pricing</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 16 }}>Start free. Go deeper.</h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>Everything you need to understand yourself — free forever, with premium for those who want more.</p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* Free */}
              <motion.div variants={fadeUp} style={{ borderRadius: 24, border: "1px solid rgba(255,255,255,0.08)", padding: "36px 32px", background: "rgba(255,255,255,0.03)" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>Free</p>
                <p style={{ fontSize: 52, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 6 }}>$0</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 32 }}>Forever free</p>
                <Link href="/register" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 0", borderRadius: 99, border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none", marginBottom: 32 }}>
                  Get started
                </Link>
                {["Pull Score + Archetype", "5 Coach sessions/month", "3 Reality checks/month", "Smart Journal", "10 AI journal insights/month"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{f}</span>
                  </div>
                ))}
              </motion.div>

              {/* Premium */}
              <motion.div variants={fadeUp} style={{ borderRadius: 24, background: "#fff", padding: "36px 32px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 20, right: 20, padding: "4px 12px", borderRadius: 99, background: DK, color: G, fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>Most popular</div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(15,10,20,0.5)", marginBottom: 20 }}>Premium</p>
                <p style={{ fontSize: 52, fontWeight: 800, color: DK, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 6 }}>$12</p>
                <p style={{ fontSize: 13, color: "rgba(15,10,20,0.4)", marginBottom: 32 }}>per month</p>
                <Link href="/upgrade" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 0", borderRadius: 99, background: DK, color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none", marginBottom: 32 }}>
                  Upgrade now <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                </Link>
                {["Everything in Free", "Unlimited Coach sessions", "Unlimited Reality checks", "Unlimited AI journal insights", "Deep intelligence reports", "Priority support"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} style={{ color: W, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "rgba(15,10,20,0.7)", fontWeight: f === "Everything in Free" ? 700 : 400 }}>{f}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ padding: "120px 48px", background: DK, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <Section>
            <motion.div variants={fadeUp}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>FAQ</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
                Questions you&apos;re<br />probably having
              </h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.8, marginBottom: 32 }}>
                Everything you need to know about MyPullScore. Can&apos;t find what you&apos;re looking for? Reach out.
              </p>
              <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", borderRadius: 99, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                <HugeiconsIcon icon={Message02Icon} size={14} /> Get in touch
              </Link>
            </motion.div>
          </Section>

          <Section>
            <div>
              {FAQS.map((f, i) => (
                <motion.div key={i} variants={fadeUp} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", background: "none", border: "none", cursor: "pointer", gap: 20, textAlign: "left" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", lineHeight: 1.4 }}>{f.q}</span>
                    <motion.div animate={{ rotate: faqOpen === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                      <HugeiconsIcon icon={ArrowRight01Icon} size={14} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0, transform: "rotate(90deg)" }} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                        style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, paddingBottom: 20, overflow: "hidden" }}>
                        {f.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section style={{ padding: "0 48px 80px", background: DK }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Section>
            <motion.div variants={fadeUp} style={{ borderRadius: 28, overflow: "hidden", position: "relative", minHeight: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 48px" }}>
              <Image src="/logo.jpg" alt="" fill style={{ objectFit: "cover", opacity: 0.12 }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(61,14,26,0.95) 0%, rgba(15,10,20,0.98) 100%)` }} />
              <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(61,14,26,0.6) 0%, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>Start today</p>
                <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.04, marginBottom: 20 }}>
                  Know yourself<br />at a deeper level.
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" }}>
                  Start free. Build your intelligence profile. Grow into the most self-aware version of yourself.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                  <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 32px", borderRadius: 99, background: "#fff", color: DK, fontSize: 15, fontWeight: 800, textDecoration: "none", boxShadow: "0 0 60px rgba(255,255,255,0.1)" }}>
                    Get started free <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
                  </Link>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 28 }}>
                  {[{ icon: LockIcon, label: "Privacy first" }, { icon: Globe02Icon, label: "Available worldwide" }, { icon: ShieldCheckIcon, label: "Encrypted data" }].map(item => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                      <HugeiconsIcon icon={item.icon} size={12} />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "60px 48px 0" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 32, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, overflow: "hidden", position: "relative" }}>
                  <Image src="/logo.jpg" alt="MyPullScore" fill style={{ objectFit: "cover" }} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>MyPullScore</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", lineHeight: 1.75, maxWidth: 200 }}>Your personal intelligence, finally under your control.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pull Profile", "AI Coach", "Journal", "Pricing"] },
              { title: "Company", links: ["About us", "Careers", "News", "Contact"] },
              { title: "Resources", links: ["Docs", "Blog", "Changelog", "Support"] },
              { title: "Social", links: ["X.com", "LinkedIn", "Instagram"] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 16 }}>{col.title}</p>
                {col.links.map(l => (
                  <p key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>{l}</p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0" }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© MyPullScore 2026</p>
            <div style={{ display: "flex", gap: 20 }}>
              <Link href="/terms" style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textDecoration: "none" }}>Terms</Link>
              <Link href="/privacy" style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textDecoration: "none" }}>Privacy</Link>
            </div>
          </div>
        </div>
        <p style={{ fontSize: "clamp(56px, 11vw, 130px)", fontWeight: 900, color: "rgba(255,255,255,0.025)", textAlign: "center", letterSpacing: "-0.04em", lineHeight: 0.85, userSelect: "none", paddingBottom: 0 }}>
          MyPullScore
        </p>
      </footer>

      <style>{`
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          section, footer { padding-left: 20px !important; padding-right: 20px !important; }
          [style*="gridTemplateColumns: 1fr 1fr 1fr"], [style*="gridTemplateColumns: repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: 1fr 1fr"], [style*="gridTemplateColumns: repeat(4, 1fr)"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: 2fr 1fr 1fr 1fr 1fr"] { grid-template-columns: 1fr 1fr !important; }
          [style*="gridTemplateColumns: 1fr 1.1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="transform: translateY(-12px)"] { transform: none !important; }
        }
      `}</style>
    </div>
  );
}
