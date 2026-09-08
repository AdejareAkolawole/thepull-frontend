"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon, AiInnovation01Icon, Activity01Icon,
  FlashIcon, PresentationLineChart01Icon, Target01Icon,
  AiBrain01Icon, EyeIcon, Analytics01Icon, FavouriteIcon, FireIcon, LockIcon,
} from "@hugeicons/core-free-icons";
import { mockUser, mockDimensions, mockInsights, mockAchievements, mockIdentityVector } from "@/lib/mock";

const WINE  = "#3d0e1a";
const WINE2 = "#6b1c2b";
const WINE3 = "#c0404f";
const CREAM = "#f5f0e8";
const CREAM2= "#e8e0d0";
const BLACK = "#0f0a14";
const GREY  = "rgba(15,10,20,0.42)";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d, ease: "easeOut" as const },
});

const achievementIconMap: Record<string, any> = {
  brain: AiBrain01Icon, eye: EyeIcon, chart: Analytics01Icon,
  star: FavouriteIcon, fire: FireIcon, target: Target01Icon,
};

// Decorative brain SVG for right side of cards
function BrainDeco({ opacity = 0.12 }: { opacity?: number }) {
  return (
    <svg viewBox="0 0 120 120" style={{ width: 110, height: 110, flexShrink: 0 }}>
      <g opacity={opacity} fill="currentColor">
        {/* brain outline simplified */}
        <ellipse cx="60" cy="55" rx="38" ry="34" fill="none" stroke="currentColor" strokeWidth="5" />
        <ellipse cx="60" cy="55" rx="20" ry="18" fill="none" stroke="currentColor" strokeWidth="3" />
        <line x1="60" y1="21" x2="60" y2="89" stroke="currentColor" strokeWidth="3" />
        <path d="M22 55 Q35 38 60 37 Q85 38 98 55" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="38" cy="42" r="5" />
        <circle cx="82" cy="42" r="5" />
        <circle cx="38" cy="68" r="4" />
        <circle cx="82" cy="68" r="4" />
        <circle cx="60" cy="30" r="3.5" />
        <circle cx="60" cy="80" r="3.5" />
      </g>
    </svg>
  );
}

function NeuralDeco({ opacity = 0.12 }: { opacity?: number }) {
  const nodes = [
    [60, 30], [30, 55], [90, 55], [45, 80], [75, 80], [60, 100],
    [15, 35], [105, 35], [20, 75], [100, 75],
  ];
  const edges = [
    [0,1],[0,2],[1,3],[2,4],[3,5],[4,5],[0,6],[0,7],[1,8],[2,9],[1,2],[3,4]
  ];
  return (
    <svg viewBox="0 0 120 130" style={{ width: 110, height: 110, flexShrink: 0 }}>
      <g opacity={opacity} stroke="currentColor" fill="currentColor">
        {edges.map(([a,b],i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} strokeWidth="1.5" />
        ))}
        {nodes.map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r={i === 0 ? 6 : 4} fill="currentColor" />
        ))}
      </g>
    </svg>
  );
}

function RadarDeco({ opacity = 0.12 }: { opacity?: number }) {
  const cx=60,cy=60,r=44,n=5;
  const rings=[0.4,0.7,1].map(p=>
    Array.from({length:n},(_,i)=>{
      const a=(i/n)*Math.PI*2-Math.PI/2;
      return `${cx+Math.cos(a)*r*p},${cy+Math.sin(a)*r*p}`;
    }).join(" ")
  );
  const pts=Array.from({length:n},(_,i)=>{
    const a=(i/n)*Math.PI*2-Math.PI/2;
    const p=[0.9,0.6,0.8,0.5,0.75][i];
    return `${cx+Math.cos(a)*r*p},${cy+Math.sin(a)*r*p}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 120 120" style={{ width: 110, height: 110, flexShrink: 0 }}>
      <g opacity={opacity} stroke="currentColor" fill="currentColor">
        {rings.map((p,i)=><polygon key={i} points={p} fill="none" strokeWidth="1.5"/>)}
        {Array.from({length:n},(_,i)=>{
          const a=(i/n)*Math.PI*2-Math.PI/2;
          return <line key={i} x1={cx} y1={cy} x2={cx+Math.cos(a)*r} y2={cy+Math.sin(a)*r} strokeWidth="1"/>;
        })}
        <polygon points={pts} fill="currentColor" fillOpacity="0.25" strokeWidth="1.5"/>
      </g>
    </svg>
  );
}

export default function DashboardClient() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* ── 1. HERO CARD ─────────────────────────────────────────────────── */}
      <motion.div {...fade(0)}>
        <div style={{
          borderRadius: 20, overflow: "hidden", position: "relative",
          background: `linear-gradient(135deg, ${WINE} 0%, ${WINE2} 70%, #8c2535 100%)`,
          padding: "44px 52px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)", marginBottom: 18, fontWeight: 600 }}>Personal Intelligence</p>
            <h1 style={{ fontSize: 40, lineHeight: 1.1, fontWeight: 700, color: "#ffffff", marginBottom: 14 }}>
              {greeting}, {mockUser.name}.<br />
              <span style={{ fontWeight: 300, color: "rgba(255,255,255,0.65)", fontSize: 36 }}>Your mind has evolved.</span>
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.48)", lineHeight: 1.7, maxWidth: 440, marginBottom: 28 }}>
              3 new insights are ready. Your intelligence profile has shifted since your last visit — new patterns are surfacing.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <Link href="/pull-profile" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 12, background: "#ffffff", color: WINE, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                View Pull Profile <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
              </Link>
              <Link href="/coach" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 12, background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)" }}>
                <HugeiconsIcon icon={AiInnovation01Icon} size={13} /> Ask The Pull
              </Link>
            </div>
          </div>
          <div style={{ color: "white", flexShrink: 0 }}>
            <BrainDeco opacity={0.15} />
          </div>
        </div>
      </motion.div>

      {/* ── 2. ARCHETYPE + INTELLIGENCE MAP ─────────────────────────────── */}
      <div className="dash-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

        {/* Archetype card */}
        <motion.div {...fade(0.07)}>
          <div style={{
            borderRadius: 20, overflow: "hidden", position: "relative",
            background: BLACK, padding: "36px 40px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
            border: `1px solid rgba(255,255,255,0.06)`,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(201,168,76,0.7)", marginBottom: 16, fontWeight: 600 }}>Primary Archetype</p>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: "#ffffff", lineHeight: 1.15, marginBottom: 8 }}>
                {mockUser.archetype}
              </h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.65, marginBottom: 24, maxWidth: 280 }}>
                {mockUser.archetype_tagline.slice(0, 100)}…
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <Link href="/pull-profile" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 11, background: WINE3, color: "white", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                  Full Profile <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
                </Link>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 11, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 12, color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>
                  {mockUser.archetype_confidence}% confidence
                </div>
              </div>
            </div>
            <div style={{ color: WINE3, flexShrink: 0 }}>
              <NeuralDeco opacity={0.18} />
            </div>
          </div>
        </motion.div>

        {/* Intelligence map */}
        <motion.div {...fade(0.11)}>
          <div style={{
            borderRadius: 20, overflow: "hidden", position: "relative",
            background: CREAM, padding: "36px 40px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
            border: `1px solid ${CREAM2}`,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: GREY, marginBottom: 16, fontWeight: 600 }}>Intelligence Map</p>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: BLACK, lineHeight: 1.15, marginBottom: 8 }}>
                5 Core<br />Dimensions
              </h2>
              <p style={{ fontSize: 13, color: GREY, lineHeight: 1.65, marginBottom: 24, maxWidth: 240 }}>
                Your intelligence spans emotional, communicative, and behavioural domains.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <Link href="/pull-profile" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 11, background: BLACK, color: "white", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                  View Map <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
                </Link>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 11, background: "rgba(15,10,20,0.06)", border: `1px solid ${CREAM2}`, fontSize: 12, color: GREY, fontWeight: 600 }}>
                  Score · 74
                </div>
              </div>
            </div>
            <div style={{ color: BLACK, flexShrink: 0 }}>
              <RadarDeco opacity={0.14} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 3. LIVING INTELLIGENCE ───────────────────────────────────────── */}
      <motion.div {...fade(0.15)}>
        <div style={{
          borderRadius: 20, overflow: "hidden", position: "relative",
          background: "#ffffff", padding: "36px 40px",
          border: "1px solid rgba(15,10,20,0.08)",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 40,
        }}>
          <div style={{ flex: "0 0 auto", maxWidth: 280 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: WINE3, marginBottom: 16, fontWeight: 600 }}>Living Intelligence</p>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: BLACK, lineHeight: 1.15, marginBottom: 8 }}>
              What The Pull<br />sees in you.
            </h2>
            <p style={{ fontSize: 13, color: GREY, lineHeight: 1.65, marginBottom: 24 }}>
              Observations, patterns, and opportunities — updated as you grow.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <Link href="/reports" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 11, background: BLACK, color: "white", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                Reality Check <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
              </Link>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "10px 14px", borderRadius: 11, background: "rgba(192,64,79,0.07)", border: "1px solid rgba(192,64,79,0.15)", fontSize: 11, color: WINE3, fontWeight: 700 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: WINE3, display: "inline-block" }} /> LIVE
              </div>
            </div>
          </div>

          {/* Insights list */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>
            {mockInsights.map((ins, i) => {
              const col = ins.type === "observation" ? BLACK : ins.type === "pattern" ? WINE3 : "#b8922a";
              return (
                <div key={ins.id} style={{ display: "flex", gap: 20, padding: "18px 0", borderBottom: i < mockInsights.length - 1 ? "1px solid rgba(15,10,20,0.06)" : "none" }}>
                  <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: col, minWidth: 80, paddingTop: 3 }}>{ins.type}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: BLACK, lineHeight: 1.35, marginBottom: 4 }}>{ins.title}</p>
                    <p style={{ fontSize: 12, color: GREY, lineHeight: 1.6 }}>{ins.body}</p>
                  </div>
                  <span style={{ fontSize: 10, color: GREY, flexShrink: 0, paddingTop: 3 }}>{ins.timestamp}</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ── 4. ASK THE PULL + ACHIEVEMENTS ───────────────────────────────── */}
      <div className="dash-row-4" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

        {/* Ask The Pull */}
        <motion.div {...fade(0.19)}>
          <div style={{
            borderRadius: 20, overflow: "hidden", position: "relative",
            background: `linear-gradient(135deg, ${WINE} 0%, ${WINE2} 100%)`,
            padding: "36px 40px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", marginBottom: 16, fontWeight: 600 }}>Your AI Coach</p>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: "#ffffff", lineHeight: 1.15, marginBottom: 8 }}>
                Ask The Pull.<br />
                <span style={{ fontWeight: 300, color: "rgba(255,255,255,0.55)", fontSize: 24 }}>It knows you.</span>
              </h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.65, marginBottom: 24, maxWidth: 280 }}>
                Trained on your full profile, dimensions, and behavioural patterns.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <Link href="/coach" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 11, background: "white", color: WINE, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                  Start session <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
                </Link>
                <Link href="/reports" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 11, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
                  View insights
                </Link>
              </div>
            </div>
            <div style={{ color: "white", flexShrink: 0 }}>
              <NeuralDeco opacity={0.15} />
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div {...fade(0.23)}>
          <div style={{
            borderRadius: 20, overflow: "hidden", position: "relative",
            background: CREAM, padding: "36px 40px",
            border: `1px solid ${CREAM2}`,
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: GREY, marginBottom: 16, fontWeight: 600 }}>Progress</p>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: BLACK, lineHeight: 1.15, marginBottom: 8 }}>
                {mockAchievements.filter(a=>a.done).length} of {mockAchievements.length}<br />
                <span style={{ fontWeight: 300, fontSize: 24, color: GREY }}>Achievements</span>
              </h2>
              <p style={{ fontSize: 13, color: GREY, lineHeight: 1.65, marginBottom: 24, maxWidth: 240 }}>
                Complete assessments to unlock the full picture of who you are.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <Link href="/journey" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 11, background: BLACK, color: "white", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                  View Journey <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
                </Link>
                <Link href="/journal" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 11, background: "rgba(15,10,20,0.06)", border: `1px solid ${CREAM2}`, color: GREY, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
                  Journal
                </Link>
              </div>
            </div>
            {/* Achievement dots grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, flexShrink: 0 }}>
              {mockAchievements.map(a => (
                <div key={a.label} title={a.label} style={{ width: 36, height: 36, borderRadius: 10, background: a.done ? `${a.color}18` : "rgba(15,10,20,0.05)", border: `1px solid ${a.done ? `${a.color}35` : "rgba(15,10,20,0.09)"}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: a.done ? 1 : 0.4 }}>
                  {a.done
                    ? <HugeiconsIcon icon={achievementIconMap[a.iconKey]} size={15} style={{ color: a.color }} />
                    : <HugeiconsIcon icon={LockIcon} size={13} style={{ color: GREY }} />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 5. IDENTITY VECTOR ───────────────────────────────────────────── */}
      <motion.div {...fade(0.27)}>
        <div style={{
          borderRadius: 20, overflow: "hidden", position: "relative",
          background: BLACK, padding: "36px 40px",
          border: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48,
        }}>
          <div style={{ flex: "0 0 auto", maxWidth: 260 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.35)", marginBottom: 16, fontWeight: 600 }}>Behavioural Data</p>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "white", lineHeight: 1.15, marginBottom: 8 }}>
              Identity<br />Vector
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.65, marginBottom: 24 }}>
              How your behavioural patterns rank across archetypes right now.
            </p>
            <Link href="/pull-profile" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 11, background: WINE3, color: "white", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
              See Full Profile <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
            </Link>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
            {mockIdentityVector.map((v, i) => (
              <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 12, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? "white" : "rgba(255,255,255,0.35)", minWidth: 150, flexShrink: 0 }}>{v.label}</span>
                <div style={{ flex: 1, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                  <motion.div
                    style={{ height: "100%", borderRadius: 99, background: i === 0 ? `linear-gradient(90deg, ${WINE2}, ${WINE3})` : "rgba(255,255,255,0.2)" }}
                    initial={{ width: 0 }} animate={{ width: `${v.pct}%` }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.07 }}
                  />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? WINE3 : "rgba(255,255,255,0.3)", minWidth: 36, textAlign: "right" as const }}>{v.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .dash-row-2, .dash-row-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
