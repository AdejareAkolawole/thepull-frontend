"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon, AiBrain01Icon, Analytics01Icon, FavouriteIcon,
  FireIcon, Target01Icon, EyeIcon, LockIcon, ArrowUpRight01Icon,
  FlashIcon, Message02Icon, AiInnovation01Icon,
} from "@hugeicons/core-free-icons";
import { mockUser, mockInsights, mockAchievements, mockIdentityVector, mockDimensions } from "@/lib/mock";

const WINE  = "#3d0e1a";
const WINE2 = "#c0404f";
const GOLD  = "#c9a84c";
const BLACK = "#0f0a14";

const T1 = "#0f0a14";
const T2 = "rgba(15,10,20,0.5)";
const T3 = "rgba(15,10,20,0.32)";
const BD = "rgba(15,10,20,0.08)";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.48, delay: d, ease: [0.16, 1, 0.3, 1] as any },
});

function Spark({ values, color = WINE2, w = 100, h = 36 }: { values: number[]; color?: string; w?: number; h?: number }) {
  const max = Math.max(...values), min = Math.min(...values);
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 6) - 3;
    return `${x},${y}`;
  }).join(" ");
  const last = pts.split(" ").at(-1)!.split(",");
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <circle cx={last[0]} cy={last[1]} r="3" fill={color} />
    </svg>
  );
}

function Bars({ values, color = WINE2, w = 100, h = 40 }: { values: number[]; color?: string; w?: number; h?: number }) {
  const max = Math.max(...values);
  const bw = Math.max(3, Math.floor(w / values.length) - 2);
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      {values.map((v, i) => {
        const bh = Math.max(2, (v / max) * (h - 2));
        return <rect key={i} x={i * (bw + 2)} y={h - bh} width={bw} height={bh} rx="2"
          fill={color} opacity={i === values.length - 1 ? 0.9 : 0.22} />;
      })}
    </svg>
  );
}

function HalfGauge({ pct, color = WINE2, size = 80 }: { pct: number; color?: string; size?: number }) {
  const r = 32, cx = size / 2, cy = size * 0.58;
  const arc = Math.PI * r;
  return (
    <svg width={size} height={Math.round(size * 0.62)} viewBox={`0 0 ${size} ${Math.round(size * 0.62)}`}>
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={BD} strokeWidth="6" strokeLinecap="round" />
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * arc} ${arc}`} />
      <text x={cx} y={cy - 2} textAnchor="middle" fill={T1} fontSize="13" fontWeight="700">{pct}%</text>
    </svg>
  );
}

const achievementIconMap: Record<string, any> = {
  brain: AiBrain01Icon, eye: EyeIcon, chart: Analytics01Icon,
  star: FavouriteIcon, fire: FireIcon, target: Target01Icon,
};

export default function DashboardClient() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const done = mockAchievements.filter(a => a.done).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

      {/* ── HERO ── */}
      <motion.div {...fade(0)} style={{
        borderRadius: 22, overflow: "hidden", position: "relative",
        background: `linear-gradient(130deg, ${WINE} 0%, #6b1c2b 55%, #8c2535 100%)`,
        minHeight: 240,
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 75% 50%, rgba(255,255,255,0.05) 0%, transparent 55%)", pointerEvents: "none" }} />

        {/* Left */}
        <div style={{ padding: "44px 48px 44px", maxWidth: 520, position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", marginBottom: 10, fontWeight: 700 }}>
            — Intelligence Based on Your Profile
          </p>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 10, letterSpacing: "-0.02em" }}>
            Dashboard Overview
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.44)", lineHeight: 1.7, marginBottom: 28 }}>
            {greeting}, {mockUser.name}. 3 new intelligence signals since your last visit.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/pull-profile" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 11, background: "#fff", color: WINE, fontSize: 12, fontWeight: 800, textDecoration: "none" }}>
              Pull Profile <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
            </Link>
            <Link href="/coach" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 11, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.65)", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
              <HugeiconsIcon icon={Message02Icon} size={12} /> Ask The Pull
            </Link>
          </div>
        </div>

        {/* Floating glass insight cards — like the reference */}
        <div style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)", width: 320, height: 200, zIndex: 3 }}>
          {/* Back card */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.5 }}
            style={{ position: "absolute", top: 0, right: 0, width: 210, padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.25)", transform: "rotate(6deg) translate(30px,-10px)" }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Pattern Found</p>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#fff", lineHeight: 1.5 }}>You recover from conflict 2.4× faster than average.</p>
          </motion.div>
          {/* Mid card */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
            style={{ position: "absolute", top: 10, right: 10, width: 220, padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.28)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.35)", transform: "rotate(3deg) translate(10px, 10px)" }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Intelligence Signal</p>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#fff", lineHeight: 1.5 }}>Directness index rose 12pts. Communication evolving.</p>
          </motion.div>
          {/* Front card */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.5 }}
            style={{ position: "absolute", top: 26, right: 30, width: 230, padding: "16px 18px", borderRadius: 14, background: "rgba(255,255,255,0.88)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(61,14,26,0.16)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: 7, background: "rgba(192,64,79,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <HugeiconsIcon icon={FlashIcon} size={11} style={{ color: WINE2 }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: WINE2, letterSpacing: "0.04em" }}>Pull Insight</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={11} style={{ color: T3, marginLeft: "auto" }} />
            </div>
            <p style={{ fontSize: 12, fontWeight: 700, color: T1, lineHeight: 1.5 }}>
              Score <strong style={{ color: WINE2 }}>74</strong> · Emerging Identity
            </p>
            <p style={{ fontSize: 10, color: T2, marginTop: 4 }}>{mockUser.archetype} · {mockUser.archetype_confidence}% confidence</p>
          </motion.div>
        </div>
      </motion.div>

      {/* ── MAIN GRID: [3 card cols] + [AI panel spanning full height] ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 300px", gridTemplateRows: "auto auto", gap: 12 }} className="dash-main">

        {/* STAT 1 — Pull Score */}
        <motion.div {...fade(0.1)} style={{ background: "#fff", border: `1px solid ${BD}`, borderRadius: 18, padding: "22px 24px 18px", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: T3, fontWeight: 700 }}>Pull Score</p>
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} style={{ color: T3 }} />
          </div>
          <div style={{ fontSize: 46, fontWeight: 800, color: T1, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: 4 }}>74<span style={{ fontSize: 18, fontWeight: 500, color: T3, letterSpacing: 0 }}>pts</span></div>
          <div style={{ display: "flex", gap: 20, marginBottom: 14 }}>
            <div><span style={{ fontSize: 13, fontWeight: 700, color: T1 }}>72%</span><br /><span style={{ fontSize: 9, color: T3 }}>Confidence</span></div>
            <div><span style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>↑ +3</span><br /><span style={{ fontSize: 9, color: T3 }}>This week</span></div>
          </div>
          <div style={{ borderTop: `1px solid ${BD}`, paddingTop: 12, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <Bars values={[62,65,68,64,70,72,74,74]} color={WINE2} w={110} h={38} />
            <div style={{ display: "flex", gap: 3 }}>
              <span style={{ fontSize: 9, color: T3 }}>Mar</span>
              <span style={{ fontSize: 9, color: T3 }}>—</span>
              <span style={{ fontSize: 9, color: T3 }}>Sep</span>
            </div>
          </div>
        </motion.div>

        {/* STAT 2 — Archetype (gauge) */}
        <motion.div {...fade(0.14)} style={{ background: "#fff", border: `1px solid ${BD}`, borderRadius: 18, padding: "22px 24px 18px", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: T3, fontWeight: 700 }}>Archetype Fit</p>
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} style={{ color: T3 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 36, fontWeight: 800, color: T1, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 4 }}>72<span style={{ fontSize: 16, fontWeight: 500, color: T3 }}>%</span></div>
              <p style={{ fontSize: 9, color: T3, lineHeight: 1.4 }}>Analytical<br />Connector</p>
            </div>
            <HalfGauge pct={72} color={WINE2} size={84} />
          </div>
          <div style={{ borderTop: `1px solid ${BD}`, paddingTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: T2 }}>58% Explorer</span>
              <span style={{ fontSize: 10, color: T2 }}>51% Builder</span>
            </div>
            <Bars values={[72,58,51,47,44,38,33]} color={WINE2} w={160} h={32} />
          </div>
        </motion.div>

        {/* STAT 3 — Intelligence Signals */}
        <motion.div {...fade(0.18)} style={{ background: "#fff", border: `1px solid ${BD}`, borderRadius: 18, padding: "22px 24px 18px", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: T3, fontWeight: 700 }}>Intelligence Signals</p>
            <span style={{ fontSize: 9, fontWeight: 700, color: "#16a34a", background: "rgba(22,163,74,0.09)", padding: "2px 8px", borderRadius: 99 }}>LIVE</span>
          </div>
          <div style={{ fontSize: 46, fontWeight: 800, color: T1, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: 4 }}>847</div>
          <div style={{ display: "flex", gap: 20, marginBottom: 14 }}>
            <div><span style={{ fontSize: 13, fontWeight: 700, color: T1 }}>2.84K</span><br /><span style={{ fontSize: 9, color: T3 }}>Detected</span></div>
            <div><span style={{ fontSize: 13, fontWeight: 700, color: T1 }}>20.8K</span><br /><span style={{ fontSize: 9, color: T3 }}>Total Items</span></div>
          </div>
          <div style={{ borderTop: `1px solid ${BD}`, paddingTop: 12, display: "flex", gap: 8, alignItems: "flex-end" }}>
            <Spark values={[600,650,680,710,760,800,847]} color="#16a34a" w={120} h={38} />
            <div style={{ height: 3, flex: 1, borderRadius: 99, alignSelf: "center" }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[1,0,1,1,0,1,1,0,0,1,1,1,0,1].map((on,i)=>(
                  <div key={i} style={{ height: 28, width: 4, borderRadius: 2, background: on ? WINE2 : BD, opacity: on ? 0.15 + i*0.06 : 1 }} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI ASSISTANT — spans both stat rows */}
        <motion.div {...fade(0.1)} style={{
          background: "#fff", border: `1px solid ${BD}`, borderRadius: 18,
          boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
          gridRow: "1 / 3", display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          <div style={{ padding: "18px 18px 14px", borderBottom: `1px solid ${BD}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 9, background: `linear-gradient(135deg, ${WINE}, #8c2535)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <HugeiconsIcon icon={AiInnovation01Icon} size={13} style={{ color: "#fff" }} />
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: T1 }}>Ask The Pull</p>
                <p style={{ fontSize: 10, color: T3 }}>AI Intelligence Coach</p>
              </div>
            </div>
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} style={{ color: T3 }} />
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "0" }}>
            {/* User message */}
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BD}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: 8, background: "linear-gradient(135deg,#4a5568,#2d3748)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "#fff", flexShrink: 0 }}>AA</div>
                <span style={{ fontSize: 11, fontWeight: 700, color: T1 }}>{mockUser.name}</span>
                <span style={{ fontSize: 10, color: T3, marginLeft: "auto" }}>12:42 PM</span>
              </div>
              <p style={{ fontSize: 11, color: T2, lineHeight: 1.6 }}>Why do I struggle to open up in new relationships?</p>
            </div>

            {/* AI response */}
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BD}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: 8, background: `linear-gradient(135deg, ${WINE}, #8c2535)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <HugeiconsIcon icon={AiInnovation01Icon} size={11} style={{ color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: T1 }}>The Pull</span>
                <span style={{ fontSize: 10, color: T3, marginLeft: "auto" }}>12:42 PM</span>
              </div>
              <p style={{ fontSize: 11, color: T2, lineHeight: 1.65, marginBottom: 10 }}>
                Based on your profile — self-awareness at 69 shows room to explore vulnerability before your analytical processing takes over.
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 8, background: "rgba(61,14,26,0.06)", border: `1px solid rgba(61,14,26,0.1)` }}>
                <HugeiconsIcon icon={EyeIcon} size={10} style={{ color: WINE2 }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: WINE2 }}>ID · Score 74 · Emerging Identity</span>
              </div>
            </div>

            {/* Dimension breakdown */}
            <div style={{ padding: "14px 18px 10px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: T1, marginBottom: 12 }}>Main Dimensions by Score:</p>
              {[
                { label: "Emotional IQ", val: 81, color: WINE2 },
                { label: "Communication", val: 76, color: GOLD },
                { label: "Self-Awareness", val: 69, color: "#60a5fa" },
              ].map(d => (
                <div key={d.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: d.color, display: "inline-block" }} />
                    <span style={{ fontSize: 11, color: T2 }}>{d.label}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 800, color: T1 }}>{d.val}</span>
                </div>
              ))}
              <Bars values={[81, 76, 69, 72, 65]} color={WINE2} w={220} h={30} />
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: "12px 14px", borderTop: `1px solid ${BD}`, display: "flex", alignItems: "center", gap: 10 }}>
            <input readOnly placeholder="Enter your AI Assistant request…"
              style={{ flex: 1, fontSize: 11, border: "none", outline: "none", background: "transparent", color: T1 }} />
            <Link href="/coach" style={{ width: 30, height: 30, borderRadius: 9, background: WINE2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, textDecoration: "none" }}>
              <HugeiconsIcon icon={ArrowRight01Icon} size={13} style={{ color: "#fff" }} />
            </Link>
          </div>
        </motion.div>

        {/* MID 1 — Identity Vector with sparkline */}
        <motion.div {...fade(0.22)} style={{ background: "#fff", border: `1px solid ${BD}`, borderRadius: 18, padding: "22px 24px 18px", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: T3, fontWeight: 700, marginBottom: 4 }}>Identity Vector</p>
              <div style={{ display: "flex", gap: 16 }}>
                <div><span style={{ fontSize: 22, fontWeight: 800, color: T1 }}>88%</span><br /><span style={{ fontSize: 9, color: T3 }}>Analytical</span></div>
                <div><span style={{ fontSize: 22, fontWeight: 800, color: T1 }}>58,2%</span><br /><span style={{ fontSize: 9, color: T3 }}>Avg Profile</span></div>
                <div><span style={{ fontSize: 22, fontWeight: 800, color: T1 }}>75%</span><br /><span style={{ fontSize: 9, color: T3 }}>Explorer</span></div>
              </div>
            </div>
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} style={{ color: T3 }} />
          </div>
          <div style={{ borderTop: `1px solid ${BD}`, paddingTop: 12 }}>
            <Spark values={[62,65,68,64,70,72,74]} color={WINE2} w={200} h={42} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 9, color: T3 }}>Mar</span>
              <span style={{ fontSize: 9, color: T3 }}>Sep</span>
            </div>
          </div>
        </motion.div>

        {/* MID 2 — Dimensions with sparkline */}
        <motion.div {...fade(0.26)} style={{ background: "#fff", border: `1px solid ${BD}`, borderRadius: 18, padding: "22px 24px 18px", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: T3, fontWeight: 700, marginBottom: 4 }}>Core Dimensions</p>
              <div style={{ display: "flex", gap: 16 }}>
                <div><span style={{ fontSize: 22, fontWeight: 800, color: T1 }}>81</span><br /><span style={{ fontSize: 9, color: T3 }}>Emotional IQ</span></div>
                <div><span style={{ fontSize: 22, fontWeight: 800, color: T1 }}>88,5%</span><br /><span style={{ fontSize: 9, color: T3 }}>Avg Stat</span></div>
                <div><span style={{ fontSize: 22, fontWeight: 800, color: GOLD }}>5/5</span><br /><span style={{ fontSize: 9, color: T3 }}>Mapped</span></div>
              </div>
            </div>
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} style={{ color: T3 }} />
          </div>
          <div style={{ borderTop: `1px solid ${BD}`, paddingTop: 12 }}>
            <Spark values={[55,60,65,62,68,72,76]} color={GOLD} w={200} h={42} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 9, color: T3 }}>Mar</span>
              <span style={{ fontSize: 9, color: T3 }}>Sep</span>
            </div>
          </div>
        </motion.div>

        {/* MID 3 — Achievements */}
        <motion.div {...fade(0.3)} style={{ background: "#fff", border: `1px solid ${BD}`, borderRadius: 18, padding: "22px 24px 18px", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: T3, fontWeight: 700, marginBottom: 4 }}>Progress</p>
              <div style={{ display: "flex", gap: 16 }}>
                <div><span style={{ fontSize: 22, fontWeight: 800, color: T1 }}>{done}/{mockAchievements.length}</span><br /><span style={{ fontSize: 9, color: T3 }}>Achieved</span></div>
                <div><span style={{ fontSize: 22, fontWeight: 800, color: T1 }}>12</span><br /><span style={{ fontSize: 9, color: T3 }}>Day streak</span></div>
              </div>
            </div>
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} style={{ color: T3 }} />
          </div>
          <div style={{ borderTop: `1px solid ${BD}`, paddingTop: 12 }}>
            <Bars values={[4,5,6,7,9,11,12]} color={GOLD} w={180} h={42} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 9, color: T3 }}>Mar</span>
              <span style={{ fontSize: 9, color: T3 }}>Sep</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── PERSON CARDS (like the reference bottom row) ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }} className="dash-people">
        {[
          { name: "Adejare Akolawole", sub: "adejare@thepull.com", icon: AiBrain01Icon, href: "/pull-profile" },
          { name: "Ask The Pull", sub: "ai.coach@thepull.com", icon: AiInnovation01Icon, href: "/coach" },
          { name: "Reality Check", sub: "reports@thepull.com", icon: Analytics01Icon, href: "/reports" },
        ].map((p, i) => (
          <motion.div key={p.name} {...fade(0.36 + i * 0.05)}>
            <Link href={p.href} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12, background: "#fff", border: `1px solid ${BD}`, borderRadius: 18, padding: "16px 20px", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(61,14,26,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <HugeiconsIcon icon={p.icon} size={17} style={{ color: WINE2 }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: T1, marginBottom: 2 }}>{p.name}</p>
                <p style={{ fontSize: 10, color: T3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.sub}</p>
              </div>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} style={{ color: T3, flexShrink: 0 }} />
            </Link>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .dash-main  { grid-template-columns: 1fr 1fr 280px !important; }
          .dash-main > *:nth-child(4) { grid-column: 1 / -1; grid-row: unset !important; }
        }
        @media (max-width: 800px) {
          .dash-main   { grid-template-columns: 1fr 1fr !important; }
          .dash-main > *:nth-child(4) { grid-column: 1 / -1; }
          .dash-people { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
