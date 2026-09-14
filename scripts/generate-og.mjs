import sharp from "sharp";
import fs from "fs";
import path from "path";

// OG image: 1200×630, matching landing page design exactly
// Wine gradient background, logo, brand name, tagline, score ring

const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg1" cx="30%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#5a0e20" stop-opacity="1"/>
      <stop offset="100%" stop-color="#1a0408" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#c9a84c" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#c9a84c" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7c1a2e" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#7c1a2e" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c9a84c"/>
      <stop offset="100%" stop-color="#e8c97a"/>
    </linearGradient>
    <filter id="blur1">
      <feGaussianBlur stdDeviation="60"/>
    </filter>
    <filter id="blur2">
      <feGaussianBlur stdDeviation="40"/>
    </filter>
    <clipPath id="logoClip">
      <rect x="0" y="0" width="80" height="80" rx="16"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg1)"/>

  <!-- Ambient glows -->
  <ellipse cx="900" cy="180" rx="380" ry="280" fill="url(#glow1)" filter="url(#blur1)"/>
  <ellipse cx="200" cy="500" rx="300" ry="220" fill="url(#glow2)" filter="url(#blur2)"/>

  <!-- Subtle grain overlay lines -->
  <rect width="${W}" height="${H}" fill="none" stroke="#ffffff" stroke-opacity="0.015" stroke-width="1"/>

  <!-- Score ring — right side -->
  <g transform="translate(920, 315)">
    <!-- Outer ring track -->
    <circle cx="0" cy="0" r="140" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="12"/>
    <!-- Score arc ~65% (Pull Score 65) -->
    <circle cx="0" cy="0" r="140" fill="none" stroke="url(#scoreGrad)" stroke-width="12"
      stroke-dasharray="${Math.round(2 * Math.PI * 140 * 0.65)} ${Math.round(2 * Math.PI * 140)}"
      stroke-dashoffset="${Math.round(2 * Math.PI * 140 * 0.25)}"
      stroke-linecap="round" opacity="0.9"/>
    <!-- Inner ring -->
    <circle cx="0" cy="0" r="110" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    <!-- Score number -->
    <text x="0" y="-12" text-anchor="middle" font-family="Georgia, serif" font-size="62" font-weight="700"
      fill="#ffffff" letter-spacing="-2">65</text>
    <text x="0" y="16" text-anchor="middle" font-family="Georgia, serif" font-size="13" font-weight="400"
      fill="rgba(255,255,255,0.45)" letter-spacing="3">PULL SCORE</text>
    <!-- Gravity label -->
    <text x="0" y="48" text-anchor="middle" font-family="Georgia, serif" font-size="12" font-weight="400"
      fill="#c9a84c" letter-spacing="2">STRONG GRAVITY</text>
  </g>

  <!-- Left content -->
  <!-- Eyebrow -->
  <text x="80" y="170" font-family="Georgia, serif" font-size="11" font-weight="400"
    fill="#c9a84c" letter-spacing="5">PERSONAL INTELLIGENCE</text>

  <!-- Brand name -->
  <text x="78" y="255" font-family="Georgia, serif" font-size="82" font-weight="700"
    fill="#ffffff" letter-spacing="-3">ThePull</text>

  <!-- Divider line -->
  <rect x="80" y="278" width="60" height="2" fill="#c9a84c" opacity="0.7" rx="1"/>

  <!-- Tagline -->
  <text x="80" y="330" font-family="Georgia, serif" font-size="22" font-weight="400"
    fill="rgba(255,255,255,0.75)" letter-spacing="0">Intelligence for understanding</text>
  <text x="80" y="362" font-family="Georgia, serif" font-size="22" font-weight="400"
    fill="rgba(255,255,255,0.75)" letter-spacing="0">yourself and your relationships.</text>

  <!-- Feature pills -->
  <g transform="translate(80, 420)">
    <!-- Pill 1 -->
    <rect x="0" y="0" width="130" height="34" rx="17" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <text x="65" y="22" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="rgba(255,255,255,0.7)" letter-spacing="1">Pull Score</text>
    <!-- Pill 2 -->
    <rect x="146" y="0" width="130" height="34" rx="17" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <text x="211" y="22" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="rgba(255,255,255,0.7)" letter-spacing="1">AI Coach</text>
    <!-- Pill 3 -->
    <rect x="292" y="0" width="160" height="34" rx="17" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <text x="372" y="22" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="rgba(255,255,255,0.7)" letter-spacing="1">Reality Check</text>
  </g>

  <!-- Bottom domain -->
  <text x="80" y="585" font-family="Georgia, serif" font-size="13" fill="rgba(255,255,255,0.3)" letter-spacing="2">mypullscore.com</text>

  <!-- Subtle bottom border accent -->
  <rect x="0" y="${H - 3}" width="${W}" height="3" fill="#c9a84c" opacity="0.5"/>
</svg>
`;

const publicDir = path.join(process.cwd(), "public");

// Generate og-image.png from SVG
await sharp(Buffer.from(svg))
  .resize(W, H)
  .png({ quality: 95 })
  .toFile(path.join(publicDir, "og-image.png"));

console.log("✓ og-image.png generated (1200×630)");

// Also generate favicon.ico equivalent — convert logo.jpg to favicon sizes
// The logo.jpg is already referenced; just confirm it exists
const logoPath = path.join(publicDir, "logo.jpg");
if (fs.existsSync(logoPath)) {
  // Generate apple-touch-icon (180×180)
  await sharp(logoPath)
    .resize(180, 180, { fit: "contain", background: { r: 124, g: 34, b: 50, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("✓ apple-touch-icon.png generated (180×180)");

  // Generate favicon-32.png
  await sharp(logoPath)
    .resize(32, 32, { fit: "contain", background: { r: 124, g: 34, b: 50, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, "favicon-32.png"));
  console.log("✓ favicon-32.png generated (32×32)");
}
