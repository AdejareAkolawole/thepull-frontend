"use client";
import { motion } from "framer-motion";

interface Props {
  message?: string;
  fullscreen?: boolean;
}

export default function LoadingScreen({ message = "Loading…", fullscreen = false }: Props) {
  const SIZE = 96;
  const R_OUTER = 64;
  const R_INNER = 52;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: fullscreen ? "100dvh" : "60vh",
      gap: 32,
      background: fullscreen ? "var(--bg, #faf8f5)" : "transparent",
    }}>
      {/* Orbital system */}
      <div style={{ position: "relative", width: SIZE + R_OUTER, height: SIZE + R_OUTER, display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* SVG orbital rings */}
        <svg
          width={SIZE + R_OUTER}
          height={SIZE + R_OUTER}
          style={{ position: "absolute", inset: 0 }}
          viewBox={`0 0 ${SIZE + R_OUTER} ${SIZE + R_OUTER}`}
        >
          <defs>
            <linearGradient id="arc1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c0404f" stopOpacity="0" />
              <stop offset="40%" stopColor="#c0404f" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7c2232" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="arc2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7c2232" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#c0404f" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Outer ring track */}
          <circle
            cx={(SIZE + R_OUTER) / 2}
            cy={(SIZE + R_OUTER) / 2}
            r={R_OUTER}
            fill="none"
            stroke="rgba(192,64,79,0.08)"
            strokeWidth="1.5"
          />
          {/* Inner ring track */}
          <circle
            cx={(SIZE + R_OUTER) / 2}
            cy={(SIZE + R_OUTER) / 2}
            r={R_INNER}
            fill="none"
            stroke="rgba(124,34,50,0.07)"
            strokeWidth="1"
          />
        </svg>

        {/* Outer arc — clockwise */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <svg width={SIZE + R_OUTER} height={SIZE + R_OUTER} viewBox={`0 0 ${SIZE + R_OUTER} ${SIZE + R_OUTER}`}>
            <circle
              cx={(SIZE + R_OUTER) / 2}
              cy={(SIZE + R_OUTER) / 2}
              r={R_OUTER}
              fill="none"
              stroke="url(#arc1)"
              strokeWidth="2"
              strokeDasharray={`${R_OUTER * 1.5} ${R_OUTER * 4}`}
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Inner arc — counter-clockwise */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <svg width={SIZE + R_OUTER} height={SIZE + R_OUTER} viewBox={`0 0 ${SIZE + R_OUTER} ${SIZE + R_OUTER}`}>
            <circle
              cx={(SIZE + R_OUTER) / 2}
              cy={(SIZE + R_OUTER) / 2}
              r={R_INNER}
              fill="none"
              stroke="url(#arc2)"
              strokeWidth="1.5"
              strokeDasharray={`${R_INNER} ${R_INNER * 3.5}`}
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Orbiting dot on outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <div style={{
            width: 9, height: 9,
            borderRadius: "50%",
            background: "#c0404f",
            boxShadow: "0 0 12px rgba(192,64,79,0.9), 0 0 4px rgba(192,64,79,0.6)",
            marginTop: (SIZE + R_OUTER) / 2 - R_OUTER - 4.5,
          }} />
        </motion.div>

        {/* Centre logo mark */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: SIZE,
            height: SIZE,
            borderRadius: "50%",
            background: "linear-gradient(145deg, #2d0f18, #1a0810)",
            border: "1px solid rgba(192,64,79,0.25)",
            boxShadow: "0 0 40px rgba(192,64,79,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 5,
          }}
        >
          {/* Glow behind letter */}
          <div style={{
            position: "absolute",
            width: 50, height: 50,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(192,64,79,0.22), transparent 70%)",
          }} />
          <span style={{
            fontSize: 38,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            fontFamily: "'Aeonik', system-ui, sans-serif",
            position: "relative",
            zIndex: 1,
            background: "linear-gradient(160deg, #fff 30%, rgba(192,64,79,0.85) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>P</span>
        </motion.div>

      </div>

      {/* Message */}
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
