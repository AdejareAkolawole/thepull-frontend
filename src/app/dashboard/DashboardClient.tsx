"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  TrendingUpIcon, ArrowRight01Icon, AiSparklesIcon,
  AiInnovation01Icon, Activity01Icon,
  FlashIcon, PresentationLineChart01Icon, Calendar03Icon, Target01Icon,
  AiBrain01Icon, EyeIcon, Analytics01Icon, FavouriteIcon, FireIcon, CheckmarkCircle01Icon, LockIcon,
  BookOpen01Icon, Share01Icon, HelpCircleIcon, ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { mockUser, mockDimensions, mockInsights, mockAchievements } from "@/lib/mock";

const achievementIconMap: Record<string, any> = {
  brain: AiBrain01Icon,
  eye: EyeIcon,
  chart: Analytics01Icon,
  star: FavouriteIcon,
  fire: FireIcon,
  target: Target01Icon,
};

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const Card = ({ children, className = "", style = {} }: any) => (
  <div className={`rounded-2xl ${className}`} style={{
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.07)",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)",
    ...style,
  }}>
    {children}
  </div>
);

function RadarChart({ dimensions }: { dimensions: typeof mockDimensions }) {
  const cx = 110, cy = 110, r = 78;
  const n = dimensions.length;
  const pts = dimensions.map((d, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const pct = d.score / 100;
    return {
      x: cx + Math.cos(angle) * r * pct,
      y: cy + Math.sin(angle) * r * pct,
      lx: cx + Math.cos(angle) * (r + 18),
      ly: cy + Math.sin(angle) * (r + 18),
      label: d.label.split(" ")[0],
    };
  });
  const polygon = pts.map(p => `${p.x},${p.y}`).join(" ");
  const rings = [0.25, 0.5, 0.75, 1].map(pct =>
    dimensions.map((_, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      return `${cx + Math.cos(angle) * r * pct},${cy + Math.sin(angle) * r * pct}`;
    }).join(" ")
  );
  return (
    <svg viewBox="0 0 220 220" style={{ width: "100%", maxWidth: 220 }}>
      {rings.map((p, i) => <polygon key={i} points={p} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />)}
      {dimensions.map((_, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(angle) * r} y2={cy + Math.sin(angle) * r} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />;
      })}
      <defs>
        <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(124,34,50,0.12)" />
          <stop offset="100%" stopColor="rgba(192,64,79,0.08)" />
        </linearGradient>
      </defs>
      <polygon points={polygon} fill="url(#radarFill)" stroke="#c0404f" strokeWidth="1.5" strokeLinejoin="round" />
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#c0404f" stroke="rgba(192,64,79,0.2)" strokeWidth="5" />)}
      {pts.map((p, i) => (
        <text key={i} x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: 7.5, fill: "rgba(15,10,20,0.4)", fontFamily: "Inter,sans-serif" }}>
          {p.label}
        </text>
      ))}
      <text x={cx} y={cy - 7} textAnchor="middle" style={{ fontSize: 20, fontWeight: 700, fill: "#0f0a14", fontFamily: "Inter,sans-serif" }}>74</text>
      <text x={cx} y={cy + 10} textAnchor="middle" style={{ fontSize: 7, fill: "rgba(15,10,20,0.35)", fontFamily: "Inter,sans-serif", letterSpacing: 2 }}>PULL SCORE</text>
    </svg>
  );
}

function Sparkline({ data, color = "#c0404f" }: { data: number[]; color?: string }) {
  const w = 100, h = 32;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2;
    return `${x},${y}`;
  });
  const area = `${pts.join(" ")} ${w},${h} 0,${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }}>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.12" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#sg)" />
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

const scoreHistory = [68, 70, 69, 71, 72, 71, 73, 74];

export default function DashboardClient() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

      {/* ROW 1: Hero + Archetype card */}
      <div className="dash-row-1" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 12 }}>

        {/* Hero */}
        <motion.div {...fade(0)} className="rounded-2xl relative overflow-hidden" style={{ minHeight: 180, background: "linear-gradient(140deg, #3d0e1a 0%, #6b1c2b 45%, #a03040 100%)" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 10% 20%, rgba(255,255,255,0.05) 0%, transparent 60%)" }} />
          <div className="dash-hero-inner" style={{ position: "relative", padding: "24px 30px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
                <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>Relationship Intelligence</span>
              </div>
              <h1 className="font-display" style={{ fontSize: 34, lineHeight: 1.06, fontWeight: 300, color: "rgba(255,255,255,0.8)", marginBottom: 2 }}>{greeting},</h1>
              <h1 className="font-display" style={{ fontSize: 34, lineHeight: 1.06, fontWeight: 600, color: "#fff", marginBottom: 10 }}>{mockUser.name}.</h1>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", lineHeight: 1.6, maxWidth: 340 }}>
                3 new insights ready. Your intelligence profile has evolved since your last visit.
              </p>
              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                <Link href="/pull-profile" style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 12, background: "rgba(255,255,255,0.95)", color: "#7c2232", fontSize: 12, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
                  View Full Profile <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
                </Link>
                <Link href="/coach" style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 12, background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <HugeiconsIcon icon={AiInnovation01Icon} size={12} /> Ask The Pull
                </Link>
              </div>
            </div>
            {/* Living Intelligence bar */}
            <div style={{
              marginTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 16,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" as const, marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <HugeiconsIcon icon={AiSparklesIcon} size={12} style={{ color: "rgba(201,168,76,0.8)" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(201,168,76,0.85)", letterSpacing: "0.01em" }}>Living Intelligence</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.38)" }}>Your Living Intelligence begins with your first signals</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "4px 12px", borderRadius: 99, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "rgba(201,168,76,0.85)" }}>
                    Behavioural confidence {mockUser.archetype_confidence}%
                  </span>
                  <button style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.45)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    <HugeiconsIcon icon={HelpCircleIcon} size={12} style={{ color: "rgba(255,255,255,0.3)" }} />
                    Explain
                    <HugeiconsIcon icon={ArrowDown01Icon} size={10} style={{ color: "rgba(255,255,255,0.3)" }} />
                  </button>
                </div>
              </div>
              <Link href="/journal" style={{ fontSize: 11, color: "rgba(201,168,76,0.7)", textDecoration: "underline", textDecorationColor: "rgba(201,168,76,0.3)", textUnderlineOffset: 3 }}>
                Bring The Pull a moment from your life
              </Link>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.32)" }}> — your first signals begin here.</span>
            </div>
          </div>
        </motion.div>

        {/* Archetype card — matches screenshot exactly */}
        <motion.div {...fade(0.06)}>
          <div style={{
            borderRadius: 22, padding: "18px 18px 16px",
            background: "linear-gradient(160deg, #1c0810 0%, #2d1020 60%, #1c0810 100%)",
            height: "100%", display: "flex", flexDirection: "column",
          }}>
            {/* Top row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.7)", fontWeight: 700, marginBottom: 10 }}>Primary Archetype</p>
                <div style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: 99, background: "rgba(192,64,79,0.15)", border: "1px solid rgba(192,64,79,0.3)" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#c0404f" }}>Emerging Identity</span>
                </div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: "rgba(192,64,79,0.18)", border: "1px solid rgba(192,64,79,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <HugeiconsIcon icon={AiBrain01Icon} size={22} style={{ color: "#c0404f" }} />
              </div>
            </div>

            {/* Name + desc */}
            <p style={{ fontSize: 21, fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 6, letterSpacing: "-0.02em" }}>{mockUser.archetype}</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.32)", lineHeight: 1.6, marginBottom: 16 }}>We currently believe your strongest identity is rooted in logic, pattern recognition, and ...</p>

            {/* Confidence / Version */}
            <div style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingTop: 14, paddingBottom: 14, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", marginBottom: 5 }}>Confidence</p>
                <p style={{ fontSize: 24, fontWeight: 700, color: "#c0404f", lineHeight: 1 }}>{mockUser.archetype_confidence}%</p>
              </div>
              <div style={{ width: 1, background: "rgba(255,255,255,0.07)", margin: "0 20px" }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", marginBottom: 5 }}>Version</p>
                <p style={{ fontSize: 24, fontWeight: 700, color: "#c0404f", lineHeight: 1 }}>V10.0</p>
              </div>
            </div>

            {/* Identity Vector */}
            <p style={{ fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", fontWeight: 700, marginBottom: 12 }}>Identity Vector</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
              {[
                { label: "Analytical Connector", pct: 72, color: "#c0404f" },
                { label: "Explorer", pct: 58, color: "#60a5fa" },
                { label: "Builder", pct: 51, color: "#f59e0b" },
                { label: "Visionary", pct: 47, color: "#a78bfa" },
              ].map(v => (
                <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.65)", width: 130, flexShrink: 0 }}>{v.label}</span>
                  <div style={{ flex: 1, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.07)" }}>
                    <div style={{ height: "100%", width: `${v.pct}%`, borderRadius: 99, background: v.color }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", width: 32, textAlign: "right" as const }}>{v.pct}%</span>
                </div>
              ))}
            </div>

            {/* View Full Profile */}
            <Link href="/pull-profile" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 18, padding: "13px 0", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
              View Full Profile <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ══ WHO AM I ══ */}
      <motion.div {...fade(0.3)} style={{ paddingTop: 24 }}>
        <div style={{ marginBottom: 20, textAlign: "center" as const }}>
          <p style={{ fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontWeight: 700, marginBottom: 6 }}>Your Living Identity</p>
          <h2 style={{ fontSize: 36, fontWeight: 400, color: "#3d0e1a", letterSpacing: "-0.02em", lineHeight: 1 }}>Who Am I?</h2>
        </div>

        {/* Identity Coverage banner */}
        <div style={{ borderRadius: 24, padding: "22px 28px", background: "#ffffff", border: "1px solid rgba(15,10,20,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#c9a84c", fontWeight: 700, marginBottom: 6 }}>Identity Coverage</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: "#c9a84c", letterSpacing: "-0.02em" }}>Foundation Complete</p>
            <p style={{ fontSize: 12, color: "rgba(15,10,20,0.42)", marginTop: 4 }}>Your {mockUser.dimensions_complete ?? 7} core dimensions are complete.</p>
          </div>
          <div style={{ textAlign: "right" as const }}>
            <p style={{ fontSize: 36, fontWeight: 700, color: "#0f0a14", letterSpacing: "-0.03em" }}>
              {mockUser.domains_covered ?? 11}<span style={{ fontSize: 18, fontWeight: 400, color: "rgba(15,10,20,0.3)" }}>/{mockUser.domains_total ?? 12}</span>
            </p>
            <p style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(15,10,20,0.35)", fontWeight: 700 }}>Overall Domain Coverage</p>
          </div>
        </div>

        {/* Version + Confidence */}
        <div className="dash-who-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          {/* Profile Version */}
          <div style={{ borderRadius: 24, padding: "20px 22px", background: "#ffffff", border: "1px solid rgba(15,10,20,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <HugeiconsIcon icon={AiBrain01Icon} size={20} style={{ color: "#8b5cf6" }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(15,10,20,0.35)", fontWeight: 700, marginBottom: 3 }}>Profile Version</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: "#0f0a14", letterSpacing: "-0.02em" }}>v{mockUser.profile_version ?? "7.0"}</p>
            </div>
            <div style={{ textAlign: "right" as const }}>
              <p style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(15,10,20,0.28)", marginBottom: 3 }}>Last Updated</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(15,10,20,0.6)" }}>Today</p>
            </div>
          </div>
          {/* Behavioural Confidence */}
          <div style={{ borderRadius: 24, padding: "20px 22px", background: "#ffffff", border: "1px solid rgba(15,10,20,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
              <svg viewBox="0 0 52 52" style={{ width: 52, height: 52 }}>
                <circle cx="26" cy="26" r="20" fill="none" stroke="rgba(15,10,20,0.07)" strokeWidth="4" />
                <circle cx="26" cy="26" r="20" fill="none" stroke="#4ade80" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={`${((mockUser.archetype_confidence ?? 47) / 100) * 125.7} 125.7`} transform="rotate(-90 26 26)" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#16a34a" }}>{mockUser.archetype_confidence ?? 47}</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(15,10,20,0.35)", fontWeight: 700, marginBottom: 3 }}>Behavioural Confidence</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#0f0a14" }}>Building</p>
            </div>
            <button style={{ background: "none", border: "none", color: "rgba(15,10,20,0.35)", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
              Explain <HugeiconsIcon icon={ArrowRight01Icon} size={10} />
            </button>
          </div>
        </div>

        {/* Identity Summary */}
        <div style={{ borderRadius: 24, padding: "22px 26px", background: "#ffffff", border: "1px solid rgba(15,10,20,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", marginBottom: 12 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(15,10,20,0.35)", fontWeight: 700, marginBottom: 12 }}>Identity Summary</p>
          <p style={{ fontSize: 15, color: "rgba(15,10,20,0.72)", lineHeight: 1.75 }}>
            {mockUser.identity_summary ?? "Your identity is still emerging. As you complete intelligence domains, your behavioural archetype and confidence will reveal themselves."}
          </p>
        </div>

        {/* Coverage Progress */}
        <div style={{ borderRadius: 24, padding: "24px 26px", background: "#ffffff", border: "1px solid rgba(15,10,20,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(15,10,20,0.35)", fontWeight: 700, marginBottom: 20 }}>Identity Coverage Progress</p>
          {[
            { label: "Core Dimensions", val: mockUser.dimensions_complete ?? 7, max: 7, pct: Math.round(((mockUser.dimensions_complete ?? 7) / 7) * 100), color: "#4ade80" },
            { label: "Deeper Dimensions", val: 4, max: 5, pct: 80, color: "#c9a84c" },
            { label: "Coming Soon", val: 0, max: 3, pct: 0, color: "rgba(15,10,20,0.1)", note: "3 new domains" },
          ].map(d => (
            <div key={d.label} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#0f0a14" }}>{d.label}</span>
                <span style={{ fontSize: 11, color: "rgba(15,10,20,0.4)" }}>{d.note ?? `${d.val} / ${d.max} gathered`}</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: "rgba(15,10,20,0.07)" }}>
                <div style={{ height: "100%", width: `${d.pct}%`, borderRadius: 99, background: d.color, transition: "width 0.6s ease" }} />
              </div>
            </div>
          ))}
          <p style={{ fontSize: 10, color: "rgba(15,10,20,0.32)", lineHeight: 1.6, marginTop: 4 }}>
            Coverage counts gathered results, not access. Core dimensions include synthesized perspectives that draw on the same lived evidence and journey activity rather than a separate measurement.
          </p>
          <Link href="/upgrade" style={{ marginTop: 16, borderRadius: 16, padding: "14px 18px", border: "1px solid rgba(15,10,20,0.09)", background: "rgba(15,10,20,0.02)", display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <HugeiconsIcon icon={LockIcon} size={14} style={{ color: "rgba(15,10,20,0.35)", flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#0f0a14" }}>Unlock deeper understanding with Premium <span style={{ color: "rgba(15,10,20,0.3)" }}>›</span></p>
              <p style={{ fontSize: 11, color: "rgba(15,10,20,0.4)", marginTop: 2, lineHeight: 1.5 }}>Expand your identity through deeper dimensions — how you handle tension, what sustains you, your emotional rhythm and your unified synthesis.</p>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* ROW 2: Radar + Insights + Side column */}
      <div className="dash-row-2" style={{ display: "grid", gridTemplateColumns: "220px 1fr 210px", gap: 12 }}>

        <motion.div {...fade(0.09)}>
          <Card style={{ padding: 16, height: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>Intelligence Map</p>
                <p style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 1 }}>5 dimensions</p>
              </div>
              <Link href="/pull-profile" style={{ fontSize: 10, fontWeight: 700, color: "var(--brand)", textDecoration: "none" }}>Full view →</Link>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <RadarChart dimensions={mockDimensions} />
            </div>
          </Card>
        </motion.div>

        <motion.div {...fade(0.12)}>
          <Card style={{ padding: 16, height: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>Living Intelligence</p>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 99, background: "rgba(192,64,79,0.07)", color: "var(--brand)", border: "1px solid rgba(192,64,79,0.12)", letterSpacing: "0.08em" }}>
                <HugeiconsIcon icon={AiSparklesIcon} size={9} /> LIVE
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {mockInsights.map(ins => {
                const cfg = ins.type === "observation"
                  ? { col: "#2563eb", bg: "rgba(37,99,235,0.06)", icon: Activity01Icon }
                  : ins.type === "pattern"
                  ? { col: "#c0404f", bg: "rgba(192,64,79,0.06)", icon: PresentationLineChart01Icon }
                  : { col: "#d97706", bg: "rgba(217,119,6,0.06)", icon: FlashIcon };
                return (
                  <div key={ins.id} style={{ display: "flex", gap: 10, padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <HugeiconsIcon icon={cfg.icon} size={13} style={{ color: cfg.col }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: cfg.col }}>{ins.type}</span>
                        <span style={{ fontSize: 9, color: "var(--text-muted)" }}>{ins.timestamp}</span>
                      </div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.35, marginBottom: 3 }}>{ins.title}</p>
                      <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{ins.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <motion.div {...fade(0.15)} style={{ flex: 1 }}>
            <Card style={{ padding: 16, height: "100%", overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>Achievements</p>
                <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{mockAchievements.filter(a => a.done).length}/{mockAchievements.length} unlocked</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                {mockAchievements.map(a => (
                  <div key={a.label} style={{
                    borderRadius: 12, padding: "10px 10px 8px",
                    background: a.done ? `${a.color}0f` : "rgba(0,0,0,0.03)",
                    border: `1px solid ${a.done ? `${a.color}25` : "rgba(0,0,0,0.07)"}`,
                    opacity: a.done ? 1 : 0.5,
                    position: "relative", overflow: "hidden",
                  }}>
                    <div style={{ marginBottom: 6, display: "flex", alignItems: "center" }}>
                      {a.done
                        ? <HugeiconsIcon icon={achievementIconMap[a.iconKey]} size={18} style={{ color: a.color }} />
                        : <HugeiconsIcon icon={LockIcon} size={16} style={{ color: "rgba(0,0,0,0.25)" }} />
                      }
                    </div>
                    <p style={{ fontSize: 10, fontWeight: 700, color: a.done ? a.color : "var(--text-muted)", lineHeight: 1.2 }}>{a.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div {...fade(0.19)}>
            <div className="rounded-2xl" style={{ padding: 16, background: "linear-gradient(140deg, #3d0e1a, #6b1c2b)", boxShadow: "0 4px 20px rgba(61,14,26,0.22)" }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <HugeiconsIcon icon={AiInnovation01Icon} size={14} style={{ color: "white" }} />
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "white", marginBottom: 4 }}>Ask The Pull</p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.42)", lineHeight: 1.5, marginBottom: 12 }}>Your AI coach is ready with full profile context.</p>
              <Link href="/coach" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "8px 0", borderRadius: 10, background: "rgba(255,255,255,0.14)", color: "white", fontSize: 11, fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)" }}>
                Start session <HugeiconsIcon icon={ArrowRight01Icon} size={10} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

            {/* ROW 3: Quick Actions full width */}
      <motion.div {...fade(0.25)}>
        <Card style={{ padding: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>Quick Actions</p>
          <div className="dash-quick-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7, marginBottom: 8 }}>
            {[
              { label: "AI Coach", href: "/coach", icon: AiInnovation01Icon, color: "#2563eb", bg: "rgba(37,99,235,0.07)" },
              { label: "Reports", href: "/reports", icon: PresentationLineChart01Icon, color: "#7c3aed", bg: "rgba(124,58,237,0.07)" },
              { label: "Journey", href: "/journey", icon: Target01Icon, color: "#d97706", bg: "rgba(217,119,6,0.07)" },
              { label: "Journal", href: "/journal", icon: FlashIcon, color: "#c0404f", bg: "rgba(192,64,79,0.07)" },
            ].map(a => (
              <Link key={a.label} href={a.href} style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-start", gap: 8, padding: 12, borderRadius: 12, background: a.bg, textDecoration: "none", border: "1px solid rgba(0,0,0,0.04)" }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <HugeiconsIcon icon={a.icon} size={13} style={{ color: a.color }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: a.color }}>{a.label}</span>
              </Link>
            ))}
          </div>
          <div style={{ padding: "10px 12px", borderRadius: 12, background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "flex-start", gap: 9 }}>
            <HugeiconsIcon icon={Calendar03Icon} size={13} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: 1 }} />
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-primary)" }}>Today's focus</p>
              <p style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2, lineHeight: 1.4 }}>Complete your Emotional Landscape assessment</p>
            </div>
          </div>
        </Card>
      </motion.div>



      <style>{`
        @media (max-width: 767px) {
          .dash-row-1, .dash-row-2 {
            grid-template-columns: 1fr !important;
          }
          .dash-hero-inner { padding: 24px 20px !important; }
        }
      `}</style>
    </div>
  );
}
