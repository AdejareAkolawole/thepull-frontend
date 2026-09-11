"use client";
import { motion } from "framer-motion";

interface Props {
  message?: string;
  fullscreen?: boolean;
}

export default function LoadingScreen({ message = "Loading…", fullscreen = false }: Props) {
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
      <div style={{ position: "relative", width: 88, height: 88 }}>

        {/* Outer ring — clockwise */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: -16,
            borderRadius: "50%",
            border: "2px solid transparent",
            borderTopColor: "rgba(192,64,79,0.85)",
            borderRightColor: "rgba(192,64,79,0.2)",
            borderBottomColor: "transparent",
            borderLeftColor: "rgba(192,64,79,0.1)",
          }}
        />

        {/* Inner ring — counter-clockwise */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: -7,
            borderRadius: "50%",
            border: "1.5px solid transparent",
            borderTopColor: "rgba(124,34,50,0.6)",
            borderLeftColor: "rgba(192,64,79,0.25)",
            borderBottomColor: "rgba(192,64,79,0.08)",
            borderRightColor: "transparent",
          }}
        />

        {/* Orbiting dot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", inset: -18, borderRadius: "50%" }}
        >
          <div style={{
            position: "absolute",
            top: "50%", left: 0,
            transform: "translateY(-50%)",
            width: 8, height: 8,
            borderRadius: "50%",
            background: "#c0404f",
            boxShadow: "0 0 10px rgba(192,64,79,0.7), 0 0 4px rgba(192,64,79,0.5)",
          }} />
        </motion.div>

        {/* Logo container — dark circle so JPG white bg vanishes */}
        <motion.div
          animate={{ scale: [1, 1.035, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 88, height: 88,
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            zIndex: 2,
            background: "#1a0810",
            boxShadow: "0 0 0 1px rgba(192,64,79,0.2), 0 4px 24px rgba(0,0,0,0.25)",
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
              filter: "invert(1) brightness(1.8)",
              mixBlendMode: "screen",
            }}
          />
        </motion.div>

      </div>

      {/* Message */}
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{
            fontSize: 12,
            color: "var(--text-muted, rgba(15,10,20,0.42))",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
