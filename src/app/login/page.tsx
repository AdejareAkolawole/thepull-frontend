"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { login, getProfile } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

const C = { wine: "#3d0e1a", ink: "#0f0a14", muted: "#6b7280", border: "#e5e7eb" };

const GOOGLE_ERROR_MESSAGES: Record<string, string> = {
  google_cancelled: "Google sign-in was cancelled.",
  google_token_failed: "Could not complete Google sign-in. Please try again.",
  google_no_email: "Google account has no email address.",
  account_suspended: "This account has been suspended.",
  google_not_configured: "Google sign-in is not available yet.",
};

function LoginPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const e = params.get("error");
    if (e) setError(GOOGLE_ERROR_MESSAGES[e] || "An error occurred. Please try again.");
  }, [params]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      await refresh();
      const profile = await getProfile().catch(() => null) as Record<string, unknown> | null;
      window.location.href = !profile?.onboarding_complete ? "/onboarding" : "/dashboard";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'Aeonik';
          src: url('/Aeonik-Regular.ttf') format('truetype');
          font-weight: 100 900; font-style: normal; font-display: swap;
        }
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        a { text-decoration: none; }
        .auth-wrap {
          min-height: 100vh; display: flex;
          font-family: 'Aeonik', system-ui, sans-serif;
          background: #f8f7f9;
        }
        .auth-panel-img {
          width: 45%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .auth-panel-form {
          flex: 1; display: flex; align-items: center; justify-content: center;
          padding: 48px 40px;
          min-height: 100vh;
        }
        .auth-logo-mobile { display: none; margin-bottom: 32px; }
        @media (max-width: 720px) {
          .auth-wrap { flex-direction: column; background: #fff; }
          .auth-panel-img { display: none; }
          .auth-panel-form { padding: 40px 24px 60px; align-items: flex-start; min-height: unset; }
          .auth-logo-mobile { display: block; }
          .auth-form-inner { max-width: 100% !important; }
        }
      `}</style>
      <div className="auth-wrap">
        {/* Left panel */}
        <div className="auth-panel-img">
          <div style={{
            width: "100%", height: "calc(100vh - 48px)", borderRadius: 28,
            overflow: "hidden", position: "relative",
            background: "linear-gradient(160deg, #1a0a10 0%, #0c0308 100%)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt="MyPullScore" style={{ position: "absolute", inset: 0,
              width: "100%", height: "100%", objectFit: "cover", opacity: 0.65 }} />
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(180deg, transparent 35%, rgba(10,3,8,0.88) 100%)" }} />
            <div style={{ position: "absolute", bottom: 36, left: 32, right: 32 }}>
              <p style={{ color: "rgba(255,248,242,0.9)", fontSize: 22, fontWeight: 700, lineHeight: 1.3, marginBottom: 8 }}>
                Your intelligence<br />grows with you.
              </p>
              <p style={{ color: "rgba(255,248,242,0.42)", fontSize: 13 }}>
                MyPullScore — Personal Intelligence Platform
              </p>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="auth-panel-form">
          <div className="auth-form-inner" style={{ width: "100%", maxWidth: 420 }}>
            {/* Mobile logo */}
            <div className="auth-logo-mobile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.jpg" alt="MyPullScore" style={{ height: 40, width: "auto", borderRadius: 8 }} />
            </div>

            <h1 style={{ fontSize: "clamp(26px,6vw,34px)", fontWeight: 800, color: C.ink,
              letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.1 }}>
              Sign in
            </h1>
            <p style={{ color: C.muted, fontSize: 15, marginBottom: 36, lineHeight: 1.6 }}>
              Your personal intelligence is waiting.
            </p>

            {/* Google first */}
            <button style={btnGoogleStyle} onClick={() => {
              window.location.href = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/auth/google`;
            }}>
              <GoogleIcon />
              Continue with Google
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
              <div style={{ flex: 1, height: 1, background: C.border }} />
              <span style={{ fontSize: 12, color: "#aaa", fontFamily: "inherit" }}>or sign in with email</span>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="email" placeholder="Email address" value={email}
                onChange={e => setEmail(e.target.value)} required style={inputStyle}
                onFocus={e => (e.target.style.borderColor = C.wine)}
                onBlur={e => (e.target.style.borderColor = C.border)} />
              <input type="password" placeholder="Password" value={password}
                onChange={e => setPassword(e.target.value)} required style={inputStyle}
                onFocus={e => (e.target.style.borderColor = C.wine)}
                onBlur={e => (e.target.style.borderColor = C.border)} />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 2 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#374151" }}>
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                    style={{ width: 15, height: 15, accentColor: C.wine, cursor: "pointer" }} />
                  Remember me
                </label>
                <Link href="/forgot-password" style={{ fontSize: 13, color: C.muted }}>Forgot password?</Link>
              </div>

              {error && <p style={{ color: "#c0404f", fontSize: 13 }}>{error}</p>}

              <button type="submit" disabled={loading} style={btnPrimaryStyle}>
                {loading ? "Signing in…" : "Sign in →"}
              </button>
            </form>

            <p style={{ color: C.muted, fontSize: 14, marginTop: 28, textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link href="/register" style={{ color: C.ink, fontWeight: 700 }}>Sign up free</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return <Suspense><LoginPageInner /></Suspense>;
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  padding: "14px 16px", fontSize: 15,
  background: "#fff", border: `1.5px solid ${C.border}`,
  borderRadius: 12, color: C.ink, outline: "none",
  fontFamily: "inherit", transition: "border-color 0.15s",
};

const btnPrimaryStyle: React.CSSProperties = {
  width: "100%", padding: "15px 0", marginTop: 4,
  borderRadius: 12, border: "none", cursor: "pointer",
  background: C.ink, color: "#fff",
  fontSize: 15, fontWeight: 700, letterSpacing: "0.01em",
  fontFamily: "inherit", transition: "opacity 0.15s",
};

const btnGoogleStyle: React.CSSProperties = {
  width: "100%", padding: "14px 0",
  borderRadius: 12, border: `1.5px solid ${C.border}`,
  background: "#fff", cursor: "pointer",
  fontSize: 15, fontWeight: 600, color: "#374151",
  fontFamily: "inherit", display: "flex",
  alignItems: "center", justifyContent: "center", gap: 10,
};
