"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import {
  Smartphone,
  Play,
  Clock,
  Coins,
  ArrowRight,
  Zap,
  Target,
  Calendar,
  CheckCircle
} from "lucide-react";

const miningSteps = [
  {
    step: "01",
    icon: Smartphone,
    title: "Open CELF App",
    description: "Launch the CELF mobile application on your iOS or Android device.",
    details: "Available on App Store and Google Play",
    time: "Instant"
  },
  {
    step: "02",
    icon: Play,
    title: "Start Mining Session",
    description: "Tap the mining button to begin your 1-hour token earning session.",
    details: "Simple one-tap activation",
    time: "1 second"
  },
  {
    step: "03",
    icon: Clock,
    title: "Mine for 1 Hour",
    description: "Let the app run in the background while you study, work, or go about your day.",
    details: "Background mining supported",
    time: "60 minutes"
  },
  {
    step: "04",
    icon: Coins,
    title: "Earn 0.125 CELF",
    description: "Receive your tokens automatically when the mining session completes.",
    details: "Instant token credit",
    time: "Automatic"
  }
];

const miningFeatures = [
  {
    icon: Zap,
    title: "Energy Efficient",
    description: "Our mining process is designed to be battery-friendly and won't drain your device.",
    highlight: "Low Battery Usage"
  },
  {
    icon: Target,
    title: "Fair Rate for All",
    description: "Every user earns tokens at the same rate - 0.125 CELF per hour, ensuring fairness.",
    highlight: "Equal Opportunity"
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description: "Mine whenever it's convenient for you. No fixed schedules or mandatory times.",
    highlight: "24/7 Available"
  },
  {
    icon: CheckCircle,
    title: "Real-Time Tracking",
    description: "Watch your token balance grow in real-time with detailed mining statistics.",
    highlight: "Live Updates"
  }
];



const miningStats = [
  {
    metric: "0.125",
    unit: "CELF/hour",
    label: "Mining Rate",
    description: "Tokens earned per hour"
  },
  {
    metric: "1",
    unit: "hour",
    label: "Session Length",
    description: "Standard mining duration"
  },
  {
    metric: "1,000+",
    unit: "tokens",
    label: "Scholarship Minimum",
    description: "Tokens needed to qualify"
  },
  {
    metric: "6-8",
    unit: "months",
    label: "Average Time",
    description: "To reach scholarship threshold"
  }
];

export function MiningProcessSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
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
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#9EFF00]/20 to-transparent rounded-full blur-3xl"
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
          <div className="inline-flex items-center space-x-2 bg-gray-900/80 border border-[#9EFF00]/30 rounded-full px-4 py-2 mb-6">
            <Zap className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Mining Process</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            How{" "}
            <span className="text-[#9EFF00]">Token Mining</span>{" "}
            Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            CELF mining is simple, fair, and accessible. Earn tokens through consistent participation 
            and build your qualification for educational scholarships.
          </p>
        </motion.div>

        {/* Mining Steps */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-bold text-white text-center mb-12"
          >
            4 Simple Steps to Mine CELF Tokens
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {miningSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="h-full text-center group cursor-pointer">
                  <CardContent className="p-6">
                    {/* Step number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#9EFF00] text-black rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>

                    <div className="mt-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                        <step.icon className="h-6 w-6 text-[#9EFF00]" />
                      </div>
                      
                      <CardTitle className="mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                        {step.title}
                      </CardTitle>
                      
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        {step.description}
                      </p>

                      <div className="text-xs text-gray-400 mb-2">{step.details}</div>
                      <div className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium">
                        {step.time}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Connecting line (except for last item) */}
                {index < miningSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#9EFF00]/50 to-transparent transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mining Features and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          
          {/* Mining Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Mining Features
            </h3>

            <div className="space-y-6">
              {miningFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-gray-900/30 border border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-[#9EFF00]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white">{feature.title}</h4>
                      <span className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium">
                        {feature.highlight}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mining Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Mining Statistics
                </h3>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  {miningStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-[#9EFF00] mb-1">
                        {stat.metric}
                      </div>
                      <div className="text-sm text-gray-400 mb-2">{stat.unit}</div>
                      <h4 className="text-sm font-semibold text-white mb-1">
                        {stat.label}
                      </h4>
                      <p className="text-xs text-gray-300">
                        {stat.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-[#9EFF00]/20 pt-6">
                  <h4 className="text-lg font-bold text-white mb-4 text-center">
                    Ready to Start Mining?
                  </h4>
                  
                  <div className="space-y-3">
                    <Button size="lg" className="w-full" asChild>
                      <Link href="/download" className="group">
                        Download CELF App
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    
                    <Button variant="secondary" size="sm" className="w-full" asChild>
                      <Link href="/scholarship-program">View Scholarships</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
