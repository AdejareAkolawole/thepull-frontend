"use client";
import { motion } from "framer-motion";

interface Props {
  message?: string;
  fullscreen?: boolean;
}

export default function LoadingScreen({ message = "Loading…", fullscreen = false }: Props) {
  const LOGO = 64;
  const GAP  = 18; // space between logo edge and ring
  const TOTAL = LOGO + GAP * 2 + 24; // extra for dot

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: fullscreen ? "100dvh" : "60vh",
      gap: 24,
      background: fullscreen ? "var(--bg, #faf8f5)" : "transparent",
    }}>
      <div style={{ position: "relative", width: TOTAL, height: TOTAL, display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* Track ring */}
        <svg width={TOTAL} height={TOTAL} viewBox={`0 0 ${TOTAL} ${TOTAL}`} style={{ position: "absolute", inset: 0 }}>
          <circle cx={TOTAL/2} cy={TOTAL/2} r={TOTAL/2 - 2} fill="none" stroke="rgba(192,64,79,0.1)" strokeWidth="1" />
        </svg>

        {/* Spinning arc — clockwise */}
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
          width={TOTAL} height={TOTAL} viewBox={`0 0 ${TOTAL} ${TOTAL}`}
          style={{ position: "absolute", inset: 0 }}
        >
          <defs>
            <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c0404f" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#c0404f" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx={TOTAL/2} cy={TOTAL/2} r={TOTAL/2 - 2}
            fill="none" stroke="url(#g1)" strokeWidth="2.5"
            strokeDasharray={`${(TOTAL/2) * 1.2} ${(TOTAL/2) * 6}`}
            strokeLinecap="round"
          />
        </motion.svg>

        {/* Orbiting dot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center" }}
        >
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#c0404f",
            boxShadow: "0 0 8px rgba(192,64,79,0.8)",
            marginTop: 1,
          }} />
        </motion.div>

        {/* Logo */}
        <motion.img
          src="/logo.jpg"
          alt="ThePull"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: LOGO,
            height: LOGO,
            borderRadius: 16,
            objectFit: "cover",
            display: "block",
            position: "relative",
            zIndex: 5,
            boxShadow: "0 2px 16px rgba(0,0,0,0.1), 0 0 0 1px rgba(192,64,79,0.12)",
          }}
        />
      </div>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: 11,
            color: "var(--text-muted, rgba(15,10,20,0.4))",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
