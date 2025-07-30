"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin,
  MessageCircle,
  ArrowRight,
  Bell,
  Share2,
  Heart
} from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    handle: "@celf_education",
    url: "https://instagram.com/celf_education",
    icon: Instagram,
    color: "from-pink-500/20 to-pink-500/5",
    hoverColor: "hover:border-pink-500/40",
    followers: "25.2K"
  },
  {
    name: "Twitter",
    handle: "@CELF_Official",
    url: "https://twitter.com/CELF_Official",
    icon: Twitter,
    color: "from-blue-500/20 to-blue-500/5",
    hoverColor: "hover:border-blue-500/40",
    followers: "18.7K"
  },
  {
    name: "YouTube",
    handle: "CELF Education",
    url: "https://youtube.com/@CELFEducation",
    icon: Youtube,
    color: "from-red-500/20 to-red-500/5",
    hoverColor: "hover:border-red-500/40",
    followers: "15.4K"
  },
  {
    name: "LinkedIn",
    handle: "CELF Education",
    url: "https://linkedin.com/company/celf-education",
    icon: Linkedin,
    color: "from-blue-600/20 to-blue-600/5",
    hoverColor: "hover:border-blue-600/40",
    followers: "12.8K"
  },
  {
    name: "TikTok",
    handle: "@celf_edu",
    url: "https://tiktok.com/@celf_edu",
    icon: MessageCircle,
    color: "from-purple-500/20 to-purple-500/5",
    hoverColor: "hover:border-purple-500/40",
    followers: "32.1K"
  },
  {
    name: "Discord",
    handle: "CELF Community",
    url: "https://discord.gg/celf",
    icon: MessageCircle,
    color: "from-indigo-500/20 to-indigo-500/5",
    hoverColor: "hover:border-indigo-500/40",
    followers: "8.9K"
  }
];

export function FollowUsSection() {
  return (
    <section id="follow-us" className="py-20 lg:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#9EFF00]/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Follow{" "}
            <span className="text-[#9EFF00]">CELF</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join our growing community across all social platforms. Get daily inspiration, 
            educational tips, and connect with students worldwide.
          </p>
        </motion.div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {socialLinks.map((social, index) => (
            <motion.div
              key={social.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`group cursor-pointer border-[#9EFF00]/20 ${social.hoverColor} transition-colors duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                      <social.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white group-hover:text-[#9EFF00] transition-colors duration-300">
                        {social.name}
                      </h3>
                      <div className="text-sm text-gray-400">{social.handle}</div>
                      <div className="text-xs text-[#9EFF00]">{social.followers} followers</div>
                    </div>
                  </div>

                  <Button asChild className="w-full" size="sm">
                    <Link href={social.url} target="_blank" rel="noopener noreferrer" className="group">
                      Follow
                      <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Newsletter and Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Never Miss an Update
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Stay connected with CELF across all platforms and get notified about 
              new content, events, and opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Bell className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h4 className="font-semibold text-white mb-2">Push Notifications</h4>
              <p className="text-gray-300 text-sm">
                Get instant updates on new content and opportunities
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Share2 className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h4 className="font-semibold text-white mb-2">Share Content</h4>
              <p className="text-gray-300 text-sm">
                Easily share inspiring content with your network
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h4 className="font-semibold text-white mb-2">Community Love</h4>
              <p className="text-gray-300 text-sm">
                Join a supportive community that celebrates your success
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/blog#newsletter" className="group">
                Subscribe to Newsletter
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/community">Join Community</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
