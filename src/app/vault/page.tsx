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
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <motion.div {...f(0)} className="page-header-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Your Vault</p>
          <h1 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.1 }}>People</h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{mockPeople.length} connections being tracked</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 12, background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", width: 180 }}>
            <HugeiconsIcon icon={SearchIcon} size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Search…</span>
          </div>
          <button style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", cursor: "pointer" }}>
            <HugeiconsIcon icon={FilterIcon} size={15} style={{ color: "var(--text-muted)" }} />
          </button>
          <Link href="/vault/add" style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 12, fontSize: 13, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", boxShadow: "0 4px 16px rgba(192,64,79,0.3)", textDecoration: "none" }}>
            <HugeiconsIcon icon={UserAdd01Icon} size={14} /> Add person
          </Link>
        </div>
      </motion.div>

      {/* Cards grid */}
      <div data-cols="3">
        {mockPeople.map((p, i) => {
          const cc = compatColor(p.compatibility);
          return (
            <motion.div key={p.id} {...f(0.05 + i * 0.04)}>
              <Link href={`/vault/${p.id}`} style={{
                display: "flex", flexDirection: "column", height: "100%",
                borderRadius: 16, padding: 20,
                background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)",
                textDecoration: "none",
              }}>
                {/* Top row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "white", flexShrink: 0, background: "linear-gradient(135deg, #7c2232, #a02d3d)", boxShadow: "0 4px 12px rgba(124,34,50,0.4)" }}>
                    {p.initials}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: `${cc}18`, color: cc, border: `1px solid ${cc}40` }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: cc }} />
                    {p.compatibility}
                  </div>
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>{p.name}</p>
                  <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{p.relation}</p>
                </div>

                {/* Score bar */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 6 }}>
                    <span style={{ color: "var(--text-muted)" }}>Pull compatibility</span>
                    <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{p.score}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 99, overflow: "hidden", background: "rgba(0,0,0,0.06)" }}>
                    <motion.div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${cc}80, ${cc})` }}
                      initial={{ width: 0 }} animate={{ width: `${p.score}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.06 }} />
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "var(--text-muted)" }}>
                    <HugeiconsIcon icon={TrendingUpIcon} size={10} /> Updated recently
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, color: "var(--brand)" }}>
                    View <HugeiconsIcon icon={ArrowRight01Icon} size={10} />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}

        {/* Add card */}
        <motion.div {...f(0.05 + mockPeople.length * 0.04)}>
          <Link href="/vault/add" style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 12, height: "100%", minHeight: 200, borderRadius: 16,
            border: "2px dashed rgba(0,0,0,0.12)", textDecoration: "none",
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(192,64,79,0.08)", border: "1px solid rgba(192,64,79,0.15)" }}>
              <HugeiconsIcon icon={UserAdd01Icon} size={20} style={{ color: "var(--brand)" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>Add person</p>
              <p style={{ fontSize: 11, marginTop: 2, color: "var(--text-muted)" }}>Track a new connection</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
