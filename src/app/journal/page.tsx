"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Calendar03Icon, AiSparklesIcon, BookOpen01Icon, Search01Icon } from "@hugeicons/core-free-icons";

const f = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: d, ease: "easeOut" } });
const Card = ({ children, className = "", style = {} }: any) => (
  <div className={`rounded-2xl ${className}`} style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", ...style }}>
    {children}
  </div>
);

const entries = [
  { id: "1", title: "Reflecting on a difficult conversation", date: "Sep 6, 2026", mood: "Thoughtful", preview: "Today I had a tense exchange with Theo about the project. I noticed myself getting defensive early on, which The Pull flagged as consistent with my analytical retreat pattern…", tags: ["Conflict", "Self-awareness"], words: 312 },
  { id: "2", title: "Breakthrough with Jordan", date: "Sep 4, 2026", mood: "Positive", preview: "Something shifted today. I finally expressed what I needed without over-explaining it. Jordan's response was warm, and I felt genuinely heard for the first time in a long while…", tags: ["Communication", "Vulnerability"], words: 248 },
  { id: "3", title: "Processing old patterns", date: "Aug 30, 2026", mood: "Reflective", preview: "I've been noticing how I shut down when people get emotionally intense. The Pull's pattern report described it exactly — I retreat into analysis as a protective mechanism…", tags: ["Patterns", "Growth"], words: 195 },
  { id: "4", title: "A moment of clarity", date: "Aug 25, 2026", mood: "Positive", preview: "My EQ score went up 4 points this week and I think I know why. I've been sitting with discomfort instead of immediately trying to solve it. That's new for me…", tags: ["Growth", "Mindfulness"], words: 164 },
  { id: "5", title: "Hard conversation with Mara", date: "Aug 20, 2026", mood: "Thoughtful", preview: "She said I make people feel like they need to earn my trust. That landed. I don't want to be closed. I want to be open. There's something to unpack here…", tags: ["Conflict", "Vulnerability"], words: 289 },
  { id: "6", title: "Why I avoid eye contact when nervous", date: "Aug 15, 2026", mood: "Reflective", preview: "The Pull surfaced this pattern in my communication profile. Realizing this is rooted in a much older dynamic I thought I'd moved past. Journaling this feels important…", tags: ["Patterns", "Self-awareness"], words: 220 },
];

const moodColors: Record<string, { bg: string; color: string }> = {
  Thoughtful: { bg: "#eff6ff", color: "#3b82f6" },
  Positive: { bg: "#f0fdf4", color: "#22c55e" },
  Reflective: { bg: "#fdf2f4", color: "#7c2232" },
};

export default function JournalPage() {
  const [composing, setComposing] = useState(false);
  return (
    <div className="space-y-5 py-2">
      <motion.div {...f(0)} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Journal</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Reflect on your relationships and growth</p>
        </div>
        <button onClick={() => setComposing(v => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ background: composing ? "#6b7280" : "var(--brand)" }}>
          <HugeiconsIcon icon={composing ? BookOpen01Icon : Add01Icon} size={15} />
          {composing ? "Cancel" : "New Entry"}
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div {...f(0.04)} className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Entries", value: entries.length, color: "#7c2232", bg: "#fdf2f4" },
          { label: "This Month", value: 3, color: "#3b82f6", bg: "#eff6ff" },
          { label: "Avg Words", value: Math.round(entries.reduce((a, e) => a + e.words, 0) / entries.length), color: "#8b5cf6", bg: "#f5f3ff" },
          { label: "Streak", value: "12d", color: "#f59e0b", bg: "#fffbeb" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-4"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Search */}
      <motion.div {...f(0.06)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <HugeiconsIcon icon={Search01Icon} size={15} style={{ color: "var(--text-muted)" }} />
        <input placeholder="Search journal entries…" className="flex-1 text-sm bg-transparent outline-none" style={{ color: "var(--text-primary)" }} />
      </motion.div>

      {/* Compose */}
      {composing && (
        <motion.div {...f(0)} className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
          <input placeholder="What's the title of this entry?" className="w-full text-lg font-bold bg-transparent outline-none mb-3" style={{ color: "var(--text-primary)" }} />
          <textarea placeholder="Write what's on your mind — your relationships, patterns, growth, moments…"
            rows={6} className="w-full text-sm bg-transparent outline-none resize-none leading-relaxed" style={{ color: "var(--text-secondary)" }} />
          <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
            <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={13} /> The Pull will analyse patterns in your entry
            </p>
            <button className="px-5 py-2 rounded-xl text-sm font-bold text-white" style={{ background: "var(--brand)" }}>
              Save Entry
            </button>
          </div>
        </motion.div>
      )}

      {/* Entries grid */}
      <div className="grid grid-cols-3 gap-4">
        {entries.map((e, i) => {
          const mc = moodColors[e.mood] || { bg: "var(--bg)", color: "var(--text-muted)" };
          return (
            <motion.div key={e.id} {...f(0.08 + i * 0.04)}>
              <Card className="p-5 cursor-pointer transition-all hover:shadow-md group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: mc.bg, color: mc.color }}>{e.mood}</span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <HugeiconsIcon icon={Calendar03Icon} size={11} /> {e.date}
                  </span>
                </div>
                <p className="text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }}>{e.title}</p>
                <p className="text-xs leading-relaxed line-clamp-3 mb-4" style={{ color: "var(--text-muted)" }}>{e.preview}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {e.tags.map(t => (
                      <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: "var(--bg)", color: "var(--text-muted)" }}>{t}</span>
                    ))}
                  </div>
                  <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{e.words}w</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
