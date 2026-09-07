"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Calendar03Icon, AiSparklesIcon, BookOpen01Icon, Search01Icon } from "@hugeicons/core-free-icons";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

const Card = ({ children, style = {} }: any) => (
  <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)", ...style }}>
    {children}
  </div>
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
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <motion.div {...f(0)} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Self-reflection</p>
          <h1 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.1 }}>Journal</h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Reflect on your relationships and growth</p>
        </div>
        <button onClick={() => setComposing(v => !v)} style={{
          display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 12,
          fontSize: 13, fontWeight: 700, cursor: "pointer",
          background: composing ? "rgba(0,0,0,0.04)" : "linear-gradient(135deg, #7c2232, #c0404f)",
          color: composing ? "var(--text-secondary)" : "white",
          boxShadow: composing ? "none" : "0 4px 16px rgba(192,64,79,0.3)",
          border: composing ? "1px solid rgba(0,0,0,0.08)" : "none",
        }}>
          <HugeiconsIcon icon={composing ? BookOpen01Icon : Add01Icon} size={14} />
          {composing ? "Cancel" : "New Entry"}
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div {...f(0.04)} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "Total Entries", value: entries.length, accent: "#e05060" },
          { label: "This Month", value: 3, accent: "#60a5fa" },
          { label: "Avg Words", value: Math.round(totalWords / entries.length), accent: "#a78bfa" },
          { label: "Streak", value: "12d", accent: "#fbbf24" },
        ].map(s => (
          <Card key={s.label} style={{ padding: 16 }}>
            <p style={{ fontSize: 24, fontWeight: 800, color: s.accent }}>{s.value}</p>
            <p style={{ fontSize: 11, marginTop: 2, color: "var(--text-muted)" }}>{s.label}</p>
          </Card>
        ))}
      </motion.div>

      {/* Search */}
      <motion.div {...f(0.06)}>
        <Card style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px" }}>
          <HugeiconsIcon icon={Search01Icon} size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          <input placeholder="Search journal entries…" style={{ flex: 1, fontSize: 13, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)" }} />
        </Card>
      </motion.div>

      {/* Compose */}
      {composing && (
        <motion.div {...f(0)}>
          <Card style={{ padding: 20 }}>
            <input placeholder="What's the title of this entry?" style={{ display: "block", width: "100%", fontSize: 17, fontWeight: 700, background: "transparent", border: "none", borderBottom: "1px solid rgba(0,0,0,0.08)", outline: "none", paddingBottom: 12, marginBottom: 12, color: "var(--text-primary)" }} />
            <textarea placeholder="Write what's on your mind — your relationships, patterns, growth, moments…"
              rows={6} style={{ display: "block", width: "100%", fontSize: 13, background: "transparent", border: "none", outline: "none", resize: "none", lineHeight: 1.7, color: "var(--text-secondary)" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-muted)" }}>
                <HugeiconsIcon icon={AiSparklesIcon} size={12} style={{ color: "var(--brand)" }} />
                The Pull will analyse patterns in your entry
              </p>
              <button style={{ padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", border: "none", cursor: "pointer" }}>
                Save Entry
              </button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Entries grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {entries.map((e, i) => (
          <motion.div key={e.id} {...f(0.08 + i * 0.04)}>
            <div style={{
              display: "flex", flexDirection: "column", height: "100%",
              borderRadius: 16, padding: 20, cursor: "pointer",
              background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)",
            }}>
              {/* Top row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: `${e.moodAccent}18`, color: e.moodAccent, border: `1px solid ${e.moodAccent}30` }}>
                  {e.mood}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "var(--text-muted)" }}>
                  <HugeiconsIcon icon={Calendar03Icon} size={10} /> {e.date}
                </span>
              </div>
              {/* Content */}
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>{e.title}</p>
              <p style={{ fontSize: 11, lineHeight: 1.6, color: "var(--text-muted)", flex: 1, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{e.preview}</p>
              {/* Footer */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {e.tags.map(t => (
                    <span key={t} style={{ fontSize: 9, fontWeight: 600, padding: "2px 8px", borderRadius: 99, background: "rgba(0,0,0,0.04)", color: "var(--text-muted)", border: "1px solid rgba(0,0,0,0.07)" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{e.words}w</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
