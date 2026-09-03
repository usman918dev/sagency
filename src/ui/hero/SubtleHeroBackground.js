"use client";
import React, { useEffect, useRef } from 'react';

export default function SubtleHeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create 35 slow-moving tiny particles/dust dots
    const particles = [];
    const numParticles = 35;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        color: i % 2 === 0 ? 'rgba(157, 38, 255, ' : 'rgba(168, 85, 247, ',
        baseAlpha: Math.random() * 0.2 + 0.05,
        alphaPulseSpeed: Math.random() * 0.015 + 0.005,
        alphaAngle: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2 - 0.08, // slow upward drift
      });
    }

    // Abstract thin moving lines
    let linePhase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // 1. Draw 2 thin moving abstract wave lines (5-10% opacity)
      linePhase += 0.003;
      ctx.lineWidth = 1;

      // Line 1
      ctx.beginPath();
      const grad1 = ctx.createLinearGradient(0, 0, width, 0);
      grad1.addColorStop(0, 'rgba(157, 38, 255, 0)');
      grad1.addColorStop(0.5, 'rgba(157, 38, 255, 0.08)');
      grad1.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.strokeStyle = grad1;

      ctx.moveTo(0, height * 0.4 + Math.sin(linePhase) * 20);
      ctx.bezierCurveTo(
        width * 0.3, height * 0.25 + Math.cos(linePhase * 0.8) * 30,
        width * 0.7, height * 0.55 + Math.sin(linePhase * 1.2) * 30,
        width, height * 0.35 + Math.cos(linePhase) * 20
      );
      ctx.stroke();

      // Line 2
      ctx.beginPath();
      const grad2 = ctx.createLinearGradient(0, 0, width, 0);
      grad2.addColorStop(0, 'rgba(59, 130, 246, 0)');
      grad2.addColorStop(0.5, 'rgba(168, 85, 247, 0.07)');
      grad2.addColorStop(1, 'rgba(157, 38, 255, 0)');
      ctx.strokeStyle = grad2;

      ctx.moveTo(0, height * 0.6 + Math.cos(linePhase * 0.7) * 25);
      ctx.bezierCurveTo(
        width * 0.35, height * 0.7 + Math.sin(linePhase) * 35,
        width * 0.65, height * 0.35 + Math.cos(linePhase * 1.1) * 35,
        width, height * 0.55 + Math.sin(linePhase * 0.9) * 25
      );
      ctx.stroke();

      // 2. Draw & update tiny floating dust particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.alphaAngle += p.alphaPulseSpeed;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.baseAlpha + Math.sin(p.alphaAngle) * 0.05;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.02, currentAlpha)})`;
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(157, 38, 255, 0.4)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden isolate">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
