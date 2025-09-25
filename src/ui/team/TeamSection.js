"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const TeamSection = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Alex Rodriguez",
      role: "CEO & Founder",
      image: "/team/alex.jpg", // You can replace with actual image paths
      bio: "Visionary leader with 10+ years in digital transformation and business strategy.",
      skills: ["Leadership", "Strategy", "Innovation"],
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "alex@sagency.com"
      }
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Lead Designer",
      image: "/team/sarah.jpg",
      bio: "Creative mastermind specializing in user experience and brand identity design.",
      skills: ["UI/UX Design", "Branding", "Creative Direction"],
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "sarah@sagency.com"
      }
    },
    {
      id: 3,
      name: "Michael Johnson",
      role: "Senior Developer",
      image: "/team/michael.jpg",
      bio: "Full-stack developer passionate about creating scalable and efficient solutions.",
      skills: ["React", "Node.js", "Cloud Architecture"],
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "michael@sagency.com"
      }
    },
    {
      id: 4,
      name: "Emma Williams",
      role: "Digital Strategist",
      image: "/team/emma.jpg",
      bio: "Data-driven marketing expert focused on growth hacking and conversion optimization.",
      skills: ["Digital Marketing", "Analytics", "Growth Strategy"],
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "emma@sagency.com"
      }
    },
    {
      id: 5,
      name: "David Park",
      role: "Project Manager",
      image: "/team/david.jpg",
      bio: "Agile methodology expert ensuring seamless project delivery and client satisfaction.",
      skills: ["Project Management", "Agile", "Client Relations"],
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "david@sagency.com"
      }
    },
    {
      id: 6,
      name: "Lisa Thompson",
      role: "Quality Assurance",
      image: "/team/lisa.jpg",
      bio: "Meticulous QA specialist dedicated to delivering bug-free, high-quality products.",
      skills: ["Quality Assurance", "Testing", "Process Optimization"],
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "lisa@sagency.com"
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

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#F25725]/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 flex items-center justify-center overflow-hidden border-2 border-[#F25725]/20 group-hover:border-[#F25725]/50 transition-colors duration-300">
                  {/* Placeholder for profile image */}
                  <div className="w-full h-full bg-gradient-to-br from-[#F25725]/20 to-[#ff6b35]/10 flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#F25725] to-[#ff6b35] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Status Indicator */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#1c2131] flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-[#F25725] font-medium text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{member.bio}</p>
                
                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-[#F25725]/20 text-[#F25725] text-xs rounded-full border border-[#F25725]/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                <a
                  href={member.social.linkedin}
                  className="w-8 h-8 bg-white/10 hover:bg-[#F25725] rounded-lg flex items-center justify-center transition-colors duration-300 group/social"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin size={16} className="text-gray-400 group-hover/social:text-white" />
                </a>
                <a
                  href={member.social.twitter}
                  className="w-8 h-8 bg-white/10 hover:bg-[#F25725] rounded-lg flex items-center justify-center transition-colors duration-300 group/social"
                  aria-label={`${member.name} Twitter`}
                >
                  <Twitter size={16} className="text-gray-400 group-hover/social:text-white" />
                </a>
                <a
                  href={member.social.github}
                  className="w-8 h-8 bg-white/10 hover:bg-[#F25725] rounded-lg flex items-center justify-center transition-colors duration-300 group/social"
                  aria-label={`${member.name} GitHub`}
                >
                  <Github size={16} className="text-gray-400 group-hover/social:text-white" />
                </a>
                <a
                  href={`mailto:${member.social.email}`}
                  className="w-8 h-8 bg-white/10 hover:bg-[#F25725] rounded-lg flex items-center justify-center transition-colors duration-300 group/social"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail size={16} className="text-gray-400 group-hover/social:text-white" />
                </a>
              </div>

              {/* Hover Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#F25725]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
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