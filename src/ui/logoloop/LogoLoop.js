"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

// Logo component
function Logo({ src, alt }) {
  return (
    <div className="w-32 h-12 transition-transform duration-300 hover:scale-105 flex items-center justify-center bg-white rounded-full px mx-4">
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default function ProfessionalBadgeTicker() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const logos = Array.from({ length: 25 }, (_, i) => ({
    src: `/LOGO/${i + 1}.png`,
    alt: `Logo ${i + 1}`
  }));

  const rowCount = 3;
  const logosPerRow = Math.ceil(logos.length / rowCount);

  // Split logos into rows
  const rows = Array.from({ length: rowCount }, (_, i) =>
    logos.slice(i * logosPerRow, (i + 1) * logosPerRow)
  );

  return (
    <div
      ref={sectionRef}
      className="w-full py-12 overflow-hidden bg-[#1c2131] rounded-2xl opacity-0">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-center text-4xl font-bold text-white mb-10">
          Join our <span className="text-orange-500">1500+</span> happy customers
        </h2>
        <div className="flex flex-col space-y-8">
          {rows.map((row, rowIndex) => {
            const isForward = rowIndex % 2 === 0;
            const duration = 40;

            return (
              <div
                key={rowIndex}
                className="relative flex items-center overflow-hidden w-full"
              >
                <div
                  className="flex badge-track"
                  style={{
                    animation: `${isForward ? "scroll-fwd" : "scroll-bwd"} ${duration}s linear infinite`
                  }}
                >
                  {[...row, ...row].map((logo, i) => (
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
        .badge-track:hover {
          animation-play-state: paused !important;
        }
        
        .animate-slide-in {
          animation: slideIn 1s forwards;
        }
        
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
