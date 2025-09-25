"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SectionHeader({
  title = "Services",
  description = "Strategic digital services — from creative design to growth-focused ads. We build, launch and optimize.",
  buttonText,
  onButtonClick,
  gradient = "from-[#1b2439] via-[#16213e] to-[#1b2439]", // customizable background gradient
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <section
      className={`relative px-6 py-20 text-center bg-gradient-to-r ${gradient} overflow-hidden`}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-white mb-6"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
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
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
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
