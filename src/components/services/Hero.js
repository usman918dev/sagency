"use client";
import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ChevronDown } from 'lucide-react';

const Hero = ({ title, coverImage, icon: iconName }) => {
    const Icon = LucideIcons[iconName];

    const sentence = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.4,
                staggerChildren: 0.1,
            },
        },
    };

    const letter = {
        hidden: { opacity: 0, y: 30 },
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

    return (
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white px-6">
            <div className="absolute inset-0  overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${coverImage})` }}
                    initial={{ scale: 1.05, opacity: 0.4 }}
                    animate={{ scale: 1, opacity: 0.25 }}
                    transition={{
                        duration: 10,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "mirror"
                    }}
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#1c2131] via-[#1c2131]/60 to-transparent"></div> */}
            </div>
            <div className="relative z-10 flex flex-col items-center">
                {Icon && (
                    <motion.div
                        className="mb-4 bg-[#F25725]/10 p-3 rounded-full border border-[#F25725]/30"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4, type: 'spring' }}
                    >
                        <Icon className="h-8 w-8 text-[#F25725]" />
                    </motion.div>
                )}
                <motion.h1
                    className="text-4xl md:text-6xl font-black tracking-tight"
                    variants={sentence}
                    initial="hidden"
                    animate="visible"
                >
                    {title.split(" ").map((word, index) => (
                        <motion.span key={index} variants={letter} className="inline-block mr-4">
                            {word}
                        </motion.span>
                    ))}
                </motion.h1>
            </div>
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
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
                    <ChevronDown className="h-8 w-8 text-gray-500" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
