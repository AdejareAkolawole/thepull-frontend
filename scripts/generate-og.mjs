import sharp from "sharp";
import fs from "fs";
import path from "path";

const W = 1200;
const H = 630;

// Exact landing page colors
const wine   = "#3d0e1a";
const wineMid = "#7c1a2e";
const gold   = "#c9a84c";
const ink    = "#0c0308";

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Exact landing page gradient orbs -->
    <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${wine}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${wine}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${gold}" stop-opacity="0.11"/>
      <stop offset="100%" stop-color="${gold}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb3" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${wineMid}" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="${wineMid}" stop-opacity="0"/>
    </radialGradient>
    <!-- Headline gradient: same as landing page gradShift colors -->
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="${wine}"/>
      <stop offset="35%"  stop-color="#c72b4a"/>
      <stop offset="65%"  stop-color="${gold}"/>
      <stop offset="100%" stop-color="${wine}"/>
    </linearGradient>
    <filter id="blur1"><feGaussianBlur stdDeviation="2"/></filter>
    <clipPath id="logoClip">
      <rect x="0" y="0" width="40" height="40" rx="8"/>
    </clipPath>
  </defs>

  <!-- White background — exact landing page -->
  <rect width="${W}" height="${H}" fill="#ffffff"/>

  <!-- Orb 1: top-left wine — matches landing top:-10% left:-8% w:640 -->
  <ellipse cx="-50" cy="-30" rx="380" ry="380" fill="url(#orb1)" filter="url(#blur1)"/>
  <!-- Orb 2: top-right gold — matches landing top:20% right:-12% w:520 -->
  <ellipse cx="1180" cy="180" rx="310" ry="310" fill="url(#orb2)" filter="url(#blur1)"/>
  <!-- Orb 3: bottom-center wine-mid — matches landing bottom:-15% left:28% w:480 -->
  <ellipse cx="560" cy="680" rx="280" ry="280" fill="url(#orb3)" filter="url(#blur1)"/>

  <!-- NAV bar — exact match -->
  <rect x="0" y="0" width="${W}" height="58" fill="rgba(255,255,255,0.86)"/>
  <rect x="0" y="57" width="${W}" height="1" fill="rgba(12,3,8,0.08)"/>

  <!-- Logo in nav -->
  <rect x="48" y="11" width="36" height="36" rx="8" fill="${wine}"/>
  <text x="66" y="34" text-anchor="middle" font-family="Georgia, serif" font-size="16" font-weight="900" fill="#fff">P</text>

  <!-- Brand name in nav -->
  <text x="92" y="30" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="${ink}" letter-spacing="-0.02em">MyPullScore</text>
  <text x="92" y="44" font-family="system-ui, sans-serif" font-size="9" fill="#888" letter-spacing="0.02em">Personal intelligence that grows with you.</text>

  <!-- Nav right: Sign in + Get started -->
  <text x="1020" y="34" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#888">Sign in</text>
  <rect x="1070" y="16" width="110" height="32" rx="16" fill="${ink}"/>
  <text x="1125" y="36" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#fff">Get started</text>

  <!-- HERO — centered, exact headline layout -->
  <!-- "Know yourself" — ink color, large -->
  <text x="600" y="230" text-anchor="middle"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="110" font-weight="800" fill="${ink}"
    letter-spacing="-6">Know yourself</text>

  <!-- "at a deeper level." — gradient text -->
  <text x="600" y="350" text-anchor="middle"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="110" font-weight="800" fill="url(#textGrad)"
    letter-spacing="-6">at a deeper level.</text>

  <!-- Subtitle — exact landing copy -->
  <text x="600" y="420" text-anchor="middle"
    font-family="system-ui, sans-serif" font-size="19" fill="#666" letter-spacing="0">
    Your emotional patterns, personality, and behavioural tendencies —
  </text>
  <text x="600" y="448" text-anchor="middle"
    font-family="system-ui, sans-serif" font-size="19" fill="#666">
    mapped into a living intelligence profile.
  </text>

  <!-- CTA buttons -->
  <!-- Primary: Get started free -->
  <rect x="362" y="478" width="220" height="50" rx="25" fill="${ink}"/>
  <text x="472" y="509" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#fff">Get started free →</text>

  <!-- Secondary: See how it works -->
  <rect x="600" y="478" width="238" height="50" rx="25" fill="none" stroke="rgba(12,3,8,0.08)" stroke-width="1.5"/>
  <text x="719" y="509" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#666">See how it works</text>

  <!-- Social proof avatars — exact landing colors -->
  <circle cx="450" cy="574" r="14" fill="#9b3050" stroke="#fff" stroke-width="2"/>
  <text x="450" y="579" text-anchor="middle" font-family="system-ui" font-size="9" font-weight="800" fill="#fff">A</text>
  <circle cx="463" cy="574" r="14" fill="#7b2a44" stroke="#fff" stroke-width="2"/>
  <text x="463" y="579" text-anchor="middle" font-family="system-ui" font-size="9" font-weight="800" fill="#fff">K</text>
  <circle cx="476" cy="574" r="14" fill="#b83c60" stroke="#fff" stroke-width="2"/>
  <text x="476" y="579" text-anchor="middle" font-family="system-ui" font-size="9" font-weight="800" fill="#fff">S</text>
  <circle cx="489" cy="574" r="14" fill="#6d2039" stroke="#fff" stroke-width="2"/>
  <text x="489" y="579" text-anchor="middle" font-family="system-ui" font-size="9" font-weight="800" fill="#fff">M</text>
  <circle cx="502" cy="574" r="14" fill="#c9536e" stroke="#fff" stroke-width="2"/>
  <text x="502" y="579" text-anchor="middle" font-family="system-ui" font-size="9" font-weight="800" fill="#fff">L</text>

  <!-- Stars -->
  <text x="524" y="579" font-family="system-ui" font-size="13" fill="${gold}">★★★★★</text>

  <!-- "Trusted by..." -->
  <text x="660" y="579" font-family="system-ui, sans-serif" font-size="13" fill="#888">Trusted by early members</text>
</svg>
`;

const publicDir = path.join(process.cwd(), "public");

await sharp(Buffer.from(svg))
  .resize(W, H)
  .png({ quality: 95 })
  .toFile(path.join(publicDir, "og-image.png"));

console.log("✓ og-image.png generated (1200×630) — exact landing page design");

// Favicon assets from logo
const logoPath = path.join(publicDir, "logo.jpg");
if (fs.existsSync(logoPath)) {
  await sharp(logoPath)
    .resize(180, 180, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("✓ apple-touch-icon.png (180×180)");

  await sharp(logoPath)
    .resize(32, 32, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, "favicon-32.png"));
  console.log("✓ favicon-32.png (32×32)");
}
