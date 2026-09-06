"use client";
import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Hero = ({ title, subtitle, coverImage, icon: iconName, badge }) => {
    const Icon = LucideIcons[iconName];

    const sentence = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
                staggerChildren: 0.08,
            },
        },
    };

    const letter = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 200,
            },
        },
    };

    const scrollToPricing = (e) => {
        e.preventDefault();
        const pricingElement = document.getElementById('pricing');
        if (pricingElement) {
            pricingElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.hash = '#pricing';
        }
    };

    return (
        <section className="relative min-h-[75vh] flex items-center justify-center text-center text-white px-6 py-20 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${coverImage})` }}
                    initial={{ scale: 1.05, opacity: 0.55 }}
                    animate={{ scale: 1, opacity: 0.45 }}
                    transition={{
                        duration: 10,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "mirror"
                    }}
                />
                {/* Premium Dark Gradient Overlay for Maximum Text Contrast & Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-[#080b12]/85 to-[#080b12]/60 pointer-events-none" />
                <div className="absolute inset-0 bg-purple-950/20 backdrop-blur-[1px] pointer-events-none" />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
                {badge && (
                    <motion.div
                        className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-6 shadow-md backdrop-blur-md"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                    >
                        <span>{badge}</span>
                    </motion.div>
                )}

                {Icon && (
                    <motion.div
                        className="mb-5 bg-[var(--background-alt)] p-3.5 rounded-2xl border border-[var(--border)] shadow-xl backdrop-blur-md"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4, type: 'spring' }}
                    >
                        <Icon className="h-8 w-8 text-[#9D26FF]" />
                    </motion.div>
                )}

                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight drop-shadow-lg mb-6 leading-tight"
                    variants={sentence}
                    initial="hidden"
                    animate="visible"
                >
                    {title.split(" ").map((word, index) => (
                        <motion.span key={index} variants={letter} className="inline-block mr-3 sm:mr-4">
                            {word}
                        </motion.span>
                    ))}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8 font-normal drop-shadow"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        {subtitle}
                    </motion.p>
                )}

                {/* Dual CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <Link href="/contact" className="w-full sm:w-auto">
                        <span className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] hover:from-[#8B5CF6] hover:to-[#6D28D9] text-white font-bold shadow-xl shadow-purple-950/50 transition-all duration-300 flex items-center justify-center text-sm cursor-pointer group">
                            Schedule Strategy Call
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                    <a
                        href="#pricing"
                        onClick={scrollToPricing}
                        className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold shadow-lg backdrop-blur-md transition-all duration-300 text-sm flex items-center justify-center cursor-pointer"
                    >
                        View Pricing Plans
                    </a>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'easeInOut'
                    }}
                >
                    <ChevronDown className="h-7 w-7 text-gray-400" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
