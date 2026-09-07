"use client";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, TrendingUpIcon, AiSparklesIcon, Activity01Icon, UserCircleIcon, Target01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { mockUser, mockDimensions } from "@/lib/mock";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" } });

const G = ({ children, className = "", style = {} }: any) => (
  <div className={`rounded-2xl ${className}`} style={{
    background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)", ...style,
  }}>{children}</div>
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
  const area = `0,${h} ${pts.join(" ")} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e05060" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#e05060" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#ag)" />
      <polyline points={pts.join(" ")} fill="none" stroke="#e05060" strokeWidth="2" strokeLinejoin="round" />
      {data.map((_, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((data[i] - min) / (max - min || 1)) * (h - 12) - 6;
        return <circle key={i} cx={x} cy={y} r={i === data.length - 1 ? 4 : 2.5}
          fill={i === data.length - 1 ? "#e05060" : "rgba(224,80,96,0.5)"} />;
      })}
    </svg>
  );
}

export default function PullProfilePage() {
  return (
    <div className="space-y-3 py-2">
      {/* Hero */}
      <motion.div {...f(0)} className="relative rounded-2xl overflow-hidden" style={{ minHeight: 220 }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a0810 0%, #2d0f1a 40%, #0f0820 80%, #07070f 100%)" }} />
        <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(192,64,79,0.3), transparent)", filter: "blur(40px)" }} />
        <div className="absolute top-10 right-20 w-48 h-48 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(80,40,120,0.2), transparent)", filter: "blur(30px)" }} />
        <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <p className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Pull Profile</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                {mockUser.initials}
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-semibold text-white">{mockUser.name}</h1>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{mockUser.archetype}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: "rgba(52,211,153,0.12)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
                <HugeiconsIcon icon={TrendingUpIcon} size={11} /> Rising trajectory
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(0,0,0,0.07)" }}>
                Top 18% of users
              </span>
            </div>
          </div>
          {/* Score ring */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 144 144" style={{ width: "100%", height: "100%" }}>
                <circle cx="72" cy="72" r="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                <circle cx="72" cy="72" r="60" fill="none" strokeWidth="6"
                  stroke="url(#profileGrad)" strokeLinecap="round"
                  strokeDasharray={`${(74/100)*376.99} 376.99`} transform="rotate(-90 72 72)" />
                <defs>
                  <linearGradient id="profileGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c2232" />
                    <stop offset="100%" stopColor="#e05060" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">{mockUser.pull_score}</span>
                <span className="text-[9px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Pull Score</span>
              </div>
            </div>
            <Link href="/coach"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90"
              style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={12} /> Ask about my profile
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,5fr) minmax(0,7fr)", gap: 12 }}>
        {/* Dimensions */}
        <motion.div {...f(0.08)}>
          <G className="p-5 h-full">
            <p className="text-[13px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>Intelligence Dimensions</p>
            <div className="space-y-4">
              {mockDimensions.map((d, i) => (
                <div key={d.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{d.label}</span>
                    <span className="text-xs font-bold tabular-nums" style={{ color: "var(--text-primary)" }}>{d.score}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, #7c2232, #e05060)` }}
                      initial={{ width: 0 }} animate={{ width: `${d.score}%` }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.08 }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Overall average</p>
              <p className="text-xl font-bold" style={{ color: "var(--brand)" }}>73.6</p>
            </div>
          </G>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Traits */}
          <motion.div {...f(0.12)}>
            <G className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(224,80,96,0.12)" }}>
                  <HugeiconsIcon icon={UserCircleIcon} size={14} style={{ color: "var(--brand)" }} />
                </div>
                <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>Core Traits</p>
              </div>
              <div className="space-y-2.5">
                {traits.map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: "var(--brand)" }} />
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{t}</p>
                  </div>
                ))}
              </div>
            </G>
          </motion.div>

          {/* Score chart */}
          <motion.div {...f(0.16)}>
            <G className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(224,80,96,0.12)" }}>
                    <HugeiconsIcon icon={Activity01Icon} size={14} style={{ color: "var(--brand)" }} />
                  </div>
                  <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>Score History</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
                  +6 this month
                </span>
              </div>
              <div className="flex justify-between text-[10px] mb-2 px-0.5" style={{ color: "var(--text-muted)" }}>
                <span>30 days ago</span>
                <span>Today</span>
              </div>
              <AreaChart data={history} />
              <div className="flex justify-between mt-2 text-[11px]" style={{ color: "var(--text-muted)" }}>
                <span>68</span>
                <span className="font-bold" style={{ color: "var(--text-primary)" }}>74</span>
              </div>
            </G>
          </motion.div>

          {/* CTA */}
          <motion.div {...f(0.2)}>
            <div className="rounded-2xl p-4 flex items-center justify-between relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1a0810, #2d0f1a)", border: "1px solid rgba(192,64,79,0.25)", boxShadow: "0 0 40px rgba(192,64,79,0.1)" }}>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(192,64,79,0.25), transparent)", filter: "blur(16px)" }} />
              <div className="flex items-center gap-3 relative">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(224,80,96,0.2)", border: "1px solid rgba(224,80,96,0.3)" }}>
                  <HugeiconsIcon icon={Target01Icon} size={16} style={{ color: "var(--brand)" }} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Complete Emotional Landscape</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Next assessment unlocks new insights</p>
                </div>
              </div>
              <Link href="/journey"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold flex-shrink-0 ml-3 relative transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #7c2232, #c0404f)", color: "white" }}>
                Start <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
