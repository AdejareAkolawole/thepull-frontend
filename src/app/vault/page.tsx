"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon, ArrowRight01Icon, Search01Icon, FilterAddIcon, Analytics01Icon, UserGroupIcon } from "@hugeicons/core-free-icons";
import { mockPeople } from "@/lib/mock";

const f = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: d, ease: [0.22, 1, 0.36, 1] } });

const allPeople = [
  ...mockPeople,
  { id: "4", name: "Aisha", initials: "A", relation: "Sister", score: 95, compatibility: "high" as const },
  { id: "5", name: "Marcus", initials: "M", relation: "Mentor", score: 82, compatibility: "high" as const },
  { id: "6", name: "Riley", initials: "R", relation: "Colleague", score: 61, compatibility: "medium" as const },
];

export default function VaultPage() {
  return (
    <div className="space-y-4 py-2">
      <motion.div {...f(0)} className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold" style={{ color: "var(--text-primary)" }}>My Vault</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>People you're tracking</p>
        </div>
        <Link href="/vault/add"
          className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: "var(--brand)" }}>
          <HugeiconsIcon icon={UserAdd01Icon} size={15} />
          <span className="hidden sm:inline">Add Person</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div {...f(0.05)} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total People", value: allPeople.length, icon: UserGroupIcon, color: "#7c2232", bg: "#fdf2f4" },
          { label: "High Match", value: allPeople.filter(p => p.compatibility === "high").length, icon: Analytics01Icon, color: "#22c55e", bg: "#f0fdf4" },
          { label: "Medium Match", value: allPeople.filter(p => p.compatibility === "medium").length, icon: Analytics01Icon, color: "#f59e0b", bg: "#fffbeb" },
          { label: "Reports", value: 3, icon: Analytics01Icon, color: "#3b82f6", bg: "#eff6ff" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
              <HugeiconsIcon icon={s.icon} size={16} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Search */}
      <motion.div {...f(0.08)} className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <HugeiconsIcon icon={Search01Icon} size={15} style={{ color: "var(--text-muted)" }} />
          <input placeholder="Search people…" className="flex-1 text-sm bg-transparent outline-none" style={{ color: "var(--text-primary)" }} />
        </div>
        <button className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
          <HugeiconsIcon icon={FilterAddIcon} size={15} />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </motion.div>

      {/* People grid — 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allPeople.map((p, i) => {
          const cc = p.compatibility === "high" ? "#22c55e" : p.compatibility === "medium" ? "#f59e0b" : "#ef4444";
          const cb = p.compatibility === "high" ? "#f0fdf4" : p.compatibility === "medium" ? "#fffbeb" : "#fff1f2";
          return (
            <motion.div key={p.id} {...f(0.1 + i * 0.04)}>
              <Link href={`/vault/${p.id}`}
                className="group flex sm:block items-center gap-4 rounded-2xl p-4 md:p-5 transition-all hover:shadow-md"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="flex items-start justify-between mb-0 sm:mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-lg md:text-xl font-bold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #7c2232, #b03040)" }}>
                    {p.initials}
                  </div>
                  <span className="hidden sm:inline text-[11px] font-bold px-2.5 py-1 rounded-full capitalize"
                    style={{ background: cb, color: cc }}>{p.compatibility}</span>
                </div>
                <div className="flex-1 sm:flex-none">
                  <div className="flex items-center justify-between sm:block">
                    <div>
                      <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>{p.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{p.relation}</p>
                    </div>
                    <span className="sm:hidden text-[11px] font-bold px-2 py-0.5 rounded-full capitalize"
                      style={{ background: cb, color: cc }}>{p.score}</span>
                  </div>
                  <div className="mt-3 hidden sm:block">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span style={{ color: "var(--text-muted)" }}>Compatibility</span>
                      <span className="font-bold" style={{ color: "var(--text-primary)" }}>{p.score}</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "var(--bg)" }}>
                      <div className="h-full rounded-full" style={{ background: cc, width: `${p.score}%` }} />
                    </div>
                  </div>
                  <div className="mt-3 hidden sm:flex items-center justify-between">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>View report</span>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="opacity-30 group-hover:opacity-70 transition-opacity" style={{ color: "var(--brand)" }} />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
