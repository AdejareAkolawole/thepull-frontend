"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { answerAdaptiveProbe, getAdaptiveProbes, isLoggedIn, type AdaptiveProbe } from "@/lib/api";

const WINE = "#7c2232";
const GOLD = "#c9a84c";

export default function AssessmentFollowUpPage() {
  const router = useRouter();
  const [probes, setProbes] = useState<AdaptiveProbe[]>([]);
  const [bankSize, setBankSize] = useState(210);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) { router.push("/login"); return; }
    getAdaptiveProbes()
      .then(data => { setProbes(data.probes); setBankSize(data.master_question_count); })
      .catch(() => setError("We could not load your follow-up questions right now."))
      .finally(() => setLoading(false));
  }, [router]);

  const visible = useMemo(() => probes.slice(0, 5), [probes]);

  async function answer(probe: AdaptiveProbe, value: string) {
    setSubmitting(true);
    setError("");
    try {
      await answerAdaptiveProbe(probe.id, { answer: value, value });
      setProbes(current => current.filter(item => item.id !== probe.id));
    } catch {
      setError("That answer could not be saved. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 760, display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>Master calibration</p>
        <h1 className="font-display" style={{ fontSize: 34, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: 8 }}>A few more signals</h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: 620 }}>
          Your first assessment was a focused starting point. These questions come from the {bankSize}-question MIQB and appear only where your profile still needs more confidence.
        </p>
      </div>

      <Link href="/notifications" style={{ color: WINE, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>← Back to notifications</Link>

      {error && <p style={{ color: "#b42318", fontSize: 13 }}>{error}</p>}
      {loading ? <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Loading your questions…</p> : null}

      {!loading && visible.length === 0 && (
        <div style={{ padding: "36px 24px", borderRadius: 18, border: "1px solid var(--border)", background: "var(--surface)", textAlign: "center" }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>You are fully caught up</p>
          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>We will surface another question when your profile needs a clearer signal.</p>
        </div>
      )}

      {visible.map(probe => (
        <ProbeCard key={probe.id} probe={probe} disabled={submitting} onAnswer={value => answer(probe, value)} />
      ))}
    </div>
  );
}

function ProbeCard({ probe, disabled, onAnswer }: { probe: AdaptiveProbe; disabled: boolean; onAnswer: (value: string) => void }) {
  const scaleMin = probe.scale?.min ?? 1;
  const scaleMax = probe.scale?.max ?? 5;
  const options = probe.response_type === "likert"
    ? Array.from({ length: scaleMax - scaleMin + 1 }, (_, index) => String(scaleMin + index))
    : probe.options;

  return (
    <section style={{ padding: 22, borderRadius: 18, background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "0 6px 24px rgba(15,10,20,0.04)" }}>
      <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>{probe.title}</p>
      <h2 style={{ fontSize: 19, lineHeight: 1.45, color: "var(--text-primary)", margin: "0 0 8px" }}>{probe.text}</h2>
      <p style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--text-muted)", margin: "0 0 16px" }}>{probe.reason}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((option, index) => {
          const label = probe.response_type === "likert" ? `${option}${probe.scale?.labels?.[option] ? ` — ${probe.scale.labels[option]}` : ""}` : option;
          return (
            <button key={`${option}-${index}`} disabled={disabled} onClick={() => onAnswer(option)} style={{
              width: "100%", textAlign: "left", padding: "12px 14px", borderRadius: 12,
              border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text-secondary)",
              fontSize: 13, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.55 : 1,
            }}>
              {label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
