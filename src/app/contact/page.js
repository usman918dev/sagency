"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  CheckCircle
} from 'lucide-react';

// Contact Info Component
const ContactInfo = () => {
  const contactDetails = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@sagency.com",
      link: "mailto:hello@sagency.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      label: "Address",
      value: "123 Digital Avenue, Tech City, TC 12345",
      link: "#"
    }
  ];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Title */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Let&apos;s Talk!
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Ready to bring your vision to life? We&apos;re here to help you create
          something extraordinary. Drop us a line and let&apos;s start building
          your digital future together.
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-6">
        {contactDetails.map((detail, index) => (
          <motion.a
            key={index}
            href={detail.link}
            className="flex items-center space-x-4 group hover:text-[#F25725] transition-colors duration-300"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-[#F25725]/20 transition-all duration-300 border border-gray-700 group-hover:border-[#F25725]/50">
              <detail.icon size={20} className="text-gray-400 group-hover:text-[#F25725]" />
            </div>
            <div>
              <div className="text-sm text-gray-400 group-hover:text-[#F25725]/80">
                {detail.label}
              </div>
              <div className="text-white group-hover:text-[#F25725] font-medium">
                {detail.value}
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Availability Note */}
      <motion.div
        className="bg-gray-800/30 border border-gray-700 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-white font-semibold mb-2">W&apos;re Available 24/7</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Our team is always ready to help. Whether you have a question about
          our services or want to discuss your next project, we&apos;re just a message away.
        </p>
      </motion.div>

      {/* Social Links */}
      <SocialLinks />
    </motion.div>
  );
};

// Social Links Component
const SocialLinks = () => {
  const socialPlatforms = [
    { icon: Facebook, link: "#", name: "Facebook" },
    { icon: Twitter, link: "#", name: "Twitter" },
    { icon: Instagram, link: "#", name: "Instagram" },
    { icon: Linkedin, link: "#", name: "LinkedIn" },
    { icon: Github, link: "#", name: "GitHub" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <h3 className="text-white font-semibold mb-4">Follow Us</h3>
      <div className="flex space-x-4">
        {socialPlatforms.map((platform, index) => (
          <motion.a
            key={index}
            href={platform.link}
            className="w-10 h-10 border border-[#F25725]/50 rounded-full flex items-center justify-center hover:bg-[#F25725] hover:border-[#F25725] transition-all duration-300 group"
            aria-label={platform.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <platform.icon
              size={16}
              className="text-gray-400 group-hover:text-white transition-colors duration-300"
            />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>

        {isSubmitted ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Thank You!</h4>
            <p className="text-gray-300">
              We&apos;ve received your message and will get back to you soon.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.name
                      ? 'border-red-500 focus:ring-red-500/50'
                      : 'border-gray-600 focus:border-[#F25725] focus:ring-[#F25725]/50'
                    }`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.email
                      ? 'border-red-500 focus:ring-red-500/50'
                      : 'border-gray-600 focus:border-[#F25725] focus:ring-[#F25725]/50'
                    }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.subject
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-gray-600 focus:border-[#F25725] focus:ring-[#F25725]/50'
                  }`}
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 resize-none transition-all duration-300 ${errors.message
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-gray-600 focus:border-[#F25725] focus:ring-[#F25725]/50'
                  }`}
                placeholder="Tell us about your project or question..."
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white font-semibold rounded-xl shadow-lg shadow-[#F25725]/25 hover:shadow-xl hover:shadow-[#F25725]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

// Main Contact Page Component
const ContactPage = () => {
  return (
    <main className="min-h-screen bg-[#1c2131] overflow-hidden">
      <section className="relative py-32 px-6">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Background */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-[#1c2131] via-[#1a1f2e] to-black" /> */}

          {/* Glowing Gradient Blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#F25725]/20 to-[#ff6b35]/10 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#1b2439]/30 to-[#16213e]/20 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/2" />

          {/* Diagonal Line Texture */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 60px,
                rgba(255,255,255,0.1) 60px,
                rgba(255,255,255,0.1) 62px
              )`
            }} />
          </div>
        </div>

        {/* Decorative Ring in Top-Left Corner */}
        <motion.div
          className="absolute top-0 left-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 z-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full border-4 border-[#F25725]/40 border-dashed rounded-full" />
        </motion.div>

        {/* Floating Ring Top-Right */}
        <motion.div
          className="absolute top-20 right-20 w-16 h-16 z-10 hidden md:block"
          animate={{ rotate: -360, y: [0, -10, 0] }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-full h-full border-2 border-[#F25725]/60 rounded-full" />
        </motion.div>

        {/* Main Content Container */}
        <div className="relative z-20 max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[#F25725] text-sm font-bold uppercase tracking-wider mb-4">
              Contact Us
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Ready to Start
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F25725] to-[#ff6b35]">
                Something Amazing?
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Let&apos;s turn your ideas into reality. Whether you need a stunning website,
              a powerful mobile app, or comprehensive digital strategy, we&apos;re here to help
              you achieve your goals.
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Contact Info */}
            <ContactInfo />

            {/* Right Column - Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
