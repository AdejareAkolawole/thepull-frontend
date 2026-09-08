"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon, AiSparklesIcon, AiInnovation01Icon, Activity01Icon,
  FlashIcon, PresentationLineChart01Icon, Target01Icon,
  AiBrain01Icon, EyeIcon, Analytics01Icon, FavouriteIcon, FireIcon, LockIcon,
} from "@hugeicons/core-free-icons";
import { mockUser, mockDimensions, mockInsights, mockAchievements, mockIdentityVector } from "@/lib/mock";

// ─── Design tokens ──────────────────────────────────────────────────────────
const WINE   = "#3d0e1a";
const WINE2  = "#6b1c2b";
const WINE3  = "#c0404f";
const CREAM  = "#f5f0e8";
const CREAM2 = "#ede7da";
const BLACK  = "#0f0a14";
const GREY   = "rgba(15,10,20,0.45)";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay: d, ease: "easeOut" as const },
});

const achievementIconMap: Record<string, any> = {
  brain: AiBrain01Icon, eye: EyeIcon, chart: Analytics01Icon,
  star: FavouriteIcon, fire: FireIcon, target: Target01Icon,
};

// ─── Radar chart ─────────────────────────────────────────────────────────────
function RadarChart({ dimensions }: { dimensions: typeof mockDimensions }) {
  const cx = 100, cy = 100, r = 70, n = dimensions.length;
  const pts = dimensions.map((d, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + Math.cos(a) * r * (d.score / 100),
      y: cy + Math.sin(a) * r * (d.score / 100),
      lx: cx + Math.cos(a) * (r + 16),
      ly: cy + Math.sin(a) * (r + 16),
      label: d.label.split(" ")[0],
    };
  });
  const rings = [0.33, 0.66, 1].map(pct =>
    dimensions.map((_, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      return `${cx + Math.cos(a) * r * pct},${cy + Math.sin(a) * r * pct}`;
    }).join(" ")
  );
  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: 200 }}>
      <defs>
        <linearGradient id="rFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={WINE} stopOpacity="0.25" />
          <stop offset="100%" stopColor={WINE3} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {rings.map((p, i) => <polygon key={i} points={p} fill="none" stroke="rgba(15,10,20,0.08)" strokeWidth="1" />)}
      {dimensions.map((_, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r} stroke="rgba(15,10,20,0.07)" strokeWidth="1" />;
      })}
      <polygon points={pts.map(p => `${p.x},${p.y}`).join(" ")} fill="url(#rFill)" stroke={WINE3} strokeWidth="1.5" strokeLinejoin="round" />
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill={WINE3} />)}
      {pts.map((p, i) => (
        <text key={i} x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: 7, fill: GREY, fontFamily: "Inter,sans-serif" }}>{p.label}</text>
      ))}
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 22, fontWeight: 800, fill: BLACK, fontFamily: "Inter,sans-serif" }}>74</text>
      <text x={cx} y={cy + 10} textAnchor="middle" style={{ fontSize: 6.5, fill: GREY, fontFamily: "Inter,sans-serif", letterSpacing: 2 }}>PULL SCORE</text>
    </svg>
  );
}

export default function DashboardClient() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <motion.div {...fade(0)}>
        <div style={{
          borderRadius: 20, overflow: "hidden", position: "relative",
          background: `linear-gradient(135deg, ${WINE} 0%, ${WINE2} 60%, #a03040 100%)`,
          padding: "48px 52px",
        }}>
          {/* Subtle circle decoration */}
          <div style={{ position: "absolute", right: -60, top: -60, width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: -20, top: -20, width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none" }} />

          <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40, flexWrap: "wrap" as const }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)", marginBottom: 20, fontWeight: 600 }}>Personal Intelligence</p>
              <h1 style={{ fontSize: 52, lineHeight: 1.05, fontWeight: 300, color: "rgba(255,255,255,0.75)", marginBottom: 0 }}>{greeting},</h1>
              <h1 style={{ fontSize: 52, lineHeight: 1.05, fontWeight: 700, color: "#ffffff", marginBottom: 20 }}>{mockUser.name}.</h1>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 400, marginBottom: 32 }}>
                3 new insights are ready. Your intelligence profile has evolved since your last visit.
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
            {/* Archetype badge */}
            <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 16, padding: "20px 24px", border: "1px solid rgba(255,255,255,0.1)", minWidth: 200 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(201,168,76,0.7)", marginBottom: 10 }}>Primary Archetype</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: 6 }}>{mockUser.archetype}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: WINE3, fontWeight: 700 }}>{mockUser.archetype_confidence}% confidence</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "inline-block" }} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{mockUser.archetype_version}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── ROW 2: Intelligence map + Insights ──────────────────────────── */}
      <div className="dash-row-2" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 14 }}>

        {/* Intelligence map */}
        <motion.div {...fade(0.07)}>
          <div style={{ borderRadius: 20, padding: "24px", background: CREAM, border: `1px solid ${CREAM2}`, height: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: GREY, marginBottom: 4 }}>Intelligence Map</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: BLACK }}>5 Dimensions</p>
              </div>
              <Link href="/pull-profile" style={{ fontSize: 11, fontWeight: 700, color: WINE3, textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
                Full view <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
              </Link>
            </div>
            <RadarChart dimensions={mockDimensions} />
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              {mockDimensions.map(d => (
                <div key={d.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: GREY }}>{d.label.split(" ")[0]}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: BLACK }}>{d.score}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Living Intelligence */}
        <motion.div {...fade(0.11)}>
          <div style={{ borderRadius: 20, padding: "28px", background: "#ffffff", border: "1px solid rgba(15,10,20,0.08)", height: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: GREY, marginBottom: 4 }}>Updated now</p>
                <p style={{ fontSize: 18, fontWeight: 700, color: BLACK }}>Living Intelligence</p>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 9, fontWeight: 800, padding: "4px 10px", borderRadius: 99, background: "rgba(192,64,79,0.07)", color: WINE3, border: `1px solid rgba(192,64,79,0.15)`, letterSpacing: "0.1em" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: WINE3, display: "inline-block" }} /> LIVE
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {mockInsights.map((ins, i) => {
                const typeColor = ins.type === "observation" ? BLACK : ins.type === "pattern" ? WINE3 : "#c9a84c";
                return (
                  <div key={ins.id} style={{ display: "flex", gap: 16, padding: "18px 0", borderBottom: i < mockInsights.length - 1 ? "1px solid rgba(15,10,20,0.06)" : "none", cursor: "pointer" }}>
                    <div style={{ paddingTop: 3, flexShrink: 0 }}>
                      <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: typeColor }}>{ins.type}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: BLACK, lineHeight: 1.4, marginBottom: 4 }}>{ins.title}</p>
                      <p style={{ fontSize: 12, color: GREY, lineHeight: 1.6 }}>{ins.body}</p>
                    </div>
                    <span style={{ fontSize: 10, color: GREY, flexShrink: 0, paddingTop: 3 }}>{ins.timestamp}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── ROW 3: Identity vector + Achievements + Ask The Pull ────────── */}
      <div className="dash-row-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 280px", gap: 14 }}>

        {/* Identity vector */}
        <motion.div {...fade(0.15)}>
          <div style={{ borderRadius: 20, padding: "28px", background: CREAM, border: `1px solid ${CREAM2}`, height: "100%" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: GREY, marginBottom: 6 }}>Identity Vector</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: BLACK, marginBottom: 24 }}>Behavioural Alignment</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {mockIdentityVector.map((v, i) => (
                <div key={v.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? BLACK : GREY }}>{v.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? WINE3 : GREY }}>{v.pct}%</span>
                  </div>
                  <div style={{ height: 3, borderRadius: 99, background: "rgba(15,10,20,0.07)", overflow: "hidden" }}>
                    <motion.div
                      style={{ height: "100%", borderRadius: 99, background: i === 0 ? `linear-gradient(90deg, ${WINE}, ${WINE3})` : "rgba(15,10,20,0.18)" }}
                      initial={{ width: 0 }} animate={{ width: `${v.pct}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.07 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div {...fade(0.19)}>
          <div style={{ borderRadius: 20, padding: "28px", background: "#ffffff", border: "1px solid rgba(15,10,20,0.08)", height: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: GREY, marginBottom: 4 }}>Progress</p>
                <p style={{ fontSize: 18, fontWeight: 700, color: BLACK }}>Achievements</p>
              </div>
              <span style={{ fontSize: 11, color: GREY }}>{mockAchievements.filter(a => a.done).length}/{mockAchievements.length}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {mockAchievements.map(a => (
                <div key={a.label} style={{ display: "flex", alignItems: "center", gap: 12, opacity: a.done ? 1 : 0.4 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: a.done ? `${a.color}12` : "rgba(15,10,20,0.04)", border: `1px solid ${a.done ? `${a.color}30` : "rgba(15,10,20,0.07)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {a.done
                      ? <HugeiconsIcon icon={achievementIconMap[a.iconKey]} size={14} style={{ color: a.color }} />
                      : <HugeiconsIcon icon={LockIcon} size={12} style={{ color: GREY }} />
                    }
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: BLACK, lineHeight: 1.2 }}>{a.label}</p>
                    <p style={{ fontSize: 10, color: GREY, marginTop: 1 }}>{a.desc}</p>
                  </div>
                  {a.done && <span style={{ width: 6, height: 6, borderRadius: "50%", background: a.color, flexShrink: 0 }} />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Ask The Pull + Quick nav */}
        <motion.div {...fade(0.23)} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Ask The Pull */}
          <div style={{
            borderRadius: 20, padding: "28px", flex: 1,
            background: `linear-gradient(160deg, ${WINE} 0%, ${WINE2} 100%)`,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", bottom: -40, right: -40, width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", marginBottom: 6 }}>Your Coach</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: 10 }}>Ask The Pull</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: 24 }}>
                Your AI coach is ready — trained on your full profile, dimensions, and patterns.
              </p>
              <Link href="/coach" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 20px", borderRadius: 12, background: "white", color: WINE, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                Start session <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
              </Link>
            </div>
          </div>

          {/* Quick nav */}
          <div style={{ borderRadius: 20, padding: "20px", background: CREAM, border: `1px solid ${CREAM2}` }}>
            <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: GREY, marginBottom: 14 }}>Quick Access</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { label: "Reality Check", href: "/reports", icon: PresentationLineChart01Icon },
                { label: "Journey", href: "/journey", icon: Target01Icon },
                { label: "Journal", href: "/journal", icon: FlashIcon },
              ].map(a => (
                <Link key={a.label} href={a.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, textDecoration: "none", color: BLACK, fontSize: 13, fontWeight: 500 }}>
                  <HugeiconsIcon icon={a.icon} size={14} style={{ color: GREY }} />
                  {a.label}
                  <HugeiconsIcon icon={ArrowRight01Icon} size={11} style={{ color: GREY, marginLeft: "auto" }} />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dash-row-2 { grid-template-columns: 1fr !important; }
          .dash-row-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
