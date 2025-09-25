"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Zap, Star, Send } from 'lucide-react';

// Plans data structure
const servicesData = {
  "Web Development": {
    basic: {
      name: "Basic",
      price: "$1,999",
      description: "Perfect for small businesses and startups",
      features: [
        "Responsive Website Design",
        "Up to 5 Pages",
        "Contact Form Integration",
        "Basic SEO Setup",
        "Mobile Optimization",
        "1 Month Support"
      ]
    },
    standard: {
      name: "Standard",
      price: "$4,999",
      description: "Ideal for growing businesses",
      features: [
        "Everything in Basic",
        "Up to 15 Pages",
        "Content Management System",
        "Advanced SEO Optimization",
        "Performance Optimization",
        "Social Media Integration",
        "Analytics Setup",
        "3 Months Support"
      ],
      popular: true
    },
    custom: {
      name: "Custom Plan",
      price: "Contact Us",
      description: "Tailored solutions for enterprise needs",
      features: [
        "Custom Web Application",
        "Unlimited Pages",
        "Advanced Integrations",
        "Custom Features Development",
        "Performance Monitoring",
        "Security Audit",
        "Priority Support",
        "1 Year Maintenance"
      ]
    }
  },
  "Marketing": {
    basic: {
      name: "Basic",
      price: "$799",
      description: "Essential marketing for new businesses",
      features: [
        "Social Media Management (2 platforms)",
        "Basic Content Creation",
        "Monthly Analytics Report",
        "Email Campaign Setup",
        "Basic SEO Audit"
      ]
    },
    standard: {
      name: "Standard",
      price: "$1,999",
      description: "Complete marketing solution",
      features: [
        "Everything in Basic",
        "Social Media Management (5 platforms)",
        "Advanced Content Strategy",
        "PPC Campaign Management",
        "Conversion Rate Optimization",
        "Weekly Analytics Reports",
        "A/B Testing",
        "Marketing Automation"
      ],
      popular: true
    },
    custom: {
      name: "Custom Plan",
      price: "Contact Us",
      description: "Enterprise marketing solutions",
      features: [
        "Full Marketing Stack",
        "Dedicated Marketing Team",
        "Advanced Analytics & BI",
        "Custom Marketing Tools",
        "Multi-channel Campaigns",
        "Brand Strategy Development",
        "Market Research & Analysis",
        "24/7 Campaign Monitoring"
      ]
    }
  },
  "Branding": {
    basic: {
      name: "Basic",
      price: "$1,299",
      description: "Essential brand identity package",
      features: [
        "Logo Design (3 concepts)",
        "Brand Color Palette",
        "Typography Selection",
        "Basic Brand Guidelines",
        "Business Card Design",
        "2 Revisions"
      ]
    },
    standard: {
      name: "Standard",
      price: "$2,999",
      description: "Complete brand identity system",
      features: [
        "Everything in Basic",
        "Logo Design (5 concepts)",
        "Complete Brand Guidelines",
        "Stationery Design Package",
        "Social Media Templates",
        "Brand Voice & Messaging",
        "Website Style Guide",
        "5 Revisions"
      ],
      popular: true
    },
    custom: {
      name: "Custom Plan",
      price: "Contact Us",
      description: "Enterprise branding solutions",
      features: [
        "Complete Brand Strategy",
        "Market Research & Positioning",
        "Custom Brand Assets",
        "Brand Architecture",
        "Marketing Collateral Design",
        "Brand Implementation Guide",
        "Ongoing Brand Consultation",
        "Unlimited Revisions"
      ]
    }
  }
};

// Service categories
const serviceCategories = Object.keys(servicesData);
const allTabs = ["All", ...serviceCategories];

// Tabs Component
const ServiceTabs = ({ activeService, onServiceChange }) => {
  return (
    <motion.div
      className="flex justify-center mb-16"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-2 overflow-x-auto">
        {allTabs.map((service, index) => (
          <motion.button
            key={service}
            onClick={() => onServiceChange(service)}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
              activeService === service
                ? 'bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white shadow-lg shadow-[#F25725]/25'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {service}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Pricing Card Component
const PricingCard = ({ plan, planType, onCustomize, index }) => {
  const isCustom = planType === 'custom';
  const isPopular = plan.popular;

  return (
    <motion.div
      className={`relative bg-gray-900/50 backdrop-blur-sm border rounded-2xl p-8 hover:shadow-[0_0_30px_rgba(242,87,37,0.3)] transition-all duration-500 ${
        isPopular 
          ? 'border-[#F25725] scale-105 shadow-[0_0_20px_rgba(242,87,37,0.2)]' 
          : 'border-gray-700/50 hover:border-[#F25725]/50'
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -5 }}
    >
      {/* Popular Badge */}
      {isPopular && (
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <div className="bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg">
            <Star size={16} className="mr-1" />
            Most Popular
          </div>
        </motion.div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
        <div className="mb-4">
          {isCustom ? (
            <span className="text-3xl font-black text-[#F25725]">Let&apos;s Talk</span>
          ) : (
            <span className="text-4xl font-black text-white">{plan.price}</span>
          )}
        </div>
        <p className="text-gray-400 leading-relaxed">{plan.description}</p>
      </div>

      {/* Features List */}
      <div className="mb-8">
        <ul className="space-y-4">
          {plan.features.map((feature, featureIndex) => (
            <motion.li
              key={featureIndex}
              className="flex items-start space-x-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
            >
              <div className="flex-shrink-0 w-5 h-5 bg-[#F25725]/20 rounded-full flex items-center justify-center mt-0.5">
                <Check size={12} className="text-[#F25725]" />
              </div>
              <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <motion.button
        onClick={() => isCustom && onCustomize()}
        className="w-full py-4 bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white font-semibold rounded-xl shadow-lg shadow-[#F25725]/25 hover:shadow-xl hover:shadow-[#F25725]/40 transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{isCustom ? 'Customize Plan' : 'Get Started'}</span>
        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
      </motion.button>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-[#F25725] rounded-full opacity-60"></div>
      {isPopular && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#F25725]/5 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
      )}
    </motion.div>
  );
};

// Custom Plan Modal Component
const CustomPlanModal = ({ isOpen, onClose, activeService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    requirements: '',
    budget: '',
    timeline: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Custom plan request:', formData);
    // Reset form and close modal
    setFormData({
      name: '',
      email: '',
      company: '',
      requirements: '',
      budget: '',
      timeline: ''
    });
    onClose();
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#1c2131] border border-gray-700/50 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {`Customize Your ${activeService ? activeService + ' ' : ''}Plan`}
                </h3>
                <p className="text-gray-400">
                  Tell us about your project requirements and we&apos;ll create a tailored solution for you.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-[#F25725] focus:ring-2 focus:ring-[#F25725]/20 focus:outline-none transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-[#F25725] focus:ring-2 focus:ring-[#F25725]/20 focus:outline-none transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-[#F25725] focus:ring-2 focus:ring-[#F25725]/20 focus:outline-none transition-all duration-300"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Project Requirements *</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-[#F25725] focus:ring-2 focus:ring-[#F25725]/20 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Tell us about your project requirements, goals, and specific features you need..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:border-[#F25725] focus:ring-2 focus:ring-[#F25725]/20 focus:outline-none transition-all duration-300"
                  >
                    <option value="">Select budget range</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:border-[#F25725] focus:ring-2 focus:ring-[#F25725]/20 focus:outline-none transition-all duration-300"
                  >
                    <option value="">Select timeline</option>
                    <option value="1-2-months">1-2 months</option>
                    <option value="3-4-months">3-4 months</option>
                    <option value="5-6-months">5-6 months</option>
                    <option value="6+-months">6+ months</option>
                  </select>
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white font-semibold rounded-xl shadow-lg shadow-[#F25725]/25 hover:shadow-xl hover:shadow-[#F25725]/40 transition-all duration-300 flex items-center justify-center group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={20} className="mr-2" />
                <span>Send Custom Request</span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Plans Page Component
const PlansPage = () => {
  const [activeService, setActiveService] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);

  const openCustomModal = (serviceCategory) => {
    setSelectedServiceForModal(serviceCategory || (activeService !== 'All' ? activeService : null));
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#1c2131] overflow-hidden">
      {/* Plans Section */}
      <section className="relative py-32 px-6">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#F25725]/20 to-[#ff6b35]/10 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#1b2439]/30 to-[#16213e]/20 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/2"></div>
          
          {/* Diagonal Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 40px,
                rgba(255,255,255,0.1) 40px,
                rgba(255,255,255,0.1) 42px
              )`
            }}></div>
          </div>
        </div>

        {/* Decorative Ring in Corner */}
        <motion.div
          className="absolute top-0 left-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 z-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full border-4 border-[#F25725]/40 border-dashed rounded-full"></div>
        </motion.div>

        {/* Main Content */}
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
              Our Plans
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Choose Your Perfect
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F25725] to-[#ff6b35]">
                Service Package
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              From startups to enterprise, we have the right plan for your business needs. 
              Select a service category and choose the package that fits your goals and budget.
            </p>
          </motion.div>

          {/* Service Tabs */}
          <ServiceTabs 
            activeService={activeService}
            onServiceChange={setActiveService}
          />

          {/* Pricing Cards Grid */}
          <AnimatePresence mode="wait">
            {activeService === 'All' ? (
              <div key="all">
                {serviceCategories.map((category, catIdx) => {
                  const plans = servicesData[category];
                  return (
                    <motion.div
                      key={category}
                      className="mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: catIdx * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">{category}</h2>
                        <span className="text-sm text-gray-400">3 packages</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PricingCard plan={plans.basic} planType="basic" index={0} />
                        <PricingCard plan={plans.standard} planType="standard" index={1} />
                        <PricingCard
                          plan={plans.custom}
                          planType="custom"
                          onCustomize={() => openCustomModal(category)}
                          index={2}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div
                key={activeService}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <PricingCard
                  plan={servicesData[activeService].basic}
                  planType="basic"
                  index={0}
                />
                <PricingCard
                  plan={servicesData[activeService].standard}
                  planType="standard"
                  index={1}
                />
                <PricingCard
                  plan={servicesData[activeService].custom}
                  planType="custom"
                  onCustomize={() => openCustomModal(activeService)}
                  index={2}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Additional Info Section */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Zap className="text-[#F25725] mr-2" size={24} />
                <h3 className="text-xl font-bold text-white">Need Something Different?</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Every business is unique. If our standard plans don&apos;t fit your specific needs, 
                we&apos;re happy to create a custom solution tailored just for you.
              </p>
              <button 
                onClick={() => openCustomModal(null)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white font-semibold rounded-full shadow-lg shadow-[#F25725]/25 hover:shadow-xl hover:shadow-[#F25725]/40 transition-all duration-300 hover:scale-105"
              >
                Let&apos;s Talk Custom Solutions
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom Plan Modal */}
      <CustomPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeService={selectedServiceForModal}
      />
    </main>
  );
};

export default PlansPage;