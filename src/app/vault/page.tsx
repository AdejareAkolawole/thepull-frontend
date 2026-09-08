"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon, SearchIcon, FilterIcon } from "@hugeicons/core-free-icons";

const f = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

export default function VaultPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <motion.div {...f(0)} className="page-header-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Your Vault</p>
          <h1 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.1 }}>People</h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Track the people who matter to your growth</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="vault-search-bar" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 12, background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", width: 180 }}>
            <HugeiconsIcon icon={SearchIcon} size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Search…</span>
          </div>
          <button className="vault-filter-btn" style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", cursor: "pointer" }}>
            <HugeiconsIcon icon={FilterIcon} size={15} style={{ color: "var(--text-muted)" }} />
          </button>
          <Link href="/vault/add" style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 12, fontSize: 13, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", boxShadow: "0 4px 16px rgba(192,64,79,0.3)", textDecoration: "none", whiteSpace: "nowrap" }}>
            <HugeiconsIcon icon={UserAdd01Icon} size={14} /> Add person
          </Link>
        </div>
      </motion.div>

      {/* Empty state */}
      <motion.div {...f(0.08)}>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 20, padding: "64px 24px", borderRadius: 20,
          background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(192,64,79,0.07)", border: "1px solid rgba(192,64,79,0.15)" }}>
            <HugeiconsIcon icon={UserAdd01Icon} size={28} style={{ color: "var(--brand)" }} />
          </div>
          <div style={{ textAlign: "center", maxWidth: 360 }}>
            <p style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>No connections yet</p>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
              Add people to your vault to track compatibility, patterns, and relationship dynamics using your Pull intelligence.
            </p>
          </div>
          <Link href="/vault/add" style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 24px", borderRadius: 12, fontSize: 13, fontWeight: 700, color: "white", background: "linear-gradient(135deg, #7c2232, #c0404f)", boxShadow: "0 4px 16px rgba(192,64,79,0.3)", textDecoration: "none" }}>
            <HugeiconsIcon icon={UserAdd01Icon} size={14} /> Add your first person
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
