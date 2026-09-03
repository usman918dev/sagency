"use client";
import Image from "next/image";
import React from "react";

function Logo({ src, alt }) {
  return (
    <div className="w-36 h-14 shrink-0 transition-all duration-300 hover:scale-105 flex items-center justify-center bg-[var(--card)] border border-[var(--border)] hover:border-[#9D26FF]/60 rounded-2xl px-4 mx-3 shadow-sm group">
      <div className="relative w-full h-full opacity-85 group-hover:opacity-100 transition-all duration-300">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain p-1.5 dark:filter dark:invert dark:brightness-200 dark:contrast-125"
        />
      </div>
    </div>
  );
}

export default function ProfessionalBadgeTicker() {
  const logos = Array.from({ length: 25 }, (_, i) => ({
    src: `/LOGO/${i + 1}.png`,
    alt: `Partner Brand ${i + 1}`
  }));

  const rowCount = 2;
  const logosPerRow = Math.ceil(logos.length / rowCount);
  const rows = Array.from({ length: rowCount }, (_, i) =>
    logos.slice(i * logosPerRow, (i + 1) * logosPerRow)
  );

  return (
    <div className="w-full py-16 bg-[var(--background-alt)] relative overflow-hidden">
      <div className="g-px">
        <div className="text-center mb-10">
          <p className="text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-2">
            TRUSTED BY GLOBAL LEADERS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground-heading)]">
            Powering <span className="text-[#9D26FF]">1500+ High-Growth</span> Brands Worldwide
          </h2>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Side Fade Gradient Masks */}
          <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[var(--background-alt)] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[var(--background-alt)] to-transparent z-10 pointer-events-none" />

          <div className="flex flex-col space-y-5">
            {rows.map((row, rowIndex) => {
              const isForward = rowIndex % 2 === 0;
              const duration = 35;

              return (
                <div
                  key={rowIndex}
                  className="relative flex items-center overflow-hidden w-full py-1"
                >
                  <div
                    className="flex badge-track"
                    style={{
                      animation: `${isForward ? "scroll-fwd" : "scroll-bwd"} ${duration}s linear infinite`
                    }}
                  >
                    {[...row, ...row, ...row].map((logo, i) => (
                      <Logo
                        key={`logo-${rowIndex}-${i}`}
                        src={logo.src}
                        alt={logo.alt}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-fwd {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        @keyframes scroll-bwd {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .badge-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}
