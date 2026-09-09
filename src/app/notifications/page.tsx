"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Notification01Icon, AiSparklesIcon, FireIcon, CheckmarkCircle01Icon,
  InformationCircleIcon, AiBrain01Icon, Target01Icon, Analytics01Icon,
  Delete02Icon, Tick01Icon, Filter01Icon,
} from "@hugeicons/core-free-icons";

const f = (d = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: d, ease: "easeOut" as const },
});

type Category = "all" | "insight" | "streak" | "achievement" | "system";

type Notif = {
  id: string;
  category: Exclude<Category, "all">;
  title: string;
  body: string;
  time: string;
  timeLabel: string;
  read: boolean;
};

const SEED: Notif[] = [
  {
    id: "n1",
    category: "insight",
    title: "New insight unlocked",
    body: "Your emotional regulation patterns show a 12% improvement this week. Your Living Intelligence updated your Pull Profile.",
    time: "2026-09-09T08:14:00",
    timeLabel: "Today · 8:14 AM",
    read: false,
  },
  {
    id: "n2",
    category: "streak",
    title: "3-day journal streak 🔥",
    body: "You've journalled 3 days in a row. Consistency like this strengthens your behavioural baseline.",
    time: "2026-09-09T07:00:00",
    timeLabel: "Today · 7:00 AM",
    read: false,
  },
  {
    id: "n3",
    category: "achievement",
    title: "Achievement unlocked: First Pull",
    body: "You completed your first Pull Score assessment. Your identity baseline has been set.",
    time: "2026-09-08T20:31:00",
    timeLabel: "Yesterday · 8:31 PM",
    read: true,
  },
  {
    id: "n4",
    category: "insight",
    title: "Pull Score update",
    body: "Your Pull Score moved from 68 → 74. Your Decisiveness and Emotional Range dimensions drove the shift.",
    time: "2026-09-08T14:05:00",
    timeLabel: "Yesterday · 2:05 PM",
    read: true,
  },
  {
    id: "n5",
    category: "system",
    title: "Welcome to MyPullScore",
    body: "Your personal intelligence platform is ready. Complete your onboarding to set your identity baseline and begin tracking your Pull Score.",
    time: "2026-09-08T10:00:00",
    timeLabel: "Yesterday · 10:00 AM",
    read: true,
  },
  {
    id: "n6",
    category: "insight",
    title: "Archetype signal detected",
    body: "New signal: your journal entries consistently reflect high-structure decision-making — aligning with your Architect archetype.",
    time: "2026-09-07T16:22:00",
    timeLabel: "Sep 7 · 4:22 PM",
    read: true,
  },
  {
    id: "n7",
    category: "streak",
    title: "Reality Check streak",
    body: "You've run 2 Reality Checks this week. The Pull AI is learning your reasoning patterns.",
    time: "2026-09-07T11:10:00",
    timeLabel: "Sep 7 · 11:10 AM",
    read: true,
  },
  {
    id: "n8",
    category: "achievement",
    title: "Achievement unlocked: Deep Diver",
    body: "You explored 5 dimensions in a single session. Your curiosity is one of your highest Pull signals.",
    time: "2026-09-06T19:45:00",
    timeLabel: "Sep 6 · 7:45 PM",
    read: true,
  },
];

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "insight", label: "Insights" },
  { key: "streak", label: "Streaks" },
  { key: "achievement", label: "Achievements" },
  { key: "system", label: "System" },
];

const CAT_META: Record<Exclude<Category, "all">, { icon: any; color: string; bg: string; border: string }> = {
  insight: { icon: AiBrain01Icon,         color: "#3b82f6", bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.18)" },
  streak:  { icon: FireIcon,              color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.18)" },
  achievement: { icon: CheckmarkCircle01Icon, color: "#c9a84c", bg: "rgba(201,168,76,0.08)", border: "rgba(201,168,76,0.22)" },
  system:  { icon: InformationCircleIcon, color: "#6b7280", bg: "rgba(107,114,128,0.08)", border: "rgba(107,114,128,0.15)" },
};

function timeGroup(n: Notif): string {
  const label = n.timeLabel;
  if (label.startsWith("Today")) return "Today";
  if (label.startsWith("Yesterday")) return "Yesterday";
  return "Earlier";
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notif[]>(SEED);
  const [filter, setFilter] = useState<Category>("all");

  const filtered = filter === "all" ? notifs : notifs.filter(n => n.category === filter);
  const unread = notifs.filter(n => !n.read).length;

  const groups: { label: string; items: Notif[] }[] = [];
  const seen = new Set<string>();
  for (const n of filtered) {
    const g = timeGroup(n);
    if (!seen.has(g)) { seen.add(g); groups.push({ label: g, items: [] }); }
    groups[groups.length - 1].items.push(n);
  }

  function markRead(id: string) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  }

  function dismiss(id: string) {
    setNotifs(prev => prev.filter(n => n.id !== id));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 760 }}>

      {/* Header */}
      <motion.div {...f(0)} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Activity</p>
          <h1 className="font-display" style={{ fontSize: 34, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1, display: "flex", alignItems: "center", gap: 12 }}>
            Notifications
            {unread > 0 && (
              <span style={{ fontSize: 13, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: "var(--brand)", color: "#fff", letterSpacing: 0 }}>
                {unread}
              </span>
            )}
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Your Pull activity, insights, and system updates</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 13, fontWeight: 600, padding: "8px 16px",
            borderRadius: 10, border: "1px solid var(--border)",
            background: "var(--surface)", color: "var(--text-secondary)",
            cursor: "pointer",
          }}>
            <HugeiconsIcon icon={Tick01Icon} size={14} style={{ color: "var(--text-muted)" }} />
            Mark all as read
          </button>
        )}
      </motion.div>

      {/* Filter tabs */}
      <motion.div {...f(0.05)} style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {CATEGORIES.map(({ key, label }) => {
          const count = key === "all"
            ? notifs.filter(n => !n.read).length
            : notifs.filter(n => n.category === key && !n.read).length;
          const active = filter === key;
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                fontSize: 13, fontWeight: active ? 700 : 500,
                padding: "7px 16px", borderRadius: 99,
                border: active ? "1.5px solid var(--brand)" : "1px solid var(--border)",
                background: active ? "var(--brand-light)" : "var(--surface)",
                color: active ? "var(--brand)" : "var(--text-secondary)",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                transition: "all 0.15s",
              }}
            >
              {label}
              {count > 0 && (
                <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 99, background: active ? "var(--brand)" : "rgba(0,0,0,0.08)", color: active ? "#fff" : "var(--text-muted)" }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </motion.div>

      {/* Notification groups */}
      {filtered.length === 0 ? (
        <motion.div {...f(0.1)} style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "64px 24px", gap: 12,
          border: "1px solid var(--border)", borderRadius: 16, background: "var(--surface)",
        }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--brand-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <HugeiconsIcon icon={Notification01Icon} size={22} style={{ color: "var(--brand)" }} />
          </div>
          <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>All clear</p>
          <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center" }}>No notifications in this category yet.</p>
        </motion.div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <AnimatePresence mode="popLayout">
            {groups.map((group, gi) => (
              <motion.div key={group.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, delay: gi * 0.04 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
                  {group.label}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <AnimatePresence mode="popLayout">
                    {group.items.map((n, ni) => (
                      <NotifCard key={n.id} n={n} delay={gi * 0.04 + ni * 0.03} onRead={markRead} onDismiss={dismiss} />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function NotifCard({ n, delay, onRead, onDismiss }: {
  n: Notif;
  delay: number;
  onRead: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  const meta = CAT_META[n.category];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, scale: 0.97 }}
      transition={{ duration: 0.28, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => !n.read && onRead(n.id)}
      style={{
        display: "flex", alignItems: "flex-start", gap: 14,
        padding: "14px 16px",
        borderRadius: 14,
        border: `1px solid ${n.read ? "var(--border)" : meta.border}`,
        background: n.read ? "var(--surface)" : meta.bg,
        cursor: n.read ? "default" : "pointer",
        position: "relative",
        transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s",
        boxShadow: hovered ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
      }}
    >
      {/* Unread dot */}
      {!n.read && (
        <span style={{
          position: "absolute", top: 14, right: 14,
          width: 7, height: 7, borderRadius: "50%",
          background: "var(--brand)",
        }} />
      )}

      {/* Icon */}
      <div style={{
        width: 38, height: 38, borderRadius: 11, flexShrink: 0,
        background: meta.bg, border: `1px solid ${meta.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <HugeiconsIcon icon={meta.icon} size={18} style={{ color: meta.color }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13.5, fontWeight: n.read ? 500 : 700, color: "var(--text-primary)" }}>{n.title}</span>
          <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 99, background: meta.bg, border: `1px solid ${meta.border}`, color: meta.color, textTransform: "capitalize", letterSpacing: "0.04em" }}>
            {n.category}
          </span>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 6 }}>{n.body}</p>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{n.timeLabel}</span>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0, opacity: hovered ? 1 : 0, transition: "opacity 0.15s" }}>
        {!n.read && (
          <button
            onClick={e => { e.stopPropagation(); onRead(n.id); }}
            title="Mark as read"
            style={{ ...iconBtn, color: meta.color }}
          >
            <HugeiconsIcon icon={Tick01Icon} size={13} />
          </button>
        )}
        <button
          onClick={e => { e.stopPropagation(); onDismiss(n.id); }}
          title="Dismiss"
          style={{ ...iconBtn, color: "var(--text-muted)" }}
        >
          <HugeiconsIcon icon={Delete02Icon} size={13} />
        </button>
      </div>
    </motion.div>
  );
}

const iconBtn: React.CSSProperties = {
  width: 28, height: 28, borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--bg)",
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer",
  transition: "background 0.12s",
};
