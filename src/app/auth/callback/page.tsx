"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CallbackInner() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    const next = params.get("next") || "/dashboard";
    const error = params.get("error");

    if (error) {
      router.replace(`/login?error=${error}`);
      return;
    }

    if (token) {
      localStorage.setItem("pull_token", token);
      router.replace(next);
    } else {
      router.replace("/login?error=google_token_missing");
    }
  }, [params, router]);

  return (
    <div style={{
      height: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#f9f9f9", fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        border: "3px solid rgba(61,14,26,0.12)",
        borderTop: "3px solid #3d0e1a",
        animation: "spin 0.8s linear infinite",
      }} />
      <p style={{ marginTop: 20, fontSize: 14, color: "#6b7280" }}>Signing you in…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <CallbackInner />
    </Suspense>
  );
}
