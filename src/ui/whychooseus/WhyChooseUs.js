"use client";
import React from "react";
import { ShieldCheck, Rocket, Users, Heart } from "lucide-react";

const reasons = [
  {
    id: 1,
    title: "Trusted Expertise",
    description: "Years of delivering top-notch digital solutions to clients worldwide.",
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
  },
  {
    id: 2,
    title: "Rapid Delivery",
    description: "Fast, efficient, and agile workflows without compromising quality.",
    icon: <Rocket className="w-8 h-8 text-white" />,
  },
  {
    id: 3,
    title: "Client-Centric Approach",
    description: "Transparent communication and tailored solutions for every client.",
    icon: <Users className="w-8 h-8 text-white" />,
  },
  {
    id: 4,
    title: "Innovation & Creativity",
    description: "We combine creativity and cutting-edge technology to exceed expectations.",
    icon: <Heart className="w-8 h-8 text-white" />,
  },
];

const WhyChooseUsSplit = () => {
  return (
    <section className="relative w-full py-20 px-6 overflow-hidden">
      {/* Background shapes */}
      {/* <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div> */}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12 relative z-10">
        {/* Left side: reasons */}
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Choose Us</span>
          </h2>
          <p className="text-gray-400 mb-12">
            Our agency blends creativity, strategy, and technology to deliver
            exceptional digital experiences. Here’s why clients trust us to
            bring ideas to life:
          </p>

          <div className="space-y-6">
            {reasons.map((reason) => (
              <div
                key={reason.id}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center flex-shrink-0">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{reason.title}</h3>
                  <p className="text-gray-300 text-sm">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Illustration / abstract shapes */}
        <div className="flex-1">
          <div className="w-full h-[400px] lg:h-[500px] bg-gradient-to-tr from-purple-600 to-blue-500 rounded-3xl relative overflow-hidden shadow-2xl">
            {/* Optional: Add floating circles/animations */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-16 text-center lg:text-left">
        <a
          href="#contact"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          Work With Us
        </a>
      </div>
    </section>
  );
};

export default WhyChooseUsSplit;
