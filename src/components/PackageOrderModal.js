"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Send, Package, Calendar, Building, User, Mail, Phone } from 'lucide-react';

const PackageOrderModal = ({ isOpen, onClose, packageName, packagePrice, serviceName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    whatsapp: '',
    details: '',
    startDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          company: formData.company,
          service: serviceName || 'Package Order',
          package: `${packageName} (${packagePrice})`,
          startDate: formData.startDate || 'As Soon As Possible',
          details: formData.details
        })
      });
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setFormData({
          name: '',
          email: '',
          company: '',
          whatsapp: '',
          details: '',
          startDate: ''
        });
      }, 5000);
    }
  };

  if (!isOpen) return null;

  const displayTitle = serviceName ? `${serviceName} — ${packageName}` : packageName;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-2xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto my-auto"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-1.5 sm:p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground-heading)] bg-[var(--background-alt)] border border-[var(--border)] rounded-full transition-colors z-30"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {isSubmitted ? (
            <motion.div
              className="text-center py-8 sm:py-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-[#9D26FF] mx-auto mb-3 sm:mb-4" />
              <h3 className="text-2xl sm:text-3xl font-black text-[var(--foreground-heading)] mb-2">Thank You!</h3>
              <p className="text-[#9D26FF] text-sm sm:text-base font-bold mb-2">
                Your request has been received successfully.
              </p>
              <p className="text-[var(--foreground-muted)] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Our team will review your project details and contact you within 24 business hours.
              </p>
            </motion.div>
          ) : (
            <div>
              {/* Heading */}
              <div className="text-center mb-4 sm:mb-6 pr-8 sm:pr-0">
                <h3 className="text-lg sm:text-2xl font-extrabold text-[var(--foreground-heading)] mb-1">
                  Start Your Selected Package
                </h3>
                <p className="text-[var(--foreground-muted)] text-xs sm:text-sm">
                  Fill in your details below to confirm and start your project with Derixio.
                </p>
              </div>

              {/* Selected Package Banner */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[var(--background-alt)] border border-[var(--border)] flex items-center justify-between shadow-md">
                <div className="flex items-center space-x-2.5 sm:space-x-3 pr-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#9D26FF]/15 border border-[#9D26FF]/30 flex items-center justify-center text-[#9D26FF] flex-shrink-0">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-[var(--foreground-muted)] font-semibold uppercase tracking-wider">Selected Package</p>
                    <p className="text-[var(--foreground-heading)] font-bold text-xs sm:text-base leading-tight">{displayTitle}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] sm:text-xs text-[var(--foreground-muted)] font-semibold uppercase tracking-wider">Price</p>
                  <span className="inline-block text-sm sm:text-lg font-black text-[#9D26FF]">{packagePrice}</span>
                </div>
              </div>

              {/* Order Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[var(--foreground-heading)] font-medium mb-1 text-[11px] sm:text-xs uppercase tracking-wider">Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)]" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-[var(--background-alt)] border border-[var(--border)] rounded-xl pl-9 pr-3.5 py-2.5 sm:py-3 text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-xs sm:text-sm focus:border-[#9D26FF] focus:outline-none transition-colors duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[var(--foreground-heading)] font-medium mb-1 text-[11px] sm:text-xs uppercase tracking-wider">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)]" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[var(--background-alt)] border border-[var(--border)] rounded-xl pl-9 pr-3.5 py-2.5 sm:py-3 text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-xs sm:text-sm focus:border-[#9D26FF] focus:outline-none transition-colors duration-200"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Company Name */}
                  <div>
                    <label className="block text-[var(--foreground-heading)] font-medium mb-1 text-[11px] sm:text-xs uppercase tracking-wider">Company Name</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)]" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-[var(--background-alt)] border border-[var(--border)] rounded-xl pl-9 pr-3.5 py-2.5 sm:py-3 text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-xs sm:text-sm focus:border-[#9D26FF] focus:outline-none transition-colors duration-200"
                        placeholder="Company or Organization"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label className="block text-[var(--foreground-heading)] font-medium mb-1 text-[11px] sm:text-xs uppercase tracking-wider">WhatsApp Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)]" />
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        required
                        className="w-full bg-[var(--background-alt)] border border-[var(--border)] rounded-xl pl-9 pr-3.5 py-2.5 sm:py-3 text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-xs sm:text-sm focus:border-[#9D26FF] focus:outline-none transition-colors duration-200"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferred Start Date */}
                <div>
                  <label className="block text-[var(--foreground-heading)] font-medium mb-1 text-[11px] sm:text-xs uppercase tracking-wider">Preferred Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)]" />
                    <input
                      type="text"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full bg-[var(--background-alt)] border border-[var(--border)] rounded-xl pl-9 pr-3.5 py-2.5 sm:py-3 text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-xs sm:text-sm focus:border-[#9D26FF] focus:outline-none transition-colors duration-200"
                      placeholder="e.g. As soon as possible / MM/DD/YYYY"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-[var(--foreground-heading)] font-medium mb-1 text-[11px] sm:text-xs uppercase tracking-wider">Project Details *</label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full bg-[var(--background-alt)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 sm:py-3 text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] text-xs sm:text-sm focus:border-[#9D26FF] focus:outline-none transition-colors duration-200 resize-none"
                    placeholder="Tell us about your project requirements and goals..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                  className="w-full py-3 sm:py-4 bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2 text-xs sm:text-sm mt-2 sm:mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      <span>Processing Order Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" />
                      <span>Submit Order Request ({packagePrice})</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PackageOrderModal;
