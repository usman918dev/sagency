"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true); // controls visibility
  const [activeLink, setActiveLink] = useState("Home");
  const [servicesOpen, setServicesOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    {
      name: "Services",
      href: "#",
      dropdown: [
        { name: "Web Development", href: "#" },
        { name: "Mobile Apps", href: "#" },
        { name: "UI/UX Design", href: "#" },
      ],
    },
    { name: "Portfolio", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <header
      className={`fixed -top-4 left-0 w-full z-50 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
        }  backdrop-blur-lg shadow-lg`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 ">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/assets/logomain.png"
            alt="Logo"
            className="w-24 h-24 -ml-2 object-contain"
          />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => {
                  setActiveLink(link.name);
                  if (link.name === "Services") setServicesOpen(!servicesOpen);
                  else setServicesOpen(false);
                }}
                className={`relative text-md font-bold transition-colors duration-300 ${activeLink === link.name ? "text-[#F25725]" : "text-white"
                  } group-hover:text-[#F25725]`}
              >
                {link.name}
                {link.dropdown && (
                  <ChevronDown
                    size={16}
                    className={`inline-block ml-1 transition-transform duration-300 ${servicesOpen ? "rotate-180" : "rotate-0"
                      }`}
                  />
                )}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#F25725] transition-all duration-300 ${activeLink === link.name ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                ></span>
              </button>

              {link.dropdown && (
                <div
                  className={`absolute left-0 mt-2 w-48 bg-[#08375D] rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${servicesOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                >
                  {link.dropdown.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-white hover:bg-[#F25725] transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="px-5 py-2 rounded bg-[#F25725] text-white font-semibold hover:bg-[#d6471e] transition-all">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden bg-[#08375D]/95 backdrop-blur-lg transition-all overflow-hidden duration-300 ${isOpen ? "max-h-screen" : "max-h-0"
          }`}
      >
        <nav className="flex flex-col px-6 py-4 space-y-4">
          {navLinks.map((link, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => {
                  setActiveLink(link.name);
                  if (link.name === "Services") setServicesOpen(!servicesOpen);
                  else setServicesOpen(false);
                }}
                className={`flex justify-between w-full text-lg font-medium transition-colors duration-300 ${activeLink === link.name ? "text-[#F25725]" : "text-white"
                  }`}
              >
                {link.name}
                {link.dropdown && (
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : "rotate-0"
                      }`}
                  />
                )}
              </button>

              {link.dropdown && servicesOpen && (
                <div className="mt-2 pl-4 space-y-2">
                  {link.dropdown.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      className="block text-white text-base hover:text-[#F25725] transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="px-5 py-2 mt-4 rounded bg-[#F25725] text-white font-semibold hover:bg-[#d6471e] transition-all">
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
}
