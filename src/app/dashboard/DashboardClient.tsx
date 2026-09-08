"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  TrendingUpIcon, ArrowRight01Icon, AiSparklesIcon,
  AiInnovation01Icon, Activity01Icon,
  FlashIcon, PresentationLineChart01Icon, Calendar03Icon, Target01Icon,
  AiBrain01Icon, EyeIcon, Analytics01Icon, FavouriteIcon, FireIcon, CheckmarkCircle01Icon, LockIcon,
  HeartIcon, Message02Icon, ShieldIcon,
} from "@hugeicons/core-free-icons";
import { mockUser, mockDimensions, mockInsights, mockAchievements, mockIdentityVector } from "@/lib/mock";

const relationshipDimensions = [
  { label: "How You Love", sub: "ATTACHMENT", icon: HeartIcon },
  { label: "How You Communicate", sub: "COMMUNICATION STYLE", icon: Message02Icon },
  { label: "How You Handle Conflict", sub: "CONFLICT STYLE", icon: Activity01Icon },
  { label: "How You Build Trust", sub: "RELATIONSHIP CONSTITUTION", icon: ShieldIcon },
  { label: "What You Value", sub: "LOVE STYLE", icon: Target01Icon },
];

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

const CARD_BG = "linear-gradient(140deg, #3d0e1a 0%, #6b1c2b 45%, #a03040 100%)";
const CARD_BORDER = "1px solid rgba(255,255,255,0.08)";

const Card = ({ children, className = "", style = {} }: any) => (
  <div className={`rounded-2xl ${className}`} style={{
    background: CARD_BG,
    border: CARD_BORDER,
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
      {rings.map((p, i) => <polygon key={i} points={p} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />)}
      {dimensions.map((_, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(angle) * r} y2={cy + Math.sin(angle) * r} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
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
          style={{ fontSize: 7.5, fill: "rgba(255,255,255,0.45)", fontFamily: "Inter,sans-serif" }}>
          {p.label}
        </text>
      ))}
      <text x={cx} y={cy - 7} textAnchor="middle" style={{ fontSize: 20, fontWeight: 700, fill: "white", fontFamily: "Inter,sans-serif" }}>74</text>
      <text x={cx} y={cy + 10} textAnchor="middle" style={{ fontSize: 7, fill: "rgba(255,255,255,0.4)", fontFamily: "Inter,sans-serif", letterSpacing: 2 }}>PULL SCORE</text>
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

      {/* ROW 1: Hero + Score */}
      <div className="dash-row-1" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 12 }}>

        {/* Hero */}
        <motion.div {...fade(0)} className="rounded-2xl relative overflow-hidden" style={{ minHeight: 240, background: "linear-gradient(140deg, #3d0e1a 0%, #6b1c2b 45%, #a03040 100%)" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 10% 20%, rgba(255,255,255,0.05) 0%, transparent 60%)" }} />
          <div className="dash-hero-inner" style={{ position: "relative", padding: "36px 40px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 16 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80" }} />
                <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>Relationship Intelligence</span>
              </div>
              <h1 className="font-display" style={{ fontSize: 46, lineHeight: 1.06, fontWeight: 300, color: "rgba(255,255,255,0.8)", marginBottom: 2 }}>{greeting},</h1>
              <h1 className="font-display" style={{ fontSize: 46, lineHeight: 1.06, fontWeight: 600, color: "#fff", marginBottom: 14 }}>{mockUser.name}.</h1>
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
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 24, flexWrap: "wrap" as const }}>
              {[{ label: "Analytical", color: "#c0404f" }, { label: "Empathetic", color: "#60a5fa" }, { label: "Strategic", color: "#a78bfa" }].map(t => (
                <span key={t.label} style={{ fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 99, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em" }}>
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Archetype card */}
        <motion.div {...fade(0.06)}>
          <div style={{
            height: "100%", borderRadius: 20, overflow: "hidden",
            background: "linear-gradient(160deg, #050102 0%, #0d0306 40%, #160508 100%)",
            border: "1px solid rgba(192,64,79,0.2)",
            display: "flex", flexDirection: "column",
            position: "relative",
          }}>
            {/* Glow orb */}
            <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,64,79,0.18), transparent 70%)", pointerEvents: "none" }} />

            {/* Top section */}
            <div style={{ padding: "22px 22px 18px", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
                <div>
                  <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(201,168,76,0.65)", marginBottom: 5 }}>Primary Archetype</p>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 99, background: "rgba(192,64,79,0.15)", color: "rgba(192,64,79,0.9)", border: "1px solid rgba(192,64,79,0.25)" }}>
                    {mockUser.archetype_stage}
                  </span>
                </div>
                <div style={{ width: 38, height: 38, borderRadius: 12, border: "1.5px solid rgba(192,64,79,0.4)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(192,64,79,0.08)" }}>
                  <HugeiconsIcon icon={AiBrain01Icon} size={18} style={{ color: "#c0404f" }} />
                </div>
              </div>
              <p style={{ fontSize: 22, fontWeight: 700, color: "white", lineHeight: 1.15, marginBottom: 6 }}>{mockUser.archetype}</p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", lineHeight: 1.55 }}>
                {mockUser.archetype_tagline.slice(0, 90)}…
              </p>
            </div>

            {/* Confidence + Version */}
            <div style={{ margin: "0 22px", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ padding: "12px 0" }}>
                <p style={{ fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.22)", marginBottom: 4 }}>Confidence</p>
                <p style={{ fontSize: 26, fontWeight: 800, color: "#c0404f" }}>{mockUser.archetype_confidence}%</p>
              </div>
              <div style={{ padding: "12px 0 12px 16px", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.22)", marginBottom: 4 }}>Version</p>
                <p style={{ fontSize: 26, fontWeight: 800, color: "#c0404f" }}>{mockUser.archetype_version}</p>
              </div>
            </div>

            {/* Identity vector mini bars */}
            <div style={{ padding: "14px 22px", flex: 1 }}>
              <p style={{ fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)", marginBottom: 10 }}>Identity Vector</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {mockIdentityVector.slice(0, 4).map((v, i) => (
                  <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 9, color: i === 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)", minWidth: 110, fontWeight: i === 0 ? 700 : 400 }}>{v.label}</span>
                    <div style={{ flex: 1, height: 2, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                      <motion.div
                        style={{ height: "100%", borderRadius: 99, background: v.color, opacity: i === 0 ? 1 : 0.5 }}
                        initial={{ width: 0 }} animate={{ width: `${v.pct}%` }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.08 }}
                      />
                    </div>
                    <span style={{ fontSize: 9, color: i === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)", minWidth: 26, textAlign: "right" as const }}>{v.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer link */}
            <div style={{ padding: "0 22px 18px" }}>
              <Link href="/pull-profile" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                padding: "9px 0", borderRadius: 10, fontSize: 11, fontWeight: 700,
                color: "rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none",
              }}>
                View Full Profile <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ROW 2: Radar + Insights + Side column */}
      <div className="dash-row-2" style={{ display: "grid", gridTemplateColumns: "220px 1fr 210px", gap: 12 }}>

        <motion.div {...fade(0.09)}>
          <Card style={{ padding: 16, height: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "white" }}>Intelligence Map</p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>5 dimensions</p>
              </div>
              <Link href="/pull-profile" style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Full view →</Link>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <RadarChart dimensions={mockDimensions} />
            </div>
          </Card>
        </motion.div>

        <motion.div {...fade(0.12)}>
          <Card style={{ padding: 16, height: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "white" }}>Living Intelligence</p>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 99, background: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.15)", letterSpacing: "0.08em" }}>
                <HugeiconsIcon icon={AiSparklesIcon} size={9} /> LIVE
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {mockInsights.map(ins => {
                const cfg = ins.type === "observation"
                  ? { col: "#93c5fd", bg: "rgba(147,197,253,0.1)", icon: Activity01Icon }
                  : ins.type === "pattern"
                  ? { col: "#fca5a5", bg: "rgba(252,165,165,0.1)", icon: PresentationLineChart01Icon }
                  : { col: "#fcd34d", bg: "rgba(252,211,77,0.1)", icon: FlashIcon };
                return (
                  <div key={ins.id} style={{ display: "flex", gap: 10, padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.15)", cursor: "pointer" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <HugeiconsIcon icon={cfg.icon} size={13} style={{ color: cfg.col }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: cfg.col }}>{ins.type}</span>
                        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>{ins.timestamp}</span>
                      </div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "white", lineHeight: 1.35, marginBottom: 3 }}>{ins.title}</p>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{ins.body}</p>
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
                <p style={{ fontSize: 12, fontWeight: 700, color: "white" }}>Achievements</p>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>{mockAchievements.filter(a => a.done).length}/{mockAchievements.length} unlocked</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                {mockAchievements.map(a => (
                  <div key={a.label} style={{
                    borderRadius: 12, padding: "10px 10px 8px",
                    background: a.done ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)",
                    border: `1px solid ${a.done ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                    opacity: a.done ? 1 : 0.5,
                    position: "relative", overflow: "hidden",
                  }}>
                    <div style={{ marginBottom: 6, display: "flex", alignItems: "center" }}>
                      {a.done
                        ? <HugeiconsIcon icon={achievementIconMap[a.iconKey]} size={18} style={{ color: "white" }} />
                        : <HugeiconsIcon icon={LockIcon} size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
                      }
                    </div>
                    <p style={{ fontSize: 10, fontWeight: 700, color: a.done ? "white" : "rgba(255,255,255,0.4)", lineHeight: 1.2 }}>{a.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div {...fade(0.19)}>
            <Card style={{ padding: 16 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <HugeiconsIcon icon={AiInnovation01Icon} size={14} style={{ color: "white" }} />
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "white", marginBottom: 4 }}>Ask The Pull</p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, marginBottom: 12 }}>Your AI coach is ready with full profile context.</p>
              <Link href="/coach" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "8px 0", borderRadius: 10, background: "rgba(255,255,255,0.14)", color: "white", fontSize: 11, fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}>
                Start session <HugeiconsIcon icon={ArrowRight01Icon} size={10} />
              </Link>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* ROW 3: Quick Actions full width */}
      <motion.div {...fade(0.25)}>
        <Card style={{ padding: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "white", marginBottom: 10 }}>Quick Actions</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7, marginBottom: 8 }}>
            {[
              { label: "AI Coach", href: "/coach", icon: AiInnovation01Icon, color: "#93c5fd", bg: "rgba(147,197,253,0.12)" },
              { label: "Reports", href: "/reports", icon: PresentationLineChart01Icon, color: "#c4b5fd", bg: "rgba(196,181,253,0.12)" },
              { label: "Journey", href: "/journey", icon: Target01Icon, color: "#fcd34d", bg: "rgba(252,211,77,0.12)" },
              { label: "Journal", href: "/journal", icon: FlashIcon, color: "#fca5a5", bg: "rgba(252,165,165,0.12)" },
            ].map(a => (
              <Link key={a.label} href={a.href} style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-start", gap: 8, padding: 12, borderRadius: 12, background: a.bg, textDecoration: "none", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <HugeiconsIcon icon={a.icon} size={13} style={{ color: a.color }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: a.color }}>{a.label}</span>
              </Link>
            ))}
          </div>
          <div style={{ padding: "10px 12px", borderRadius: 12, background: "rgba(0,0,0,0.15)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "flex-start", gap: 9 }}>
            <HugeiconsIcon icon={Calendar03Icon} size={13} style={{ color: "rgba(255,255,255,0.5)", flexShrink: 0, marginTop: 1 }} />
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "white" }}>Today's focus</p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2, lineHeight: 1.4 }}>Complete your Emotional Landscape assessment</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* WHO AM I SECTION */}

      {/* Heading */}
      <motion.div {...fade(0.28)} style={{ textAlign: "center", padding: "24px 0 8px" }}>
        <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>Your Living Identity</p>
        <h2 style={{ fontSize: 52, fontWeight: 700, color: "white", letterSpacing: "-0.03em", lineHeight: 1 }}>Who Am I?</h2>
      </motion.div>

      {/* Archetype / Current Lens */}
      <motion.div {...fade(0.31)}>
        <div style={{
          borderRadius: 20, padding: "28px 28px",
          background: "linear-gradient(145deg, #0d0306 0%, #1a0508 50%, #0d0306 100%)",
          border: "1px solid rgba(192,64,79,0.15)",
          display: "flex", alignItems: "center", gap: 24,
        }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, border: "2px solid rgba(96,165,250,0.5)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(96,165,250,0.08)", flexShrink: 0 }}>
            <HugeiconsIcon icon={ShieldIcon} size={32} style={{ color: "#60a5fa" }} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.8)" }}>Your Current Lens</p>
              <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: "rgba(192,64,79,0.15)", color: "rgba(192,64,79,0.9)", border: "1px solid rgba(192,64,79,0.25)" }}>
                {mockUser.archetype_stage}
              </span>
            </div>
            <p style={{ fontSize: 28, fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: 4 }}>{mockUser.archetype}</p>
            <p style={{ fontSize: 13, color: "rgba(192,64,79,0.6)", fontStyle: "italic" }}>Steady presence is the strongest love.</p>
          </div>
        </div>
      </motion.div>

      {/* A Glimpse of Your Story */}
      <motion.div {...fade(0.34)}>
        <div style={{
          borderRadius: 20, padding: "24px 28px",
          background: CARD_BG, border: CARD_BORDER, marginBottom: 4,
        }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,200,200,0.7)", marginBottom: 12 }}>A Glimpse Of Your Story</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.75 }}>
            {mockUser.archetype_tagline} Your identity is built on the quiet strength of dependability, where your primary mission is to ensure that the ground remains solid beneath your feet. You carry a deep sense of responsibility, acting as an anchor in an unpredictable world, finding your greatest fulfilment in being reliably present.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, fontSize: 13, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(192,64,79,0.3)" }}>
            Open Living Report <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer" }}>
            Continue Reading
          </button>
        </div>
      </motion.div>

      {/* Identity Coverage */}
      <motion.div {...fade(0.37)}>
        <div style={{ borderRadius: 20, overflow: "hidden", background: "linear-gradient(145deg, #1a0508 0%, #2d0b14 100%)", border: "1px solid rgba(192,64,79,0.15)" }}>
          <div style={{ padding: "24px 28px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(192,64,79,0.6)", marginBottom: 8 }}>Identity Coverage</p>
              <h3 style={{ fontSize: 26, fontWeight: 700, color: "white", marginBottom: 4 }}>Foundation Complete</h3>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Your 7 core dimensions are complete.</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 28, fontWeight: 800, color: "rgba(255,255,255,0.9)" }}>
                <span style={{ fontStyle: "italic" }}>II</span>
                <span style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>/12</span>
              </p>
              <p style={{ fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Overall Domain Coverage</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.04)" }}>
            <div style={{ padding: "18px 24px", background: "linear-gradient(145deg, #1a0508, #2d0b14)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(167,139,250,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <HugeiconsIcon icon={AiBrain01Icon} size={15} style={{ color: "#a78bfa" }} />
                </div>
                <div>
                  <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Profile Version</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color: "white" }}>{mockUser.archetype_version}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <p style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Last Updated</p>
                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Today</p>
              </div>
            </div>
            <div style={{ padding: "18px 24px", background: "linear-gradient(145deg, #1a0508, #2d0b14)", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
                <svg viewBox="0 0 52 52" style={{ width: 52, height: 52, transform: "rotate(-90deg)" }}>
                  <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
                  <circle cx="26" cy="26" r="22" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={`${(47 / 100) * 138.2} 138.2`} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "white" }}>47</span>
                </div>
              </div>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Behavioural Confidence</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Building</p>
              </div>
            </div>
          </div>
          <div style={{ padding: "18px 24px", display: "flex", alignItems: "center", gap: 16, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
              <svg viewBox="0 0 52 52" style={{ width: 52, height: 52, transform: "rotate(-90deg)" }}>
                <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
                <circle cx="26" cy="26" r="22" fill="none" stroke="#c0404f" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={`${(mockUser.archetype_confidence / 100) * 138.2} 138.2`} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "white" }}>{mockUser.archetype_confidence}</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 2 }}>Pull Confidence</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Building</p>
            </div>
          </div>
          <div style={{ padding: "18px 24px 22px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>Identity Summary</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
              Your identity is still emerging. As you complete intelligence domains, your behavioural archetype and confidence will reveal themselves.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Identity Coverage Progress */}
      <motion.div {...fade(0.4)}>
        <div style={{ borderRadius: 20, padding: "24px 28px", background: "linear-gradient(145deg, #1a0508 0%, #2d0b14 100%)", border: "1px solid rgba(192,64,79,0.15)" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(192,64,79,0.6)", marginBottom: 20 }}>Identity Coverage Progress</p>
          {[
            { label: "Core Dimensions", gathered: 7, total: 7, color: "#22c55e" },
            { label: "Deeper Dimensions", gathered: 4, total: 5, color: "#c0404f" },
            { label: "Coming Soon", gathered: 0, total: 3, color: "rgba(255,255,255,0.2)", note: "3 new domains" },
          ].map((row, i) => (
            <div key={row.label} style={{ marginBottom: i < 2 ? 18 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{row.label}</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{row.note ?? `${row.gathered} / ${row.total} gathered`}</p>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                <motion.div
                  style={{ height: "100%", borderRadius: 99, background: row.color }}
                  initial={{ width: 0 }} animate={{ width: row.total > 0 ? `${(row.gathered / row.total) * 100}%` : "0%" }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                />
              </div>
            </div>
          ))}
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", lineHeight: 1.6, marginTop: 20, marginBottom: 16 }}>
            Coverage counts gathered results, not access. Core dimensions include synthesised perspectives that draw on the same lived evidence and journey activity.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", cursor: "pointer" }}>
            <HugeiconsIcon icon={LockIcon} size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Unlock deeper understanding with Premium</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Expand your identity through deeper dimensions — how you handle tension, what sustains you, your emotional rhythm.</p>
            </div>
            <HugeiconsIcon icon={ArrowRight01Icon} size={13} style={{ color: "rgba(255,255,255,0.35)", flexShrink: 0 }} />
          </div>
        </div>
      </motion.div>

      {/* Your Relationship Style */}
      <motion.div {...fade(0.43)}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <HugeiconsIcon icon={HeartIcon} size={13} style={{ color: "#c0404f" }} />
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Your Relationship Style</p>
        </div>
        <div data-cols="3" style={{ gap: 10 }}>
          {relationshipDimensions.map((d, i) => (
            <motion.div key={d.label} {...fade(0.45 + i * 0.04)}>
              <div style={{ borderRadius: 16, padding: "20px", background: CARD_BG, border: CARD_BORDER }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(192,64,79,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <HugeiconsIcon icon={d.icon} size={16} style={{ color: "#c0404f" }} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 2 }}>{d.label}</p>
                <p style={{ fontSize: 8, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>{d.sub}</p>
                <p style={{ fontSize: 12, color: "rgba(255,200,200,0.7)", fontStyle: "italic", marginBottom: 4 }}>Still being discovered</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Complete assessments to unlock</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Identity Vector */}
      <motion.div {...fade(0.5)}>
        <div style={{ borderRadius: 20, padding: "24px 28px", background: "linear-gradient(145deg, #1a0508 0%, #2d0b14 100%)", border: "1px solid rgba(192,64,79,0.15)" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>Identity Vector — Behavioural Alignment</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mockIdentityVector.map((v, i) => (
              <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 11, color: i === 0 ? "white" : "rgba(255,255,255,0.45)", fontWeight: i === 0 ? 700 : 400, minWidth: 140, flexShrink: 0 }}>{v.label}</span>
                <div style={{ flex: 1, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                  <motion.div
                    style={{ height: "100%", borderRadius: 99, background: i === 0 ? `linear-gradient(90deg, #7c2232, ${v.color})` : v.color, opacity: i === 0 ? 1 : 0.5 }}
                    initial={{ width: 0 }} animate={{ width: `${v.pct}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.07 }}
                  />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? "white" : "rgba(255,255,255,0.35)", minWidth: 32, textAlign: "right" }}>{v.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Ask The Pull */}
      <motion.div {...fade(0.54)}>
        <div style={{ borderRadius: 20, padding: "24px 28px", background: "linear-gradient(145deg, #1a0508 0%, #2d0b14 100%)", border: "1px solid rgba(192,64,79,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(192,64,79,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={16} style={{ color: "#c0404f" }} />
            </div>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(192,64,79,0.6)" }}>Ask The Pull</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: "white" }}>Your Intelligence Guide</p>
            </div>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 16 }}>
            The more The Pull learns about you, the more specific its answers become.
          </p>
          <div style={{ padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(201,168,76,0.2)", background: "rgba(0,0,0,0.2)", marginBottom: 12 }}>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Suggested question</p>
            <p style={{ fontSize: 12, color: "#c0404f", fontStyle: "italic" }}>"What's changed about me since I last checked in?"</p>
          </div>
          <Link href="/coach" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "12px", borderRadius: 12, fontSize: 13, fontWeight: 600,
            color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none",
          }}>
            <HugeiconsIcon icon={Message02Icon} size={13} /> Ask The Pull <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
          </Link>
        </div>
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
