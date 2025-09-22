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
  // {
  //   id: 5,
  //   title: "Mobile Commerce App",
  //   category: "Mobile",
  //   image: "/assets/ecom1.webp",
  //   description: "Feature-rich mobile commerce application",
  //   tags: ["React Native", "Firebase"],
  // },
  // {
  //   id: 6,
  //   title: "SEO Performance Suite",
  //   category: "SEO",
  //   image: "/assets/seo1.webp",
  //   description: "Comprehensive SEO performance tracking system",
  //   tags: ["Vue.js", "Python", "AI"],
  // },
];

const categories = ["All", "Web Application", "E-Commerce", "Marketing", "SEO", "Mobile"];

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = projects.filter((project) =>
    selectedCategory === "All" ? true : project.category === selectedCategory
  );

  return (
    <section className="relative py-20 min-h-screen">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
        {/* LEFT SIDE CONTENT */}
        <div className="flex flex-col justify-center">
          <span className="text-orange-400 text-sm font-bold uppercase tracking-wider mb-4 uppercase">
            Portfolio
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-tight">
            Experience the digital brilliance of our portfolio showcase.
          </h2>
          <p className="mt-6 text-gray-400 max-w-md">
            Explore our portfolio to see our successful projects across various
            industries. We’ve helped businesses like yours achieve remarkable
            results.
          </p>

          {/* CATEGORY FILTER */}
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-orange-600 text-white shadow-md"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
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
                className="relative group rounded-2xl overflow-hidden shadow-lg bg-[#101828] hover:shadow-orange-600/30 transition-shadow duration-500"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-xs font-medium uppercase tracking-widest text-orange-400">
                    {project.category}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    {project.title}
                  </h3>

                  {/* Description & Tags */}
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-gray-300 text-sm">{project.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ y: -2 }}
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-500 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-orange-500/40 transition-all"
                  >
                    View Detail
                  </motion.button>
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
