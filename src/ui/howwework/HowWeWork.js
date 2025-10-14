"use client";
import React from "react";
import { Clock, Target, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";



// Card Component
const HowWeWorkCard = ({ card, index }) => {
  const IconComponent = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.35,
        delay: index * 0.12,
        ease: "easeOut",
      }}
      className={`relative p-8 rounded-2xl text-center transition-all duration-300 hover:border-orange-500 ${card.highlight
        ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
        : "bg-gray-800/50 backdrop-blur-sm border bg-gradient-to-r from-[#1b2439] via-[#16213e] to-[#1b2439] border-gray-700/50 text-gray-300"
        }`}
    >
      {/* Icon */}
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto ${card.highlight ? "bg-white/20 backdrop-blur-sm" : "bg-orange-500"
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
        className={`leading-relaxed ${card.highlight ? "text-white/90" : "text-gray-400"
          }`}
      >
        {card.description}
      </p>
    </motion.div>
  );
};

const HowWeWork = () => {
  return (
    <section className="relative w-full py-32 px-6 bg-[#1c2131] overflow-hidden">

      {/* === Decorative Top Left Corner Rings === */}
      <div className="absolute top-0 left-0 opacity-60 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
        <div className="relative w-100 h-100 rounded-full border-20 border-[#F25725] flex items-center justify-center opacity-80">
          <div className="w-48 h-48 rounded-full border-20 border-[#F25725]/70" />
        </div>
      </div>

      {/* === Floating Animated Dots === */}
      <motion.div
        className="absolute top-20 right-10 w-4 h-4 rounded-full bg-orange-500/60"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-24 left-12 w-3 h-3 rounded-full bg-orange-400/60"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      {/* === Section Content === */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-orange-400 text-sm font-bold uppercase tracking-wider mb-4 z-10">
            How We Work
          </p>
          <h2 className="text-2xl z-30 md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight max-w-2xl mx-auto">
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