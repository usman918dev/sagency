"use client";
import React, { useEffect, useRef } from "react";

export default function CinematicNightBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const resizeCanvas = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      generateBuildings();
    };

    window.addEventListener("resize", resizeCanvas);

    // 1. Generate Night City Buildings & Windows
    let buildings = [];
    const generateBuildings = () => {
      buildings = [];
      const numBuildings = Math.ceil(width / 45) + 4;
      let currentX = -20;

      for (let i = 0; i < numBuildings; i++) {
        const bWidth = Math.random() * 35 + 30;
        const bHeight = Math.random() * (height * 0.45) + height * 0.25;
        const numWindowsX = Math.floor(bWidth / 8);
        const numWindowsY = Math.floor(bHeight / 14);

        const windows = [];
        for (let wx = 0; wx < numWindowsX; wx++) {
          for (let wy = 0; wy < numWindowsY; wy++) {
            if (Math.random() > 0.4) {
              windows.push({
                relX: 6 + wx * 7,
                relY: 10 + wy * 12,
                color:
                  Math.random() > 0.85
                    ? "rgba(157, 38, 255, " // Purple accent
                    : Math.random() > 0.6
                    ? "rgba(255, 230, 170, " // Warm window
                    : "rgba(200, 225, 255, ", // Cool window
                alpha: Math.random() * 0.4 + 0.2,
                pulseSpeed: Math.random() * 0.01 + 0.003,
                pulseAngle: Math.random() * Math.PI * 2,
              });
            }
          }
        }

        buildings.push({
          x: currentX,
          width: bWidth,
          height: bHeight,
          y: height - bHeight,
          windows,
        });

        currentX += bWidth + Math.random() * 8;
      }
    };

    generateBuildings();

    // 2. Traffic Light Trails (Car Headlights & Taillights)
    const traffic = [];
    const numTraffic = 40;

    for (let i = 0; i < numTraffic; i++) {
      const isWestbound = Math.random() > 0.5;
      traffic.push({
        x: Math.random() * width,
        y: height - 15 + (isWestbound ? -4 : 4),
        speed: (isWestbound ? -1 : 1) * (Math.random() * 1.5 + 1.2),
        length: Math.random() * 25 + 15,
        color: isWestbound
          ? "rgba(255, 60, 60, " // Red taillights
          : "rgba(220, 240, 255, ", // White headlights
        alpha: Math.random() * 0.5 + 0.4,
      });
    }

    // 3. Main Render Loop
    let cameraShift = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Slow cinematic camera pan
      cameraShift += 0.08;
      if (cameraShift > width) cameraShift = 0;

      // Draw Night City Skyline (Deep Silhouettes)
      ctx.fillStyle = "rgba(12, 12, 24, 0.95)";
      for (const b of buildings) {
        ctx.fillRect(b.x, b.y, b.width, b.height);

        // Render Building Glowing Windows
        for (const w of b.windows) {
          w.pulseAngle += w.pulseSpeed;
          const currentAlpha = w.alpha + Math.sin(w.pulseAngle) * 0.15;
          ctx.fillStyle = `${w.color}${Math.max(0.05, currentAlpha)})`;
          ctx.fillRect(b.x + w.relX, b.y + w.relY, 4, 6);
        }
      }

      // Draw Highway Base Line
      ctx.fillStyle = "rgba(10, 10, 20, 0.95)";
      ctx.fillRect(0, height - 25, width, 25);

      // Draw Traffic Light Trails
      for (const t of traffic) {
        t.x += t.speed;
        if (t.speed > 0 && t.x - t.length > width) t.x = -t.length;
        if (t.speed < 0 && t.x + t.length < 0) t.x = width + t.length;

        const grad = ctx.createLinearGradient(t.x - t.speed * 8, t.y, t.x, t.y);
        grad.addColorStop(0, `${t.color}0)`);
        grad.addColorStop(1, `${t.color}${t.alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(t.x - t.speed * 12, t.y);
        ctx.lineTo(t.x, t.y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden isolate">
      {/* Background Canvas (City & Traffic Light Trails) */}
      <canvas ref={canvasRef} className="w-full h-full block opacity-20 dark:opacity-30 transition-opacity duration-300" />

      {/* Theme-Aware Soft Overlay (8-15% visibility, text remains 100% readable in Light & Dark modes) */}
      <div className="absolute inset-0 bg-[var(--background)]/85 dark:bg-[var(--background)]/80 pointer-events-none backdrop-blur-[1px] transition-colors duration-300" />

      {/* Ambient Purple Glow Accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9D26FF]/10 rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
}
