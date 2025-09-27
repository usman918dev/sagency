"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CTA = () => {
  return (
    <motion.section 
      className="py-24 px-6 bg-[#1c2131] border-t border-gray-800/50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#F25725]/10 to-transparent rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#1b2439]/20 to-transparent rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F25725] to-[#ff6b35]">Elevate</span> Your Brand?
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Let&apos;s build something amazing together. Contact us today for a free consultation and find out how our services can help you achieve your business goals.
        </p>
        <Link href="/contact">
          <motion.span
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white font-semibold rounded-full shadow-lg shadow-[#F25725]/25 hover:shadow-xl hover:shadow-[#F25725]/40 transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            Get in Touch
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </motion.span>
        </Link>
      </div>
    </motion.section>
  );
};

export default CTA;
