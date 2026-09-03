"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Zap, Star, Send } from 'lucide-react';
import PackageOrderModal from '@/components/PackageOrderModal';
import CustomPlanModal from '@/components/CustomPlanModal';
import { pricingData, pricingCategories } from '@/lib/plansData';

// Re-shape pricingData into the format the existing UI expects (basic/standard/custom keys)
// pricingData already has this shape, so we can use it directly.
const servicesData = pricingData;
const serviceCategories = pricingCategories;
const allTabs = ["All", ...serviceCategories];

// ServiceTabs Component
const ServiceTabs = ({ activeService, onServiceChange }) => {
  return (
    <motion.div
      className="flex justify-center mb-16"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex bg-[var(--card)] backdrop-blur-md border border-[var(--border)] rounded-2xl p-2 overflow-x-auto shadow-md">
        {allTabs.map((service, index) => (
          <motion.button
            key={service}
            onClick={() => onServiceChange(service)}
            className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
              activeService === service
                ? 'bg-[#9D26FF] text-white shadow-md'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-heading)] hover:bg-[var(--background-alt)]'
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
const PricingCard = ({ plan, planType, onCustomize, onOrder, categoryName, index }) => {
  const isCustom = planType === 'custom' || planType === 'standard' || (plan.price && (plan.price.toLowerCase().includes('custom') || plan.price.toLowerCase().includes('talk')));
  const isPopular = plan.popular;

  const handleClick = () => {
    if (isCustom) {
      if (onCustomize) onCustomize(categoryName, plan.name);
    } else {
      if (onOrder) onOrder(plan, categoryName);
    }
  };

  return (
    <motion.div
      className={`relative bg-[var(--card)] backdrop-blur-xl border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between ${
        isPopular
          ? 'border-[#9D26FF] scale-105 shadow-xl shadow-[#9D26FF]/10'
          : 'border-[var(--border)] hover:border-[#9D26FF]/60'
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -5 }}
    >
      {/* Badge */}
      {isPopular && (
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <div className="bg-[#9D26FF] text-white px-4 py-1.5 rounded-full text-xs font-extrabold flex items-center shadow-md whitespace-nowrap">
            <span className="mr-1.5 text-xs">⭐</span>
            Most Popular
          </div>
        </motion.div>
      )}

      {/* Plan Header */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-lg sm:text-xl font-extrabold text-[var(--foreground-heading)] mb-2">{plan.name}</h3>
          <div className="mb-4 flex flex-col items-center justify-center min-h-[52px]">
            {plan.setupPrice && plan.monthlyPrice ? (
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-heading)] block">{plan.setupPrice}</span>
                <span className="text-lg font-extrabold text-[#9D26FF] block mt-0.5">+ {plan.monthlyPrice}</span>
              </div>
            ) : isCustom ? (
              <span className="text-2xl sm:text-3xl font-extrabold text-[#9D26FF]">{plan.price}</span>
            ) : (
              <span className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-heading)]">{plan.price}</span>
            )}
          </div>
          <p className="text-[var(--foreground-muted)] text-xs sm:text-sm leading-relaxed">{plan.description}</p>
        </div>

        {/* Features List */}
        <div className="mb-8">
          <ul className="space-y-3.5">
            {plan.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
              >
                <div className="flex-shrink-0 w-5 h-5 bg-[#9D26FF]/15 border border-[#9D26FF]/30 rounded-full flex items-center justify-center mt-0.5">
                  <Check size={12} className="text-[#9D26FF]" />
                </div>
                <span className="text-[var(--foreground-muted)] text-sm leading-relaxed">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Button */}
      <motion.button
        onClick={handleClick}
        className="w-full py-4 bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold rounded-xl shadow-md transition-all duration-300 flex items-center justify-center group text-sm cursor-pointer mt-auto"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{isCustom ? 'Book a Free Consultation' : 'Get Started'}</span>
        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
      </motion.button>
    </motion.div>
  );
};

// Main Plans Page Component
const PlansContent = () => {
  const [activeService, setActiveService] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);
  const [selectedOrderPackage, setSelectedOrderPackage] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const openCustomModal = (serviceCategory) => {
    setSelectedServiceForModal(serviceCategory || (activeService !== 'All' ? activeService : null));
    setIsModalOpen(true);
  };

  const openOrderModal = (plan, categoryName) => {
    setSelectedOrderPackage({
      packageName: plan.name,
      packagePrice: plan.price,
      serviceName: categoryName
    });
    setIsOrderModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden pt-20 md:pt-24 bg-agenko-grid">
      <section className="relative pt-4 md:pt-6 pb-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#9D26FF]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-20 g-px">
          <motion.div
            className="text-center mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4">
              <Star size={14} className="text-[#9D26FF]" />
              <span>DERIXIO PRICING PLANS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-[var(--foreground-heading)] leading-[1.1] mb-5 tracking-tight">
              <span className="font-light">Transparent Pricing. </span><br />
              <span className="font-extrabold text-[#9D26FF]">Unmatched Scalability.</span>
            </h1>
            <p className="text-[var(--foreground-muted)] text-sm sm:text-base leading-relaxed">
              Value-driven pricing plans designed to help ambitious startups and scaling enterprises build, grow, and dominate their industry.
            </p>
          </motion.div>

          <ServiceTabs activeService={activeService} onServiceChange={setActiveService} />

          <AnimatePresence mode="wait">
            {activeService === 'All' ? (
              <div key="all">
                {serviceCategories.map((category, catIdx) => {
                  const plans = servicesData[category];
                  return (
                    <motion.div
                      key={category}
                      className="mb-16"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: catIdx * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-[var(--foreground-heading)]">{category} Packages</h2>
                        <span className="text-xs font-semibold text-[#9D26FF] uppercase tracking-wider bg-[var(--background-alt)] border border-[var(--border)] px-3 py-1 rounded-full">3 tiers</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PricingCard plan={plans.basic} planType="basic" onOrder={openOrderModal} categoryName={category} index={0} />
                        <PricingCard plan={plans.standard} planType="standard" onCustomize={() => openCustomModal(category)} onOrder={openOrderModal} categoryName={category} index={1} />
                        <PricingCard plan={plans.custom} planType="custom" onCustomize={() => openCustomModal(category)} index={2} />
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
                <PricingCard plan={servicesData[activeService].basic} planType="basic" onOrder={openOrderModal} categoryName={activeService} index={0} />
                <PricingCard plan={servicesData[activeService].standard} planType="standard" onCustomize={() => openCustomModal(activeService)} onOrder={openOrderModal} categoryName={activeService} index={1} />
                <PricingCard plan={servicesData[activeService].custom} planType="custom" onCustomize={() => openCustomModal(activeService)} index={2} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] rounded-3xl p-8 max-w-3xl mx-auto shadow-2xl">
              <div className="flex items-center justify-center mb-4">
                <Zap className="text-[#9D26FF] mr-2" size={24} />
                <h3 className="text-2xl font-bold text-[var(--foreground-heading)]">Need a Tailored Solution?</h3>
              </div>
              <p className="text-[var(--foreground-muted)] mb-6 leading-relaxed text-sm sm:text-base">
                If our pre-packaged plans don&apos;t match your precise technical architecture or timeline, Derixio will build a custom scope for your enterprise.
              </p>
              <button
                onClick={() => openCustomModal(null)}
                className="inline-flex items-center px-8 py-3.5 bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:scale-105 text-sm"
              >
                <span>Request Custom Enterprise Scope</span>
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <CustomPlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} activeService={selectedServiceForModal} />

      {selectedOrderPackage && (
        <PackageOrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          packageName={selectedOrderPackage.packageName}
          packagePrice={selectedOrderPackage.packagePrice}
          serviceName={selectedOrderPackage.serviceName}
        />
      )}
    </main>
  );
};

export default PlansContent;
