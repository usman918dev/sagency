"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../btn/Button";

const portfolioItems = [
    { id: 1, src: "/assets/bg.png", alt: "Project 1" },
    { id: 2, src: "/assets/bgg.png", alt: "Project 2" },
    { id: 3, src: "/assets/ecom.webp", alt: "Project 3" },
    { id: 4, src: "/assets/edit.jpg", alt: "Project 4" },
    { id: 5, src: "/assets/graphic.jpg", alt: "Project 5" },
];

// Generate a long chain of images
const generateInfiniteArray = (items, repeatCount = 4) =>
    Array(repeatCount)
        .fill(items)
        .flat();

const PortfolioSection = () => {
    const infiniteItems = generateInfiniteArray(portfolioItems, 4); // 4x duplication

    return (
        <section className="relative w-full py-24 overflow-hidden transition-colors duration-300">
            {/* Corner Frame */}
            <div className="absolute top-0 left-0 w-[40%] h-[70%]">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 120 120"
                    preserveAspectRatio="none"
                >
                    {/* Gradient for Top-Left Shape */}
                    <defs>
                        <linearGradient id="cornerGradientTop" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#08375D" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#08445dff" stopOpacity="0.7" />
                        </linearGradient>
                    </defs>

                    {/* Top-Left Shape */}
                    <path
                        d="M0,0 L120,0 L120,0 Q0,0 0,120 L0,120 Z"
                        fill="url(#cornerGradientTop)"
                        fillOpacity="0.7"  // additional control
                    />
                </svg>
            </div>

            <div className="absolute bottom-0 right-0 w-[40%] h-[70%]">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 120 120"
                    preserveAspectRatio="none"
                >
                    {/* Gradient for Bottom-Right Shape */}
                    <defs>
                        <linearGradient id="cornerGradientBottom" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#F25725" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#f28f25ff" stopOpacity="0.7" />
                        </linearGradient>
                    </defs>

                    {/* Bottom-Right Shape */}
                    <path
                        d="M120,120 L0,120 L0,120 Q120,120 120,0 L120,0 Z"
                        fill="url(#cornerGradientBottom)"
                        fillOpacity="0.7"
                    />
                </svg>
            </div>


            <div className="g-px min-h-screen px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* ===== LEFT CONTENT ===== */}
                <div className="relative z-10">
                    <p className="text-orange-400 text-sm font-bold uppercase tracking-wider mb-4">
                        Portfolio
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900 dark:text-white">
                        Experience the digital brilliance of our portfolio showcase.
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                        Explore our portfolio to see our successful projects across various
                        industries. We’ve helped businesses like yours achieve remarkable
                        results.
                    </p>
                    <Button text={"Explore More"} />
                </div>

                {/* ===== RIGHT MOVING COLUMNS ===== */}
                <div className="flex gap-8 h-screen items-center justify-center overflow-hidden">
                    {/* Column 1 - Moves Up (70% height, 2 images visible) */}
                    <div className="relative w-[300px] h-[70%] flex items-center justify-center overflow-hidden">
                        <motion.div
                            className="flex flex-col gap-6"
                            animate={{ y: ["0%", "-50%"] }} // only move half since we duplicated 4x
                            transition={{
                                duration: 80, // slower, smoother speed
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            {infiniteItems.map((item, index) => (
                                <div
                                    key={`up-${index}-${item.id}`}
                                    className="relative group rounded-3xl overflow-hidden shadow-lg dark:shadow-gray-800"
                                >
                                    {/* Image */}
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        width={300}
                                        height={325}
                                        className="w-[300px] min-h-[325px] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Overlay Content */}
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-4">
                                        <h3 className="text-white text-xl font-bold mb-2">
                                            Project Title
                                        </h3>
                                        <p className="text-gray-200 text-sm mb-4">
                                            Brief description about the project goes here to give
                                            context.
                                        </p>
                                        <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Column 2 - Moves Down (Full height, 3 images visible) */}
                    <div className="relative w-[300px] h-full overflow-hidden">
                        <motion.div
                            className="flex flex-col gap-6"
                            animate={{ y: ["-50%", "0%"] }} // opposite direction
                            transition={{
                                duration: 80,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            {infiniteItems.map((item, index) => (
                                <div
                                    key={`down-${index}-${item.id}`}
                                    className="relative group rounded-3xl overflow-hidden shadow-lg dark:shadow-gray-800"
                                >
                                    {/* Image */}
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        width={300}
                                        height={325}
                                        className="w-[300px] h-[325px] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Overlay Content */}
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-4">
                                        <h3 className="text-white text-xl font-bold mb-2">
                                            Project Title
                                        </h3>
                                        <p className="text-gray-200 text-sm mb-4">
                                            Short description about the project to engage users.
                                        </p>
                                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioSection;
