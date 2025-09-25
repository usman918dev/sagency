"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Threads from '@/ui/animatedbg/Bg';
import BackgroundEffects from '@/ui/background/BackgroundEffects';
import MagicBento from '@/ui/bento/Bento';
import HorizontalLogoLoop from '@/ui/logoloop/LogoLoop';
import AnimatedMockup, { LandingMockup } from '@/ui/mockup/Mockup';
import AnimatedWaveBg from '@/ui/Svg';
import ProcessSection from '@/ui/howwework/HowWeWork';
import WhyChooseUs from '@/ui/whychooseus/WhyChooseUs';
import Testimonials from '@/ui/testinomials/Testinomails';
import PortfolioSection from '@/ui/portfolio/PortfolioSection';
import Button from '@/ui/btn/Button';
import CallToAction, { CallToActionS } from '@/ui/cta/Cta';
import PortfolioTwo from '@/ui/portfolio/PortfolioTwo';
import ServicesGrid from '@/ui/servicesection/ServicesSectionMini';

const HeroSection = () => {
  return (
    <>
      {/* <BackgroundEffects /> */}
      <div
        className="min-h-[120vh] w-full relative bg-center bg-gradient-to-b from-[#08375D] to-[#1A4C7A]"
        style={{
          backgroundImage: "url('/assets/b1.jpg')", // Replace with your image path
        }}
      >
        <div className="absolute inset-0 h-[120vh] bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none"></div>

        {/* Vignette Effect */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25),transparent_70%)] pointer-events-none"></div> */}
        <div
          className="min-h-[120vh] text-white flex items-center justify-center font-sans relative"
        >
          <div className="g-px grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
            {/* Left Content Section */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

              {/* Small Code Line */}
              <motion.span
                className="mb-2 text-sm font-mono tracking-wide font-bold uppercase text-orange-400 rounded-lg inline-block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Empowering Your Business with AI
              </motion.span>

              {/* Main Headline */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 tracking-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Transforming Data <br />
                into{' '}
                <motion.span
                  className="px-4 py-2 bg-[#F25725] rounded-lg inline-block mt-2 sm:mt-0"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Decisions
                </motion.span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-lg sm:text-xl text-gray-300 max-w-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Leverage the power of machine learning and AI to unlock insights and drive business growth
              </motion.p>

              {/* Buttons */}
              <div className="flex space-x-4">
                <motion.button
                  className="px-8 py-3 font-semibold rounded bg-[#F25725] hover:bg-transparent hover:border-[#F25725] hover:border transition-colors duration-300 shadow-lg text-white"
                  whileHover={{ scale: 1.0 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Our Services
                </motion.button>

                <Button text={"Contact Us"} />
              </div>

              {/* Avatar / Clients Section */}
              <motion.div
                className="mt-8 flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="flex -space-x-2 p-1 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Client avatar 1"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://randomuser.me/api/portraits/women/45.jpg"
                    alt="Client avatar 2"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://randomuser.me/api/portraits/men/56.jpg"
                    alt="Client avatar 3"
                  />
                </div>

                <span className="text-gray-400 font-medium">
                  Over 100+ clients have worked with us
                </span>
              </motion.div>
            </div>

            {/* Right Robot Illustration Section */}
            <div className="flex items-center justify-center relative0">
              <motion.div
                className="w-full max-w-sm sm:max-w-md lg:max-w-lg z-10"
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 1.2 }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {/* <AnimatedMockup /> */}
                  <LandingMockup />
                </div>
              </motion.div>

              {/* Gradient Background */}
              {/* <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <div
                  className="w-3/4 h-3/4 rounded-full filter blur-3xl opacity-60"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(45,115,255,0.7) 0%, rgba(10,12,22,0) 70%)',
                  }}
                ></div>
              </motion.div> */}
            </div>
          </div>


        </div >

      </div>

      <div className=' bg-gradient-to-r from-[#1b2439] via-[#16213e] to-[#1b2439]'>
        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0ea5ff]/10 via-[#7c3aed]/10 to-transparent"></div> */}
        <div className='g-px -mt-40 lg:-mt-30 md:-mt-20 rounded-4xl bg-black'>
          <HorizontalLogoLoop />
        </div>
        <div className="g-px text-center mb-12 pt-40">
          {/* Small subheading */}
          <p className="text-orange-400 text-sm font-bold uppercase tracking-wider mb-4">
            Our Services
          </p>

          {/* Big heading */}
          <h2 className="text-3xl max-w-2xl sm:text-4xl md:text-5xl font-bold text-white relative inline-block">
            What We Do to Empower Your{" "}
            <span className="relative inline-block">
              {/* Random SVG border */}
              <svg
                className="absolute -top-[75%] -left-[10%] w-[120%] h-[290%] z-10 pointer-events-none"
                viewBox="0 0 200 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M10 40 C0 20, 190 10, 180 40 S10 50, 10 40 Z"
                  stroke="#F25725"
                  strokeWidth="4"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>


              {/* Word itself */}
              <span className="relative z-20">Business</span>
            </span>
          </h2>


        </div>

        {/* <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></span> */}
        {/* Your MagicBento / services grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Start hidden, slightly below
          whileInView={{ opacity: 1, y: 0 }} // Fade and slide up when visible
          viewport={{ once: true, amount: 0.2 }} // Trigger only once when 20% visible
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="g-px pb-20 pt-4 "
        >
          <ServicesGrid />

          {/* <MagicBento
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={false}
              enableBorderGlow={true}
              enableTilt={false}
              enableMagnetism={true}
              clickEffect={false}
              spotlightRadius={300}
              particleCount={24}
              glowColor="8, 55, 93"
            /> */}
        </motion.div>
        {/* <AnimatedWaveBg className="absolute top-0 left-0 w-full h-full" /> */}

      </div>

















      <div className=''>
        <ProcessSection />
        {/* <PortfolioSection /> */}
        <CallToAction />
        <WhyChooseUs />
        <PortfolioTwo />
        {/* <div className='my-20'></div> */}
        <Testimonials />
        {/* <CallToActionS /> */}
        {/* <div className='my-20'></div> */}

      </div>
    </>

  );
};

export default HeroSection;
