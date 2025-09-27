"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const FeaturesList = ({ features }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-24 px-6 bg-[#181d2b]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">What We Deliver</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A comprehensive suite of features designed to provide maximum value and drive results for your business.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center group transition-all duration-300 hover:bg-gray-900 hover:border-[#F25725]/50"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#F25725]/10 rounded-full flex items-center justify-center border-2 border-[#F25725]/30 group-hover:border-[#F25725]/80 transition-all duration-300">
                  <CheckCircle2 className="w-8 h-8 text-[#F25725]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesList;
