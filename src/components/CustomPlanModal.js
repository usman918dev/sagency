"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Send, ArrowRight } from 'lucide-react';

export function getDynamicFieldConfig(serviceName = "") {
  const serviceLower = (serviceName || "").toLowerCase();

  if (serviceLower.includes("video") || serviceLower.includes("motion") || serviceLower.includes("editing")) {
    return {
      label: "Type of Video Project Needed *",
      type: "select",
      placeholder: "Select video project type",
      options: [
        "Social Media Video Editing",
        "Product Promo / Commercial Video",
        "Motion Graphics & Animated Titles",
        "2D Animation",
        "Other Video Project"
      ]
    };
  }

  if (serviceLower.includes("graphic")) {
    return {
      label: "Type of Design Needed *",
      type: "select",
      placeholder: "Select design type",
      options: [
        "Logo & Visual Brand Identity",
        "Social Media & Ad Creatives",
        "Packaging & Print Design",
        "3D Product Renders",
        "Other Custom Graphics"
      ]
    };
  }

  if (serviceLower.includes("web") || serviceLower.includes("development")) {
    return {
      label: "Number of Pages Needed *",
      type: "select",
      placeholder: "Select page count",
      options: [
        "1 – 5 Pages",
        "6 – 15 Pages",
        "15 – 30 Pages",
        "30+ Pages / Custom Web App"
      ]
    };
  }

  if (serviceLower.includes("seo") || serviceLower.includes("search")) {
    return {
      label: "Website URL *",
      type: "text",
      placeholder: "https://yourwebsite.com",
      options: null
    };
  }

  if (serviceLower.includes("marketing") || serviceLower.includes("digital")) {
    return {
      label: "Current Marketing Channels *",
      type: "select",
      placeholder: "Select marketing channels",
      options: [
        "Facebook / Instagram Ads",
        "Google Ads",
        "TikTok Ads",
        "Email Marketing",
        "Multiple / All Channels"
      ]
    };
  }

  if (serviceLower.includes("amazon")) {
    return {
      label: "Number of Product Listings *",
      type: "select",
      placeholder: "Select listing count",
      options: [
        "1 – 5 Product Listings",
        "6 – 20 Product Listings",
        "21 – 50 Product Listings",
        "50+ Product Listings"
      ]
    };
  }

  return {
    label: "Project Scope / Quantity *",
    type: "text",
    placeholder: "Describe project scope or quantity",
    options: null
  };
}

const CustomPlanModal = ({ isOpen, onClose, activeService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    timeline: '',
    adSpendBudget: '',
    customBudget: '',
    serviceScope: '',
    painPointGoal: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dynamicField = getDynamicFieldConfig(activeService);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedBudget = formData.adSpendBudget === 'Other'
      ? (formData.customBudget ? `Custom: ${formData.customBudget}` : 'Custom / Unspecified')
      : formData.adSpendBudget;

    const dynamicLabelClean = dynamicField.label.replace(' *', '');

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || 'N/A',
          service: activeService || 'Custom Scope Consultation',
          package: 'Business/Enterprise Consultation Scope',
          details: `Company: ${formData.company}\nTimeline: ${formData.timeline}\nMonthly Budget: ${selectedBudget || 'N/A'}\n${dynamicLabelClean}: ${formData.serviceScope || 'N/A'}\nCurrent Pain Point / Goal: ${formData.painPointGoal}`
        })
      });
    } catch (err) {
      console.error('Custom scope submission error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
    setFormData({
      name: '',
      email: '',
      company: '',
      timeline: '',
      adSpendBudget: '',
      customBudget: '',
      serviceScope: '',
      painPointGoal: ''
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
        >
          <motion.div
            className="relative bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl my-auto"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={handleResetAndClose}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-1.5 sm:p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground-heading)] bg-[var(--background-alt)] border border-[var(--border)] rounded-full transition-colors z-30 cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8 sm:py-10">
                <Check className="w-14 h-14 text-[#9D26FF] mx-auto mb-4" />
                <h3 className="text-2xl sm:text-3xl font-black text-[var(--foreground-heading)] mb-2">Thank You!</h3>
                <p className="text-[#9D26FF] text-sm sm:text-base font-bold mb-3">
                  Your project scope details have been submitted successfully.
                </p>
                <p className="text-[var(--foreground-muted)] text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-6">
                  Our growth strategists will review your specifications. You can also book a direct 1-on-1 strategy call with our team right away.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all inline-flex items-center cursor-pointer"
                  >
                    <span>Book Strategy Call on Calendly</span>
                    <ArrowRight size={16} className="ml-2" />
                  </a>
                  <button
                    onClick={handleResetAndClose}
                    className="px-5 py-3 bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] font-semibold rounded-xl text-xs sm:text-sm hover:border-[#9D26FF]/50 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4 sm:mb-6 pr-8 sm:pr-0">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-[11px] font-bold uppercase tracking-wider mb-2">
                    <span>QUALIFYING CONSULTATION FORM</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-[var(--foreground-heading)] mb-1">
                    {`Book a Free Consultation ${activeService ? '— ' + activeService : ''}`}
                  </h3>
                  <p className="text-[var(--foreground-muted)] text-xs sm:text-sm">
                    Tell us about your budget, project scope, and primary growth goal so we can prepare a tailored custom quote.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[var(--foreground-heading)] font-medium mb-1.5 text-xs sm:text-sm">Your Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3.5 py-2.5 sm:py-3 bg-[var(--background-alt)] border border-[var(--border)] rounded-xl text-[var(--foreground-heading)] text-xs sm:text-sm placeholder-[var(--foreground-muted)] focus:border-[#9D26FF] focus:outline-none transition-all" placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label className="block text-[var(--foreground-heading)] font-medium mb-1.5 text-xs sm:text-sm">Work Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3.5 py-2.5 sm:py-3 bg-[var(--background-alt)] border border-[var(--border)] rounded-xl text-[var(--foreground-heading)] text-xs sm:text-sm placeholder-[var(--foreground-muted)] focus:border-[#9D26FF] focus:outline-none transition-all" placeholder="Enter your email address" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[var(--foreground-heading)] font-medium mb-1.5 text-xs sm:text-sm">Company / Brand Name *</label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange} required className="w-full px-3.5 py-2.5 sm:py-3 bg-[var(--background-alt)] border border-[var(--border)] rounded-xl text-[var(--foreground-heading)] text-xs sm:text-sm placeholder-[var(--foreground-muted)] focus:border-[#9D26FF] focus:outline-none transition-all" placeholder="Enter company or brand name" />
                    </div>
                    <div>
                      <label className="block text-[var(--foreground-heading)] font-medium mb-1.5 text-xs sm:text-sm">Timeline *</label>
                      <select name="timeline" value={formData.timeline} onChange={handleChange} required className="w-full px-3.5 py-2.5 sm:py-3 bg-[var(--background-alt)] border border-[var(--border)] rounded-xl text-[var(--foreground-heading)] text-xs sm:text-sm focus:border-[#9D26FF] focus:outline-none transition-all">
                        <option value="">Select project timeline</option>
                        <option value="Immediately">Immediately</option>
                        <option value="Within a month">Within a month</option>
                        <option value="Just exploring">Just exploring</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[var(--foreground-heading)] font-medium mb-1.5 text-xs sm:text-sm">Monthly Budget *</label>
                      <select name="adSpendBudget" value={formData.adSpendBudget} onChange={handleChange} required className="w-full px-3.5 py-2.5 sm:py-3 bg-[var(--background-alt)] border border-[var(--border)] rounded-xl text-[var(--foreground-heading)] text-xs sm:text-sm focus:border-[#9D26FF] focus:outline-none transition-all">
                        <option value="">Select budget range</option>
                        <option value="Under $500/month">Under $500/month</option>
                        <option value="$500 – $1,000/month">$500 – $1,000/month</option>
                        <option value="$1,000 – $3,000/month">$1,000 – $3,000/month</option>
                        <option value="$3,000 – $10,000/month">$3,000 – $10,000/month</option>
                        <option value="$10,000+/month">$10,000+/month</option>
                        <option value="Other">Other (please specify)</option>
                      </select>
                      {formData.adSpendBudget === 'Other' && (
                        <input
                          type="text"
                          name="customBudget"
                          value={formData.customBudget}
                          onChange={handleChange}
                          required
                          className="w-full mt-2 px-3.5 py-2 sm:py-2.5 bg-[var(--background-alt)] border border-[var(--border)] rounded-xl text-[var(--foreground-heading)] text-xs sm:text-sm placeholder-[var(--foreground-muted)] focus:border-[#9D26FF] focus:outline-none transition-all"
                          placeholder="Specify custom budget (e.g. $15,000 or One-time $2k)"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-[var(--foreground-heading)] font-medium mb-1.5 text-xs sm:text-sm">{dynamicField.label}</label>
                      {dynamicField.type === 'select' ? (
                        <select name="serviceScope" value={formData.serviceScope} onChange={handleChange} required className="w-full px-3.5 py-2.5 sm:py-3 bg-[var(--background-alt)] border border-[var(--border)] rounded-xl text-[var(--foreground-heading)] text-xs sm:text-sm focus:border-[#9D26FF] focus:outline-none transition-all">
                          <option value="">{dynamicField.placeholder}</option>
                          {dynamicField.options.map((opt, idx) => (
                            <option key={idx} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={dynamicField.label.toLowerCase().includes('url') ? 'url' : 'text'}
                          name="serviceScope"
                          value={formData.serviceScope}
                          onChange={handleChange}
                          required
                          className="w-full px-3.5 py-2.5 sm:py-3 bg-[var(--background-alt)] border border-[var(--border)] rounded-xl text-[var(--foreground-heading)] text-xs sm:text-sm placeholder-[var(--foreground-muted)] focus:border-[#9D26FF] focus:outline-none transition-all"
                          placeholder={dynamicField.placeholder}
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[var(--foreground-heading)] font-medium mb-1.5 text-xs sm:text-sm">Current Pain Point / Primary Goal *</label>
                    <textarea name="painPointGoal" value={formData.painPointGoal} onChange={handleChange} required rows={3} className="w-full px-3.5 py-2.5 sm:py-3 bg-[var(--background-alt)] border border-[var(--border)] rounded-xl text-[var(--foreground-heading)] text-xs sm:text-sm placeholder-[var(--foreground-muted)] focus:border-[#9D26FF] focus:outline-none transition-all resize-none" placeholder="Describe your current main challenge (e.g., high ACoS, low listing conversion, website redesign) and target growth goal..." />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center group text-xs sm:text-sm cursor-pointer disabled:opacity-50"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Send size={16} className="mr-2" />
                    <span>{isSubmitting ? "Submitting Request..." : "Book a Free Consultation"}</span>
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomPlanModal;
