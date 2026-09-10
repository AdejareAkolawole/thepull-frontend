"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Calendar03Icon, AiSparklesIcon, BookOpen01Icon, Search01Icon, Delete02Icon } from "@hugeicons/core-free-icons";
import { getJournalEntries, createJournalEntry, deleteJournalEntry, isLoggedIn } from "@/lib/api";
import { trackActivity } from "@/lib/streaks";
import { useRouter } from "next/navigation";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

const Card = ({ children, style = {} }: any) => (
  <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)", ...style }}>
    {children}
  </div>
);

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return dateStr;
  }
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function JournalPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [composing, setComposing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      setLoading(false);
      window.location.href = "/login";
      return;
    }
    load();
  }, [router]);

  async function load() {
    setLoading(true);
    try {
      const res = await getJournalEntries();
      setEntries((res as any).entries ?? []);
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!content.trim()) return;
    setSaving(true);
    try {
      await createJournalEntry({ title: title.trim() || undefined, content });
      trackActivity("journal");
      setTitle("");
      setContent("");
      setComposing(false);
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await deleteJournalEntry(id);
    await load();
  }

  const filtered = entries.filter(e =>
    !search || (e.title ?? "").toLowerCase().includes(search.toLowerCase()) || (e.content ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const totalWords = entries.reduce((a: number, e: any) => a + wordCount(e.content ?? ""), 0);
  const thisMonth = entries.filter((e: any) => {
    try { return new Date(e.created_at).getMonth() === new Date().getMonth(); } catch { return false; }
  }).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <motion.div {...f(0)} className="page-header-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
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
      <motion.div {...f(0.04)} data-cols="4">
        {[
          { label: "Total Entries", value: loading ? "—" : entries.length, accent: "#e05060" },
          { label: "This Month", value: loading ? "—" : thisMonth, accent: "#60a5fa" },
          { label: "Avg Words", value: loading || !entries.length ? "—" : Math.round(totalWords / entries.length), accent: "#a78bfa" },
          { label: "Streak", value: "—", accent: "#fbbf24" },
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
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search journal entries…" style={{ flex: 1, fontSize: 13, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)" }} />
        </Card>
      </motion.div>

      {/* Compose */}
      {composing && (
        <motion.div {...f(0)}>
          <Card style={{ padding: 20 }}>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="What's the title of this entry?" style={{ display: "block", width: "100%", fontSize: 17, fontWeight: 700, background: "transparent", border: "none", borderBottom: "1px solid rgba(0,0,0,0.08)", outline: "none", paddingBottom: 12, marginBottom: 12, color: "var(--text-primary)" }} />
            <textarea value={content} onChange={e => setContent(e.target.value)}
              placeholder="Write what's on your mind — your relationships, patterns, growth, moments…"
              rows={6} style={{ display: "block", width: "100%", fontSize: 13, background: "transparent", border: "none", outline: "none", resize: "none", lineHeight: 1.7, color: "var(--text-secondary)" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-muted)" }}>
                <HugeiconsIcon icon={AiSparklesIcon} size={12} style={{ color: "var(--brand)" }} />
                The Pull will analyse patterns in your entry
              </p>
              <button onClick={handleSave} disabled={saving || !content.trim()} style={{ padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, color: "white", background: saving ? "rgba(0,0,0,0.1)" : "linear-gradient(135deg, #7c2232, #c0404f)", border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                {saving ? "Saving…" : "Save Entry"}
              </button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)", fontSize: 13 }}>Loading entries…</div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)", fontSize: 13 }}>
          {entries.length === 0 ? "No entries yet. Write your first one above." : "No entries match your search."}
        </div>
      )}

      {/* Entries grid */}
      {!loading && filtered.length > 0 && (
        <div data-cols="3">
          {filtered.map((e: any, i: number) => (
            <motion.div key={e.id} {...f(0.08 + i * 0.04)}>
              <div style={{
                display: "flex", flexDirection: "column", height: "100%",
                borderRadius: 16, padding: 20, cursor: "pointer",
                background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)",
              }}>
                {/* Top row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: "rgba(96,165,250,0.12)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.25)" }}>
                    {e.entry_type ?? "Reflection"}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "var(--text-muted)" }}>
                    <HugeiconsIcon icon={Calendar03Icon} size={10} /> {formatDate(e.created_at)}
                  </span>
                </div>
                {/* Content */}
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>{e.title || "Untitled"}</p>
                <p style={{ fontSize: 11, lineHeight: 1.6, color: "var(--text-muted)", flex: 1, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                  {e.content}
                </p>
                {/* Footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{wordCount(e.content ?? "")}w</span>
                  <button onClick={() => handleDelete(e.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(0,0,0,0.2)", padding: 4, display: "flex" }}>
                    <HugeiconsIcon icon={Delete02Icon} size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
