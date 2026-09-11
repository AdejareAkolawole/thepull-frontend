"use client";
import { motion } from "framer-motion";

interface Props {
  message?: string;
  fullscreen?: boolean;
}

export default function LoadingScreen({ message = "Loading…", fullscreen = false }: Props) {
  const CENTER = 96;
  const R_OUTER = 60;
  const R_INNER = 48;
  const TOTAL = CENTER + R_OUTER * 2;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: fullscreen ? "100dvh" : "60vh",
      gap: 28,
      background: fullscreen ? "var(--bg, #faf8f5)" : "transparent",
    }}>
      <div style={{ position: "relative", width: TOTAL, height: TOTAL, display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* SVG track rings */}
        <svg width={TOTAL} height={TOTAL} viewBox={`0 0 ${TOTAL} ${TOTAL}`} style={{ position: "absolute", inset: 0 }}>
          <defs>
            <linearGradient id="arc-a" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c0404f" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#7c2232" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#c0404f" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="arc-b" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7c2232" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#c0404f" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Track — outer */}
          <circle cx={TOTAL/2} cy={TOTAL/2} r={TOTAL/2 - 2} fill="none" stroke="rgba(192,64,79,0.07)" strokeWidth="1.5" />
          {/* Track — inner */}
          <circle cx={TOTAL/2} cy={TOTAL/2} r={R_INNER + CENTER/2} fill="none" stroke="rgba(124,34,50,0.06)" strokeWidth="1" />
        </svg>

        {/* Outer arc — clockwise */}
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          width={TOTAL} height={TOTAL} viewBox={`0 0 ${TOTAL} ${TOTAL}`}
          style={{ position: "absolute", inset: 0 }}
        >
          <circle
            cx={TOTAL/2} cy={TOTAL/2} r={TOTAL/2 - 2}
            fill="none" stroke="url(#arc-a)" strokeWidth="2.5"
            strokeDasharray={`${(TOTAL/2 - 2) * 1.4} ${(TOTAL/2 - 2) * 5}`}
            strokeLinecap="round"
          />
        </motion.svg>

        {/* Inner arc — counter-clockwise */}
        <motion.svg
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          width={TOTAL} height={TOTAL} viewBox={`0 0 ${TOTAL} ${TOTAL}`}
          style={{ position: "absolute", inset: 0 }}
        >
          <circle
            cx={TOTAL/2} cy={TOTAL/2} r={R_INNER + CENTER/2}
            fill="none" stroke="url(#arc-b)" strokeWidth="1.5"
            strokeDasharray={`${(R_INNER + CENTER/2) * 1.2} ${(R_INNER + CENTER/2) * 4}`}
            strokeLinecap="round"
          />
        </motion.svg>

        {/* Orbiting dot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-start", justifyContent: "center" }}
        >
          <div style={{
            width: 9, height: 9, borderRadius: "50%",
            background: "#c0404f",
            boxShadow: "0 0 10px rgba(192,64,79,0.8), 0 0 4px rgba(192,64,79,0.5)",
            marginTop: 0,
          }} />
        </motion.div>

        {/* Logo — white circle so mix-blend-mode:multiply removes white bg */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: CENTER,
            height: CENTER,
            borderRadius: "50%",
            background: "#ffffff",
            overflow: "hidden",
            position: "relative",
            zIndex: 5,
            boxShadow: "0 4px 24px rgba(0,0,0,0.1), 0 0 0 1px rgba(192,64,79,0.15)",
          }}
        >
          <img
            src="/logo.jpg"
            alt="ThePull"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              mixBlendMode: "multiply",
            }}
          />
        </motion.div>

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
