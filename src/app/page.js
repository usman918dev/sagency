"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Threads from '@/ui/animatedbg/Bg';
import MagicBento from '@/ui/bento/Bento';
import HorizontalLogoLoop from '@/ui/logoloop/LogoLoop';
import AnimatedMockup from '@/ui/mockup/Mockup';
import AnimatedWaveBg from '@/ui/Svg';
import ProcessSection from '@/ui/howwework/HowWeWork';
import WhyChooseUs from '@/ui/whychooseus/WhyChooseUs';

const HeroSection = () => {
  return (

    <>
      <div 
      // style={{ backgroundImage: "url('/assets/bg.png')" }}
        className="min-h-screen w-full bg-cover bg-center bg-fixed bg-gradient-to-br from-[#1A1D24]/40 to-[#0F1115]/40 backdrop-blur-md
"
      >

        <div
          className="min-h-screen  text-white flex items-center justify-center p-4 sm:p-8 font-sans relative"
        // style={{
        //   backgroundImage:  bg-[#0A0C10]"radial-gradient(#101010 1px, transparent 1px)",
        //   backgroundSize: "40px 40px",
        // }}

        >
          <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content Section */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left py-12">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight"
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

              <motion.p
                className="text-lg sm:text-xl text-gray-300 max-w-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Leverage the power of machine learning and AI to unlock insights and drive business growth
              </motion.p>

              <div className="flex space-x-4">
                {/* Our Services Button */}
                <motion.button
                  className="px-8 py-3 font-semibold rounded bg-[#F25725] hover:bg-transparent hover:border-[#F25725] hover:border transition-colors duration-300 shadow-lg text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Our Services
                </motion.button>

                {/* Contact Us Button */}
                <motion.button
                  className="px-8 py-3 font-semibold rounded border border-[#F25725] text-[#F25725] hover:bg-[#F25725] hover:text-white transition-colors duration-300 shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  Contact Us
                </motion.button>
              </div>

              {/* Your existing motion.div */}
              <motion.div
                className="mt-8 flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                {/* other content here */}
              </motion.div>


              <motion.div
                className="mt-8 flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="flex -space-x-2 overflow-hidden">
                  {/* Dummy avatar images */}
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://via.placeholder.com/32"
                    alt="Client avatar 1"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://via.placeholder.com/32"
                    alt="Client avatar 2"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://via.placeholder.com/32"
                    alt="Client avatar 3"
                  />
                </div>
                <span className="text-gray-400 font-medium">Over 100+ clients have worked with us</span>
              </motion.div>
            </div>

            {/* Right Robot Illustration Section */}
            <div className="flex items-center justify-center p-6 relative">
              <motion.div
                className="w-full max-w-sm sm:max-w-md lg:max-w-lg z-10"
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 1.2 }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <AnimatedMockup />

                </div>
              </motion.div>

              {/* Gradient background for floating effect */}
              <motion.div
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
              </motion.div>
            </div>

          </div>

        </div >
        <div className='container mx-auto rounded-4xl'>
          <HorizontalLogoLoop />
        </div>

        <div className=''>
          <div className="container mx-auto text-center mb-12 pt-36 ">
            {/* Small subheading */}
            <p className="text-sm text-[#F25725] uppercase tracking-wider mb-2">
              Our Services
            </p>

            {/* Big heading */}
            <h2 className="text-3xl max-w-2xl sm:text-4xl md:text-5xl font-bold text-white relative inline-block">
              What We Do to Empower Your Business

              {/* Animated gradient underline */}
              {/* <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></span> */}
            </h2>
          </div>
          {/* Your MagicBento / services grid */}
          <div className="container mx-auto  ">
            <MagicBento
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
            />
          </div>
          {/* <AnimatedWaveBg className="absolute top-0 left-0 w-full h-full" /> */}

        </div>
        <ProcessSection />
<WhyChooseUs/>
      </div>
    </>

  );
};

export default HeroSection;
