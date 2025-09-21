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
    ? "bg-orange-500 text-white"
    : "bg-[#0d1117] text-white border border-[#30363d]";

  const textStyles = highlighted ? "text-orange-100" : "text-gray-400";
  const iconStyles = highlighted
    ? "text-white bg-[#89898947]"
    : "text-orange-500 bg-[#1a1f25]";
  const linkStyles = highlighted
    ? "text-white hover:text-orange-100"
    : "text-gray-300 hover:text-white";

  return (
    <motion.div
      className={`flex h-full flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:border-orange-500 hover:border ${cardStyles} ${className}`}
      initial={{ opacity: 0, y: 30 }}        // Starts faded and slightly below
      whileInView={{ opacity: 1, y: 0 }}    // Animates when it enters viewport
      viewport={{ once: true, amount: 0.2 }} // Only triggers once, when 20% visible
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        {/* Icon */}
        <div
          className={`mb-6 flex items-center justify-center w-16 h-16 rounded-full ${iconStyles}`}
        >
          <Icon size={32} className={iconStyles} />
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

  return (
    <div className="flex min-h-screen w-full">
      <main className="w-full">
        <section className="rounded-3xl p-6 sm:p-10 lg:p-16 g-px">
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
              className="flex h-full flex-col justify-between rounded-2xl p-6 md:col-span-2 lg:col-span-7 bg-gradient-to-br from-gray-900/30 to-gray-800/20 border border-gray-800/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            >
              <div>
                <p className="text-gray-400 mb-6">
                  Let's collaborate to create innovative digital solutions that will help your
                  business thrive in the modern digital landscape. Our expert team is ready to
                  bring your vision to life.
                </p>
                <h3 className="text-4xl font-black uppercase leading-none tracking-tighter text-white sm:text-5xl">
                  Ready to Transform Your Digital Presence?
                </h3>
              </div>
            </motion.div>

            {/* Floating Arrow Button */}
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
          </motion.div>
        </section>
      </main>
    </div>
  );

};

export default WhyChooseUs;