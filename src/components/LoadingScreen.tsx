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
      gap: 24,
      background: fullscreen ? "var(--bg, #faf8f5)" : "transparent",
    }}>
      {/* Logo + orbiting circles */}
      <div style={{ position: "relative", width: 100, height: 100 }}>

        {/* Outer rotating ring — dashed arc */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: -14,
            borderRadius: "50%",
            border: "2px solid transparent",
            borderTopColor: "rgba(192,64,79,0.75)",
            borderRightColor: "rgba(192,64,79,0.25)",
          }}
        />

        {/* Middle rotating ring — counter-clockwise, slower */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            border: "1.5px solid transparent",
            borderTopColor: "rgba(124,34,50,0.55)",
            borderBottomColor: "rgba(192,64,79,0.3)",
          }}
        />

        {/* Orbiting dot 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", inset: -16, borderRadius: "50%" }}
        >
          <div style={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            width: 7, height: 7,
            borderRadius: "50%",
            background: "#c0404f",
            boxShadow: "0 0 8px rgba(192,64,79,0.6)",
          }} />
        </motion.div>

        {/* Orbiting dot 2 — offset 180deg, slower */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "linear", delay: 0 }}
          style={{ position: "absolute", inset: -10, borderRadius: "50%" }}
        >
          <div style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 5, height: 5,
            borderRadius: "50%",
            background: "rgba(192,64,79,0.5)",
          }} />
        </motion.div>

        {/* Inner glow pulse */}
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: 2,
            borderRadius: 20,
            background: "radial-gradient(circle, rgba(192,64,79,0.18), transparent 70%)",
          }}
        />

        {/* Logo */}
        <motion.img
          src="/logo.jpg"
          alt="ThePull"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 100, height: 100,
            borderRadius: 22,
            display: "block",
            objectFit: "cover",
            position: "relative",
            zIndex: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          }}
        />
      </div>

      {/* Message */}
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: 13,
            color: "var(--text-muted, rgba(15,10,20,0.45))",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
