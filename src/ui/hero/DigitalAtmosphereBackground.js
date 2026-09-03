"use client";
import React, { useEffect, useRef } from "react";

export default function DigitalAtmosphereBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Mouse Tracking for Multi-Layer Parallax
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const resizeCanvas = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resizeCanvas);

    // Helper: Detect Light Theme vs Dark Theme
    const isLightMode = () => {
      return (
        document.documentElement.classList.contains("light") ||
        document.documentElement.getAttribute("data-theme") === "light"
      );
    };

    // 1. Layer 1: 4 Large Animated Gradient Orbs (100% Derixio Purple / Violet Palette — ZERO Blue)
    const orbs = [
      {
        angle: 0,
        speed: 0.003,
        radius: 400,
        baseX: 0.2,
        baseY: 0.3,
        colorDark: "rgba(157, 38, 255, ",  // Brand Purple #9D26FF
        colorLight: "rgba(157, 38, 255, ",
      },
      {
        angle: Math.PI * 0.5,
        speed: 0.002,
        radius: 440,
        baseX: 0.8,
        baseY: 0.45,
        colorDark: "rgba(168, 85, 247, ",  // Lavender Purple #A855F7
        colorLight: "rgba(168, 85, 247, ",
      },
      {
        angle: Math.PI,
        speed: 0.0025,
        radius: 350,
        baseX: 0.45,
        baseY: 0.75,
        colorDark: "rgba(139, 92, 246, ",  // Violet #8B5CF6
        colorLight: "rgba(139, 92, 246, ",
      },
      {
        angle: Math.PI * 1.5,
        speed: 0.0035,
        radius: 320,
        baseX: 0.85,
        baseY: 0.2,
        colorDark: "rgba(192, 132, 252, ",  // Light Purple #C084FC
        colorLight: "rgba(192, 132, 252, ",
      },
    ];

    // 2. Layer 2: Floating Particles (Purple & Lavender ONLY)
    const isMobile = window.innerWidth < 768;
    const numParticles = isMobile ? 38 : 85;
    const particles = [];

    for (let i = 0; i < numParticles; i++) {
      const sizeSeed = Math.random();
      const radius = sizeSeed > 0.88 ? Math.random() * 2.8 + 2.5 : sizeSeed > 0.5 ? Math.random() * 1.5 + 1.2 : Math.random() * 1.0 + 0.8;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.1, // Slow drift
        alpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseAngle: Math.random() * Math.PI * 2,
      });
    }

    // 3. Layer Animation Phases
    let wavePhase = 0;
    let gridOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const light = isLightMode();

      // Smooth Mouse Lerp (0.04 factor for 3D depth feeling)
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      const mouseOffsetX = (mouse.x - width / 2) * 0.06;
      const mouseOffsetY = (mouse.y - height / 2) * 0.06;

      // ==========================================
      // LAYER 1: Animated Purple/Lavender Atmospheric Orbs
      // ==========================================
      const isMobileScreen = width < 768;

      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        orb.angle += orb.speed;

        const orbX = width * orb.baseX + Math.sin(orb.angle) * 75 + mouseOffsetX * (0.3 + i * 0.1);
        const orbY = height * orb.baseY + Math.cos(orb.angle * 0.8) * 55 + mouseOffsetY * (0.3 + i * 0.1);

        const gradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orb.radius);
        const baseColor = light ? orb.colorLight : orb.colorDark;

        // Toned down on mobile light mode (0.12 vs 0.38) for clean soft white background with subtle purple tint
        const alphaCenter = light ? (isMobileScreen ? "0.12" : "0.38") : "0.24";
        const alphaMid = light ? (isMobileScreen ? "0.04" : "0.18") : "0.10";

        gradient.addColorStop(0, `${baseColor}${alphaCenter})`);
        gradient.addColorStop(0.45, `${baseColor}${alphaMid})`);
        gradient.addColorStop(1, `${baseColor}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orbX, orbY, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ==========================================
      // LAYER 2: Animated Digital Perspective Grid (Purple Tinted)
      // ==========================================
      gridOffset = (gridOffset + 0.18) % 40;
      ctx.strokeStyle = light
        ? (isMobileScreen ? "rgba(157, 38, 255, 0.04)" : "rgba(157, 38, 255, 0.10)")
        : "rgba(157, 38, 255, 0.11)";
      ctx.lineWidth = 1;

      const gridSpacing = 45;
      const gridParallaxX = mouseOffsetX * 0.2;
      const gridParallaxY = mouseOffsetY * 0.2;

      // Vertical Grid Lines
      for (let x = (gridParallaxX % gridSpacing); x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal Moving Grid Lines
      for (let y = (gridOffset + gridParallaxY) % gridSpacing; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // ==========================================
      // LAYER 3: Flowing Purple/Lavender Wave Curves
      // ==========================================
      wavePhase += 0.007;
      const waveLines = 4;

      for (let w = 0; w < waveLines; w++) {
        ctx.beginPath();
        ctx.lineWidth = w === 0 ? 2.0 : 1.4;

        const waveGrad = ctx.createLinearGradient(0, 0, width, 0);
        if (light) {
          const waveAlpha1 = isMobileScreen ? (0.12 - w * 0.02) : (0.45 - w * 0.08);
          const waveAlpha2 = isMobileScreen ? (0.10 - w * 0.02) : (0.40 - w * 0.07);
          waveGrad.addColorStop(0, "rgba(157, 38, 255, 0)");
          waveGrad.addColorStop(0.35, `rgba(157, 38, 255, ${Math.max(0, waveAlpha1)})`);
          waveGrad.addColorStop(0.7, `rgba(168, 85, 247, ${Math.max(0, waveAlpha2)})`);
          waveGrad.addColorStop(1, "rgba(192, 132, 252, 0)");
        } else {
          waveGrad.addColorStop(0, "rgba(157, 38, 255, 0)");
          waveGrad.addColorStop(0.35, `rgba(157, 38, 255, ${0.50 - w * 0.08})`);
          waveGrad.addColorStop(0.7, `rgba(168, 85, 247, ${0.45 - w * 0.07})`);
          waveGrad.addColorStop(1, "rgba(192, 132, 252, 0)");
        }

        ctx.strokeStyle = waveGrad;

        // Diagonal growth curve slope + sine wave
        const yStart = height * (0.32 + w * 0.12) + Math.sin(wavePhase + w) * 28 + mouseOffsetY * 0.4;
        const cp1x = width * 0.3 + Math.cos(wavePhase * 0.7 + w) * 55;
        const cp1y = yStart - 55 + Math.sin(wavePhase * 1.2 + w) * 40;
        const cp2x = width * 0.7 + Math.sin(wavePhase * 0.9 + w) * 55;
        const cp2y = yStart + 40 + Math.cos(wavePhase * 1.3 + w) * 40;
        const yEnd = height * (0.22 + w * 0.12) + Math.sin(wavePhase * 0.8) * 22;

        ctx.moveTo(-50, yStart);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width + 50, yEnd);
        ctx.stroke();
      }

      // ==========================================
      // LAYER 4: Constellation Particle Connectors (Purple & Lavender)
      // ==========================================
      const maxConnectDistance = 90;
      const particleParallaxX = mouseOffsetX * 0.5;
      const particleParallaxY = mouseOffsetY * 0.5;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;
        p1.pulseAngle += p1.pulseSpeed;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        const p1x = p1.x + particleParallaxX;
        const p1y = p1.y + particleParallaxY;

        // Faint purple connecting lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const p2x = p2.x + particleParallaxX;
          const p2y = p2.y + particleParallaxY;

          const dx = p1x - p2x;
          const dy = p1y - p2y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDistance) {
            const lineAlpha = (1 - dist / maxConnectDistance) * (light ? 0.30 : 0.28);
            ctx.strokeStyle = light
              ? `rgba(157, 38, 255, ${lineAlpha})`
              : `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(p1x, p1y);
            ctx.lineTo(p2x, p2y);
            ctx.stroke();
          }
        }

        // Render Particle Nodes (Brand Purple & Lavender)
        const currentAlpha = p1.alpha + Math.sin(p1.pulseAngle) * 0.20;
        ctx.beginPath();
        ctx.arc(p1x, p1y, p1.radius, 0, Math.PI * 2);

        if (light) {
          ctx.fillStyle = `rgba(157, 38, 255, ${Math.max(0.25, currentAlpha)})`;
        } else {
          ctx.fillStyle = `rgba(216, 180, 254, ${Math.max(0.30, currentAlpha)})`;
          if (p1.radius > 2) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = "rgba(157, 38, 255, 0.8)";
          }
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden isolate">
      {/* Full Multi-Layer Animated Purple Atmosphere Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Theme Readability Mask (Soft White + Purple in Light mode, Deep Navy + Purple in Dark mode) */}
      <div className="absolute inset-0 bg-[var(--background)]/40 dark:bg-[var(--background)]/60 pointer-events-none transition-colors duration-300" />
    </div>
  );
}
