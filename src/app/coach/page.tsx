"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { DeliveredSentIcon, AiInnovation01Icon, AiSparklesIcon, Attachment01Icon } from "@hugeicons/core-free-icons";

const suggestions = [
  "Why do I struggle to open up in new relationships?",
  "What does my Pull Score say about my communication?",
  "How can I improve my emotional intelligence?",
  "Explain my relationship patterns to me",
];

type Message = { id: string; role: "assistant" | "user"; text: string };

const initMessages: Message[] = [{
  id: "1", role: "assistant",
  text: "Hey Adejare — I'm The Pull, your personal relationship intelligence coach. I have full context on your profile, your assessments, and your vault.\n\nWhat's on your mind today?",
}];

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>(initMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { id: Date.now().toString(), role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, {
        id: (Date.now() + 1).toString(), role: "assistant",
        text: "Based on your profile and the patterns I've observed across your assessments, this connects to your tendency toward analytical processing before emotional disclosure. Your Emotional Intelligence score of 81 shows strong empathy, but your self-awareness dimension (69) suggests there's room to explore this dynamic more deeply.\n\nWould you like me to walk you through a specific pattern I've noticed?",
      }]);
    }, 1800);
  };

  const bubble = (m: Message) => ({
    background: m.role === "user" ? "linear-gradient(135deg, #7c2232, #b03040)" : "var(--bg)",
    color: m.role === "user" ? "white" : "var(--text-secondary)",
    border: m.role === "assistant" ? "1px solid rgba(0,0,0,0.07)" : "none",
  });

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
            <p style={{ fontSize: 11, color: "var(--text-muted)" }}>AI relationship intelligence coach</p>
          </div>
        </div>

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
              <div style={{ padding: "10px 14px", borderRadius: 16, display: "flex", gap: 6, alignItems: "center", background: "var(--bg)", border: "1px solid rgba(0,0,0,0.07)" }}>
                {[0, 0.15, 0.3].map(d => (
                  <motion.span key={d} style={{ width: 6, height: 6, borderRadius: "50%", display: "block", background: "var(--text-muted)" }}
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{ duration: 0.8, delay: d, repeat: Infinity }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, padding: "10px 14px", borderRadius: 12, background: "var(--surface)", border: "1px solid rgba(0,0,0,0.07)" }}>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Ask The Pull anything…" rows={1}
            style={{ flex: 1, resize: "none", fontSize: 13, background: "transparent", border: "none", outline: "none", lineHeight: 1.6, color: "var(--text-primary)", maxHeight: 80 }} />
          <button onClick={() => send(input)} disabled={!input.trim()}
            style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "var(--brand)", border: "none", cursor: "pointer", opacity: input.trim() ? 1 : 0.3 }}>
            <HugeiconsIcon icon={DeliveredSentIcon} size={16} style={{ color: "white" }} />
          </button>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="coach-desktop">
        {/* Sidebar */}
        <div style={{ width: 256, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
          <div style={{ borderRadius: 16, padding: 20, background: "linear-gradient(135deg, #6b1c2b, #8c2535)", boxShadow: "0 4px 20px rgba(108,28,43,0.2)" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, background: "rgba(255,255,255,0.12)" }}>
              <HugeiconsIcon icon={AiInnovation01Icon} size={18} style={{ color: "white" }} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "white", marginBottom: 6 }}>Ask The Pull</p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>Your personal relationship intelligence coach, trained on your profile.</p>
          </div>

          <div style={{ borderRadius: 16, padding: 16, background: "var(--surface)", border: "1px solid rgba(0,0,0,0.07)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 12 }}>Try asking</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)} style={{ textAlign: "left", fontSize: 11, padding: "10px 12px", borderRadius: 10, cursor: "pointer", color: "var(--text-secondary)", border: "1px solid rgba(0,0,0,0.07)", background: "transparent" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ borderRadius: 16, padding: 16, background: "var(--surface)", border: "1px solid rgba(0,0,0,0.07)" }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>Context loaded</p>
            {["Pull Profile · 74", "5 dimensions mapped", "Vault · 3 people", "12-day streak"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />{item}
              </div>
            ))}
          </div>
        </div>

        {/* Chat panel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", background: "var(--surface)", border: "1px solid rgba(0,0,0,0.07)" }}>
          {/* Header */}
          <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={16} style={{ color: "white" }} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>The Pull</p>
              <p style={{ fontSize: 11, color: "var(--text-muted)" }}>AI relationship intelligence coach</p>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#22c55e" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} /> Online
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            <AnimatePresence>
              {messages.map(m => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                  style={{ display: "flex", gap: 12, flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
                  {m.role === "assistant" && (
                    <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
                      <HugeiconsIcon icon={AiSparklesIcon} size={14} style={{ color: "white" }} />
                    </div>
                  )}
                  <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: 16, fontSize: 13, lineHeight: 1.65, whiteSpace: "pre-line", ...bubble(m) }}>{m.text}</div>
                  {m.role === "user" && (
                    <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white", background: "linear-gradient(135deg, #4a5568, #2d3748)" }}>AA</div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
                  <HugeiconsIcon icon={AiSparklesIcon} size={14} style={{ color: "white" }} />
                </div>
                <div style={{ padding: "12px 16px", borderRadius: 16, display: "flex", gap: 6, alignItems: "center", background: "var(--bg)", border: "1px solid rgba(0,0,0,0.07)" }}>
                  {[0, 0.15, 0.3].map(d => (
                    <motion.span key={d} style={{ width: 6, height: 6, borderRadius: "50%", display: "block", background: "var(--text-muted)" }}
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{ duration: 0.8, delay: d, repeat: Infinity }} />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: 16, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 12, padding: "10px 16px", borderRadius: 12, background: "var(--bg)", border: "1px solid rgba(0,0,0,0.07)" }}>
              <button style={{ color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", paddingBottom: 2 }}>
                <HugeiconsIcon icon={Attachment01Icon} size={18} />
              </button>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="Ask The Pull anything about your relationships or intelligence…" rows={1}
                style={{ flex: 1, resize: "none", fontSize: 13, background: "transparent", border: "none", outline: "none", lineHeight: 1.6, color: "var(--text-primary)", maxHeight: 120 }} />
              <button onClick={() => send(input)} disabled={!input.trim()}
                style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "var(--brand)", border: "none", cursor: "pointer", opacity: input.trim() ? 1 : 0.3 }}>
                <HugeiconsIcon icon={DeliveredSentIcon} size={14} style={{ color: "white" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
