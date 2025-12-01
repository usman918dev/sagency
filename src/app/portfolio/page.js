"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// --- Data ---
const fileNames = [
  'p (1).jpg', 'p (1).png', 'p (2).jpg', 'p (2).png', 'p (3).jpg', 'p (3).png',
  'p (4).jpg', 'p (4).png', 'p (5).jpg', 'p (6).jpg', 'p (7).jpg', 'p (8).jpeg',
  'p (9).jpeg', 'p (10).jpeg', 'p (11).jpeg', 'p (12).jpeg', 'p (13).jpeg',
  'p (14).jpeg', 'p (15).jpeg', 'p (16).jpeg', 'p (17).jpeg', 'p (18).jpeg',
  'p (19).jpeg', 'p (20).jpeg', 'p (21).jpeg'
];

const descriptorPool = [
  { title: 'Immersive Landing Page', description: 'Full-fidelity hero concept engineered for high-impact product launches.' },
  { title: 'Brand Narrative System', description: 'Holistic identity suite balancing typography, motion, and color storytelling.' },
  { title: 'Product UX Canvas', description: 'Composable UI kit optimised for SaaS dashboards and data-rich workflows.' },
  { title: 'Experiential Campaign', description: 'Interactive campaign journey blending digital touchpoints and premium visuals.' },
  { title: 'Commerce Accelerator', description: 'Conversion-focused storefront with adaptive merchandising experiences.' },
  { title: 'Editorial Microsite', description: 'Story-driven microsite format designed for long-form, scroll-native narratives.' }
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

// --- Components ---

const PortfolioCard = ({ project }) => {
  const imageUrl = encodeURI(project.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#1c2131] border border-white/5 cursor-pointer"
    >
      {/* Image Layer */}
      <div className="absolute inset-0 transition-all duration-500 group-hover:blur-sm">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
      </div>

      {/* Overlay Layer - Orange Theme */}
      <div className="absolute inset-0 bg-[#F25725]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-white/90 text-sm leading-relaxed">
            {project.description}
          </p>
          <div className="mt-4 inline-flex items-center text-white font-semibold text-sm uppercase tracking-wider">
            View Project <ArrowRight size={16} className="ml-2" />
          </div>
        </motion.div>
      </div>

      {/* Default State Title (Optional - visible when not hovering if desired, but user asked for reveal on hover. 
          I'll keep a subtle title at bottom that disappears on hover to keep it clean) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
        <p className="text-white font-medium truncate">{project.title}</p>
      </div>
    </motion.div>
  );
};

const PortfolioSection = ({ title, projects }) => {
  return (
    <section className="py-16 border-t border-white/5 first:border-t-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {title}
          </h2>
          <div className="h-1 w-20 bg-[#F25725] rounded-full" />
        </div>
        <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">
          {projects.length} Projects
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <PortfolioCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

const PortfolioPage = () => {
  // Group projects by category
  const groupedProjects = categories.reduce((acc, category) => {
    acc[category] = portfolioData.filter(p => p.category === category);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-[#1c2131] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#F25725] text-sm font-bold uppercase tracking-wider mb-4">
              Our Work
            </p>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Visual <span className="text-[#F25725]">Masterpieces</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our portfolio across different disciplines.
              We create digital experiences that leave a lasting impression.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Sections */}
      <div className="max-w-[1600px] mx-auto px-6 pb-32 space-y-12">
        {categories.map((category) => (
          groupedProjects[category].length > 0 && (
            <PortfolioSection
              key={category}
              title={category}
              projects={groupedProjects[category]}
            />
          )
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="py-20 bg-white/5 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to start your project?</h2>
          <button className="px-8 py-4 bg-[#F25725] hover:bg-[#d14214] text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-[#F25725]/25">
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  );
};

export default PortfolioPage;
