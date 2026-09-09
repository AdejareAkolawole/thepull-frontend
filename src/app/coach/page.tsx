"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { DeliveredSentIcon, AiSparklesIcon, LockIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { sendCoachMessage, getDashboard, isLoggedIn } from "@/lib/api";
import { trackActivity } from "@/lib/streaks";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const FREE_LIMIT = 5;

const suggestions = [
  "Why do I struggle to open up in new relationships?",
  "What does my Pull Score say about my communication?",
  "How can I improve my emotional intelligence?",
  "Explain my relationship patterns to me",
];

type Message = { id: string; role: "assistant" | "user"; text: string };
type Usage = { used: number; limit: number; remaining: number; limit_reached: boolean; tier: string } | null;

async function fetchUsage(token: string): Promise<Usage> {
  try {
    const r = await fetch(`${BASE_URL}/coach/usage`, { headers: { Authorization: `Bearer ${token}` } });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

export default function CoachPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [name, setName] = useState("there");
  const [usage, setUsage] = useState<Usage>(null);
  const [limitReached, setLimitReached] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoggedIn()) { router.push("/login"); return; }
    const token = localStorage.getItem("pull_token") || "";
    Promise.all([
      getDashboard(),
      fetchUsage(token),
    ]).then(([res, u]) => {
      const n = (res.profile as Record<string, unknown>)?.display_name as string || res.user.email.split("@")[0];
      setName(n);
      setUsage(u);
      if (u?.limit_reached) setLimitReached(true);
      setMessages([{
        id: "1", role: "assistant",
        text: `Hey ${n} — I'm The Pull, your personal intelligence coach. I have full context on your profile, your assessments, and your dimensions.\n\nWhat's on your mind today?`,
      }]);
    }).catch(() => {
      setMessages([{
        id: "1", role: "assistant",
        text: "Hey — I'm The Pull, your personal intelligence coach.\n\nWhat's on your mind today?",
      }]);
    });
  }, [router]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = async (text: string) => {
    if (!text.trim() || typing || limitReached) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setTyping(true);
    try {
      const res = await sendCoachMessage(text);
      trackActivity("coach");
      setMessages(m => [...m, { id: (Date.now() + 1).toString(), role: "assistant", text: res.response }]);
      if (res.usage) {
        setUsage(prev => prev ? { ...prev, ...res.usage } : { tier: "free", limit_reached: false, ...res.usage! });
        if (res.usage.remaining <= 0) setLimitReached(true);
      }
    } catch (err: any) {
      const detail = err?.detail;
      if (detail?.code === "coach_limit_reached" || err?.status === 429) {
        setLimitReached(true);
        setUsage(prev => prev ? { ...prev, limit_reached: true, remaining: 0, used: FREE_LIMIT } : null);
        setMessages(m => [...m, {
          id: (Date.now() + 1).toString(), role: "assistant",
          text: `You've used all ${FREE_LIMIT} coach sessions for this month. Upgrade to Premium for unlimited access.`,
        }]);
      } else {
        setMessages(m => [...m, { id: (Date.now() + 1).toString(), role: "assistant", text: "Something went wrong. Please try again." }]);
      }
    } finally {
      setTyping(false);
    }
  };

  const bubble = (m: Message) => ({
    background: m.role === "user" ? "linear-gradient(135deg, #7c2232, #b03040)" : "var(--bg)",
    color: m.role === "user" ? "white" : "var(--text-secondary)",
    border: m.role === "assistant" ? "1px solid rgba(0,0,0,0.07)" : "none",
  });

  const UsageBar = () => {
    if (!usage || usage.tier !== "free") return null;
    const pct = ((usage.used) / FREE_LIMIT) * 100;
    const color = usage.remaining === 0 ? "#ef4444" : usage.remaining <= 1 ? "#f97316" : "#c0404f";
    return (
      <div style={{ padding: "10px 14px", borderRadius: 12, background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.07)", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)" }}>Monthly sessions</span>
          <span style={{ fontSize: 11, fontWeight: 700, color }}>
            {usage.used}/{FREE_LIMIT} used
          </span>
        </div>
        <div style={{ height: 4, borderRadius: 99, background: "rgba(0,0,0,0.08)" }}>
          <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, borderRadius: 99, background: color, transition: "width 0.4s ease" }} />
        </div>
        {usage.remaining <= 1 && !usage.limit_reached && (
          <p style={{ fontSize: 10, marginTop: 6, color: "#f97316" }}>
            {usage.remaining === 1 ? "1 session left this month." : "0 sessions left."}{" "}
            <Link href="/upgrade" style={{ color: "#f97316", fontWeight: 700 }}>Upgrade →</Link>
          </p>
        )}
      </div>
    );
  };

  const LimitWall = () => (
    <div style={{
      borderRadius: 16, padding: "24px 20px", textAlign: "center",
      background: "linear-gradient(135deg, #1c0810 0%, #2d1020 100%)",
      border: "1px solid rgba(192,64,79,0.2)",
    }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(192,64,79,0.12)", border: "1px solid rgba(192,64,79,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
        <HugeiconsIcon icon={LockIcon} size={20} style={{ color: "#c0404f" }} />
      </div>
      <p style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 6 }}>Monthly limit reached</p>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 16 }}>
        You've used all {FREE_LIMIT} free coach sessions this month. Upgrade for unlimited access to The Pull.
      </p>
      <Link href="/upgrade" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 12, fontSize: 13, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", textDecoration: "none" }}>
        Upgrade to Premium <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
      </Link>
    </div>
  );

  return (
    <>
      <style>{`
        .coach-mobile { display: flex; flex-direction: column; height: calc(100dvh - 130px); }
        .coach-desktop { display: none; }
        @media (min-width: 768px) {
          .coach-mobile { display: none !important; }
          .coach-desktop { display: flex !important; height: calc(100vh - 100px); gap: 20px; }
        }
      `}</style>

      {/* Mobile layout */}
      <div className="coach-mobile">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
            <HugeiconsIcon icon={AiSparklesIcon} size={16} style={{ color: "white" }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>The Pull</p>
            <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Ask The Pull</p>
          </div>
        </div>

        <UsageBar />

        <div style={{ flex: 1, overflowY: "auto", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 16, marginBottom: 12, background: "var(--surface)", border: "1px solid rgba(0,0,0,0.07)" }}>
          {messages.map(m => (
            <div key={m.id} style={{ display: "flex", gap: 8, flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
              {m.role === "assistant" && (
                <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
                  <HugeiconsIcon icon={AiSparklesIcon} size={12} style={{ color: "white" }} />
                </div>
              )}
              <div style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: 16, fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-line", ...bubble(m) }}>{m.text}</div>
            </div>
          ))}
          {typing && (
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
                <HugeiconsIcon icon={AiSparklesIcon} size={12} style={{ color: "white" }} />
              </div>
              <div style={{ padding: "10px 16px", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", display: "flex", gap: 4, alignItems: "center" }}>
                {[0, 1, 2].map(i => (
                  <motion.div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#c0404f" }}
                    animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {limitReached ? <LimitWall /> : (
          <>
            {messages.length <= 1 && (
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 4 }}>
                {suggestions.map(s => (
                  <button key={s} onClick={() => send(s)} style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 99, border: "1px solid rgba(192,64,79,0.2)", background: "rgba(192,64,79,0.05)", color: "var(--text-secondary)", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="Ask The Pull anything…"
                style={{ flex: 1, padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(0,0,0,0.1)", background: "var(--surface)", fontSize: 14, outline: "none", color: "var(--text-primary)" }}
              />
              <button onClick={() => send(input)} disabled={!input.trim() || typing}
                style={{ width: 44, height: 44, borderRadius: 12, background: input.trim() && !typing ? "linear-gradient(135deg, #7c2232, #b03040)" : "rgba(0,0,0,0.06)", border: "none", cursor: input.trim() && !typing ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <HugeiconsIcon icon={DeliveredSentIcon} size={16} style={{ color: input.trim() && !typing ? "white" : "rgba(0,0,0,0.25)" }} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Desktop layout */}
      <div className="coach-desktop">
        {/* Sidebar */}
        <div style={{ width: 260, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ borderRadius: 18, padding: "20px 18px", background: "linear-gradient(140deg, #3d0e1a, #6b1c2b)", boxShadow: "0 4px 20px rgba(61,14,26,0.22)" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={18} style={{ color: "white" }} />
            </div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 6 }}>The Pull</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>Your personal intelligence coach with full context on your profile and dimensions.</p>
          </div>

          <UsageBar />

          {!limitReached && (
            <div style={{ background: "var(--surface)", borderRadius: 18, padding: "18px", border: "1px solid rgba(0,0,0,0.07)" }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>Suggested Questions</p>
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)}
                  style={{ width: "100%", textAlign: "left", padding: "9px 12px", borderRadius: 10, border: "1px solid rgba(192,64,79,0.15)", background: "rgba(192,64,79,0.04)", color: "var(--text-secondary)", fontSize: 12, fontWeight: 500, cursor: "pointer", marginBottom: 8, lineHeight: 1.5 }}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chat area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ flex: 1, overflowY: "auto", borderRadius: 18, padding: 24, display: "flex", flexDirection: "column", gap: 20, marginBottom: 12, background: "var(--surface)", border: "1px solid rgba(0,0,0,0.07)" }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: "flex", gap: 12, flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-start" }}>
                {m.role === "assistant" && (
                  <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
                    <HugeiconsIcon icon={AiSparklesIcon} size={15} style={{ color: "white" }} />
                  </div>
                )}
                <div style={{ maxWidth: "72%", padding: "12px 18px", borderRadius: 18, fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-line", ...bubble(m) }}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
                  <HugeiconsIcon icon={AiSparklesIcon} size={15} style={{ color: "white" }} />
                </div>
                <div style={{ padding: "12px 18px", borderRadius: 18, border: "1px solid rgba(0,0,0,0.07)", display: "flex", gap: 5, alignItems: "center" }}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#c0404f" }}
                      animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {limitReached ? (
            <LimitWall />
          ) : (
            <div style={{ display: "flex", gap: 10 }}>
              <input
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="Ask The Pull anything about your intelligence…"
                style={{ flex: 1, padding: "14px 18px", borderRadius: 14, border: "1px solid rgba(0,0,0,0.1)", background: "var(--surface)", fontSize: 14, outline: "none", color: "var(--text-primary)" }}
              />
              <button onClick={() => send(input)} disabled={!input.trim() || typing}
                style={{ padding: "0 22px", borderRadius: 14, background: input.trim() && !typing ? "linear-gradient(135deg, #7c2232, #b03040)" : "rgba(0,0,0,0.06)", border: "none", cursor: input.trim() && !typing ? "pointer" : "default", display: "flex", alignItems: "center", gap: 8, color: input.trim() && !typing ? "white" : "rgba(0,0,0,0.25)", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                <HugeiconsIcon icon={DeliveredSentIcon} size={16} />
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
