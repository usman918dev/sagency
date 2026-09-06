"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Mockup, { DevMockup, DigitalMockup, LandingMockup, AmazonPPCMockup, VideoEditingMockup } from '@/ui/mockup/Mockup';
import { Cpu } from 'lucide-react';

const mockupMap = {
  AmazonPPCMockup,
  DevMockup,
  Mockup,
  LandingMockup,
  DigitalMockup,
  VideoEditingMockup,
};

const ServiceOverview = ({ description, techStack = [], mockupSlot }) => {
  const MockupComponent = mockupMap[mockupSlot] || Mockup;

  return (
    <section className="py-20 sm:py-24 px-6 bg-[var(--background)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative Copy & Tech Stack Tags */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div
              className="prose text-[var(--foreground)] prose-lg max-w-none 
                         prose-p:text-[var(--foreground-muted)] prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg
                         prose-headings:text-[var(--foreground-heading)] prose-headings:font-extrabold prose-headings:tracking-tight
                         prose-strong:text-[#9D26FF] prose-strong:font-semibold
                         prose-a:text-[#9D26FF] hover:prose-a:text-[#8500ED] transition-colors"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {techStack && techStack.length > 0 && (
              <div className="pt-4 border-t border-[var(--border)]">
                <div className="flex items-center space-x-2 text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4">
                  <Cpu size={16} />
                  <span>Tools & Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] shadow-sm hover:border-[#9D26FF]/60 hover:text-[#9D26FF] transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column: Visual Mockup Slot */}
          <motion.div
            className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)] bg-[var(--card)]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <MockupComponent />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
