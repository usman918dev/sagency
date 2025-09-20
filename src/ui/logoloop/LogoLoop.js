// src/components/BadgeTicker.jsx
"use client";
import React from "react";
import AnimatedWaveBg from "../Svg";

// The Badge component for styling individual badges
function Badge({ text, icon: Icon }) {
  return (
    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg border border-white/20 text-white px-4 py-2 rounded-full shadow-lg whitespace-nowrap transition-transform duration-300 hover:scale-105 hover:bg-white/20">
      {Icon && <Icon className="w-5 h-5" />}
      <span>{text}</span>
    </div>
  );
}

// Main ProfessionalBadgeTicker component
export default function ProfessionalBadgeTicker() {
  const badges = [
    { text: "React" },
    { text: "Next.js" },
    { text: "Tailwind" },
    { text: "Node.js" },
    { text: "MongoDB" },
    { text: "GraphQL" },
    { text: "TypeScript" },
    { text: "JavaScript" },
    { text: "Python" },
    { text: "Figma" },
    { text: "Git" },
    { text: "Docker" },
  ];

  const rowCount = 2;
  const badgesPerRow = 6;

  // Split badges into two rows
  const rows = Array.from({ length: rowCount }, (_, i) =>
    badges.slice(i * badgesPerRow, (i + 1) * badgesPerRow)
  );

  return (
    <div>

      <div className="w-full relative py-12 overflow-hidden">
      {/* <AnimatedWaveBg className="absolute top-0 left-0 w-full h-full" /> */}

        <div className="absolute inset-0"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center mb-10">
            Our Tech Stack
          </h2>

          {rows.map((row, rowIndex) => {
            const isForward = rowIndex === 0;
            const duration = 40; // in seconds, controls speed

            return (
              <div
                key={rowIndex}
                className={`relative flex items-center mb-6 overflow-hidden`}
              >
                <div
                  className={`flex space-x-6 badge-track`}
                  style={{
                    animation: `${isForward ? 'scroll-fwd' : 'scroll-bwd'} ${duration}s linear infinite`,
                    animationPlayState: 'running',
                  }}
                >
                  {/* Duplicate the row for seamless looping */}
                  {[...row, ...row].map((badge, i) => (
                    <Badge key={`badge-${rowIndex}-${i}`} text={badge.text} icon={badge.icon} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CSS for animations */}
        <style jsx>{`
        @keyframes scroll-fwd {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-bwd {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0%);
          }
        }
        .badge-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>
      </div>
    </div>

  );
}