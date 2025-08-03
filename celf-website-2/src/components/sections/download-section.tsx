"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { CardBody, CardContainer, CardItem } from "@/src/components/ui/3d-card-effect";
import {
  Smartphone,
  Download,
  Star,
  Shield,
  Zap,
  Users,
  Apple,
  Play,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const appFeatures = [
  {
    icon: Zap,
    title: "Instant Mining",
    description:
      "Start mining CELF tokens immediately with our optimized mobile mining engine",
  },
  {
    icon: Shield,
    title: "Secure Wallet",
    description:
      "Built-in secure wallet to store and manage your CELF tokens safely",
  },
  {
    icon: Users,
    title: "Community Hub",
    description:
      "Connect with fellow miners and track global mining statistics",
  },
  {
    icon: Star,
    title: "Real-time Tracking",
    description:
      "Monitor your mining progress and scholarship eligibility in real-time",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    content:
      "CELF helped me fund my entire degree. The mining process is simple and the community is amazing!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Engineering Graduate",
    content:
      "Thanks to CELF, I graduated debt-free. This platform truly revolutionizes education funding.",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Medical Student",
    content:
      "The scholarship I earned through CELF mining changed my life. Highly recommend to all students!",
    rating: 5,
  },
];

export function DownloadSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-gray-900/30 to-[#0A0A0A]">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-[#9EFF00]/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-[#9EFF00]/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#9EFF00]/5 via-transparent to-[#9EFF00]/5" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(158,255,0,0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Enhanced Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#9EFF00]/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#9EFF00]/5 rounded-full blur-lg" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-[#9EFF00]/10 border border-[#9EFF00]/20 mb-6"
              >
                <Smartphone className="h-4 w-4 text-[#9EFF00] mr-2" />
                <span className="text-[#9EFF00] text-sm font-medium">Mobile App Available</span>
              </motion.div>

              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Download the{" "}
                <span className="text-[#9EFF00] relative">
                  CELF Mobile App
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#9EFF00] to-transparent rounded-full" />
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Start your educational journey today. Mine CELF tokens, track your
                progress, and connect with a global community of students - all
                from your mobile device.
              </p>
            </div>

            {/* Enhanced App features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {appFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative p-4 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(158,255,0,0.15)] backdrop-blur-sm">
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#9EFF00]/5 via-transparent to-[#9EFF00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/30 to-[#9EFF00]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.2)]">
                        <feature.icon className="h-6 w-6 text-[#9EFF00]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-2 group-hover:text-[#9EFF00] transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-[#9EFF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Download buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link
                href="/download/ios"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-white rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] border-2 border-transparent hover:border-gray-200"
              >
                <Apple className="h-6 w-6 mr-3" />
                <div className="text-left">
                  <div className="text-sm text-gray-600">Download on the</div>
                  <div className="font-bold">App Store</div>
                </div>
                <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                href="/download/android"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(158,255,0,0.3)] border-2 border-[#9EFF00]/30 hover:border-[#9EFF00]/50"
              >
                <Play className="h-6 w-6 text-[#9EFF00] mr-3" />
                <div className="text-left">
                  <div className="text-sm text-gray-400">Get it on</div>
                  <div className="font-bold">Google Play</div>
                </div>
                <ArrowRight className="h-5 w-5 ml-3 text-[#9EFF00] group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            {/* Enhanced App stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="text-center p-4 rounded-xl bg-[#9EFF00]/5 border border-[#9EFF00]/20">
                <Download className="h-6 w-6 text-[#9EFF00] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">2025</div>
                <div className="text-sm text-gray-400">Launch Year</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-[#9EFF00]/5 border border-[#9EFF00]/20">
                <Star className="h-6 w-6 text-[#9EFF00] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">4.8</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-[#9EFF00]/5 border border-[#9EFF00]/20">
                <Users className="h-6 w-6 text-[#9EFF00] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">25K+</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-[#9EFF00]/5 border border-[#9EFF00]/20">
                <Zap className="h-6 w-6 text-[#9EFF00] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Mining</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Enhanced Phone mockup with 3D effect */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <CardContainer className="inter-var">
              <CardBody className="relative group/card hover:shadow-2xl hover:shadow-[#9EFF00]/[0.1] w-auto h-auto rounded-xl">
                <CardItem
                  translateZ="100"
                  className="relative max-w-sm mx-auto"
                >
                  {/* Enhanced Phone frame */}
                  <div className="relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-[3rem] p-3 shadow-[0_0_60px_rgba(158,255,0,0.3)] border border-[#9EFF00]/20">
                    <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-inner">
                      {/* Enhanced Status bar */}
                      <div className="bg-gray-900 h-10 flex items-center justify-between px-6 text-xs text-gray-300">
                        <span className="font-medium">9:41</span>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-[#9EFF00] rounded-full animate-pulse" />
                            <div className="w-1 h-1 bg-[#9EFF00] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                            <div className="w-1 h-1 bg-[#9EFF00] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                          </div>
                          <div className="w-6 h-3 border border-gray-400 rounded-sm">
                            <div className="w-5 h-2 bg-[#9EFF00] rounded-sm m-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Enhanced App content */}
                      <div className="p-6 h-[600px] bg-gradient-to-b from-gray-900 via-gray-800 to-black relative overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(158,255,0,0.3) 1px, transparent 0)`,
                            backgroundSize: '30px 30px'
                          }} />
                        </div>
                        <div className="relative z-10">
                          {/* Enhanced CELF logo */}
                          <div className="text-center mb-8">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                              className="w-20 h-20 bg-gradient-to-br from-[#9EFF00] to-[#7ACC00] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(158,255,0,0.5)] border-2 border-[#9EFF00]/30"
                            >
                              <span className="text-black font-bold text-3xl">C</span>
                            </motion.div>
                            <h3 className="text-white font-bold text-xl mb-1">
                              CELF Miner
                            </h3>
                            <p className="text-gray-400 text-sm">v2.1.0</p>
                          </div>

                          {/* Enhanced Mining interface mockup */}
                          <div className="space-y-6">
                            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-4 border border-[#9EFF00]/20 backdrop-blur-sm">
                              <div className="text-center">
                                <div className="text-3xl font-bold text-[#9EFF00] mb-1">
                                  1,247.5
                                </div>
                                <div className="text-gray-400 text-sm">
                                  CELF Tokens Mined
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                  ≈ $623.75 USD
                                </div>
                              </div>
                            </div>

                            <div className="relative">
                              <motion.div
                                animate={{
                                  boxShadow: [
                                    "0 0 20px rgba(158,255,0,0.3)",
                                    "0 0 40px rgba(158,255,0,0.6)",
                                    "0 0 20px rgba(158,255,0,0.3)"
                                  ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-32 h-32 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-full mx-auto flex items-center justify-center border-4 border-[#9EFF00] relative overflow-hidden"
                              >
                                <Zap className="h-16 w-16 text-[#9EFF00] z-10" />
                                {/* Animated rings */}
                                <motion.div
                                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="absolute inset-0 border-2 border-[#9EFF00] rounded-full"
                                />
                                <motion.div
                                  animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                  className="absolute inset-0 border-2 border-[#9EFF00] rounded-full"
                                />
                              </motion.div>
                            </div>

                            <div className="text-center">
                              <div className="text-white font-medium mb-2 flex items-center justify-center">
                                <div className="w-2 h-2 bg-[#9EFF00] rounded-full mr-2 animate-pulse" />
                                Mining Active
                              </div>
                              <div className="text-gray-400 text-sm mb-2">
                                Next reward in 2h 34m
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <motion.div
                                  initial={{ width: "0%" }}
                                  animate={{ width: "65%" }}
                                  transition={{ duration: 2, ease: "easeOut" }}
                                  className="bg-gradient-to-r from-[#9EFF00] to-[#7ACC00] h-2 rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                  </div>
                      </div>
                    </div>

                  {/* Enhanced Floating elements */}
                  <CardItem translateZ="50">
                    <motion.div
                      animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-[#9EFF00] to-[#7ACC00] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(158,255,0,0.5)] border border-[#9EFF00]/30"
                    >
                      <Smartphone className="h-8 w-8 text-black" />
                    </motion.div>
                  </CardItem>

                  <CardItem translateZ="30">
                    <motion.div
                      animate={{ y: [0, -8, 0], x: [0, 3, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#9EFF00]/30 to-[#9EFF00]/10 rounded-xl flex items-center justify-center border border-[#9EFF00]/40"
                    >
                      <Star className="h-6 w-6 text-[#9EFF00]" />
                    </motion.div>
                  </CardItem>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        </div>

        {/* Enhanced Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              What Our <span className="text-[#9EFF00]">Users Say</span>
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Hear from our early community members who are excited about the future of education funding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(158,255,0,0.15)] backdrop-blur-sm h-full">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#9EFF00]/5 via-transparent to-[#9EFF00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative">
                    {/* Stars */}
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-[#9EFF00] fill-current"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-gray-300 mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00] to-[#7ACC00] rounded-full flex items-center justify-center mr-4 font-bold text-black text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-[#9EFF00] transition-colors duration-300">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
