"use client";
import React, { useEffect } from "react";
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

    // Helper to detect mobile devices for performance optimization
    const [isMobileDevice, setIsMobileDevice] = React.useState(
        typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false
    );

    // Update mobile detection on window resize
    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobileDevice(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Add custom CSS for mobile touch support
    useEffect(() => {
        // Add custom CSS for mobile touch support
        const style = document.createElement('style');
        style.innerHTML = `
            @media (max-width: 768px) {
                .portfolio-card.touch-active .absolute {
                    opacity: 1 !important;
                }
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Add touch support for better mobile experience
    useEffect(() => {
        // Function to handle touch for mobile devices (show overlay on tap)
        const handleTouch = () => {
            const portfolioCards = document.querySelectorAll('.portfolio-card');

            if (!portfolioCards.length) return;

            portfolioCards.forEach(card => {
                card.addEventListener('touchstart', () => {
                    // Toggle a class to make the overlay visible on mobile
                    card.classList.add('touch-active');

                    // Remove the class after navigation or 3 seconds
                    setTimeout(() => {
                        card.classList.remove('touch-active');
                    }, 3000);
                });
            });
        };

        handleTouch();

        // Cleanup
        return () => {
            const portfolioCards = document.querySelectorAll('.portfolio-card');
            portfolioCards.forEach(card => {
                card.removeEventListener('touchstart', () => { });
            });
        };
    }, []);

    return (
        <section className="relative w-full py-24 overflow-hidden transition-colors duration-300 bg-[#1c2131]">
            {/* Corner Frame */}
            {/* <div className="absolute top-0 left-0 w-[40%] h-[70%]">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 120 120"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="cornerGradientTop" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#08375D" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#08445dff" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>

                    <path
                        d="M0,0 L120,0 L120,0 Q0,0 0,120 L0,120 Z"
                        fill="url(#cornerGradientTop)"
                        fillOpacity="0.8"  // additional control
                    />
                </svg>
            </div> */}

            <div className="absolute bottom-0 right-0 w-[40%] h-[70%]">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 120 120"
                    preserveAspectRatio="none"
                >
                    {/* Gradient for Bottom-Right Shape */}
                    <defs>
                        <linearGradient id="cornerGradientBottom" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#F25725" stopOpacity="01" />
                            <stop offset="100%" stopColor="#f28f25ff" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>

                    {/* Bottom-Right Shape */}
                    <path
                        d="M120,120 L0,120 L0,120 Q120,120 120,0 L120,0 Z"
                        fill="url(#cornerGradientBottom)"
                        fillOpacity="0.8"
                    />
                </svg>
            </div>


            <div className="g-px min-h-[90vh] md:min-h-screen px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
                {/* ===== LEFT CONTENT ===== */}
                <div className="relative z-10 py-8 md:py-0">
                    <p className="text-orange-400 text-sm font-bold uppercase tracking-wider mb-3 md:mb-4">
                        Portfolio
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6 text-white">
                        Experience the digital brilliance of our portfolio showcase.
                    </h2>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                        Explore our portfolio to see our successful projects across various
                        industries. We&apos;ve helped businesses like yours achieve remarkable
                        results.
                    </p>
                    <Button text={"Explore More"} />
                </div>

                {/* ===== RIGHT MOVING COLUMNS ===== */}
                <div className="flex gap-4 md:gap-8 h-[70vh] md:h-screen items-center justify-center overflow-hidden">
                    {/* Column 1 - Moves Up (70% height, 2 images visible) */}
                    <div className="relative w-[150px] sm:w-[200px] md:w-[300px] h-[70%] flex items-center justify-center overflow-hidden">
                        <motion.div
                            className="flex flex-col gap-4 sm:gap-6"
                            animate={{ y: ["0%", "-50%"] }} // only move half since we duplicated 4x
                            transition={{
                                duration: isMobileDevice ? 120 : 80, // slower on mobile for better performance
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            {infiniteItems.map((item, index) => (
                                <div
                                    key={`up-${index}-${item.id}`}
                                    className="portfolio-card relative group rounded-3xl overflow-hidden shadow-lg shadow-gray-800"
                                >
                                    {/* Image */}
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        width={300}
                                        height={325}
                                        className="w-[150px] sm:w-[200px] md:w-[300px] min-h-[180px] sm:min-h-[250px] md:min-h-[325px] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Overlay Content */}
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 touch-active:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-2 sm:p-4">
                                        <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                                            Project Title
                                        </h3>
                                        <p className="text-gray-200 text-xs sm:text-sm mb-2 sm:mb-4 hidden sm:block">
                                            Brief description about the project goes here to give
                                            context.
                                        </p>
                                        <button
                                            className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm transition"
                                            aria-label={`View details for ${item.alt}`}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Column 2 - Moves Down (Full height, 3 images visible) */}
                    <div className="relative w-[150px] sm:w-[200px] md:w-[300px] h-full overflow-hidden">
                        <motion.div
                            className="flex flex-col gap-4 sm:gap-6"
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
                                    className="portfolio-card relative group rounded-3xl overflow-hidden shadow-lg shadow-gray-800"
                                >
                                    {/* Image */}
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        width={300}
                                        height={325}
                                        className="w-[150px] sm:w-[200px] md:w-[300px] h-[180px] sm:h-[250px] md:h-[325px] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Overlay Content */}
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 touch-active:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-2 sm:p-4">
                                        <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                                            Project Title
                                        </h3>
                                        <p className="text-gray-200 text-xs sm:text-sm mb-2 sm:mb-4 hidden sm:block">
                                            Short description about the project to engage users.
                                        </p>
                                        <button
                                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm transition"
                                            aria-label={`View details for ${item.alt}`}
                                        >
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
