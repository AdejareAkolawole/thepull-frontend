"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiBrain01Icon, BookOpen01Icon, Analytics01Icon, SparklesIcon,
  ShieldCheckIcon, ArrowRight01Icon, CheckmarkCircle02Icon,
  ChartLineData03Icon, UserCircleIcon, FlashIcon, Target01Icon,
  EyeIcon, Activity01Icon, StarIcon, CompassIcon, LockIcon,
  Globe02Icon, TrendingUpIcon, Message02Icon, HeartCheckIcon,
} from "@hugeicons/core-free-icons";

const C = {
  wine: "#3d0e1a",
  wineMid: "#7c1a2e",
  gold: "#c9a84c",
  ink: "#0c0308",
  muted: "#888",
  border: "rgba(12,3,8,0.08)",
  blush: "#faf5f7",
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
  h: { opacity: 0, y: 24 },
  v: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
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

export default function LandingPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "'Aeonik', system-ui, sans-serif", background: "#fff", color: C.ink, overflowX: "hidden" }}>
      <style>{`
        @font-face {
          font-family: 'Aeonik';
          src: url('/Aeonik-Regular.ttf') format('truetype');
          font-weight: 100 900; font-style: normal; font-display: swap;
        }
        @keyframes ping { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.5);opacity:0} }
        @keyframes morph {
          0%  {border-radius:62% 38% 46% 54%/60% 44% 56% 40%}
          33% {border-radius:46% 54% 62% 38%/52% 62% 38% 48%}
          66% {border-radius:54% 46% 38% 62%/44% 38% 62% 56%}
          100%{border-radius:62% 38% 46% 54%/60% 44% 56% 40%}
        }
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        a { text-decoration: none; }
        @media (max-width: 860px) {
          .feat-grid  { grid-template-columns: 1fr 1fr !important; }
          .step-grid  { grid-template-columns: 1fr 1fr !important; }
          .price-grid { grid-template-columns: 1fr !important; }
          .faq-inner  { grid-template-columns: 1fr !important; }
          .foot-inner { grid-template-columns: 1fr 1fr !important; }
          section, .pad { padding-left: 24px !important; padding-right: 24px !important; }
          .nav-mid { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <motion.nav initial={{ y: -14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 58,
          display: "flex", alignItems: "center", padding: "0 48px",
          background: "rgba(255,255,255,0.86)", backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${C.border}` }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, marginRight: "auto" }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, overflow: "hidden",
            position: "relative", background: C.wine, flexShrink: 0 }}>
            <Image src="/logo.jpg" alt="MyPullScore" fill style={{ objectFit: "cover" }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em" }}>MyPullScore</span>
        </Link>
        <div className="nav-mid" style={{ display: "flex", gap: 28, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {[["Features","#features"],["How it works","#howitworks"],["Pricing","#pricing"],["FAQ","#faq"]].map(([l,h])=>(
            <a key={l} href={h} style={{ fontSize: 13, color: C.muted, fontWeight: 500, transition: "color .18s" }}
              onMouseEnter={e=>(e.currentTarget.style.color=C.ink)} onMouseLeave={e=>(e.currentTarget.style.color=C.muted)}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/login" style={{ fontSize: 13, color: C.muted, fontWeight: 500, padding: "6px 12px" }}>Sign in</Link>
          <Link href="/register" style={{ fontSize: 13, fontWeight: 700, color: "#fff",
            background: C.ink, padding: "8px 18px", borderRadius: 99 }}>Get started</Link>
        </div>
      </motion.nav>

      {/* ══ HERO — centered, brain below headline ══ */}
      <section style={{ paddingTop: 58, background: "#fff", overflow: "hidden" }}>
        {/* text block */}
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "80px 32px 0", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px 5px 8px",
              borderRadius: 99, background: `${C.wine}0c`, border: `1px solid ${C.wine}20`, marginBottom: 32 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399",
                display: "inline-block", position: "relative" }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%",
                  background: "#34d399", animation: "ping 2s ease-out infinite" }} />
              </span>
              <span style={{ fontSize: 12, color: C.wine, fontWeight: 600 }}>Intelligence OS · 12,000+ people mapped</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}
            style={{ fontSize: "clamp(52px,7.5vw,104px)", fontWeight: 800, lineHeight: 0.93,
              letterSpacing: "-0.055em", marginBottom: 28, textWrap: "balance" }}>
            Know yourself<br />
            <span style={{ background: `linear-gradient(118deg, ${C.wine} 0%, #c72b4a 40%, ${C.gold} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              at a deeper level.
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
            style={{ fontSize: 18, color: "#666", lineHeight: 1.78, maxWidth: 520, margin: "0 auto 36px" }}>
            Your emotional patterns, personality, and behavioural tendencies — mapped into a living
            intelligence profile that evolves with you.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.28 }}
            style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 30px", borderRadius: 99, background: C.ink, color: "#fff",
              fontSize: 15, fontWeight: 700, boxShadow: `0 12px 40px ${C.ink}22` }}>
              Get started free <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
            </Link>
            <a href="#howitworks" style={{ display: "inline-flex", alignItems: "center",
              padding: "14px 26px", borderRadius: 99, border: `1.5px solid ${C.border}`,
              color: "#666", fontSize: 15, fontWeight: 600 }}>
              See how it works
            </a>
          </motion.div>

          {/* social proof row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, paddingBottom: 48 }}>
            <div style={{ display: "flex" }}>
              {["#9b3050","#7b2a44","#b83c60","#6d2039","#c9536e"].map((bg,i)=>(
                <div key={i} style={{ width: 26, height: 26, borderRadius: "50%", border: "2px solid #fff",
                  background: bg, marginLeft: i?-7:0, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 9, fontWeight: 800, color: "#fff",
                  zIndex: 5-i, position: "relative" }}>
                  {["A","K","S","M","L"][i]}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(i=><span key={i} style={{ color: C.gold, fontSize: 12 }}>★</span>)}</div>
            <span style={{ fontSize: 13, color: C.muted }}>Trusted by <strong style={{ color: C.ink }}>12,000+</strong> worldwide</span>
          </motion.div>
        </div>

        {/* animated metric cards as hero visual */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ maxWidth: 820, margin: "0 auto", padding: "0 32px 80px",
            display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {[
            { label: "Pull Score", val: "82", sub: "Top 8% globally", color: C.wine, pct: 82 },
            { label: "Emotional IQ", val: "74%", sub: "Growing +3 this week", color: C.wineMid, pct: 74 },
            { label: "Self-Awareness", val: "84%", sub: "Your strongest trait", color: C.gold, pct: 84 },
          ].map((m, i) => {
            const r = 32, circ = 2 * Math.PI * r;
            return (
              <motion.div key={m.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.6 }}
                whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(0,0,0,0.09)" }}
                style={{ background: "#fff", borderRadius: 20, padding: "28px 22px",
                  border: `1px solid ${C.border}`, boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  transition: "all .22s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.1em",
                      textTransform: "uppercase", marginBottom: 6 }}>{m.label}</p>
                    <p style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.04em",
                      color: m.color, lineHeight: 1 }}>{m.val}</p>
                  </div>
                  <svg width={72} height={72} viewBox="0 0 72 72" style={{ flexShrink: 0 }}>
                    <circle cx="36" cy="36" r={r} fill="none" stroke={`${m.color}10`} strokeWidth="4" />
                    <motion.circle cx="36" cy="36" r={r} fill="none" stroke={m.color} strokeWidth="4"
                      strokeLinecap="round" strokeDasharray={circ}
                      initial={{ strokeDashoffset: circ }}
                      animate={{ strokeDashoffset: circ * (1 - m.pct / 100) }}
                      transition={{ duration: 1.6, delay: 0.6 + i * 0.15, ease: "easeOut" }}
                      style={{ rotate: -90, transformOrigin: "36px 36px" }} />
                  </svg>
                </div>
                <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{m.sub}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ background: C.blush, borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`, padding: "52px 64px" }} className="pad">
        <S style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
          {[
            { end: 12000, suffix: "+", label: "Active users" },
            { end: 98,    suffix: "%", label: "Profile accuracy" },
            { end: 50,    suffix: "+", label: "Intelligence dimensions" },
            { end: 5,     suffix: " min", label: "To your first score" },
          ].map((s, i) => (
            <motion.div key={s.label} variants={up}
              style={{ textAlign: "center", padding: "0 20px",
                borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
              <p style={{ fontSize: "clamp(36px,4vw,52px)", fontWeight: 800, color: C.wine,
                letterSpacing: "-0.05em", lineHeight: 1 }}>
                <Count end={s.end} suffix={s.suffix} />
              </p>
              <p style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>{s.label}</p>
            </motion.div>
          ))}
        </S>
      </section>

      {/* ══ FEATURES ══ */}
      <section id="features" style={{ padding: "110px 64px", background: "#fff" }} className="pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 13px",
                borderRadius: 99, background: `${C.wine}0d`, border: `1px solid ${C.wine}18`, marginBottom: 18 }}>
                <HugeiconsIcon icon={SparklesIcon} size={11} style={{ color: C.wine }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.wine,
                  letterSpacing: "0.12em", textTransform: "uppercase" }}>What you get</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 800,
                letterSpacing: "-0.04em", lineHeight: 1.06, textWrap: "balance", maxWidth: 560, margin: "0 auto" }}>
                Every tool to understand yourself deeply
              </h2>
            </motion.div>
          </S>
          <S>
            <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
              {FEATURES.map((f, idx) => (
                <motion.div key={f.title} variants={up}
                  whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(0,0,0,0.07)" }}
                  style={{ background: idx === 0 ? `${C.wine}08` : "#fff",
                    borderRadius: 20, padding: "28px 24px",
                    border: `1px solid ${idx === 0 ? C.wine + "18" : C.border}`,
                    cursor: "default", transition: "all .2s" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12,
                    background: `${C.wine}0d`, border: `1px solid ${C.wine}1a`,
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <HugeiconsIcon icon={f.icon} size={18} style={{ color: C.wine }} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 9 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.78 }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </S>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="howitworks" style={{ padding: "110px 64px", background: C.ink }} className="pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ textAlign: "center", marginBottom: 80 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 13px",
                borderRadius: 99, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", marginBottom: 20 }}>
                <HugeiconsIcon icon={CompassIcon} size={11} style={{ color: C.gold }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.gold,
                  letterSpacing: "0.12em", textTransform: "uppercase" }}>How it works</span>
              </div>
              <h2 style={{ fontSize: "clamp(34px,5vw,60px)", fontWeight: 800, color: "#fff",
                letterSpacing: "-0.04em", lineHeight: 1.04, textWrap: "balance" }}>
                From zero to self-aware<br />in under 10 minutes.
              </h2>
            </motion.div>
          </S>
          <S>
            <div className="step-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)",
              gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 24, overflow: "hidden" }}>
              {[
                { icon: UserCircleIcon, n: "01", title: "Create account",      desc: "Sign up with email or Google. Under a minute." },
                { icon: Activity01Icon,  n: "02", title: "5-min assessment",    desc: "Answer focused questions about your patterns." },
                { icon: Analytics01Icon, n: "03", title: "Get your Pull Score", desc: "Score and archetype generated instantly." },
                { icon: TrendingUpIcon,  n: "04", title: "Keep growing",        desc: "Every session deepens your intelligence profile." },
              ].map((s, i) => (
                <motion.div key={s.n} variants={up}
                  style={{ padding: "40px 28px", background: C.ink, position: "relative" }}>
                  <span style={{ fontSize: 10, color: C.gold, fontWeight: 700,
                    letterSpacing: "0.18em", display: "block", marginBottom: 18 }}>{s.n}</span>
                  <div style={{ width: 38, height: 38, borderRadius: 11,
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <HugeiconsIcon icon={s.icon} size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 9 }}>{s.title}</p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}>{s.desc}</p>
                  {i < 3 && <span style={{ position: "absolute", top: 44, right: -9,
                    fontSize: 14, color: "rgba(255,255,255,0.15)", zIndex: 1 }}>→</span>}
                </motion.div>
              ))}
            </div>
          </S>

          <S style={{ marginTop: 56 }}>
            <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {[
                { q: "I've been to therapy for years. MyPullScore showed me patterns in 2 weeks that took me years to see.", name: "Amara J.", role: "Lagos, Nigeria" },
                { q: "The Reality Check feature is wild. It told me exactly what I was doing before I could admit it.", name: "Marcus W.", role: "New York, USA" },
                { q: "Talking to the AI coach feels like someone who knows my whole life history. Genuinely shocking.", name: "Sasha K.", role: "London, UK" },
              ].map(t => (
                <motion.div key={t.name} variants={up}
                  style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)",
                    padding: "28px 24px", background: "rgba(255,255,255,0.04)" }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                    {[1,2,3,4,5].map(i => <span key={i} style={{ color: C.gold, fontSize: 12 }}>★</span>)}
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.58)", lineHeight: 1.78,
                    marginBottom: 20, fontStyle: "italic" }}>&ldquo;{t.q}&rdquo;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${C.wine}, #c0404f)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 800, color: "#fff" }}>{t.name[0]}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.name}</p>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.28)" }}>{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </S>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" style={{ padding: "110px 64px", background: "#fff" }} className="pad">
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 13px",
                borderRadius: 99, background: `${C.wine}0d`, border: `1px solid ${C.wine}18`, marginBottom: 18 }}>
                <HugeiconsIcon icon={StarIcon} size={11} style={{ color: C.wine }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.wine,
                  letterSpacing: "0.12em", textTransform: "uppercase" }}>Pricing</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 800,
                letterSpacing: "-0.04em", lineHeight: 1.06 }}>Start free. Go deeper.</h2>
              <p style={{ fontSize: 16, color: C.muted, marginTop: 14, lineHeight: 1.8 }}>
                Free forever — premium for those who want the full picture.
              </p>
            </motion.div>
            <div className="price-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <motion.div variants={up} style={{ borderRadius: 24, border: `1.5px solid ${C.border}`,
                padding: "36px 32px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 18,
                  letterSpacing: "0.08em", textTransform: "uppercase" }}>Free</p>
                <p style={{ fontSize: 50, fontWeight: 800, color: C.ink,
                  letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 4 }}>$0</p>
                <p style={{ fontSize: 13, color: C.muted, marginBottom: 28 }}>Forever free</p>
                <Link href="/register" style={{ display: "flex", alignItems: "center",
                  justifyContent: "center", padding: "12px 0", borderRadius: 99,
                  border: `1.5px solid ${C.border}`, color: C.ink,
                  fontSize: 14, fontWeight: 700, marginBottom: 28 }}>Get started</Link>
                {["Pull Score + Archetype","5 Coach sessions/month","3 Reality checks/month","Smart Journal (10/mo)","Journey Map"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13} style={{ color: "#ccc", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#777" }}>{f}</span>
                  </div>
                ))}
              </motion.div>
              <motion.div variants={up} whileHover={{ scale: 1.012 }}
                style={{ borderRadius: 24, background: C.ink, padding: "36px 32px",
                  position: "relative", boxShadow: `0 20px 60px ${C.ink}22` }}>
                <div style={{ position: "absolute", top: 18, right: 18, padding: "4px 11px",
                  borderRadius: 99, background: C.gold, color: C.ink,
                  fontSize: 9, fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Most popular
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", marginBottom: 18,
                  letterSpacing: "0.08em", textTransform: "uppercase" }}>Premium</p>
                <p style={{ fontSize: 50, fontWeight: 800, color: "#fff",
                  letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 4 }}>$12</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 28 }}>per month</p>
                <Link href="/upgrade" style={{ display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 7, padding: "12px 0", borderRadius: 99,
                  background: "#fff", color: C.ink, fontSize: 14, fontWeight: 700, marginBottom: 28 }}>
                  Upgrade now <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                </Link>
                {["Everything in Free","Unlimited Coach sessions","Unlimited Reality checks","Unlimited AI journal insights","Deep intelligence reports","Priority support"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13} style={{ color: C.gold, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: f === "Everything in Free" ? "#fff" : "rgba(255,255,255,0.55)",
                      fontWeight: f === "Everything in Free" ? 700 : 400 }}>{f}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </S>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ padding: "110px 64px", background: C.blush,
        borderTop: `1px solid ${C.border}` }} className="pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <div className="faq-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80 }}>
              <motion.div variants={up}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 13px",
                  borderRadius: 99, background: "rgba(0,0,0,0.04)", border: `1px solid ${C.border}`, marginBottom: 22 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.muted,
                    letterSpacing: "0.12em", textTransform: "uppercase" }}>FAQ</span>
                </div>
                <h2 style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 800,
                  letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
                  Questions you&apos;re probably having
                </h2>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, marginBottom: 28 }}>
                  Can&apos;t find what you&apos;re looking for? Reach out.
                </p>
                <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "11px 20px", borderRadius: 99, border: `1.5px solid ${C.border}`,
                  color: "#555", fontSize: 13, fontWeight: 600, background: "#fff" }}>
                  <HugeiconsIcon icon={Message02Icon} size={13} /> Get in touch
                </Link>
              </motion.div>
              <div>
                {FAQS.map((f, i) => (
                  <motion.div key={i} variants={up} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      style={{ width: "100%", display: "flex", justifyContent: "space-between",
                        alignItems: "center", padding: "20px 0", background: "none",
                        border: "none", cursor: "pointer", textAlign: "left", gap: 20 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{f.q}</span>
                      <motion.span animate={{ rotate: faqOpen === i ? 45 : 0 }} transition={{ duration: 0.18 }}
                        style={{ fontSize: 22, color: "#aaa", flexShrink: 0, lineHeight: 1, fontWeight: 300 }}>+</motion.span>
                    </button>
                    <AnimatePresence>
                      {faqOpen === i && (
                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                          style={{ fontSize: 14, color: "#666", lineHeight: 1.82,
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
      <section style={{ padding: "80px 64px", background: "#fff" }} className="pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ borderRadius: 28, background: C.ink, padding: "96px 56px",
              textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-25%", left: "28%", width: 480, height: 480,
                background: `radial-gradient(ellipse, ${C.wine}50 0%, transparent 65%)`,
                animation: "morph 14s ease-in-out infinite", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "-20%", right: "18%", width: 340, height: 340,
                background: `radial-gradient(ellipse, ${C.gold}1a 0%, transparent 65%)`,
                animation: "morph 18s ease-in-out 4s infinite", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: C.gold,
                  letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>Start today — free</p>
                <h2 style={{ fontSize: "clamp(40px,6vw,76px)", fontWeight: 800, color: "#fff",
                  letterSpacing: "-0.05em", lineHeight: 0.97, marginBottom: 22 }}>
                  Know yourself<br />at a deeper level.
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: 1.8,
                  maxWidth: 400, margin: "0 auto 44px" }}>
                  Join 12,000+ people building the most self-aware version of themselves.
                </p>
                <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 9,
                  padding: "15px 36px", borderRadius: 99, background: "#fff", color: C.ink,
                  fontSize: 15, fontWeight: 800 }}>
                  Get started free <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
                </Link>
                <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 32 }}>
                  {[{i: LockIcon, l: "Private by design"},{i: Globe02Icon, l: "Available worldwide"},{i: ShieldCheckIcon, l: "Encrypted end-to-end"}].map(x => (
                    <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 6,
                      fontSize: 12, color: "rgba(255,255,255,0.28)" }}>
                      <HugeiconsIcon icon={x.i} size={12} />{x.l}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </S>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.blush, borderTop: `1px solid ${C.border}`, padding: "60px 64px 0" }} className="pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="foot-inner" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: 32, paddingBottom: 48, borderBottom: `1px solid ${C.border}` }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, overflow: "hidden",
                  position: "relative", background: C.wine }}>
                  <Image src="/logo.jpg" alt="MyPullScore" fill style={{ objectFit: "cover" }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>MyPullScore</span>
              </div>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.78, maxWidth: 190 }}>
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
                  textTransform: "uppercase", color: "#bbb", marginBottom: 16 }}>{col.title}</p>
                {col.links.map(l => (
                  <p key={l} style={{ fontSize: 13, color: C.muted, marginBottom: 10, cursor: "pointer", transition: "color .18s" }}
                    onMouseEnter={e=>(e.currentTarget.style.color=C.ink)}
                    onMouseLeave={e=>(e.currentTarget.style.color=C.muted)}>{l}</p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0" }}>
            <p style={{ fontSize: 12, color: "#ccc" }}>© MyPullScore 2026 — Built for humans</p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Terms","Privacy"].map(l => (
                <Link key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: 12, color: "#ccc" }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
        <p style={{ fontSize: "clamp(48px,10vw,120px)", fontWeight: 900, color: "rgba(0,0,0,0.04)",
          textAlign: "center", letterSpacing: "-0.05em", lineHeight: 0.8, userSelect: "none" }}>
          MyPullScore
        </p>
      </footer>
    </div>
  );
}
