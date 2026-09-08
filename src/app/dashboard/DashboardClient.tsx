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
const CREAM2= "#e4dbd0";
const BLACK = "#0f0a14";
const GREY  = "rgba(15,10,20,0.42)";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: d, ease: "easeOut" as const },
});

const achievementIconMap: Record<string, any> = {
  brain: AiBrain01Icon, eye: EyeIcon, chart: Analytics01Icon,
  star: FavouriteIcon, fire: FireIcon, target: Target01Icon,
};

// ── Brain SVG — clean, large, visible ───────────────────────────────────────
function BrainIllu({ color = "white", size = 160 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" style={{ flexShrink: 0 }}>
      <g opacity="0.22" stroke={color} strokeLinecap="round" strokeLinejoin="round">
        <path d="M80 135 C46 135 20 110 20 82 C20 62 30 46 48 38 C53 30 64 26 76 30 L80 32" strokeWidth="4.5"/>
        <path d="M80 135 C114 135 140 110 140 82 C140 62 130 46 112 38 C107 30 96 26 84 30 L80 32" strokeWidth="4.5"/>
        <line x1="80" y1="30" x2="80" y2="135" strokeWidth="3"/>
        <path d="M34 80 Q57 68 80 72 Q103 68 126 80" strokeWidth="2.5"/>
        <path d="M26 95 Q53 83 80 87 Q107 83 134 95" strokeWidth="2"/>
        <circle cx="52" cy="50" r="6" fill={color} stroke="none"/>
        <circle cx="108" cy="50" r="6" fill={color} stroke="none"/>
        <circle cx="36" cy="78" r="5" fill={color} stroke="none"/>
        <circle cx="124" cy="78" r="5" fill={color} stroke="none"/>
        <circle cx="44" cy="104" r="5" fill={color} stroke="none"/>
        <circle cx="116" cy="104" r="5" fill={color} stroke="none"/>
        <circle cx="80" cy="28" r="6" fill={color} stroke="none"/>
        <line x1="52" y1="50" x2="36" y2="78" strokeWidth="2"/>
        <line x1="36" y1="78" x2="44" y2="104" strokeWidth="2"/>
        <line x1="108" y1="50" x2="124" y2="78" strokeWidth="2"/>
        <line x1="124" y1="78" x2="116" y2="104" strokeWidth="2"/>
        <line x1="52" y1="50" x2="80" y2="28" strokeWidth="1.5"/>
        <line x1="108" y1="50" x2="80" y2="28" strokeWidth="1.5"/>
      </g>
    </svg>
  );
}

function RadarIllu({ color = BLACK, size = 140 }: { color?: string; size?: number }) {
  const cx=70,cy=70,r=54,n=5;
  const ring=(p:number)=>Array.from({length:n},(_,i)=>{const a=(i/n)*Math.PI*2-Math.PI/2;return `${cx+Math.cos(a)*r*p},${cy+Math.sin(a)*r*p}`;}).join(" ");
  const vals=[0.88,0.6,0.82,0.52,0.74];
  const pts=Array.from({length:n},(_,i)=>{const a=(i/n)*Math.PI*2-Math.PI/2;return `${cx+Math.cos(a)*r*vals[i]},${cy+Math.sin(a)*r*vals[i]}`;}).join(" ");
  return (
    <svg width={size} height={size} viewBox="0 0 140 140" fill="none" style={{ flexShrink: 0 }}>
      <g opacity="0.2" stroke={color}>
        {[0.35,0.65,1].map((p,i)=><polygon key={i} points={ring(p)} strokeWidth="1.5" fill="none"/>)}
        {Array.from({length:n},(_,i)=>{const a=(i/n)*Math.PI*2-Math.PI/2;return <line key={i} x1={cx} y1={cy} x2={cx+Math.cos(a)*r} y2={cy+Math.sin(a)*r} strokeWidth="1"/>;  })}
        <polygon points={pts} fill={color} fillOpacity="0.2" strokeWidth="2"/>
        {Array.from({length:n},(_,i)=>{const a=(i/n)*Math.PI*2-Math.PI/2;return <circle key={i} cx={cx+Math.cos(a)*r*vals[i]} cy={cy+Math.sin(a)*r*vals[i]} r="4.5" fill={color} stroke="none"/>;  })}
      </g>
    </svg>
  );
}

function NeuralIllu({ color = "white", size = 140 }: { color?: string; size?: number }) {
  const nodes=[[70,18],[38,48],[70,48],[102,48],[22,84],[54,84],[86,84],[118,84],[38,118],[102,118]];
  const edges=[[0,1],[0,2],[0,3],[1,4],[1,5],[2,5],[2,6],[3,6],[3,7],[4,8],[5,8],[6,9],[7,9],[1,2],[2,3]];
  return (
    <svg width={size} height={size} viewBox="0 0 140 140" fill="none" style={{ flexShrink: 0 }}>
      <g opacity="0.2" stroke={color} fill={color}>
        {edges.map(([a,b],i)=><line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} strokeWidth="1.5"/>)}
        {nodes.map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===0?7:i<4?5:4}/>)}
      </g>
    </svg>
  );
}

// ── The standard card = reference pattern ────────────────────────────────────
function Card({
  bg, border, label, labelColor, title, desc, headColor, descColor,
  btn1, btn2, illu, delay=0, style={},
}: {
  bg:string; border?:string; label:string; labelColor:string; title:React.ReactNode;
  desc:string; headColor:string; descColor:string;
  btn1:{text:string;href:string;bg:string;color:string};
  btn2?:{text:string;href:string;bg:string;color:string;border?:string};
  illu:React.ReactNode; delay?:number; style?:React.CSSProperties;
}) {
  return (
    <motion.div {...fade(delay)} style={style}>
      <div style={{
        borderRadius: 18, overflow: "hidden", position: "relative",
        background: bg, border: border ?? "none",
        padding: "36px 40px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 24, height: "100%",
        boxSizing: "border-box",
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: labelColor, marginBottom: 14, fontWeight: 700 }}>{label}</p>
          <h2 style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.18, color: headColor, marginBottom: 12 }}>{title}</h2>
          <p style={{ fontSize: 13, color: descColor, lineHeight: 1.7, marginBottom: 24 }}>{desc}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
            <Link href={btn1.href} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 11, background: btn1.bg, color: btn1.color, fontSize: 12, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" as const }}>
              {btn1.text} <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
            </Link>
            {btn2 && (
              <Link href={btn2.href} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 11, background: btn2.bg, color: btn2.color, fontSize: 12, fontWeight: 600, textDecoration: "none", border: btn2.border, whiteSpace: "nowrap" as const }}>
                {btn2.text}
              </Link>
            )}
          </div>
        </div>
        <div style={{ flexShrink: 0, opacity: 1 }}>{illu}</div>
      </div>
    </motion.div>
  );
}

export default function DashboardClient() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* ROW 1 — Hero (full width) */}
      <Card
        delay={0}
        bg={`linear-gradient(135deg, ${WINE} 0%, ${WINE2} 60%, #8c2535 100%)`}
        label="Personal Intelligence"
        labelColor="rgba(255,255,255,0.45)"
        title={<>{greeting}, {mockUser.name}.<br /><span style={{ fontWeight: 300, fontSize: 26, color: "rgba(255,255,255,0.55)" }}>Your mind has evolved.</span></>}
        headColor="#fff"
        desc="3 new insights are ready. Your intelligence profile has shifted since your last visit — new patterns are surfacing."
        descColor="rgba(255,255,255,0.48)"
        btn1={{ text: "View Pull Profile", href: "/pull-profile", bg: "#fff", color: WINE }}
        btn2={{ text: "Ask The Pull", href: "/coach", bg: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)" }}
        illu={<BrainIllu color="white" size={160} />}
      />

      {/* ROW 2 — Archetype + Intelligence Map */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="dash-row-2">
        <Card
          delay={0.07}
          bg={BLACK}
          border="1px solid rgba(255,255,255,0.07)"
          label="Primary Archetype"
          labelColor="rgba(201,168,76,0.65)"
          title={<>{mockUser.archetype}.<br /><span style={{ fontWeight: 300, fontSize: 22, color: "rgba(255,255,255,0.4)" }}>{mockUser.archetype_confidence}% confidence.</span></>}
          headColor="#fff"
          desc={mockUser.archetype_tagline.slice(0, 90) + "…"}
          descColor="rgba(255,255,255,0.32)"
          btn1={{ text: "Full Profile", href: "/pull-profile", bg: WINE3, color: "#fff" }}
          btn2={{ text: "Identity Vector", href: "/pull-profile", bg: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
          illu={<NeuralIllu color="white" size={130} />}
        />
        <Card
          delay={0.11}
          bg={CREAM}
          border={`1px solid ${CREAM2}`}
          label="Intelligence Map"
          labelColor={GREY}
          title={<>5 Core<br /><span style={{ fontWeight: 300, fontSize: 22, color: GREY }}>Dimensions Mapped</span></>}
          headColor={BLACK}
          desc="Emotional intelligence, communication, self-awareness, relationship patterns, and behavioural consistency."
          descColor={GREY}
          btn1={{ text: "View Dimensions", href: "/pull-profile", bg: BLACK, color: "#fff" }}
          btn2={{ text: "Reality Check →", href: "/reports", bg: "transparent", color: GREY, border: `1px solid ${CREAM2}` }}
          illu={<RadarIllu color={BLACK} size={130} />}
        />
      </div>

      {/* ROW 3 — Living Intelligence (full width, split) */}
      <motion.div {...fade(0.15)}>
        <div style={{ borderRadius: 18, background: "#fff", border: "1px solid rgba(15,10,20,0.08)", padding: "36px 40px", display: "flex", gap: 48, alignItems: "flex-start" }}>
          <div style={{ flex: "0 0 240px" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: WINE3, marginBottom: 14, fontWeight: 700 }}>Living Intelligence</p>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: BLACK, lineHeight: 1.2, marginBottom: 12 }}>What The Pull<br />sees in you.</h2>
            <p style={{ fontSize: 13, color: GREY, lineHeight: 1.7, marginBottom: 24 }}>Updated live as your profile grows and you interact with The Pull.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link href="/reports" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 11, background: BLACK, color: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                Reality Check <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
              </Link>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 99, background: "rgba(192,64,79,0.07)", border: "1px solid rgba(192,64,79,0.15)", fontSize: 11, color: WINE3, fontWeight: 700, width: "fit-content" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: WINE3, display: "inline-block" }} /> LIVE
              </div>
            </div>
          </div>
          <div style={{ flex: 1, borderLeft: "1px solid rgba(15,10,20,0.07)", paddingLeft: 40 }}>
            {mockInsights.map((ins, i) => {
              const col = ins.type === "observation" ? BLACK : ins.type === "pattern" ? WINE3 : "#b8922a";
              return (
                <div key={ins.id} style={{ display: "flex", gap: 18, padding: "16px 0", borderBottom: i < mockInsights.length - 1 ? "1px solid rgba(15,10,20,0.07)" : "none" }}>
                  <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: col, minWidth: 78, paddingTop: 2, flexShrink: 0 }}>{ins.type}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: BLACK, lineHeight: 1.3, marginBottom: 4 }}>{ins.title}</p>
                    <p style={{ fontSize: 12, color: GREY, lineHeight: 1.6 }}>{ins.body}</p>
                  </div>
                  <span style={{ fontSize: 10, color: GREY, flexShrink: 0, paddingTop: 2 }}>{ins.timestamp}</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ROW 4 — Ask The Pull + Achievements */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="dash-row-4">
        <Card
          delay={0.21}
          bg={`linear-gradient(135deg, ${WINE} 0%, ${WINE2} 100%)`}
          label="Your AI Coach"
          labelColor="rgba(255,255,255,0.42)"
          title={<>Ask The Pull.<br /><span style={{ fontWeight: 300, fontSize: 22, color: "rgba(255,255,255,0.45)" }}>It knows you.</span></>}
          headColor="#fff"
          desc="Trained on your full intelligence profile, dimensions, and behavioural patterns. The sharper your profile, the better its answers."
          descColor="rgba(255,255,255,0.4)"
          btn1={{ text: "Start session", href: "/coach", bg: "#fff", color: WINE }}
          btn2={{ text: "View insights", href: "/reports", bg: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.15)" }}
          illu={<BrainIllu color="white" size={130} />}
        />
        <Card
          delay={0.25}
          bg={CREAM}
          border={`1px solid ${CREAM2}`}
          label="Progress"
          labelColor={GREY}
          title={<>{mockAchievements.filter(a=>a.done).length} of {mockAchievements.length}<br /><span style={{ fontWeight: 300, fontSize: 22, color: GREY }}>Achievements</span></>}
          headColor={BLACK}
          desc="Complete assessments and reflections to unlock achievements and deepen your self-knowledge."
          descColor={GREY}
          btn1={{ text: "View Journey", href: "/journey", bg: BLACK, color: "#fff" }}
          btn2={{ text: "Journal", href: "/journal", bg: "transparent", color: GREY, border: `1px solid ${CREAM2}` }}
          illu={
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7 }}>
              {mockAchievements.map(a => (
                <div key={a.label} title={a.label} style={{ width: 38, height: 38, borderRadius: 10, background: a.done ? `${a.color}15` : "rgba(15,10,20,0.06)", border: `1px solid ${a.done ? `${a.color}30` : "rgba(15,10,20,0.09)"}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: a.done ? 1 : 0.35 }}>
                  {a.done ? <HugeiconsIcon icon={achievementIconMap[a.iconKey]} size={15} style={{ color: a.color }} /> : <HugeiconsIcon icon={LockIcon} size={13} style={{ color: GREY }} />}
                </div>
              ))}
            </div>
          }
        />
      </div>

      {/* ROW 5 — Identity Vector (full width) */}
      <motion.div {...fade(0.29)}>
        <div style={{ borderRadius: 18, background: BLACK, border: "1px solid rgba(255,255,255,0.06)", padding: "36px 40px", display: "flex", alignItems: "center", gap: 48 }}>
          <div style={{ flex: "0 0 220px" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.32)", marginBottom: 14, fontWeight: 700 }}>Behavioural Data</p>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 12 }}>Identity<br />Vector.</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.32)", lineHeight: 1.7, marginBottom: 24 }}>How your behavioural patterns rank across archetypes right now.</p>
            <Link href="/pull-profile" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 11, background: WINE3, color: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
              See Profile <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
            </Link>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
            {mockIdentityVector.map((v, i) => (
              <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 12, fontWeight: i===0?700:400, color: i===0?"white":"rgba(255,255,255,0.32)", minWidth: 155, flexShrink: 0 }}>{v.label}</span>
                <div style={{ flex: 1, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                  <motion.div style={{ height: "100%", borderRadius: 99, background: i===0?`linear-gradient(90deg,${WINE2},${WINE3})`:"rgba(255,255,255,0.18)" }}
                    initial={{ width: 0 }} animate={{ width: `${v.pct}%` }} transition={{ duration: 1, delay: 0.4+i*0.07 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: i===0?WINE3:"rgba(255,255,255,0.25)", minWidth: 36, textAlign: "right" as const }}>{v.pct}%</span>
              </div>
            ))}
          </div>
          <NeuralIllu color="white" size={130} />
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 860px) {
          .dash-row-2, .dash-row-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
