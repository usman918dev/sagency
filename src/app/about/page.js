"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, Users } from 'lucide-react';
import TeamSection from '../../ui/team/TeamSection';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#1c2131] overflow-hidden">
      {/* Hero About Section */}
      <section className="relative py-32 bg-[#1c2131]">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Blobs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#F25725]/20 to-[#ff6b35]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#F25725]/15 to-[#ff6b35]/5 rounded-full blur-3xl"></div>
          
          {/* Diagonal Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 50px,
                rgba(255,255,255,0.1) 50px,
                rgba(255,255,255,0.1) 52px
              )`
            }}></div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[#F25725] text-sm font-bold uppercase tracking-wider mb-4">
              About Us
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Building Digital Excellence
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F25725] to-[#ff6b35]">
                One Project at a Time
              </span>
            </h1>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Transforming Ideas Into 
                  <span className="text-[#F25725]"> Digital Reality</span>
                </h2>
                
                <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-6">
                  We are a passionate team of digital innovators, designers, and developers 
                  dedicated to creating exceptional digital experiences. With years of expertise 
                  in web development, mobile applications, and digital marketing, we help 
                  businesses thrive in the digital landscape.
                </p>
                
                <p className="text-gray-400 leading-relaxed max-w-xl">
                  Our mission is simple: deliver cutting-edge solutions that not only meet 
                  your business goals but exceed your expectations. We believe in the power 
                  of collaboration, innovation, and attention to detail in every project we undertake.
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="text-2xl font-bold text-[#F25725] mb-1">150+</div>
                  <div className="text-sm text-gray-400">Projects Delivered</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="text-2xl font-bold text-[#F25725] mb-1">5+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="text-2xl font-bold text-[#F25725] mb-1">100%</div>
                  <div className="text-sm text-gray-400">Client Satisfaction</div>
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white font-semibold rounded-full shadow-lg shadow-[#F25725]/25 hover:shadow-xl hover:shadow-[#F25725]/40 transition-all duration-300 hover:scale-105">
                  <span>Get In Touch</span>
                  <ArrowRight 
                    size={20} 
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                  />
                </button>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Area */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                {/* Main Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#F25725]/10 to-transparent"></div>
                  
                  {/* Decorative Content in Image Area */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-[#F25725] to-[#ff6b35] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#F25725]/30">
                        <Sparkles size={40} className="text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white">Innovation First</h3>
                        <p className="text-gray-400 text-sm max-w-xs">
                          We combine creativity with cutting-edge technology to deliver exceptional results
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Ring - Top Right Corner */}
                <motion.div
                  className="absolute -top-8 -right-8 w-32 h-32"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-full h-full border-4 border-[#F25725]/30 border-dashed rounded-full"></div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-[#F25725] rounded-full"></div>
                <div className="absolute bottom-6 right-6 w-2 h-2 bg-[#ff6b35] rounded-full"></div>
                <div className="absolute top-1/3 right-4 w-1 h-8 bg-gradient-to-b from-[#F25725] to-transparent"></div>
              </div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F25725] to-[#ff6b35] rounded-lg flex items-center justify-center">
                    <Target size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Goal Oriented</div>
                    <div className="text-gray-400 text-xs">Results that matter</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-xl"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F25725] to-[#ff6b35] rounded-lg flex items-center justify-center">
                    <Users size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Expert Team</div>
                    <div className="text-gray-400 text-xs">Skilled professionals</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Values Section */}
      <section className="relative py-20 bg-[#1c2131]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-[#F25725]">Our Agency?</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We don&apos;t just build websites and apps – we craft digital experiences that drive real business results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Creative Excellence",
                description: "We blend artistic vision with technical expertise to create stunning digital experiences that captivate your audience."
              },
              {
                icon: Target,
                title: "Results Focused",
                description: "Every project is designed with your business goals in mind, ensuring measurable ROI and sustainable growth."
              },
              {
                icon: Users,
                title: "Client Partnership",
                description: "We work as an extension of your team, maintaining transparent communication throughout the entire project lifecycle."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#F25725]/50 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#F25725] to-[#ff6b35] rounded-xl flex items-center justify-center mb-6">
                  <item.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />
    </main>
  );
};

export default AboutPage;
