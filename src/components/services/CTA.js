"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CTA = () => {
  return (
    <motion.section
      className="py-24 px-6 bg-[var(--background)] border-t border-[var(--border)] relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#9D26FF]/20 to-transparent rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#7C3AED]/20 to-transparent rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground-heading)] mb-4">
          Ready to <span className="text-[#9D26FF]">Scale</span> Your Enterprise?
        </h2>
        <p className="text-[var(--foreground-muted)] text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Partner with Derixio today for a high-impact strategy consultation and see how our digital engineering can drive customer growth.
        </p>
        <Link href="/contact">
          <motion.span
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] hover:from-[#8B5CF6] hover:to-[#6D28D9] text-white font-semibold rounded-full shadow-xl shadow-purple-950/50 transition-all duration-300 group text-sm"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Get a Free Consultation
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </motion.span>
        </Link>
      </div>
    </motion.section>
  );
};

export default CTA;
