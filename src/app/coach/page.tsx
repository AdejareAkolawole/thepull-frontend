"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { DeliveredSentIcon, AiInnovation01Icon, AiSparklesIcon, Attachment01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";

const suggestions = [
  "Why do I struggle to open up in new relationships?",
  "What does my Pull Score say about my communication?",
  "How can I improve my emotional intelligence?",
  "Explain my relationship patterns to me",
];

type Message = { id: string; role: "assistant" | "user"; text: string };

const initMessages: Message[] = [
  {
    id: "1", role: "assistant",
    text: "Hey Adejare — I'm The Pull, your personal relationship intelligence coach. I have full context on your profile, your assessments, and your vault.\n\nWhat's on your mind today?",
  },
];

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>(initMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { id: Date.now().toString(), role: "user", text }]);
    setInput("");
    setShowSuggestions(false);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, {
        id: (Date.now() + 1).toString(), role: "assistant",
        text: "Based on your profile and the patterns I've observed across your assessments, this connects to your tendency toward analytical processing before emotional disclosure. Your Emotional Intelligence score of 81 shows strong empathy, but your self-awareness dimension (69) suggests there's room to explore this dynamic more deeply.\n\nWould you like me to walk you through a specific pattern I've noticed?",
      }]);
    }, 1800);
  };

  return (
    <div className="py-2">
      {/* Mobile layout */}
      <div className="flex flex-col md:hidden" style={{ height: "calc(100dvh - 130px)" }}>
        {/* Mobile header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
            <HugeiconsIcon icon={AiSparklesIcon} size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>The Pull</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>AI relationship intelligence coach</p>
          </div>
          <button onClick={() => setShowSuggestions(v => !v)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg"
            style={{ background: "var(--brand-light)", color: "var(--brand)" }}>
            {showSuggestions ? "Hide" : "Suggestions"}
          </button>
        </div>

        {/* Mobile suggestions drawer */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-3">
              <div className="grid grid-cols-1 gap-2 pb-1">
                {suggestions.map(s => (
                  <button key={s} onClick={() => send(s)}
                    className="w-full text-left text-xs p-3 rounded-xl transition-all hover:bg-[var(--brand-light)]"
                    style={{ color: "var(--text-secondary)", border: "1px solid var(--border)", background: "var(--surface)" }}>
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto rounded-2xl p-4 space-y-4 mb-3"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          {messages.map(m => (
            <div key={m.id} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              {m.role === "assistant" && (
                <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
                  <HugeiconsIcon icon={AiSparklesIcon} size={12} className="text-white" />
                </div>
              )}
              <div className={`max-w-[80%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${m.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                style={{
                  background: m.role === "user" ? "linear-gradient(135deg, #7c2232, #b03040)" : "var(--bg)",
                  color: m.role === "user" ? "white" : "var(--text-secondary)",
                  border: m.role === "assistant" ? "1px solid var(--border)" : "none",
                }}>
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
                <HugeiconsIcon icon={AiSparklesIcon} size={12} className="text-white" />
              </div>
              <div className="px-3 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
                style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                {[0, 0.15, 0.3].map(d => (
                  <motion.span key={d} className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--text-muted)" }}
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{ duration: 0.8, delay: d, repeat: Infinity }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Mobile input */}
        <div className="flex items-end gap-2 px-3 py-2.5 rounded-xl"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Ask The Pull anything…"
            rows={1} className="flex-1 resize-none text-sm bg-transparent outline-none leading-relaxed"
            style={{ color: "var(--text-primary)", maxHeight: 80 }} />
          <button onClick={() => send(input)} disabled={!input.trim()}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-30"
            style={{ background: "var(--brand)" }}>
            <HugeiconsIcon icon={DeliveredSentIcon} size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex gap-5" style={{ height: "calc(100vh - 100px)" }}>
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 space-y-3 overflow-y-auto">
          <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, #6b1c2b, #8c2535)", boxShadow: "0 4px 20px rgba(108,28,43,0.2)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(255,255,255,0.12)" }}>
              <HugeiconsIcon icon={AiInnovation01Icon} size={18} className="text-white" />
            </div>
            <p className="text-sm font-bold text-white">Ask The Pull</p>
            <p className="text-xs text-white/55 mt-1.5 leading-relaxed">Your personal relationship intelligence coach, trained on your profile.</p>
          </div>

          <div className="rounded-2xl p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-bold mb-3" style={{ color: "var(--text-muted)" }}>Try asking</p>
            <div className="space-y-2">
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)}
                  className="w-full text-left text-xs p-2.5 rounded-xl transition-all hover:bg-[var(--brand-light)]"
                  style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-4 text-xs space-y-2" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <p className="font-bold" style={{ color: "var(--text-primary)" }}>Context loaded</p>
            {["Pull Profile · 74", "5 dimensions mapped", "Vault · 3 people", "12-day streak"].map(item => (
              <div key={item} className="flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>The Pull</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>AI relationship intelligence coach</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-xs" style={{ color: "#22c55e" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Online
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <AnimatePresence>
              {messages.map(m => (
                <motion.div key={m.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
                      <HugeiconsIcon icon={AiSparklesIcon} size={14} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${m.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                    style={{
                      background: m.role === "user" ? "linear-gradient(135deg, #7c2232, #b03040)" : "var(--bg)",
                      color: m.role === "user" ? "white" : "var(--text-secondary)",
                      border: m.role === "assistant" ? "1px solid var(--border)" : "none",
                    }}>
                    {m.text}
                  </div>
                  {m.role === "user" && (
                    <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #4a5568, #2d3748)" }}>AA</div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
                  <HugeiconsIcon icon={AiSparklesIcon} size={14} className="text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                  {[0, 0.15, 0.3].map(d => (
                    <motion.span key={d} className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--text-muted)" }}
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{ duration: 0.8, delay: d, repeat: Infinity }} />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-4" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex items-end gap-3 rounded-xl px-4 py-3"
              style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
              <button style={{ color: "var(--text-muted)" }}>
                <HugeiconsIcon icon={Attachment01Icon} size={18} />
              </button>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="Ask The Pull anything about your relationships or intelligence…"
                rows={1} className="flex-1 resize-none text-sm bg-transparent outline-none leading-relaxed"
                style={{ color: "var(--text-primary)", maxHeight: 120 }} />
              <button onClick={() => send(input)} disabled={!input.trim()}
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-30"
                style={{ background: "var(--brand)" }}>
                <HugeiconsIcon icon={DeliveredSentIcon} size={14} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
