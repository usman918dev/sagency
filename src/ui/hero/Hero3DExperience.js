"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { 
  Code2, 
  TrendingUp, 
  ShoppingBag, 
  Search, 
  Bot, 
  Sparkles as SparklesIcon, 
  ArrowUpRight, 
  Star, 
  Layers, 
  Palette, 
  Share2, 
  Zap, 
  CheckCircle2, 
  Globe, 
  BarChart3, 
  Megaphone 
} from 'lucide-react';

// --- THREE.JS 3D SCENE BACKGROUND ---

function ThreeSceneCore() {
  const icoRef = useRef();
  const torusRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (icoRef.current) {
      icoRef.current.rotation.x += delta * 0.25;
      icoRef.current.rotation.y += delta * 0.35;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x -= delta * 0.2;
      torusRef.current.rotation.z += delta * 0.25;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Central Rotating Wireframe Icosahedron */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={icoRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshStandardMaterial
            wireframe
            color="#C084FC"
            emissive="#9D26FF"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Floating Metallic Torus Knot */}
      <Float speed={2.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh ref={torusRef} position={[1.9, -1.2, -1]}>
          <torusKnotGeometry args={[0.8, 0.22, 100, 16]} />
          <meshStandardMaterial
            color="#9D26FF"
            emissive="#7C3AED"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>

      {/* Outer Orbit Metallic Ring */}
      <Float speed={1.8} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={ringRef} position={[-2.1, 1.2, -1.5]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.4, 0.05, 16, 100]} />
          <meshStandardMaterial
            color="#E9D5FF"
            emissive="#C084FC"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={1.0}
          />
        </mesh>
      </Float>

      {/* Ambient Sparkles Cloud */}
      <Sparkles count={70} scale={8.5} size={3} speed={0.4} color="#C084FC" />
    </group>
  );
}

function CanvasRig() {
  useFrame((state) => {
    state.camera.position.x = (state.pointer.x * 0.8 - state.camera.position.x) * 0.05;
    state.camera.position.y = (state.pointer.y * 0.8 - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

const R3FCanvas = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#9D26FF" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#7C3AED" />
        <directionalLight position={[0, 5, 5]} intensity={1} color="#ffffff" />
        <ThreeSceneCore />
        <CanvasRig />
      </Canvas>
    </div>
  );
};

// Services Data Pill Array for Bottom Ribbon
const servicePills = [
  { icon: Globe, label: "Web Design & Dev" },
  { icon: Layers, label: "UI/UX Design" },
  { icon: Palette, label: "Branding & Identity" },
  { icon: ShoppingBag, label: "Amazon Growth & Storefronts" },
  { icon: Search, label: "SEO" },
  { icon: Megaphone, label: "Digital Marketing" },
  { icon: Bot, label: "AI Automation" },
  { icon: Share2, label: "Social Media Marketing" },
];

// --- MAIN 3D INTERACTIVE HERO COMPONENT ---

export default function Hero3DExperience() {
  const containerRef = useRef(null);

  // Motion Values for Mouse Parallax Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 22, stiffness: 140 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 22, stiffness: 140 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[420px] sm:h-[640px] lg:h-[700px] flex items-center justify-center perspective-[1200px] isolate"
    >
      {/* 3D Three.js Background Canvas */}
      <R3FCanvas />

      {/* Ambient Glow Atmosphere (Strictly Z-0) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[460px] sm:h-[460px] bg-gradient-to-tr from-[#9D26FF]/20 via-[#7C3AED]/15 to-transparent rounded-full blur-[100px] pointer-events-none z-0" />

      {/* 3D Spatial Interactive Composition */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full max-w-[540px] sm:max-w-[580px] p-2 sm:p-4 z-10 scale-[0.72] xs:scale-[0.80] sm:scale-100 origin-center transition-transform duration-300"
      >
        {/* ================= CENTRAL CONSOLE: WEB & BRAND ENGINEERING ================= */}
        <motion.div 
          className="agenko-glass rounded-3xl border border-purple-500/30 p-4 sm:p-6 shadow-2xl shadow-purple-950/60 relative overflow-hidden backdrop-blur-2xl bg-[var(--card)]/90"
          style={{ translateZ: 30 }}
        >
          <div className="glint-line" />

          {/* Console Header */}
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5 sm:pb-3 mb-3 sm:mb-4">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
              <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-xs font-mono text-[var(--foreground-muted)]">DerixioServiceConsole.tsx</span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] sm:text-[11px] text-[#9D26FF] dark:text-[#C084FC] bg-purple-500/10 border border-purple-500/30 px-2 sm:px-2.5 py-0.5 rounded-full font-semibold">
              <Zap size={11} className="mr-1 text-[#9D26FF] dark:text-[#C084FC]" /> Active Ecosystem
            </div>
          </div>

          {/* Code & Service Architecture Snippet */}
          <div className="font-mono text-[11px] sm:text-xs text-gray-300 space-y-1 sm:space-y-1.5 bg-[#04060b]/90 p-3 sm:p-4 rounded-xl border border-white/10 mb-3 sm:mb-4 shadow-inner">
            <div className="flex items-center text-purple-400">
              <span className="text-gray-500 mr-2">01</span>
              <span>const</span>&nbsp;<span className="text-white font-bold">DerixioAgency</span>&nbsp;=&nbsp;&#123;
            </div>
            <div className="flex items-center pl-3 sm:pl-4 text-gray-300">
              <span className="text-gray-500 mr-2">02</span>
              <span>core:</span>&nbsp;<span className="text-[#C084FC]">&quot;Web Dev &amp; Bespoke UI/UX&quot;,</span>
            </div>
            <div className="flex items-center pl-3 sm:pl-4 text-gray-300">
              <span className="text-gray-500 mr-2">03</span>
              <span>amazon:</span>&nbsp;<span className="text-amber-400">&quot;PPC, Listings, A+ &amp; Storefronts&quot;,</span>
            </div>
            <div className="flex items-center pl-3 sm:pl-4 text-gray-300">
              <span className="text-gray-500 mr-2">04</span>
              <span>growth:</span>&nbsp;<span className="text-emerald-400">&quot;SEO, AI Automation &amp; Marketing&quot;</span>
            </div>
            <div className="flex items-center text-purple-400">
              <span className="text-gray-500 mr-2">05</span>
              &#125;;
            </div>
          </div>

          {/* Live Metrics & Conversion ROI Curve Bar */}
          <div className="flex items-center justify-between bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent p-2.5 sm:p-3.5 rounded-2xl border border-purple-500/20">
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#9D26FF] to-[#7C3AED] flex items-center justify-center shadow-lg shrink-0">
                <TrendingUp size={18} className="text-white" />
              </div>
              <div>
                <div className="text-[var(--foreground-heading)] font-extrabold text-xs sm:text-sm flex items-center flex-wrap gap-1">
                  Web &amp; Brand Engineering <span className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded">+340% ROI</span>
                </div>
                <div className="text-[var(--foreground-muted)] text-[10px] sm:text-xs">High-converting web applications &amp; identity</div>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-[#9D26FF] dark:text-[#C084FC] shrink-0 hidden xs:block" />
          </div>
        </motion.div>

        {/* ================= FLOATING CARD 1: AMAZON SERVICES SUITE (Top Right) ================= */}
        <motion.div
          className="absolute -top-6 sm:-top-8 right-0 sm:-right-6 agenko-glass rounded-2xl border border-purple-500/30 p-2.5 sm:p-4 shadow-xl backdrop-blur-xl bg-[var(--card)]/90 w-[185px] sm:w-[250px]"
          style={{ translateZ: 65 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center space-x-2 sm:space-x-3 mb-1.5 sm:mb-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <ShoppingBag size={14} className="text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <div className="text-[var(--foreground-heading)] font-bold text-[11px] sm:text-xs">Amazon Full Suite</div>
              <div className="text-amber-600 dark:text-amber-400 font-extrabold text-[10px] sm:text-xs">PPC • Listings • A+</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[var(--foreground-muted)] pt-1.5 sm:pt-2 border-t border-[var(--border)] font-mono">
            <span className="text-amber-600 dark:text-amber-400 font-semibold">$184,920 Sales</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">+48% Growth</span>
          </div>
        </motion.div>

        {/* ================= FLOATING CARD 2: SEO & DIGITAL MARKETING (Top Left) ================= */}
        <motion.div
          className="absolute -top-7 sm:-top-10 left-0 sm:-left-6 agenko-glass rounded-2xl border border-purple-500/30 p-2.5 sm:p-4 shadow-xl backdrop-blur-xl bg-[var(--card)]/90 w-[180px] sm:w-[240px]"
          style={{ translateZ: 55 }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center space-x-2 sm:space-x-3 mb-1.5 sm:mb-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Search size={14} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <div className="text-[var(--foreground-heading)] font-bold text-[11px] sm:text-xs">SEO &amp; Growth</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px] sm:text-xs">Rank #1 • 100 CWV</div>
            </div>
          </div>
          <div className="w-full bg-[var(--border)] h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 via-purple-500 to-[#9D26FF] h-full w-[94%]" />
          </div>
        </motion.div>

        {/* ================= FLOATING CARD 3: AI AUTOMATION AGENT (Bottom Right) ================= */}
        <motion.div
          className="absolute -bottom-6 sm:-bottom-8 right-0 sm:-right-4 agenko-glass rounded-2xl border border-purple-500/30 p-2.5 sm:p-4 shadow-xl backdrop-blur-xl bg-[var(--card)]/90 w-[180px] sm:w-[240px]"
          style={{ translateZ: 75 }}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
                <Bot size={14} className="text-[#9D26FF] dark:text-[#C084FC]" />
              </div>
              <div>
                <div className="text-[var(--foreground-heading)] font-bold text-[11px] sm:text-xs">AI Workflows</div>
                <div className="text-[#9D26FF] dark:text-[#C084FC] text-[10px] sm:text-[11px]">Automated Lead Funnels</div>
              </div>
            </div>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse shrink-0" />
          </div>
          <div className="text-[9px] sm:text-[10px] text-[var(--foreground-muted)] font-mono bg-purple-500/10 p-1 sm:p-1.5 rounded border border-purple-500/20 text-center">
            24/7 Smart Workflows Connected
          </div>
        </motion.div>

        {/* ================= FLOATING CARD 4: BRANDING & GRAPHIC DESIGN (Bottom Left) ================= */}
        <motion.div
          className="absolute -bottom-7 sm:-bottom-10 left-0 sm:-left-4 agenko-glass rounded-2xl border border-purple-500/30 p-2 sm:p-3.5 shadow-xl backdrop-blur-xl bg-[var(--card)]/90 flex items-center space-x-2 sm:space-x-3"
          style={{ translateZ: 45 }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#9D26FF] to-[#7C3AED] flex items-center justify-center shrink-0">
            <Palette size={14} className="text-white" />
          </div>
          <div>
            <div className="text-[var(--foreground-heading)] font-bold text-[11px] sm:text-xs">Branding &amp; Design</div>
            <div className="text-[var(--foreground-muted)] text-[9px] sm:text-[10px]">Identity • Assets • Social</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Bottom Service Badges Bar */}
      <div className="absolute bottom-1 sm:bottom-2 left-0 right-0 z-20 flex justify-center px-2 sm:px-4 pointer-events-auto">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full py-1 sm:py-1.5 px-2.5 sm:px-3 agenko-glass rounded-full border border-purple-500/30 shadow-lg scale-90 sm:scale-100 bg-[var(--card)]/90">
          {servicePills.map((pill, idx) => (
            <div 
              key={idx}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-muted)] text-[11px] font-semibold whitespace-nowrap hover:border-[#9D26FF] hover:text-[#9D26FF] transition-colors"
            >
              <pill.icon size={12} className="text-[#9D26FF] dark:text-[#C084FC]" />
              <span>{pill.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
