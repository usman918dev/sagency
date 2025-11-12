"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Facebook, Instagram, Globe } from 'lucide-react';

const TeamSection = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Abdul Moiz",
      role: "Digital marketing expert",
      image: "/assets/abdulmoiz.jpg",
      bio: "Visionary leader with 10+ years in digital transformation and business strategy.",
      skills: ["Leadership", "Strategy", "Innovation"],
      social: {
        linkedin: "https://www.linkedin.com/in/abdul-moiz-38b886297",
        facebook: "https://www.facebook.com/share/16NQz5Jf7Z/?mibextid=wwXIfr",
        instagram: "https://www.instagram.com/moizfaiz59?igsh=OTMwMm5teHR5bGY4&utm_source=qr",
        email: "abdulmoiz@empowrise.org"
      }
    },
    {
      id: 2,
      name: "Muhammad Sajjad Ahmad",
      role: "Senior Graphic Designer",
      image: "/assets/sajjad.png",
      bio: "Amazon and ECommerce Graphic Designer specializing in Listings, A+ content, and Branding",
      skills: ["Packaging Designer", "Branding", "Creative Direction"],
      social: {
        linkedin: "https://www.linkedin.com/in/sajjadahmadaulakh/",
        facebook: "https://www.facebook.com/sajjadahmad06",
        instagram: "https://www.instagram.com/sajjadgraphicspk/",
        email: "sajjad@empowrise.org"
      }
    },
    {
      id: 3,
      name: "Muhammad Usman",
      role: "Graphic Designer",
      image: "/assets/muhammadusman.png",
      bio: "Expert graphic designer specializing in high-converting eCommerce visuals.",
      skills: ["Graphic Designer", "Packaging Designer", "Amazon Graphic Designer"],
      social: {
        linkedin: "https://www.linkedin.com/in/muhammadusmanlurka/",
        behance: "https://www.behance.net/muhammadusman2521",
        instagram: "https://www.instagram.com/gfxusman/",
        facebook: "https://www.facebook.com/usman.gfx.2025"
      }
    },
    {
      id: 4,
      name: "Shahzad Jaffar",
      role: "Graphic Designer",
      image: "/assets/shahzad.jpg",
      bio: "Professional Graphic Designer dedicated to crafting visuals that tell your brand story and attract buyers.",
      skills: ["Graphic Designer", "Packaging Designer", "Listing Expert"],
      social: {
        facebook: "https://www.facebook.com/profile.php?id=61557120982192",
        linkedin: "https://www.linkedin.com/in/shahzad-jaffar-a71b44252/",
        instagram: "https://www.instagram.com/designersj786/",
        behance: "https://www.behance.net/shahzadjaffar5264"
      }
    },
    {
      id: 5,
      name: "Faizan Ali",
      role: "Web developer",
      image: "/assets/faizan.jpg",
      bio: "Mern Stack Developer specializing in Front end and Designing.",
      skills: ["Web Developer", "Designer"],
      social: {
        linkedin: "https://www.linkedin.com/in/faizan-ali-32262522b"
      }
    },
    {
      id: 6,
      name: "Khadija Mussab",
      role: "Digital Marketer",
      image: "/assets/khadijha.jpg",
      bio: "Driving brand growth through social media and targeted ads.",
      skills: ["Social Media Marketing Expert", "Facebook & Instagram Ads Specialist"],
      social: {
        linkedin: "https://www.linkedin.com/in/khadija-shoaib-2a7655395",
        facebook: "https://www.facebook.com/share/1CuHHPJHor/",
        instagram: "https://www.instagram.com/marketingkhadija_?igsh=OGw0ODV3OW43NW9i"
      }
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#1c2131] via-[#1a1f2e] to-[#1c2131]">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-[#F25725]/10 to-[#ff6b35]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-bl from-[#F25725]/10 to-[#ff6b35]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[#F25725] text-sm font-bold uppercase tracking-wider mb-4">
            Our Team
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Meet the Creative Minds
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F25725] to-[#ff6b35]">
              Behind Our Success
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Our diverse team of passionate professionals brings together years of experience,
            creativity, and technical expertise to deliver exceptional results for every project.
          </p>
        </motion.div>

        {/* Team Grid - Expert Modern Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group h-full"
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
            >
              {/* Card Container with Premium Aesthetics */}
              <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-white/8 via-white/3 to-transparent backdrop-blur-xl border border-white/15 shadow-2xl transition-all duration-500 group-hover:border-white/30 flex flex-col p-8">


                {/* Content Container */}
                <div className="relative z-10 flex flex-col h-full">

                  {/* Header Section - Profile Image */}
                  <div className="mb-6">
                    <motion.div
                      className="relative mx-auto w-32 h-32"
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Glowing Background Ring */}
                      {/* <div className="absolute inset-0 bg-gradient-to-r from-[#F25725]/40 to-[#ff6b35]/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> */}

                      {/* Image Ring with Border */}
                      {/* <div className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-[#F25725]/50 to-[#ff6b35]/30 group-hover:border-[#F25725]/80 transition-all duration-500 opacity-0 group-hover:opacity-100"></div> */}

                      {/* Main Image */}
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center overflow-hidden border-4 border-white/20 group-hover:border-[#F25725]/60 transition-all duration-500">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full group-hover:scale-120 transition-transform duration-500"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.nextElementSibling;
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                        {/* Fallback Initials */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#F25725]/30 to-[#ff6b35]/20 flex items-center justify-center rounded-full hidden">
                          <span className="text-white font-bold text-3xl">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>

                      {/* Status Dot */}
                      <motion.div
                        className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full border-4 border-[#1c2131] shadow-lg"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="inset-1 absolute w-full h-full bg-emerald-300 rounded-full opacity-75"></div>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Name Section */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#F25725] group-hover:to-[#ff6b35] transition-all duration-300">
                      {member.name}
                    </h3>

                    {/* Role Badge */}
                    <div className="inline-block">
                      <p className="text-sm font-semibold bg-gradient-to-r from-[#F25725]/30 to-[#ff6b35]/20 text-[#F25725] px-4 py-2 rounded-xl border border-[#F25725]/30 group-hover:border-[#F25725]/60 transition-colors duration-300">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 text-center flex-grow">
                    {member.bio}
                  </p>

                  {/* Skills Section */}
                  {/* <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {member.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-[#F25725]/10 to-[#ff6b35]/5 text-[#F25725] rounded-full border border-[#F25725]/25 hover:border-[#F25725]/60 hover:bg-gradient-to-r hover:from-[#F25725]/20 hover:to-[#ff6b35]/10 transition-all duration-300 backdrop-blur-sm cursor-default"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div> */}

                  {/* Social Links - Premium Style */}
                  <div className="flex justify-center gap-3 pt-4 border-t border-white/10">
                    {member.social.linkedin && (
                      <motion.a
                        href={member.social.linkedin}
                        className="bg-gradient-to-br from-[#F25725] to-[#ff6b35] rounded-lg flex items-center justify-center h-10 w-10"
                        aria-label="LinkedIn"
                        whileHover={{ y: -6, scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Linkedin size={20} className='text-white'/>
                      </motion.a>
                    )}
                    {member.social.facebook && (
                      <motion.a
                        href={member.social.facebook}
                        className="bg-gradient-to-br from-[#F25725] to-[#ff6b35] rounded-lg flex items-center justify-center h-10 w-10"
                        aria-label="Facebook"
                        whileHover={{ y: -6, scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Facebook size={20} className='text-white'/>
                      </motion.a>
                    )}
                    {member.social.instagram && (
                      <motion.a
                        href={member.social.instagram}
                        className="bg-gradient-to-br from-[#F25725] to-[#ff6b35] rounded-lg flex items-center justify-center h-10 w-10"
                        aria-label="Instagram"
                        whileHover={{ y: -6, scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Instagram size={20} className='text-white'/>
                      </motion.a>
                    )}
                    {member.social.behance && (
                      <motion.a
                        href={member.social.behance}
                        className="bg-gradient-to-br from-[#F25725] to-[#ff6b35] rounded-lg flex items-center justify-center h-10 w-10"
                        aria-label="Behance"
                        whileHover={{ y: -6, scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Globe size={20} className='text-white'/>
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Border Glow Effect */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#F25725]/0 via-[#F25725]/10 to-[#ff6b35]/0"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Want to Join Our Team?</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We&apos;re always looking for talented individuals who share our passion for
              creating exceptional digital experiences. Let&apos;s build something amazing together.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white font-semibold rounded-full shadow-lg shadow-[#F25725]/25 hover:shadow-xl hover:shadow-[#F25725]/40 transition-all duration-300 hover:scale-105">
              <Mail size={20} className="mr-2" />
              Get In Touch
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;