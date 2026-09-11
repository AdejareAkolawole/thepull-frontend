"use client";
import Image from "next/image";
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
      <div style={{ position: "relative", width: 110, height: 110, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Outer spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: "2px solid transparent",
            borderTopColor: "#c0404f",
            borderRightColor: "rgba(192,64,79,0.3)",
          }}
        />
        {/* Inner spinning ring — opposite direction */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", inset: 8, borderRadius: "50%",
            border: "1.5px solid transparent",
            borderBottomColor: "#7c2232",
            borderLeftColor: "rgba(124,34,50,0.25)",
          }}
        />
        {/* Pulsing glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: 14, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(192,64,79,0.2) 0%, transparent 70%)",
          }}
        />
        {/* Logo — contain so nothing is cropped */}
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "relative", width: 52, height: 64, zIndex: 2 }}
        >
          <Image src="/logo.jpg" alt="ThePull" fill style={{ objectFit: "contain" }} priority />
        </motion.div>
      </div>

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
