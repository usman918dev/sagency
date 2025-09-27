"use client";
import React from 'react';
import { motion } from 'framer-motion';

const ServiceDescription = ({ description }) => {
    console.log(description);
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#1c2131] to-[#181d2b]">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="prose text-white prose-lg prose-invert max-w-none 
                     prose-p:text-white prose-p:leading-relaxed
                     prose-headings:text-white prose-headings:font-bold
                     prose-strong:text-[#F25725] prose-strong:font-semibold
                     prose-a:text-[#F25725] hover:prose-a:text-[#ff6b35] transition-colors"
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
