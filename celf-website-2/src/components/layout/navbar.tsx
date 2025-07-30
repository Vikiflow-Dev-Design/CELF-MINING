"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "What is CELF",
    href: "/what-is-celf",
  },
  {
    label: "About",
    href: "/about",
    submenu: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about#team" },
      { label: "Mission & Vision", href: "/about#mission" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    submenu: [
      { label: "Scholarship Program", href: "/scholarship-program" },
      { label: "Mentorship", href: "/mentorship" },
      { label: "Newsletter", href: "/newsletter" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    submenu: [
      { label: "Download App", href: "/download" },
      { label: "Help Center", href: "/help" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobile = () => setIsOpen(!isOpen);
  const closeMobile = () => setIsOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "bg-[#0A0A0A] border-b border-[#9EFF00]/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brand-primary rounded-celf-md flex items-center justify-center shadow-glow group-hover:shadow-globe-glow transition-all duration-300">
                  <span className="text-black font-bold text-lg lg:text-xl">
                    C
                  </span>
                </div>
                <div className="absolute inset-0 bg-primary-glow rounded-celf-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-text-primary font-bold text-xl lg:text-2xl group-hover:text-brand-primary transition-colors duration-300">
                CELF
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() =>
                    item.submenu && setActiveDropdown(item.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-xl text-gray-300 hover:text-[#9EFF00] hover:bg-gray-800/50 transition-all duration-300",
                      item.submenu && "pr-2"
                    )}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Desktop Dropdown */}
                  {item.submenu && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-[#0A0A0A] border border-[#9EFF00]/30 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="block px-4 py-3 text-gray-300 hover:text-[#9EFF00] hover:bg-gray-800/50 transition-all duration-200 border-b border-gray-800 last:border-b-0"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="primary" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobile}
              className="lg:hidden p-2 rounded-xl text-white hover:text-[#9EFF00] hover:bg-gray-800/50 transition-all duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-[#0A0A0A] border-t border-[#9EFF00]/20"
            >
              <div className="container mx-auto px-4 py-6">
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        className="block px-4 py-3 rounded-xl text-gray-300 hover:text-[#9EFF00] hover:bg-gray-800/50 transition-all duration-200"
                      >
                        {item.label}
                      </Link>
                      {item.submenu && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={closeMobile}
                              className="block px-4 py-2 rounded-xl text-gray-400 hover:text-[#9EFF00] hover:bg-gray-800/30 transition-all duration-200"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Mobile CTA Buttons */}
                <div className="mt-6 pt-6 border-t border-[#9EFF00]/20 space-y-3">
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href="/login" onClick={closeMobile}>
                      Login
                    </Link>
                  </Button>
                  <Button variant="primary" className="w-full" asChild>
                    <Link href="/signup" onClick={closeMobile}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content overlap */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
