"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getDashboard, isLoggedIn } from "@/lib/api";

export default function PullRevealPage() {
  const router = useRouter();
  const [data, setData] = useState<{ archetype: string | null; pull_score: number | null; narrative: string | null } | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) { window.location.href = "/login"; return; }
    getDashboard().then(res => {
      const arch = res.archetype as Record<string, unknown> | null;
      const narr = res.living_narrative as Record<string, unknown> | null;
      setData({
        archetype: (arch?.name as string) ?? null,
        pull_score: res.pull_score ?? null,
        narrative: (narr?.narrative as string) ?? null,
      });
    }).catch(() => {});
  }, [router]);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#fafafa",
      padding: "48px 24px", fontFamily: "Aeonik, system-ui, sans-serif",
      textAlign: "center", position: "relative", overflow: "hidden",
    }}>
      {/* Subtle background orbs */}
      <div style={{ position: "absolute", top: "-10%", right: "-8%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-8%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(61,14,26,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ maxWidth: 520, width: "100%", position: "relative", zIndex: 1 }}>

        {/* Logo */}
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 80, height: 100, margin: "0 auto 32px", position: "relative" }}>
          <Image src="/logo.jpg" alt="ThePull" fill style={{ objectFit: "contain" }} priority />
        </motion.div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
          style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", color: "#c9a84c", textTransform: "uppercase", marginBottom: 16 }}>
          Your Pull Profile is Ready
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          style={{ fontSize: 38, fontWeight: 800, color: "#0f0a14", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
          {data?.archetype ?? "Your Archetype is Emerging"}
        </motion.h1>

        {/* Pull score chip */}
        {data?.pull_score != null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.55, duration: 0.5 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 28px", borderRadius: 99, background: "rgba(201,168,76,0.1)", border: "1.5px solid rgba(201,168,76,0.3)", marginBottom: 28 }}>
            <span style={{ fontSize: 30, fontWeight: 800, color: "#c9a84c" }}>{data.pull_score}</span>
            <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>Pull Score</span>
          </motion.div>
        )}

        {/* Narrative */}
        {data?.narrative && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.6 }}
            style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 40, maxWidth: 440, margin: "0 auto 40px" }}>
            {data.narrative.slice(0, 280)}{data.narrative.length > 280 ? "…" : ""}
          </motion.p>
        )}

        {!data && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ fontSize: 15, color: "#9ca3af", marginBottom: 40 }}>
            Your intelligence is being assembled. This only takes a moment.
          </motion.p>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}
          style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          <Link href="/dashboard" style={{
            padding: "15px 48px", borderRadius: 14, textDecoration: "none",
            background: "#0f0a14", color: "#fff",
            fontSize: 15, fontWeight: 700, letterSpacing: "0.01em",
            boxShadow: "0 4px 24px rgba(15,10,20,0.18)",
          }}>
            Enter Your Dashboard →
          </Link>
          <Link href="/pull-profile" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>
            View full intelligence report
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
