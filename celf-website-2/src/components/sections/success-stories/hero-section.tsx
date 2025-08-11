"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Users, Award } from "lucide-react";

export function SuccessStoriesHero() {
  const stats = [
    { number: "2,500+", label: "Students Helped", icon: Users },
    { number: "15M+", label: "CELF Tokens Earned", icon: Trophy },
    { number: "98%", label: "Success Rate", icon: Star },
    { number: "50+", label: "Universities", icon: Award },
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#9EFF00]/5 via-transparent to-[#9EFF00]/10" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9EFF00]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9EFF00]/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center mb-8"
          >
            <div className="relative">
              <div className="p-4 bg-[#9EFF00]/10 rounded-full border border-[#9EFF00]/20">
                <Trophy className="h-12 w-12 text-[#9EFF00]" />
              </div>
              <div className="absolute inset-0 bg-[#9EFF00]/20 rounded-full blur-xl" />
            </div>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl lg:text-7xl font-bold text-white mb-8"
          >
            Success Stories &{" "}
            <span className="text-[#9EFF00]">Testimonials</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto"
          >
            Discover how CELF is transforming lives and making education accessible 
            to students worldwide through our innovative scholarship program and 
            blockchain-powered token mining system.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-[#9EFF00]/30 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-[#9EFF00]/10 rounded-full mb-4">
                    <stat.icon className="h-6 w-6 text-[#9EFF00]" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm lg:text-base">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
