"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  User,
  Building2,
  Calendar,
  Award
} from "lucide-react";
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechFlow Solutions",
      image: "/assets/testimonial1.jpg", // You can add actual images
      rating: 5,
      text: "Working with SAgency transformed our digital presence completely. Our social media engagement increased by 340% in just 3 months. Their team's expertise and dedication are unmatched.",
      project: "Digital Marketing Campaign",
      date: "March 2024",
      results: ["340% increase in engagement", "250% boost in leads", "ROI improved by 180%"]
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CEO",
      company: "StartupVenture Inc.",
      image: "/assets/testimonial2.jpg",
      rating: 5,
      text: "The web development team at SAgency delivered beyond our expectations. Our new website not only looks amazing but also performs exceptionally well. We've seen a 200% increase in conversions.",
      project: "E-commerce Website Development",
      date: "February 2024",
      results: ["200% increase in conversions", "50% faster loading times", "Mobile-first design"]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Brand Manager",
      company: "Creative Studios",
      image: "/assets/testimonial3.jpg",
      rating: 5,
      text: "SAgency's design team created a brand identity that perfectly captures our vision. The logo, website, and marketing materials all work together seamlessly. Our brand recognition has skyrocketed.",
      project: "Complete Brand Identity",
      date: "January 2024",
      results: ["Complete brand overhaul", "Increased recognition by 150%", "Consistent brand messaging"]
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Operations Manager",
      company: "Manufacturing Pro",
      image: "/assets/testimonial4.jpg",
      rating: 5,
      text: "The mobile app development was flawless. SAgency delivered on time and within budget. The app has streamlined our operations and improved customer satisfaction significantly.",
      project: "Mobile App Development",
      date: "December 2023",
      results: ["On-time delivery", "Within budget", "95% user satisfaction rating"]
    },
    {
      id: 5,
      name: "Lisa Park",
      position: "Digital Marketing Lead",
      company: "Growth Dynamics",
      image: "/assets/testimonial5.jpg",
      rating: 5,
      text: "Their SEO services are outstanding. We went from page 3 to page 1 on Google for our main keywords. The organic traffic has tripled, and we're getting quality leads consistently.",
      project: "SEO Optimization",
      date: "November 2023",
      results: ["First page Google rankings", "300% increase in organic traffic", "Higher quality leads"]
    }
  ];

  // Smooth transition function with improved animations
  const changeTestimonial = useCallback((newIndex) => {
    if (newIndex === currentIndex || isTransitioning) return;

    setIsTransitioning(true);

    // Fade out and slide
    setTimeout(() => {
      setCurrentIndex(newIndex);
      // Fade in and slide after content change
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  }, [currentIndex, isTransitioning]);

  // Auto-play testimonials
  useEffect(() => {
    if (isAutoPlaying && !isTransitioning) {
      const interval = setInterval(() => {
        const nextIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
        changeTestimonial(nextIndex);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, currentIndex, testimonials.length, isTransitioning, changeTestimonial]);

  const nextTestimonial = () => {
    const nextIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    changeTestimonial(nextIndex);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    const nextIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    changeTestimonial(nextIndex);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    changeTestimonial(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };


  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative w-full py-44 px-6 overflow-hidden bg-gradient-to-r from-[#1b2439] via-[#16213e] to-[#1b2439]"
    >
      {/* Background Effects */}
      {/* <motion.div
        variants={fadeIn}
        className="absolute inset-0"
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"
        />
      </motion.div> */}

      <motion.div
        variants={fadeIn}
        transition={{ delay: 0.2 }}
        className="g-px relative z-10"
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section Header */}
        <motion.div
          variants={fadeIn}
          transition={{ delay: 0.3 }}
          className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-6 py-2 mb-8">
            <Award className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm font-medium uppercase tracking-wider">
              Client Testimonials
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            What Our{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about their experience working with us.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          variants={fadeIn}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Testimonial Content */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.5 }}
            className="relative">
            <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 lg:p-10 transition-all duration-500 ease-in-out ${isTransitioning
              ? 'opacity-0 transform -translate-x-4'
              : 'opacity-100 transform translate-x-0'
              }`}>
              {/* Quote Icon */}
              <div className={`mb-6 transition-all duration-300 ease-in-out ${isTransitioning ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
                }`}>
                <Quote className="w-12 h-12 text-orange-400 opacity-50" />
              </div>

              {/* Rating Stars */}
              <div className={`flex items-center gap-1 mb-6 transition-all duration-300 ease-in-out delay-75 ${isTransitioning ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
                }`}>
                {[...Array(currentTestimonial.rating)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
                <span className="ml-2 text-gray-400 text-sm">
                  {currentTestimonial.rating}.0 out of 5
                </span>
              </div>

              {/* Testimonial Text */}
              <blockquote className={`text-lg lg:text-xl text-gray-200 leading-relaxed mb-8 font-medium transition-all duration-300 ease-in-out delay-100 ${isTransitioning ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
                }`}>
                &quot;{currentTestimonial.text}&quot;
              </blockquote>

              {/* Results */}
              <div className={`mb-8 transition-all duration-300 ease-in-out delay-150 ${isTransitioning ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
                }`}>
                <h4 className="text-orange-400 font-semibold mb-3">Key Results:</h4>
                <ul className="space-y-2">
                  {currentTestimonial.results.map((result, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project Info */}
              <div className={`flex items-center gap-4 text-sm text-gray-400 mb-6 transition-all duration-300 ease-in-out delay-200 ${isTransitioning ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
                }`}>
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {currentTestimonial.project}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {currentTestimonial.date}
                </div>
              </div>

              {/* Client Info */}
              <div className={`flex items-center gap-4 pt-6 border-t border-gray-700/50 transition-all duration-300 ease-in-out delay-250 ${isTransitioning ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
                }`}>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">{currentTestimonial.name}</div>
                  <div className="text-gray-400 text-sm">
                    {currentTestimonial.position} at {currentTestimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation and Stats */}
          <div className="space-y-8">
            {/* Navigation Controls */}
            <div className="text-center">
              <div className="flex justify-center items-center gap-4 mb-6">
                <button
                  onClick={prevTestimonial}
                  disabled={isTransitioning}
                  className={`w-12 h-12 bg-gray-800/50 border border-gray-700/50 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                    }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      disabled={isTransitioning}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                        ? 'bg-orange-400 scale-125'
                        : isTransitioning
                          ? 'bg-gray-600 opacity-50 cursor-not-allowed'
                          : 'bg-gray-600 hover:bg-gray-500 hover:scale-110'
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  disabled={isTransitioning}
                  className={`w-12 h-12 bg-gray-800/50 border border-gray-700/50 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                    }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="text-sm text-gray-400">
                {currentIndex + 1} of {testimonials.length}
              </div>
            </div>

            {/* Stats */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { value: "98%", label: "Client Satisfaction" },
                { value: "5.0", label: "Average Rating" },
                { value: "200+", label: "Happy Clients" },
                { value: "95%", label: "Project Success" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.2
                      }
                    }
                  }}
                  className="text-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800/50"
                >
                  <div className="text-3xl font-bold text-orange-400 mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Auto-play Toggle */}
            <div className="text-center">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isAutoPlaying
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                  }`}
              >
                {isAutoPlaying ? 'Auto-play: ON' : 'Auto-play: OFF'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* All Testimonials Preview */}
        <motion.div
          variants={fadeIn}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.7 + index * 0.1 }}
              key={testimonial.id}
              className={`p-6 bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl cursor-pointer transition-all duration-300 hover:border-orange-500/30 hover:scale-105 ${index === currentIndex ? 'border-orange-500/50' : ''
                }`}
              onClick={() => goToSlide(index)}
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                &quot;{testimonial.text}&quot;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-white text-sm">{testimonial.name}</div>
                  <div className="text-gray-400 text-xs">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Testimonials;
