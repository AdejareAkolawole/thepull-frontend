"use client";

export default function PullScoreRing({ score = 74, size = 120, strokeWidth = 8 }: { score?: number; size?: number; strokeWidth?: number }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" style={{ overflow: "visible" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f0f4f9" strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="url(#brand-grad)" strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`} />
        <defs>
          <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b03040" />
            <stop offset="100%" stopColor="#7c2232" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold leading-none" style={{ fontSize: size * 0.28, color: "var(--text-primary)" }}>{score}</span>
        <span className="text-[10px] font-medium tracking-widest uppercase mt-0.5" style={{ color: "var(--text-muted)" }}>Pull</span>
      </div>
    </div>
  );
}
