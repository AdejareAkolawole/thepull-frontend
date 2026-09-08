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

// ── Stacked cards illustration — matches the reference screenshot exactly ────
function StackedCards({ color = "white", size = 160 }: { color?: string; size?: number }) {
  // 3 cards stacked with rotation offsets, like the reference
  const a = color === "white" ? "rgba(255,255,255," : "rgba(15,10,20,";
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" style={{ flexShrink: 0 }}>
      {/* back card — most rotated */}
      <g transform="rotate(-12, 80, 80)">
        <rect x="42" y="28" width="90" height="112" rx="10" fill={`${a}0.12)`} />
        <rect x="54" y="52" width="66" height="5" rx="2.5" fill={`${a}0.2)`} />
        <rect x="54" y="64" width="50" height="5" rx="2.5" fill={`${a}0.15)`} />
        <rect x="54" y="76" width="58" height="5" rx="2.5" fill={`${a}0.15)`} />
      </g>
      {/* mid card */}
      <g transform="rotate(-5, 80, 80)">
        <rect x="38" y="26" width="90" height="112" rx="10" fill={`${a}0.15)`} />
        <rect x="50" y="50" width="66" height="5" rx="2.5" fill={`${a}0.22)`} />
        <rect x="50" y="62" width="50" height="5" rx="2.5" fill={`${a}0.16)`} />
        <rect x="50" y="74" width="58" height="5" rx="2.5" fill={`${a}0.16)`} />
      </g>
      {/* front card */}
      <rect x="34" y="24" width="90" height="112" rx="10" fill={`${a}0.2)`} />
      <rect x="34" y="24" width="90" height="112" rx="10" stroke={`${a}0.25)`} strokeWidth="1" fill="none"/>
      {/* header bar */}
      <rect x="34" y="24" width="90" height="28" rx="10" fill={`${a}0.12)`} />
      <rect x="34" y="38" width="90" height="14" fill={`${a}0.08)`} />
      {/* content lines */}
      <rect x="46" y="64" width="66" height="5" rx="2.5" fill={`${a}0.25)`} />
      <rect x="46" y="76" width="50" height="5" rx="2.5" fill={`${a}0.18)`} />
      <rect x="46" y="88" width="58" height="5" rx="2.5" fill={`${a}0.18)`} />
      <rect x="46" y="100" width="42" height="5" rx="2.5" fill={`${a}0.14)`} />
      {/* small avatar circle top-right of front card */}
      <circle cx="108" cy="38" r="8" fill={`${a}0.22)`} />
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
        illu={<StackedCards color="white" size={160} />}
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
          illu={<StackedCards color="white" size={130} />}
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
          illu={<StackedCards color={BLACK} size={130} />}
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
          illu={<StackedCards color="white" size={130} />}
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
          <StackedCards color="white" size={130} />
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
