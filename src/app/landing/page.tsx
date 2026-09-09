"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import {
  motion, useInView, AnimatePresence,
  useScroll, useTransform,
} from "framer-motion";

const ThreeBrain = dynamic(() => import("@/components/ThreeBrain"), { ssr: false });
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiBrain01Icon, BookOpen01Icon, Analytics01Icon, SparklesIcon,
  ShieldCheckIcon, ArrowRight01Icon, CheckmarkCircle02Icon,
  ChartLineData03Icon, UserCircleIcon, FlashIcon, Target01Icon,
  EyeIcon, Activity01Icon, StarIcon, CompassIcon, LockIcon,
  Globe02Icon, TrendingUpIcon, Message02Icon, HeartCheckIcon,
} from "@hugeicons/core-free-icons";

/* ── design tokens ── */
const C = {
  bg: "#ffffff",
  ink: "#0c0308",
  wine: "#3d0e1a",
  wineMid: "#6b1a2e",
  gold: "#c9a84c",
  blush: "#f8f1f4",
  muted: "#888",
  border: "rgba(12,3,8,0.08)",
};

/* ── NODE / CONNECTION DATA for SVG brain ── */
const NODES = [
  { x: 170, y: 170 }, { x: 230, y: 105 }, { x: 305, y: 80 },
  { x: 380, y: 105 }, { x: 430, y: 170 }, { x: 405, y: 250 },
  { x: 330, y: 295 }, { x: 245, y: 280 }, { x: 175, y: 230 },
  { x: 285, y: 185 }, { x: 345, y: 155 }, { x: 310, y: 230 },
  { x: 225, y: 155 }, { x: 265, y: 225 }, { x: 355, y: 210 },
];
const CONNECTIONS: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,0],
  [9,10],[9,11],[9,12],[9,13],[10,14],[11,13],[12,13],
  [0,9],[1,12],[2,10],[3,14],[4,5],[5,11],[6,11],[7,13],[8,12],
  [9,14],[13,14],
];

/* ── morphing blob keyframes (CSS) ── */
const BLOB_KF = `
@keyframes morph {
  0%   { border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%; }
  25%  { border-radius: 38% 62% 58% 42% / 48% 62% 38% 52%; }
  50%  { border-radius: 46% 54% 34% 66% / 56% 36% 64% 44%; }
  75%  { border-radius: 54% 46% 62% 38% / 42% 56% 44% 58%; }
  100% { border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%; }
}
@keyframes spin-slow { to { transform: rotate(360deg); } }
@keyframes ping { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(2.2); opacity: 0; } }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
@keyframes drawIn {
  from { stroke-dashoffset: 1; }
  to   { stroke-dashoffset: 0; }
}
@keyframes signalMove {
  0%   { offset-distance: 0%; opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}
`;

/* ── SVG Neural illustration ── */
function NeuralSVG({ animate: doAnim }: { animate: boolean }) {
  const SIGNAL_PATHS = [
    CONNECTIONS[0], CONNECTIONS[5], CONNECTIONS[11], CONNECTIONS[17],
    CONNECTIONS[2], CONNECTIONS[8],
  ];
  const pathRef = (i: number) => {
    const [a, b] = CONNECTIONS[i];
    const na = NODES[a], nb = NODES[b];
    const mx = (na.x + nb.x) / 2 + (Math.sin(i * 1.7) * 22);
    const my = (na.y + nb.y) / 2 + (Math.cos(i * 1.3) * 22);
    return `M ${na.x} ${na.y} Q ${mx} ${my} ${nb.x} ${nb.y}`;
  };
  const signalPath = (c: [number, number]) => {
    const [a, b] = c;
    const na = NODES[a], nb = NODES[b];
    return `M ${na.x} ${na.y} L ${nb.x} ${nb.y}`;
  };

  return (
    <svg viewBox="30 50 540 290" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="softglow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {SIGNAL_PATHS.map((_, i) => (
          <path key={i} id={`sp${i}`} d={signalPath(SIGNAL_PATHS[i])} />
        ))}
      </defs>

      {/* connection lines */}
      {CONNECTIONS.map((c, i) => {
        const [a, b] = c;
        const na = NODES[a], nb = NODES[b];
        const mx = (na.x + nb.x) / 2 + Math.sin(i * 1.7) * 22;
        const my = (na.y + nb.y) / 2 + Math.cos(i * 1.3) * 22;
        const len = Math.hypot(nb.x - na.x, nb.y - na.y) * 1.2;
        return (
          <path
            key={i}
            d={`M ${na.x} ${na.y} Q ${mx} ${my} ${nb.x} ${nb.y}`}
            fill="none"
            stroke={i % 4 === 0 ? C.gold : i % 3 === 0 ? C.wineMid : "rgba(61,14,26,0.18)"}
            strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
            strokeDasharray={len}
            strokeDashoffset={len}
            style={doAnim ? {
              animation: `drawIn 1.2s cubic-bezier(.4,0,.2,1) ${i * 0.06}s forwards`,
            } : { strokeDashoffset: 0 }}
          />
        );
      })}

      {/* traveling signals */}
      {doAnim && SIGNAL_PATHS.map((_, i) => (
        <circle
          key={i}
          r={3.5}
          fill={i % 2 === 0 ? C.gold : C.wineMid}
          filter="url(#glow)"
          style={{
            offsetPath: `path("${signalPath(SIGNAL_PATHS[i])}")`,
            animation: `signalMove ${1.8 + i * 0.4}s ease-in-out ${0.8 + i * 0.25}s infinite`,
          }}
        />
      ))}

      {/* nodes */}
      {NODES.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={i < 9 ? 7 : 5} fill="#fff" stroke={i < 9 ? C.wine : C.wineMid} strokeWidth={i < 9 ? 2 : 1.5}
            filter="url(#glow)"
            style={doAnim ? { animation: `float ${3 + (i % 4) * 0.6}s ease-in-out ${i * 0.12}s infinite` } : undefined} />
          {i < 9 && <circle cx={n.x} cy={n.y} r={3} fill={C.wine} style={doAnim ? { animation: `ping 2.4s ease-out ${i * 0.3}s infinite` } : undefined} />}
        </g>
      ))}

      {/* hemisphere labels */}
      <text x="182" y="64" fontSize="9" fill="rgba(61,14,26,0.35)" fontFamily="Aeonik,sans-serif" fontWeight="600" letterSpacing="0.15em" textAnchor="middle" textDecoration="none">LEFT HEMISPHERE</text>
      <text x="378" y="64" fontSize="9" fill="rgba(61,14,26,0.35)" fontFamily="Aeonik,sans-serif" fontWeight="600" letterSpacing="0.15em" textAnchor="middle">RIGHT HEMISPHERE</text>
      <line x1="290" y1="68" x2="290" y2="310" stroke="rgba(61,14,26,0.06)" strokeWidth="1" strokeDasharray="4 4" />

      {/* dimension labels */}
      {[["Emotional IQ", 80, 330],["Self-Awareness", 290, 338],["Communication", 490, 295]].map(([l, x, y]) => (
        <text key={l} x={x} y={y} fontSize="8.5" fill="rgba(12,3,8,0.3)" fontFamily="Aeonik,sans-serif" textAnchor="middle" fontWeight="500">{l}</text>
      ))}
    </svg>
  );
}

/* ── circular progress ring ── */
function Ring({ pct, label, val, color }: { pct: number; label: string; val: string; color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const r = 38, circ = 2 * Math.PI * r;
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <svg width={96} height={96} viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(61,14,26,0.07)" strokeWidth="6" />
        <motion.circle
          cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={inView ? { strokeDashoffset: circ * (1 - pct / 100) } : {}}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          style={{ rotate: -90, transformOrigin: "48px 48px" }}
        />
        <text x="48" y="44" textAnchor="middle" fontSize="16" fontWeight="800" fill={C.ink} fontFamily="Aeonik,sans-serif">{val}</text>
        <text x="48" y="58" textAnchor="middle" fontSize="8" fill={C.muted} fontFamily="Aeonik,sans-serif">{label}</text>
      </svg>
    </div>
  );
}

/* ── section wrapper ── */
function S({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial="h" animate={inView ? "v" : "h"}
      variants={{ h: {}, v: { transition: { staggerChildren: 0.08 } } }}
      style={style}>
      {children}
    </motion.div>
  );
}
const up = {
  h: { opacity: 0, y: 24 },
  v: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

/* ── live counter ── */
function Count({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = end / 70;
    const t = setInterval(() => {
      cur += step;
      if (cur >= end) { setV(end); clearInterval(t); } else setV(Math.floor(cur));
    }, 14);
    return () => clearInterval(t);
  }, [inView, end]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

/* ── FAQ ── */
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

/* ════════════════════════ PAGE ════════════════════════ */
export default function LandingPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [svgVisible, setSvgVisible] = useState(false);
  const [liveCount] = useState(() => 2847 + Math.floor(Math.random() * 300));
  const svgRef = useRef(null);
  const svgInView = useInView(svgRef, { once: true, margin: "-80px" });

  useEffect(() => { if (svgInView) setSvgVisible(true); }, [svgInView]);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -60]);

  return (
    <div style={{ fontFamily: "'Aeonik', system-ui, sans-serif", background: C.bg, color: C.ink, overflowX: "hidden" }}>
      <style>{`
        @font-face {
          font-family: 'Aeonik';
          src: url('/Aeonik-Regular.ttf') format('truetype');
          font-weight: 100 900;
          font-style: normal;
          font-display: swap;
        }
        ${BLOB_KF}
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; font-family: 'Aeonik', system-ui, sans-serif; }
        h1,h2,h3 { font-family: 'Aeonik', system-ui, sans-serif; }
        a { text-decoration: none; }
        @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg: #ffffff; } }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .brain-col { display: none !important; }
          .feat-grid { grid-template-columns: 1fr 1fr !important; }
          .step-grid { grid-template-columns: 1fr 1fr !important; }
          .price-grid { grid-template-columns: 1fr !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
          .foot-grid { grid-template-columns: 1fr 1fr !important; }
          section, .section-pad { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <motion.nav initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 60, display: "flex", alignItems: "center", padding: "0 48px", background: "rgba(255,255,255,0.88)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}` }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, marginRight: "auto" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, overflow: "hidden", position: "relative", flexShrink: 0, background: C.wine }}>
            <Image src="/logo.jpg" alt="MyPullScore" fill style={{ objectFit: "cover" }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ink, letterSpacing: "-0.02em" }}>MyPullScore</span>
        </Link>
        <div style={{ display: "flex", gap: 28, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {[["Features","#features"],["How it works","#howitworks"],["Pricing","#pricing"],["FAQ","#faq"]].map(([l,h])=>(
            <a key={l} href={h} style={{ fontSize: 13, color: C.muted, fontWeight: 500 }}
              onMouseEnter={e=>(e.currentTarget.style.color=C.ink)} onMouseLeave={e=>(e.currentTarget.style.color=C.muted)}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/login" style={{ fontSize: 13, fontWeight: 500, color: C.muted, padding: "7px 14px" }}>Sign in</Link>
          <Link href="/register" style={{ fontSize: 13, fontWeight: 700, color: "#fff", background: C.ink, padding: "8px 18px", borderRadius: 99 }}>Get started</Link>
        </div>
      </motion.nav>

      {/* ══ HERO ══ */}
      <section style={{ minHeight: "100vh", paddingTop: 60, display: "flex", alignItems: "center", background: C.bg, overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 64px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="hero-grid">

          {/* LEFT — text */}
          <motion.div initial="h" animate="v" variants={{ h:{}, v:{ transition:{ staggerChildren:.1 } } }}>
            <motion.div variants={up}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px 5px 7px", borderRadius: 99, background: `${C.wine}0d`, border: `1px solid ${C.wine}22`, marginBottom: 28 }}>
                <span style={{ padding: "2px 9px", borderRadius: 99, background: `${C.wine}18`, fontSize: 9, fontWeight: 700, color: C.wine, letterSpacing: "0.12em", textTransform: "uppercase" }}>Intelligence OS</span>
                <span style={{ fontSize: 12, color: C.muted }}>Relationship patterns now live</span>
              </div>
            </motion.div>
            <motion.h1 variants={up} style={{ fontSize: "clamp(48px,5.5vw,80px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.045em", marginBottom: 24, textWrap: "balance" }}>
              Know yourself<br />
              <span style={{ background: `linear-gradient(125deg,${C.wine} 0%,#b52340 45%,${C.gold} 100%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>at a deeper level.</span>
            </motion.h1>
            <motion.p variants={up} style={{ fontSize: 17, color: "#666", lineHeight: 1.82, maxWidth: 440, marginBottom: 40 }}>
              Your emotional patterns, personality, and behavioural tendencies — mapped into a living intelligence profile that evolves every time you share a moment.
            </motion.p>
            <motion.div variants={up} style={{ display: "flex", gap: 11, flexWrap: "wrap", marginBottom: 44 }}>
              <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "13px 26px", borderRadius: 99, background: C.ink, color: "#fff", fontSize: 14, fontWeight: 700, boxShadow: `0 8px 28px ${C.ink}30` }}>
                Get started free <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </Link>
              <a href="#howitworks" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "13px 24px", borderRadius: 99, border: `1.5px solid ${C.border}`, color: "#555", fontSize: 14, fontWeight: 600 }}>
                See how it works
              </a>
            </motion.div>
            <motion.div variants={up} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ display: "flex" }}>
                {["#9b3050","#7b2a44","#b83c60","#6d2039","#c9536e"].map((bg,i)=>(
                  <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #fff", background: bg, marginLeft: i?-8:0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "#fff", zIndex: 5-i, position: "relative" }}>
                    {["A","K","S","M","L"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(i=><span key={i} style={{ color: C.gold, fontSize: 11 }}>★</span>)}</div>
                <p style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Trusted by <strong style={{ color: C.ink }}>12,000+</strong> people worldwide</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Three.js shader canvas */}
          <motion.div className="brain-col" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3, ease: [0.22,1,0.36,1] as const }}
            style={{ height: 520, borderRadius: 28, overflow: "hidden", position: "relative", boxShadow: `0 32px 80px rgba(0,0,0,0.14), 0 0 0 1px ${C.border}` }}>
            <ThreeBrain style={{ width: "100%", height: "100%" }} />
            {/* live badge overlay */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
              style={{ position: "absolute", top: 18, left: 18, display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 99, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", boxShadow: "0 2px 12px rgba(0,0,0,0.10)" }}>
              <span style={{ position: "relative", width: 7, height: 7, flexShrink: 0 }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#34d399", animation: "ping 2s ease-out infinite" }} />
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#34d399" }} />
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, color: C.ink }}>{liveCount.toLocaleString()} active now</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ background: C.blush, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "56px 64px" }} className="section-pad">
        <S style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
          {[
            { end: 12000, suffix: "+", label: "Active users" },
            { end: 98, suffix: "%", label: "Profile accuracy" },
            { end: 50, suffix: "+", label: "Intelligence dimensions" },
            { end: 5, suffix: " min", label: "To your first score" },
          ].map((s, i) => (
            <motion.div key={s.label} variants={up} style={{ textAlign: "center", padding: "0 20px", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
              <p style={{ fontSize: "clamp(36px,4vw,52px)", fontWeight: 800, color: C.ink, letterSpacing: "-0.04em", lineHeight: 1, fontFamily: "'Aeonik', sans-serif" }}>
                <Count end={s.end} suffix={s.suffix} />
              </p>
              <p style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>{s.label}</p>
            </motion.div>
          ))}
        </S>
      </section>

      {/* ══ MIND MAPPED ══ */}
      <section style={{ padding: "120px 64px", background: C.bg }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="hero-grid">
          <S>
            <motion.div variants={up} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 13px", borderRadius: 99, background: `${C.wine}0d`, border: `1px solid ${C.wine}20`, marginBottom: 22 }}>
              <HugeiconsIcon icon={AiBrain01Icon} size={11} style={{ color: C.wine }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: C.wine, letterSpacing: "0.12em", textTransform: "uppercase" }}>Intelligence Profile</span>
            </motion.div>
            <motion.h2 variants={up} style={{ fontSize: "clamp(34px,4vw,54px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.06, marginBottom: 20, textWrap: "balance" }}>
              Your mind,<br />finally mapped.
            </motion.h2>
            <motion.p variants={up} style={{ fontSize: 16, color: "#666", lineHeight: 1.85, marginBottom: 36 }}>
              MyPullScore builds a living model of who you are — how you communicate, react, attach, and grow. Every journal entry, every coach conversation, every reality check deepens the map.
            </motion.p>
            {[
              [Activity01Icon, "Real-time pattern detection across 50+ dimensions"],
              [HeartCheckIcon, "Emotional intelligence tracked and updated daily"],
              [ChartLineData03Icon, "Archetype evolution as you grow and change"],
              [ShieldCheckIcon, "100% private — your data, your profile"],
            ].map(([icon, label]) => (
              <motion.div key={label as string} variants={up} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: `${C.wine}0d`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <HugeiconsIcon icon={icon as typeof Activity01Icon} size={13} style={{ color: C.wine }} />
                </div>
                <span style={{ fontSize: 14, color: "#444", fontWeight: 400 }}>{label as string}</span>
              </motion.div>
            ))}
            <motion.div variants={up} style={{ marginTop: 36 }}>
              <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "12px 24px", borderRadius: 99, background: C.ink, color: "#fff", fontSize: 14, fontWeight: 700 }}>
                Build your profile <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
              </Link>
            </motion.div>
          </S>

          {/* ring chart panel */}
          <S>
            <motion.div variants={up} style={{ background: C.blush, borderRadius: 28, padding: "40px 36px", border: `1px solid ${C.border}` }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>Your intelligence profile</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <Ring pct={82} val="82" label="Pull Score"     color={C.wine} />
                <Ring pct={74} val="74%" label="Emotional IQ" color={C.wine} />
                <Ring pct={68} val="68%" label="Comm. Style"  color={C.wine} />
                <Ring pct={84} val="84%" label="Self-Aware"   color={C.wine} />
              </div>
              <div style={{ marginTop: 28, padding: "16px 18px", background: "#fff", borderRadius: 16, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                  <HugeiconsIcon icon={FlashIcon} size={12} style={{ color: C.gold }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: "0.1em", textTransform: "uppercase" }}>Today's insight</span>
                </div>
                <p style={{ fontSize: 13, color: C.ink, lineHeight: 1.65 }}>Your analytical nature is your greatest asset in moments of uncertainty. Trust it more.</p>
              </div>
            </motion.div>
          </S>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section id="features" style={{ padding: "120px 64px", background: C.blush, borderTop: `1px solid ${C.border}` }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ marginBottom: 64 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 13px", borderRadius: 99, background: "rgba(0,0,0,0.05)", border: `1px solid ${C.border}`, marginBottom: 18 }}>
                <HugeiconsIcon icon={SparklesIcon} size={11} style={{ color: C.muted }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>What you get</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.06, textWrap: "balance", maxWidth: 560 }}>
                Every tool to understand yourself deeply
              </h2>
            </motion.div>
          </S>
          <S>
            <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
              {FEATURES.map(f => (
                <motion.div key={f.title} variants={up}
                  whileHover={{ y: -3, boxShadow: "0 20px 44px rgba(0,0,0,0.08)" }}
                  style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", border: `1px solid ${C.border}`, cursor: "default", transition: "box-shadow .2s" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.wine}0d`, border: `1px solid ${C.wine}1a`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <HugeiconsIcon icon={f.icon} size={18} style={{ color: C.wine }} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 9 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: "#777", lineHeight: 1.78 }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </S>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="howitworks" style={{ padding: "120px 64px", background: C.ink }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ textAlign: "center", marginBottom: 80 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 13px", borderRadius: 99, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", marginBottom: 20 }}>
                <HugeiconsIcon icon={CompassIcon} size={11} style={{ color: C.gold }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase" }}>How it works</span>
              </div>
              <h2 style={{ fontSize: "clamp(34px,5vw,60px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.04, textWrap: "balance" }}>
                From zero to self-aware<br />in under 10 minutes.
              </h2>
            </motion.div>
          </S>

          {/* steps with SVG connector */}
          <S>
            <div className="step-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 24, overflow: "hidden" }}>
              {[
                { icon: UserCircleIcon, n: "01", title: "Create account",       desc: "Sign up with email or Google. Takes under a minute." },
                { icon: Activity01Icon,  n: "02", title: "5-min assessment",     desc: "Answer focused questions about your patterns and life." },
                { icon: Analytics01Icon, n: "03", title: "Get your Pull Score",  desc: "Your score and archetype are generated instantly." },
                { icon: TrendingUpIcon,  n: "04", title: "Keep growing",         desc: "Every session deepens your intelligence profile." },
              ].map((s, i) => (
                <motion.div key={s.n} variants={up} style={{ padding: "40px 28px", background: C.ink, position: "relative" }}>
                  <span style={{ fontSize: 10, color: C.gold, fontWeight: 700, letterSpacing: "0.18em", fontFamily: "'Aeonik', sans-serif", display: "block", marginBottom: 18 }}>{s.n}</span>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <HugeiconsIcon icon={s.icon} size={15} style={{ color: "rgba(255,255,255,0.6)" }} />
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 9, fontFamily: "'Aeonik', sans-serif" }}>{s.title}</p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{s.desc}</p>
                  {i < 3 && <span style={{ position: "absolute", top: 43, right: -10, fontSize: 16, color: "rgba(255,255,255,0.15)", zIndex: 1 }}>→</span>}
                </motion.div>
              ))}
            </div>
          </S>

          {/* testimonials */}
          <S style={{ marginTop: 64 }}>
            <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
              {[
                { q: "I've been to therapy for years. MyPullScore showed me patterns in 2 weeks that took me years to see.", name: "Amara J.", role: "Lagos, Nigeria" },
                { q: "The Reality Check feature is wild. It told me exactly what I was doing before I could admit it.", name: "Marcus W.", role: "New York, USA" },
                { q: "Talking to the AI coach feels like someone who knows my whole life history. Genuinely shocking.", name: "Sasha K.", role: "London, UK" },
              ].map(t => (
                <motion.div key={t.name} variants={up} style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", padding: "28px 24px", background: "rgba(255,255,255,0.04)" }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                    {[1,2,3,4,5].map(i => <span key={i} style={{ color: C.gold, fontSize: 12 }}>★</span>)}
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.68)", lineHeight: 1.78, marginBottom: 20, fontStyle: "italic" }}>&ldquo;{t.q}&rdquo;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg, ${C.wine}, #c0404f)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>{t.name[0]}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.name}</p>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </S>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" style={{ padding: "120px 64px", background: C.bg }} className="section-pad">
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 13px", borderRadius: 99, background: "rgba(0,0,0,0.04)", border: `1px solid ${C.border}`, marginBottom: 18 }}>
                <HugeiconsIcon icon={StarIcon} size={11} style={{ color: C.muted }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>Pricing</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.06, textWrap: "balance" }}>Start free. Go deeper.</h2>
              <p style={{ fontSize: 16, color: C.muted, marginTop: 14, lineHeight: 1.8 }}>Free forever — premium for those who want the full picture.</p>
            </motion.div>
            <div className="price-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* free */}
              <motion.div variants={up} style={{ borderRadius: 24, border: `1.5px solid ${C.border}`, padding: "36px 32px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 18, letterSpacing: "0.08em", textTransform: "uppercase" }}>Free</p>
                <p style={{ fontSize: 50, fontWeight: 800, color: C.ink, letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 4, fontFamily: "'Aeonik', sans-serif" }}>$0</p>
                <p style={{ fontSize: 13, color: C.muted, marginBottom: 28 }}>Forever free</p>
                <Link href="/register" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 0", borderRadius: 99, border: `1.5px solid ${C.border}`, color: C.ink, fontSize: 14, fontWeight: 700, marginBottom: 28 }}>Get started</Link>
                {["Pull Score + Archetype","5 Coach sessions/month","3 Reality checks/month","Smart Journal (10 insights/mo)","Journey Map"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13} style={{ color: "#ccc", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#777" }}>{f}</span>
                  </div>
                ))}
              </motion.div>
              {/* premium */}
              <motion.div variants={up} whileHover={{ scale: 1.015 }} style={{ borderRadius: 24, background: C.ink, padding: "36px 32px", position: "relative", boxShadow: `0 20px 60px ${C.ink}25`, transition: "box-shadow .2s" }}>
                <div style={{ position: "absolute", top: 18, right: 18, padding: "4px 11px", borderRadius: 99, background: C.gold, color: C.ink, fontSize: 9, fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase" }}>Most popular</div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", marginBottom: 18, letterSpacing: "0.08em", textTransform: "uppercase" }}>Premium</p>
                <p style={{ fontSize: 50, fontWeight: 800, color: "#fff", letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 4, fontFamily: "'Aeonik', sans-serif" }}>$12</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 28 }}>per month</p>
                <Link href="/upgrade" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "12px 0", borderRadius: 99, background: "#fff", color: C.ink, fontSize: 14, fontWeight: 700, marginBottom: 28 }}>
                  Upgrade now <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                </Link>
                {["Everything in Free","Unlimited Coach sessions","Unlimited Reality checks","Unlimited AI journal insights","Deep intelligence reports","Priority support"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13} style={{ color: C.gold, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: f === "Everything in Free" ? "#fff" : "rgba(255,255,255,0.55)", fontWeight: f === "Everything in Free" ? 700 : 400 }}>{f}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </S>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ padding: "120px 64px", background: C.blush, borderTop: `1px solid ${C.border}` }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80 }}>
              <motion.div variants={up}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 13px", borderRadius: 99, background: "rgba(0,0,0,0.05)", border: `1px solid ${C.border}`, marginBottom: 22 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>FAQ</span>
                </div>
                <h2 style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16, textWrap: "balance" }}>Questions you&apos;re probably having</h2>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, marginBottom: 28 }}>Can&apos;t find what you&apos;re looking for? Reach out — we&apos;re human.</p>
                <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 20px", borderRadius: 99, border: `1.5px solid ${C.border}`, color: "#555", fontSize: 13, fontWeight: 600, background: "#fff" }}>
                  <HugeiconsIcon icon={Message02Icon} size={13} /> Get in touch
                </Link>
              </motion.div>
              <div>
                {FAQS.map((f, i) => (
                  <motion.div key={i} variants={up} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 20 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{f.q}</span>
                      <motion.span animate={{ rotate: faqOpen === i ? 45 : 0 }} transition={{ duration: 0.18 }}
                        style={{ fontSize: 22, color: "#aaa", flexShrink: 0, lineHeight: 1, fontWeight: 300 }}>+</motion.span>
                    </button>
                    <AnimatePresence>
                      {faqOpen === i && (
                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                          style={{ fontSize: 14, color: "#666", lineHeight: 1.82, paddingBottom: 20, overflow: "hidden" }}>{f.a}</motion.p>
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
      <section style={{ padding: "80px 64px", background: C.bg }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ borderRadius: 28, background: C.ink, padding: "80px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              {/* animated blob bg */}
              <div style={{ position: "absolute", top: "-20%", left: "30%", width: 400, height: 400, background: `radial-gradient(ellipse, ${C.wine}60 0%, transparent 70%)`, animation: "morph 12s ease-in-out infinite", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "-20%", right: "20%", width: 320, height: 320, background: `radial-gradient(ellipse, ${C.gold}20 0%, transparent 70%)`, animation: "morph 16s ease-in-out 3s infinite", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'Aeonik', sans-serif" }}>Start today — free</p>
                <h2 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.05em", lineHeight: 0.97, marginBottom: 22, textWrap: "balance" }}>
                  Know yourself<br />at a deeper level.
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.42)", lineHeight: 1.8, maxWidth: 420, margin: "0 auto 44px" }}>
                  Join 12,000+ people building the most self-aware version of themselves with MyPullScore.
                </p>
                <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "15px 34px", borderRadius: 99, background: "#fff", color: C.ink, fontSize: 15, fontWeight: 800, boxShadow: "0 0 60px rgba(255,255,255,0.08)" }}>
                  Get started free <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
                </Link>
                <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 32 }}>
                  {[{i: LockIcon, l: "Private by design"},{i: Globe02Icon, l: "Available worldwide"},{i: ShieldCheckIcon, l: "Encrypted end-to-end"}].map(x => (
                    <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                      <HugeiconsIcon icon={x.i} size={12} />{x.l}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </S>
        </div>
      </section>

      {/* ══ FOOTER (kept) ══ */}
      <footer style={{ background: C.blush, borderTop: `1px solid ${C.border}`, padding: "60px 64px 0" }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="foot-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 32, paddingBottom: 48, borderBottom: `1px solid ${C.border}` }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, overflow: "hidden", position: "relative" }}>
                  <Image src="/logo.jpg" alt="MyPullScore" fill style={{ objectFit: "cover" }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.ink, fontFamily: "'Aeonik', sans-serif" }}>MyPullScore</span>
              </div>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.78, maxWidth: 190 }}>Your personal intelligence, finally under your control.</p>
            </div>
            {[
              { title: "Product", links: ["Pull Score","AI Coach","Reality Check","Journal","Pricing"] },
              { title: "Company", links: ["About","Careers","Blog","Contact"] },
              { title: "Resources", links: ["Docs","Changelog","Support","Privacy"] },
              { title: "Social", links: ["X.com","LinkedIn","Instagram"] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: 16 }}>{col.title}</p>
                {col.links.map(l => <p key={l} style={{ fontSize: 13, color: C.muted, marginBottom: 10, cursor: "pointer" }}
                  onMouseEnter={e=>(e.currentTarget.style.color=C.ink)} onMouseLeave={e=>(e.currentTarget.style.color=C.muted)}>{l}</p>)}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0" }}>
            <p style={{ fontSize: 12, color: "#ccc" }}>© MyPullScore 2026 — Built for humans</p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Terms","Privacy"].map(l => <Link key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: 12, color: "#ccc" }}>{l}</Link>)}
            </div>
          </div>
        </div>
        <p style={{ fontSize: "clamp(48px,10vw,120px)", fontWeight: 900, color: "rgba(0,0,0,0.04)", textAlign: "center", letterSpacing: "-0.05em", lineHeight: 0.8, userSelect: "none" }}>
          MyPullScore
        </p>
      </footer>
    </div>
  );
}
