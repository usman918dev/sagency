const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public/assets');

const width = 1600;
const height = 900;

// 1. Web Development Cover (Clean Web App & Responsive UI Mockup, Zero Text)
const webSvg = `
<svg width="${width}" height="${height}" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#060911"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e1035"/>
    </linearGradient>
    <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9D26FF" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#7C3AED" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
    <radialGradient id="ambient" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#9D26FF" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <filter id="blurGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="30"/>
    </filter>
    <filter id="glass" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="20" stdDeviation="30" flood-color="#000000" flood-opacity="0.7"/>
    </filter>
  </defs>

  <rect width="1600" height="900" fill="url(#bg)"/>
  <circle cx="800" cy="300" r="500" fill="url(#ambient)"/>
  <circle cx="1200" cy="200" r="300" fill="#7C3AED" opacity="0.15" filter="url(#blurGlow)"/>

  <g opacity="0.05" stroke="#ffffff" stroke-width="1">
    <path d="M0 150 H1600 M0 300 H1600 M0 450 H1600 M0 600 H1600 M0 750 H1600"/>
    <path d="M200 0 V900 M400 0 V900 M600 0 V900 M800 0 V900 M1000 0 V900 M1200 0 V900 M1400 0 V900"/>
  </g>

  <g filter="url(#glass)" transform="translate(250, 120)">
    <rect x="0" y="0" width="1100" height="640" rx="24" fill="#0f172a" stroke="rgba(157, 38, 255, 0.4)" stroke-width="2"/>
    <rect x="12" y="12" width="1076" height="616" rx="16" fill="#090d16"/>

    <rect x="12" y="12" width="1076" height="48" fill="#131c31"/>
    <circle cx="44" cy="36" r="6" fill="#EF4444"/>
    <circle cx="64" cy="36" r="6" fill="#F59E0B"/>
    <circle cx="84" cy="36" r="6" fill="#10B981"/>
    <rect x="450" y="24" width="200" height="24" rx="12" fill="#1e293b" opacity="0.6"/>

    <rect x="12" y="60" width="200" height="568" fill="#0d1424"/>
    <rect x="36" y="90" width="36" height="36" rx="10" fill="url(#purpleGlow)"/>
    <rect x="84" y="100" width="90" height="16" rx="8" fill="#334155"/>

    <rect x="36" y="160" width="24" height="24" rx="6" fill="#334155"/>
    <rect x="72" y="166" width="100" height="12" rx="6" fill="#1e293b"/>
    <rect x="36" y="208" width="24" height="24" rx="6" fill="url(#purpleGlow)"/>
    <rect x="72" y="214" width="110" height="12" rx="6" fill="#3b82f6" opacity="0.8"/>
    <rect x="36" y="256" width="24" height="24" rx="6" fill="#334155"/>
    <rect x="72" y="262" width="80" height="12" rx="6" fill="#1e293b"/>
    <rect x="36" y="304" width="24" height="24" rx="6" fill="#334155"/>
    <rect x="72" y="310" width="95" height="12" rx="6" fill="#1e293b"/>

    <rect x="236" y="84" width="828" height="160" rx="16" fill="url(#purpleGlow)" opacity="0.18" stroke="rgba(157, 38, 255, 0.3)" stroke-width="1.5"/>
    <rect x="268" y="112" width="220" height="20" rx="10" fill="#ffffff" opacity="0.9"/>
    <rect x="268" y="144" width="380" height="14" rx="7" fill="#94a3b8" opacity="0.6"/>
    <rect x="268" y="166" width="280" height="14" rx="7" fill="#94a3b8" opacity="0.4"/>
    <rect x="268" y="196" width="130" height="32" rx="10" fill="url(#purpleGlow)"/>

    <rect x="236" y="264" width="260" height="190" rx="16" fill="#131c31" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <rect x="260" y="288" width="40" height="40" rx="10" fill="url(#cyanGlow)"/>
    <rect x="260" y="344" width="140" height="16" rx="8" fill="#e2e8f0"/>
    <rect x="260" y="370" width="190" height="10" rx="5" fill="#475569"/>
    <rect x="260" y="388" width="150" height="10" rx="5" fill="#334155"/>
    <rect x="260" y="416" width="80" height="24" rx="12" fill="#06B6D4" opacity="0.2"/>

    <rect x="520" y="264" width="260" height="190" rx="16" fill="#131c31" stroke="rgba(157, 38, 255, 0.4)" stroke-width="1"/>
    <rect x="544" y="288" width="40" height="40" rx="10" fill="url(#purpleGlow)"/>
    <rect x="544" y="344" width="150" height="16" rx="8" fill="#e2e8f0"/>
    <rect x="544" y="370" width="180" height="10" rx="5" fill="#475569"/>
    <rect x="544" y="388" width="130" height="10" rx="5" fill="#334155"/>
    <rect x="544" y="416" width="80" height="24" rx="12" fill="#9D26FF" opacity="0.3"/>

    <rect x="804" y="264" width="260" height="190" rx="16" fill="#131c31" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <rect x="828" y="288" width="40" height="40" rx="10" fill="#3B82F6"/>
    <rect x="828" y="344" width="130" height="16" rx="8" fill="#e2e8f0"/>
    <rect x="828" y="370" width="190" height="10" rx="5" fill="#475569"/>
    <rect x="828" y="388" width="160" height="10" rx="5" fill="#334155"/>
    <rect x="828" y="416" width="80" height="24" rx="12" fill="#3B82F6" opacity="0.2"/>

    <rect x="236" y="474" width="828" height="136" rx="16" fill="#0d1424" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    <rect x="268" y="500" width="120" height="10" rx="5" fill="#EC4899"/>
    <rect x="400" y="500" width="200" height="10" rx="5" fill="#8B5CF6"/>
    <rect x="268" y="524" width="180" height="10" rx="5" fill="#3B82F6"/>
    <rect x="460" y="524" width="140" height="10" rx="5" fill="#10B981"/>
    <rect x="268" y="548" width="90" height="10" rx="5" fill="#F59E0B"/>
    <rect x="370" y="548" width="240" height="10" rx="5" fill="#6366F1"/>
    <rect x="268" y="572" width="310" height="10" rx="5" fill="#94A3B8"/>

    <path d="M 680 570 Q 730 510, 780 540 T 880 490 T 980 530 L 1030 490" fill="none" stroke="url(#purpleGlow)" stroke-width="4" stroke-linecap="round"/>
    <circle cx="1030" cy="490" r="6" fill="#C084FC" filter="url(#blurGlow)"/>
    <circle cx="1030" cy="490" r="4" fill="#ffffff"/>
  </g>
</svg>
`;

// 2. Graphic Design Cover (3D Branding, Color Swatches, Packaging Renders, Zero Text)
const graphicSvg = `
<svg width="${width}" height="${height}" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0a17"/>
      <stop offset="50%" stop-color="#160e29"/>
      <stop offset="100%" stop-color="#080811"/>
    </linearGradient>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C084FC"/>
      <stop offset="50%" stop-color="#9D26FF"/>
      <stop offset="100%" stop-color="#4C1D95"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F43F5E"/>
      <stop offset="100%" stop-color="#881337"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="25" stdDeviation="30" flood-color="#000000" flood-opacity="0.7"/>
    </filter>
  </defs>

  <rect width="1600" height="900" fill="url(#bg)"/>
  <circle cx="300" cy="250" r="250" fill="#9D26FF" opacity="0.2" filter="blur(60px)"/>
  <circle cx="1300" cy="650" r="300" fill="#7C3AED" opacity="0.25" filter="blur(70px)"/>

  <g filter="url(#shadow)" transform="translate(180, 200) rotate(-12)">
    <rect x="0" y="0" width="220" height="340" rx="20" fill="#1e1b4b" stroke="rgba(192, 132, 252, 0.4)" stroke-width="2"/>
    <rect x="16" y="16" width="188" height="180" rx="14" fill="url(#purpleGrad)"/>
    <circle cx="110" cy="250" r="16" fill="#C084FC"/>
    <rect x="40" y="290" width="140" height="12" rx="6" fill="#475569"/>
  </g>

  <g filter="url(#shadow)" transform="translate(320, 240) rotate(-4)">
    <rect x="0" y="0" width="220" height="340" rx="20" fill="#18181b" stroke="rgba(255, 255, 255, 0.15)" stroke-width="2"/>
    <rect x="16" y="16" width="188" height="180" rx="14" fill="url(#pinkGrad)"/>
    <circle cx="110" cy="250" r="16" fill="#F43F5E"/>
    <rect x="40" y="290" width="140" height="12" rx="6" fill="#52525b"/>
  </g>

  <g filter="url(#shadow)" transform="translate(680, 180)">
    <rect x="60" y="140" width="180" height="420" rx="30" fill="url(#purpleGrad)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    <rect x="110" y="70" width="80" height="70" rx="12" fill="url(#goldGrad)"/>
    <rect x="80" y="240" width="140" height="200" rx="12" fill="#09090b" opacity="0.85"/>
    <circle cx="150" cy="310" r="32" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
    <circle cx="150" cy="310" r="20" fill="none" stroke="#C084FC" stroke-width="2"/>
    <rect x="110" y="375" width="80" height="8" rx="4" fill="url(#goldGrad)"/>
    <rect x="120" y="395" width="60" height="6" rx="3" fill="#94a3b8"/>
  </g>

  <g filter="url(#shadow)" transform="translate(1040, 220) rotate(10)">
    <rect x="0" y="0" width="300" height="380" rx="24" fill="#13111c" stroke="rgba(157, 38, 255, 0.5)" stroke-width="2"/>
    <circle cx="150" cy="150" r="80" fill="none" stroke="#9D26FF" stroke-width="3" stroke-dasharray="8 6"/>
    <circle cx="150" cy="150" r="50" fill="none" stroke="#C084FC" stroke-width="2"/>
    <polygon points="150,80 210,180 90,180" fill="none" stroke="#FDE047" stroke-width="2.5"/>
    <rect x="50" y="260" width="200" height="14" rx="7" fill="url(#purpleGrad)"/>
    <rect x="80" y="290" width="140" height="10" rx="5" fill="#475569"/>
    <rect x="100" y="315" width="100" height="10" rx="5" fill="#334155"/>
  </g>

  <circle cx="620" cy="160" r="10" fill="#FDE047"/>
  <path d="M 620 160 Q 750 80, 950 140" fill="none" stroke="#FDE047" stroke-width="2" stroke-dasharray="6 4"/>
  <circle cx="950" cy="140" r="10" fill="#FDE047"/>
</svg>
`;

// 3. SEO Cover (Rising Growth Curve, Dynamic 3D Analytics Nodes, Zero Text)
const seoSvg = `
<svg width="${width}" height="${height}" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050814"/>
      <stop offset="50%" stop-color="#0e172a"/>
      <stop offset="100%" stop-color="#14092b"/>
    </linearGradient>
    <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#9D26FF" stop-opacity="0.5"/>
      <stop offset="70%" stop-color="#10B981" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="40%" stop-color="#9D26FF"/>
      <stop offset="80%" stop-color="#C084FC"/>
      <stop offset="100%" stop-color="#10B981"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="15" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="1600" height="900" fill="url(#bg)"/>

  <g stroke="rgba(157, 38, 255, 0.15)" stroke-width="1.5" fill="none">
    <circle cx="1200" cy="350" r="200"/>
    <circle cx="1200" cy="350" r="350"/>
    <circle cx="1200" cy="350" r="500"/>
  </g>

  <rect x="180" y="140" width="1240" height="620" rx="32" fill="#0b1120" opacity="0.85" stroke="rgba(157, 38, 255, 0.3)" stroke-width="2"/>

  <g transform="translate(230, 180)">
    <rect x="0" y="0" width="340" height="110" rx="20" fill="#131c31" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <circle cx="45" cy="55" r="22" fill="#9D26FF" opacity="0.2"/>
    <circle cx="45" cy="55" r="10" fill="#C084FC"/>
    <rect x="90" y="35" width="120" height="14" rx="7" fill="#64748b"/>
    <rect x="90" y="60" width="180" height="24" rx="6" fill="#10B981" opacity="0.9"/>

    <rect x="380" y="0" width="340" height="110" rx="20" fill="#131c31" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <circle cx="425" cy="55" r="22" fill="#3B82F6" opacity="0.2"/>
    <circle cx="425" cy="55" r="10" fill="#60A5FA"/>
    <rect x="470" y="35" width="130" height="14" rx="7" fill="#64748b"/>
    <rect x="470" y="60" width="160" height="24" rx="6" fill="url(#lineGrad)"/>

    <rect x="760" y="0" width="380" height="110" rx="20" fill="#131c31" stroke="rgba(157, 38, 255, 0.4)" stroke-width="1.5"/>
    <circle cx="805" cy="55" r="22" fill="#10B981" opacity="0.2"/>
    <circle cx="805" cy="55" r="10" fill="#34D399"/>
    <rect x="850" y="35" width="140" height="14" rx="7" fill="#64748b"/>
    <rect x="850" y="60" width="200" height="24" rx="6" fill="#10B981"/>
  </g>

  <g transform="translate(230, 330)">
    <path d="M 0 0 H 1140 M 0 80 H 1140 M 0 160 H 1140 M 0 240 H 1140 M 0 320 H 1140" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    <path d="M 0 320 Q 250 300, 450 220 T 800 130 T 1140 20 L 1140 360 L 0 360 Z" fill="url(#chartFill)"/>
    <path d="M 0 320 Q 250 300, 450 220 T 800 130 T 1140 20" fill="none" stroke="url(#lineGrad)" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>

    <circle cx="230" cy="302" r="8" fill="#3B82F6" filter="url(#glow)"/>
    <circle cx="450" cy="220" r="9" fill="#8B5CF6" filter="url(#glow)"/>
    <circle cx="680" cy="170" r="9" fill="#9D26FF" filter="url(#glow)"/>
    <circle cx="910" cy="80" r="10" fill="#C084FC" filter="url(#glow)"/>

    <circle cx="1140" cy="20" r="22" fill="#10B981" opacity="0.25" filter="url(#glow)"/>
    <circle cx="1140" cy="20" r="12" fill="#10B981" filter="url(#glow)"/>
    <circle cx="1140" cy="20" r="6" fill="#ffffff"/>
  </g>
</svg>
`;

// 4. Digital Marketing Cover (Multi-channel Funnel & Performance Ads Command Center, Zero Text)
const digitalSvg = `
<svg width="${width}" height="${height}" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090814"/>
      <stop offset="50%" stop-color="#160c2b"/>
      <stop offset="100%" stop-color="#070a14"/>
    </linearGradient>
    <linearGradient id="magentaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EC4899"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9D26FF"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="20" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="1600" height="900" fill="url(#bg)"/>

  <circle cx="400" cy="450" r="350" fill="#EC4899" opacity="0.15" filter="blur(80px)"/>
  <circle cx="1200" cy="450" r="350" fill="#9D26FF" opacity="0.2" filter="blur(80px)"/>

  <g transform="translate(180, 200)">
    <polygon points="0,0 420,0 350,110 70,110" fill="url(#magentaGrad)" opacity="0.9" filter="url(#glow)"/>
    <polygon points="78,122 342,122 284,230 136,230" fill="url(#purpleGrad)" opacity="0.9"/>
    <polygon points="144,242 276,242 230,350 190,350" fill="#10B981" opacity="0.95" filter="url(#glow)"/>

    <path d="M 210 370 V 430 L 190 410 M 210 430 L 230 410" stroke="#10B981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <g transform="translate(680, 180)">
    <rect x="0" y="0" width="740" height="540" rx="28" fill="#0d1322" stroke="rgba(157, 38, 255, 0.35)" stroke-width="2"/>

    <rect x="30" y="30" width="180" height="18" rx="9" fill="#e2e8f0"/>
    <rect x="520" y="24" width="190" height="32" rx="10" fill="url(#purpleGrad)"/>

    <g transform="translate(40, 100)">
      <rect x="0" y="0" width="660" height="80" rx="16" fill="#141c2e"/>
      <circle cx="40" cy="40" r="18" fill="#EC4899"/>
      <rect x="80" y="26" width="100" height="12" rx="6" fill="#94a3b8"/>
      <rect x="80" y="46" width="60" height="10" rx="5" fill="#475569"/>
      <rect x="220" y="30" width="400" height="20" rx="10" fill="#1e293b"/>
      <rect x="220" y="30" width="340" height="20" rx="10" fill="url(#magentaGrad)"/>
    </g>

    <g transform="translate(40, 200)">
      <rect x="0" y="0" width="660" height="80" rx="16" fill="#141c2e"/>
      <circle cx="40" cy="40" r="18" fill="#3B82F6"/>
      <rect x="80" y="26" width="120" height="12" rx="6" fill="#94a3b8"/>
      <rect x="80" y="46" width="70" height="10" rx="5" fill="#475569"/>
      <rect x="220" y="30" width="400" height="20" rx="10" fill="#1e293b"/>
      <rect x="220" y="30" width="380" height="20" rx="10" fill="url(#purpleGrad)"/>
    </g>

    <g transform="translate(40, 300)">
      <rect x="0" y="0" width="660" height="80" rx="16" fill="#141c2e"/>
      <circle cx="40" cy="40" r="18" fill="#06B6D4"/>
      <rect x="80" y="26" width="90" height="12" rx="6" fill="#94a3b8"/>
      <rect x="80" y="46" width="50" height="10" rx="5" fill="#475569"/>
      <rect x="220" y="30" width="400" height="20" rx="10" fill="#1e293b"/>
      <rect x="220" y="30" width="290" height="20" rx="10" fill="#06B6D4"/>
    </g>

    <g transform="translate(40, 400)">
      <rect x="0" y="0" width="660" height="80" rx="16" fill="#141c2e"/>
      <circle cx="40" cy="40" r="18" fill="#10B981"/>
      <rect x="80" y="26" width="140" height="12" rx="6" fill="#94a3b8"/>
      <rect x="80" y="46" width="80" height="10" rx="5" fill="#475569"/>
      <rect x="220" y="30" width="400" height="20" rx="10" fill="#1e293b"/>
      <rect x="220" y="30" width="360" height="20" rx="10" fill="#10B981"/>
    </g>
  </g>
</svg>
`;

// 5. Amazon PPC Cover (3D E-Commerce Box + Golden/Purple Rising PPC Chart Columns, Zero Text)
const amazonSvg = `
<svg width="${width}" height="${height}" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0812"/>
      <stop offset="50%" stop-color="#140f26"/>
      <stop offset="100%" stop-color="#08070d"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FBBF24"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="purpleColumn" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C084FC"/>
      <stop offset="100%" stop-color="#6B21A8"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="25" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="1600" height="900" fill="url(#bg)"/>

  <circle cx="500" cy="450" r="300" fill="#FBBF24" opacity="0.12" filter="blur(80px)"/>
  <circle cx="1100" cy="350" r="350" fill="#9D26FF" opacity="0.2" filter="blur(80px)"/>

  <g transform="translate(240, 260)">
    <polygon points="120,120 280,120 280,340 120,340" fill="#d97706" stroke="#fef08a" stroke-width="2"/>
    <polygon points="120,120 280,120 220,40 60,40" fill="#f59e0b" stroke="#fef08a" stroke-width="2"/>
    <polygon points="60,40 120,120 120,340 60,260" fill="#b45309" stroke="#fef08a" stroke-width="2"/>
    <polygon points="170,40 200,40 220,120 190,120" fill="#78350f" opacity="0.6"/>
    <polygon points="190,120 220,120 220,340 190,340" fill="#78350f" opacity="0.6"/>

    <circle cx="200" cy="230" r="45" fill="#9D26FF" opacity="0.25" filter="url(#glow)"/>
    <circle cx="200" cy="230" r="30" fill="none" stroke="#C084FC" stroke-width="4"/>
    <circle cx="200" cy="230" r="16" fill="none" stroke="#FBBF24" stroke-width="3"/>
    <circle cx="200" cy="230" r="6" fill="#ffffff"/>
  </g>

  <g transform="translate(680, 180)">
    <rect x="0" y="0" width="700" height="540" rx="28" fill="#0d1220" stroke="rgba(251, 191, 36, 0.3)" stroke-width="2"/>

    <path d="M 40 120 H 660 M 40 220 H 660 M 40 320 H 660 M 40 420 H 660" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

    <rect x="80" y="320" width="70" height="140" rx="12" fill="url(#purpleColumn)"/>
    <rect x="200" y="240" width="70" height="220" rx="12" fill="url(#purpleColumn)"/>
    <rect x="320" y="170" width="70" height="290" rx="12" fill="url(#goldGrad)" filter="url(#glow)"/>
    <rect x="440" y="90" width="70" height="370" rx="12" fill="url(#goldGrad)" filter="url(#glow)"/>
    <rect x="560" y="60" width="70" height="400" rx="12" fill="url(#purpleColumn)" filter="url(#glow)"/>

    <path d="M 115 300 Q 240 220, 355 140 T 595 40" fill="none" stroke="#10B981" stroke-width="5" stroke-linecap="round" filter="url(#glow)"/>
    <circle cx="595" cy="40" r="10" fill="#10B981"/>
  </g>
</svg>
`;

// 6. Video & Motion Design Cover (Cinematic Color Spectrum, Waveforms, 3D Lens Aperture, Zero Text)
const videoSvg = `
<svg width="${width}" height="${height}" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070612"/>
      <stop offset="50%" stop-color="#130a26"/>
      <stop offset="100%" stop-color="#050814"/>
    </linearGradient>
    <linearGradient id="spectrum" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="25%" stop-color="#F59E0B"/>
      <stop offset="50%" stop-color="#10B981"/>
      <stop offset="75%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#9D26FF"/>
    </linearGradient>
    <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EC4899"/>
      <stop offset="50%" stop-color="#9D26FF"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="20" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="1600" height="900" fill="url(#bg)"/>

  <g transform="translate(360, 450)">
    <circle cx="0" cy="0" r="240" fill="none" stroke="rgba(157, 38, 255, 0.25)" stroke-width="2"/>
    <circle cx="0" cy="0" r="190" fill="none" stroke="url(#spectrum)" stroke-width="4" filter="url(#glow)"/>
    <circle cx="0" cy="0" r="140" fill="#0d0e1a" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>

    <path d="M -140 0 L 0 -140 L 140 0 L 0 140 Z" fill="none" stroke="#9D26FF" stroke-width="2"/>
    <circle cx="0" cy="0" r="60" fill="url(#waveGrad)" opacity="0.7" filter="url(#glow)"/>
    <circle cx="0" cy="0" r="25" fill="#ffffff"/>
  </g>

  <g transform="translate(680, 160)">
    <rect x="0" y="0" width="740" height="580" rx="28" fill="#0b0f1a" stroke="rgba(157, 38, 255, 0.35)" stroke-width="2"/>

    <rect x="30" y="30" width="680" height="320" rx="16" fill="#04060b" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <circle cx="370" cy="190" r="90" fill="url(#waveGrad)" opacity="0.8" filter="url(#glow)"/>
    <polygon points="370,120 440,240 300,240" fill="none" stroke="#F59E0B" stroke-width="4"/>
    <polygon points="355,170 395,190 355,210" fill="#ffffff"/>

    <rect x="30" y="380" width="680" height="40" rx="10" fill="#131c2e"/>
    <rect x="80" y="385" width="220" height="30" rx="6" fill="url(#waveGrad)" opacity="0.9"/>
    <rect x="320" y="385" width="340" height="30" rx="6" fill="#9D26FF" opacity="0.7"/>

    <rect x="30" y="435" width="680" height="40" rx="10" fill="#131c2e"/>
    <rect x="140" y="440" width="280" height="30" rx="6" fill="#EC4899" opacity="0.8"/>
    <rect x="440" y="440" width="180" height="30" rx="6" fill="#3B82F6" opacity="0.8"/>

    <rect x="30" y="490" width="680" height="50" rx="10" fill="#0d1424"/>
    <path d="M 40 515 Q 60 495, 80 515 T 120 515 T 160 490 T 200 535 T 240 515 T 280 495 T 320 530 T 360 515 T 400 490 T 440 535 T 480 515 T 520 495 T 560 525 T 600 515 T 640 500 T 680 515" fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>

    <line x1="380" y1="20" x2="380" y2="560" stroke="#EF4444" stroke-width="3"/>
    <polygon points="372,20 388,20 380,32" fill="#EF4444"/>
  </g>
</svg>
`;

async function main() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const items = [
    { name: 'portfolio-web-v2.jpg', svg: webSvg },
    { name: 'portfolio-graphic-v2.jpg', svg: graphicSvg },
    { name: 'portfolio-seo-v2.jpg', svg: seoSvg },
    { name: 'portfolio-digital-v2.jpg', svg: digitalSvg },
    { name: 'portfolio-amazon-v2.jpg', svg: amazonSvg },
    { name: 'portfolio-video-v2.jpg', svg: videoSvg },

    { name: 'portfolio-web-cover.png', svg: webSvg },
    { name: 'portfolio-graphic-cover.png', svg: graphicSvg },
    { name: 'portfolio-seo-cover.png', svg: seoSvg },
    { name: 'portfolio-digital-cover.png', svg: digitalSvg },
    { name: 'portfolio-amazon-cover.png', svg: amazonSvg },
    { name: 'portfolio-video-cover.png', svg: videoSvg },
  ];

  for (const item of items) {
    const dest = path.join(outputDir, item.name);
    await sharp(Buffer.from(item.svg))
      .jpeg({ quality: 95 })
      .toFile(dest.replace('.png', '.jpg'));
    await sharp(Buffer.from(item.svg))
      .png({ quality: 100 })
      .toFile(dest);
    console.log(`Generated: ${dest}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
