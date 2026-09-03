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
      label: "Email Us",
      value: "hello@derixio.com",
      link: "mailto:hello@derixio.com"
    },
    {
      icon: Phone,
      label: "Call Us",
      value: "+92 302 4165348",
      link: "tel:+923024165348"
    },
    {
      icon: MapPin,
      label: "Headquarters",
      value: "Lahore, Pakistan",
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
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground-heading)] mb-4">
          Let&apos;s Build Together!
        </h2>
        <p className="text-[var(--foreground-muted)] leading-relaxed text-base">
          Ready to scale your business with Derixio? We build bespoke software, modern brand identity, and high-performance digital marketing solutions. Drop us a line below.
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-6">
        {contactDetails.map((detail, index) => (
          <motion.a
            key={index}
            href={detail.link}
            className="flex items-center space-x-4 group hover:text-[#9D26FF] transition-colors duration-300"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="w-14 h-14 bg-[var(--background-alt)] rounded-2xl flex items-center justify-center group-hover:bg-[#9D26FF]/20 transition-all duration-300 border border-[var(--border)] group-hover:border-[#9D26FF] shadow-md">
              <detail.icon size={22} className="text-[var(--foreground-muted)] group-hover:text-[#9D26FF]" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)] group-hover:text-[#9D26FF]">
                {detail.label}
              </div>
              <div className="text-[var(--foreground-heading)] group-hover:text-[#9D26FF] font-bold text-lg">
                {detail.value}
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Availability Note */}
      <motion.div
        className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-[var(--foreground-heading)] font-bold mb-2">Derixio Support Guarantee</h3>
        <p className="text-[var(--foreground-muted)] text-sm leading-relaxed">
          Our global team handles inquiries around the clock. You can expect a response within 24 business hours.
        </p>
      </motion.div>

      {/* Social Links */}
      <SocialLinks />
    </motion.div>
  );
};

const BehanceIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...props}>
    <path d="M7.6 11.23c.87 0 1.48-.39 1.48-1.13 0-.69-.47-1.07-1.39-1.07H5.25v2.2h2.35zm.14 4.54c.98 0 1.65-.43 1.65-1.28 0-.82-.62-1.24-1.68-1.24H5.25v2.52h2.49zM2.5 6.5h5.45c2.3 0 3.73.98 3.73 2.5 0 1.11-.6 1.92-1.67 2.27 1.32.32 2.07 1.25 2.07 2.67 0 1.85-1.48 3.06-4.08 3.06H2.5V6.5zm14.15.5h5.36v1.5h-5.36V7zm.15 7.9c0-1.1.75-1.8 1.9-1.8 1.1 0 1.8.7 1.8 1.8h-3.7zm1.9-4.2c-2.48 0-4.1 1.7-4.1 4.1 0 2.45 1.62 4.2 4.2 4.2 1.9 0 3.4-1 3.9-2.6h-2.1c-.3.5-.9.9-1.7.9-1.1 0-1.9-.7-2-1.8h6c.03-.3.03-.5.03-.7 0-2.3-1.6-4.1-4.23-4.1z" />
  </svg>
);

const RedditIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...props}>
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.196-.491a1.69 1.69 0 0 1 1.692 1.692c0 .656-.37 1.221-.92 1.505.02.185.032.372.032.562 0 2.871-3.344 5.2-7.468 5.2-4.124 0-7.468-2.329-7.468-5.2 0-.19.012-.377.032-.562a1.683 1.683 0 0 1-.92-1.505 1.69 1.69 0 0 1 1.692-1.692c.466 0 .888.182 1.196.491 1.194-.856 2.85-1.418 4.674-1.488l.947-4.437a.375.375 0 0 1 .446-.29l3.074.648a1.25 1.25 0 0 1 1.05-.562zM9.25 12C8.56 12 8 12.56 8 13.25c0 .69.56 1.25 1.25 1.25.69 0 1.25-.56 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm5.5 0c-.69 0-1.25.56-1.25 1.25 0 .69.56 1.25 1.25 1.25.69 0 1.25-.56 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm-4.47 4.2c-.158 0-.28.118-.28.272 0 .154.122.272.28.272 1.034 0 2.406.002 3.44 0 .158 0 .28-.118.28-.272 0-.154-.122-.272-.28-.272-1.034 0-2.406-.002-3.44 0z" />
  </svg>
);

// Social Links Component
const SocialLinks = () => {
  const socialPlatforms = [
    { icon: Facebook, link: "https://web.facebook.com/derixio", name: "Facebook" },
    { icon: Instagram, link: "https://www.instagram.com/derixio_official/", name: "Instagram" },
    { icon: Linkedin, link: "https://www.linkedin.com/company/derixio/?viewAsMember=true", name: "LinkedIn" },
    { icon: BehanceIcon, link: "https://www.behance.net/derixiosolutio", name: "Behance" },
    { icon: RedditIcon, link: "https://www.reddit.com/user/derixio/", name: "Reddit" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <h3 className="text-[var(--foreground-heading)] font-bold mb-4 text-sm uppercase tracking-wider">Connect With Us</h3>
      <div className="flex space-x-3">
        {socialPlatforms.map((platform, index) => (
          <motion.a
            key={index}
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 bg-[var(--background-alt)] border border-[var(--border)] rounded-xl flex items-center justify-center hover:bg-[#9D26FF] hover:border-[#9D26FF] transition-all duration-300 group shadow-md"
            aria-label={platform.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <platform.icon
              size={18}
              className="text-[var(--foreground-muted)] group-hover:text-white transition-colors duration-300"
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
    service: '',
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

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service || formData.subject || 'General Contact Inquiry',
          package: 'General Contact',
          details: `Service Interested In: ${formData.service || 'Not specified'}\nSubject: ${formData.subject}\nMessage: ${formData.message}`
        })
      });
    } catch (err) {
      console.error('Contact submission error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', service: '', subject: '', message: '' });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] rounded-3xl p-8 shadow-2xl">
        <h3 className="text-2xl font-bold text-[var(--foreground-heading)] mb-6">Send us a Message</h3>

        {isSubmitted ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle size={64} className="text-[#9D26FF] mx-auto mb-4" />
            <h4 className="text-2xl sm:text-3xl font-black text-[var(--foreground-heading)] mb-2">Thank You!</h4>
            <p className="text-[#9D26FF] text-sm sm:text-base font-bold mb-2">
              Your request has been received successfully.
            </p>
            <p className="text-[var(--foreground-muted)] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Our team will review your project details and contact you within 24 business hours.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground-heading)] mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3.5 bg-[var(--background-alt)] border rounded-xl text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] focus:outline-none focus:ring-2 transition-all duration-300 ${errors.name
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-[var(--border)] focus:border-[#9D26FF] focus:ring-[#9D26FF]/30'
                    }`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground-heading)] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3.5 bg-[var(--background-alt)] border rounded-xl text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] focus:outline-none focus:ring-2 transition-all duration-300 ${errors.email
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-[var(--border)] focus:border-[#9D26FF] focus:ring-[#9D26FF]/30'
                    }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Service Interested In */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-[var(--foreground-heading)] mb-2">
                Service Interested In
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-[var(--background-alt)] border border-[var(--border)] rounded-xl text-[var(--foreground-heading)] focus:outline-none focus:ring-2 focus:border-[#9D26FF] focus:ring-[#9D26FF]/30 transition-all duration-300"
              >
                <option value="">Select a service</option>
                <option value="Amazon Growth">Amazon Growth</option>
                <option value="Web Development">Web Development</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="SEO">SEO</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Video & Motion Design">Video & Motion Design</option>
                <option value="Not Sure Yet">Not Sure Yet</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-[var(--foreground-heading)] mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`w-full px-4 py-3.5 bg-[var(--background-alt)] border rounded-xl text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] focus:outline-none focus:ring-2 transition-all duration-300 ${errors.subject
                  ? 'border-red-500 focus:ring-red-500/50'
                  : 'border-[var(--border)] focus:border-[#9D26FF] focus:ring-[#9D26FF]/30'
                  }`}
                placeholder="What project are you looking to build?"
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground-heading)] mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-3.5 bg-[var(--background-alt)] border rounded-xl text-[var(--foreground-heading)] placeholder-[var(--foreground-muted)] focus:outline-none focus:ring-2 resize-none transition-all duration-300 ${errors.message
                  ? 'border-red-500 focus:ring-red-500/50'
                  : 'border-[var(--border)] focus:border-[#9D26FF] focus:ring-[#9D26FF]/30'
                  }`}
                placeholder="Tell us about your project goals and scope..."
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold rounded-xl shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  <span>Sending Inquiry...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Submit Inquiry</span>
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
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden pt-20 md:pt-24 bg-agenko-grid">
      <section className="relative pt-4 md:pt-6 pb-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#9D26FF]/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Main Content Container */}
        <div className="relative z-20 g-px">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4">
              <Mail size={14} className="text-[#9D26FF]" />
              <span>CONTACT DERIXIO AGENCY</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[var(--foreground-heading)] leading-tight mb-6 tracking-tight">
              Ready to Start <br />
              <span className="text-[#9D26FF]">
                Your Digital Transformation?
              </span>
            </h1>
            <p className="text-[var(--foreground-muted)] text-base sm:text-lg leading-relaxed">
              Let&apos;s turn your vision into high-impact reality. Derixio engineers custom web applications, brand identity, and data-driven growth strategies.
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
