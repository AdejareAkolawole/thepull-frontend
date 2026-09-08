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
const CREAM = "#f5f0e8";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d, ease: [0.16, 1, 0.3, 1] as any },
});

// ── Floating insight card (reference hero cards) ─────────────────────────────
function InsightCard({ title, body, sub, rotate, offset, delay }: {
  title: string; body: string; sub: string; rotate: number; offset: [number, number]; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute", top: offset[1], left: offset[0],
        width: 220, padding: "16px 18px", borderRadius: 16,
        background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow: "0 8px 32px rgba(61,14,26,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        transform: `rotate(${rotate}deg)`,
        zIndex: rotate === 0 ? 3 : rotate < 0 ? 2 : 1,
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 24, height: 24, borderRadius: 8, background: "rgba(61,14,26,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <HugeiconsIcon icon={FlashIcon} size={12} style={{ color: WINE2 }} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: WINE2, letterSpacing: "0.04em" }}>{title}</span>
        <HugeiconsIcon icon={ArrowUpRight01Icon} size={11} style={{ color: "rgba(0,0,0,0.25)", marginLeft: "auto" }} />
      </div>
      <p style={{ fontSize: 12, fontWeight: 600, color: "#0f0a14", lineHeight: 1.5, marginBottom: 6 }}>{body}</p>
      <p style={{ fontSize: 10, color: "rgba(15,10,20,0.4)" }}>{sub}</p>
    </motion.div>
  );
}

// ── Gauge (half-circle) ───────────────────────────────────────────────────────
function Gauge({ pct, color = WINE2, size = 100 }: { pct: number; color?: string; size?: number }) {
  const r = 38, cx = size / 2, cy = size * 0.58;
  const circ = Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size * 0.6} viewBox={`0 0 ${size} ${size * 0.6}`}>
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="7" strokeLinecap="round" />
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`} />
      <text x={cx} y={cy - 4} textAnchor="middle" fill="#0f0a14" fontSize="17" fontWeight="800">{pct}%</text>
    </svg>
  );
}

// ── Mini sparkline ────────────────────────────────────────────────────────────
function Spark({ values, color = WINE2, w = 100, h = 36 }: { values: number[]; color?: string; w?: number; h?: number }) {
  const max = Math.max(...values), min = Math.min(...values);
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 8) - 4;
    return `${x},${y}`;
  }).join(" ");
  const last = pts.split(" ").at(-1)!.split(",");
  return (
    <svg width={w} height={h} style={{ overflow: "visible", display: "block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <circle cx={last[0]} cy={last[1]} r="3.5" fill={color} />
    </svg>
  );
}

// ── Mini bar chart ────────────────────────────────────────────────────────────
function Bars({ values, color = WINE2, w = 100, h = 36 }: { values: number[]; color?: string; w?: number; h?: number }) {
  const max = Math.max(...values);
  const bw = Math.floor(w / values.length) - 2;
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      {values.map((v, i) => {
        const bh = (v / max) * (h - 4);
        return <rect key={i} x={i * (bw + 2)} y={h - bh - 2} width={bw} height={bh} rx="2" fill={color} opacity={i === values.length - 1 ? 1 : 0.3} />;
      })}
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
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <motion.div {...fade(0)} style={{
        borderRadius: 24, overflow: "hidden", position: "relative",
        background: `linear-gradient(135deg, ${WINE} 0%, #6b1c2b 55%, #8c2535 100%)`,
        minHeight: 260, display: "flex", alignItems: "flex-end",
      }}>
        {/* faint texture */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)", pointerEvents: "none" }} />

        {/* Left text */}
        <div style={{ padding: "48px 48px 48px", flex: 1, position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 10, fontWeight: 700 }}>
            — Intelligence Based on Your Profile
          </p>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 12, letterSpacing: "-0.02em" }}>
            {greeting}, {mockUser.name}.
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.48)", lineHeight: 1.7, marginBottom: 28, maxWidth: 380 }}>
            3 new intelligence signals since your last visit. Your profile is {mockUser.archetype_confidence}% calibrated.
          </p>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href="/pull-profile" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 22px", borderRadius: 12, background: "#fff", color: WINE, fontSize: 12, fontWeight: 800, textDecoration: "none", letterSpacing: "-0.01em" }}>
              View Pull Profile <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
            </Link>
            <Link href="/coach" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 22px", borderRadius: 12, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
              <HugeiconsIcon icon={Message02Icon} size={12} /> Ask The Pull
            </Link>
          </div>
        </div>

        {/* Floating insight cards — the reference hero element */}
        <div style={{ position: "relative", width: 360, height: 260, flexShrink: 0, zIndex: 2 }}>
          <InsightCard title="Pull Insight" body="Your directness index rose 12pts this month." sub="Communication · 2 hours ago" rotate={8} offset={[110, 20]} delay={0.3} />
          <InsightCard title="Pattern Found" body="You recover from conflict 2.4× faster than average." sub="Behavioural · Yesterday" rotate={4} offset={[60, 40]} delay={0.18} />
          <InsightCard title="Intelligence Signal" body={`Score: ${mockUser.pull_score} · ${mockUser.archetype_stage}`} sub="Pull Score · Updated now" rotate={0} offset={[20, 60]} delay={0.08} />
        </div>
      </motion.div>

      {/* ── STAT STRIP ───────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="dash-stats">

        {/* Pull Score */}
        <motion.div {...fade(0.12)} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 20, padding: "24px 24px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(15,10,20,0.38)", fontWeight: 700 }}>Pull Score</p>
            <span style={{ fontSize: 10, fontWeight: 700, color: GOLD, background: "rgba(201,168,76,0.1)", padding: "2px 8px", borderRadius: 99 }}>↑ +3</span>
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, color: "#0f0a14", lineHeight: 1, letterSpacing: "-0.04em", marginBottom: 4 }}>74</div>
          <p style={{ fontSize: 10, color: "rgba(15,10,20,0.38)", marginBottom: 12 }}>16.4K auto-processed · 20K pending</p>
          <Spark values={[62,65,68,64,70,72,74]} color={WINE2} />
        </motion.div>

        {/* Archetype Confidence */}
        <motion.div {...fade(0.16)} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 20, padding: "24px 24px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(15,10,20,0.38)", fontWeight: 700, marginBottom: 4 }}>Archetype Confidence</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#0f0a14", lineHeight: 1, letterSpacing: "-0.03em" }}>72<span style={{ fontSize: 18, fontWeight: 600 }}>%</span></div>
              <p style={{ fontSize: 10, color: "rgba(15,10,20,0.38)", marginTop: 4 }}>Analytical Connector</p>
            </div>
            <Gauge pct={72} color={WINE2} size={90} />
          </div>
          <div style={{ marginTop: 10 }}>
            <Bars values={[60,62,65,64,68,70,72]} color={WINE2} w={100} h={28} />
          </div>
        </motion.div>

        {/* Dimensions */}
        <motion.div {...fade(0.2)} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 20, padding: "24px 24px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(15,10,20,0.38)", fontWeight: 700, marginBottom: 6 }}>Dimensions Mapped</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: "#0f0a14", lineHeight: 1, letterSpacing: "-0.03em" }}>5</span>
                <span style={{ fontSize: 14, color: "rgba(15,10,20,0.38)", fontWeight: 600 }}>/5</span>
              </div>
              <p style={{ fontSize: 10, color: "rgba(15,10,20,0.38)", marginTop: 4 }}>All core dimensions active</p>
            </div>
            <div style={{ display: "flex", gap: 3 }}>
              {[1,1,1,1,1].map((_,i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: WINE2 }} />
              ))}
            </div>
          </div>
          <Spark values={[2,3,3,4,4,5,5]} color="#60a5fa" w={100} h={28} />
        </motion.div>

        {/* Intelligence Signals */}
        <motion.div {...fade(0.24)} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 20, padding: "24px 24px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(15,10,20,0.38)", fontWeight: 700 }}>Intelligence Signals</p>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#34d399", background: "rgba(52,211,153,0.1)", padding: "2px 8px", borderRadius: 99 }}>LIVE</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#0f0a14", lineHeight: 1, letterSpacing: "-0.03em" }}>847</div>
              <p style={{ fontSize: 10, color: "rgba(15,10,20,0.38)", marginTop: 4 }}>2.84K detected · 20.8K total</p>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <Bars values={[600,650,680,710,760,800,847]} color="#34d399" w={120} h={32} />
          </div>
        </motion.div>
      </div>

      {/* ── MIDDLE ROW ───────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 360px", gap: 14 }} className="dash-mid">

        {/* Utilization / Identity Vector */}
        <motion.div {...fade(0.28)} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 20, padding: "28px 28px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(15,10,20,0.38)", fontWeight: 700, marginBottom: 4 }}>Identity Vector</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#0f0a14" }}>Archetype Fit</p>
            </div>
            <Link href="/pull-profile" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "rgba(15,10,20,0.38)", textDecoration: "none" }}>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} />
            </Link>
          </div>
          <div style={{ display: "flex", gap: 24, marginBottom: 22 }}>
            {[{val:"88%",sub:"Analytical",col:WINE2},{val:"75%",sub:"Connector",col:"rgba(15,10,20,0.2)"}].map(s=>(
              <div key={s.sub}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#0f0a14", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 10, color: "rgba(15,10,20,0.4)", marginTop: 3 }}>{s.sub}</div>
              </div>
            ))}
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#0f0a14" }}>72%</div>
              <div style={{ fontSize: 10, color: "rgba(15,10,20,0.4)", marginTop: 3 }}>Overall Fit</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {mockIdentityVector.slice(0, 5).map((v, i) => (
              <div key={v.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: i===0?700:400, color: i===0?"#0f0a14":"rgba(15,10,20,0.45)" }}>{v.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: i===0?WINE2:"rgba(15,10,20,0.35)" }}>{v.pct}%</span>
                </div>
                <div style={{ height: 3, borderRadius: 99, background: "rgba(0,0,0,0.06)", overflow: "hidden" }}>
                  <motion.div style={{ height: "100%", borderRadius: 99, background: i===0?WINE2:"rgba(0,0,0,0.18)" }}
                    initial={{ width: 0 }} animate={{ width: `${v.pct}%` }} transition={{ duration: 1, delay: 0.5+i*0.07 }} />
                </div>
              </div>
            ))}
          </div>
          {/* Mini area chart at bottom */}
          <div style={{ marginTop: 20, padding: "12px 0 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <Spark values={[62,65,68,64,70,72,74]} color={WINE2} w={200} h={44} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 9, color: "rgba(15,10,20,0.3)" }}>Mar</span>
              <span style={{ fontSize: 9, color: "rgba(15,10,20,0.3)" }}>Sep</span>
            </div>
          </div>
        </motion.div>

        {/* Timely Closures / Intelligence Dimensions */}
        <motion.div {...fade(0.32)} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 20, padding: "28px 28px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(15,10,20,0.38)", fontWeight: 700, marginBottom: 4 }}>Core Dimensions</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#0f0a14" }}>Intelligence Map</p>
            </div>
            <Gauge pct={73} color={GOLD} size={88} />
          </div>
          <div style={{ display: "flex", gap: 24, marginBottom: 22 }}>
            {[{val:"92",sub:"Done",col:WINE2},{val:"32%",sub:"Active",col:"rgba(15,10,20,0.2)"},{val:"70/0%",sub:"On Time",col:"rgba(15,10,20,0.2)"},{val:"30/5",sub:"Timely",col:"rgba(15,10,20,0.2)"}].map(s=>(
              <div key={s.sub}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#0f0a14", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 10, color: "rgba(15,10,20,0.4)", marginTop: 3 }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {mockDimensions.map((d, i) => (
              <div key={d.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: "rgba(15,10,20,0.5)" }}>{d.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#0f0a14" }}>{d.score}</span>
                </div>
                <div style={{ height: 3, borderRadius: 99, background: "rgba(0,0,0,0.06)", overflow: "hidden" }}>
                  <motion.div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg,${d.color}80,${d.color})` }}
                    initial={{ width: 0 }} animate={{ width: `${d.score}%` }} transition={{ duration: 1, delay: 0.55+i*0.07 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "12px 0 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <Spark values={[55,60,65,62,68,72,76]} color={GOLD} w={200} h={44} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 9, color: "rgba(15,10,20,0.3)" }}>Mar</span>
              <span style={{ fontSize: 9, color: "rgba(15,10,20,0.3)" }}>Sep</span>
            </div>
          </div>
        </motion.div>

        {/* AI Assistant right panel */}
        <motion.div {...fade(0.36)} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 20, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 10, background: `linear-gradient(135deg, ${WINE}, #8c2535)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <HugeiconsIcon icon={AiInnovation01Icon} size={14} style={{ color: "#fff" }} />
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#0f0a14" }}>Ask The Pull</p>
                <p style={{ fontSize: 10, color: "rgba(15,10,20,0.38)" }}>AI Intelligence Coach</p>
              </div>
            </div>
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} style={{ color: "rgba(15,10,20,0.3)" }} />
          </div>

          <div style={{ flex: 1, overflow: "auto", padding: "16px 0" }}>
            {/* User message */}
            <div style={{ padding: "0 20px 16px", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, #4a5568, #2d3748)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "white", flexShrink: 0 }}>AA</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#0f0a14" }}>{mockUser.name}</span>
                <span style={{ fontSize: 10, color: "rgba(15,10,20,0.3)", marginLeft: "auto" }}>Now</span>
              </div>
              <p style={{ fontSize: 12, color: "rgba(15,10,20,0.6)", lineHeight: 1.6 }}>Why do I struggle to open up in new relationships?</p>
            </div>

            {/* AI response */}
            <div style={{ padding: "16px 20px 16px", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${WINE}, #8c2535)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <HugeiconsIcon icon={AiInnovation01Icon} size={11} style={{ color: "#fff" }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#0f0a14" }}>The Pull</span>
                <span style={{ fontSize: 10, color: "rgba(15,10,20,0.3)", marginLeft: "auto" }}>Now</span>
              </div>
              <p style={{ fontSize: 12, color: "rgba(15,10,20,0.6)", lineHeight: 1.6, marginBottom: 10 }}>
                Based on your profile — your directness index is rising, but your self-awareness score (69) shows room to explore vulnerability.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 10, background: "rgba(61,14,26,0.05)", border: "1px solid rgba(61,14,26,0.1)", width: "fit-content" }}>
                <HugeiconsIcon icon={EyeIcon} size={11} style={{ color: WINE2 }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: WINE2 }}>Score: 74 · Emerging Identity</span>
              </div>
            </div>

            {/* Deviations section */}
            <div style={{ padding: "16px 20px" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#0f0a14", marginBottom: 12 }}>Intelligence by Dimension:</p>
              {[
                { label: "Emotional IQ", val: "81", color: WINE2 },
                { label: "Communication", val: "76", color: GOLD },
                { label: "Self-Awareness", val: "69", color: "#60a5fa" },
              ].map(d => (
                <div key={d.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: d.color, display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "rgba(15,10,20,0.6)" }}>{d.label}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#0f0a14" }}>{d.val}</span>
                </div>
              ))}
              <div style={{ height: 3, borderRadius: 99, background: "rgba(0,0,0,0.06)", overflow: "hidden", marginTop: 4 }}>
                <Bars values={[81,76,69,72,65]} color={WINE2} w={200} h={28} />
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
            <input readOnly placeholder="Ask The Pull anything…" style={{ flex: 1, fontSize: 12, border: "none", outline: "none", background: "transparent", color: "#0f0a14" }} />
            <Link href="/coach" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, background: WINE2, color: "#fff", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>
              <HugeiconsIcon icon={Message02Icon} size={12} /> Chat
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── PERSON CARDS ROW (like the reference bottom) ─────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="dash-people">
        {[
          { name: "Emotional Intelligence", desc: "Your highest-scoring dimension. Empathy and emotional regulation are strong.", score: 81, color: WINE2, icon: AiBrain01Icon },
          { name: "Ask The Pull", desc: "Your AI intelligence coach, trained on your full profile and behavioural patterns.", score: null, color: "#60a5fa", icon: AiInnovation01Icon, href: "/coach" },
          { name: "Reality Check", desc: "Compare your self-perception against what your data actually reveals about you.", score: null, color: GOLD, icon: Analytics01Icon, href: "/reports" },
        ].map((p, i) => (
          <motion.div key={p.name} {...fade(0.4 + i * 0.06)}>
            <Link href={(p as any).href ?? "/pull-profile"} style={{ textDecoration: "none", display: "block" }}>
              <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 13, background: `${p.color}15`, border: `1px solid ${p.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <HugeiconsIcon icon={p.icon} size={18} style={{ color: p.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#0f0a14" }}>{p.name}</p>
                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} style={{ color: "rgba(15,10,20,0.25)", flexShrink: 0 }} />
                  </div>
                  <p style={{ fontSize: 11, color: "rgba(15,10,20,0.45)", lineHeight: 1.6 }}>{p.desc}</p>
                  {p.score && <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ height: 3, flex: 1, borderRadius: 99, background: "rgba(0,0,0,0.06)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${p.score}%`, borderRadius: 99, background: p.color }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: p.color }}>{p.score}</span>
                  </div>}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .dash-mid  { grid-template-columns: 1fr 1fr !important; }
          .dash-mid > *:last-child { grid-column: 1 / -1; }
        }
        @media (max-width: 860px) {
          .dash-stats  { grid-template-columns: 1fr 1fr !important; }
          .dash-mid    { grid-template-columns: 1fr !important; }
          .dash-mid > *:last-child { grid-column: unset; }
          .dash-people { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
