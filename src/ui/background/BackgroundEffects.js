"use client";
import React from "react";

const FullGradientBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* ===== LAYER 1: BASE BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#121826] to-[#0B0F19]" />

      {/* ===== LAYER 2: TOP TO BOTTOM COLOR FLOW ===== */}
      <div className="absolute top-0 left-0 w-full h-[150vh] bg-gradient-to-br from-[#0B0F19] via-[#1E1B4B] to-[#020617] opacity-90 animate-pulse" />

      {/* ===== LAYER 3: HORIZONTAL BLEND ===== */}
      <div className="absolute top-0 left-0 w-full h-[150vh] bg-gradient-to-r from-[#08375D] via-[#0A223E] to-[#F25725] opacity-80 mix-blend-overlay animate-[fadeMove_10s_ease-in-out_infinite]" />

      {/* ===== LAYER 4: REVERSE GRADIENT ===== */}
      <div className="absolute top-0 left-0 w-full h-[150vh] bg-gradient-to-l from-[#021B33] via-[#08375D] to-[#F25725] opacity-70 mix-blend-overlay animate-[fadeMoveReverse_12s_ease-in-out_infinite]" />

      {/* ===== ANIMATED BLUR BLOBS ===== */}
      <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-[#08375D]/40 rounded-full blur-[120px] animate-blob" />
      <div className="absolute top-[60%] right-[10%] w-[350px] h-[350px] bg-[#F25725]/40 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      <div className="absolute bottom-[15%] left-[35%] w-[300px] h-[300px] bg-[#0A223E]/40 rounded-full blur-[120px] animate-blob animation-delay-4000" />

      {/* ===== SUBTLE GRID OVERLAY ===== */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    </div>
  );
};

export default FullGradientBackground;
