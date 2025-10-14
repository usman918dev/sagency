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
import Image from "next/image";
import { motion } from "framer-motion"
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
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <footer className="relative  ">
      {/* Background Effects */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/3 rounded-full blur-3xl"></div>
      </div> */}

      <div className="relative z-10">
        {/* Newsletter Section */}
        {/* <div className=" bg-[#1c2131] py-10">
          <div className="g-px py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to start your{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    next project?
                  </span>
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Join our newsletter for the latest updates, industry insights,
                  and exclusive offers.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors duration-200"
                  />
                </div>
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 flex items-center gap-2 whitespace-nowrap">
                  Subscribe
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div> */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className=" bg-[#1c2131]"
        >
          <motion.div
            variants={itemVariants}
            className="relative rounded-3xl py-32 px-8 g-px"
          >
            <div className="backdrop-blur-md rounded-2xl bg-blue-500/10 border border-blue-500/20 p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <h2 className="font-bold text-4xl md:text-5xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                    Ready to start your{" "}
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      next project?
                    </span>
                  </h2>
                  <p className="text-lg text-gray-300 font-light max-w-2xl">
                    Join our newsletter for the latest updates, industry insights,
                    and exclusive offers.
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md p-1">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full bg-black/30 px-6 py-4 text-white placeholder-gray-400 rounded-lg focus:outline-none"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 px-6 rounded-xl font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg shadow-orange-900/30 flex items-center justify-center gap-2"
                    >
                      Subscribe
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        {/* Main Footer Content */}
        <div className=" px-6 py-16 bg-gradient-to-r from-[#1b2439] via-[#16213e] to-[#1b2439]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 g-px">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Image src="/assets/logomain.png" alt="SAgency Logo" width={150} height={50} className="mb-4" />
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
              <h3 className="text-lg font-semibold text-white mb-6 ml-4">Company</h3>
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
              <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white">
                  <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span>hello@sagency.com</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span>123 Business Ave, Suite 100, City, State 12345</span>
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
                © {currentYear} SAgency. All rights reserved. Made with ❤️ by
                our team.
              </div>
              <div className="flex items-center gap-6 text-sm">
                <a
                  href="/sitemap"
                  className="text-white hover:text-orange-400 transition-colors duration-200"
                >
                  Sitemap
                </a>
                <a
                  href="/accessibility"
                  className="text-white hover:text-orange-400 transition-colors duration-200"
                >
                  Accessibility
                </a>
                <div className="text-gray-500">
                  Built with Next.js & Tailwind CSS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
