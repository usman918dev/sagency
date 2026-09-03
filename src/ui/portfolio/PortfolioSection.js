"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "AI-Powered Analytics Dashboard",
    category: "Web Application",
    image: "/assets/web.webp",
    description:
      "Enterprise-grade analytics platform with machine learning capabilities",
    tags: ["React", "Node.js", "TensorFlow"],
  },
  {
    id: 2,
    title: "E-Commerce Revolution",
    category: "E-Commerce",
    image: "/assets/ecom.webp",
    description:
      "Next-generation shopping experience with AI recommendations",
    tags: ["Next.js", "Stripe", "AWS"],
  },
  {
    id: 3,
    title: "Digital Marketing Suite",
    category: "Marketing",
    image: "/assets/digital.webp",
    description: "Comprehensive digital marketing automation platform",
    tags: ["Python", "React", "Analytics"],
  },
  {
    id: 4,
    title: "SEO Optimization Tool",
    category: "SEO",
    image: "/assets/seo.webp",
    description: "Advanced SEO analysis and optimization platform",
    tags: ["Next.js", "AI", "GraphQL"],
  },
];

const categories = ["All", "Web Application", "E-Commerce", "Marketing", "SEO", "Mobile"];

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = projects.filter((project) =>
    selectedCategory === "All" ? true : project.category === selectedCategory
  );

  return (
    <section className="relative py-24 min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE CONTENT */}
        <div className="flex flex-col justify-center">
          <span className="text-[#9D26FF] text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">
            Derixio Portfolio
          </span>
          <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-[var(--foreground-heading)] leading-tight">
            Experience the Digital Excellence of <span className="text-[#9D26FF]">Our Work</span>
          </h2>
          <p className="mt-6 text-[var(--foreground-muted)] max-w-md leading-relaxed text-base">
            Explore our curated showcase of high-impact digital platforms, brand transformations, and software solutions built for scaling enterprises.
          </p>

          {/* CATEGORY FILTER */}
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#9D26FF] text-white shadow-lg shadow-purple-900/40"
                    : "bg-[var(--card)] text-[var(--foreground-muted)] border border-[var(--border)] hover:border-[#9D26FF]"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE PROJECTS */}
        <div className="grid sm:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group rounded-3xl overflow-hidden shadow-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[#9D26FF] transition-all duration-500"
              >
                {/* Project Image */}
                <motion.div className="relative w-full h-[230px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#9D26FF]">
                    {project.category}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    {project.title}
                  </h3>

                  {/* Description & Tags */}
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#9D26FF]/20 text-white border border-[#9D26FF]/40 px-2.5 py-1 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.a
                    href="/portfolio"
                    whileHover={{ y: -2 }}
                    className="mt-4 inline-block text-center px-4 py-2 bg-[#9D26FF] text-white rounded-xl text-xs font-semibold shadow-md hover:bg-[#8500ED] transition-all"
                  >
                    View Project Case Study
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
