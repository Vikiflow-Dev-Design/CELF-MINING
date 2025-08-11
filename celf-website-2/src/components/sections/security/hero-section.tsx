"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { 
  Shield, 
  Lock, 
  Eye,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Zap,
  Database
} from "lucide-react";

export function SecurityHero() {
  const securityStats = [
    {
      icon: Shield,
      value: "256-bit",
      label: "Encryption Standard"
    },
    {
      icon: Lock,
      value: "99.9%",
      label: "Uptime Security"
    },
    {
      icon: Eye,
      value: "24/7",
      label: "Monitoring"
    },
    {
      icon: Database,
      value: "SOC 2",
      label: "Compliance"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-blue-500/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
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
            className="inline-flex items-center space-x-2 bg-gray-900/80 border border-blue-500/30 rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="h-5 w-5 text-blue-400" />
            <span className="text-gray-300 font-medium">Bank-Grade Security • Your Safety First</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Your{" "}
            <span className="text-blue-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">Security</span>{" "}
            is Our Priority
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            CELF employs enterprise-grade security measures to protect your data, tokens, and 
            educational journey. Learn about our comprehensive security framework and best practices.
          </motion.p>

          {/* Security Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
          >
            {securityStats.map((stat, index) => (
              <div key={stat.label} className="flex flex-col items-center space-y-3 text-gray-300 bg-gray-900/50 rounded-xl p-6 border border-blue-500/20">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                <span className="font-medium text-center text-sm">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          >
            <div className="flex items-center justify-center space-x-3 text-gray-300 bg-gray-900/50 rounded-xl p-4 border border-blue-500/20">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-400" />
              </div>
              <span className="font-medium">End-to-End Encryption</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300 bg-gray-900/50 rounded-xl p-4 border border-blue-500/20">
              <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center">
                <Lock className="h-5 w-5 text-[#9EFF00]" />
              </div>
              <span className="font-medium">Multi-Factor Authentication</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300 bg-gray-900/50 rounded-xl p-4 border border-blue-500/20">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-xl flex items-center justify-center">
                <Zap className="h-5 w-5 text-purple-400" />
              </div>
              <span className="font-medium">Real-Time Monitoring</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="xl" asChild>
              <Link href="#security-measures" className="group">
                Learn About Our Security
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="secondary" size="xl" asChild>
              <Link href="#report-security">Report Security Issue</Link>
            </Button>
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
          className="w-6 h-10 border-2 border-blue-400/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-blue-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
