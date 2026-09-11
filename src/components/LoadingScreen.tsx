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
      minHeight: fullscreen ? "100vh" : "60vh",
      gap: 20,
      background: fullscreen ? "var(--bg, #faf8f5)" : "transparent",
    }}>
      {/* Animated logo */}
      <div style={{ position: "relative", width: 72, height: 72 }}>
        {/* Outer pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.22, 1], opacity: [0.18, 0, 0.18] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: -10,
            borderRadius: 22,
            background: "radial-gradient(circle, rgba(192,64,79,0.35), transparent)",
          }}
        />
        {/* Inner glow */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: 0,
            borderRadius: 18,
            boxShadow: "0 0 28px rgba(192,64,79,0.28)",
          }}
        />
        {/* Logo image */}
        <motion.img
          src="/logo.jpg"
          alt="ThePull"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 72, height: 72,
            borderRadius: 18,
            display: "block",
            objectFit: "cover",
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>

      {/* Animated dots below logo */}
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
            style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "rgba(192,64,79,0.7)",
              display: "block",
            }}
          />
        ))}
      </div>

      {/* Message */}
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 13,
            color: "var(--text-muted, rgba(15,10,20,0.45))",
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
