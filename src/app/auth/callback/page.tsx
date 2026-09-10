"use client";
import { useEffect } from "react";

export default function AuthCallbackPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const next = params.get("next") || "/dashboard";
    const error = params.get("error");

    if (error) {
      window.location.replace(`/login?error=${error}`);
      return;
    }

    if (token) {
      localStorage.setItem("pull_token", token);
      window.location.replace(next);
    } else {
      window.location.replace("/login?error=google_token_missing");
    }
  }, []);

  return (
    <div style={{
      height: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#0f0a14",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        border: "3px solid rgba(192,64,79,0.2)",
        borderTop: "3px solid #c0404f",
        animation: "spin 0.8s linear infinite",
      }} />
      <p style={{ marginTop: 20, fontSize: 14, color: "rgba(255,255,255,0.45)", fontFamily: "system-ui, sans-serif" }}>
        Signing you in…
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
