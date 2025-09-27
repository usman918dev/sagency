"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const PricingPlans = ({ plans }) => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#181d2b] to-[#1c2131]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F25725] to-[#ff6b35]">
              Pricing
            </span> That Scales With You
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Transparent, flexible pricing designed to fit your needs, from startups to enterprise-level projects.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative flex flex-col bg-gray-900/50 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-500 ${
                plan.recommended 
                  ? 'border-[#F25725] scale-105 shadow-[0_0_40px_rgba(242,87,37,0.25)]' 
                  : 'border-gray-700/50 hover:border-[#F25725]/50'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center shadow-lg">
                  <Star size={16} className="mr-1.5" />
                  Recommended
                </div>
              )}
              <div className="flex-grow">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.planName}</h3>
                  <p className="text-4xl font-black text-white">{plan.price}</p>
                  {plan.price.includes('/mo') && <p className="text-sm text-gray-400">per month</p>}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-[#F25725]/20 rounded-full flex items-center justify-center mt-0.5 mr-3">
                        <Check size={12} className="text-[#F25725]" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <motion.button
                className="w-full mt-auto py-3 bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white font-semibold rounded-xl shadow-lg shadow-[#F25725]/25 hover:shadow-xl hover:shadow-[#F25725]/40 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
