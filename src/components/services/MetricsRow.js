"use client";
import React from 'react';
import { motion } from 'framer-motion';

const MetricsRow = ({ metrics }) => {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="py-12 px-6 bg-[var(--background-alt)] border-y border-[var(--border)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:border-[#9D26FF]/50 transition-all duration-300 group flex flex-col justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#9D26FF] to-[#C084FC] mb-2 drop-shadow-sm">
                {metric.value}
              </span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[var(--foreground-heading)] group-hover:text-[#9D26FF] transition-colors">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsRow;
