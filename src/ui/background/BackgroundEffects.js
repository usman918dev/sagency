"use client";
import React from 'react';

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[100px] animate-pulse delay-1000" />
      <div className="absolute bottom-1/4 left-1/2 w-[600px] h-[600px] bg-indigo-500/30 rounded-full blur-[150px] animate-pulse delay-2000" />
      
      {/* Animated Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-blob animate-blob" />
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-blob animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-blob animate-blob animation-delay-4000" />
      </div>

      {/* Geometric Shapes */}
      <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'rgba(59, 130, 246, 0.2)' }} />
            <stop offset="100%" style={{ stopColor: 'rgba(147, 51, 234, 0.2)' }} />
          </linearGradient>
        </defs>
        <g className="animate-float">
          <path d="M100,100 L150,50 L200,100 L150,150 Z" fill="url(#grad1)" className="animate-blob" />
          <circle cx="80%" cy="20%" r="50" fill="rgba(168, 85, 247, 0.2)" className="animate-blob animation-delay-2000" />
          <rect x="20%" y="70%" width="100" height="100" rx="20" fill="rgba(59, 130, 246, 0.2)" className="animate-blob animation-delay-4000" />
        </g>
      </svg>

      {/* Light Grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} 
        />
      </div>
    </div>
  );
};

export default BackgroundEffects;