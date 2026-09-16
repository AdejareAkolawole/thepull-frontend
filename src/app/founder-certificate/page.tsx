"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getFoundingMember, isLoggedIn } from "@/lib/api";

type FounderData = Awaited<ReturnType<typeof getFoundingMember>>;

export default function FounderCertificatePage() {
  const router = useRouter();
  const [data, setData] = useState<FounderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }
    getFoundingMember()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return <div style={{ minHeight: "60vh", display: "grid", placeItems: "center", color: "var(--text-muted)" }}>Loading certificate…</div>;
  }

  if (!data?.is_founding_member || !data.certificate) {
    return (
      <div style={{ maxWidth: 620, margin: "48px auto", padding: 28, textAlign: "center", background: "#fff", borderRadius: 20, border: "1px solid rgba(0,0,0,0.08)" }}>
        <h1 style={{ fontSize: 24, color: "var(--text-primary)", marginBottom: 10 }}>No Founder Certificate Yet</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 20 }}>Complete a Founding 500 purchase to receive your permanent Founder identity.</p>
        <Link href="/upgrade" style={{ color: "var(--brand)", fontWeight: 700, textDecoration: "none" }}>View Founding 500 →</Link>
      </div>
    );
  }

  const issuedDate = data.certificate.issued_at
    ? new Date(data.certificate.issued_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
    : "September 2026";

  return (
    <div className="founder-certificate-page" style={{ minHeight: "70vh", padding: "36px 20px 80px" }}>
      <div className="founder-certificate" style={{ maxWidth: 760, margin: "0 auto", padding: "56px 48px", textAlign: "center", position: "relative", overflow: "hidden", color: "#fff", background: "linear-gradient(145deg, #120608 0%, #3d0e1a 52%, #1a0a10 100%)", border: "1px solid rgba(201,168,76,0.35)", borderRadius: 26, boxShadow: "0 24px 70px rgba(61,14,26,0.25)" }}>
        <div style={{ position: "absolute", inset: 14, border: "1px solid rgba(201,168,76,0.18)", borderRadius: 18, pointerEvents: "none" }} />
        <p style={{ fontSize: 10, letterSpacing: "0.34em", fontWeight: 800, color: "#e2c36a", textTransform: "uppercase" }}>The Pull · Founding 500</p>
        <div style={{ width: 62, height: 62, margin: "28px auto 20px", display: "grid", placeItems: "center", borderRadius: "50%", color: "#1a0a10", background: "linear-gradient(135deg, #b8922a, #e2c36a)" }}>
          <span style={{ fontSize: 26, fontWeight: 900 }}>★</span>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Founding Member Certificate</p>
        <p style={{ marginTop: 34, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>This certifies that</p>
        <h1 style={{ margin: "12px 0 8px", fontFamily: "Georgia, serif", fontSize: "clamp(32px, 7vw, 54px)", fontWeight: 400, color: "#fff" }}>{data.certificate.recipient}</h1>
        <p style={{ fontSize: 17, fontWeight: 800, color: "#e2c36a" }}>{data.certificate.identity_label}</p>
        <p style={{ maxWidth: 480, margin: "28px auto 0", fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.62)" }}>is permanently recognized as one of the first 500 members who helped shape The Pull.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", marginTop: 38, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div><p style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Issued</p><p style={{ marginTop: 5, fontSize: 12, color: "rgba(255,255,255,0.72)" }}>{issuedDate}</p></div>
          <div><p style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Benefit</p><p style={{ marginTop: 5, fontSize: 12, color: "rgba(255,255,255,0.72)" }}>Early access included</p></div>
        </div>
      </div>
      <div className="certificate-actions" style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 20 }}>
        <button type="button" onClick={() => window.print()} style={{ padding: "11px 20px", border: "none", borderRadius: 12, color: "#fff", background: "var(--brand)", fontWeight: 800, cursor: "pointer" }}>Print / Save as PDF</button>
        <Link href="/settings/profile" style={{ display: "inline-flex", alignItems: "center", padding: "11px 20px", borderRadius: 12, color: "var(--text-secondary)", border: "1px solid var(--border)", textDecoration: "none", fontWeight: 700 }}>Back to Profile</Link>
      </div>
      <style>{`@media print { .app-sidebar, .app-topnav, .certificate-actions { display: none !important; } .founder-certificate-page { padding: 0 !important; } .founder-certificate { max-width: none !important; min-height: 90vh; border-radius: 0 !important; box-shadow: none !important; } }`}</style>
    </div>
  );
}
