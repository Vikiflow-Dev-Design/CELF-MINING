"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, MenuItem, HoveredLink, ProductItem } from "@/src/components/ui/navbar-menu";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/src/hooks/useScrollDirection";

export function CELFNavbarAceternity({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { isVisible, scrollY } = useScrollDirection();

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isVisible ? 0 : -120,
      }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "tween"
      }}
      className={cn(
        "fixed top-4 inset-x-0 max-w-4xl mx-auto z-50",
        className
      )}
      style={{
        willChange: "transform"
      }}
    >
      {/* Header with Logo and CTA */}
      <div className="flex items-center justify-between w-full mb-4 px-6">
        {/* CELF Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="w-10 h-10 bg-brand-primary rounded-celf-md flex items-center justify-center shadow-glow group-hover:shadow-globe-glow transition-all duration-300">
              <span className="text-black font-bold text-lg">C</span>
            </div>
            <div className="absolute inset-0 bg-primary-glow rounded-celf-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="text-text-primary font-bold text-xl group-hover:text-brand-primary transition-colors duration-300">
            CELF
          </span>
        </Link>
        
        {/* CTA Buttons */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="primary" size="sm" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>

      {/* Aceternity Navigation Menu */}
      <div className="flex justify-center">
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="About CELF">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/what-is-celf">What is CELF</HoveredLink>
              <HoveredLink href="/about">About Us</HoveredLink>
              <HoveredLink href="/about#team">Our Team</HoveredLink>
              <HoveredLink href="/about#mission">Mission & Vision</HoveredLink>
              <HoveredLink href="/how-it-works">How It Works</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Features">
            <div className="text-sm grid grid-cols-2 gap-6 p-4">
              <ProductItem
                title="Token Mining"
                href="/how-it-works#mining"
                src="/api/placeholder/140/70"
                description="Mine CELF tokens through our innovative system to qualify for educational scholarships"
              />
              <ProductItem
                title="Mobile App"
                href="/download"
                src="/api/placeholder/140/70"
                description="Download our mobile app for seamless token mining and scholarship tracking"
              />
              <ProductItem
                title="Mentorship Program"
                href="/mentorship"
                src="/api/placeholder/140/70"
                description="Connect with education experts and receive personalized guidance for your academic journey"
              />
              <ProductItem
                title="Educational Community"
                href="/community"
                src="/api/placeholder/140/70"
                description="Join our vibrant community of students, educators, and scholarship recipients"
              />
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Programs">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/scholarship-program">Scholarship Program</HoveredLink>
              <HoveredLink href="/mentorship">Mentorship</HoveredLink>
              <HoveredLink href="/community">Community</HoveredLink>
              <HoveredLink href="/success-stories">Success Stories</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Resources">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/download">Download App</HoveredLink>
              <HoveredLink href="/support">Support Center</HoveredLink>
              <HoveredLink href="/blog">Blog</HoveredLink>
              <HoveredLink href="/socials">Socials</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Legal">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/terms">Terms & Conditions</HoveredLink>
              <HoveredLink href="/privacy">Privacy Policy</HoveredLink>
              <HoveredLink href="/license">License</HoveredLink>
              <HoveredLink href="/security">Security</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </motion.div>
  );
}
