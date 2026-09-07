"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  TrendingUpIcon, ArrowRight01Icon, AiSparklesIcon, CheckmarkCircle02Icon,
  AddCircleIcon, UserAdd01Icon, Analytics01Icon, AiBrain01Icon,
  FlashIcon, AiInnovation01Icon, Activity01Icon,
  UserGroupIcon, PresentationLineChart01Icon, Calendar03Icon, Target01Icon
} from "@hugeicons/core-free-icons";
import { mockUser, mockDimensions, mockPeople, mockInsights, mockAchievements } from "@/lib/mock";

const f = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

// Glass card
const G = ({ children, className = "", style = {}, glow = false }: any) => (
  <div className={`rounded-2xl ${className}`} style={{
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    boxShadow: glow
      ? "0 4px 24px rgba(0,0,0,0.4), 0 0 60px rgba(192,64,79,0.08), inset 0 1px 0 rgba(255,255,255,0.06)"
      : "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
    ...style,
  }}>
    {children}
  </div>
);

// SVG Radar chart
function RadarChart({ dimensions }: { dimensions: typeof mockDimensions }) {
  const cx = 120, cy = 120, r = 88;
  const n = dimensions.length;
  const pts = dimensions.map((d, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const pct = d.score / 100;
    return {
      x: cx + Math.cos(angle) * r * pct,
      y: cy + Math.sin(angle) * r * pct,
      lx: cx + Math.cos(angle) * (r + 20),
      ly: cy + Math.sin(angle) * (r + 20),
      label: d.label.split(" ")[0],
      score: d.score,
    };
  });

  const polygon = pts.map(p => `${p.x},${p.y}`).join(" ");

  // Grid rings
  const rings = [25, 50, 75, 100].map(pct => {
    const rpts = dimensions.map((_, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      return `${cx + Math.cos(angle) * r * pct / 100},${cy + Math.sin(angle) * r * pct / 100}`;
    });
    return rpts.join(" ");
  });

  return (
    <svg viewBox="0 0 240 240" style={{ width: "100%", maxWidth: 240 }}>
      {/* Grid rings */}
      {rings.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      {/* Spokes */}
      {dimensions.map((_, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        return (
          <line key={i}
            x1={cx} y1={cy}
            x2={cx + Math.cos(angle) * r}
            y2={cy + Math.sin(angle) * r}
            stroke="rgba(255,255,255,0.06)" strokeWidth="1"
          />
        );
      })}
      {/* Filled area */}
      <polygon points={polygon}
        fill="rgba(192,64,79,0.2)"
        stroke="rgba(224,80,96,0.8)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Data points */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5"
          fill="#e05060" stroke="rgba(224,80,96,0.4)" strokeWidth="4" />
      ))}
      {/* Labels */}
      {pts.map((p, i) => (
        <text key={i} x={p.lx} y={p.ly}
          textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: 8, fill: "rgba(241,245,249,0.5)", fontFamily: "Inter, sans-serif" }}>
          {p.label}
        </text>
      ))}
      {/* Center score */}
      <text x={cx} y={cy - 6} textAnchor="middle"
        style={{ fontSize: 22, fontWeight: 700, fill: "#f1f5f9", fontFamily: "Inter, sans-serif" }}>
        74
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle"
        style={{ fontSize: 7.5, fill: "rgba(241,245,249,0.4)", fontFamily: "Inter, sans-serif", letterSpacing: 2, textTransform: "uppercase" }}>
        PULL SCORE
      </text>
    </svg>
  );
}

// Mini area sparkline
function Sparkline({ data, color = "#e05060" }: { data: number[], color?: string }) {
  const w = 100, h = 36;
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
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
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
    <div className="space-y-3">

      {/* ── ROW 1: HERO BENTO ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

        {/* Big hero card */}
        <motion.div {...f(0)} className="md:col-span-7 relative rounded-2xl overflow-hidden"
          style={{ minHeight: 260 }}>
          {/* Mesh gradient */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #1a0810 0%, #2d0f1a 35%, #0f0820 70%, #07070f 100%)" }} />
          <div className="absolute -top-20 -left-10 w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(192,64,79,0.25) 0%, transparent 60%)", filter: "blur(40px)" }} />
          <div className="absolute top-10 right-10 w-48 h-48 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(100,40,120,0.2) 0%, transparent 60%)", filter: "blur(30px)" }} />

          <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Relationship Intelligence
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-light text-white leading-[1.05] mb-1">
                {greeting},
              </h1>
              <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.05] mb-4"
                style={{ background: "linear-gradient(135deg, #f1f5f9, #e05060 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {mockUser.name}.
              </h1>
              <p className="text-sm mb-6 max-w-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                3 new insights ready. Your intelligence profile has evolved since your last visit.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/pull-profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #7c2232, #c0404f)", color: "white", boxShadow: "0 4px 16px rgba(192,64,79,0.35)" }}>
                  View Full Profile <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                </Link>
                <Link href="/coach"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.75)" }}>
                  <HugeiconsIcon icon={AiInnovation01Icon} size={13} /> Ask The Pull
                </Link>
              </div>
            </div>

            {/* Person pills */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto">
              <span className="text-[10px] flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>In vault:</span>
              {mockPeople.map((p) => (
                <Link key={p.id} href="/vault"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 transition-all hover:bg-white/15"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ background: "rgba(192,64,79,0.4)" }}>{p.initials}</span>
                  {p.name}
                  <span style={{ color: p.compatibility === "high" ? "#34d399" : "#fbbf24" }}>{p.score}</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Score + archetype card */}
        <motion.div {...f(0.05)} className="md:col-span-5">
          <G className="p-6 h-full flex flex-col" glow>
            {/* Archetype */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--text-muted)" }}>Your Archetype</p>
                <p className="text-sm font-semibold" style={{ color: "var(--brand)" }}>{mockUser.archetype}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(52,211,153,0.12)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
                <HugeiconsIcon icon={TrendingUpIcon} size={11} /> Rising
              </div>
            </div>

            {/* Big score */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-display" style={{ fontSize: 72, lineHeight: 1, fontWeight: 600, background: "linear-gradient(135deg, #f1f5f9 30%, rgba(224,80,96,0.8))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {mockUser.pull_score}
                </p>
                <p className="text-xs tracking-widest uppercase mt-1" style={{ color: "var(--text-muted)" }}>Pull Score</p>
              </div>
              {/* Arc ring */}
              <div className="relative">
                <svg width="90" height="90" viewBox="0 0 90 90">
                  <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                  <circle cx="45" cy="45" r="38" fill="none" stroke="url(#scoreGrad)" strokeWidth="5"
                    strokeLinecap="round" strokeDasharray={`${(74/100)*238.76} 238.76`}
                    transform="rotate(-90 45 45)" />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7c2232" />
                      <stop offset="100%" stopColor="#e05060" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>74%</p>
                </div>
              </div>
            </div>

            {/* Sparkline */}
            <div className="mb-2">
              <div className="flex justify-between text-[10px] mb-1.5" style={{ color: "var(--text-muted)" }}>
                <span>30-day trend</span>
                <span className="font-semibold" style={{ color: "var(--green)" }}>+6 pts</span>
              </div>
              <Sparkline data={scoreHistory} />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {[
                { label: "Percentile", value: "Top 18%" },
                { label: "Streak", value: "12d" },
                { label: "Domains", value: "5/8" },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </G>
        </motion.div>
      </div>

      {/* ── ROW 2: DIMENSIONS + INSIGHTS + QUICK STATS ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

        {/* Radar chart */}
        <motion.div {...f(0.08)} className="md:col-span-4">
          <G className="p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>Intelligence Map</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>5 active dimensions</p>
              </div>
              <Link href="/pull-profile" className="text-xs font-semibold flex items-center gap-1"
                style={{ color: "var(--brand)" }}>
                Full view <HugeiconsIcon icon={ArrowRight01Icon} size={10} />
              </Link>
            </div>
            <div className="flex justify-center">
              <RadarChart dimensions={mockDimensions} />
            </div>
          </G>
        </motion.div>

        {/* Insights feed */}
        <motion.div {...f(0.12)} className="md:col-span-5">
          <G className="p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>Living Intelligence</p>
              <div className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full"
                style={{ background: "rgba(224,80,96,0.12)", color: "var(--brand)", border: "1px solid rgba(224,80,96,0.2)" }}>
                <HugeiconsIcon icon={AiSparklesIcon} size={9} /> LIVE
              </div>
            </div>
            <div className="space-y-2.5">
              {mockInsights.map((ins) => {
                const cfg = ins.type === "observation"
                  ? { col: "#60a5fa", bg: "rgba(96,165,250,0.08)", icon: Activity01Icon }
                  : ins.type === "pattern"
                  ? { col: "var(--brand)", bg: "rgba(224,80,96,0.08)", icon: PresentationLineChart01Icon }
                  : { col: "#fbbf24", bg: "rgba(251,191,36,0.08)", icon: FlashIcon };
                return (
                  <div key={ins.id} className="group flex gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: cfg.bg }}>
                      <HugeiconsIcon icon={cfg.icon} size={13} style={{ color: cfg.col }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: cfg.col }}>{ins.type}</span>
                        <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>{ins.timestamp}</span>
                      </div>
                      <p className="text-xs font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>{ins.title}</p>
                      <p className="text-[11px] mt-0.5 leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)" }}>{ins.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </G>
        </motion.div>

        {/* Right column: achievements + coach */}
        <div className="md:col-span-3 flex flex-col gap-3">
          {/* Achievements */}
          <motion.div {...f(0.16)} className="flex-1">
            <G className="p-4 h-full">
              <p className="text-[12px] font-bold mb-3" style={{ color: "var(--text-primary)" }}>Achievements</p>
              <div className="space-y-2">
                {mockAchievements.map((a) => (
                  <div key={a.label} className="flex items-center gap-2">
                    <HugeiconsIcon icon={a.done ? CheckmarkCircle02Icon : AddCircleIcon} size={14}
                      style={{ color: a.done ? "var(--green)" : "rgba(255,255,255,0.12)", flexShrink: 0 }} />
                    <span className="text-[11px]" style={{ color: a.done ? "var(--text-secondary)" : "var(--text-muted)" }}>{a.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <motion.div className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #7c2232, #e05060)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(mockAchievements.filter(a => a.done).length / mockAchievements.length) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }} />
              </div>
            </G>
          </motion.div>

          {/* Coach CTA */}
          <motion.div {...f(0.2)}>
            <div className="rounded-2xl p-4 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1a0810, #2d0f1a)", border: "1px solid rgba(192,64,79,0.3)", boxShadow: "0 0 40px rgba(192,64,79,0.12)" }}>
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(192,64,79,0.3), transparent)", filter: "blur(16px)" }} />
              <div className="relative">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: "rgba(224,80,96,0.2)", border: "1px solid rgba(224,80,96,0.3)" }}>
                  <HugeiconsIcon icon={AiInnovation01Icon} size={15} style={{ color: "var(--brand)" }} />
                </div>
                <p className="text-xs font-bold mb-1" style={{ color: "var(--text-primary)" }}>Ask The Pull</p>
                <p className="text-[10px] mb-3 leading-relaxed" style={{ color: "var(--text-muted)" }}>Your AI coach is ready with full profile context.</p>
                <Link href="/coach"
                  className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #7c2232, #c0404f)", color: "white" }}>
                  Start session <HugeiconsIcon icon={ArrowRight01Icon} size={10} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── ROW 3: VAULT + QUICK ACTIONS ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

        {/* Vault */}
        <motion.div {...f(0.22)} className="md:col-span-7">
          <G className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>My Vault</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>People you're tracking</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/vault" className="text-xs font-semibold" style={{ color: "var(--brand)" }}>View all →</Link>
                <Link href="/vault/add"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #7c2232, #c0404f)", color: "white" }}>
                  <HugeiconsIcon icon={UserAdd01Icon} size={12} /> Add
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              {mockPeople.map((p) => {
                const cc = p.compatibility === "high" ? "#34d399" : p.compatibility === "medium" ? "#fbbf24" : "#f87171";
                return (
                  <Link key={p.id} href={`/vault/${p.id}`}
                    className="group flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #7c2232, #a02d3d)" }}>
                      {p.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{p.name}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{p.relation}</p>
                    </div>
                    <div className="hidden sm:flex flex-1 max-w-[100px]">
                      <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="h-full rounded-full transition-all" style={{ background: cc, width: `${p.score}%` }} />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{p.score}</p>
                      <p className="text-[10px] capitalize" style={{ color: cc }}>{p.compatibility}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </G>
        </motion.div>

        {/* Quick actions bento */}
        <motion.div {...f(0.26)} className="md:col-span-5">
          <G className="p-5 h-full">
            <p className="text-[13px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>Quick Actions</p>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: "Add Person", href: "/vault/add", icon: UserAdd01Icon, grad: "linear-gradient(135deg, #1a0810, #2d0f1a)", accent: "#e05060", border: "rgba(224,80,96,0.2)" },
                { label: "AI Coach", href: "/coach", icon: AiInnovation01Icon, grad: "linear-gradient(135deg, #0a0f1a, #0d1526)", accent: "#60a5fa", border: "rgba(96,165,250,0.15)" },
                { label: "Reports", href: "/reports", icon: PresentationLineChart01Icon, grad: "linear-gradient(135deg, #0f0a1a, #1a0f2d)", accent: "#a78bfa", border: "rgba(167,139,250,0.15)" },
                { label: "Journey", href: "/journey", icon: Target01Icon, grad: "linear-gradient(135deg, #1a150a, #2d2010)", accent: "#fbbf24", border: "rgba(251,191,36,0.15)" },
              ].map((a) => (
                <Link key={a.label} href={a.href}
                  className="group flex flex-col items-start gap-3 p-4 rounded-xl transition-all hover:scale-[1.02]"
                  style={{ background: a.grad, border: `1px solid ${a.border}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${a.accent}20` }}>
                    <HugeiconsIcon icon={a.icon} size={16} style={{ color: a.accent }} />
                  </div>
                  <p className="text-xs font-bold" style={{ color: a.accent }}>{a.label}</p>
                </Link>
              ))}
            </div>
            <div className="mt-3 p-3 rounded-xl flex items-center gap-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <HugeiconsIcon icon={Calendar03Icon} size={14} style={{ color: "var(--text-muted)" }} />
              <div>
                <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Today's focus</p>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Complete your Emotional Landscape assessment</p>
              </div>
            </div>
          </G>
        </motion.div>
      </div>
    </div>
  );
}
