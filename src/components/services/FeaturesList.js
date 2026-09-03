"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Film, Zap, Sparkles, Play, ShoppingBag, 
  TrendingUp, Code, Search, Palette, Globe, BarChart 
} from 'lucide-react';

const iconMap = {
  Film,
  Zap,
  Sparkles,
  Play,
  ShoppingBag,
  TrendingUp,
  Code,
  Search,
  Palette,
  Globe,
  BarChart,
  CheckCircle2
};

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
    <section className="py-24 px-6 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-3">Derixio Capabilities</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground-heading)]">What We Deliver</h2>
          <p className="text-[var(--foreground-muted)] mt-4 max-w-2xl mx-auto leading-relaxed">
            A comprehensive suite of capabilities designed to provide maximum performance and measurable return on investment.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => {
            const IconComponent = (feature.icon && iconMap[feature.icon]) ? iconMap[feature.icon] : CheckCircle2;
            
            return (
              <motion.div
                key={index}
                className="bg-[var(--card)] backdrop-blur-md border border-[var(--border)] rounded-3xl p-8 text-center group transition-all duration-300 hover:border-[#9D26FF]/60 hover:bg-[var(--card)] shadow-xl flex flex-col justify-between h-full"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}
              >
                <div>
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-[var(--background-alt)] rounded-2xl flex items-center justify-center border border-[var(--border)] group-hover:border-[#9D26FF] transition-all duration-300 shadow-md group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-[#9D26FF] group-hover:to-[#7C3AED]">
                      <IconComponent className="w-8 h-8 text-[#9D26FF] group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground-heading)] mb-3">{feature.title}</h3>
                  <p className="text-[var(--foreground-muted)] text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesList;
