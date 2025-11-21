"use client";
import React from "react";
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
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    <footer className="relative">
      <div className="relative z-10">
        
        {/* Main Footer Content */}
        <div className="px-6 py-16 bg-gradient-to-r from-[#1b2439] via-[#16213e] to-[#1b2439]">
          
          {/* Minimal Newsletter Section - Integrated into footer */}
          <div className="g-px mb-16 pb-12 border-b border-gray-700/30">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Ready to start your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">next project?</span>
                </h3>
                <p className="text-gray-400">Join our newsletter for the latest updates and exclusive offers.</p>
              </div>
              <div className="w-full lg:w-1/2 max-w-md">
                 <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full bg-black/30 border border-gray-700/50 px-5 py-3 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="whitespace-nowrap px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg shadow-orange-900/30 flex items-center justify-center gap-2"
                    >
                      Subscribe
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 g-px">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <img 
                  src="/assets/logomain.png" 
                  alt="SAgency Logo" 
                  width={150} 
                  height={50} 
                  className="mb-4" 
                />
                <p className="text-white leading-relaxed mb-6">
                  We&apos;re a creative digital agency specializing in web
                  development, mobile apps, and digital marketing. Let&apos;s
                  transform your ideas into powerful digital experiences.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6 ml-4">
                Services
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="text-white hover:text-orange-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6 ml-4">
                Company
              </h3>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-white hover:text-orange-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6">
                Contact Us
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white">
                  <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span>team@sagency.org</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span>+92 345 8187381</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span>Jaranwala Faisalabad, Pakistan</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Clock className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 bg-[#101828]">
          <div className="g-px px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-white text-sm">
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