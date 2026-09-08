"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon, AiInnovation01Icon, Activity01Icon,
  FlashIcon, PresentationLineChart01Icon, Target01Icon,
  AiBrain01Icon, EyeIcon, Analytics01Icon, FavouriteIcon, FireIcon, LockIcon,
} from "@hugeicons/core-free-icons";
import { mockUser, mockDimensions, mockInsights, mockAchievements, mockIdentityVector } from "@/lib/mock";

const WINE  = "#3d0e1a";
const WINE2 = "#6b1c2b";
const WINE3 = "#c0404f";
const CREAM = "#f5f0e8";
const CREAM2= "#e8e0d0";
const BLACK = "#0f0a14";
const GREY  = "rgba(15,10,20,0.42)";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d, ease: "easeOut" as const },
});

const achievementIconMap: Record<string, any> = {
  brain: AiBrain01Icon, eye: EyeIcon, chart: Analytics01Icon,
  star: FavouriteIcon, fire: FireIcon, target: Target01Icon,
};

// ── Decorative illustrations ─────────────────────────────────────────────────

// Brain with circuit lines — for hero / wine cards
function IlluBrain({ color = "white" }: { color?: string }) {
  return (
    <svg viewBox="0 0 180 160" style={{ width: 180, height: 160 }} fill="none">
      <g opacity="0.18" stroke={color} strokeLinecap="round" strokeLinejoin="round">
        {/* left hemisphere */}
        <path d="M90 130 C60 130 32 112 25 88 C18 64 30 40 50 32 C58 28 68 30 76 36 C80 38 84 42 86 48" strokeWidth="4"/>
        {/* right hemisphere */}
        <path d="M90 130 C120 130 148 112 155 88 C162 64 150 40 130 32 C122 28 112 30 104 36 C100 38 96 42 94 48" strokeWidth="4"/>
        {/* centre split */}
        <line x1="90" y1="28" x2="90" y2="130" strokeWidth="2.5"/>
        {/* horizontal bands */}
        <path d="M44 68 Q67 58 90 62 Q113 58 136 68" strokeWidth="2"/>
        <path d="M38 90 Q64 80 90 84 Q116 80 142 90" strokeWidth="2"/>
        {/* nodes */}
        <circle cx="56" cy="48" r="5" fill={color}/>
        <circle cx="124" cy="48" r="5" fill={color}/>
        <circle cx="44" cy="75" r="4" fill={color}/>
        <circle cx="136" cy="75" r="4" fill={color}/>
        <circle cx="50" cy="100" r="4" fill={color}/>
        <circle cx="130" cy="100" r="4" fill={color}/>
        <circle cx="90" cy="25" r="5" fill={color}/>
        <circle cx="90" cy="130" r="5" fill={color}/>
        {/* connector sparks */}
        <line x1="56" y1="48" x2="44" y2="75" strokeWidth="1.5"/>
        <line x1="44" y1="75" x2="50" y2="100" strokeWidth="1.5"/>
        <line x1="124" y1="48" x2="136" y2="75" strokeWidth="1.5"/>
        <line x1="136" y1="75" x2="130" y2="100" strokeWidth="1.5"/>
        <line x1="56" y1="48" x2="90" y2="25" strokeWidth="1"/>
        <line x1="124" y1="48" x2="90" y2="25" strokeWidth="1"/>
      </g>
    </svg>
  );
}

// Radar / score map — for cream cards
function IlluRadar({ color = "#0f0a14" }: { color?: string }) {
  const cx=90,cy=80,r=58,n=5;
  const rings=[0.38,0.65,1].map(p=>
    Array.from({length:n},(_,i)=>{const a=(i/n)*Math.PI*2-Math.PI/2;return `${cx+Math.cos(a)*r*p},${cy+Math.sin(a)*r*p}`;}).join(" ")
  );
  const pts=Array.from({length:n},(_,i)=>{const a=(i/n)*Math.PI*2-Math.PI/2;const pv=[0.88,0.6,0.82,0.52,0.74][i];return `${cx+Math.cos(a)*r*pv},${cy+Math.sin(a)*r*pv}`;}).join(" ");
  return (
    <svg viewBox="0 0 180 160" style={{ width: 180, height: 160 }} fill="none">
      <g opacity="0.15" stroke={color}>
        {rings.map((p,i)=><polygon key={i} points={p} strokeWidth="1.5"/>)}
        {Array.from({length:n},(_,i)=>{const a=(i/n)*Math.PI*2-Math.PI/2;return <line key={i} x1={cx} y1={cy} x2={cx+Math.cos(a)*r} y2={cy+Math.sin(a)*r} strokeWidth="1"/>;  })}
        <polygon points={pts} fill={color} fillOpacity="0.18" strokeWidth="2"/>
        {Array.from({length:n},(_,i)=>{const a=(i/n)*Math.PI*2-Math.PI/2;const pv=[0.88,0.6,0.82,0.52,0.74][i];return <circle key={i} cx={cx+Math.cos(a)*r*pv} cy={cy+Math.sin(a)*r*pv} r="4" fill={color}/>;  })}
      </g>
    </svg>
  );
}

// Neural net — for black / dark cards
function IlluNeural({ color = "white" }: { color?: string }) {
  const nodes=[[90,25],[55,60],[90,60],[125,60],[40,100],[70,100],[110,100],[140,100],[55,135],[125,135]];
  const edges=[[0,1],[0,2],[0,3],[1,4],[1,5],[2,5],[2,6],[3,6],[3,7],[4,8],[5,8],[6,9],[7,9]];
  return (
    <svg viewBox="0 0 180 160" style={{ width: 180, height: 160 }} fill="none">
      <g opacity="0.18" stroke={color} fill={color}>
        {edges.map(([a,b],i)=><line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} strokeWidth="1.5"/>)}
        {nodes.map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===0?7:i<4?5:4}/>)}
      </g>
    </svg>
  );
}

// ── Banner card shell ─────────────────────────────────────────────────────────
// Mirrors the reference exactly: label / headline / desc / buttons · illustration right
function BannerCard({
  bg, border, label, labelColor, headline, sub, headlineColor, subColor,
  btn1, btn2, illustration, delay = 0,
}: {
  bg: string; border?: string; label: string; labelColor: string;
  headline: React.ReactNode; sub: string; headlineColor: string; subColor: string;
  btn1: { text: string; href: string; bg: string; color: string };
  btn2: { text: string; href: string; bg: string; color: string; border?: string };
  illustration: React.ReactNode; delay?: number;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay, ease: "easeOut" }}>
      <div style={{ borderRadius: 20, overflow: "hidden", background: bg, border: border ?? "none", padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, position: "relative" }}>
        {/* left content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: labelColor, marginBottom: 16, fontWeight: 700 }}>{label}</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15, color: headlineColor, marginBottom: 14 }}>{headline}</h2>
          <p style={{ fontSize: 14, color: subColor, lineHeight: 1.7, maxWidth: 420, marginBottom: 28 }}>{sub}</p>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href={btn1.href} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 12, background: btn1.bg, color: btn1.color, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
              {btn1.text} <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
            </Link>
            <Link href={btn2.href} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 12, background: btn2.bg, color: btn2.color, fontSize: 13, fontWeight: 600, textDecoration: "none", border: btn2.border }}>
              {btn2.text}
            </Link>
          </div>
        </div>
        {/* right illustration */}
        <div style={{ flexShrink: 0 }}>
          {illustration}
        </div>
      </div>
    </motion.div>
  );
}

export default function DashboardClient() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* 1 · Hero */}
      <BannerCard
        delay={0}
        bg={`linear-gradient(135deg, ${WINE} 0%, ${WINE2} 65%, #8c2535 100%)`}
        label="Personal Intelligence"
        labelColor="rgba(255,255,255,0.45)"
        headline={<>{greeting}, {mockUser.name}.<br /><span style={{ fontWeight: 300, color: "rgba(255,255,255,0.6)", fontSize: 32 }}>Your mind has evolved.</span></>}
        headlineColor="#ffffff"
        sub="3 new insights are ready. Your intelligence profile has shifted since your last visit — new patterns are surfacing."
        subColor="rgba(255,255,255,0.48)"
        btn1={{ text: "View Pull Profile", href: "/pull-profile", bg: "#ffffff", color: WINE }}
        btn2={{ text: "Ask The Pull", href: "/coach", bg: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.18)" }}
        illustration={<IlluBrain color="white" />}
      />

      {/* 2 · Archetype */}
      <BannerCard
        delay={0.07}
        bg={BLACK}
        border="1px solid rgba(255,255,255,0.06)"
        label="Primary Archetype"
        labelColor="rgba(201,168,76,0.7)"
        headline={<>{mockUser.archetype}.<br /><span style={{ fontWeight: 300, color: "rgba(255,255,255,0.45)", fontSize: 30 }}>{mockUser.archetype_confidence}% confidence.</span></>}
        headlineColor="#ffffff"
        sub={mockUser.archetype_tagline}
        subColor="rgba(255,255,255,0.35)"
        btn1={{ text: "Full Profile", href: "/pull-profile", bg: WINE3, color: "white" }}
        btn2={{ text: "Identity Vector", href: "/pull-profile", bg: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.1)" }}
        illustration={<IlluNeural color="white" />}
      />

      {/* 3 · Intelligence Map */}
      <BannerCard
        delay={0.13}
        bg={CREAM}
        border={`1px solid ${CREAM2}`}
        label="Intelligence Map"
        labelColor={GREY}
        headline={<>5 Dimensions.<br /><span style={{ fontWeight: 300, color: GREY, fontSize: 30 }}>Mapped and growing.</span></>}
        headlineColor={BLACK}
        sub="Your intelligence spans emotional intelligence, communication, self-awareness, relationship patterns, and behavioural consistency."
        subColor={GREY}
        btn1={{ text: "View Dimensions", href: "/pull-profile", bg: BLACK, color: "white" }}
        btn2={{ text: "Reality Check", href: "/reports", bg: "rgba(15,10,20,0.06)", color: GREY, border: `1px solid ${CREAM2}` }}
        illustration={<IlluRadar color={BLACK} />}
      />

      {/* 4 · Living Intelligence — wide with insight rows */}
      <motion.div {...fade(0.19)}>
        <div style={{ borderRadius: 20, overflow: "hidden", background: "#ffffff", border: "1px solid rgba(15,10,20,0.08)", padding: "40px 48px", display: "flex", alignItems: "flex-start", gap: 56 }}>
          {/* left label block */}
          <div style={{ flex: "0 0 260px" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: WINE3, marginBottom: 16, fontWeight: 700 }}>Living Intelligence</p>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: BLACK, lineHeight: 1.15, marginBottom: 14 }}>What The Pull<br />sees in you.</h2>
            <p style={{ fontSize: 14, color: GREY, lineHeight: 1.7, marginBottom: 28 }}>Observations, patterns, and opportunities — updated live as you grow.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <Link href="/reports" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 12, background: BLACK, color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                Reality Check <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
              </Link>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 16px", borderRadius: 12, background: "rgba(192,64,79,0.07)", border: "1px solid rgba(192,64,79,0.15)", fontSize: 12, color: WINE3, fontWeight: 700 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: WINE3, display: "inline-block" }} /> LIVE
              </div>
            </div>
          </div>
          {/* right insights */}
          <div style={{ flex: 1 }}>
            {mockInsights.map((ins, i) => {
              const col = ins.type === "observation" ? BLACK : ins.type === "pattern" ? WINE3 : "#b8922a";
              return (
                <div key={ins.id} style={{ display: "flex", gap: 20, padding: "18px 0", borderBottom: i < mockInsights.length - 1 ? "1px solid rgba(15,10,20,0.07)" : "none" }}>
                  <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: col, minWidth: 82, paddingTop: 3, flexShrink: 0 }}>{ins.type}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: BLACK, lineHeight: 1.35, marginBottom: 4 }}>{ins.title}</p>
                    <p style={{ fontSize: 12, color: GREY, lineHeight: 1.6 }}>{ins.body}</p>
                  </div>
                  <span style={{ fontSize: 10, color: GREY, flexShrink: 0, paddingTop: 3 }}>{ins.timestamp}</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* 5 · Ask The Pull */}
      <BannerCard
        delay={0.25}
        bg={`linear-gradient(135deg, ${WINE} 0%, ${WINE2} 100%)`}
        label="Your AI Coach"
        labelColor="rgba(255,255,255,0.45)"
        headline={<>Ask The Pull.<br /><span style={{ fontWeight: 300, color: "rgba(255,255,255,0.5)", fontSize: 30 }}>It knows you deeply.</span></>}
        headlineColor="#ffffff"
        sub="Trained on your full intelligence profile, dimensions, patterns, and assessments. The more it learns, the sharper it gets."
        subColor="rgba(255,255,255,0.42)"
        btn1={{ text: "Start session", href: "/coach", bg: "#ffffff", color: WINE }}
        btn2={{ text: "View insights", href: "/reports", bg: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}
        illustration={<IlluBrain color="white" />}
      />

      {/* 6 · Identity Vector */}
      <motion.div {...fade(0.31)}>
        <div style={{ borderRadius: 20, overflow: "hidden", background: BLACK, border: "1px solid rgba(255,255,255,0.06)", padding: "40px 48px", display: "flex", alignItems: "center", gap: 56 }}>
          <div style={{ flex: "0 0 260px" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.35)", marginBottom: 16, fontWeight: 700 }}>Behavioural Data</p>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: "white", lineHeight: 1.15, marginBottom: 14 }}>Identity<br />Vector.</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: 28 }}>How your behavioural patterns rank across archetypes right now.</p>
            <Link href="/pull-profile" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 12, background: WINE3, color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
              See Profile <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
            </Link>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            {mockIdentityVector.map((v, i) => (
              <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 13, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? "white" : "rgba(255,255,255,0.35)", minWidth: 160, flexShrink: 0 }}>{v.label}</span>
                <div style={{ flex: 1, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                  <motion.div style={{ height: "100%", borderRadius: 99, background: i === 0 ? `linear-gradient(90deg,${WINE2},${WINE3})` : "rgba(255,255,255,0.18)" }}
                    initial={{ width: 0 }} animate={{ width: `${v.pct}%` }} transition={{ duration: 1, delay: 0.4 + i * 0.07 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? WINE3 : "rgba(255,255,255,0.28)", minWidth: 36, textAlign: "right" as const }}>{v.pct}%</span>
              </div>
            ))}
          </div>
          <div style={{ flexShrink: 0 }}>
            <IlluNeural color="white" />
          </div>
        </div>
      </motion.div>

      {/* 7 · Achievements */}
      <BannerCard
        delay={0.37}
        bg={CREAM}
        border={`1px solid ${CREAM2}`}
        label="Progress"
        labelColor={GREY}
        headline={<>{mockAchievements.filter(a=>a.done).length} of {mockAchievements.length} unlocked.<br /><span style={{ fontWeight: 300, color: GREY, fontSize: 30 }}>Keep going.</span></>}
        headlineColor={BLACK}
        sub="Complete intelligence assessments to unlock achievements and deepen your self-knowledge."
        subColor={GREY}
        btn1={{ text: "View Journey", href: "/journey", bg: BLACK, color: "white" }}
        btn2={{ text: "Journal", href: "/journal", bg: "rgba(15,10,20,0.06)", color: GREY, border: `1px solid ${CREAM2}` }}
        illustration={
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {mockAchievements.map(a => (
              <div key={a.label} title={a.label} style={{ width: 40, height: 40, borderRadius: 11, background: a.done ? `${a.color}15` : "rgba(15,10,20,0.06)", border: `1px solid ${a.done ? `${a.color}35` : "rgba(15,10,20,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: a.done ? 1 : 0.35 }}>
                {a.done
                  ? <HugeiconsIcon icon={achievementIconMap[a.iconKey]} size={16} style={{ color: a.color }} />
                  : <HugeiconsIcon icon={LockIcon} size={14} style={{ color: GREY }} />}
              </div>
            ))}
          </div>
        }
      />

    </div>
  );
}
