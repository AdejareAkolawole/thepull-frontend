"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon, AiBrain01Icon, Analytics01Icon, FavouriteIcon,
  FireIcon, Target01Icon, EyeIcon, LockIcon, ArrowUpRight01Icon,
  FlashIcon, Message02Icon,
} from "@hugeicons/core-free-icons";
import { mockUser, mockInsights, mockAchievements, mockIdentityVector, mockDimensions } from "@/lib/mock";

// ── Palette ──────────────────────────────────────────────────────────────────
const WINE   = "#c0404f";
const GOLD   = "#c9a84c";
const CREAM  = "#f5f0e8";
const WHITE  = "#ffffff";

// Glass tokens
const GLASS       = "rgba(255,255,255,0.055)";
const GLASS_HOVER = "rgba(255,255,255,0.08)";
const GLASS_BORDER= "rgba(255,255,255,0.09)";
const GLASS_DEEP  = "rgba(255,255,255,0.03)";
const BLUR        = "blur(24px)";
const DIM         = "rgba(255,255,255,0.28)";
const MUTED       = "rgba(255,255,255,0.14)";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d, ease: [0.16, 1, 0.3, 1] as any },
});

// ── Glass card wrapper ───────────────────────────────────────────────────────
function GCard({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div {...fade(delay)} style={{
      background: GLASS, backdropFilter: BLUR, WebkitBackdropFilter: BLUR,
      border: `1px solid ${GLASS_BORDER}`, borderRadius: 20,
      overflow: "hidden", ...style,
    }}>
      {children}
    </motion.div>
  );
}

// ── Mini sparkline ───────────────────────────────────────────────────────────
function Spark({ values, color = WINE, h = 40 }: { values: number[]; color?: string; h?: number }) {
  const max = Math.max(...values), min = Math.min(...values);
  const w = 120;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 6) - 3;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <circle cx={pts.split(" ").at(-1)!.split(",")[0]} cy={pts.split(" ").at(-1)!.split(",")[1]} r="3.5" fill={color} />
    </svg>
  );
}

// ── Gauge arc ────────────────────────────────────────────────────────────────
function Gauge({ pct, color = GOLD, size = 90 }: { pct: number; color?: string; size?: number }) {
  const r = 34, cx = size / 2, cy = size / 2;
  const circ = Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={GLASS_BORDER} strokeWidth="6" strokeLinecap="round" />
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`} style={{ transition: "stroke-dasharray 1.2s ease" }} />
      <text x={cx} y={cy + 2} textAnchor="middle" fill={WHITE} fontSize="16" fontWeight="700">{pct}%</text>
    </svg>
  );
}

const sparkScores = [62, 65, 68, 64, 70, 72, 74];
const sparkDims   = [55, 60, 65, 62, 68, 72, 76];

const achievementIconMap: Record<string, any> = {
  brain: AiBrain01Icon, eye: EyeIcon, chart: Analytics01Icon,
  star: FavouriteIcon, fire: FireIcon, target: Target01Icon,
};

export default function DashboardClient() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening";
  const done = mockAchievements.filter(a => a.done).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

      {/* ── HERO ROW ─────────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 12 }} className="dash-hero">

        {/* Hero left */}
        <GCard delay={0} style={{ padding: "44px 48px", position: "relative", overflow: "hidden", minHeight: 220 }}>
          {/* faint wine glow */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,64,79,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
          <p style={{ fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: MUTED, marginBottom: 12, fontWeight: 700 }}>Personal Intelligence</p>
          <h1 style={{ fontSize: 42, fontWeight: 700, color: WHITE, lineHeight: 1.1, marginBottom: 8 }}>
            {greeting}, {mockUser.name}.
          </h1>
          <p style={{ fontSize: 15, color: DIM, lineHeight: 1.7, marginBottom: 28, maxWidth: 420 }}>
            3 new intelligence signals since your last visit. Your profile is {mockUser.archetype_confidence}% calibrated.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/pull-profile" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 12, background: WHITE, color: "#0f0a14", fontSize: 12, fontWeight: 800, textDecoration: "none", letterSpacing: "-0.01em" }}>
              Pull Profile <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
            </Link>
            <Link href="/coach" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 12, background: GLASS, border: `1px solid ${GLASS_BORDER}`, color: DIM, fontSize: 12, fontWeight: 600, textDecoration: "none", backdropFilter: BLUR }}>
              <HugeiconsIcon icon={Message02Icon} size={13} /> Ask The Pull
            </Link>
          </div>
        </GCard>

        {/* Hero right — Pull Score featured card */}
        <GCard delay={0.06} style={{ padding: "36px 36px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.26em", textTransform: "uppercase", color: MUTED, fontWeight: 700, marginBottom: 6 }}>Your Pull Score</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 64, fontWeight: 800, color: WHITE, lineHeight: 1, letterSpacing: "-0.03em" }}>74</span>
                <span style={{ fontSize: 13, color: GOLD, fontWeight: 700 }}>↑ +3</span>
              </div>
            </div>
            <div style={{ padding: "6px 12px", borderRadius: 99, background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.22)", fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {mockUser.archetype_stage}
            </div>
          </div>
          <p style={{ fontSize: 11, color: MUTED, marginBottom: 16, fontWeight: 600, letterSpacing: "0.02em" }}>THE ANALYTICAL CONNECTOR</p>
          <Spark values={sparkScores} color={GOLD} h={44} />
          <p style={{ fontSize: 10, color: MUTED, marginTop: 6 }}>Score over last 7 assessments</p>
        </GCard>
      </div>

      {/* ── STAT STRIP ───────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }} className="dash-stats">
        {[
          { label: "Archetype Confidence", val: "72%", sub: "72 of 100 calibrated", color: WINE, spark: [55,60,58,65,68,70,72] },
          { label: "Dimensions Mapped",    val: "5/5", sub: "All core dimensions active", color: "#60a5fa", spark: [2,3,3,4,4,5,5] },
          { label: "Intelligence Signals", val: "847", sub: "Total data points collected", color: "#34d399", spark: [600,650,680,710,760,800,847] },
          { label: "Reflection Streak",    val: "12",  sub: "Days of consecutive activity", color: GOLD, spark: [4,5,6,7,9,11,12] },
        ].map((s, i) => (
          <GCard key={s.label} delay={0.1 + i * 0.04} style={{ padding: "24px 24px 20px" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED, marginBottom: 12, fontWeight: 700 }}>{s.label}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: WHITE, lineHeight: 1, letterSpacing: "-0.03em" }}>{s.val}</span>
              <Spark values={s.spark} color={s.color} h={36} />
            </div>
            <p style={{ fontSize: 10, color: MUTED, marginTop: 10 }}>{s.sub}</p>
          </GCard>
        ))}
      </div>

      {/* ── MIDDLE ROW ───────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 380px", gap: 12 }} className="dash-mid">

        {/* Identity Vector */}
        <GCard delay={0.22} style={{ padding: "28px 28px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED, fontWeight: 700, marginBottom: 4 }}>Identity Vector</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: WHITE }}>Archetype Fit</p>
            </div>
            <Link href="/pull-profile" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: MUTED, textDecoration: "none" }}>
              View all <HugeiconsIcon icon={ArrowUpRight01Icon} size={11} />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {mockIdentityVector.map((v, i) => (
              <div key={v.label}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <span style={{ fontSize: 11, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? WHITE : MUTED }}>{v.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? WINE : MUTED }}>{v.pct}%</span>
                </div>
                <div style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                  <motion.div style={{ height: "100%", borderRadius: 99, background: i === 0 ? `linear-gradient(90deg,${WINE},#e05565)` : "rgba(255,255,255,0.18)" }}
                    initial={{ width: 0 }} animate={{ width: `${v.pct}%` }} transition={{ duration: 1, delay: 0.5 + i * 0.06 }} />
                </div>
              </div>
            ))}
          </div>
        </GCard>

        {/* Intelligence Dimensions */}
        <GCard delay={0.26} style={{ padding: "28px 28px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED, fontWeight: 700, marginBottom: 4 }}>Core Dimensions</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: WHITE }}>Intelligence Map</p>
            </div>
            <Gauge pct={72} color={GOLD} size={80} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mockDimensions.map((d, i) => (
              <div key={d.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 11, color: MUTED }}>{d.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: WHITE }}>{d.score}</span>
                </div>
                <div style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                  <motion.div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${d.color}99, ${d.color})` }}
                    initial={{ width: 0 }} animate={{ width: `${d.score}%` }} transition={{ duration: 1, delay: 0.55 + i * 0.07 }} />
                </div>
              </div>
            ))}
          </div>
        </GCard>

        {/* Living Intelligence feed — like the AI assistant panel */}
        <GCard delay={0.3} style={{ padding: "0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "24px 24px 18px", borderBottom: `1px solid ${GLASS_BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED, fontWeight: 700, marginBottom: 4 }}>Live</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: WHITE }}>Intelligence Feed</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "#34d399" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", display: "inline-block" }} /> Active
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
            {mockInsights.map((ins, i) => {
              const col = ins.type === "observation" ? WINE : ins.type === "pattern" ? "#60a5fa" : GOLD;
              return (
                <div key={ins.id} style={{ padding: "14px 24px", borderBottom: i < mockInsights.length - 1 ? `1px solid ${GLASS_DEEP}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: col }}>{ins.type}</span>
                    <span style={{ fontSize: 9, color: MUTED }}>{ins.timestamp}</span>
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: WHITE, lineHeight: 1.4, marginBottom: 4 }}>{ins.title}</p>
                  <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.6 }}>{ins.body}</p>
                </div>
              );
            })}
          </div>
          <div style={{ padding: "16px 24px", borderTop: `1px solid ${GLASS_BORDER}` }}>
            <Link href="/coach" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px", borderRadius: 12, background: GLASS, border: `1px solid ${GLASS_BORDER}`, color: DIM, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
              <HugeiconsIcon icon={Message02Icon} size={13} /> Ask The Pull
            </Link>
          </div>
        </GCard>
      </div>

      {/* ── BOTTOM ROW ───────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="dash-bottom">

        {/* Achievements */}
        <GCard delay={0.36} style={{ padding: "28px 28px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED, fontWeight: 700, marginBottom: 4 }}>Progress</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: WHITE }}>{done} of {mockAchievements.length} Achievements</p>
            </div>
            <Link href="/journey" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: MUTED, textDecoration: "none" }}>
              Journey <HugeiconsIcon icon={ArrowUpRight01Icon} size={11} />
            </Link>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {mockAchievements.map(a => (
              <div key={a.label} title={a.label} style={{ width: 48, height: 48, borderRadius: 14, background: a.done ? `${a.color}15` : GLASS_DEEP, border: `1px solid ${a.done ? `${a.color}30` : GLASS_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: a.done ? 1 : 0.4 }}>
                {a.done ? <HugeiconsIcon icon={achievementIconMap[a.iconKey]} size={18} style={{ color: a.color }} /> : <HugeiconsIcon icon={LockIcon} size={15} style={{ color: MUTED }} />}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <motion.div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${WINE}, #e05565)` }}
              initial={{ width: 0 }} animate={{ width: `${(done / mockAchievements.length) * 100}%` }} transition={{ duration: 1.2, delay: 0.6 }} />
          </div>
          <p style={{ fontSize: 10, color: MUTED, marginTop: 8 }}>{Math.round((done / mockAchievements.length) * 100)}% complete — {mockAchievements.length - done} remaining</p>
        </GCard>

        {/* Journey CTA */}
        <GCard delay={0.4} style={{ padding: "28px 28px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
          <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED, fontWeight: 700, marginBottom: 12 }}>Next Step</p>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: WHITE, lineHeight: 1.25, marginBottom: 10 }}>
            Deepen your<br />self-awareness score.
          </h3>
          <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.7, marginBottom: 22 }}>
            Complete the Emotional Landscape assessment to unlock your full profile and next insight tier.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/journey" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 20px", borderRadius: 12, background: WINE, color: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
              <HugeiconsIcon icon={FlashIcon} size={13} /> Start Assessment
            </Link>
            <Link href="/reports" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 20px", borderRadius: 12, background: GLASS, border: `1px solid ${GLASS_BORDER}`, color: DIM, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
              Reality Check
            </Link>
          </div>
        </GCard>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .dash-hero  { grid-template-columns: 1fr !important; }
          .dash-mid   { grid-template-columns: 1fr 1fr !important; }
          .dash-mid > *:last-child { grid-column: 1 / -1; }
        }
        @media (max-width: 700px) {
          .dash-stats  { grid-template-columns: 1fr 1fr !important; }
          .dash-mid    { grid-template-columns: 1fr !important; }
          .dash-mid > *:last-child { grid-column: unset; }
          .dash-bottom { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
