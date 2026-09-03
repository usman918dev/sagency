"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SectionHeader({
  title = "Services",
  description = "Strategic digital services — from creative design to growth-focused ads. We build, launch and optimize.",
  buttonText,
  onButtonClick,
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <section
      className="relative px-6 py-20 text-center bg-[var(--background-alt)] border-b border-[var(--border)] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-[var(--foreground-heading)] mb-6"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-xl md:text-2xl text-[var(--foreground-muted)] mb-8 max-w-3xl mx-auto"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.9, 0.3, 1] }}
        >
          {description}
        </motion.p>

        {/* Optional Button */}
        {buttonText && onButtonClick && (
          <motion.button
            onClick={onButtonClick}
            className="inline-flex items-center px-8 py-4 bg-[#9D26FF] hover:bg-[#8500ED] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.9, 0.3, 1] }}
            whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
          >
            {buttonText}
          </motion.button>
        )}
      </div>
    </section>
  );
}
