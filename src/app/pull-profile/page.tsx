"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp01Icon, ArrowDown01Icon, Share01Icon, FavouriteIcon,
  AiSparklesIcon, AiBrain01Icon, Analytics01Icon,
  EyeIcon, FireIcon, Target01Icon,
  ArrowRight01Icon, HeartIcon, Message02Icon,
  ShieldIcon, Activity01Icon,
} from "@hugeicons/core-free-icons";
import { getPullProfile, isLoggedIn } from "@/lib/api";

const CREAM = "#f5f0e8";
const DARK  = "#2d1a14";
const MID   = "#7c5c50";
const WINE  = "#3d0e1a";

const f = (d = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d, ease: "easeOut" as const },
});

type PullProfileData = {
  pull_index: {
    overall_index: number;
    score_breakdown: Record<string, number>;
    score_dimensions: Record<string, number>;
    confidence_score: number;
    version: number;
  } | null;
  archetype: {
    key: string | null;
    name: string | null;
    title: string | null;
    description: string | null;
    personality_summary: string | null;
    strengths: string[];
    blind_spots: string[];
    growth_recommendations: string[];
    primary_signals: Array<{ label: string; pct: number }>;
    composition: Record<string, unknown>;
    confidence_score: number;
  } | null;
  living_narrative: {
    narrative: string | null;
    identity_state: string | null;
    confidence_score: number;
    confidence_level: string;
    data_coverage: number;
  } | null;
  domains_covered: number;
  domains_total: number;
};

export default function PullProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<PullProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) { window.location.href = "/login"; return; }
    getPullProfile().then(res => {
      setData(res as PullProfileData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [router]);

  const pullScore     = data?.pull_index?.overall_index ?? null;
  const confidence    = data?.archetype?.confidence_score != null ? Math.round(data.archetype.confidence_score * 100) : 0;
  const archetype     = data?.archetype?.name ?? "Emerging Identity";
  const archetypeStage = data?.pull_index ? "Emerging Identity" : "—";
  const narrative     = data?.living_narrative?.narrative ?? null;
  const strengths     = data?.archetype?.strengths ?? [];
  const blindSpots    = data?.archetype?.blind_spots ?? [];
  const growthRecs    = data?.archetype?.growth_recommendations ?? [];
  const dimensions    = data?.pull_index?.score_dimensions ?? {};
  const identityVector = data?.archetype?.primary_signals ?? [];

  // Build forces from real dimension scores
  const dimensionEntries = Object.entries(dimensions);
  const forces = dimensionEntries.length > 0
    ? dimensionEntries.map(([key, val]) => ({
        label: key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        sub: "Intelligence dimension",
        value: typeof val === "number" ? (val > 1 ? Math.round(val).toString() : Math.round(val * 100).toString()) : "—",
      }))
    : [
        { label: "Emotional Intelligence", sub: "How deeply you feel and process", value: "—" },
        { label: "Communication", sub: "How you express and listen", value: "—" },
        { label: "Self-Awareness", sub: "How clearly you see yourself", value: "—" },
        { label: "Relationship Patterns", sub: "How you bond and connect", value: "—" },
        { label: "Behavioural Consistency", sub: "How predictably you act", value: "—" },
      ];

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <p style={{ color: MID, fontSize: 14 }}>Loading your intelligence profile…</p>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* ── SCORE CARD ── */}
      <div style={{ background: "linear-gradient(180deg,#faf7f2 0%,#fff 100%)", padding: "48px 24px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.div {...f(0)} style={{ width: "100%", maxWidth: 900 }}>
          <div style={{ background: CREAM, borderRadius: 28, overflow: "hidden", boxShadow: "0 12px 60px rgba(45,26,20,0.10)" }}>
            {/* Score header */}
            <div className="profile-score-pad" style={{ textAlign: "center", padding: "48px 44px 0" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: MID, marginBottom: 24, fontWeight: 700 }}>Your Pull Score</p>
              <p style={{ fontSize: 120, fontWeight: 800, color: DARK, lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: 12 }}>
                {pullScore ?? "—"}
              </p>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: WINE, marginBottom: 18 }}>
                {archetypeStage}
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, border: `1px solid rgba(61,14,26,0.22)`, background: "rgba(61,14,26,0.04)", marginBottom: 22 }}>
                <HugeiconsIcon icon={FavouriteIcon} size={11} style={{ color: WINE }} />
                <span style={{ fontSize: 11, color: WINE }}>Confidence <strong>{confidence}%</strong></span>
              </div>
              <p style={{ fontSize: 15, fontStyle: "italic", color: MID, lineHeight: 1.65, marginBottom: 28 }}>
                {data?.archetype?.description ?? "The first strokes of a clearer picture are forming."}
              </p>

              {/* Archetype name */}
              <p style={{ fontSize: 28, fontWeight: 800, color: DARK, letterSpacing: "-0.02em", marginBottom: 40 }}>
                {archetype}
              </p>
            </div>

            {/* Dimension Forces */}
            <div className="profile-forces-pad" style={{ padding: "0 44px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <span style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: MID, fontWeight: 700 }}>Intelligence Dimensions</span>
                <div style={{ flex: 1, height: 1, background: "rgba(45,26,20,0.1)" }} />
              </div>
              {forces.map((force, i) => {
                const isOpen = expanded === force.label;
                return (
                  <div key={force.label}>
                    <div onClick={() => setExpanded(isOpen ? null : force.label)}
                      style={{ paddingTop: 18, paddingBottom: isOpen ? 0 : 18, cursor: "pointer", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                      <div>
                        <p style={{ fontSize: 26, fontWeight: 500, color: DARK, lineHeight: 1, marginBottom: 4, fontFamily: "Georgia, serif" }}>{force.label}</p>
                        <p style={{ fontSize: 11, color: MID }}>{force.sub}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        <span style={{ fontSize: 26, fontWeight: 600, color: DARK }}>{force.value}</span>
                        <HugeiconsIcon icon={isOpen ? ArrowUp01Icon : ArrowDown01Icon} size={14} style={{ color: MID }} />
                      </div>
                    </div>
                    {i < forces.length - 1 && <div style={{ height: 1, background: "rgba(45,26,20,0.09)" }} />}
                  </div>
                );
              })}
            </div>

            {/* Narrative */}
            {narrative && (
              <div className="profile-reading-pad" style={{ margin: "32px 44px 0", padding: "24px 0", borderTop: "1px solid rgba(45,26,20,0.09)" }}>
                <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: MID, marginBottom: 14, fontWeight: 700 }}>Your Story</p>
                <p style={{ fontSize: 16, color: DARK, lineHeight: 1.8 }}>{narrative}</p>
              </div>
            )}
            <div style={{ height: 44 }} />
          </div>

          {/* Share */}
          <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
            <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 26px", borderRadius: 99, background: CREAM, border: "1px solid rgba(45,26,20,0.14)", color: DARK, fontSize: 13, fontWeight: 500, cursor: "pointer", boxShadow: "0 2px 12px rgba(45,26,20,0.07)" }}>
              <HugeiconsIcon icon={Share01Icon} size={14} style={{ color: MID }} />
              Share Your Pull Score
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── STRENGTHS & BLIND SPOTS ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>

        {(strengths.length > 0 || blindSpots.length > 0) && (
          <motion.div {...f(0.1)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {strengths.length > 0 && (
              <div style={{ background: CREAM, borderRadius: 24, padding: "24px 28px", boxShadow: "0 4px 24px rgba(45,26,20,0.08)" }}>
                <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: MID, fontWeight: 700, marginBottom: 16 }}>Your Strengths</p>
                {strengths.map(s => (
                  <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a84c", marginTop: 6, flexShrink: 0 }} />
                    <p style={{ fontSize: 13, color: DARK, lineHeight: 1.6 }}>{s}</p>
                  </div>
                ))}
              </div>
            )}
            {blindSpots.length > 0 && (
              <div style={{ background: CREAM, borderRadius: 24, padding: "24px 28px", boxShadow: "0 4px 24px rgba(45,26,20,0.08)" }}>
                <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: MID, fontWeight: 700, marginBottom: 16 }}>Blind Spots</p>
                {blindSpots.map(s => (
                  <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c0404f", marginTop: 6, flexShrink: 0 }} />
                    <p style={{ fontSize: 13, color: DARK, lineHeight: 1.6 }}>{s}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Identity Vector */}
        {identityVector.length > 0 && (
          <motion.div {...f(0.12)} style={{ background: CREAM, borderRadius: 24, padding: "24px 28px", marginBottom: 16, boxShadow: "0 4px 24px rgba(45,26,20,0.08)" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: MID, fontWeight: 700, marginBottom: 18 }}>Identity Vector</p>
            {identityVector.map((v, i) => {
              const colors = ["#c0404f", "#60a5fa", "#f59e0b", "#a78bfa", "#34d399", "#f97316"];
              const color = colors[i % colors.length];
              return (
                <div key={v.label} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: DARK }}>{v.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color }}>{v.pct}%</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 99, background: "rgba(45,26,20,0.1)" }}>
                    <div style={{ height: "100%", width: `${v.pct}%`, borderRadius: 99, background: color }} />
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Growth Recommendations */}
        {growthRecs.length > 0 && (
          <motion.div {...f(0.14)} style={{ background: CREAM, borderRadius: 24, padding: "24px 28px", marginBottom: 16, boxShadow: "0 4px 24px rgba(45,26,20,0.08)" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: MID, fontWeight: 700, marginBottom: 16 }}>Growth Recommendations</p>
            {growthRecs.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 24, height: 24, borderRadius: 8, background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 700, color: "#c9a84c" }}>{i + 1}</div>
                <p style={{ fontSize: 13, color: DARK, lineHeight: 1.7 }}>{r}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Personality Summary */}
        {data?.archetype?.personality_summary && (
          <motion.div {...f(0.16)} style={{ background: CREAM, borderRadius: 24, padding: "24px 28px", marginBottom: 32, boxShadow: "0 4px 24px rgba(45,26,20,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={13} style={{ color: MID }} />
              <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: MID, fontWeight: 700 }}>Your Identity Story</span>
            </div>
            <p style={{ fontSize: 15, color: DARK, lineHeight: 1.8 }}>{data.archetype.personality_summary}</p>
          </motion.div>
        )}

        {/* Empty state */}
        {!data?.pull_index && (
          <motion.div {...f(0.1)} style={{ background: CREAM, borderRadius: 24, padding: "48px 28px", textAlign: "center", marginBottom: 32 }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: DARK, marginBottom: 12 }}>Complete your assessment</p>
            <p style={{ fontSize: 14, color: MID, lineHeight: 1.7 }}>Your Pull Profile will appear here once you've finished your onboarding assessment.</p>
          </motion.div>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .profile-score-pad { padding: 32px 20px 0 !important; }
          .profile-forces-pad { padding: 0 20px !important; }
          .profile-reading-pad { margin: 24px 20px 0 !important; }
          [style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
