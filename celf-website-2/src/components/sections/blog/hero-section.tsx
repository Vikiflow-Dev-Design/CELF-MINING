"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, BookOpen, PenTool, TrendingUp, Users, Calendar, Eye } from "lucide-react";

export function BlogHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#2A2A2A] to-[#0A0A0A]">
      {/* Enhanced background gradients */}
      <div className="absolute inset-0 bg-gradient-radial from-[#9EFF00]/15 via-[#9EFF00]/5 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/50 via-transparent to-[#0A0A0A]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/80" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#9EFF00]/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-[#9EFF00]/25 to-transparent rounded-full blur-3xl"
        />
        
        {/* Floating blog icons */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/3 left-1/3 w-8 h-8 text-[#9EFF00]/30"
        >
          <BookOpen className="w-full h-full" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/3 right-1/3 w-6 h-6 text-[#9EFF00]/40"
        >
          <PenTool className="w-full h-full" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          className="absolute top-1/2 right-1/5 w-7 h-7 text-[#9EFF00]/35"
        >
          <TrendingUp className="w-full h-full" />
        </motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center space-x-2 bg-gray-900/80 border border-[#9EFF00]/30 rounded-full px-6 py-3 mb-8"
          >
            <BookOpen className="h-5 w-5 text-[#9EFF00]" />
            <span className="text-gray-300 font-medium">Educational Insights</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            CELF{" "}
            <span className="text-[#9EFF00] drop-shadow-[0_0_30px_rgba(158,255,0,0.5)]">Blog</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Discover insights, tips, and stories about education, scholarships, and student success. 
            Stay informed with the latest updates from the CELF community and beyond.
          </motion.p>

          {/* Blog stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
          >
            <div className="flex flex-col items-center space-y-3 text-gray-300 bg-gray-900/50 rounded-xl p-6 border border-[#9EFF00]/20">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mb-2">
                <BookOpen className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <div className="text-2xl font-bold text-[#9EFF00]">150+</div>
              <span className="font-medium text-center text-sm">Articles Published</span>
            </div>
            <div className="flex flex-col items-center space-y-3 text-gray-300 bg-gray-900/50 rounded-xl p-6 border border-[#9EFF00]/20">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <div className="text-2xl font-bold text-[#9EFF00]">25K+</div>
              <span className="font-medium text-center text-sm">Monthly Readers</span>
            </div>
            <div className="flex flex-col items-center space-y-3 text-gray-300 bg-gray-900/50 rounded-xl p-6 border border-[#9EFF00]/20">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mb-2">
                <Calendar className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <div className="text-2xl font-bold text-[#9EFF00]">3x</div>
              <span className="font-medium text-center text-sm">Weekly Posts</span>
            </div>
            <div className="flex flex-col items-center space-y-3 text-gray-300 bg-gray-900/50 rounded-xl p-6 border border-[#9EFF00]/20">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mb-2">
                <Eye className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <div className="text-2xl font-bold text-[#9EFF00]">500K+</div>
              <span className="font-medium text-center text-sm">Total Views</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Button size="xl" asChild>
              <Link href="#featured-posts" className="group">
                Read Latest Posts
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="secondary" size="xl" asChild>
              <Link href="#newsletter">Subscribe to Newsletter</Link>
            </Button>
          </motion.div>

          {/* Blog categories preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8"
          >
            <div className="text-center">
              <div className="text-lg font-bold text-[#9EFF00] mb-1">Scholarship Tips</div>
              <div className="text-gray-400 text-sm">Application strategies & advice</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#9EFF00] mb-1">Study Guides</div>
              <div className="text-gray-400 text-sm">Academic success resources</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#9EFF00] mb-1">Success Stories</div>
              <div className="text-gray-400 text-sm">Inspiring student journeys</div>
            </div>
          </motion.div>

          {/* Featured article teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="max-w-3xl mx-auto bg-gray-900/50 rounded-xl p-6 border border-[#9EFF00]/20"
          >
            <div className="text-sm text-[#9EFF00] mb-2">Latest Article</div>
            <h3 className="text-xl font-bold text-white mb-3">
              "10 Proven Strategies to Write Winning Scholarship Essays"
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Learn from scholarship recipients who secured over $2.5M in funding. Discover the 
              writing techniques and strategies that made their applications stand out...
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <span>By Sarah Chen</span>
                <span>•</span>
                <span>5 min read</span>
                <span>•</span>
                <span>2 days ago</span>
              </div>
              <Button size="sm" variant="secondary" asChild>
                <Link href="/blog/scholarship-essay-strategies">Read More</Link>
              </Button>
            </div>
          </motion.div>

          {/* Blog features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 text-sm"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#9EFF00] rounded-full"></div>
              <span>Expert Contributors</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#9EFF00] rounded-full"></div>
              <span>Weekly Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#9EFF00] rounded-full"></div>
              <span>Student-Focused Content</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#9EFF00] rounded-full"></div>
              <span>Free Resources</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#9EFF00]/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-[#9EFF00] rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
