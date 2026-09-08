"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  TrendingUpIcon, ArrowRight01Icon, AiSparklesIcon, Activity01Icon,
  AiBrain01Icon, Analytics01Icon, CheckmarkCircle01Icon,
  PresentationLineChart01Icon, FlashIcon, Target01Icon,
} from "@hugeicons/core-free-icons";
import { mockUser, mockDimensions, mockIdentityVector } from "@/lib/mock";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

function ScoreRing({ score }: { score: number }) {
  const r = 64, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg viewBox="0 0 160 160" style={{ width: 160, height: 160 }}>
      <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="10" />
      <circle cx="80" cy="80" r={r} fill="none" stroke="url(#scoreGrad)" strokeWidth="10"
        strokeLinecap="round" strokeDasharray={`${dash} ${circ}`}
        transform="rotate(-90 80 80)" />
      <defs>
        <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a07850" />
          <stop offset="100%" stopColor="#c6ad83" />
        </linearGradient>
      </defs>
      <text x="80" y="72" textAnchor="middle" style={{ fontSize: 36, fontWeight: 800, fill: "#3d2c1e", fontFamily: "Inter,sans-serif" }}>{score}</text>
      <text x="80" y="92" textAnchor="middle" style={{ fontSize: 10, fill: "#a07850", fontFamily: "Inter,sans-serif", letterSpacing: 2 }}>PULL SCORE</text>
    </svg>
  );
}

const scoreHistory = [68, 70, 69, 71, 72, 71, 73, 74];

function Sparkline() {
  const w = 120, h = 36;
  const min = Math.min(...scoreHistory), max = Math.max(...scoreHistory);
  const pts = scoreHistory.map((v, i) => {
    const x = (i / (scoreHistory.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 6) - 3;
    return `${x},${y}`;
  });
  const area = `${pts.join(" ")} ${w},${h} 0,${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: 120, height: 36 }}>
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a07850" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#a07850" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#spark)" />
      <polyline points={pts.join(" ")} fill="none" stroke="#a07850" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function PullProfilePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Main Score Card */}
      <motion.div {...f(0)}>
        <div style={{
          borderRadius: 24, overflow: "hidden",
          background: "linear-gradient(160deg, #fdf6ec 0%, #faf0e0 50%, #f5e8d0 100%)",
          border: "1px solid rgba(160,120,80,0.15)",
          boxShadow: "0 8px 40px rgba(160,120,80,0.12)",
        }}>
          {/* Top stripe */}
          <div style={{ height: 4, background: "linear-gradient(90deg, #a07850, #c6ad83, #a07850)" }} />

          <div style={{ padding: "32px 32px 28px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#a07850", marginBottom: 6 }}>Your Pull Score</p>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: "#3d2c1e", lineHeight: 1.1 }}>{mockUser.name}'s</h2>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: "#3d2c1e", lineHeight: 1.1 }}>Intelligence Profile</h2>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 99, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}>
                <HugeiconsIcon icon={TrendingUpIcon} size={12} style={{ color: "#16a34a" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#16a34a" }}>Rising</span>
              </div>
            </div>

            {/* Score ring + stats */}
            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              <ScoreRing score={mockUser.pull_score} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {/* Trend */}
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.7)", border: "1px solid rgba(160,120,80,0.12)" }}>
                    <div>
                      <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a07850", marginBottom: 4 }}>30-day Trend</p>
                      <p style={{ fontSize: 22, fontWeight: 800, color: "#3d2c1e" }}>+6 pts</p>
                      <p style={{ fontSize: 11, color: "#8a6a40", marginTop: 2 }}>Consistent growth</p>
                    </div>
                    <Sparkline />
                  </div>
                  {/* Archetype */}
                  <div style={{ padding: "12px 16px", borderRadius: 14, background: "rgba(255,255,255,0.7)", border: "1px solid rgba(160,120,80,0.12)" }}>
                    <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a07850", marginBottom: 4 }}>Active Archetype</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#3d2c1e", marginBottom: 2 }}>{mockUser.archetype}</p>
                    <p style={{ fontSize: 11, color: "#8a6a40" }}>{mockUser.archetype_confidence}% confidence · {mockUser.archetype_stage}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dimensions */}
      <motion.div {...f(0.08)}>
        <div style={{ borderRadius: 20, padding: "24px 24px", background: "linear-gradient(160deg, #fdf6ec 0%, #faf0e0 100%)", border: "1px solid rgba(160,120,80,0.15)", boxShadow: "0 4px 20px rgba(160,120,80,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a07850", marginBottom: 4 }}>Intelligence Dimensions</p>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#3d2c1e" }}>Your 5 Core Scores</h3>
            </div>
            <Link href="/reports" style={{ fontSize: 11, fontWeight: 700, color: "#a07850", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              Full report <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {mockDimensions.map((d, i) => (
              <div key={d.label}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#3d2c1e" }}>{d.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#a07850" }}>{d.score}</span>
                </div>
                <div style={{ height: 6, borderRadius: 99, background: "rgba(160,120,80,0.12)", overflow: "hidden" }}>
                  <motion.div
                    style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, #a07850, #c6ad83)` }}
                    initial={{ width: 0 }} animate={{ width: `${d.score}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Identity Vector */}
      <motion.div {...f(0.14)}>
        <div style={{ borderRadius: 20, padding: "22px 24px", background: "linear-gradient(160deg, #fdf6ec 0%, #faf0e0 100%)", border: "1px solid rgba(160,120,80,0.15)", boxShadow: "0 4px 20px rgba(160,120,80,0.08)" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a07850", marginBottom: 16 }}>Identity Vector</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mockIdentityVector.map((v, i) => (
              <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12, color: i === 0 ? "#3d2c1e" : "#8a6a40", fontWeight: i === 0 ? 700 : 400, minWidth: 140, flexShrink: 0 }}>{v.label}</span>
                <div style={{ flex: 1, height: 4, borderRadius: 99, background: "rgba(160,120,80,0.12)", overflow: "hidden" }}>
                  <motion.div
                    style={{ height: "100%", borderRadius: 99, background: i === 0 ? "linear-gradient(90deg, #a07850, #c6ad83)" : v.color, opacity: i === 0 ? 1 : 0.6 }}
                    initial={{ width: 0 }} animate={{ width: `${v.pct}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.07 }}
                  />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? "#a07850" : "#b89a70", minWidth: 32, textAlign: "right" }}>{v.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div {...f(0.2)}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: "Pull Score", value: mockUser.pull_score.toString(), sub: "Current score", icon: Analytics01Icon },
            { label: "Profile Version", value: mockUser.archetype_version, sub: "Latest intelligence", icon: AiBrain01Icon },
            { label: "Dimensions", value: "5/7", sub: "Core complete", icon: CheckmarkCircle01Icon },
          ].map((s, i) => (
            <motion.div key={s.label} {...f(0.22 + i * 0.05)}>
              <div style={{ borderRadius: 16, padding: "18px 16px", background: "linear-gradient(160deg, #fdf6ec 0%, #faf0e0 100%)", border: "1px solid rgba(160,120,80,0.15)", boxShadow: "0 2px 12px rgba(160,120,80,0.07)" }}>
                <HugeiconsIcon icon={s.icon} size={16} style={{ color: "#a07850", marginBottom: 10 }} />
                <p style={{ fontSize: 22, fontWeight: 800, color: "#3d2c1e", marginBottom: 2 }}>{s.value}</p>
                <p style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a07850", marginBottom: 2 }}>{s.label}</p>
                <p style={{ fontSize: 10, color: "#b89a70" }}>{s.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div {...f(0.28)}>
        <div style={{ borderRadius: 20, padding: "22px 24px", background: "linear-gradient(135deg, #3d0e1a, #6b1c2b)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 4 }}>Explore your full intelligence</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>Deep dive into who you are — your story, dimensions, and patterns.</p>
          </div>
          <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 12, fontSize: 12, fontWeight: 700, color: "#3d2c1e", background: "linear-gradient(135deg, #c6ad83, #a07850)", textDecoration: "none", flexShrink: 0, whiteSpace: "nowrap" }}>
            Go to Home <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
          </Link>
        </div>
      </motion.div>

    </div>
  );
}
