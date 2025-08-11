"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  Heart,
  Globe,
  Shield,
  Award
} from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about#foundation-story" },
    { label: "Team", href: "/about#team" },
    { label: "Mission & Vision", href: "/about#mission-vision" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" }
  ],
  programs: [
    { label: "What is CELF", href: "/what-is-celf" },
    { label: "Scholarship Program", href: "/scholarship-program" },
    { label: "Mentorship", href: "/mentorship" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Token Mining", href: "/how-it-works#mining-process" },
    { label: "Community", href: "/community" },
    { label: "Success Stories", href: "/success-stories" }
  ],
  resources: [
    { label: "Download App", href: "/download" },
    { label: "Support Center", href: "/support" },
    { label: "Blog", href: "/blog" },
    { label: "Socials", href: "/socials" },
    { label: "Documentation", href: "/docs" },
    { label: "Whitepaper", href: "/whitepaper" }
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "License", href: "/license" },
    { label: "Security", href: "/security" }
  ]
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/celf_foundation", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/celf-foundation", label: "LinkedIn" },
  { icon: Facebook, href: "https://facebook.com/celf.foundation", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/celf_foundation", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@celf-foundation", label: "YouTube" },
  { icon: Github, href: "https://github.com/celf-foundation", label: "GitHub" }
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@celf.foundation", href: "mailto:hello@celf.foundation" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: MapPin, label: "Address", value: "San Francisco, CA, USA", href: "#" }
];

const achievements = [
  { icon: Award, label: "150+ Scholarships", value: "Awarded globally" },
  { icon: Globe, label: "25+ Countries", value: "Students supported" },
  { icon: Shield, label: "Blockchain Secured", value: "100% transparent" },
  { icon: Heart, label: "2,500+ Community", value: "Active members" }
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] border-t border-[#9EFF00]/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[#9EFF00]/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Logo */}
                <Link href="/" className="inline-flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00] to-[#7ACC00] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(158,255,0,0.3)]">
                    <span className="text-black font-bold text-lg">C</span>
                  </div>
                  <span className="text-2xl font-bold text-white">CELF</span>
                </Link>

                <p className="text-gray-300 leading-relaxed mb-6 max-w-sm">
                  Democratizing education through blockchain innovation. Join thousands of students 
                  earning scholarships through our revolutionary token mining system.
                </p>

                {/* Newsletter Signup */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Stay Updated</h4>
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#9EFF00]/50 transition-colors"
                    />
                    <Button size="sm" className="px-4">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Follow Us</h4>
                  <div className="flex space-x-3">
                    {socialLinks.map((social) => (
                      <Link
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center hover:bg-[#9EFF00]/20 hover:text-[#9EFF00] transition-colors duration-200 group"
                      >
                        <social.icon className="h-5 w-5 text-gray-400 group-hover:text-[#9EFF00]" />
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                
                {/* Company */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-white font-semibold mb-4">Company</h4>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-[#9EFF00] transition-colors duration-200 text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Programs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-white font-semibold mb-4">Programs</h4>
                  <ul className="space-y-3">
                    {footerLinks.programs.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-[#9EFF00] transition-colors duration-200 text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Resources */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-white font-semibold mb-4">Resources</h4>
                  <ul className="space-y-3">
                    {footerLinks.resources.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-[#9EFF00] transition-colors duration-200 text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Legal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-white font-semibold mb-4">Legal</h4>
                  <ul className="space-y-3">
                    {footerLinks.legal.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-[#9EFF00] transition-colors duration-200 text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Contact & Achievements */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Contact Info */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Contact</h4>
                  <div className="space-y-3">
                    {contactInfo.map((contact) => (
                      <Link
                        key={contact.label}
                        href={contact.href}
                        className="flex items-center space-x-3 text-gray-400 hover:text-[#9EFF00] transition-colors duration-200 group"
                      >
                        <contact.icon className="h-4 w-4 flex-shrink-0 group-hover:text-[#9EFF00]" />
                        <div>
                          <div className="text-xs text-gray-500">{contact.label}</div>
                          <div className="text-sm">{contact.value}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Our Impact</h4>
                  <div className="space-y-3">
                    {achievements.map((achievement) => (
                      <div key={achievement.label} className="flex items-center space-x-3">
                        <achievement.icon className="h-4 w-4 text-[#9EFF00] flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-white">{achievement.label}</div>
                          <div className="text-xs text-gray-400">{achievement.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="py-8 border-t border-gray-800/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <span>© 2024 CELF Foundation. All rights reserved.</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500" />
                <span>for students worldwide</span>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <Link href="/status" className="hover:text-[#9EFF00] transition-colors">
                Status
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
