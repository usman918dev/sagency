"use client";
import React from "react";
import { Clock, Target, Users, TrendingUp } from "lucide-react";

import { motion } from "framer-motion";
const howWeWorkCards = [
  {
    id: 1,
    title: "Discovery & Research",
    description:
      "We start by understanding your business goals, target audience, and market landscape to create a solid foundation.",
    icon: Target,
    highlight: false,
  },
  {
    id: 2,
    title: "Strategy & Planning",
    description:
      "Our team develops a comprehensive strategy tailored to your objectives with clear timelines and milestones.",
    icon: Users,
    highlight: true,
  },
  {
    id: 3,
    title: "Design & Development",
    description:
      "We bring your vision to life with creative designs and robust development using the latest technologies.",
    icon: Clock,
    highlight: false,
  },
  {
    id: 4,
    title: "Launch & Optimize",
    description:
      "After thorough testing, we launch your project and continuously optimize for better performance and results.",
    icon: TrendingUp,
    highlight: false,
  },
];



const HowWeWorkCard = ({ card, index }) => {
  const IconComponent = card.icon;

  // Cards alternate direction: top or bottom with smoother motion
  const direction = index % 2 === 0 ? -150 : 150;

  return (
    <motion.div
      initial={{ opacity: 0, y: direction, scale: 0.98 }} // Soft start with slight shrink
      whileInView={{ opacity: 1, y: 0, scale: 1 }} // Smooth rise to natural position
      viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible
      transition={{
        duration: 0.9,        // Longer for smooth experience
        ease: [0.25, 0.1, 0.25, 1], // Custom smooth cubic bezier curve
      }}
      className={`relative p-8 rounded-2xl text-center transition-all duration-300 hover:border-orange-500 ${
        card.highlight
          ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white"
          : "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300"
      }`}
    >
      {/* Icon */}
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto ${
          card.highlight ? "bg-white/20 backdrop-blur-sm" : "bg-orange-500"
        }`}
      >
        <IconComponent className="w-8 h-8 text-white" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-4 leading-tight text-white">
        {card.title}
      </h3>

      {/* Description */}
      <p
        className={`leading-relaxed ${
          card.highlight ? "text-white/90" : "text-gray-400"
        }`}
      >
        {card.description}
      </p>
    </motion.div>
  );
};


const HowWeWork = () => {
  return (
    <section className="relative w-full py-24 px-6 
 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-orange-400 text-sm font-bold uppercase tracking-wider mb-4">
            How We Work
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight max-w-2xl mx-auto">
            Our proven process ensures exceptional results.
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howWeWorkCards.map((card, index) => (
            <div
              key={card.id}
              className={`${index === 1 || index === 3 ? "lg:mt-12" : ""}`}
            >
              <HowWeWorkCard card={card} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
