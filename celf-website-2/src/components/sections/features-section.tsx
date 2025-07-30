"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  Coins,
  GraduationCap,
  Users,
  Shield,
  Smartphone,
  TrendingUp,
  BookOpen,
  Award,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Coins,
    title: "Token Mining System",
    description:
      "Mine CELF tokens through our innovative blockchain-based system. The more you mine, the higher your chances of receiving educational scholarships.",
    href: "/what-is-celf#mining",
  },
  {
    icon: GraduationCap,
    title: "Scholarship Program",
    description:
      "Earn scholarships based on your mined CELF tokens. Our merit-based system rewards dedication and consistency in the mining process.",
    href: "/scholarship-program",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description:
      "Mine tokens on-the-go with our user-friendly mobile application. Available for both iOS and Android devices with seamless synchronization.",
    href: "/download",
  },
  {
    icon: Users,
    title: "Educational Community",
    description:
      "Connect with fellow students, educators, and scholarship recipients. Share knowledge, get mentorship, and grow together.",
    href: "/socials",
  },
  {
    icon: Shield,
    title: "Secure & Transparent",
    description:
      "Built on blockchain technology ensuring complete transparency and security. All transactions and mining activities are verifiable and immutable.",
    href: "/what-is-celf#security",
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description:
      "Access comprehensive educational materials, tutorials, and guides to maximize your learning potential and mining efficiency.",
    href: "/help-center",
  },
  {
    icon: Award,
    title: "Merit-Based Rewards",
    description:
      "Fair and transparent reward system based on your mining contributions. No favoritism, just pure merit and dedication.",
    href: "/scholarship-program#merit",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description:
      "Monitor your mining progress, token balance, and scholarship eligibility in real-time through our comprehensive dashboard.",
    href: "/download#features",
  },
  {
    icon: Globe,
    title: "Global Access",
    description:
      "Available worldwide with support for multiple languages and currencies. Education knows no boundaries with CELF.",
    href: "/about#global",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 relative bg-[#0A0A0A]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Powerful Features for{" "}
            <span className="text-[#9EFF00]">Educational Success</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how CELF is transforming education through innovative
            blockchain technology, creating opportunities for students worldwide
            to access quality education funding.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={feature.href} className="block h-full">
                <Card className="h-full group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                        <feature.icon className="h-6 w-6 text-[#9EFF00]" />
                      </div>
                      <CardTitle className="mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)] max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Start Your Educational Journey?
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already mining CELF tokens and
              earning scholarships. Your education funding is just a download
              away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/download">Download App Now</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/what-is-celf">Learn How It Works</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
