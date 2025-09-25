import {
  GraduationCap,
  Handshake,
  BadgePercent,
  Sparkles,
  Telescope,
  ArrowRight,
} from 'lucide-react';
import React from 'react';
import { motion } from "framer-motion";

// Reusable Card Component for features
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className = "",
  highlighted = false,
}) => {
  // Dynamic styles for dark theme
  const cardStyles = highlighted
    ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
    : "bg-white/5 backdrop-blur-sm text-white border border-white/10 hover:border-orange-500/50 hover:bg-white/10";

  const textStyles = highlighted ? "text-orange-100" : "text-gray-300";
  const iconStyles = highlighted
    ? "text-white bg-white/20"
    : "text-orange-500 bg-orange-500/20";
  const linkStyles = highlighted
    ? "text-white hover:text-orange-100"
    : "text-gray-300 hover:text-white";

  return (
    <motion.div
      className={`flex h-full flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:border-orange-500 hover:border hover:shadow-lg hover:shadow-orange-500/10 ${cardStyles} ${className}`}
      initial={{ opacity: 0, y: 30 }}        // Starts faded and slightly below
      whileInView={{ opacity: 1, y: 0 }}    // Animates when it enters viewport
      viewport={{ once: true, amount: 0.2 }} // Only triggers once, when 20% visible
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <div
          className={`mb-6 flex items-center justify-center w-16 h-16 rounded-full ${iconStyles} transition-all duration-300`}
        >
          <Icon size={32} />
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-bold">{title}</h3>

        {/* Description */}
        {description && (
          <p className={`text-sm ${textStyles}`}>{description}</p>
        )}
      </div>

      {/* Learn More Link (optional) */}
      {/* <a
        href="#"
        className={`mt-6 flex items-center gap-2 self-start text-sm font-semibold transition-colors ${linkStyles}`}
      >
        Learn more
        <ArrowRight size={16} />
      </a> */}
    </motion.div>
  );
};

// Main Component
const WhyChooseUs = () => {


  return (
    <div className="flex min-h-screen w-full py-32 bg-gradient-to-r from-[#1b2439] via-[#16213e] to-[#1b2439] relative">
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
      {/* Top-left corner borders with glow effect and animation */}
      <motion.span
        className="absolute top-0 left-0 h-[4px] block z-10 bg-gradient-to-r from-orange-500 to-orange-600"
        style={{ width: "min(40vw, 40vh)" }}
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: "min(40vw, 40vh)" }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.span
        className="absolute top-0 left-0 w-[4px] block z-10 bg-gradient-to-b from-orange-500 to-orange-600"
        style={{ height: "min(40vh, 40vh)" }}
        initial={{ opacity: 0, height: 0 }}
        whileInView={{ opacity: 1, height: "min(40vh, 40vh)" }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />

      {/* Bottom-right corner borders with glow effect and animation */}
      <motion.span
        className="absolute bottom-0 right-0 h-[4px] block z-10 bg-gradient-to-l from-orange-500 to-orange-600"
        style={{ width: "min(40vw, 40vh)" }}
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: "min(40vw, 40vh)" }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      <motion.span
        className="absolute bottom-0 right-0 w-[4px] block z-10 bg-gradient-to-t from-orange-500 to-orange-600"
        style={{ height: "min(40vw, 40vh)" }}
        initial={{ opacity: 0, height: 0 }}
        whileInView={{ opacity: 1, height: "min(40vw, 40vh)" }}
        transition={{ duration: 0.5, delay: 1.0 }}
      />

      <main className="w-full">

        <section className="rounded-3xl py-12 sm:py-16 lg:py-20 px-12 max-sm:px-4 g-px">
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Main Title */}
            <motion.div
              className="md:col-span-2 lg:col-span-4 lg:row-span-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-5xl font-black uppercase leading-none tracking-tighter text-white sm:text-6xl">
                Why Choose
                <br />
                Us?
              </h2>
            </motion.div>

            {/* Feature Cards with staggered animation */}
            {features.map((feature, index) => (
              <FeatureCard key={index} index={index} {...feature} />
            ))}

            {/* Launch Career / CTA Block */}
            <motion.div
              className="flex h-full flex-col justify-between rounded-2xl p-8 md:col-span-2 lg:col-span-8 transition-all duration-300 relative overflow-visible"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            >
              <div className='flex'>
                <div>
                  <p className="text-gray-300 mb-2 max-w-[90%] max-sm:max-w-[100%]">
                    Let&apos;s collaborate to build innovative digital solutions that help your business grow. Our expert team is ready to bring your vision to life.
                  </p>

                  <p className="text-4xl max-w-[90%] font-black uppercase leading-none tracking-tighter text-white sm:text-5xl">
                    Ready to Transform Your Digital Presence?
                  </p>
                </div>

                <motion.div
                  className="col-span-1 flex items-end justify-end mt-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                >
                  <button
                    aria-label="Launch your sales career"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-110"
                  >
                    <ArrowRight size={24} />
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Arrow Button */}

          </motion.div>
        </section>
      </main>
    </div>
  );

};

export default WhyChooseUs;

const features = [
  {
    icon: Sparkles,
    title: 'Innovative Solutions',
    description: 'We leverage cutting-edge technologies and creative strategies to deliver outstanding digital experiences.',
    className: 'lg:col-span-4',
  },
  {
    icon: Handshake,
    title: 'Dedicated Support',
    description: 'Our team provides 24/7 support and maintains clear communication throughout your project.',
    className: 'lg:col-span-4',
  },
  {
    icon: BadgePercent,
    title: 'Results-Driven Approach',
    description: 'We focus on delivering measurable results that directly impact your business growth and ROI.',
    className: 'md:col-span-2 lg:col-span-8 ',
    highlighted: true,
  },
  {
    icon: GraduationCap,
    title: 'Expert Team',
    description: 'Our professionals bring years of industry experience and expertise to every project we undertake.',
    className: 'lg:col-span-4',
  },
  {
    icon: Telescope,
    title: 'Future-Ready Solutions',
    description: 'We stay ahead of industry trends to ensure your digital presence remains competitive and innovative.',
    className: 'lg:col-span-4',
  },
];