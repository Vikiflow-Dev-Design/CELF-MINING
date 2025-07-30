"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  Smartphone, 
  Zap, 
  Clock, 
  Award, 
  Download,
  ArrowRight,
  Play,
  CheckCircle,
  TrendingUp
} from "lucide-react";

const miningSteps = [
  {
    step: "01",
    icon: Download,
    title: "Download App",
    description: "Get the CELF mobile app from your device's app store and create your account in minutes."
  },
  {
    step: "02",
    icon: Play,
    title: "Start Mining",
    description: "Tap the mining button to begin earning CELF tokens. Mining sessions run for 1 hour at a time."
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Earn Tokens",
    description: "Accumulate CELF tokens at a rate of 0.125 tokens per hour with real-time balance updates."
  },
  {
    step: "04",
    icon: Award,
    title: "Qualify for Scholarships",
    description: "Use your earned tokens to qualify for educational scholarships and funding opportunities."
  }
];

const miningFeatures = [
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Mine tokens anywhere, anytime with our intuitive mobile application designed for students on the go.",
    highlight: "iOS & Android"
  },
  {
    icon: Zap,
    title: "Instant Start",
    description: "Begin mining immediately after account creation. No complex setup or technical knowledge required.",
    highlight: "Zero Setup"
  },
  {
    icon: Clock,
    title: "Flexible Sessions",
    description: "1-hour mining sessions that fit into your schedule. Mine during study breaks or free time.",
    highlight: "1 Hour Sessions"
  },
  {
    icon: CheckCircle,
    title: "Fair Distribution",
    description: "Equal mining rates for all users ensure fair token distribution based on time and effort invested.",
    highlight: "0.125 CELF/hour"
  }
];

export function MiningExplanationSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[#9EFF00]/15 to-transparent rounded-full blur-3xl"
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
            <span className="text-gray-300 text-sm font-medium">Token Mining</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            How{" "}
            <span className="text-[#9EFF00]">CELF Mining</span>{" "}
            Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            CELF mining replaces traditional scholarship exams with an innovative, accessible system 
            that rewards consistency and dedication through blockchain technology.
          </p>
        </motion.div>

        {/* Mining Process Steps */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-bold text-white text-center mb-12"
          >
            Get Started in 4 Simple Steps
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
                      
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {step.description}
                      </p>
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

        {/* Mining Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left side - Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-8">
              Why Choose CELF Mining?
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

          {/* Right side - CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(158,255,0,0.2)]">
                  <Smartphone className="h-8 w-8 text-[#9EFF00]" />
                </div>

                <h4 className="text-2xl font-bold text-white mb-4">
                  Ready to Start Mining?
                </h4>
                
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Join thousands of students already earning CELF tokens and qualifying for educational scholarships through our innovative mining system.
                </p>

                <div className="space-y-4">
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/download" className="group">
                      Download CELF App
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  
                  <Button variant="secondary" size="lg" className="w-full" asChild>
                    <Link href="/how-it-works">Learn More</Link>
                  </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-[#9EFF00]/20">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00]">0.125</div>
                      <div className="text-xs text-gray-400">CELF/hour</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00]">1hr</div>
                      <div className="text-xs text-gray-400">Sessions</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00]">24/7</div>
                      <div className="text-xs text-gray-400">Available</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-8 h-8 border-2 border-[#9EFF00]/30 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
