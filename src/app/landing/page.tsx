"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiBrain01Icon, AiSparklesIcon, BookOpen01Icon, Analytics01Icon, SparklesIcon,
  ShieldCheckIcon, ArrowRight01Icon, CheckmarkCircle01Icon, CheckmarkCircle02Icon,
  UserCircleIcon, Target01Icon,
  EyeIcon, Activity01Icon, StarIcon, CompassIcon, LockIcon,
  Globe02Icon, TrendingUpIcon, Message02Icon,
} from "@hugeicons/core-free-icons";
import { createCheckout, getFoundingAvailability, isLoggedIn } from "@/lib/api";
import AdminPage from "../admin/page";

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
  { q: "How is this different from a personality test?", a: "Tests give a one-time snapshot. MyPullScore is a living model — it deepens from daily entries, Ask The Pull conversations, and real moments you choose to share." },
  { q: "Is my data private and secure?", a: "Yes. Your data is encrypted end-to-end, never sold, and only used to build your personal intelligence profile. You can delete everything at any time." },
  { q: "Can I start for free?", a: "Yes. The free plan gives you your Pull Score, primary archetype, and 5 monthly Ask The Pull sessions — no credit card required." },
];

const FEATURES = [
  { icon: AiBrain01Icon,   title: "Ask The Pull", desc: "Real conversations with an intelligence assistant that knows your complete profile. Honest, contextual, always available." },
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


export default function LandingPage() {
  const [operatorPath, setOperatorPath] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const path = window.location.pathname.replace(/\/$/, "");
      setOperatorPath(path === "/admin" || path === "/command-centre");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (operatorPath) return <AdminPage />;
  return <LandingExperience />;
}

function LandingExperience() {
  const router = useRouter();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 });
  const [foundingAvailability, setFoundingAvailability] = useState<{
    limit: number;
    spots_claimed: number;
    spots_reserved?: number;
    spots_remaining: number;
    available?: boolean;
  } | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    getFoundingAvailability().then(setFoundingAvailability).catch(() => setFoundingAvailability(null));
  }, []);

  const foundingProgress = foundingAvailability
    ? Math.min(100, (foundingAvailability.spots_claimed / foundingAvailability.limit) * 100)
    : 0;
  async function handleFoundingCheckout() {
    if (!isLoggedIn()) {
      router.push("/login?next=/upgrade");
      return;
    }
    setCheckoutError("");
    setCheckoutLoading(true);
    try {
      const result = await createCheckout("founding_500_monthly");
      window.location.href = result.checkout_url;
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Could not start checkout. Please try again.");
      setCheckoutLoading(false);
    }
  }

  return (
    <div className="landing-page" style={{ fontFamily: "'Aeonik', system-ui, sans-serif", background: "#fff", color: C.ink, minHeight: "100dvh", overflowX: "clip" }}>
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
        @keyframes drift1 {
          0%,100%{transform:translate(0,0) scale(1)}
          30%{transform:translate(80px,-60px) scale(1.12)}
          70%{transform:translate(-50px,70px) scale(0.92)}
        }
        @keyframes drift2 {
          0%,100%{transform:translate(0,0) scale(1)}
          40%{transform:translate(-70px,50px) scale(1.08)}
          80%{transform:translate(90px,-40px) scale(0.95)}
        }
        @keyframes drift3 {
          0%,100%{transform:translate(0,0) scale(1)}
          50%{transform:translate(60px,80px) scale(1.1)}
        }
        @keyframes gradShift {
          0%,100%{background-position:0% 50%}
          50%{background-position:100% 50%}
        }
        @keyframes wordIn {
          from{opacity:0;transform:translateY(18px) skewY(2deg)}
          to{opacity:1;transform:translateY(0) skewY(0deg)}
        }
        @keyframes lineGrow {
          from{width:0} to{width:100%}
        }
        @keyframes foundingTicker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes foundingDot {
          0%, 100% { opacity: .35; transform: scale(.85); }
          50% { opacity: 1; transform: scale(1); }
        }
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        a { text-decoration: none; }

        .landing-announcement { height: 38px; overflow: hidden; display: flex; align-items: center; background: #f5f4f2; border-bottom: 1px solid rgba(12,3,8,.05); color: rgba(12,3,8,.46); }
        .landing-announcement-track { display: flex; width: max-content; animation: foundingTicker 30s linear infinite; }
        .landing-announcement-group { display: flex; align-items: center; gap: 18px; padding: 0 24px; white-space: nowrap; }
        .landing-announcement-copy { font-size: 11px; font-weight: 700; letter-spacing: .08em; }
        .founding-ticker { width: min(100%, 1120px); margin: 0 auto 44px; overflow: hidden; border: 1px solid rgba(201,168,76,.22); border-radius: 999px; background: linear-gradient(90deg, rgba(61,14,26,.04), rgba(201,168,76,.1), rgba(61,14,26,.04)); }
        .founding-ticker-track { display: flex; width: max-content; animation: foundingTicker 26s linear infinite; }
        .founding-ticker-group { display: flex; align-items: center; gap: 18px; padding: 10px 18px; white-space: nowrap; }
        .founding-ticker-item { display: inline-flex; align-items: center; gap: 7px; color: ${C.wine}; font-size: 10px; font-weight: 800; letter-spacing: .07em; }
        .founding-ticker-item strong { color: ${C.gold}; }
        .founding-ticker-dot { width: 5px; height: 5px; border-radius: 50%; background: ${C.gold}; animation: foundingDot 1.8s ease-in-out infinite; }
        .founding-ticker-cta { display: inline-flex; align-items: center; gap: 7px; flex-shrink: 0; padding: 8px 15px; border-radius: 999px; background: ${C.wineMid}; color: #fff; font-size: 10px; font-weight: 800; letter-spacing: .01em; transition: background .18s, transform .18s; }
        .founding-ticker-cta:hover { background: ${C.wine}; transform: translateY(-1px); }
        @media (prefers-reduced-motion: reduce) {
          .landing-announcement-track, .founding-ticker-track, .founding-ticker-dot { animation: none !important; }
        }

        @media (max-width: 860px) {
          .feat-grid  { grid-template-columns: 1fr 1fr !important; }
          .step-grid  { grid-template-columns: 1fr 1fr !important; }
          .proof-grid, .feature-split { grid-template-columns: 1fr !important; gap: 36px !important; }
          .discover-grid, .testimonial-grid { grid-template-columns: 1fr !important; }
          .price-grid { grid-template-columns: 1fr !important; gap: 12px !important; max-width: 480px !important; margin-left: auto !important; margin-right: auto !important; }
          .faq-inner  { grid-template-columns: 1fr !important; gap: 40px !important; }
          section, .pad { padding-left: 24px !important; padding-right: 24px !important; }
          .nav-mid { display: none !important; }
          /* footer: logo + tagline full width, then 2×2 link cols */
          .foot-inner { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .foot-brand { grid-column: span 2 !important; }
        }

        @media (max-width: 560px) {
          .feat-grid  { grid-template-columns: 1fr !important; }
          .step-grid  { grid-template-columns: 1fr !important; }
          section, .pad {
            padding-left: 20px !important; padding-right: 20px !important;
            padding-top: 72px !important; padding-bottom: 72px !important;
          }
          nav { padding-left: 16px !important; padding-right: 16px !important; }
          .hero-ctas { flex-direction: column !important; align-items: stretch !important; }
          .hero-ctas a { text-align: center !important; justify-content: center !important; }
          .social-proof { flex-wrap: wrap !important; gap: 8px !important; justify-content: center !important; }
          /* footer single col on very small */
          .foot-inner { grid-template-columns: 1fr 1fr !important; }
          .foot-brand { grid-column: span 2 !important; }
          .foot-bottom { flex-direction: column !important; gap: 10px !important; align-items: flex-start !important; }
          .landing-nav { padding-left: 16px !important; padding-right: 16px !important; }
          .landing-nav { top: 34px !important; }
          .landing-nav-tagline { display: none !important; }
          .landing-nav-actions { gap: 3px !important; }
          .landing-nav-signin { padding-left: 6px !important; padding-right: 6px !important; }
          .landing-nav-start { padding-left: 13px !important; padding-right: 13px !important; }
          .landing-hero-inner { padding: 48px 20px 64px !important; }
          .landing-hero-title { font-size: clamp(46px, 14vw, 64px) !important; line-height: 0.96 !important; letter-spacing: -0.045em !important; }
          .landing-cta-meta { flex-wrap: wrap !important; gap: 12px !important; }
          .founding-ticker { border-radius: 16px; margin-bottom: 32px; }
          .founding-ticker-group { gap: 13px; padding-left: 14px; padding-right: 14px; }
          .founding-ticker-cta { padding: 8px 12px; font-size: 9px; }
          .landing-cursor-glow { display: none !important; }
        }

        @media (max-width: 380px) {
          .landing-nav { padding-left: 10px !important; padding-right: 10px !important; }
          .landing-nav-logo { gap: 7px !important; }
          .landing-nav-signin { padding-left: 4px !important; padding-right: 4px !important; font-size: 12px !important; }
          .landing-nav-start { padding-left: 10px !important; padding-right: 10px !important; font-size: 12px !important; }
        }
      `}</style>

      {/* ══ SLIM FOUNDING ANNOUNCEMENT ══ */}
      <div className="landing-announcement" aria-label="FOUNDING 500 · Lock in $19.99 per month while continuously subscribed · 500 places only">
        <div className="landing-announcement-track">
          {[0, 1].map(copy => (
            <div className="landing-announcement-group" aria-hidden={copy === 1} key={copy}>
              <span className="landing-announcement-copy">FOUNDING 500 · Lock in $19.99/mo while continuously subscribed · 500 places only →</span>
            </div>
          ))}
        </div>
      </div>

      {/* NAV */}
      <motion.nav initial={{ y: -14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        className="landing-nav"
        style={{ position: "fixed", top: 38, left: 0, right: 0, zIndex: 200, height: 58,
          display: "flex", alignItems: "center", padding: "0 48px",
          background: "rgba(255,255,255,0.86)", backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${C.border}` }}>
        <Link href="/" className="landing-nav-logo" style={{ display: "flex", alignItems: "center", gap: 10, marginRight: "auto", textDecoration: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="MyPullScore" style={{ height: 36, width: "auto", borderRadius: 8, display: "block", flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: C.ink, letterSpacing: "-0.02em", lineHeight: 1.2 }}>MyPullScore</span>
            <span className="landing-nav-tagline" style={{ fontSize: 9, color: C.muted, letterSpacing: "0.02em", lineHeight: 1.2 }}>Personal intelligence that grows with you.</span>
          </div>
        </Link>
        <div className="nav-mid" style={{ display: "flex", gap: 28, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {[["Discover","#discover"],["How it gets smarter","#howitworks"],["Pricing","#pricing"],["FAQ","#faq"]].map(([l,h])=>(
            <a key={l} href={h} style={{ fontSize: 13, color: C.muted, fontWeight: 500, transition: "color .18s" }}
              onMouseEnter={e=>(e.currentTarget.style.color=C.ink)} onMouseLeave={e=>(e.currentTarget.style.color=C.muted)}>{l}</a>
          ))}
        </div>
        <div className="landing-nav-actions" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/login" className="landing-nav-signin" style={{ fontSize: 13, color: C.muted, fontWeight: 500, padding: "6px 12px", transition: "color .18s" }}
            onMouseEnter={e=>(e.currentTarget.style.color=C.ink)} onMouseLeave={e=>(e.currentTarget.style.color=C.muted)}>Sign in</Link>
          <Link href="/register" className="landing-nav-start" style={{ fontSize: 13, fontWeight: 700, color: "#fff",
            background: C.ink, padding: "8px 18px", borderRadius: 99, transition: "opacity .18s, transform .18s" }}
            onMouseEnter={e=>{ e.currentTarget.style.opacity="0.85"; e.currentTarget.style.transform="scale(1.04)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.transform=""; }}>Get started</Link>
        </div>
      </motion.nav>

      {/* ══ HERO ══ */}
      <section style={{ paddingTop: 24, background: "#fff", overflow: "hidden", position: "relative", minHeight: "92vh", display: "flex", alignItems: "center" }}>

        {/* drifting gradient orbs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", left: "-8%", width: 640, height: 640,
            background: `radial-gradient(ellipse, ${C.wine}18 0%, transparent 68%)`,
            filter: "blur(2px)", animation: "drift1 18s ease-in-out infinite, morph 14s ease-in-out infinite" }} />
          <div style={{ position: "absolute", top: "20%", right: "-12%", width: 520, height: 520,
            background: `radial-gradient(ellipse, ${C.gold}16 0%, transparent 65%)`,
            filter: "blur(2px)", animation: "drift2 22s ease-in-out infinite, morph 18s ease-in-out 3s infinite" }} />
          <div style={{ position: "absolute", bottom: "-15%", left: "28%", width: 480, height: 480,
            background: `radial-gradient(ellipse, ${C.wineMid}10 0%, transparent 65%)`,
            filter: "blur(1px)", animation: "drift3 26s ease-in-out infinite, morph 20s ease-in-out 6s infinite" }} />
          {/* cursor glow */}
          <div className="landing-cursor-glow" style={{
            position: "fixed", width: 480, height: 480, borderRadius: "50%",
            background: `radial-gradient(ellipse, ${C.wine}0d 0%, transparent 60%)`,
            left: `${cursor.x * 100}vw`, top: `${cursor.y * 100}vh`,
            transform: "translate(-50%,-50%)",
            transition: "left 1.4s cubic-bezier(0.22,1,0.36,1), top 1.4s cubic-bezier(0.22,1,0.36,1)",
            pointerEvents: "none", zIndex: 1,
          }} />
        </div>

        <div className="landing-hero-inner" style={{ maxWidth: 800, margin: "0 auto", padding: "60px 32px 80px", textAlign: "center", position: "relative", zIndex: 2 }}>

          {/* clip-reveal headline */}
          <h1 className="landing-hero-title" style={{ fontSize: "clamp(56px,8vw,112px)", fontWeight: 800, lineHeight: 0.92,
            letterSpacing: "-0.055em", marginBottom: 32, fontFamily: "'Aeonik', system-ui, sans-serif" }}>
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "block", color: C.ink }}>
                Know yourself
              </motion.span>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "block",
                  background: `linear-gradient(118deg, ${C.wine}, #c72b4a, ${C.gold}, ${C.wine})`,
                  backgroundSize: "300% 300%", WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent", animation: "gradShift 4s ease infinite" }}>
                beyond what you think you know
              </motion.span>
            </span>
          </h1>

          {/* word-by-word subtitle */}
          <p style={{ fontSize: 18, color: "#666", lineHeight: 1.78, maxWidth: 500, margin: "0 auto 44px" }}>
            {"MyPullScore builds a living intelligence of you — learning from your patterns, responses and evidence over time to reveal how you actually operate.".split(" ").map((word, i) => (
              <span key={i} style={{ display: "inline-block", marginRight: "0.28em",
                opacity: 0, animation: "wordIn 0.5s ease forwards",
                animationDelay: `${0.9 + i * 0.05}s` }}>{word}</span>
            ))}
          </p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="hero-ctas"
            style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
            <Link href="/register"
              className="hero-cta-button"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                minWidth: 230, padding: "15px 28px", borderRadius: 99, background: C.ink, color: "#fff",
                fontSize: 15, fontWeight: 700, boxShadow: `0 16px 48px ${C.ink}28`,
                transition: "transform .18s, box-shadow .18s" }}
              onMouseEnter={e=>{ const el = e.currentTarget as HTMLElement; el.style.transform="scale(1.05)"; el.style.boxShadow=`0 22px 60px ${C.ink}40`; }}
              onMouseLeave={e=>{ const el = e.currentTarget as HTMLElement; el.style.transform=""; el.style.boxShadow=`0 16px 48px ${C.ink}28`; }}>
              Start My Pull Profile — Free <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
            </Link>
            <Link href="/upgrade"
              className="hero-cta-button"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                minWidth: 230, padding: "15px 28px", borderRadius: 99, background: C.wineMid, color: "#fff",
                fontSize: 15, fontWeight: 700, boxShadow: `0 16px 48px ${C.wineMid}28`,
                transition: "transform .18s, box-shadow .18s" }}
              onMouseEnter={e=>{ const el = e.currentTarget as HTMLElement; el.style.transform="scale(1.05)"; el.style.boxShadow=`0 22px 60px ${C.wineMid}40`; }}
              onMouseLeave={e=>{ const el = e.currentTarget as HTMLElement; el.style.transform=""; el.style.boxShadow=`0 16px 48px ${C.wineMid}28`; }}>
              Become a Founding Member <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
            </Link>
            <span style={{ flexBasis: "100%", fontSize: 13, color: C.muted, textAlign: "center" }}>About 5 minutes • No credit card required</span>
          </motion.div>

          {/* social proof */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
            className="social-proof"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
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
            <span style={{ fontSize: 13, color: C.muted }}>Built with early users globally</span>
          </motion.div>
        </div>
      </section>

      {/* ══ FOUNDING 500 OFFER — immediately after the hero ══ */}
      <section id="founding" style={{ padding: "32px 24px 72px", background: "#fff" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ position: "relative", overflow: "hidden", borderRadius: 24,
              background: "linear-gradient(135deg,rgba(26,10,16,0.96) 0%,rgba(61,14,26,0.94) 100%)",
              border: "1px solid rgba(201,168,76,0.18)", boxShadow: "0 8px 40px rgba(0,0,0,0.18), inset 0 1px 0 rgba(201,168,76,0.1)", padding: "28px 28px 24px" }}>
              <div style={{ position: "absolute", top: -60, right: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,168,76,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.22)", marginBottom: 10 }}>
                      <HugeiconsIcon icon={StarIcon} size={10} style={{ color: "rgba(201,168,76,0.8)" }} />
                      <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(201,168,76,0.85)" }}>The Founding 500</span>
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 4 }}>You&apos;re early. Make it count.</h2>
                    <p style={{ fontSize: 12, color: "rgba(245,240,232,0.4)", lineHeight: 1.6 }}>
                      Lock in <span style={{ color: "rgba(201,168,76,0.9)", fontWeight: 600 }}>$19.99/month</span> while continuously subscribed · Regular $24.99/month
                    </p>
                    <p style={{ fontSize: 12, color: "rgba(245,240,232,0.55)", lineHeight: 1.7, marginTop: 10 }}>
                      Join the first 500 members of The Pull and lock in <span style={{ color: "rgba(201,168,76,0.9)", fontWeight: 600 }}>Understand Me at $19.99/month</span> for as long as you remain subscribed.
                    </p>
                    <p style={{ fontSize: 11, color: "rgba(245,240,232,0.28)", lineHeight: 1.6, marginTop: 8 }}>
                      Regular price: $24.99/month. Founding Members also receive 7-day early access to Living Mastery when it launches.
                    </p>
                    <div style={{ display: "grid", gap: 8, marginTop: 16 }}>
                      {["Permanent Founding 500 badge + numbered Founder identity", "Founder certificate", "Early access to selected new features"].map(benefit => (
                        <div key={benefit} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <HugeiconsIcon icon={CheckmarkCircle01Icon} size={13} style={{ color: "rgba(201,168,76,0.8)", flexShrink: 0 }} />
                          <span style={{ fontSize: 11, color: "rgba(245,240,232,0.62)" }}>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
                      <span style={{ fontSize: 36, fontWeight: 800, color: "rgba(201,168,76,0.95)", lineHeight: 1, letterSpacing: "-0.03em" }}>$19</span>
                      <span style={{ fontSize: 13, color: "rgba(201,168,76,0.55)", paddingBottom: 4 }}>.99/mo</span>
                    </div>
                    <p style={{ fontSize: 9, color: "rgba(245,240,232,0.25)", textAlign: "right", marginTop: 2 }}>founding rate</p>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 10, color: "rgba(245,240,232,0.3)" }}>{foundingAvailability ? `${foundingAvailability.spots_claimed} spots claimed` : "Checking availability…"}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(201,168,76,0.7)" }}>{foundingAvailability ? `${foundingAvailability.spots_remaining} remaining` : ""}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 99, background: "rgba(245,240,232,0.06)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${foundingProgress}%`, borderRadius: 99, background: "linear-gradient(90deg,rgba(201,168,76,0.5),rgba(201,168,76,0.85))" }} />
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <HugeiconsIcon icon={LockIcon} size={10} style={{ color: "rgba(245,240,232,0.22)" }} />
                    <span style={{ fontSize: 10, color: "rgba(245,240,232,0.28)", fontStyle: "italic" }}>Rate locked while continuously subscribed</span>
                  </div>
                  <button type="button" disabled={foundingAvailability?.available === false || checkoutLoading} onClick={() => void handleFoundingCheckout()} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 99, background: "linear-gradient(135deg,#b8922a,#c9a84c,#e2c36a)", border: "none", cursor: checkoutLoading ? "wait" : "pointer", fontSize: 12, fontWeight: 800, color: "#1a0a10", boxShadow: "0 4px 20px rgba(201,168,76,0.3)", flexShrink: 0, opacity: foundingAvailability?.available === false || checkoutLoading ? 0.55 : 1 }}>
                    <HugeiconsIcon icon={AiSparklesIcon} size={12} />
                    {foundingAvailability?.available === false ? "Founding 500 Sold Out" : checkoutLoading ? "Opening Checkout…" : "Claim Founding Membership"}
                  </button>
                </div>
                {checkoutError && <p style={{ marginTop: 12, fontSize: 11, color: "#fca5a5" }}>{checkoutError}</p>}
              </div>
            </motion.div>
          </S>
        </div>
      </section>

      {/* ══ IMMEDIATE VISUAL PROOF ══ */}
      <section style={{ padding: "96px 64px", background: C.blush, borderTop: `1px solid ${C.border}` }} className="pad">
        <div className="proof-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: 56, alignItems: "center" }}>
          <S>
            <motion.div variants={up}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 13px", borderRadius: 99, background: `${C.wine}0d`, border: `1px solid ${C.wine}18`, marginBottom: 18 }}>
                <HugeiconsIcon icon={AiBrain01Icon} size={11} style={{ color: C.wine }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.wine, letterSpacing: "0.12em", textTransform: "uppercase" }}>Inside your Pull Profile</span>
              </div>
              <h2 style={{ fontSize: "clamp(30px,4.5vw,54px)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.02, margin: "0 0 18px", textWrap: "balance" }}>
                See the intelligence taking shape.
              </h2>
              <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, maxWidth: 390, marginBottom: 26 }}>
                Your first dashboard brings together the score, archetype, dimensions, and living story that your evidence is building.
              </p>
              <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 99, background: C.ink, color: "#fff", fontSize: 13, fontWeight: 700 }}>
                Build my profile <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </Link>
            </motion.div>
          </S>

          <S>
            <motion.div variants={up} style={{ borderRadius: 26, background: "#fff", border: `1px solid ${C.border}`, boxShadow: "0 20px 70px rgba(61,14,26,0.12)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <img src="/logo.jpg" alt="" style={{ width: 24, height: 24, borderRadius: 6 }} />
                  <span style={{ fontSize: 12, fontWeight: 800, color: C.ink }}>MyPullScore</span>
                </div>
                <span style={{ fontSize: 9, color: C.muted, letterSpacing: "0.14em", textTransform: "uppercase" }}>Living intelligence</span>
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 12, marginBottom: 12 }}>
                  <div style={{ borderRadius: 18, padding: "20px 18px", background: C.ink, color: "#fff", minHeight: 154 }}>
                    <p style={{ fontSize: 9, color: C.gold, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 18 }}>Your Pull Score</p>
                    <p style={{ fontSize: 64, fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.05em", marginBottom: 12 }}>78</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>Composite intelligence rating</p>
                  </div>
                  <div style={{ borderRadius: 18, padding: "20px 18px", background: C.blush, border: `1px solid ${C.border}`, minHeight: 154 }}>
                    <p style={{ fontSize: 9, color: C.wine, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 18 }}>Your Pull Archetype</p>
                    <p style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 10 }}>Emerging profile</p>
                    <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>A pattern becomes clearer as evidence accumulates.</p>
                  </div>
                </div>
                <div style={{ borderRadius: 18, padding: "18px", background: "#faf9f7", border: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                    <p style={{ fontSize: 9, color: C.wine, letterSpacing: "0.18em", textTransform: "uppercase" }}>Your Living Story</p>
                    <span style={{ fontSize: 10, color: C.muted }}>Evolving daily</span>
                  </div>
                  <p style={{ fontSize: 13, color: C.ink, lineHeight: 1.6, marginBottom: 14 }}>A clearer picture of how you feel, decide, connect, and respond.</p>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[72, 56, 84, 64, 76].map((height, i) => <span key={i} style={{ display: "block", flex: 1, height: 4, borderRadius: 99, background: i === 2 ? C.gold : `${C.wine}30` }} />)}
                  </div>
                </div>
              </div>
            </motion.div>
          </S>
        </div>
      </section>

      {/* ══ TRUST BAR ══ */}
      <section style={{ background: C.blush, borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`, padding: "28px 64px" }} className="pad">
        <S style={{ maxWidth: 900, margin: "0 auto" }}>
          <motion.div variants={up} style={{ display: "flex", alignItems: "center", justifyContent: "center",
            gap: 36, flexWrap: "wrap" }}>
            {[
              { icon: ShieldCheckIcon, label: "Private by design" },
              { icon: LockIcon,        label: "End-to-end encrypted" },
              { icon: Globe02Icon,     label: "Available worldwide" },
              { icon: SparklesIcon,    label: "No credit card required" },
            ].map(x => (
              <div key={x.label} style={{ display: "flex", alignItems: "center", gap: 8,
                fontSize: 13, color: C.muted, fontWeight: 500 }}>
                <HugeiconsIcon icon={x.icon} size={14} style={{ color: C.wine, opacity: 0.7 }} />
                {x.label}
              </div>
            ))}
          </motion.div>
        </S>
      </section>

      {/* ══ WHAT WILL I DISCOVER? ══ */}
      <section id="discover" style={{ padding: "110px 64px", background: "#fff" }} className="pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ maxWidth: 620, marginBottom: 54 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 13px", borderRadius: 99, background: `${C.wine}0d`, border: `1px solid ${C.wine}18`, marginBottom: 18 }}>
                <HugeiconsIcon icon={SparklesIcon} size={11} style={{ color: C.wine }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.wine, letterSpacing: "0.12em", textTransform: "uppercase" }}>What will I discover?</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px,5vw,58px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1.02, margin: 0, textWrap: "balance" }}>A clearer read on how you actually operate.</h2>
            </motion.div>
          </S>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="discover-grid">
            {[
              { icon: Analytics01Icon, label: "Pull Score", title: "Your pattern in motion.", text: "A living composite of emotional depth, communication, self-awareness, and behaviour." },
              { icon: AiSparklesIcon, label: "Pull Archetype", title: "The shape beneath the surface.", text: "A nuanced identity model that explains your recurring strengths, tensions, and blind spots." },
              { icon: BookOpen01Icon, label: "Living Story", title: "A profile that keeps learning.", text: "Your intelligence becomes more precise as new evidence changes what the system understands." },
            ].map(card => (
              <motion.div key={card.label} variants={up} whileHover={{ y: -4 }} style={{ borderRadius: 22, padding: "30px 26px", background: C.blush, border: `1px solid ${C.border}`, transition: "transform .2s" }}>
                <div style={{ width: 42, height: 42, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", border: `1px solid ${C.border}`, marginBottom: 28 }}>
                  <HugeiconsIcon icon={card.icon} size={18} style={{ color: C.wine }} />
                </div>
                <p style={{ fontSize: 10, color: C.gold, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 12 }}>{card.label}</p>
                <h3 style={{ fontSize: 21, color: C.ink, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 12 }}>{card.title}</h3>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.75, margin: 0 }}>{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ASK THE PULL ══ */}
      <section id="ask" style={{ padding: "110px 64px", background: C.wine }} className="pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="feature-split" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 72, alignItems: "center" }}>
            <S>
              <motion.div variants={up}>
                <div style={{ width: 52, height: 52, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.16)", marginBottom: 24 }}>
                  <HugeiconsIcon icon={AiBrain01Icon} size={24} style={{ color: C.gold }} />
                </div>
                <p style={{ fontSize: 10, color: C.gold, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>Ask The Pull</p>
                <h2 style={{ fontSize: "clamp(32px,4.5vw,54px)", color: "#fff", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.045em", marginBottom: 18 }}>Ask better questions because it knows your context.</h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.58)", lineHeight: 1.8, maxWidth: 420, marginBottom: 26 }}>Talk to an intelligence assistant that has your evolving profile in view. Get honest, contextual answers instead of generic advice.</p>
                <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 99, background: "#fff", color: C.ink, fontSize: 13, fontWeight: 800 }}>Meet Ask The Pull <HugeiconsIcon icon={ArrowRight01Icon} size={14} /></Link>
              </motion.div>
            </S>
            <S>
              <motion.div variants={up} style={{ borderRadius: 24, padding: 22, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.09)", marginBottom: 18 }}>
                  <img src="/logo.jpg" alt="" style={{ width: 28, height: 28, borderRadius: 7 }} />
                  <div><p style={{ fontSize: 12, fontWeight: 800, color: "#fff", margin: 0 }}>Ask The Pull</p><p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", margin: 0 }}>Your intelligence profile is in context</p></div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ alignSelf: "flex-end", maxWidth: "78%", padding: "12px 14px", borderRadius: "16px 16px 4px 16px", background: "rgba(201,168,76,0.16)", color: "rgba(255,255,255,0.8)", fontSize: 12, lineHeight: 1.6 }}>Why do I keep going quiet when something matters?</div>
                  <div style={{ maxWidth: "86%", padding: "14px 16px", borderRadius: "16px 16px 16px 4px", background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.68)", fontSize: 12, lineHeight: 1.7 }}>Your profile is learning a pattern around pressure and self-protection. Let&apos;s look at the moment before you go quiet.</div>
                </div>
              </motion.div>
            </S>
          </div>
        </div>
      </section>

      {/* ══ REALITY CHECK ══ */}
      <section id="reality-check" style={{ padding: "110px 64px", background: C.blush }} className="pad">
        <div className="feature-split" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 72, alignItems: "center" }}>
          <S>
            <motion.div variants={up} style={{ borderRadius: 24, background: "#fff", border: `1px solid ${C.border}`, padding: 28, boxShadow: "0 18px 60px rgba(61,14,26,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}><span style={{ fontSize: 10, color: C.wine, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" }}>Reality Check</span><HugeiconsIcon icon={Target01Icon} size={18} style={{ color: C.gold }} /></div>
              <p style={{ fontSize: 22, color: C.ink, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 20 }}>Pause the story. See the pattern.</p>
              <div style={{ height: 1, background: C.border, marginBottom: 20 }} />
              {["What happened", "What you felt", "What you might be protecting", "What to try next"].map((label, i) => <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: i === 2 ? C.gold : `${C.wine}50` }} /><span style={{ fontSize: 12, color: C.muted }}>{label}</span><span style={{ marginLeft: "auto", fontSize: 10, color: C.wine }}>{i === 2 ? "signal found" : "mapped"}</span></div>)}
            </motion.div>
          </S>
          <S>
            <motion.div variants={up}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 13px", borderRadius: 99, background: "#fff", border: `1px solid ${C.border}`, marginBottom: 18 }}><HugeiconsIcon icon={Target01Icon} size={11} style={{ color: C.wine }} /><span style={{ fontSize: 10, fontWeight: 700, color: C.wine, letterSpacing: "0.12em", textTransform: "uppercase" }}>Reality Check</span></div>
              <h2 style={{ fontSize: "clamp(32px,4.5vw,54px)", color: C.ink, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.045em", marginBottom: 18 }}>Clarity when your own narrative gets loud.</h2>
              <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, maxWidth: 410 }}>Bring a situation, a reaction, or a decision. Reality Check helps separate the facts from the story you are carrying about them.</p>
            </motion.div>
          </S>
        </div>
      </section>

      {/* ══ HOW LIVING INTELLIGENCE GETS SMARTER ══ */}
      <section id="howitworks" style={{ padding: "110px 64px", background: C.ink }} className="pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ textAlign: "center", maxWidth: 650, margin: "0 auto 58px" }}>
              <p style={{ fontSize: 10, color: C.gold, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 18 }}>How living intelligence gets smarter</p>
              <h2 style={{ fontSize: "clamp(34px,5vw,60px)", color: "#fff", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.05em", marginBottom: 16 }}>Every answer becomes better evidence.</h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>Your profile is not a finished test. It is a living model that updates as your real life gives it more to understand.</p>
            </motion.div>
          </S>
          <div className="step-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[
              { n: "01", title: "You share", text: "Answer a question, write a moment, or bring a situation to The Pull." },
              { n: "02", title: "QIE structures it", text: "Your response becomes organised trait evidence instead of an isolated answer." },
              { n: "03", title: "Engines learn", text: "Relevant intelligence engines update their evidence and confidence states." },
              { n: "04", title: "Your profile evolves", text: "Score, archetype, story, and next questions become more precise." },
            ].map((step, i) => <motion.div key={step.n} variants={up} style={{ padding: "28px 22px", borderRadius: 20, background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.08)" }}><div style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: C.wineMid, color: "#fff", fontSize: 11, fontWeight: 900, marginBottom: 24 }}>{step.n}</div><h3 style={{ fontSize: 16, color: "#fff", marginBottom: 9 }}>{step.title}</h3><p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.42)", lineHeight: 1.7, margin: 0 }}>{step.text}</p>{i < 3 && <div style={{ display: "none" }} />}</motion.div>)}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS / SOCIAL PROOF ══ */}
      <section id="testimonials" style={{ padding: "100px 64px", background: C.blush }} className="pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ textAlign: "center", marginBottom: 48 }}><p style={{ fontSize: 10, color: C.wine, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>What people are saying</p><h2 style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 800, letterSpacing: "-0.045em", margin: 0 }}>Recognition feels different when it is personal.</h2></motion.div>
          </S>
          <div className="testimonial-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[{ q: "MyPullScore showed me patterns I had been feeling but could not name.", name: "Amara J.", role: "Lagos, Nigeria", color: "#9b3050" }, { q: "Reality Check gave me the pause I needed before making the same choice again.", name: "Marcus W.", role: "New York, USA", color: "#4a6fa5" }, { q: "Ask The Pull feels contextual in a way ordinary advice never has.", name: "Sasha K.", role: "London, UK", color: "#5a8a5a" }].map(t => <motion.div key={t.name} variants={up} style={{ borderRadius: 20, padding: "28px 24px", background: "#fff", border: `1px solid ${C.border}` }}><div style={{ display: "flex", gap: 2, marginBottom: 18 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ color: C.gold, fontSize: 11 }}>★</span>)}</div><p style={{ fontSize: 14, color: C.ink, lineHeight: 1.8, marginBottom: 24 }}>“{t.q}”</p><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 32, height: 32, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 800 }}>{t.name[0]}</div><div><p style={{ fontSize: 12, fontWeight: 800, margin: 0 }}>{t.name}</p><p style={{ fontSize: 10, color: C.muted, margin: 0 }}>{t.role}</p></div></div></motion.div>)}
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section id="features" style={{ display: "none", padding: "110px 64px", background: "#fff" }} className="pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ marginBottom: 56 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 13px",
                borderRadius: 99, background: `${C.wine}0d`, border: `1px solid ${C.wine}18`, marginBottom: 18 }}>
                <HugeiconsIcon icon={SparklesIcon} size={11} style={{ color: C.wine }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.wine,
                  letterSpacing: "0.12em", textTransform: "uppercase" }}>What you get</span>
              </div>
              <h2 style={{ fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 800,
                letterSpacing: "-0.04em", lineHeight: 1.06, textWrap: "balance", maxWidth: 480, margin: 0 }}>
                Every tool to understand yourself deeply
              </h2>
            </motion.div>
          </S>
          <S>
              {/* Hero Ask The Pull card — full width */}
            <motion.div variants={up} whileHover={{ y: -3 }}
              style={{ borderRadius: 24, marginBottom: 12,
                background: `linear-gradient(135deg, ${C.wine} 0%, #5c1124 100%)`,
                padding: "40px 36px", cursor: "default", position: "relative", overflow: "hidden",
                transition: "transform .2s" }}>
              <div style={{ position: "absolute", top: "-40%", right: "-5%", width: 320, height: 320,
                background: `radial-gradient(ellipse, ${C.gold}20 0%, transparent 65%)`, pointerEvents: "none" }} />
              <div style={{ position: "relative", display: "flex", gap: 40, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ flex: "1 1 240px" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center",
                    justifyContent: "center", marginBottom: 20 }}>
                    <HugeiconsIcon icon={AiBrain01Icon} size={22} style={{ color: "#fff" }} />
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 12, letterSpacing: "-0.02em" }}>Ask The Pull</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: 0 }}>
                    Real conversations with an AI that knows your complete intelligence profile. Honest, contextual, always available.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: "0 0 auto", alignSelf: "flex-end" }}>
                  {["Contextual","Always on","Profile-aware"].map(t => (
                    <span key={t} style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)",
                      background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                      padding: "6px 14px", borderRadius: 99, whiteSpace: "nowrap" }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 2-col grid for remaining 5 features */}
            <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
              {[
                { icon: BookOpen01Icon, title: "Smart Journal", desc: "Log real moments. The AI extracts emotional signals and feeds them into your evolving profile.", bg: C.blush },
                ...FEATURES.slice(2),
              ].map((f) => (
                <motion.div key={f.title} variants={up} whileHover={{ y: -3 }}
                  style={{ borderRadius: 20, padding: "26px 22px",
                    background: "bg" in f && f.bg ? f.bg : "#fff",
                    border: `1px solid ${C.border}`, cursor: "default", transition: "transform .2s" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: `${C.wine}0a`,
                    border: `1px solid ${C.wine}14`, display: "flex", alignItems: "center",
                    justifyContent: "center", marginBottom: 16 }}>
                    <HugeiconsIcon icon={f.icon} size={16} style={{ color: C.wine }} />
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 7 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.75 }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </S>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="legacy-howitworks" style={{ display: "none", padding: "110px 64px", background: C.ink }} className="pad">
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
            <div className="step-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {[
                { icon: UserCircleIcon, n: "01", title: "Create account",      desc: "Sign up with email or Google. Under a minute, no card required." },
                { icon: Activity01Icon,  n: "02", title: "5-min assessment",    desc: "Answer focused questions about your patterns and tendencies." },
                { icon: Analytics01Icon, n: "03", title: "Get your Pull Score", desc: "Your score, archetype, and full profile generated instantly." },
                { icon: TrendingUpIcon,  n: "04", title: "Keep growing",        desc: "Every session deepens and refines your intelligence profile." },
              ].map((s, i) => (
                <motion.div key={s.n} variants={up}
                  style={{ padding: "36px 28px", background: "rgba(255,255,255,0.04)",
                    borderRadius: 20, border: "1px solid rgba(255,255,255,0.07)", position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${C.wine}, #9b2040)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 900, color: "#fff", letterSpacing: "0.04em",
                      flexShrink: 0, boxShadow: `0 0 20px ${C.wine}50` }}>
                      {s.n}
                    </div>
                    {i < 3 && (
                      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.15), transparent)" }} />
                    )}
                  </div>
                  <div style={{ width: 38, height: 38, borderRadius: 11,
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <HugeiconsIcon icon={s.icon} size={16} style={{ color: "rgba(255,255,255,0.55)" }} />
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.01em" }}>{s.title}</p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.72 }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </S>

          <S style={{ marginTop: 48 }}>
            <motion.div variants={up} style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.18em", textTransform: "uppercase" }}>What people are saying</p>
            </motion.div>
            <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {[
                { q: "I've been to therapy for years. MyPullScore showed me patterns in 2 weeks that took me years to see.", name: "Amara J.", role: "Lagos, Nigeria", color: "#9b3050" },
                { q: "The Reality Check feature is wild. It told me exactly what I was doing before I could admit it.", name: "Marcus W.", role: "New York, USA", color: "#4a6fa5" },
                { q: "Talking to Ask The Pull feels like someone who knows my whole life history. Genuinely shocking.", name: "Sasha K.", role: "London, UK", color: "#5a8a5a" },
              ].map(t => (
                <motion.div key={t.name} variants={up}
                  whileHover={{ y: -3 }}
                  style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.07)",
                    padding: "28px 24px", background: "rgba(255,255,255,0.03)",
                    transition: "transform .2s" }}>
                  <div style={{ display: "flex", gap: 1, marginBottom: 20 }}>
                    {[1,2,3,4,5].map(i => <span key={i} style={{ color: C.gold, fontSize: 11 }}>★</span>)}
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.82,
                    marginBottom: 24 }}>&ldquo;{t.q}&rdquo;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%",
                      background: t.color, border: "2px solid rgba(255,255,255,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{t.name[0]}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{t.name}</p>
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
      <section id="pricing" style={{ padding: "110px 64px", background: "#fff" }} className="pad">
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 13px",
                borderRadius: 99, background: `${C.wine}0d`, border: `1px solid ${C.wine}18`, marginBottom: 18 }}>
                <HugeiconsIcon icon={StarIcon} size={11} style={{ color: C.wine }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.wine,
                  letterSpacing: "0.12em", textTransform: "uppercase" }}>Pricing</span>
              </div>
              <h2 style={{ fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 800,
                letterSpacing: "-0.04em", lineHeight: 1.06, marginBottom: 12 }}>
                Choose how deeply you want to know yourself.
              </h2>
              <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8 }}>
                Start free. Let The Pull learn you over time.
              </p>
            </motion.div>

            {/* Founding 500 banner */}
            <motion.div variants={up} style={{ borderRadius: 18, marginBottom: 16,
              background: "linear-gradient(135deg, #1a0a10 0%, #0c0308 100%)",
              border: "1px solid rgba(201,168,76,0.2)", padding: "20px 28px",
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ padding: "4px 12px", borderRadius: 99,
                  background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)" }}>
                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.22em",
                    textTransform: "uppercase" as const, color: C.gold }}>Founding 500</span>
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                  Lock in <strong style={{ color: C.gold }}>$19.99/month</strong> while continuously subscribed — {foundingAvailability ? `${foundingAvailability.spots_remaining} spots remaining` : "limited founding spots"}
                </p>
              </div>
              <div style={{ height: 4, borderRadius: 99, background: "rgba(255,255,255,0.06)",
                overflow: "hidden", width: 160, flexShrink: 0 }}>
                <div style={{ height: "100%", width: `${foundingProgress}%`, borderRadius: 99,
                  background: "linear-gradient(90deg, rgba(201,168,76,0.5), rgba(201,168,76,0.9))" }} />
              </div>
            </motion.div>

            {/* 3 pricing cards */}
            <div className="price-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>

              {/* LEARN ME — Free */}
              <motion.div variants={up} style={{ borderRadius: 24, border: `1.5px solid ${C.border}`,
                padding: "32px 28px", display: "flex", flexDirection: "column", background: "#faf9f7" }}>
                <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em",
                  textTransform: "uppercase" as const, color: C.wine, marginBottom: 16 }}>Learn Me</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 4 }}>
                  <span style={{ fontSize: 52, fontWeight: 900, color: C.ink, letterSpacing: "-0.05em", lineHeight: 1 }}>$0</span>
                </div>
                <p style={{ fontSize: 12, color: C.muted, marginBottom: 28 }}>Free forever</p>
                <Link href="/register" style={{ display: "flex", alignItems: "center",
                  justifyContent: "center", padding: "12px 0", borderRadius: 99,
                  border: `1.5px solid ${C.border}`, color: C.ink,
                  fontSize: 13, fontWeight: 700, marginBottom: 28, transition: "background .18s, border-color .18s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=C.ink; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor=C.ink; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background=""; e.currentTarget.style.color=C.ink; e.currentTarget.style.borderColor=""; }}>
                  Get started free
                </Link>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 11 }}>
                  {["Your Pull Score","Your Pull Archetype","Foundational intelligence","Ask The Pull — 5x/month","Living profile that grows with you"].map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13} style={{ color: "#ccc", flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontSize: 12.5, color: "#888", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* UNDERSTAND ME — $24.99 */}
              <motion.div variants={up} whileHover={{ y: -4 }}
                style={{ borderRadius: 24, background: C.wine, padding: "32px 28px",
                  position: "relative", overflow: "hidden",
                  boxShadow: `0 20px 60px ${C.wine}30`,
                  display: "flex", flexDirection: "column", transition: "transform .2s" }}>
                <div style={{ position: "absolute", top: "-30%", right: "-15%", width: 240, height: 240,
                  background: "radial-gradient(ellipse, rgba(192,64,79,0.4) 0%, transparent 65%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: 16, right: 16, padding: "4px 10px",
                  borderRadius: 99, background: C.gold, color: C.ink,
                  fontSize: 8, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
                  Most chosen
                </div>
                <div style={{ position: "relative" }}>
                  <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em",
                    textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>Understand Me</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 4 }}>
                    <span style={{ fontSize: 52, fontWeight: 900, color: "#fff", letterSpacing: "-0.05em", lineHeight: 1 }}>$24</span>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", paddingBottom: 4 }}>.99/mo</span>
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24,
                    padding: "4px 10px", borderRadius: 99, background: `rgba(201,168,76,0.12)`,
                    border: "1px solid rgba(201,168,76,0.25)" }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: C.gold }}>Founding 500 · $19.99 locked while subscribed</span>
                  </div>
                  <Link href="/upgrade" style={{ display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 7, padding: "12px 0", borderRadius: 99,
                    background: "#fff", color: C.ink, fontSize: 13, fontWeight: 800, marginBottom: 28,
                    transition: "transform .18s, box-shadow .18s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.03)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.18)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
                    Start Understand Me <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                  </Link>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                    {["Everything in Free","Deeper Intelligence Access","Full Living Intelligence History","Ask The Pull (Unlimited)","Reality Check","Priority Processing"].map((f, i) => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13}
                          style={{ color: i === 0 ? "rgba(255,255,255,0.25)" : "rgba(192,64,79,0.9)", flexShrink: 0, marginTop: 1 }} />
                        <span style={{ fontSize: 12.5, lineHeight: 1.5,
                          color: i === 0 ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.8)",
                          fontWeight: i === 0 ? 600 : 400 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* KNOW ME — $69.99 */}
              <motion.div variants={up} whileHover={{ y: -4 }}
                style={{ borderRadius: 24, padding: "32px 28px",
                  background: "linear-gradient(150deg, #0d0608 0%, #1a0c12 100%)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  boxShadow: "0 16px 56px rgba(0,0,0,0.22)",
                  display: "flex", flexDirection: "column", transition: "transform .2s" }}>
                <div style={{ position: "relative" }}>
                  <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em",
                    textTransform: "uppercase" as const, color: "rgba(201,168,76,0.6)", marginBottom: 16 }}>Know Me</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 4 }}>
                    <span style={{ fontSize: 52, fontWeight: 900, color: "#fff", letterSpacing: "-0.05em", lineHeight: 1 }}>$69</span>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", paddingBottom: 4 }}>.99/mo</span>
                  </div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 24 }}>or $699/year — save $140</p>
                  <Link href="/upgrade" style={{ display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 7, padding: "12px 0", borderRadius: 99,
                    background: "linear-gradient(135deg, #b8922a, #c9a84c, #e2c36a)",
                    color: "#1a0a10", fontSize: 13, fontWeight: 800, marginBottom: 28,
                    transition: "transform .18s, box-shadow .18s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.03)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(201,168,76,0.4)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
                    Start Know Me <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                  </Link>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                    {["Everything in Understand Me","Deep Synthesis insights","How Your Intelligence Is Evolving","Cross-engine analysis","Priority Feature Access"].map((f, i) => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13}
                          style={{ color: i === 0 ? "rgba(255,255,255,0.2)" : "rgba(201,168,76,0.7)", flexShrink: 0, marginTop: 1 }} />
                        <span style={{ fontSize: 12.5, lineHeight: 1.5,
                          color: i === 0 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.65)",
                          fontWeight: i === 0 ? 600 : 400 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div variants={up} style={{ textAlign: "center", marginTop: 20 }}>
              <p style={{ fontSize: 12, color: C.muted }}>Cancel any time · No surprise charges · Founding 500 rate locked while subscribed</p>
            </motion.div>
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
                  letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>Keep discovering</p>
                <h2 style={{ fontSize: "clamp(40px,6vw,76px)", fontWeight: 800, color: "#fff",
                  letterSpacing: "-0.05em", lineHeight: 0.97, marginBottom: 22 }}>
                  Your first result isn&apos;t the conclusion.<br />It&apos;s the beginning.
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: 1.8,
                  maxWidth: 520, margin: "0 auto 38px" }}>
                  MyPullScore continues learning as evidence accumulates, revealing a clearer and more useful understanding of how you actually operate.
                </p>
                <div className="hero-ctas" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 0 }}>
                  <Link href="/register" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
                    minWidth: 170, padding: "15px 28px", borderRadius: 99, background: "#fff", color: C.ink,
                    fontSize: 15, fontWeight: 800, transition: "transform .18s, box-shadow .18s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.05)"; e.currentTarget.style.boxShadow="0 12px 40px rgba(255,255,255,0.2)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
                    Start Free <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
                  </Link>
                  <Link href="/upgrade" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
                    minWidth: 230, padding: "15px 28px", borderRadius: 99, background: C.wineMid, color: "#fff",
                    fontSize: 15, fontWeight: 800, transition: "transform .18s, box-shadow .18s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.05)"; e.currentTarget.style.boxShadow="0 12px 40px rgba(124,26,46,0.32)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
                    Become a Founding Member <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
                  </Link>
                </div>
                <div className="landing-cta-meta" style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 32 }}>
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
      <footer style={{ background: C.blush, borderTop: `1px solid ${C.border}`, padding: "56px 64px 0" }} className="pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="foot-inner" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 32, paddingBottom: 48, borderBottom: `1px solid ${C.border}` }}>
            {/* Brand col */}
            <div className="foot-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.jpg" alt="MyPullScore" style={{ height: 32, width: "auto", borderRadius: 7, display: "block", marginBottom: 14 }} />
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8, maxWidth: 200, marginBottom: 20 }}>
                Your Personal Intelligence, that understands and grows with you.
              </p>
              <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 13, fontWeight: 700, color: "#fff", background: C.ink,
                padding: "10px 18px", borderRadius: 99, transition: "opacity .18s, transform .18s" }}
                onMouseEnter={e=>{ e.currentTarget.style.opacity="0.82"; e.currentTarget.style.transform="scale(1.04)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.transform=""; }}>
                Start Free <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
              </Link>
            </div>
            {/* Link cols */}
            {[
              { title: "Product",   links: [{ label: "Pull Score", href: null },{ label: "Ask The Pull", href: null },{ label: "Reality Check", href: null },{ label: "Journal", href: null },{ label: "Pricing", href: null }] },
              { title: "Company",   links: [{ label: "About", href: null },{ label: "Blog", href: null },{ label: "Contact", href: null }] },
              { title: "Legal",     links: [{ label: "Privacy", href: "/privacy" },{ label: "Terms", href: "/terms" },{ label: "Security", href: null }] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "#bbb", marginBottom: 16 }}>{col.title}</p>
                {col.links.map(l => (
                  l.href
                    ? <Link key={l.label} href={l.href} style={{ display: "block", fontSize: 13, color: C.muted, marginBottom: 11, textDecoration: "none", transition: "color .18s" }}
                        onMouseEnter={e=>(e.currentTarget.style.color=C.ink)}
                        onMouseLeave={e=>(e.currentTarget.style.color=C.muted)}>{l.label}</Link>
                    : <p key={l.label} style={{ fontSize: 13, color: C.muted, marginBottom: 11, cursor: "default" }}>{l.label}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="foot-bottom" style={{ display: "flex", justifyContent: "space-between",
            alignItems: "center", padding: "20px 0" }}>
            <p style={{ fontSize: 12, color: "#ccc" }}>© MyPullScore 2026</p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Terms","Privacy"].map(l => (
                <Link key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: 12, color: "#bbb" }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
        <p style={{ fontSize: "clamp(36px,8vw,100px)", fontWeight: 900, color: "rgba(0,0,0,0.04)",
          textAlign: "center", letterSpacing: "-0.05em", lineHeight: 0.9, userSelect: "none",
          overflow: "hidden", marginTop: 0 }}>
          MyPullScore
        </p>
      </footer>
    </div>
  );
}
