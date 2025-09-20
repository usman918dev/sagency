"use client";
import React from "react";
import {
  Atom,
  Box,
  Boxes,
  Wind,
  Server,
  Database,
  Code,
  Type,
  FileCode,
  Brain,
  Figma,
  GitBranch,
} from "lucide-react";


// Badge component with dynamic colors and icons
function Badge({ text, icon: Icon, color }) {
  return (
    <div
      className="flex items-center justify-center w-36 h-16 space-x-2 text-white px-4 py-2 rounded-4xl shadow-lg whitespace-nowrap transition-transform duration-300 hover:scale-105"
      style={{
        backgroundColor: color + "20", // light transparent background
        border: `1px solid ${color}50`,
      }}
    >
      {Icon && (
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full"
          style={{ backgroundColor: color }}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>
      )}
      <span className="font-medium">{text}</span>
    </div>
  );
}

export default function ProfessionalBadgeTicker() {
const badges = [
  { text: "React", icon: Atom, color: "#61DAFB" },
  { text: "Next.js", icon: Box, color: "#000000" },
  { text: "Tailwind", icon: Wind, color: "#38BDF8" },
  { text: "Node.js", icon: Server, color: "#83CD29" },
  { text: "MongoDB", icon: Database, color: "#4DB33D" },
  { text: "GraphQL", icon: Code, color: "#E535AB" },
  { text: "TypeScript", icon: Type, color: "#3178C6" },
  { text: "JavaScript", icon: FileCode, color: "#F7DF1E" },
  { text: "Python", icon: Brain, color: "#3776AB" },
  { text: "Figma", icon: Figma, color: "#F24E1E" },
  { text: "Git", icon: GitBranch, color: "#F05032" },
  { text: "Docker", icon: Boxes, color: "#0DB7ED" },
];



  const rowCount = 2;
  const badgesPerRow = 6;

  // Split badges into rows
  const rows = Array.from({ length: rowCount }, (_, i) =>
    badges.slice(i * badgesPerRow, (i + 1) * badgesPerRow)
  );

  return (
    <div className="w-full relative py-12 overflow-hidden">
      <div className="absolute inset-0"></div>
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        {rows.map((row, rowIndex) => {
          const isForward = rowIndex === 0;
          const duration = 30; // lower = faster scroll

          return (
            <div
              key={rowIndex}
              className="relative flex items-center mb-6 overflow-hidden w-full"
            >
              <div
                className="flex space-x-6 badge-track"
                style={{
                  animation: `${isForward ? "scroll-fwd" : "scroll-bwd"} ${duration}s linear infinite`,
                }}
              >
                {/* Duplicate row twice for seamless loop */}
                {[...row, ...row].map((badge, i) => (
                  <Badge
                    key={`badge-${rowIndex}-${i}`}
                    text={badge.text}
                    icon={badge.icon}
                    color={badge.color}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Infinite Scroll Animations */}
      <style jsx>{`
        @keyframes scroll-fwd {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-bwd {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        /* Pause animation on hover */
        .badge-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}
