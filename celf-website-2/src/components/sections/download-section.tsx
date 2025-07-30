"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Smartphone,
  Download,
  Star,
  Shield,
  Zap,
  Users,
  Apple,
  Play,
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
    <section className="py-20 lg:py-32 relative overflow-hidden bg-[#0A0A0A]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-gray-900/20 to-[#0A0A0A]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Download the{" "}
              <span className="text-[#9EFF00]">CELF Mobile App</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Start your educational journey today. Mine CELF tokens, track your
              progress, and connect with a global community of students - all
              from your mobile device.
            </p>

            {/* App features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {appFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-8 h-8 bg-card-glow rounded-celf-md flex items-center justify-center flex-shrink-0 mt-1">
                    <feature.icon className="h-4 w-4 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Button size="lg" className="flex items-center space-x-2" asChild>
                <Link href="/download/ios">
                  <Apple className="h-5 w-5" />
                  <span>Download for iOS</span>
                </Link>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="flex items-center space-x-2"
                asChild
              >
                <Link href="/download/android">
                  <Play className="h-5 w-5" />
                  <span>Download for Android</span>
                </Link>
              </Button>
            </motion.div>

            {/* App stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-6 text-text-secondary"
            >
              <div className="flex items-center space-x-2">
                <Download className="h-5 w-5 text-brand-primary" />
                <span className="font-medium">50K+ Downloads</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-brand-primary" />
                <span className="font-medium">4.8/5 Rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative max-w-sm mx-auto">
              {/* Phone frame */}
              <div className="relative bg-device-gradient rounded-[3rem] p-2 shadow-device">
                <div className="bg-background-primary rounded-[2.5rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="bg-background-secondary h-8 flex items-center justify-between px-6 text-xs text-text-secondary">
                    <span>9:41</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-2 border border-text-secondary rounded-sm">
                        <div className="w-3 h-1 bg-brand-primary rounded-sm m-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* App content */}
                  <div className="p-6 h-[600px] bg-gradient-to-b from-background-primary to-background-secondary">
                    {/* CELF logo */}
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-brand-primary rounded-celf-lg flex items-center justify-center mx-auto mb-4 shadow-glow">
                        <span className="text-black font-bold text-2xl">C</span>
                      </div>
                      <h3 className="text-text-primary font-bold text-lg">
                        CELF Miner
                      </h3>
                    </div>

                    {/* Mining interface mockup */}
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-brand-primary mb-1">
                              1,247.5
                            </div>
                            <div className="text-text-secondary text-sm">
                              CELF Tokens
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="w-32 h-32 bg-card-glow rounded-full mx-auto flex items-center justify-center border-4 border-brand-primary">
                        <Zap className="h-12 w-12 text-brand-primary" />
                      </div>

                      <div className="text-center">
                        <div className="text-text-primary font-medium mb-2">
                          Mining Active
                        </div>
                        <div className="text-text-secondary text-sm">
                          Next reward in 2h 34m
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center shadow-glow"
              >
                <Smartphone className="h-6 w-6 text-black" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-brand-primary fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-text-secondary mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold text-text-primary">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-text-muted">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
