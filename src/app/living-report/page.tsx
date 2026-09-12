"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BookOpen01Icon, AiSparklesIcon, ShieldKeyIcon,
  Clock01Icon, LayersIcon, CheckmarkCircle01Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons";
import { isLoggedIn } from "@/lib/api";
import LoadingScreen from "@/components/LoadingScreen";

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function getLivingReport() {
  const token = typeof window !== "undefined" ? localStorage.getItem("pull_token") : null;
  const res = await fetch(`${BASE}/living-report`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

const CREAM = "#f5f0e8";
const DARK  = "#2d1a14";
const MID   = "#7c5c50";
const WINE  = "#7c2232";
const WINE2 = "#c0404f";
const GOLD  = "#b8922a";

const f = (d = 0) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: "easeOut" as const } });

function Pill({ children, color = WINE2 }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", border: `1px solid ${color}40`, color, background: `${color}12` }}>
      {children}
    </span>
  );
}

function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: CREAM, borderRadius: 20, padding: "22px 20px", border: "1px solid rgba(45,26,20,0.08)", boxShadow: "0 2px 16px rgba(45,26,20,0.06)", ...style }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 6 }}>{children}</p>;
}

type ReportData = {
  user: { name: string };
  pull_score: number | null;
  gravity_label: string;
  gravity_description: string;
  has_assessment: boolean;
  current_version: VersionData | null;
  versions: VersionData[];
  archetype: ArchetypeData | null;
  dimension_scores: Record<string, number> | null;
};

type VersionData = {
  id: string;
  version_number: number;
  label: string;
  is_current: boolean;
  narrative: string | null;
  identity_state: string;
  archetype_key: string | null;
  confidence_score: number;
  confidence_level: string;
  data_coverage: number;
  intelligence_layers: number;
  read_time: string;
  generated_at: string;
  reason: string;
};

type ArchetypeData = {
  name: string;
  tagline: string;
  what_it_is: string;
  defining_characteristics: string[];
  growth_edges: string[];
  growth_recommendations: string[];
  primary_signals: string[];
};

const DIM_LABELS: Record<string, string> = {
  emotional_intelligence: "Emotional Intelligence",
  communication: "Communication",
  self_awareness: "Self-Awareness",
  relationship_patterns: "Relationship Patterns",
  behavioural_consistency: "Behavioural Consistency",
};

export default function LivingReportPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeVersion, setActiveVersion] = useState<VersionData | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) { window.location.href = "/login"; return; }
    getLivingReport()
      .then(d => {
        setData(d);
        setActiveVersion(d.current_version);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingScreen message="Loading your living report…" />;

  if (!data?.has_assessment) {
    return (
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "48px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>📖</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: DARK, marginBottom: 10 }}>Your Living Report is forming</h2>
        <p style={{ fontSize: 14, color: MID, lineHeight: 1.7 }}>Complete your assessment and add a few journal entries — your Living Story will be written from your intelligence as it grows.</p>
        <a href="/onboarding" style={{ display: "inline-block", marginTop: 20, padding: "12px 24px", borderRadius: 12, background: `linear-gradient(135deg, ${WINE}, ${WINE2})`, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
          Start Assessment
        </a>
      </div>
    );
  }

  const v = activeVersion;

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 0 60px", fontFamily: "Aeonik, system-ui, sans-serif" }}>

      {/* Back */}
      <motion.div {...f(0)} style={{ marginBottom: 20 }}>
        <a href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: MID, textDecoration: "none" }}>
          <HugeiconsIcon icon={ArrowLeft01Icon} size={13} /> Dashboard
        </a>
      </motion.div>

      {/* Hero */}
      <motion.div {...f(0.04)} style={{
        background: `linear-gradient(160deg, ${WINE} 0%, #4a0f1a 70%, #1a0810 100%)`,
        borderRadius: 24, padding: "32px 28px", marginBottom: 14,
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 12px 48px rgba(0,0,0,0.2)",
      }}>
        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,168,76,0.8)", marginBottom: 10 }}>
          Your Living Story
        </p>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 6 }}>
          {data.current_version?.archetype_key
            ? `Your signature is ${data.current_version.archetype_key.replace(/_/g, " ")}.`
            : data.archetype?.name
              ? `Your signature is ${data.archetype.name}.`
              : "Your Living Story"}
        </h1>
        <p style={{ fontSize: 13, color: "rgba(245,240,232,0.55)", lineHeight: 1.6, marginBottom: 16 }}>
          One continuous living biography — written from your intelligence, evolving as you grow.
        </p>
        <p style={{ fontSize: 12, color: "rgba(245,240,232,0.35)", lineHeight: 1.6, fontStyle: "italic" }}>
          Reframing regenerates the narrative from your existing intelligence — your Pull Score, archetype, and underlying evidence remain unchanged.
        </p>
      </motion.div>

      {/* Version metadata */}
      <motion.div {...f(0.08)}>
        <Card style={{ marginBottom: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px" }}>
            <div>
              <Label>Version</Label>
              <p style={{ fontSize: 22, fontWeight: 800, color: DARK }}>{v.label}</p>
            </div>
            <div>
              <Label>Confidence</Label>
              <Pill color={v.confidence_score >= 70 ? "#16a34a" : v.confidence_score >= 40 ? GOLD : WINE2}>
                {v.confidence_score}%
              </Pill>
            </div>
            <div>
              <Label>Coverage</Label>
              <p style={{ fontSize: 22, fontWeight: 800, color: DARK }}>{v.data_coverage}%</p>
            </div>
            <div>
              <Label>Intelligence Layers</Label>
              <p style={{ fontSize: 22, fontWeight: 800, color: DARK }}>{v.intelligence_layers}</p>
            </div>
            <div>
              <Label>Read Time</Label>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <HugeiconsIcon icon={Clock01Icon} size={13} style={{ color: MID }} />
                <p style={{ fontSize: 15, fontWeight: 700, color: DARK }}>{v.read_time}</p>
              </div>
            </div>
            <div>
              <Label>Generated</Label>
              <p style={{ fontSize: 15, fontWeight: 700, color: DARK }}>{v.generated_at}</p>
            </div>
            {v.reason && (
              <div style={{ gridColumn: "1 / -1" }}>
                <Label>Reason</Label>
                <p style={{ fontSize: 13, color: MID }}>{v.reason}</p>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Version tabs */}
      {data.versions.length > 1 && (
        <motion.div {...f(0.1)} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" as const }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: MID, marginRight: 4 }}>Chapters</p>
          {data.versions.map((ver, i) => (
            <button
              key={ver.id}
              onClick={() => setActiveVersion(ver)}
              style={{
                padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 700, cursor: "pointer",
                background: activeVersion?.id === ver.id ? DARK : "transparent",
                color: activeVersion?.id === ver.id ? "#fff" : MID,
                border: `1px solid ${activeVersion?.id === ver.id ? DARK : "rgba(45,26,20,0.15)"}`,
                transition: "all 0.15s",
              }}
            >
              {i === 0 ? "Current" : ver.label}
            </button>
          ))}
        </motion.div>
      )}

      {/* Narrative */}
      {(v?.narrative || data.archetype?.what_it_is) && (
        <motion.div {...f(0.12)}>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <HugeiconsIcon icon={BookOpen01Icon} size={14} style={{ color: GOLD }} />
              <Label>Your Living Narrative</Label>
            </div>
            <p style={{ fontSize: 15, color: DARK, lineHeight: 1.85, whiteSpace: "pre-wrap" }}>
              {v?.narrative || data.archetype?.what_it_is}
            </p>
          </Card>
        </motion.div>
      )}

      {/* Pull Score */}
      {data.pull_score !== null && (
        <motion.div {...f(0.14)}>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <HugeiconsIcon icon={ShieldKeyIcon} size={14} style={{ color: WINE2 }} />
              <Label>Your Pull Score</Label>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 52, fontWeight: 900, color: DARK, letterSpacing: "-0.04em", lineHeight: 1 }}>{data.pull_score}</span>
              <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: WINE2 }}>{data.gravity_label}</span>
            </div>
            <p style={{ fontSize: 13, color: MID, lineHeight: 1.7, marginBottom: 8 }}>
              Your Pull Score is a single measure of the strength and clarity of your relational identity — how distinctly your personality, attachment, and relational patterns draw others toward you. It is not a judgement of worth; it reflects how legible and coherent your relational signal currently is.
            </p>
            {data.gravity_description && (
              <p style={{ fontSize: 13, color: DARK, lineHeight: 1.7, fontStyle: "italic" }}>{data.gravity_description}</p>
            )}
          </Card>
        </motion.div>
      )}

      {/* Gravity */}
      {data.gravity_label && (
        <motion.div {...f(0.16)}>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={14} style={{ color: GOLD }} />
              <Label>Your Gravity</Label>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: DARK, marginBottom: 8 }}>{data.gravity_label}</h3>
            <p style={{ fontSize: 13, color: MID, lineHeight: 1.7, marginBottom: 8 }}>{data.gravity_description}</p>
            <p style={{ fontSize: 12, color: MID, lineHeight: 1.6, opacity: 0.7, fontStyle: "italic" }}>
              Your classification is derived directly from your Pull Score. It describes the magnetic quality of your relational identity — not a fixed trait, but a living reading that evolves as your intelligence deepens.
            </p>
          </Card>
        </motion.div>
      )}

      {/* Archetype */}
      {data.archetype && (
        <motion.div {...f(0.18)}>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <HugeiconsIcon icon={AiSparklesIcon} size={14} style={{ color: GOLD }} />
              <Label>Your Archetype</Label>
            </div>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: DARK, marginBottom: 4 }}>{data.archetype.name}</h3>
            {data.archetype.tagline && (
              <p style={{ fontSize: 14, color: MID, fontStyle: "italic", marginBottom: 16 }}>{data.archetype.tagline}</p>
            )}
            {data.archetype.what_it_is && (
              <>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>What this archetype is</p>
                <p style={{ fontSize: 14, color: DARK, lineHeight: 1.8, marginBottom: 16 }}>{data.archetype.what_it_is}</p>
              </>
            )}
            {data.archetype.defining_characteristics?.length > 0 && (
              <>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>Defining Characteristics</p>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: 16 }}>
                  {data.archetype.defining_characteristics.map((c, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                      <span style={{ color: WINE2, fontSize: 16, lineHeight: "1.4" }}>•</span>
                      <span style={{ fontSize: 13, color: DARK, lineHeight: 1.6 }}>{c}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {data.archetype.growth_edges?.length > 0 && (
              <>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>Growth Edges</p>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: 16 }}>
                  {data.archetype.growth_edges.map((g, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                      <span style={{ color: GOLD, fontSize: 16, lineHeight: "1.4" }}>•</span>
                      <span style={{ fontSize: 13, color: DARK, lineHeight: 1.6 }}>{g}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {data.archetype.growth_recommendations?.length > 0 && (
              <div style={{ borderTop: "1px solid rgba(45,26,20,0.08)", paddingTop: 14, marginTop: 4 }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>Growth Recommendations</p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {data.archetype.growth_recommendations.map((r, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                      <HugeiconsIcon icon={CheckmarkCircle01Icon} size={12} style={{ color: GOLD, flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: DARK, lineHeight: 1.6 }}>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </motion.div>
      )}

      {/* Dimension scores */}
      {data.dimension_scores && Object.keys(data.dimension_scores).length > 0 && (
        <motion.div {...f(0.2)}>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <HugeiconsIcon icon={LayersIcon} size={14} style={{ color: WINE2 }} />
              <Label>Intelligence Dimensions</Label>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {Object.entries(data.dimension_scores).map(([key, val]) => (
                <div key={key}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: DARK }}>{DIM_LABELS[key] || key}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: WINE2 }}>{val}%</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 99, background: "rgba(45,26,20,0.08)", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${val}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${WINE}, ${WINE2})` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

    </div>
  );
}
