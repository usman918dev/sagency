"use client";
import React from 'react';
import { motion } from 'framer-motion';

const ServiceDescription = ({ description }) => {
  return (
    <section className="py-24 px-6 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="text-center prose text-[var(--foreground)] prose-lg max-w-none 
                     prose-p:text-[var(--foreground-muted)] prose-p:leading-relaxed prose-p:max-w-3xl prose-p:mx-auto
                     prose-headings:text-[var(--foreground-heading)] prose-headings:font-bold prose-headings:text-center
                     prose-strong:text-[#9D26FF] prose-strong:font-semibold
                     prose-a:text-[#9D26FF] hover:prose-a:text-[#8500ED] transition-colors"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </section>
  );
};

export default ServiceDescription;
