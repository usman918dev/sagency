"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye, ArrowRight } from 'lucide-react';


// Portfolio Card Component - Image-first with hover overlay
const PortfolioCard = ({ project, index }) => {
  return (
    <motion.div
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      layout
    >
      {/* Project Image - Primary Focus */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-gray-800 transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${project.image})` }}
      />

      {/* Subtle gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

      {/* Hover Overlay with Project Details */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
        >
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-[#F25725]/90 text-white text-xs font-semibold rounded-full">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-xl font-bold text-white mb-2">
            {project.title}
          </h3>

          {/* Project Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* View Details Button */}
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white font-semibold rounded-full shadow-lg shadow-[#F25725]/25 hover:shadow-xl hover:shadow-[#F25725]/40 transition-all duration-300 hover:scale-105 group/btn">
            <span>View Details</span>
            <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Corner accent for visual depth */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-[#F25725] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

// Portfolio Filters Component
const PortfolioFilters = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Filter container with horizontal scroll on mobile */}
      <div className="flex justify-center">
        <div className="flex gap-3 overflow-x-auto pb-4 px-4 md:px-0 scrollbar-hide max-w-full">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white shadow-lg shadow-[#F25725]/25'
                  : 'bg-transparent text-white border border-[#F25725]/50 hover:border-[#F25725] hover:bg-[#F25725]/10'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Custom scrollbar hide for webkit browsers */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
};

// Main Portfolio Page Component
const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter portfolio items based on selected category
  const filteredProjects = activeCategory === "All" 
    ? portfolioData 
    : portfolioData.filter(project => project.category === activeCategory);

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

          {/* Portfolio Filters */}
          <PortfolioFilters 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Portfolio Grid with AnimatePresence for smooth filtering */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.map((project, index) => (
                <PortfolioCard 
                  key={`${activeCategory}-${project.id}`}
                  project={project} 
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>

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



// Portfolio data with enhanced structure
const portfolioData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern shopping experience with seamless checkout and inventory management",
    category: "Web Apps",
    image: "/assets/ecom.webp"
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Secure financial management with biometric authentication and real-time transactions",
    category: "Mobile Apps",
    image: "/assets/digital.webp"
  },
  {
    id: 3,
    title: "Brand Identity System",
    description: "Complete visual identity including logo, typography, and brand guidelines",
    category: "Branding",
    image: "/assets/graphic.jpg"
  },
  {
    id: 4,
    title: "SaaS Analytics Dashboard",
    description: "Real-time data visualization with customizable charts and reporting tools",
    category: "Web Apps",
    image: "/assets/seo.webp"
  },
  {
    id: 5,
    title: "Fitness Tracking App",
    description: "Personal workout companion with AI-powered training recommendations",
    category: "Mobile Apps",
    image: "/assets/web.webp"
  },
  {
    id: 6,
    title: "Corporate Website Design",
    description: "Professional business presence with content management and SEO optimization",
    category: "Web Apps",
    image: "/assets/ecom1.webp"
  },
  {
    id: 7,
    title: "Restaurant App Interface",
    description: "Intuitive food ordering experience with real-time delivery tracking",
    category: "UI/UX",
    image: "/assets/seo1.webp"
  },
  {
    id: 8,
    title: "Fintech Trading Platform",
    description: "Advanced cryptocurrency trading with portfolio analytics and market insights",
    category: "Web Apps",
    image: "/assets/wy.webp"
  },
  {
    id: 9,
    title: "Social Media Management",
    description: "Multi-platform content scheduling with engagement analytics and automation",
    category: "Web Apps",
    image: "/assets/bg.png"
  },
  {
    id: 10,
    title: "Healthcare Mobile App",
    description: "Telemedicine platform connecting patients with healthcare professionals",
    category: "Mobile Apps",
    image: "/assets/d1.jpg"
  },
  {
    id: 11,
    title: "Luxury Brand Identity",
    description: "Premium brand development for high-end fashion and lifestyle products",
    category: "Branding",
    image: "/assets/edit.jpg"
  },
  {
    id: 12,
    title: "Travel Booking Interface",
    description: "Seamless travel planning experience with smart recommendations",
    category: "UI/UX",
    image: "/assets/video.jpg"
  }
];

// Enhanced categories
const categories = ["All", "Web Apps", "Mobile Apps", "Branding", "UI/UX"];
