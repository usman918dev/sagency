"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight, Clock } from 'lucide-react';
import PackageOrderModal from '@/components/PackageOrderModal';
import CustomPlanModal from '@/components/CustomPlanModal';

const PricingPlans = ({ plans, serviceTitle }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const handlePlanClick = (plan) => {
    const priceLower = plan.price.toLowerCase();
    const isCustomPrice = priceLower.includes("custom") || priceLower.includes("talk") || priceLower.includes("contact");

    if (isCustomPrice) {
      setSelectedPlan(plan);
      setIsCustomModalOpen(true);
    } else {
      setSelectedPlan(plan);
      setIsOrderModalOpen(true);
    }
  };

  return (
    <section id="pricing" className="py-24 px-6 bg-[var(--background)] relative scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[var(--foreground-heading)]">
            <span className="text-[#9D26FF]">Pricing</span> That Scales With You
          </h2>
          <p className="text-[var(--foreground-muted)] mt-3 max-w-2xl mx-auto leading-relaxed text-xs sm:text-sm">
            Transparent, flexible pricing designed to fit your goals, from early startups to scaling enterprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => {
            const priceLower = plan.price.toLowerCase();
            const isCustomPrice = priceLower.includes("custom") || priceLower.includes("talk") || priceLower.includes("contact");

            return (
              <motion.div
                key={index}
                className={`relative flex flex-col bg-[var(--card)] backdrop-blur-xl border rounded-3xl p-8 transition-all duration-500 shadow-xl ${plan.recommended
                    ? 'border-[#9D26FF] scale-105 shadow-2xl shadow-purple-950/50'
                    : 'border-[var(--border)] hover:border-[#9D26FF]/60'
                  }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center shadow-lg whitespace-nowrap">
                    <Star size={12} className="mr-1.5 fill-white" />
                    Recommended
                  </div>
                )}

                <div className="flex-grow">
                  <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl font-extrabold text-[var(--foreground-heading)] mb-2">{plan.planName}</h3>
                    <p className={`text-2xl sm:text-4xl font-black ${isCustomPrice ? 'text-[#9D26FF]' : 'text-[var(--foreground-heading)]'}`}>{plan.price}</p>
                    {plan.price.includes('/mo') && <p className="text-xs text-[var(--foreground-muted)] font-medium mt-0.5">per month</p>}
                    
                    {plan.delivery && (
                      <div className="inline-flex items-center space-x-1.5 mt-3 px-3 py-1 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[11px] font-semibold text-[var(--foreground-muted)]">
                        <Clock size={12} className="text-[#9D26FF]" />
                        <span>Delivery: {plan.delivery}</span>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3.5 mb-8 border-t border-[var(--border)] pt-6">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start text-xs sm:text-sm">
                        <div className="flex-shrink-0 w-5 h-5 bg-[var(--background-alt)] border border-[var(--border)] rounded-full flex items-center justify-center mt-0.5 mr-3">
                          <Check size={12} className="text-[#9D26FF]" />
                        </div>
                        <span className="text-[var(--foreground-muted)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handlePlanClick(plan)}
                  className="w-full mt-auto py-3.5 text-center bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] hover:from-[#8B5CF6] hover:to-[#6D28D9] text-white font-semibold rounded-xl shadow-lg shadow-purple-900/30 transition-all duration-300 text-sm flex items-center justify-center group cursor-pointer"
                >
                  <span>{isCustomPrice ? "Book a Free Consultation" : "Get Started"}</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selectedPlan && (
        <PackageOrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          packageName={selectedPlan.planName}
          packagePrice={selectedPlan.price}
          serviceName={serviceTitle}
        />
      )}

      <CustomPlanModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        activeService={serviceTitle}
      />
    </section>
  );
};

export default PricingPlans;
