"use client";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { TrendingUpIcon, AiSparklesIcon, Activity01Icon, AiBrain01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { mockUser, mockDimensions, mockIdentityVector } from "@/lib/mock";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

const Card = ({ children, style = {} }: any) => (
  <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)", ...style }}>
    {children}
  </div>
);


const history = [68, 70, 69, 71, 72, 71, 73, 74];

function AreaChart({ data }: { data: number[] }) {
  const w = 400, h = 80;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 12) - 6;
    return `${x},${y}`;
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e05060" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#e05060" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts.join(" ")} ${w},${h}`} fill="url(#ag)" />
      <polyline points={pts.join(" ")} fill="none" stroke="#e05060" strokeWidth="2" strokeLinejoin="round" />
      {data.map((_, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((data[i] - min) / (max - min || 1)) * (h - 12) - 6;
        return <circle key={i} cx={x} cy={y} r={i === data.length - 1 ? 4 : 2.5} fill={i === data.length - 1 ? "#e05060" : "rgba(224,80,96,0.5)"} />;
      })}
    </svg>
  );
}

export default function PullProfilePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Hero */}
      <motion.div {...f(0)} style={{ borderRadius: 20, position: "relative", overflow: "hidden", minHeight: 220 }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #3d0e1a 0%, #6b1c2b 45%, #a03040 100%)" }} />
        <div style={{ position: "absolute", top: -64, left: -64, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,64,79,0.3), transparent)", filter: "blur(40px)" }} />
        <div className="hero-pad" style={{ position: "relative", zIndex: 1, padding: "32px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Pull Profile</p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "white", flexShrink: 0, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
                {mockUser.initials}
              </div>
              <div>
                <h1 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: "white", lineHeight: 1.1 }}>{mockUser.name}</h1>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{mockUser.archetype}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 99, background: "rgba(52,211,153,0.12)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
                <HugeiconsIcon icon={TrendingUpIcon} size={11} /> Rising trajectory
              </span>
              <span style={{ fontSize: 11, padding: "5px 12px", borderRadius: 99, background: "rgba(0,0,0,0.08)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(0,0,0,0.1)" }}>
                12-day streak
              </span>
            </div>
          </div>
          {/* Score ring */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative", width: 140, height: 140 }}>
              <svg viewBox="0 0 140 140" style={{ width: 140, height: 140 }}>
                <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                <circle cx="70" cy="70" r="58" fill="none" stroke="url(#pg)" strokeWidth="6"
                  strokeLinecap="round" strokeDasharray={`${(74 / 100) * 364.4} 364.4`}
                  transform="rotate(-90 70 70)" />
                <defs>
                  <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c2232" /><stop offset="100%" stopColor="#e05060" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: "white" }}>{mockUser.pull_score}</span>
                <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Pull Score</span>
              </div>
            </div>
            <Link href="/coach" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "white", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", textDecoration: "none" }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={12} /> Ask about my profile
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div data-cols="2-hero">
        {/* Dimensions */}
        <motion.div {...f(0.08)}>
          <Card style={{ padding: 20, height: "100%" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Intelligence Dimensions</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {mockDimensions.map((d, i) => (
                <div key={d.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{d.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>{d.score}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 99, overflow: "hidden", background: "rgba(0,0,0,0.06)" }}>
                    <motion.div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #7c2232, #e05060)" }}
                      initial={{ width: 0 }} animate={{ width: `${d.score}%` }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.08 }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Overall average</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: "var(--brand)" }}>73.6</span>
            </div>
          </Card>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Primary Archetype card */}
          <motion.div {...f(0.12)}>
            <div style={{ borderRadius: 16, overflow: "hidden", background: "linear-gradient(145deg, #1a0508 0%, #2d0b14 50%, #1a0508 100%)", border: "1px solid rgba(192,64,79,0.2)" }}>
              {/* Top section */}
              <div style={{ padding: "20px 20px 16px", display: "flex", alignItems: "flex-start", gap: 16 }}>
                {/* Icon ring */}
                <div style={{ flexShrink: 0, width: 60, height: 60, borderRadius: "50%", border: "2px solid rgba(192,64,79,0.5)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(192,64,79,0.08)" }}>
                  <HugeiconsIcon icon={AiBrain01Icon} size={26} style={{ color: "#c0404f" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(192,64,79,0.7)", marginBottom: 6 }}>Primary Archetype</p>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 99, background: "rgba(192,64,79,0.15)", color: "rgba(192,64,79,0.9)", border: "1px solid rgba(192,64,79,0.25)", letterSpacing: "0.08em" }}>
                    {mockUser.archetype_stage}
                  </span>
                  <p style={{ fontSize: 20, fontWeight: 700, color: "white", marginTop: 8, lineHeight: 1.15 }}>{mockUser.archetype}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4, lineHeight: 1.5 }}>{mockUser.archetype_tagline}</p>
                </div>
              </div>

              {/* Confidence + Version */}
              <div style={{ margin: "0 20px", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ padding: "12px 0" }}>
                  <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", marginBottom: 4 }}>Confidence</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: "#c0404f" }}>{mockUser.archetype_confidence}%</p>
                </div>
                <div style={{ padding: "12px 0 12px 16px", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", marginBottom: 4 }}>Version</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: "#c0404f" }}>{mockUser.archetype_version}</p>
                </div>
              </div>

              {/* Identity Vector */}
              <div style={{ padding: "16px 20px 20px" }}>
                <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", marginBottom: 12 }}>Identity Vector — Behavioural Alignment</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {mockIdentityVector.map((v, i) => (
                    <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 11, color: i === 0 ? "white" : "rgba(255,255,255,0.45)", fontWeight: i === 0 ? 700 : 400, minWidth: 130, flexShrink: 0 }}>{v.label}</span>
                      <div style={{ flex: 1, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                        <motion.div
                          style={{ height: "100%", borderRadius: 99, background: i === 0 ? `linear-gradient(90deg, #7c2232, ${v.color})` : v.color, opacity: i === 0 ? 1 : 0.5 }}
                          initial={{ width: 0 }} animate={{ width: `${v.pct}%` }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.07 }}
                        />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? "white" : "rgba(255,255,255,0.35)", minWidth: 32, textAlign: "right" as const }}>{v.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Score chart */}
          <motion.div {...f(0.16)}>
            <Card style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(224,80,96,0.1)" }}>
                    <HugeiconsIcon icon={Activity01Icon} size={14} style={{ color: "var(--brand)" }} />
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>Score History</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>+6 this month</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--text-muted)", marginBottom: 8 }}>
                <span>30 days ago</span><span>Today</span>
              </div>
              <AreaChart data={history} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 11, color: "var(--text-muted)" }}>
                <span>68</span><span style={{ fontWeight: 700, color: "var(--text-primary)" }}>74</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
