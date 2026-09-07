"use client";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, TrendingUpIcon, AiSparklesIcon, Activity01Icon, UserCircleIcon, Target01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { mockUser, mockDimensions } from "@/lib/mock";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

const Card = ({ children, style = {} }: any) => (
  <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)", ...style }}>
    {children}
  </div>
);

const traits = [
  "Deeply analytical before emotional disclosure",
  "High empathy with selective vulnerability",
  "Strong pattern recognition in social dynamics",
  "Tendency to over-explain when nervous",
  "Values authenticity above social approval",
];

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
        <div style={{ position: "relative", zIndex: 1, padding: "32px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
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
                Top 18% of users
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
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,5fr) minmax(0,7fr)", gap: 12 }}>
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
          {/* Traits */}
          <motion.div {...f(0.12)}>
            <Card style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(224,80,96,0.1)" }}>
                  <HugeiconsIcon icon={UserCircleIcon} size={14} style={{ color: "var(--brand)" }} />
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>Core Traits</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {traits.map(t => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--brand)", flexShrink: 0, marginTop: 7 }} />
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{t}</p>
                  </div>
                ))}
              </div>
            </Card>
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

          {/* CTA */}
          <motion.div {...f(0.2)}>
            <div style={{ borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #3d0e1a, #6b1c2b)", border: "1px solid rgba(192,64,79,0.25)" }}>
              <div style={{ position: "absolute", top: -24, right: -24, width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,64,79,0.3), transparent)", filter: "blur(16px)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "rgba(224,80,96,0.2)", border: "1px solid rgba(224,80,96,0.3)" }}>
                  <HugeiconsIcon icon={Target01Icon} size={16} style={{ color: "var(--brand)" }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "white" }}>Complete Emotional Landscape</p>
                  <p style={{ fontSize: 11, marginTop: 2, color: "rgba(255,255,255,0.4)" }}>Next assessment unlocks new insights</p>
                </div>
              </div>
              <Link href="/journey" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", textDecoration: "none", flexShrink: 0, marginLeft: 16, position: "relative" }}>
                Start <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
