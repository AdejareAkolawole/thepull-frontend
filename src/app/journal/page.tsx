"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Calendar03Icon, AiSparklesIcon, BookOpen01Icon, Search01Icon } from "@hugeicons/core-free-icons";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" } });

const G = ({ children, className = "", style = {} }: any) => (
  <div className={`rounded-2xl ${className}`} style={{
    background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)", ...style,
  }}>{children}</div>
);

const entries = [
  { id: "1", title: "Reflecting on a difficult conversation", date: "Sep 6, 2026", mood: "Thoughtful", moodAccent: "#60a5fa", preview: "Today I had a tense exchange with Theo about the project. I noticed myself getting defensive early on, which The Pull flagged as consistent with my analytical retreat pattern…", tags: ["Conflict", "Self-awareness"], words: 312 },
  { id: "2", title: "Breakthrough with Jordan", date: "Sep 4, 2026", mood: "Positive", moodAccent: "#34d399", preview: "Something shifted today. I finally expressed what I needed without over-explaining it. Jordan's response was warm, and I felt genuinely heard for the first time in a long while…", tags: ["Communication", "Vulnerability"], words: 248 },
  { id: "3", title: "Processing old patterns", date: "Aug 30, 2026", mood: "Reflective", moodAccent: "#e05060", preview: "I've been noticing how I shut down when people get emotionally intense. The Pull's pattern report described it exactly — I retreat into analysis as a protective mechanism…", tags: ["Patterns", "Growth"], words: 195 },
  { id: "4", title: "A moment of clarity", date: "Aug 25, 2026", mood: "Positive", moodAccent: "#34d399", preview: "My EQ score went up 4 points this week and I think I know why. I've been sitting with discomfort instead of immediately trying to solve it. That's new for me…", tags: ["Growth", "Mindfulness"], words: 164 },
  { id: "5", title: "Hard conversation with Mara", date: "Aug 20, 2026", mood: "Thoughtful", moodAccent: "#60a5fa", preview: "She said I make people feel like they need to earn my trust. That landed. I don't want to be closed. I want to be open. There's something to unpack here…", tags: ["Conflict", "Vulnerability"], words: 289 },
  { id: "6", title: "Why I avoid eye contact when nervous", date: "Aug 15, 2026", mood: "Reflective", moodAccent: "#e05060", preview: "The Pull surfaced this pattern in my communication profile. Realizing this is rooted in a much older dynamic I thought I'd moved past. Journaling this feels important…", tags: ["Patterns", "Self-awareness"], words: 220 },
];

export default function JournalPage() {
  const [composing, setComposing] = useState(false);
  const totalWords = entries.reduce((a, e) => a + e.words, 0);

  return (
    <div className="space-y-4 py-2">
      {/* Header */}
      <motion.div {...f(0)} className="flex items-end justify-between">
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--text-muted)" }}>Self-reflection</p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold" style={{ color: "var(--text-primary)" }}>Journal</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Reflect on your relationships and growth</p>
        </div>
        <button onClick={() => setComposing(v => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
          style={{
            background: composing ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg, #7c2232, #c0404f)",
            color: "white",
            boxShadow: composing ? "none" : "0 4px 16px rgba(192,64,79,0.3)",
            border: composing ? "1px solid rgba(255,255,255,0.12)" : "none",
          }}>
          <HugeiconsIcon icon={composing ? BookOpen01Icon : Add01Icon} size={14} />
          {composing ? "Cancel" : "New Entry"}
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div {...f(0.04)} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Entries", value: entries.length, accent: "#e05060" },
          { label: "This Month", value: 3, accent: "#60a5fa" },
          { label: "Avg Words", value: Math.round(totalWords / entries.length), accent: "#a78bfa" },
          { label: "Streak", value: "12d", accent: "#fbbf24" },
        ].map((s) => (
          <G key={s.label} className="p-4">
            <p className="text-2xl font-bold" style={{ color: s.accent }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</p>
          </G>
        ))}
      </motion.div>

      {/* Search */}
      <motion.div {...f(0.06)}>
        <G className="flex items-center gap-2.5 px-4 py-3">
          <HugeiconsIcon icon={Search01Icon} size={14} style={{ color: "var(--text-muted)" }} />
          <input placeholder="Search journal entries…" className="flex-1 text-sm bg-transparent outline-none" style={{ color: "var(--text-primary)" }} />
        </G>
      </motion.div>

      {/* Compose */}
      {composing && (
        <motion.div {...f(0)}>
          <G className="p-5">
            <input placeholder="What's the title of this entry?" className="w-full text-lg font-bold bg-transparent outline-none mb-3 border-b pb-3"
              style={{ color: "var(--text-primary)", borderColor: "rgba(255,255,255,0.07)" }} />
            <textarea placeholder="Write what's on your mind — your relationships, patterns, growth, moments…"
              rows={6} className="w-full text-sm bg-transparent outline-none resize-none leading-relaxed"
              style={{ color: "var(--text-secondary)" }} />
            <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                <HugeiconsIcon icon={AiSparklesIcon} size={12} style={{ color: "var(--brand)" }} />
                The Pull will analyse patterns in your entry
              </p>
              <button className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #7c2232, #c0404f)" }}>
                Save Entry
              </button>
            </div>
          </G>
        </motion.div>
      )}

      {/* Entries grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {entries.map((e, i) => (
          <motion.div key={e.id} {...f(0.08 + i * 0.04)}>
            <div className="flex flex-col h-full rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.01]"
              style={{
                background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)",
              }}>
              {/* Top row */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${e.moodAccent}15`, color: e.moodAccent, border: `1px solid ${e.moodAccent}25` }}>
                  {e.mood}
                </span>
                <span className="flex items-center gap-1 text-[10px]" style={{ color: "var(--text-muted)" }}>
                  <HugeiconsIcon icon={Calendar03Icon} size={10} /> {e.date}
                </span>
              </div>
              {/* Content */}
              <p className="text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }}>{e.title}</p>
              <p className="text-[11px] leading-relaxed line-clamp-3 flex-1 mb-4" style={{ color: "var(--text-muted)" }}>{e.preview}</p>
              {/* Footer */}
              <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="flex flex-wrap gap-1">
                  {e.tags.map(t => (
                    <span key={t} className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-muted)", border: "1px solid rgba(0,0,0,0.07)" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{e.words}w</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
