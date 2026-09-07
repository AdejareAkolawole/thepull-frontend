"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  TrendingUpIcon, ArrowRight01Icon, AiSparklesIcon, CheckmarkCircle02Icon,
  AddCircleIcon, UserAdd01Icon, Analytics01Icon, AiBrain01Icon,
  FlashIcon, AiInnovation01Icon, Activity01Icon, ArrowUpRight01Icon,
  UserGroupIcon, PresentationLineChart01Icon, Calendar03Icon, Target01Icon
} from "@hugeicons/core-free-icons";
import { mockUser, mockDimensions, mockPeople, mockInsights, mockAchievements } from "@/lib/mock";

const f = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const Card = ({ children, className = "", style = {} }: any) => (
  <div className={`rounded-2xl ${className}`}
    style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", ...style }}>
    {children}
  </div>
);

const statCards = [
  { label: "Pull Score", value: "74", sub: "+3 this week", delta: "+4%", icon: Analytics01Icon, color: "#7c2232", bg: "#fdf2f4" },
  { label: "Domains", value: "5/8", sub: "Active domains", delta: "+1", icon: AiBrain01Icon, color: "#3b82f6", bg: "#eff6ff" },
  { label: "Vault", value: "3", sub: "2 reports ready", delta: "", icon: UserGroupIcon, color: "#8b5cf6", bg: "#f5f3ff" },
  { label: "Streak", value: "12d", sub: "Personal best", delta: "🔥", icon: FlashIcon, color: "#f59e0b", bg: "#fffbeb" },
];

const quickActions = [
  { label: "Add Person", href: "/vault/add", icon: UserAdd01Icon, color: "#7c2232", bg: "#fdf2f4" },
  { label: "AI Coach", href: "/coach", icon: AiInnovation01Icon, color: "#3b82f6", bg: "#eff6ff" },
  { label: "Reports", href: "/reports", icon: PresentationLineChart01Icon, color: "#8b5cf6", bg: "#f5f3ff" },
  { label: "Journey", href: "/journey", icon: Target01Icon, color: "#f59e0b", bg: "#fffbeb" },
];

export default function DashboardClient() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-4">

      {/* ── HERO ── */}
      <motion.div {...f(0)} className="relative rounded-2xl md:rounded-3xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #6b1c2b 0%, #8c2535 40%, #b03040 75%, #c94050 100%)" }}>
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)" }} />

        <div className="relative z-10 p-5 md:p-8 flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-8">
          {/* Left */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/50">Relationship Intelligence</span>
              <span className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" /> Live
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-semibold text-white leading-[1.05] mb-2">
              {greeting},<br />
              <span style={{ color: "rgba(255,220,220,0.95)" }}>{mockUser.name}.</span>
            </h1>
            <p className="text-sm text-white/60 mb-5 max-w-sm leading-relaxed">
              3 new insights are waiting. Your profile evolved since your last visit.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Link href="/pull-profile"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white transition-all hover:bg-white/90"
                style={{ color: "var(--brand)" }}>
                View Full Profile <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
              </Link>
              <Link href="/coach"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.22)" }}>
                <HugeiconsIcon icon={AiInnovation01Icon} size={13} /> Ask The Pull
              </Link>
            </div>
          </div>

          {/* Score circle */}
          <div className="flex flex-col items-center gap-2 self-start md:self-auto md:mr-4 md:mt-2">
            <div className="relative">
              <div className="w-28 h-28 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}>
                <svg className="absolute inset-0 -rotate-90 w-full h-full">
                  <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5%" />
                  <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="5%"
                    strokeLinecap="round" strokeDasharray={`${74 * 2.826} 282.6`} />
                </svg>
                <p className="text-3xl md:text-5xl font-bold text-white leading-none">{mockUser.pull_score}</p>
                <p className="text-[9px] md:text-xs tracking-widest uppercase text-white/50 mt-0.5">Pull Score</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-white/80 font-medium">{mockUser.archetype}</p>
              <div className="flex items-center justify-center gap-1 mt-0.5 text-[11px] text-green-300">
                <HugeiconsIcon icon={TrendingUpIcon} size={11} /> Rising
              </div>
            </div>
          </div>
        </div>

        {/* Person pills */}
        <div className="relative z-10 px-5 md:px-8 pb-4 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] text-white/40 mr-1 flex-shrink-0">In your vault:</span>
          {mockPeople.map((p) => (
            <Link key={p.id} href="/vault"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all hover:bg-white/20 flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[9px] font-bold">{p.initials}</span>
              {p.name}
              <span style={{ color: p.compatibility === "high" ? "#86efac" : "#fde68a" }}>{p.score}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statCards.map((s, i) => (
          <motion.div key={s.label} {...f(0.08 + i * 0.04)}>
            <Card className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                  <HugeiconsIcon icon={s.icon} size={17} style={{ color: s.color }} />
                </div>
                {s.delta && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "#f0fdf4", color: "#16a34a" }}>
                    {s.delta}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--text-secondary)" }}>{s.label}</p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>{s.sub}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ── MAIN GRID (stacks on mobile) ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

        {/* Living Intelligence */}
        <motion.div {...f(0.18)} className="md:col-span-5">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>Living Intelligence</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Continuously evolving</p>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "var(--brand-light)", color: "var(--brand)" }}>
                <HugeiconsIcon icon={AiSparklesIcon} size={10} /> Live
              </span>
            </div>
            <div className="space-y-2">
              {mockInsights.map((ins) => {
                const cfg = ins.type === "observation"
                  ? { bg: "#eff6ff", color: "#3b82f6", icon: Activity01Icon }
                  : ins.type === "pattern"
                  ? { bg: "var(--brand-light)", color: "var(--brand)", icon: PresentationLineChart01Icon }
                  : { bg: "#fffbeb", color: "#f59e0b", icon: FlashIcon };
                return (
                  <div key={ins.id} className="group flex gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-[var(--bg)]"
                    style={{ border: "1px solid var(--border)" }}>
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: cfg.bg }}>
                      <HugeiconsIcon icon={cfg.icon} size={14} style={{ color: cfg.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: cfg.color }}>{ins.type}</span>
                        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{ins.timestamp}</span>
                      </div>
                      <p className="text-sm font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>{ins.title}</p>
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--text-muted)" }}>{ins.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Intelligence Dimensions */}
        <motion.div {...f(0.22)} className="md:col-span-4">
          <Card className="p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>Intelligence Dimensions</p>
              <Link href="/pull-profile" className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--brand)" }}>
                Profile <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
              </Link>
            </div>
            <div className="space-y-4">
              {mockDimensions.map((d, i) => (
                <div key={d.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{d.label}</span>
                    <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{d.score}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg)" }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #7c2232, #c0404f)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${d.score}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
              <div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Overall</p>
                <p className="text-xl font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>73.6<span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>/100</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Percentile</p>
                <p className="text-xl font-bold mt-0.5" style={{ color: "var(--brand)" }}>Top 18%</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Achievements + Coach CTA */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <motion.div {...f(0.26)}>
            <Card className="p-4">
              <p className="text-[13px] font-bold mb-3" style={{ color: "var(--text-primary)" }}>Achievements</p>
              <div className="space-y-2">
                {mockAchievements.map((a) => (
                  <div key={a.label} className="flex items-center gap-2.5">
                    <HugeiconsIcon icon={a.done ? CheckmarkCircle02Icon : AddCircleIcon} size={15}
                      style={{ color: a.done ? "#22c55e" : "var(--border)", flexShrink: 0 }} />
                    <span className="text-xs" style={{ color: a.done ? "var(--text-secondary)" : "var(--text-muted)" }}>{a.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg)" }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #7c2232, #c0404f)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(mockAchievements.filter(a => a.done).length / mockAchievements.length) * 100}%` }}
                    transition={{ duration: 0.9, delay: 0.4 }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div {...f(0.3)}>
            <div className="rounded-2xl p-5"
              style={{ background: "linear-gradient(145deg, #6b1c2b, #8c2535)", boxShadow: "0 6px 24px rgba(108,28,43,0.28)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(255,255,255,0.12)" }}>
                <HugeiconsIcon icon={AiInnovation01Icon} size={17} className="text-white" />
              </div>
              <p className="text-sm font-bold text-white mb-1">Ask The Pull</p>
              <p className="text-xs text-white/55 mb-4 leading-relaxed">Your personal AI intelligence coach.</p>
              <Link href="/coach"
                className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all hover:bg-white/95"
                style={{ background: "white", color: "var(--brand)" }}>
                Start a session <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Vault */}
        <motion.div {...f(0.34)} className="md:col-span-7">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>My Vault</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>People you're tracking</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/vault" className="text-xs font-semibold" style={{ color: "var(--brand)" }}>View all</Link>
                <Link href="/vault/add"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                  style={{ background: "var(--brand)" }}>
                  <HugeiconsIcon icon={UserAdd01Icon} size={12} /> Add
                </Link>
              </div>
            </div>
            <div className="space-y-2.5">
              {mockPeople.map((p) => {
                const compColor = p.compatibility === "high" ? "#22c55e" : p.compatibility === "medium" ? "#f59e0b" : "#ef4444";
                const compBg = p.compatibility === "high" ? "#f0fdf4" : p.compatibility === "medium" ? "#fffbeb" : "#fff1f2";
                return (
                  <Link key={p.id} href={`/vault/${p.id}`}
                    className="group flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-[var(--bg)]"
                    style={{ border: "1px solid var(--border)" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #7c2232, #a02d3d)" }}>
                      {p.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{p.name}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{p.relation}</p>
                    </div>
                    <div className="hidden sm:flex flex-1 max-w-[100px]">
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg)" }}>
                        <div className="h-full rounded-full" style={{ background: compColor, width: `${p.score}%` }} />
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{p.score}</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full capitalize"
                        style={{ background: compBg, color: compColor }}>{p.compatibility}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Quick actions */}
        <motion.div {...f(0.38)} className="md:col-span-5">
          <Card className="p-5 h-full">
            <p className="text-[13px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>Quick Actions</p>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((a) => (
                <Link key={a.label} href={a.href}
                  className="group flex flex-col items-start gap-3 p-4 rounded-xl transition-all hover:shadow-md"
                  style={{ background: a.bg }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white">
                    <HugeiconsIcon icon={a.icon} size={16} style={{ color: a.color }} />
                  </div>
                  <p className="text-xs font-bold" style={{ color: a.color }}>{a.label}</p>
                </Link>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl flex items-center gap-3"
              style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
              <HugeiconsIcon icon={Calendar03Icon} size={16} style={{ color: "var(--text-muted)" }} />
              <div>
                <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Today's focus</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Complete your Emotional Landscape assessment</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
