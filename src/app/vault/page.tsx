"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon, SearchIcon, FilterIcon, ArrowRight01Icon, TrendingUpIcon } from "@hugeicons/core-free-icons";
import { mockPeople } from "@/lib/mock";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

const compatColor = (c: string) => c === "high" ? "#34d399" : c === "medium" ? "#fbbf24" : "#f87171";

export default function VaultPage() {
  return (
    <div className="space-y-4 py-2">
      {/* Header */}
      <motion.div {...f(0)} className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-1">
          <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--text-muted)" }}>Your Vault</p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold" style={{ color: "var(--text-primary)" }}>People</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{mockPeople.length} connections being tracked</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 sm:flex-none sm:w-48"
            style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)" }}>
            <HugeiconsIcon icon={SearchIcon} size={14} style={{ color: "var(--text-muted)" }} />
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>Search…</span>
          </div>
          <button className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)" }}>
            <HugeiconsIcon icon={FilterIcon} size={15} style={{ color: "var(--text-muted)" }} />
          </button>
          <Link href="/vault/add"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #7c2232, #c0404f)", color: "white", boxShadow: "0 4px 16px rgba(192,64,79,0.3)" }}>
            <HugeiconsIcon icon={UserAdd01Icon} size={14} /> Add person
          </Link>
        </div>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {mockPeople.map((p, i) => {
          const cc = compatColor(p.compatibility);
          return (
            <motion.div key={p.id} {...f(0.05 + i * 0.04)}>
              <Link href={`/vault/${p.id}`}
                className="group flex flex-col h-full rounded-2xl p-5 transition-all hover:scale-[1.01]"
                style={{
                  background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)",
                }}>
                {/* Top */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #7c2232, #a02d3d)", boxShadow: "0 4px 12px rgba(124,34,50,0.4)" }}>
                    {p.initials}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${cc}15`, color: cc, border: `1px solid ${cc}30` }}>
                    <div className="w-1 h-1 rounded-full" style={{ background: cc }} />
                    {p.compatibility}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-sm font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>{p.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{p.relation}</p>
                </div>

                {/* Score bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span style={{ color: "var(--text-muted)" }}>Pull compatibility</span>
                    <span className="font-bold" style={{ color: "var(--text-primary)" }}>{p.score}</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
                    <motion.div className="h-full rounded-full transition-all"
                      style={{ background: `linear-gradient(90deg, ${cc}80, ${cc})`, width: `${p.score}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${p.score}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.06 }} />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-1 text-[10px]" style={{ color: "var(--text-muted)" }}>
                    <HugeiconsIcon icon={TrendingUpIcon} size={10} /> Updated recently
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: "var(--brand)" }}>
                    View <HugeiconsIcon icon={ArrowRight01Icon} size={10} />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}

        {/* Add card */}
        <motion.div {...f(0.05 + mockPeople.length * 0.04)}>
          <Link href="/vault/add"
            className="flex flex-col items-center justify-center gap-3 h-full min-h-[200px] rounded-2xl border-2 border-dashed transition-all hover:border-brand hover:bg-black/[0.02]"
            style={{ borderColor: "rgba(0,0,0,0.12)", color: "var(--text-muted)" }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(224,80,96,0.08)", border: "1px solid rgba(224,80,96,0.15)" }}>
              <HugeiconsIcon icon={UserAdd01Icon} size={20} style={{ color: "var(--brand)" }} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Add person</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Track a new connection</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
