"use client";
import { useEffect, useRef } from "react";

const signals = [
  "Communication pattern updated · +3 signals",
  "Emotional Landscape confidence rising · 72%",
  "Archetype alignment recalculated · V10.0",
  "Behavioural consistency index stable · 65",
  "Identity vector updated · 847 data points",
  "Self-awareness dimension growing · +4 pts",
];

export default function IntelligenceBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let x = 0;
    let raf: number;
    const speed = 0.4;
    const step = () => {
      x -= speed;
      const half = track.scrollWidth / 2;
      if (Math.abs(x) >= half) x = 0;
      track.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const items = [...signals, ...signals];

  return (
    <div style={{
      width: "100%", overflow: "hidden",
      background: "linear-gradient(90deg, #1a0509, #2d0a12, #1a0509)",
      borderBottom: "1px solid rgba(192,64,79,0.2)",
      height: 32, display: "flex", alignItems: "center",
      position: "relative",
    }}>
      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: "linear-gradient(90deg, #1a0509, transparent)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: "linear-gradient(270deg, #1a0509, transparent)", pointerEvents: "none" }} />

      {/* Live dot */}
      <div style={{ position: "absolute", left: 12, zIndex: 3, display: "flex", alignItems: "center", gap: 5 }}>
        <div style={{ position: "relative", width: 6, height: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c0404f", position: "absolute" }} />
          <div style={{
            width: 6, height: 6, borderRadius: "50%", background: "rgba(192,64,79,0.4)",
            position: "absolute", animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
          }} />
        </div>
        <span style={{ fontSize: 9, fontWeight: 800, color: "rgba(192,64,79,0.9)", letterSpacing: "0.15em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          LIVE
        </span>
      </div>

      {/* Scrolling track */}
      <div ref={trackRef} style={{ display: "flex", alignItems: "center", gap: 0, paddingLeft: 80, willChange: "transform" }}>
        {items.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 0, flexShrink: 0 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap", paddingRight: 8 }}>{s}</span>
            <span style={{ fontSize: 10, color: "rgba(192,64,79,0.35)", paddingRight: 8 }}>·</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
