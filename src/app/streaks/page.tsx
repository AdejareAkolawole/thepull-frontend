"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FireIcon, BookOpen01Icon, AiBrain01Icon, ScaleIcon,
  CompassIcon, CheckmarkCircle01Icon, TrophyIcon, Target01Icon,
} from "@hugeicons/core-free-icons";
import { getAllStreaks, type StreakData, type StreakType } from "@/lib/streaks";

const f = (d = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: d, ease: "easeOut" as const },
});

type StreamConfig = {
  key: StreakType;
  label: string;
  desc: string;
  icon: any;
  color: string;
  bg: string;
  border: string;
  action: string;
  href: string;
};

const STREAMS: StreamConfig[] = [
  {
    key: "app",
    label: "Daily Login",
    desc: "Open the app every day",
    icon: CompassIcon,
    color: "#c0404f",
    bg: "rgba(192,64,79,0.08)",
    border: "rgba(192,64,79,0.18)",
    action: "Come back tomorrow",
    href: "/dashboard",
  },
  {
    key: "journal",
    label: "Journal",
    desc: "Write a journal entry daily",
    icon: BookOpen01Icon,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.18)",
    action: "Write today's entry",
    href: "/journal",
  },
  {
    key: "coach",
    label: "Coach Sessions",
    desc: "Talk to the Pull AI daily",
    icon: AiBrain01Icon,
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.18)",
    action: "Ask the Pull",
    href: "/coach",
  },
  {
    key: "reality_check",
    label: "Reality Check",
    desc: "Run a reality check daily",
    icon: ScaleIcon,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.18)",
    action: "Run a check",
    href: "/reports",
  },
];

const BADGES = [
  { label: "First Fire", desc: "3-day streak on any track", req: (s: Record<StreakType, StreakData>) => Object.values(s).some(x => x.current >= 3), icon: FireIcon, color: "#f59e0b" },
  { label: "Consistent", desc: "7-day streak on any track", req: (s: Record<StreakType, StreakData>) => Object.values(s).some(x => x.current >= 7), icon: CheckmarkCircle01Icon, color: "#34d399" },
  { label: "Journaller", desc: "10 total journal days", req: (s: Record<StreakType, StreakData>) => s.journal.totalDays >= 10, icon: BookOpen01Icon, color: "#3b82f6" },
  { label: "Deep Thinker", desc: "5 reality checks total", req: (s: Record<StreakType, StreakData>) => s.reality_check.totalDays >= 5, icon: ScaleIcon, color: "#f59e0b" },
  { label: "Devoted", desc: "30-day login streak", req: (s: Record<StreakType, StreakData>) => s.app.current >= 30, icon: TrophyIcon, color: "#c9a84c" },
  { label: "All Tracks", desc: "Active on all 4 tracks today", req: (s: Record<StreakType, StreakData>) => Object.values(s).every(x => x.current >= 1), icon: Target01Icon, color: "#c0404f" },
];

function heatmapDates(): string[] {
  const dates: string[] = [];
  const d = new Date();
  for (let i = 89; i >= 0; i--) {
    const day = new Date(d);
    day.setDate(d.getDate() - i);
    dates.push(day.toISOString().split("T")[0]);
  }
  return dates;
}

function HeatmapGrid({ history }: { history: string[] }) {
  const set = new Set(history);
  const dates = heatmapDates();
  const weeks: string[][] = [];
  let week: string[] = [];
  // pad first week
  const firstDay = new Date(dates[0]).getDay();
  for (let i = 0; i < firstDay; i++) week.push("");
  for (const d of dates) {
    week.push(d);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length) { while (week.length < 7) week.push(""); weeks.push(week); }

  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ display: "flex", gap: 3, minWidth: "fit-content" }}>
        {weeks.map((w, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {w.map((d, di) => (
              <div key={di} title={d || ""} style={{
                width: 12, height: 12, borderRadius: 3,
                background: !d ? "transparent" : set.has(d) ? "var(--brand)" : "rgba(0,0,0,0.07)",
                opacity: !d ? 0 : set.has(d) ? 1 : 0.5,
                transition: "background 0.2s",
              }} />
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
        <div style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(0,0,0,0.07)" }} />
        <span style={{ fontSize: 10, color: "var(--text-muted)" }}>No activity</span>
        <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--brand)", marginLeft: 8 }} />
        <span style={{ fontSize: 10, color: "var(--text-muted)" }}>Active</span>
      </div>
    </div>
  );
}

export default function StreaksPage() {
  const [streaks, setStreaks] = useState<Record<StreakType, StreakData> | null>(null);

  useEffect(() => {
    setStreaks(getAllStreaks());
  }, []);

  if (!streaks) return null;

  const totalActive = Object.values(streaks).filter(s => s.current > 0).length;
  const bestStreak = Math.max(...Object.values(streaks).map(s => s.current));
  const allHistory = [...new Set(Object.values(streaks).flatMap(s => s.history))].sort();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>

      {/* Header */}
      <motion.div {...f(0)}>
        <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Consistency</p>
        <h1 className="font-display" style={{ fontSize: 34, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1, display: "flex", alignItems: "center", gap: 12 }}>
          Streaks
          <HugeiconsIcon icon={FireIcon} size={28} style={{ color: "#f59e0b" }} />
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Track your daily habits across every pull activity</p>
      </motion.div>

      {/* Summary hero */}
      <motion.div {...f(0.05)} style={{
        borderRadius: 20, overflow: "hidden", position: "relative",
        background: "linear-gradient(135deg, #1a0a10 0%, #2d1018 50%, #1e0c14 100%)",
        border: "1px solid rgba(192,64,79,0.2)",
        padding: "28px 32px",
        display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap",
      }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,64,79,0.15), transparent)", filter: "blur(40px)" }} />
        {[
          { label: "Best Streak", value: bestStreak ? `${bestStreak}d` : "—" },
          { label: "Active Tracks", value: `${totalActive}/4` },
          { label: "Total Days Active", value: allHistory.length },
        ].map((s, i) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {i > 0 && <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.08)" }} />}
            <div>
              <p style={{ fontSize: 36, fontWeight: 800, color: "white", lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Streak cards */}
      <motion.div {...f(0.08)}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>Your Tracks</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {STREAMS.map((stream, i) => {
            const s = streaks[stream.key];
            const activeToday = s.lastDate === new Date().toISOString().split("T")[0];
            return (
              <motion.div key={stream.key} {...f(0.1 + i * 0.04)}
                style={{
                  borderRadius: 16, padding: "20px",
                  background: activeToday ? stream.bg : "var(--surface)",
                  border: `1px solid ${activeToday ? stream.border : "var(--border)"}`,
                  transition: "all 0.2s",
                }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: stream.bg, border: `1px solid ${stream.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <HugeiconsIcon icon={stream.icon} size={18} style={{ color: stream.color }} />
                  </div>
                  {activeToday && (
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 99, background: stream.bg, border: `1px solid ${stream.border}`, color: stream.color }}>Today ✓</span>
                  )}
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>{stream.label}</p>
                <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 14 }}>{stream.desc}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: s.current > 0 ? stream.color : "var(--text-muted)", lineHeight: 1 }}>{s.current}</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>day{s.current !== 1 ? "s" : ""}</span>
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  <div>
                    <p style={{ fontSize: 10, color: "var(--text-muted)" }}>Best</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}>{s.longest}d</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: "var(--text-muted)" }}>Total</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}>{s.totalDays}d</p>
                  </div>
                </div>
                {!activeToday && (
                  <a href={stream.href} style={{
                    display: "block", marginTop: 14, textAlign: "center",
                    fontSize: 12, fontWeight: 700, padding: "7px 0",
                    borderRadius: 9, textDecoration: "none",
                    background: stream.bg, border: `1px solid ${stream.border}`,
                    color: stream.color,
                  }}>
                    {stream.action} →
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Activity heatmap */}
      <motion.div {...f(0.15)} style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 16, padding: "20px 24px",
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Activity — Last 90 Days</p>
        <HeatmapGrid history={allHistory} />
      </motion.div>

      {/* Badges */}
      <motion.div {...f(0.2)}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>Badges</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
          {BADGES.map((badge, i) => {
            const earned = badge.req(streaks);
            return (
              <motion.div key={badge.label} {...f(0.22 + i * 0.03)} style={{
                borderRadius: 14, padding: "16px",
                background: earned ? "var(--surface)" : "rgba(0,0,0,0.02)",
                border: `1px solid ${earned ? "var(--border)" : "rgba(0,0,0,0.05)"}`,
                opacity: earned ? 1 : 0.45,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: earned ? `rgba(${badge.color === "#f59e0b" ? "245,158,11" : badge.color === "#34d399" ? "52,211,153" : badge.color === "#3b82f6" ? "59,130,246" : badge.color === "#c9a84c" ? "201,168,76" : "192,64,79"},0.12)` : "rgba(0,0,0,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <HugeiconsIcon icon={badge.icon} size={22} style={{ color: earned ? badge.color : "var(--text-muted)" }} />
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>{badge.label}</p>
                  <p style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2, lineHeight: 1.4 }}>{badge.desc}</p>
                </div>
                {earned && (
                  <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", color: "#34d399", letterSpacing: "0.06em" }}>EARNED</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
