"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, Coins, GraduationCap, Users, Zap } from "lucide-react";

export function WhatIsCelfHero() {
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
            <Coins className="h-5 w-5 text-[#9EFF00]" />
            <span className="text-gray-300 font-medium">Blockchain Education Revolution</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            What is{" "}
            <span className="text-[#9EFF00] drop-shadow-[0_0_30px_rgba(158,255,0,0.5)]">CELF</span>
            ?
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            CELF (Clarence Education For Life Foundation) is revolutionizing education funding through 
            blockchain technology, replacing traditional scholarship exams with innovative token mining.
          </motion.p>

          {/* Key points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          >
            <div className="flex items-center justify-center space-x-3 text-gray-300 bg-gray-900/50 rounded-xl p-4 border border-[#9EFF00]/20">
              <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center">
                <Zap className="h-5 w-5 text-[#9EFF00]" />
              </div>
              <span className="font-medium">Mine CELF Tokens</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300 bg-gray-900/50 rounded-xl p-4 border border-[#9EFF00]/20">
              <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-[#9EFF00]" />
              </div>
              <span className="font-medium">Earn Scholarships</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300 bg-gray-900/50 rounded-xl p-4 border border-[#9EFF00]/20">
              <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-[#9EFF00]" />
              </div>
              <span className="font-medium">Join Community</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="xl" asChild>
              <Link href="/download" className="group">
                Start Mining Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="secondary" size="xl" asChild>
              <Link href="/scholarship-program">View Scholarships</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
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
