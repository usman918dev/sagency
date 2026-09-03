"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, User } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    query: ''
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
          whatsapp: formData.phone,
          service: 'General Inquiry Form',
          package: 'General Inquiry',
          details: formData.query
        })
      });
    } catch (err) {
      console.error('ContactForm submit error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);

      setFormData({
        name: '',
        email: '',
        phone: '',
        query: ''
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section className="py-24 px-6 bg-[var(--background-alt)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#9D26FF] text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground-heading)] mb-4">
            Ready to Start Your{" "}
            <span className="text-[#9D26FF]">
              Next Project?
            </span>
          </h2>
          <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto leading-relaxed">
            Let&apos;s discuss your project requirements and see how Derixio can bring your vision to life with precision engineering and design.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-[var(--foreground-heading)] mb-6">Contact Information</h3>
              <div className="space-y-5">
                <a href="mailto:hello@derixio.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 agenko-glass border border-[#9D26FF]/30 rounded-xl flex items-center justify-center shadow-md group-hover:border-[#9D26FF] transition-colors">
                    <Mail className="w-6 h-6 text-[#9D26FF]" />
                  </div>
                  <div>
                    <p className="text-[var(--foreground-muted)] text-xs font-semibold uppercase tracking-wider">Email Us</p>
                    <p className="text-[var(--foreground-heading)] font-medium group-hover:text-[#9D26FF] transition-colors">hello@derixio.com</p>
                  </div>
                </a>

                <a href="tel:+923024165348" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 agenko-glass border border-[#9D26FF]/30 rounded-xl flex items-center justify-center shadow-md group-hover:border-[#9D26FF] transition-colors">
                    <Phone className="w-6 h-6 text-[#9D26FF]" />
                  </div>
                  <div>
                    <p className="text-[var(--foreground-muted)] text-xs font-semibold uppercase tracking-wider">Call Us</p>
                    <p className="text-[var(--foreground-heading)] font-medium group-hover:text-[#9D26FF] transition-colors">+92 302 4165348</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 agenko-glass border border-[#9D26FF]/30 rounded-xl flex items-center justify-center shadow-md">
                    <MapPin className="w-6 h-6 text-[#9D26FF]" />
                  </div>
                  <div>
                    <p className="text-[var(--foreground-muted)] text-xs font-semibold uppercase tracking-wider">Headquarters</p>
                    <p className="text-[var(--foreground-heading)] font-medium">Lahore, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-xl">
              <h4 className="text-[var(--foreground-heading)] font-bold mb-2">Quick Response Guarantee</h4>
              <p className="text-[var(--foreground-muted)] text-sm leading-relaxed">
                Derixio typical inquiry response time is within 24 business hours.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] rounded-3xl p-8 shadow-2xl"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full agenko-glass border border-[#9D26FF]/40 flex items-center justify-center text-[#9D26FF] mx-auto mb-4">
                  <Send className="w-8 h-8 text-[#9D26FF]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[var(--foreground-heading)] mb-2">Thank You!</h3>
                <p className="text-[#9D26FF] text-sm sm:text-base font-bold mb-2">
                  Your request has been received successfully.
                </p>
                <p className="text-[var(--foreground-muted)] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Our team will review your project details and contact you within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[var(--foreground-heading)] font-medium mb-2 text-sm">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--foreground-muted)]" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl pl-12 pr-4 py-3.5 text-[var(--input-text)] placeholder-[var(--input-placeholder)] focus:border-[#9D26FF] focus:outline-none transition-colors duration-200"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[var(--foreground-heading)] font-medium mb-2 text-sm">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--foreground-muted)]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl pl-12 pr-4 py-3.5 text-[var(--input-text)] placeholder-[var(--input-placeholder)] focus:border-[#9D26FF] focus:outline-none transition-colors duration-200"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[var(--foreground-heading)] font-medium mb-2 text-sm">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--foreground-muted)]" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl pl-12 pr-4 py-3.5 text-[var(--input-text)] placeholder-[var(--input-placeholder)] focus:border-[#9D26FF] focus:outline-none transition-colors duration-200"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[var(--foreground-heading)] font-medium mb-2 text-sm">Project Details *</label>
                <textarea
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-4 py-3 text-[var(--input-text)] placeholder-[var(--input-placeholder)] focus:border-[#9D26FF] focus:outline-none transition-colors duration-200 resize-none"
                  placeholder="Tell us about your project goals, scope, and timeline..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full bg-[#9D26FF] hover:bg-[#7C3AED] disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-[#9D26FF]/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending Inquiry...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Inquiry
                  </>
                )}
              </motion.button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;