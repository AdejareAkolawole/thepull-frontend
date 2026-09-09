"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { register } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(email, password, name);
      await refresh();
      router.push("/onboarding");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      height: "100vh", overflow: "hidden", display: "flex", background: "#f9f9f9",
      fontFamily: "Aeonik, system-ui, sans-serif",
    }}>
      {/* Left panel — image */}
      <div style={{
        width: "45%", height: "100vh", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 32,
      }}>
        <div style={{
          width: "100%", height: "calc(100vh - 48px)", borderRadius: 32,
          overflow: "hidden", position: "relative",
          background: "linear-gradient(160deg, #0d1a12 0%, #1a0a10 50%, #0a0f1a 100%)",
        }}>
          <Image
            src="/logo.jpg"
            alt="ThePull"
            fill
            style={{ objectFit: "cover", opacity: 0.7 }}
            priority
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, transparent 40%, rgba(10,8,16,0.85) 100%)",
          }} />
          <div style={{ position: "absolute", bottom: 36, left: 32, right: 32 }}>
            <p style={{ color: "rgba(245,240,232,0.9)", fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}>
              Start knowing<br />yourself deeply.
            </p>
            <p style={{ color: "rgba(245,240,232,0.5)", fontSize: 13, marginTop: 8 }}>
              ThePull — Personal Intelligence Platform
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        flex: 1, height: "100vh", overflowY: "auto",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "48px 48px",
      }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <h1 style={{
            fontSize: 34, fontWeight: 800, color: "#0f0a14",
            letterSpacing: "-0.02em", marginBottom: 10, lineHeight: 1.1,
          }}>
            Create your account
          </h1>
          <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 40, lineHeight: 1.6 }}>
            Join ThePull and begin your personal intelligence journey today.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = "#3d0e1a")}
              onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = "#3d0e1a")}
              onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
            />
            <input
              type="password"
              placeholder="Password (min 8 characters)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = "#3d0e1a")}
              onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
            />

            {error && (
              <p style={{ color: "#c0404f", fontSize: 13, marginTop: 4 }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={btnPrimaryStyle}
              onMouseEnter={e => !loading && ((e.target as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={e => ((e.target as HTMLElement).style.opacity = "1")}
            >
              {loading ? "Creating account…" : "Create Account →"}
            </button>
          </form>

          <div style={{ marginTop: 14 }}>
            <button style={btnGoogleStyle} onClick={() => { window.location.href = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/auth/google`; }}>
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Sign up with Google
            </button>
          </div>

          <p style={{ color: "#9ca3af", fontSize: 14, marginTop: 28, textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#0f0a14", fontWeight: 700, textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  padding: "15px 18px", fontSize: 15,
  background: "#fff", border: "1.5px solid #e5e7eb",
  borderRadius: 12, color: "#0f0a14", outline: "none",
  fontFamily: "inherit", transition: "border-color 0.15s",
};

const btnPrimaryStyle: React.CSSProperties = {
  width: "100%", padding: "15px 0", marginTop: 4,
  borderRadius: 12, border: "none", cursor: "pointer",
  background: "#0f0a14", color: "#fff",
  fontSize: 16, fontWeight: 700, letterSpacing: "0.01em",
  fontFamily: "inherit", transition: "opacity 0.15s",
};

const btnGoogleStyle: React.CSSProperties = {
  width: "100%", padding: "13px 0",
  borderRadius: 12, border: "1.5px solid #e5e7eb",
  background: "#fff", cursor: "pointer",
  fontSize: 15, fontWeight: 600, color: "#374151",
  fontFamily: "inherit", display: "flex",
  alignItems: "center", justifyContent: "center", gap: 10,
};
