"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ThreeBrain = dynamic(() => import("@/components/ThreeBrain"), { ssr: false });
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiBrain01Icon, BookOpen01Icon, Analytics01Icon, SparklesIcon,
  ShieldCheckIcon, ArrowRight01Icon, CheckmarkCircle02Icon,
  ChartLineData03Icon, UserCircleIcon, FlashIcon, Target01Icon,
  EyeIcon, Activity01Icon, StarIcon, CompassIcon, LockIcon,
  Globe02Icon, TrendingUpIcon, Message02Icon, HeartCheckIcon,
} from "@hugeicons/core-free-icons";

/* ── dark design tokens ── */
const D = {
  bg: "#07020d",
  surface: "#0d0416",
  card: "rgba(255,255,255,0.04)",
  wine: "#3d0e1a",
  wineBright: "#8c1e35",
  gold: "#c9a84c",
  text: "#f0e8f4",
  muted: "rgba(240,232,244,0.40)",
  border: "rgba(255,255,255,0.07)",
  borderBright: "rgba(255,255,255,0.13)",
};

const FAQS = [
  { q: "What does MyPullScore actually do?", a: "It maps every pattern, tendency, and blind spot in your personality into a living intelligence profile — updated every time you share a moment with it." },
  { q: "What is the Pull Score?", a: "A composite intelligence rating built from emotional depth, communication style, self-awareness, and relationship patterns. It evolves as you use the app." },
  { q: "How is this different from a personality test?", a: "Tests give a one-time snapshot. MyPullScore is a living model — it deepens from daily entries, coach conversations, and real moments you choose to share." },
  { q: "Is my data private and secure?", a: "Yes. Your data is encrypted end-to-end, never sold, and only used to build your personal intelligence profile. You can delete everything at any time." },
  { q: "Can I start for free?", a: "Yes. The free plan gives you your Pull Score, primary archetype, and 5 monthly coach sessions — no credit card required." },
];

const FEATURES = [
  { icon: AiBrain01Icon,   title: "AI Coach",      desc: "Real conversations with an AI that knows your complete intelligence profile. Honest, contextual, always available." },
  { icon: BookOpen01Icon,  title: "Smart Journal",  desc: "Log real moments. The AI extracts emotional signals from every entry and feeds them into your evolving profile." },
  { icon: Analytics01Icon, title: "Pull Score",     desc: "A composite intelligence score tracking emotional depth, communication style, and self-awareness." },
  { icon: Target01Icon,    title: "Reality Check",  desc: "Pause on any situation. Get an honest AI perspective that cuts through your narratives." },
  { icon: CompassIcon,     title: "Journey Map",    desc: "Your milestones, breakthroughs, and archetype evolution mapped on a personal timeline." },
  { icon: EyeIcon,         title: "Auto-Detect",    desc: "Surfaces recurring behavioural signals from your journal before they become invisible habits." },
];

/* ── animation helpers ── */
function S({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="h" animate={inView ? "v" : "h"}
      variants={{ h: {}, v: { transition: { staggerChildren: 0.09 } } }} style={style}>
      {children}
    </motion.div>
  );
}
const up = {
  h: { opacity: 0, y: 28 },
  v: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

function Count({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let cur = 0; const step = end / 70;
    const t = setInterval(() => {
      cur += step;
      if (cur >= end) { setV(end); clearInterval(t); } else setV(Math.floor(cur));
    }, 14);
    return () => clearInterval(t);
  }, [inView, end]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

function Ring({ pct, label, val }: { pct: number; label: string; val: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const r = 38, circ = 2 * Math.PI * r;
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <svg width={96} height={96} viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
        <motion.circle cx="48" cy="48" r={r} fill="none" stroke={D.gold} strokeWidth="5"
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={inView ? { strokeDashoffset: circ * (1 - pct / 100) } : {}}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          style={{ rotate: -90, transformOrigin: "48px 48px" }} />
        <text x="48" y="44" textAnchor="middle" fontSize="16" fontWeight="800" fill={D.text} fontFamily="Aeonik,sans-serif">{val}</text>
        <text x="48" y="58" textAnchor="middle" fontSize="8" fill={D.muted} fontFamily="Aeonik,sans-serif">{label}</text>
      </svg>
    </div>
  );
}

/* ════════════════════════ PAGE ════════════════════════ */
export default function LandingPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "'Aeonik', system-ui, sans-serif", background: D.bg, color: D.text, overflowX: "hidden" }}>
      <style>{`
        @font-face {
          font-family: 'Aeonik';
          src: url('/Aeonik-Regular.ttf') format('truetype');
          font-weight: 100 900; font-style: normal; font-display: swap;
        }
        @keyframes ping { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.4);opacity:0} }
        @keyframes morph {
          0%  {border-radius:62% 38% 46% 54%/60% 44% 56% 40%}
          33% {border-radius:46% 54% 62% 38%/52% 62% 38% 48%}
          66% {border-radius:54% 46% 38% 62%/44% 38% 62% 56%}
          100%{border-radius:62% 38% 46% 54%/60% 44% 56% 40%}
        }
        @keyframes drift { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(3deg)} }
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; font-family: 'Aeonik', system-ui, sans-serif; background: ${D.bg}; }
        h1,h2,h3 { font-family: 'Aeonik', system-ui, sans-serif; }
        a { text-decoration: none; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .brain-col { height: 380px !important; }
          .feat-grid { grid-template-columns: 1fr 1fr !important; }
          .step-grid { grid-template-columns: 1fr 1fr !important; }
          .price-grid { grid-template-columns: 1fr !important; }
          .faq-grid  { grid-template-columns: 1fr !important; }
          .foot-grid { grid-template-columns: 1fr 1fr !important; }
          section, .section-pad { padding-left: 24px !important; padding-right: 24px !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <motion.nav initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 60,
          display: "flex", alignItems: "center", padding: "0 48px",
          background: "rgba(7,2,13,0.72)", backdropFilter: "blur(24px)",
          borderBottom: `1px solid ${D.border}` }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, marginRight: "auto" }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, overflow: "hidden", position: "relative", flexShrink: 0, background: D.wine }}>
            <Image src="/logo.jpg" alt="MyPullScore" fill style={{ objectFit: "cover" }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: D.text, letterSpacing: "-0.02em" }}>MyPullScore</span>
        </Link>
        <div className="nav-links" style={{ display: "flex", gap: 28, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {[["Features","#features"],["How it works","#howitworks"],["Pricing","#pricing"],["FAQ","#faq"]].map(([l,h])=>(
            <a key={l} href={h} style={{ fontSize: 13, color: D.muted, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e=>(e.currentTarget.style.color=D.text)} onMouseLeave={e=>(e.currentTarget.style.color=D.muted)}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/login" style={{ fontSize: 13, fontWeight: 500, color: D.muted, padding: "7px 14px" }}>Sign in</Link>
          <Link href="/register" style={{ fontSize: 13, fontWeight: 700, color: "#000",
            background: "#fff", padding: "8px 18px", borderRadius: 99 }}>Get started</Link>
        </div>
      </motion.nav>

      {/* ══ HERO ══ */}
      <section style={{ minHeight: "100vh", paddingTop: 60, display: "flex", alignItems: "center",
        background: D.bg, position: "relative", overflow: "hidden" }}>
        {/* background glow blobs */}
        <div style={{ position: "absolute", top: "10%", left: "-5%", width: 500, height: 500,
          borderRadius: "50%", background: `radial-gradient(ellipse, ${D.wine}28 0%, transparent 70%)`,
          pointerEvents: "none", filter: "blur(1px)" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "8%", width: 350, height: 350,
          borderRadius: "50%", background: `radial-gradient(ellipse, ${D.gold}12 0%, transparent 70%)`,
          pointerEvents: "none" }} />

        <div className="hero-grid" style={{ maxWidth: 1240, margin: "0 auto", padding: "60px 64px",
          width: "100%", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 40, alignItems: "center" }}>

          {/* LEFT */}
          <motion.div initial="h" animate="v" variants={{ h:{}, v:{ transition:{ staggerChildren:.12 } } }}>
            <motion.div variants={up}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px 5px 7px",
                borderRadius: 99, background: "rgba(201,168,76,0.08)", border: `1px solid ${D.gold}28`,
                marginBottom: 32 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: D.gold,
                  display: "inline-block", boxShadow: `0 0 8px ${D.gold}` }} />
                <span style={{ fontSize: 11, color: D.gold, fontWeight: 600, letterSpacing: "0.08em" }}>
                  Intelligence OS — Now live
                </span>
              </div>
            </motion.div>

            <motion.h1 variants={up} style={{ fontSize: "clamp(52px,6vw,88px)", fontWeight: 800,
              lineHeight: 0.97, letterSpacing: "-0.05em", marginBottom: 26, textWrap: "balance" }}>
              <span style={{ color: D.text }}>Know yourself</span><br />
              <span style={{ background: `linear-gradient(120deg, ${D.wineBright} 0%, #d4365a 40%, ${D.gold} 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                at a deeper level.
              </span>
            </motion.h1>

            <motion.p variants={up} style={{ fontSize: 17, color: D.muted, lineHeight: 1.82,
              maxWidth: 420, marginBottom: 40 }}>
              Your emotional patterns, personality, and behavioural tendencies — mapped into a living intelligence
              profile that evolves every time you share a moment.
            </motion.p>

            <motion.div variants={up} style={{ display: "flex", gap: 11, flexWrap: "wrap", marginBottom: 48 }}>
              <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 99, background: "#fff", color: "#07020d",
                fontSize: 14, fontWeight: 800, boxShadow: "0 0 40px rgba(255,255,255,0.10)" }}>
                Get started free <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </Link>
              <a href="#howitworks" style={{ display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 24px", borderRadius: 99, border: `1.5px solid ${D.borderBright}`,
                color: D.muted, fontSize: 14, fontWeight: 600 }}>
                How it works
              </a>
            </motion.div>

            <motion.div variants={up} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ display: "flex" }}>
                {["#9b3050","#7b2a44","#b83c60","#6d2039","#c9536e"].map((bg,i)=>(
                  <div key={i} style={{ width: 28, height: 28, borderRadius: "50%",
                    border: `2px solid ${D.bg}`, background: bg, marginLeft: i?-8:0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 9, fontWeight: 800, color: "#fff", zIndex: 5-i, position: "relative" }}>
                    {["A","K","S","M","L"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex", gap: 2 }}>
                  {[1,2,3,4,5].map(i=><span key={i} style={{ color: D.gold, fontSize: 11 }}>★</span>)}
                </div>
                <p style={{ fontSize: 12, color: D.muted, marginTop: 2 }}>
                  Trusted by <strong style={{ color: D.text }}>12,000+</strong> people worldwide
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — brain canvas, no container decorations */}
          <motion.div className="brain-col"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.4 }}
            style={{ height: 560, position: "relative" }}>
            {/* subtle glow behind brain */}
            <div style={{ position: "absolute", inset: -40,
              background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${D.wine}30 0%, transparent 70%)`,
              pointerEvents: "none" }} />
            <ThreeBrain style={{ width: "100%", height: "100%" }} />
          </motion.div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ background: D.surface, borderTop: `1px solid ${D.border}`,
        borderBottom: `1px solid ${D.border}`, padding: "56px 64px" }} className="section-pad">
        <S style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
          {[
            { end: 12000, suffix: "+", label: "Active users" },
            { end: 98,    suffix: "%", label: "Profile accuracy" },
            { end: 50,    suffix: "+", label: "Intelligence dimensions" },
            { end: 5,     suffix: " min", label: "To your first score" },
          ].map((s, i) => (
            <motion.div key={s.label} variants={up}
              style={{ textAlign: "center", padding: "0 20px",
                borderRight: i < 3 ? `1px solid ${D.border}` : "none" }}>
              <p style={{ fontSize: "clamp(36px,4vw,52px)", fontWeight: 800, color: D.text,
                letterSpacing: "-0.05em", lineHeight: 1 }}>
                <Count end={s.end} suffix={s.suffix} />
              </p>
              <p style={{ fontSize: 13, color: D.muted, marginTop: 6 }}>{s.label}</p>
            </motion.div>
          ))}
        </S>
      </section>

      {/* ══ MIND MAPPED ══ */}
      <section style={{ padding: "120px 64px", background: D.bg }} className="section-pad">
        <div className="hero-grid" style={{ maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <S>
            <motion.div variants={up} style={{ display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 13px", borderRadius: 99, background: "rgba(201,168,76,0.07)",
              border: `1px solid ${D.gold}25`, marginBottom: 22 }}>
              <HugeiconsIcon icon={AiBrain01Icon} size={11} style={{ color: D.gold }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: D.gold, letterSpacing: "0.12em", textTransform: "uppercase" }}>Intelligence Profile</span>
            </motion.div>
            <motion.h2 variants={up} style={{ fontSize: "clamp(34px,4vw,54px)", fontWeight: 800,
              letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 20, textWrap: "balance" }}>
              Your mind,<br />finally mapped.
            </motion.h2>
            <motion.p variants={up} style={{ fontSize: 16, color: D.muted, lineHeight: 1.85, marginBottom: 36 }}>
              MyPullScore builds a living model of who you are — how you communicate, react, attach, and grow.
              Every entry, every coach conversation deepens the map.
            </motion.p>
            {([
              [Activity01Icon, "Real-time pattern detection across 50+ dimensions"],
              [HeartCheckIcon, "Emotional intelligence tracked and updated daily"],
              [ChartLineData03Icon, "Archetype evolution as you grow and change"],
              [ShieldCheckIcon, "100% private — your data, your profile"],
            ] as const).map(([icon, label]) => (
              <motion.div key={label} variants={up}
                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(201,168,76,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <HugeiconsIcon icon={icon} size={13} style={{ color: D.gold }} />
                </div>
                <span style={{ fontSize: 14, color: D.muted }}>{label}</span>
              </motion.div>
            ))}
            <motion.div variants={up} style={{ marginTop: 36 }}>
              <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 7,
                padding: "12px 24px", borderRadius: 99, background: "#fff", color: "#07020d",
                fontSize: 14, fontWeight: 700 }}>
                Build your profile <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
              </Link>
            </motion.div>
          </S>
          <S>
            <motion.div variants={up} style={{ background: D.surface, borderRadius: 28,
              padding: "40px 36px", border: `1px solid ${D.border}` }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: D.muted,
                letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
                Your intelligence profile
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <Ring pct={82} val="82"  label="Pull Score"  />
                <Ring pct={74} val="74%" label="Emotional IQ" />
                <Ring pct={68} val="68%" label="Comm. Style"  />
                <Ring pct={84} val="84%" label="Self-Aware"   />
              </div>
              <div style={{ marginTop: 28, padding: "16px 18px", background: D.card,
                borderRadius: 16, border: `1px solid ${D.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                  <HugeiconsIcon icon={FlashIcon} size={12} style={{ color: D.gold }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: D.gold, letterSpacing: "0.1em", textTransform: "uppercase" }}>Today's insight</span>
                </div>
                <p style={{ fontSize: 13, color: D.muted, lineHeight: 1.65 }}>
                  Your analytical nature is your greatest asset in moments of uncertainty. Trust it more.
                </p>
              </div>
            </motion.div>
          </S>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section id="features" style={{ padding: "120px 64px", background: D.surface,
        borderTop: `1px solid ${D.border}` }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ marginBottom: 64 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 13px", borderRadius: 99, background: D.card,
                border: `1px solid ${D.border}`, marginBottom: 18 }}>
                <HugeiconsIcon icon={SparklesIcon} size={11} style={{ color: D.muted }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: D.muted,
                  letterSpacing: "0.12em", textTransform: "uppercase" }}>What you get</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 800,
                letterSpacing: "-0.04em", lineHeight: 1.06, textWrap: "balance", maxWidth: 560 }}>
                Every tool to understand yourself deeply
              </h2>
            </motion.div>
          </S>
          <S>
            <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {FEATURES.map(f => (
                <motion.div key={f.title} variants={up}
                  whileHover={{ y: -4, background: "rgba(255,255,255,0.07)" }}
                  style={{ background: D.card, borderRadius: 20, padding: "28px 24px",
                    border: `1px solid ${D.border}`, cursor: "default", transition: "all .2s" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12,
                    background: "rgba(201,168,76,0.08)", border: `1px solid ${D.gold}20`,
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <HugeiconsIcon icon={f.icon} size={18} style={{ color: D.gold }} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: D.text, marginBottom: 9 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: D.muted, lineHeight: 1.78 }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </S>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="howitworks" style={{ padding: "120px 64px", background: D.bg }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ textAlign: "center", marginBottom: 80 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 13px", borderRadius: 99, background: D.card,
                border: `1px solid ${D.border}`, marginBottom: 20 }}>
                <HugeiconsIcon icon={CompassIcon} size={11} style={{ color: D.gold }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: D.gold,
                  letterSpacing: "0.12em", textTransform: "uppercase" }}>How it works</span>
              </div>
              <h2 style={{ fontSize: "clamp(34px,5vw,60px)", fontWeight: 800, color: D.text,
                letterSpacing: "-0.04em", lineHeight: 1.04, textWrap: "balance" }}>
                From zero to self-aware<br />in under 10 minutes.
              </h2>
            </motion.div>
          </S>
          <S>
            <div className="step-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)",
              gap: 1, background: D.border, borderRadius: 24, overflow: "hidden" }}>
              {[
                { icon: UserCircleIcon, n: "01", title: "Create account",      desc: "Sign up with email or Google. Under a minute." },
                { icon: Activity01Icon,  n: "02", title: "5-min assessment",    desc: "Answer focused questions about your patterns." },
                { icon: Analytics01Icon, n: "03", title: "Get your Pull Score", desc: "Score and archetype generated instantly." },
                { icon: TrendingUpIcon,  n: "04", title: "Keep growing",        desc: "Every session deepens your intelligence profile." },
              ].map((s, i) => (
                <motion.div key={s.n} variants={up}
                  style={{ padding: "40px 28px", background: D.bg, position: "relative" }}>
                  <span style={{ fontSize: 10, color: D.gold, fontWeight: 700,
                    letterSpacing: "0.18em", display: "block", marginBottom: 18 }}>{s.n}</span>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: D.card,
                    border: `1px solid ${D.border}`, display: "flex", alignItems: "center",
                    justifyContent: "center", marginBottom: 18 }}>
                    <HugeiconsIcon icon={s.icon} size={15} style={{ color: D.muted }} />
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: D.text, marginBottom: 9 }}>{s.title}</p>
                  <p style={{ fontSize: 13, color: D.muted, lineHeight: 1.7 }}>{s.desc}</p>
                  {i < 3 && <span style={{ position: "absolute", top: 43, right: -10,
                    fontSize: 16, color: D.border, zIndex: 1 }}>→</span>}
                </motion.div>
              ))}
            </div>
          </S>

          <S style={{ marginTop: 64 }}>
            <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {[
                { q: "I've been to therapy for years. MyPullScore showed me patterns in 2 weeks that took me years to see.", name: "Amara J.", role: "Lagos, Nigeria" },
                { q: "The Reality Check feature is wild. It told me exactly what I was doing before I could admit it.", name: "Marcus W.", role: "New York, USA" },
                { q: "Talking to the AI coach feels like someone who knows my whole life history. Genuinely shocking.", name: "Sasha K.", role: "London, UK" },
              ].map(t => (
                <motion.div key={t.name} variants={up}
                  style={{ borderRadius: 20, border: `1px solid ${D.border}`,
                    padding: "28px 24px", background: D.card }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                    {[1,2,3,4,5].map(i => <span key={i} style={{ color: D.gold, fontSize: 12 }}>★</span>)}
                  </div>
                  <p style={{ fontSize: 14, color: D.muted, lineHeight: 1.78, marginBottom: 20, fontStyle: "italic" }}>
                    &ldquo;{t.q}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${D.wine}, #c0404f)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 800, color: "#fff" }}>{t.name[0]}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: D.text }}>{t.name}</p>
                      <p style={{ fontSize: 11, color: D.muted }}>{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </S>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" style={{ padding: "120px 64px", background: D.surface,
        borderTop: `1px solid ${D.border}` }} className="section-pad">
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 13px", borderRadius: 99, background: D.card,
                border: `1px solid ${D.border}`, marginBottom: 18 }}>
                <HugeiconsIcon icon={StarIcon} size={11} style={{ color: D.muted }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: D.muted,
                  letterSpacing: "0.12em", textTransform: "uppercase" }}>Pricing</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 800,
                letterSpacing: "-0.04em", lineHeight: 1.06 }}>Start free. Go deeper.</h2>
              <p style={{ fontSize: 16, color: D.muted, marginTop: 14, lineHeight: 1.8 }}>
                Free forever — premium for those who want the full picture.
              </p>
            </motion.div>
            <div className="price-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* free */}
              <motion.div variants={up} style={{ borderRadius: 24, border: `1.5px solid ${D.border}`,
                padding: "36px 32px", background: D.card }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: D.muted, marginBottom: 18,
                  letterSpacing: "0.08em", textTransform: "uppercase" }}>Free</p>
                <p style={{ fontSize: 50, fontWeight: 800, color: D.text,
                  letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 4 }}>$0</p>
                <p style={{ fontSize: 13, color: D.muted, marginBottom: 28 }}>Forever free</p>
                <Link href="/register" style={{ display: "flex", alignItems: "center",
                  justifyContent: "center", padding: "12px 0", borderRadius: 99,
                  border: `1.5px solid ${D.borderBright}`, color: D.text,
                  fontSize: 14, fontWeight: 700, marginBottom: 28 }}>Get started</Link>
                {["Pull Score + Archetype","5 Coach sessions/month","3 Reality checks/month","Smart Journal (10/mo)","Journey Map"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13} style={{ color: D.muted, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: D.muted }}>{f}</span>
                  </div>
                ))}
              </motion.div>
              {/* premium */}
              <motion.div variants={up} whileHover={{ scale: 1.015 }}
                style={{ borderRadius: 24, background: "#fff", padding: "36px 32px",
                  position: "relative", boxShadow: "0 24px 80px rgba(255,255,255,0.06)",
                  transition: "box-shadow .2s" }}>
                <div style={{ position: "absolute", top: 18, right: 18, padding: "4px 11px",
                  borderRadius: 99, background: D.gold, color: "#07020d",
                  fontSize: 9, fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Most popular
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#555", marginBottom: 18,
                  letterSpacing: "0.08em", textTransform: "uppercase" }}>Premium</p>
                <p style={{ fontSize: 50, fontWeight: 800, color: "#07020d",
                  letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 4 }}>$12</p>
                <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>per month</p>
                <Link href="/upgrade" style={{ display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 7, padding: "12px 0", borderRadius: 99,
                  background: "#07020d", color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 28 }}>
                  Upgrade now <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                </Link>
                {["Everything in Free","Unlimited Coach sessions","Unlimited Reality checks","Unlimited AI journal insights","Deep intelligence reports","Priority support"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13}
                      style={{ color: D.wineBright, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: f === "Everything in Free" ? "#07020d" : "#555",
                      fontWeight: f === "Everything in Free" ? 700 : 400 }}>{f}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </S>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ padding: "120px 64px", background: D.bg,
        borderTop: `1px solid ${D.border}` }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80 }}>
              <motion.div variants={up}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "4px 13px", borderRadius: 99, background: D.card,
                  border: `1px solid ${D.border}`, marginBottom: 22 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: D.muted,
                    letterSpacing: "0.12em", textTransform: "uppercase" }}>FAQ</span>
                </div>
                <h2 style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 800,
                  letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
                  Questions you&apos;re probably having
                </h2>
                <p style={{ fontSize: 14, color: D.muted, lineHeight: 1.8, marginBottom: 28 }}>
                  Can&apos;t find what you&apos;re looking for? Reach out — we&apos;re human.
                </p>
                <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "11px 20px", borderRadius: 99, border: `1.5px solid ${D.border}`,
                  color: D.muted, fontSize: 13, fontWeight: 600 }}>
                  <HugeiconsIcon icon={Message02Icon} size={13} /> Get in touch
                </Link>
              </motion.div>
              <div>
                {FAQS.map((f, i) => (
                  <motion.div key={i} variants={up} style={{ borderBottom: `1px solid ${D.border}` }}>
                    <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      style={{ width: "100%", display: "flex", justifyContent: "space-between",
                        alignItems: "center", padding: "20px 0", background: "none",
                        border: "none", cursor: "pointer", textAlign: "left", gap: 20 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: D.text }}>{f.q}</span>
                      <motion.span animate={{ rotate: faqOpen === i ? 45 : 0 }} transition={{ duration: 0.18 }}
                        style={{ fontSize: 22, color: D.muted, flexShrink: 0, lineHeight: 1, fontWeight: 300 }}>+</motion.span>
                    </button>
                    <AnimatePresence>
                      {faqOpen === i && (
                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                          style={{ fontSize: 14, color: D.muted, lineHeight: 1.82,
                            paddingBottom: 20, overflow: "hidden" }}>{f.a}</motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </S>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ padding: "80px 64px", background: D.surface }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ borderRadius: 28, position: "relative",
              overflow: "hidden", padding: "100px 64px", textAlign: "center",
              border: `1px solid ${D.borderBright}`, background: D.bg }}>
              <div style={{ position: "absolute", top: "-30%", left: "25%", width: 500, height: 500,
                background: `radial-gradient(ellipse, ${D.wine}35 0%, transparent 65%)`,
                animation: "morph 14s ease-in-out infinite", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "-20%", right: "15%", width: 350, height: 350,
                background: `radial-gradient(ellipse, ${D.gold}15 0%, transparent 65%)`,
                animation: "morph 18s ease-in-out 4s infinite", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: D.gold,
                  letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>Start today — free</p>
                <h2 style={{ fontSize: "clamp(40px,6vw,76px)", fontWeight: 800, color: D.text,
                  letterSpacing: "-0.05em", lineHeight: 0.97, marginBottom: 22, textWrap: "balance" }}>
                  Know yourself<br />at a deeper level.
                </h2>
                <p style={{ fontSize: 16, color: D.muted, lineHeight: 1.8,
                  maxWidth: 420, margin: "0 auto 44px" }}>
                  Join 12,000+ people building the most self-aware version of themselves with MyPullScore.
                </p>
                <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 9,
                  padding: "15px 36px", borderRadius: 99, background: "#fff", color: "#07020d",
                  fontSize: 15, fontWeight: 800, boxShadow: "0 0 80px rgba(255,255,255,0.08)" }}>
                  Get started free <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
                </Link>
                <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 32 }}>
                  {[{i: LockIcon, l: "Private by design"},{i: Globe02Icon, l: "Available worldwide"},{i: ShieldCheckIcon, l: "Encrypted end-to-end"}].map(x => (
                    <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 6,
                      fontSize: 12, color: D.muted }}>
                      <HugeiconsIcon icon={x.i} size={12} />{x.l}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </S>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: D.bg, borderTop: `1px solid ${D.border}`,
        padding: "60px 64px 0" }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="foot-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: 32, paddingBottom: 48, borderBottom: `1px solid ${D.border}` }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, overflow: "hidden",
                  position: "relative", background: D.wine }}>
                  <Image src="/logo.jpg" alt="MyPullScore" fill style={{ objectFit: "cover" }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: D.text }}>MyPullScore</span>
              </div>
              <p style={{ fontSize: 13, color: D.muted, lineHeight: 1.78, maxWidth: 190 }}>
                Your personal intelligence, finally under your control.
              </p>
            </div>
            {[
              { title: "Product",   links: ["Pull Score","AI Coach","Reality Check","Journal","Pricing"] },
              { title: "Company",   links: ["About","Careers","Blog","Contact"] },
              { title: "Resources", links: ["Docs","Changelog","Support","Privacy"] },
              { title: "Social",    links: ["X.com","LinkedIn","Instagram"] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: D.muted, marginBottom: 16 }}>{col.title}</p>
                {col.links.map(l => (
                  <p key={l} style={{ fontSize: 13, color: D.muted, marginBottom: 10, cursor: "pointer",
                    transition: "color .2s" }}
                    onMouseEnter={e=>(e.currentTarget.style.color=D.text)}
                    onMouseLeave={e=>(e.currentTarget.style.color=D.muted)}>{l}</p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "20px 0" }}>
            <p style={{ fontSize: 12, color: D.muted }}>© MyPullScore 2026 — Built for humans</p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Terms","Privacy"].map(l => (
                <Link key={l} href={`/${l.toLowerCase()}`}
                  style={{ fontSize: 12, color: D.muted }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
        <p style={{ fontSize: "clamp(48px,10vw,120px)", fontWeight: 900,
          color: "rgba(255,255,255,0.025)", textAlign: "center",
          letterSpacing: "-0.05em", lineHeight: 0.8, userSelect: "none" }}>
          MyPullScore
        </p>
      </footer>
    </div>
  );
}
