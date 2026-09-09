"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiBrain01Icon, BookOpen01Icon, Analytics01Icon, SparklesIcon,
  ShieldCheckIcon, ArrowRight01Icon, CheckmarkCircle02Icon,
  ChartLineData03Icon, UserCircleIcon, FlashIcon, Target01Icon,
  EyeIcon, Activity01Icon, StarIcon, CompassIcon, LockIcon,
  Globe02Icon, TrendingUpIcon, ArrowDown01Icon, Message02Icon,
  ShieldKeyIcon, HeartCheckIcon, MymindIcon,
} from "@hugeicons/core-free-icons";

const W = "#3d0e1a", G = "#c9a84c", CR = "#f5f0e8";

/* ─── Neural Brain Canvas ─── */
function BrainCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const NODE_COUNT = 60;
    interface Node { x: number; y: number; vx: number; vy: number; r: number; pulse: number; speed: number; }
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 3 + 1.5,
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
    }));

    interface Signal { from: number; to: number; progress: number; speed: number; color: string; }
    const signals: Signal[] = [];
    const COLORS = [W, G, "#a78bfa", "#60a5fa"];

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // spawn signal
      if (frame % 18 === 0 && signals.length < 20) {
        const fi = Math.floor(Math.random() * NODE_COUNT);
        const ti = Math.floor(Math.random() * NODE_COUNT);
        if (fi !== ti) signals.push({ from: fi, to: ti, progress: 0, speed: 0.008 + Math.random() * 0.012, color: COLORS[Math.floor(Math.random() * COLORS.length)] });
      }

      // update nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += n.speed;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // draw connections
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(61,14,26,${0.07 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // draw signals
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        const a = nodes[s.from], b = nodes[s.to];
        const px = a.x + (b.x - a.x) * s.progress;
        const py = a.y + (b.y - a.y) * s.progress;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
        // glow
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = s.color + "33";
        ctx.fill();
        s.progress += s.speed;
        if (s.progress >= 1) signals.splice(i, 1);
      }

      // draw nodes
      nodes.forEach(n => {
        const pulse = Math.sin(n.pulse) * 0.5 + 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = W + "cc";
        ctx.fill();
        // outer ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse + 2, 0, Math.PI * 2);
        ctx.strokeStyle = W + "22";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block" }} />;
}

/* ─── Live Counter ─── */
function LiveCounter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0; const step = end / 60;
    const iv = setInterval(() => { start += step; if (start >= end) { setVal(end); clearInterval(iv); } else setVal(Math.floor(start)); }, 16);
    return () => clearInterval(iv);
  }, [inView, end]);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <p style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, color: "#1a0a10", letterSpacing: "-0.04em", lineHeight: 1 }}>{val.toLocaleString()}{suffix}</p>
      <p style={{ fontSize: 13, color: "#888", marginTop: 6 }}>{label}</p>
    </div>
  );
}

/* ─── Floating Profile Card ─── */
function FloatingCard({ style, name, score, archetype, delta }: { style?: React.CSSProperties; name: string; score: number; archetype: string; delta: string }) {
  return (
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 + Math.random() * 2, ease: "easeInOut" }}
      style={{ position: "absolute", background: "#fff", borderRadius: 16, padding: "14px 18px", boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 1px 0 rgba(0,0,0,0.04)", width: 200, ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${W}, #c0404f)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff" }}>{name[0]}</div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#1a0a10" }}>{name}</p>
          <p style={{ fontSize: 10, color: "#aaa" }}>{archetype}</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontSize: 28, fontWeight: 900, color: "#1a0a10", letterSpacing: "-0.04em" }}>{score}</span>
        <span style={{ fontSize: 11, color: "#34d399", fontWeight: 700 }}>{delta}</span>
      </div>
      <div style={{ marginTop: 8, height: 3, borderRadius: 99, background: "#f0f0f0" }}>
        <div style={{ height: "100%", width: `${score}%`, borderRadius: 99, background: `linear-gradient(90deg, ${W}, #c0404f)` }} />
      </div>
    </motion.div>
  );
}

/* ─── Section wrapper ─── */
function S({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="h" animate={inView ? "s" : "h"} variants={{ h: {}, s: { transition: { staggerChildren: 0.09 } } }} style={style}>
      {children}
    </motion.div>
  );
}
const up = { h: { opacity: 0, y: 28 }, s: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } } };

const FEATURES = [
  { icon: AiBrain01Icon,     title: "AI Coach",          desc: "Deep, personalised conversations with an AI that knows your full intelligence profile.",     color: "#c0404f" },
  { icon: BookOpen01Icon,    title: "Smart Journal",     desc: "Log real moments. AI extracts emotional signals from every entry automatically.",             color: "#60a5fa" },
  { icon: Analytics01Icon,   title: "Pull Score",        desc: "A composite intelligence score tracking emotional depth, communication, and self-awareness.", color: G },
  { icon: Target01Icon,      title: "Reality Check",     desc: "Pause on any situation. Get an honest AI perspective that cuts through your narratives.",     color: "#a78bfa" },
  { icon: CompassIcon,       title: "Journey Map",       desc: "Milestones, breakthroughs, and archetype evolution plotted on your personal timeline.",       color: "#34d399" },
  { icon: EyeIcon,           title: "Auto Detection",    desc: "Surfaces recurring behavioural signals before they become invisible habits.",                  color: "#f97316" },
];

const FAQS = [
  { q: "What does MyPullScore actually do?", a: "It maps every pattern, tendency, and blind spot in your personality into a living intelligence profile — updated every time you share a moment." },
  { q: "What is the Pull Score?", a: "A composite intelligence rating built from emotional depth, communication style, self-awareness, and relationship patterns. It evolves as you use the app." },
  { q: "How is this different from a personality test?", a: "Personality tests give a one-time snapshot. MyPullScore is a living model — it evolves from your daily entries, coach conversations, and real moments." },
  { q: "Is my data private?", a: "Yes. Your data is encrypted end-to-end, never sold, and only ever used to build your personal intelligence profile." },
  { q: "Can I start for free?", a: "Yes. The free plan gives you your Pull Score, primary archetype, and 5 monthly coach sessions with no credit card required." },
  { q: "How quickly will I see results?", a: "Your first Pull Score and archetype are generated immediately after your onboarding assessment — usually within 5 minutes." },
];

export default function LandingPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [liveCount] = useState(2847 + Math.floor(Math.random() * 200));
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOp = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#fff", color: "#1a0a10", overflowX: "hidden" }}>

      {/* ══ NAV ══ */}
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 64, display: "flex", alignItems: "center", padding: "0 48px", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginRight: "auto" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, overflow: "hidden", position: "relative" }}>
            <Image src="/logo.jpg" alt="MyPullScore" fill style={{ objectFit: "cover" }} />
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, color: "#1a0a10", letterSpacing: "-0.02em" }}>MyPullScore</span>
        </Link>
        <div style={{ display: "flex", gap: 32, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {[["Features", "#features"], ["How it works", "#howitworks"], ["Pricing", "#pricing"], ["FAQ", "#faq"]].map(([l, h]) => (
            <a key={l} href={h} style={{ fontSize: 13, color: "#777", textDecoration: "none", fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1a0a10")} onMouseLeave={e => (e.currentTarget.style.color = "#777")}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/login" style={{ fontSize: 13, fontWeight: 600, color: "#888", textDecoration: "none", padding: "8px 16px" }}>Sign in</Link>
          <Link href="/register" style={{ fontSize: 13, fontWeight: 700, color: "#fff", background: "#1a0a10", padding: "9px 20px", borderRadius: 99, textDecoration: "none" }}>Get started free</Link>
        </div>
      </motion.nav>

      {/* ══ LIVE BANNER ══ */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        style={{ position: "fixed", bottom: 28, left: 28, zIndex: 100, background: "#fff", borderRadius: 99, padding: "10px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 1px 0 rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 10 }}>
        <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2 }}
          style={{ width: 8, height: 8, borderRadius: "50%", background: "#34d399", flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#1a0a10" }}>{liveCount.toLocaleString()} people active right now</span>
      </motion.div>

      {/* ══ HERO ══ */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 64 }}>
        {/* brain canvas full bg */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.55 }}>
          <BrainCanvas />
        </div>
        {/* subtle gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.85) 60%, #fff 100%)", pointerEvents: "none" }} />

        <motion.div style={{ y: heroY, opacity: heroOp, position: "relative", width: "100%", padding: "0 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 8px", borderRadius: 99, background: "rgba(61,14,26,0.06)", border: "1px solid rgba(61,14,26,0.1)", marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(61,14,26,0.1)", padding: "3px 10px", borderRadius: 99 }}>
                <HugeiconsIcon icon={SparklesIcon} size={11} style={{ color: W }} />
                <span style={{ fontSize: 10, fontWeight: 800, color: W, letterSpacing: "0.1em", textTransform: "uppercase" }}>New</span>
              </div>
              <span style={{ fontSize: 12, color: "#666" }}>Relationship intelligence now in beta</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={12} style={{ color: "#aaa" }} />
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: "clamp(52px, 8vw, 100px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.05em", maxWidth: 900, marginBottom: 28 }}>
            <span style={{ color: "#1a0a10" }}>Know yourself</span><br />
            <span style={{ background: `linear-gradient(135deg, ${W} 0%, #c0404f 40%, ${G} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>at a deeper level.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: 19, color: "#666", lineHeight: 1.75, maxWidth: 540, marginBottom: 44 }}>
            Your emotional patterns, personality, and behavioural tendencies — mapped into a living intelligence profile that evolves every time you share a moment.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 56 }}>
            <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 30px", borderRadius: 99, background: "#1a0a10", color: "#fff", fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 24px rgba(26,10,16,0.25)" }}>
              Get started free <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
            </Link>
            <a href="#howitworks" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 30px", borderRadius: 99, border: "1.5px solid rgba(0,0,0,0.12)", color: "#444", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              See how it works
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 80 }}>
            <div style={{ display: "flex" }}>
              {["A", "B", "C", "D", "E"].map((l, i) => (
                <div key={l} style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #fff", background: `hsl(${i * 40 + 340},60%,45%)`, marginLeft: i ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#fff", zIndex: 5 - i }}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{ display: "flex", gap: 1 }}>
                {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ color: G, fontSize: 12 }}>★</span>)}
              </div>
              <p style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Trusted by 12,000+ people worldwide</p>
            </div>
          </motion.div>
        </motion.div>

        {/* floating profile cards */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <FloatingCard name="Amara J." score={82} archetype="The Strategist" delta="+6" style={{ top: "20%", left: "6%", opacity: 0.9 }} />
          <FloatingCard name="Kwame B." score={74} archetype="The Empath" delta="+3" style={{ top: "55%", left: "4%", opacity: 0.8, animationDelay: "1s" }} />
          <FloatingCard name="Sasha M." score={91} archetype="The Visionary" delta="+12" style={{ top: "18%", right: "6%", opacity: 0.9 }} />
          <FloatingCard name="Leo T." score={68} archetype="The Explorer" delta="+4" style={{ top: "58%", right: "4%", opacity: 0.8 }} />
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ padding: "80px 48px", background: "#fafafa", borderTop: "1px solid rgba(0,0,0,0.05)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {[
            { end: 12000, suffix: "+", label: "Active users" },
            { end: 98, suffix: "%", label: "Profile accuracy" },
            { end: 50, suffix: "+", label: "Intelligence dimensions" },
            { end: 5, suffix: " min", label: "To your first score" },
          ].map((s, i) => (
            <div key={s.label} style={{ padding: "0 24px", borderRight: i < 3 ? "1px solid rgba(0,0,0,0.07)" : "none" }}>
              <LiveCounter end={s.end} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </div>
      </section>

      {/* ══ BRAIN SECTION — "Your mind, mapped" ══ */}
      <section style={{ padding: "120px 48px", background: "#fff" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* left: animated brain viz */}
          <S>
            <motion.div variants={up} style={{ position: "relative", height: 480, borderRadius: 28, overflow: "hidden", background: "#fafafa", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 32px 80px rgba(0,0,0,0.07)" }}>
              <BrainCanvas />
              {/* overlay cards */}
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}
                style={{ position: "absolute", top: 20, left: 20, background: "#fff", borderRadius: 14, padding: "12px 16px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
                <p style={{ fontSize: 10, color: "#aaa", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Pull Score</p>
                <p style={{ fontSize: 32, fontWeight: 900, color: "#1a0a10", letterSpacing: "-0.04em" }}>82</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <HugeiconsIcon icon={TrendingUpIcon} size={11} style={{ color: "#34d399" }} />
                  <span style={{ fontSize: 11, color: "#34d399", fontWeight: 700 }}>+6 this month</span>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 0.8 }}
                style={{ position: "absolute", bottom: 20, right: 20, background: "#fff", borderRadius: 14, padding: "12px 16px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", maxWidth: 170 }}>
                <p style={{ fontSize: 10, color: "#aaa", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Archetype</p>
                <p style={{ fontSize: 14, fontWeight: 800, color: "#1a0a10", marginBottom: 4 }}>The Quiet Strategist</p>
                <div style={{ height: 3, borderRadius: 99, background: "#f0f0f0" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: "84%" }} transition={{ duration: 1.5, delay: 1 }} style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${W}, #c0404f)` }} />
                </div>
                <p style={{ fontSize: 10, color: "#aaa", marginTop: 4 }}>84% confidence</p>
              </motion.div>

              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 5, delay: 1.5 }}
                style={{ position: "absolute", top: "50%", right: 20, transform: "translateY(-50%)", background: "#fff", borderRadius: 14, padding: "10px 14px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", maxWidth: 150 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <HugeiconsIcon icon={FlashIcon} size={12} style={{ color: G }} />
                  <span style={{ fontSize: 10, color: "#aaa", fontWeight: 700 }}>Insight</span>
                </div>
                <p style={{ fontSize: 11, color: "#1a0a10", lineHeight: 1.5, fontWeight: 500 }}>Trust your analytical nature — it's your edge.</p>
              </motion.div>
            </motion.div>
          </S>

          {/* right */}
          <S>
            <motion.div variants={up} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, background: "rgba(61,14,26,0.05)", border: "1px solid rgba(61,14,26,0.1)", marginBottom: 24 }}>
              <HugeiconsIcon icon={AiBrain01Icon} size={11} style={{ color: W }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: W, letterSpacing: "0.1em", textTransform: "uppercase" }}>Intelligence Profile</span>
            </motion.div>
            <motion.h2 variants={up} style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#1a0a10", letterSpacing: "-0.04em", lineHeight: 1.08, marginBottom: 20 }}>
              Your mind,<br />finally mapped.
            </motion.h2>
            <motion.p variants={up} style={{ fontSize: 16, color: "#777", lineHeight: 1.85, marginBottom: 36 }}>
              MyPullScore builds a living model of who you are — how you communicate, react, attach, and grow. Every journal entry, every conversation with your AI coach, every reality check deepens the map.
            </motion.p>
            {[
              { icon: Activity01Icon, label: "Real-time pattern detection across 50+ dimensions" },
              { icon: HeartCheckIcon, label: "Emotional intelligence tracking updated daily" },
              { icon: MymindIcon, label: "Archetype evolution as you grow and change" },
              { icon: ShieldCheckIcon, label: "100% private — your data, your profile" },
            ].map(item => (
              <motion.div key={item.label} variants={up} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(61,14,26,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <HugeiconsIcon icon={item.icon} size={14} style={{ color: W }} />
                </div>
                <span style={{ fontSize: 14, color: "#444", fontWeight: 500 }}>{item.label}</span>
              </motion.div>
            ))}
            <motion.div variants={up} style={{ marginTop: 36 }}>
              <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", borderRadius: 99, background: "#1a0a10", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                Build your profile <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </Link>
            </motion.div>
          </S>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section id="features" style={{ padding: "120px 48px", background: "#fafafa", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ textAlign: "center", marginBottom: 72 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)", marginBottom: 20 }}>
                <HugeiconsIcon icon={SparklesIcon} size={11} style={{ color: "#888" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>What you get</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, color: "#1a0a10", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>
                Every tool you need<br />to understand yourself
              </h2>
              <p style={{ fontSize: 16, color: "#888", maxWidth: 460, margin: "0 auto", lineHeight: 1.8 }}>Built for the humans who take growth seriously.</p>
            </motion.div>
          </S>
          <S>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {FEATURES.map(f => (
                <motion.div key={f.title} variants={up}
                  whileHover={{ y: -4, boxShadow: "0 24px 48px rgba(0,0,0,0.09)" }}
                  style={{ borderRadius: 20, border: "1px solid rgba(0,0,0,0.07)", padding: "30px 26px", background: "#fff", cursor: "default", transition: "box-shadow 0.2s" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 13, background: `${f.color}12`, border: `1px solid ${f.color}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <HugeiconsIcon icon={f.icon} size={20} style={{ color: f.color }} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1a0a10", marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: "#888", lineHeight: 1.75 }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </S>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="howitworks" style={{ padding: "120px 48px", background: "#1a0a10" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ textAlign: "center", marginBottom: 80 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", marginBottom: 20 }}>
                <HugeiconsIcon icon={CompassIcon} size={11} style={{ color: G }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: "0.1em", textTransform: "uppercase" }}>How it works</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>
                From zero to self-aware<br />in under 10 minutes.
              </h2>
            </motion.div>
          </S>
          <S>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 24, overflow: "hidden" }}>
              {[
                { n: "01", icon: UserCircleIcon, title: "Create account", desc: "Sign up with email or Google. No card needed." },
                { n: "02", icon: Activity01Icon, title: "5-minute assessment", desc: "Answer focused questions about your patterns and life." },
                { n: "03", icon: ChartLineData03Icon, title: "Get your Pull Score", desc: "Your score and archetype generated instantly." },
                { n: "04", icon: TrendingUpIcon, title: "Keep growing", desc: "Every journal and coach session deepens your profile." },
              ].map((s, i) => (
                <motion.div key={s.n} variants={up} style={{ padding: "40px 28px", background: "#1a0a10" }}>
                  <p style={{ fontSize: 11, color: G, fontWeight: 700, letterSpacing: "0.15em", marginBottom: 18 }}>{s.n}</p>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <HugeiconsIcon icon={s.icon} size={16} style={{ color: "rgba(255,255,255,0.6)" }} />
                  </div>
                  <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 10 }}>{s.title}</p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </S>

          {/* testimonials */}
          <S style={{ marginTop: 64 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                { quote: "I've been to therapy for years. MyPullScore showed me patterns in 2 weeks that took me years to see.", name: "Amara J.", role: "Therapist, Lagos" },
                { quote: "The Reality Check feature is wild. It told me exactly what I was doing in that relationship before I could admit it.", name: "Marcus W.", role: "Entrepreneur, NYC" },
                { quote: "My coach sessions feel like talking to someone who knows my whole life history. It's genuinely shocking how accurate it is.", name: "Sasha K.", role: "Designer, London" },
              ].map(t => (
                <motion.div key={t.name} variants={up} style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.07)", padding: "28px 24px", background: "rgba(255,255,255,0.03)" }}>
                  <div style={{ display: "flex", gap: 1, marginBottom: 16 }}>
                    {[1,2,3,4,5].map(i => <span key={i} style={{ color: G, fontSize: 13 }}>★</span>)}
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: 20, fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${W}, #c0404f)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff" }}>{t.name[0]}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.name}</p>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </S>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" style={{ padding: "120px 48px", background: "#fff" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)", marginBottom: 20 }}>
                <HugeiconsIcon icon={StarIcon} size={11} style={{ color: "#888" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>Pricing</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, color: "#1a0a10", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>Start free. Go deeper.</h2>
              <p style={{ fontSize: 16, color: "#888", lineHeight: 1.8 }}>Everything you need to understand yourself — free forever, with premium for those who want more.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* Free */}
              <motion.div variants={up} style={{ borderRadius: 24, border: "1.5px solid rgba(0,0,0,0.08)", padding: "36px 32px" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#aaa", marginBottom: 20 }}>Free</p>
                <p style={{ fontSize: 52, fontWeight: 900, color: "#1a0a10", letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 6 }}>$0</p>
                <p style={{ fontSize: 13, color: "#aaa", marginBottom: 32 }}>Forever free</p>
                <Link href="/register" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "13px 0", borderRadius: 99, border: "1.5px solid rgba(0,0,0,0.12)", color: "#1a0a10", fontSize: 14, fontWeight: 700, textDecoration: "none", marginBottom: 32 }}>Get started</Link>
                {["Pull Score + Archetype", "5 Coach sessions/month", "3 Reality checks/month", "Smart Journal (10 insights/mo)", "Journey Map"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} style={{ color: "#ccc", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#777" }}>{f}</span>
                  </div>
                ))}
              </motion.div>
              {/* Premium */}
              <motion.div variants={up} whileHover={{ scale: 1.02 }} style={{ borderRadius: 24, background: "#1a0a10", padding: "36px 32px", position: "relative", boxShadow: "0 24px 64px rgba(26,10,16,0.2)" }}>
                <div style={{ position: "absolute", top: 20, right: 20, padding: "4px 12px", borderRadius: 99, background: G, color: "#1a0a10", fontSize: 10, fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase" }}>Most popular</div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>Premium</p>
                <p style={{ fontSize: 52, fontWeight: 900, color: "#fff", letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 6 }}>$12</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 32 }}>per month</p>
                <Link href="/upgrade" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 0", borderRadius: 99, background: "#fff", color: "#1a0a10", fontSize: 14, fontWeight: 700, textDecoration: "none", marginBottom: 32 }}>
                  Upgrade now <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                </Link>
                {["Everything in Free", "Unlimited Coach sessions", "Unlimited Reality checks", "Unlimited AI journal insights", "Deep intelligence reports", "Priority support"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} style={{ color: G, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: f === "Everything in Free" ? "#fff" : "rgba(255,255,255,0.6)", fontWeight: f === "Everything in Free" ? 700 : 400 }}>{f}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </S>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ padding: "120px 48px", background: "#fafafa", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <S>
            <motion.div variants={up}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)", marginBottom: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>FAQ</span>
              </div>
              <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#1a0a10", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>Questions you&apos;re<br />probably having</h2>
              <p style={{ fontSize: 14, color: "#888", lineHeight: 1.8, marginBottom: 32 }}>Can&apos;t find what you&apos;re looking for? Reach out to us.</p>
              <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 99, border: "1.5px solid rgba(0,0,0,0.1)", color: "#444", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                <HugeiconsIcon icon={Message02Icon} size={14} /> Get in touch
              </Link>
            </motion.div>
          </S>
          <S>
            <div>
              {FAQS.map((f, i) => (
                <motion.div key={i} variants={up} style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", cursor: "pointer", gap: 20, textAlign: "left" }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#1a0a10" }}>{f.q}</span>
                    <motion.span animate={{ rotate: faqOpen === i ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ fontSize: 20, color: "#aaa", flexShrink: 0, lineHeight: 1 }}>+</motion.span>
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
                        style={{ fontSize: 14, color: "#777", lineHeight: 1.8, paddingBottom: 20, overflow: "hidden" }}>
                        {f.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </S>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ padding: "80px 48px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <S>
            <motion.div variants={up} style={{ borderRadius: 28, background: "#1a0a10", padding: "80px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              {/* brain bg */}
              <div style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
                <BrainCanvas />
              </div>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(61,14,26,0.4) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: G, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>Start today — free</p>
                <h2 style={{ fontSize: "clamp(36px,6vw,72px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 20 }}>
                  Know yourself<br />at a deeper level.
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 440, margin: "0 auto 44px" }}>
                  Join 12,000+ people building the most self-aware version of themselves with MyPullScore.
                </p>
                <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", borderRadius: 99, background: "#fff", color: "#1a0a10", fontSize: 16, fontWeight: 800, textDecoration: "none", boxShadow: "0 0 60px rgba(255,255,255,0.1)" }}>
                  Get started free <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                </Link>
                <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 32 }}>
                  {[{ icon: LockIcon, label: "Private by design" }, { icon: Globe02Icon, label: "Available worldwide" }, { icon: ShieldCheckIcon, label: "Encrypted end-to-end" }].map(item => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                      <HugeiconsIcon icon={item.icon} size={12} />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </S>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#fafafa", borderTop: "1px solid rgba(0,0,0,0.06)", padding: "60px 48px 0" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 32, paddingBottom: 48, borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, overflow: "hidden", position: "relative" }}>
                  <Image src="/logo.jpg" alt="MyPullScore" fill style={{ objectFit: "cover" }} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#1a0a10" }}>MyPullScore</span>
              </div>
              <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.75, maxWidth: 200 }}>Your personal intelligence, finally under your control.</p>
            </div>
            {[
              { title: "Product", links: ["Pull Score", "AI Coach", "Reality Check", "Journal", "Pricing"] },
              { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
              { title: "Resources", links: ["Docs", "Changelog", "Support", "Privacy"] },
              { title: "Social", links: ["X.com", "LinkedIn", "Instagram"] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#bbb", marginBottom: 16 }}>{col.title}</p>
                {col.links.map(l => (
                  <p key={l} style={{ fontSize: 13, color: "#999", marginBottom: 10, cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#1a0a10")} onMouseLeave={e => (e.currentTarget.style.color = "#999")}>{l}</p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0" }}>
            <p style={{ fontSize: 12, color: "#ccc" }}>© MyPullScore 2026 — Built for humans</p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Terms", "Privacy"].map(l => <Link key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: 12, color: "#ccc", textDecoration: "none" }}>{l}</Link>)}
            </div>
          </div>
        </div>
        <p style={{ fontSize: "clamp(48px,10vw,120px)", fontWeight: 900, color: "rgba(0,0,0,0.04)", textAlign: "center", letterSpacing: "-0.05em", lineHeight: 0.8, userSelect: "none", paddingBottom: 0 }}>
          MyPullScore
        </p>
      </footer>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          section, footer { padding-left: 20px !important; padding-right: 20px !important; }
          [style*="gridTemplateColumns: 1fr 1fr 1fr"], [style*="gridTemplateColumns: repeat(3, 1fr)"], [style*="gridTemplateColumns: repeat(4, 1fr)"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: 1fr 1fr"], [style*="gridTemplateColumns: 2fr 1fr 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="position: absolute"][style*="left: 6%"], [style*="position: absolute"][style*="left: 4%"],
          [style*="position: absolute"][style*="right: 6%"], [style*="position: absolute"][style*="right: 4%"] { display: none !important; }
        }
      `}</style>
    </div>
  );
}
