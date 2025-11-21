"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  ArrowRight,
  Send,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import FooterContactForm from "./FooterContactForm";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate subscription
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Newsletter subscription:', newsletterEmail);
    setIsSubscribing(false);
    setNewsletterEmail("");
    alert('Successfully subscribed to newsletter!');
  };

  const services = [
    { name: "Web Development", href: "/services/web-development" },
    { name: "Mobile Apps", href: "/services/mobile-apps" },
    { name: "Digital Marketing", href: "/services/digital-marketing" },
    { name: "SEO Services", href: "/services/seo" },
    { name: "Brand Design", href: "/services/brand-design" },
    { name: "E-commerce", href: "/services/ecommerce" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    // { name: "Careers", href: "/careers" },
    { name: "Portfolio", href: "/portfolio" },
    // { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#1c2131] via-[#16213e] to-[#101828]">
      <div className="relative z-10">
        {/* Main Footer Content with Integrated Newsletter */}
        <div className="px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Company Info - 3 columns */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <Image src="/assets/logomain.png" alt="empowrise Logo" width={150} height={50} className="mb-4" />
                <p className="text-gray-300 leading-relaxed text-sm">
                  We&apos;re a creative digital agency specializing in web
                  development, mobile apps, and digital marketing. Let&apos;s
                  transform your ideas into powerful digital experiences.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center text-gray-300 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services - 2 columns */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-white mb-6">
                Services
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center gap-2 group text-sm"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company - 2 columns */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center gap-2 group text-sm"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter CTA - 2 columns */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-white mb-4">
                Newsletter
              </h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Subscribe to get the latest updates and exclusive offers.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full bg-gray-900/50 border border-gray-600/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors duration-200 text-sm"
                />
                <motion.button
                  type="submit"
                  disabled={isSubscribing}
                  whileHover={{ scale: isSubscribing ? 1 : 1.02 }}
                  whileTap={{ scale: isSubscribing ? 1 : 0.98 }}
                  className="w-full py-2.5 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  {isSubscribing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Contact Form - 3 columns */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Contact
              </h3>
              <FooterContactForm />
            </div>
          </div>

          {/* Contact Info Bar */}
          <div className="mt-12 pt-8 border-t border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span className="text-sm">team@empowrise.org</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span className="text-sm">+92 345 8187381</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span className="text-sm">Jaranwala Faisalabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span className="text-sm">Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 bg-[#0a0f1a]">
          <div className="px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © {currentYear} Empowrise. All rights reserved. Made with ❤️ by
                our team.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
