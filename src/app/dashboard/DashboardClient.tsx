"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  TrendingUpIcon, ArrowRight01Icon, AiSparklesIcon,
  AiInnovation01Icon, Activity01Icon,
  FlashIcon, PresentationLineChart01Icon, Calendar03Icon, Target01Icon,
  AiBrain01Icon, EyeIcon, Analytics01Icon, FavouriteIcon, FireIcon, CheckmarkCircle01Icon, LockIcon,
} from "@hugeicons/core-free-icons";
import { mockUser, mockDimensions, mockInsights, mockAchievements, mockIdentityVector } from "@/lib/mock";

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

        {/* Score card */}
        <motion.div {...fade(0.06)}>
          <Card style={{ padding: 20, height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--text-muted)", marginBottom: 3 }}>Your Archetype</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--brand)" }}>{mockUser.archetype}</p>
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: "rgba(22,163,74,0.08)", color: "#16a34a", border: "1px solid rgba(22,163,74,0.15)" }}>
                <HugeiconsIcon icon={TrendingUpIcon} size={10} /> Rising
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <p className="font-display" style={{ fontSize: 72, lineHeight: 1, fontWeight: 700, color: "var(--text-primary)" }}>{mockUser.pull_score}</p>
                <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--text-muted)", marginTop: 3 }}>Pull Score</p>
              </div>
              <div style={{ position: "relative", width: 76, height: 76 }}>
                <svg viewBox="0 0 76 76" style={{ width: 76, height: 76 }}>
                  <circle cx="38" cy="38" r="30" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="5" />
                  <circle cx="38" cy="38" r="30" fill="none" stroke="url(#sg2)" strokeWidth="5"
                    strokeLinecap="round" strokeDasharray={`${(74/100)*188.5} 188.5`} transform="rotate(-90 38 38)" />
                  <defs>
                    <linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7c2232" /><stop offset="100%" stopColor="#c0404f" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "var(--text-primary)" }}>74%</span>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--text-muted)", marginBottom: 5 }}>
                <span>30-day trend</span><span style={{ color: "#16a34a", fontWeight: 700 }}>+6 pts</span>
              </div>
              <Sparkline data={scoreHistory} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: "auto", paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              {[{ label: "Streak", value: "12d" }, { label: "Domains", value: "5/8" }, { label: "Signals", value: "847" }].map(s => (
                <div key={s.label} style={{ textAlign: "center" as const }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "var(--text-primary)" }}>{s.value}</p>
                  <p style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 1 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Archetype Banner */}
      <motion.div {...fade(0.08)}>
        <div style={{
          borderRadius: 20, padding: "20px 24px",
          background: "linear-gradient(145deg, #1a0508 0%, #2d0b14 100%)",
          border: "1px solid rgba(192,64,79,0.2)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, border: "1.5px solid rgba(192,64,79,0.4)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(192,64,79,0.08)", flexShrink: 0 }}>
              <HugeiconsIcon icon={AiBrain01Icon} size={22} style={{ color: "#c0404f" }} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(201,168,76,0.7)" }}>Primary Archetype</p>
                <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 99, background: "rgba(192,64,79,0.15)", color: "rgba(192,64,79,0.9)", border: "1px solid rgba(192,64,79,0.25)" }}>{mockUser.archetype_stage}</span>
              </div>
              <p style={{ fontSize: 18, fontWeight: 700, color: "white", lineHeight: 1.1 }}>{mockUser.archetype}</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{mockUser.archetype_tagline.slice(0, 80)}…</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 22, fontWeight: 800, color: "#c0404f" }}>{mockUser.archetype_confidence}%</p>
              <p style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)" }}>Confidence</p>
            </div>
            <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.08)" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 22, fontWeight: 800, color: "#c0404f" }}>{mockUser.archetype_version}</p>
              <p style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)" }}>Version</p>
            </div>
            <Link href="/pull-profile" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none" }}>
              Full Profile <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
            </Link>
          </div>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7, marginBottom: 8 }}>
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
