"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Portfolio Card Component - tailored for marquee layout
const PortfolioCard = ({ project }) => {
  const imageUrl = encodeURI(project.image);

  return (
    <motion.div
      className="group relative flex-shrink-0 w-[260px] sm:w-[300px] lg:w-[340px] h-[320px] rounded-3xl overflow-hidden border border-white/5 bg-white/5"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-110"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60 mb-3">
          {project.category}
        </span>
        <h3 className="text-xl font-semibold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-white/70 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#F25725]/0 via-[#F25725]/20 to-[#ff6b35]/30" />
      <div className="pointer-events-none absolute -bottom-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-[#F25725]/40 blur-3xl opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
    </motion.div>
  );
};

// Auto-scrolling marquee row for portfolio cards
const PortfolioRow = ({ projects, speed = 28, direction = 'left' }) => {
  const duplicatedProjects = [...projects, ...projects];

  return (
    <div className="relative overflow-hidden py-6">
      <motion.div
        className="flex gap-6 sm:gap-8"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {duplicatedProjects.map((project, index) => (
          <PortfolioCard key={`${project.id}-${index}`} project={project} />
        ))}
      </motion.div>

      {/* Edge fades to hint at scrolling */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#1c2131] via-[#1c2131]/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#1c2131] via-[#1c2131]/80 to-transparent" />
    </div>
  );
};

// Main Portfolio Page Component
const PortfolioPage = () => {
  const rows = 3;
  const rowsData = Array.from({ length: rows }, (_, rowIndex) =>
    portfolioData.filter((_, projectIndex) => projectIndex % rows === rowIndex)
  );

  return (
    <main className="min-h-screen bg-[#1c2131] overflow-hidden">
      {/* Portfolio Section */}
      <section className="relative py-32 px-6">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Glowing Gradient Blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#F25725]/20 to-[#ff6b35]/10 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#1b2439]/30 to-[#16213e]/20 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Decorative Ring in Corner */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 z-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full border-4 border-[#F25725]/40 border-dashed rounded-full"></div>
        </motion.div>

        {/* Main Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[#F25725] text-sm font-bold uppercase tracking-wider mb-4">
              Portfolio
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Visual Media
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F25725] to-[#ff6b35]">
                Gallery
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Explore our curated collection of digital experiences. Each project tells a unique story 
              of innovation, creativity, and technical excellence. Hover to discover the details behind each creation.
            </p>
          </motion.div>

          {/* Moving rows of portfolio cards */}
          <div className="space-y-6">
            {rowsData.map((projects, rowIndex) => (
              <PortfolioRow
                key={`portfolio-row-${rowIndex}`}
                projects={projects}
                speed={24 + rowIndex * 4}
                direction={rowIndex % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>

          {/* Portfolio Stats - Clean and Minimal */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-12 py-6">
              {[
                { number: "100+", label: "Projects" },
                { number: "50+", label: "Clients" },
                { number: "5+", label: "Years" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-2xl font-bold text-[#F25725] mb-1">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action - Simplified */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Like What You See?
            </h3>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Let&apos;s discuss your next project and create something extraordinary together.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white font-semibold rounded-full shadow-lg shadow-[#F25725]/25 hover:shadow-xl hover:shadow-[#F25725]/40 transition-all duration-300 hover:scale-105 group">
              <span>Start a Project</span>
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default PortfolioPage;



// Portfolio data assembled from assets library
const fileNames = [
  'p (1).jpg',
  'p (1).png',
  'p (2).jpg',
  'p (2).png',
  'p (3).jpg',
  'p (3).png',
  'p (4).jpg',
  'p (4).png',
  'p (5).jpg',
  'p (6).jpg',
  'p (7).jpg',
  'p (8).jpeg',
  'p (9).jpeg',
  'p (10).jpeg',
  'p (11).jpeg',
  'p (12).jpeg',
  'p (13).jpeg',
  'p (14).jpeg',
  'p (15).jpeg',
  'p (16).jpeg',
  'p (17).jpeg',
  'p (18).jpeg',
  'p (19).jpeg',
  'p (20).jpeg',
  'p (21).jpeg'
];

const descriptorPool = [
  {
    title: 'Immersive Landing Page',
    description: 'Full-fidelity hero concept engineered for high-impact product launches.'
  },
  {
    title: 'Brand Narrative System',
    description: 'Holistic identity suite balancing typography, motion, and color storytelling.'
  },
  {
    title: 'Product UX Canvas',
    description: 'Composable UI kit optimised for SaaS dashboards and data-rich workflows.'
  },
  {
    title: 'Experiential Campaign',
    description: 'Interactive campaign journey blending digital touchpoints and premium visuals.'
  },
  {
    title: 'Commerce Accelerator',
    description: 'Conversion-focused storefront with adaptive merchandising experiences.'
  },
  {
    title: 'Editorial Microsite',
    description: 'Story-driven microsite format designed for long-form, scroll-native narratives.'
  }
];

const categories = ['Web Experience', 'Branding', 'Product Design', 'UI/UX'];

const portfolioData = fileNames.map((fileName, index) => {
  const descriptor = descriptorPool[index % descriptorPool.length];

  return {
    id: index + 1,
    title: descriptor.title,
    description: descriptor.description,
    category: categories[index % categories.length],
    image: `/assets/portfolio/${fileName}`
  };
});
