"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  Zap, 
  Shield, 
  Users, 
  Award,
  Smartphone,
  Clock,
  Globe,
  TrendingUp,
  Bell,
  Eye,
  Heart,
  Target
} from "lucide-react";

const appFeatures = [
  {
    icon: Zap,
    title: "Token Mining",
    description: "Mine CELF tokens with just one tap. Our energy-efficient mining system runs in the background without draining your battery.",
    features: ["One-tap mining", "Background processing", "Battery optimized", "Real-time tracking"],
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    icon: Award,
    title: "Scholarship Tracking",
    description: "Monitor your progress toward scholarship eligibility with detailed analytics and milestone tracking.",
    features: ["Progress dashboard", "Milestone alerts", "Eligibility checker", "Application status"],
    color: "from-yellow-500/20 to-yellow-500/5"
  },
  {
    icon: Users,
    title: "Community Hub",
    description: "Connect with fellow students, share experiences, and get support from mentors worldwide.",
    features: ["Student forums", "Mentor matching", "Success stories", "Peer support"],
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Shield,
    title: "Secure Wallet",
    description: "Your tokens are stored securely with enterprise-grade encryption and blockchain verification.",
    features: ["256-bit encryption", "Blockchain verified", "Backup & recovery", "Multi-factor auth"],
    color: "from-red-500/20 to-red-500/5"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay informed with intelligent notifications about mining sessions, scholarships, and community updates.",
    features: ["Mining reminders", "Scholarship alerts", "Community updates", "Custom preferences"],
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    description: "Track your mining performance, token accumulation, and scholarship readiness with detailed insights.",
    features: ["Mining statistics", "Token analytics", "Performance trends", "Goal tracking"],
    color: "from-green-500/20 to-green-500/5"
  }
];

const mobileFeatures = [
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Designed specifically for mobile devices with intuitive touch controls and responsive design."
  },
  {
    icon: Clock,
    title: "Offline Capable",
    description: "Continue mining and track progress even when offline. Data syncs automatically when connected."
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Available in 12+ languages to serve our global student community effectively."
  },
  {
    icon: Eye,
    title: "Dark Mode",
    description: "Easy on the eyes with beautiful dark mode support for comfortable usage anytime."
  }
];

const appStats = [
  {
    icon: Users,
    number: "50K+",
    label: "Active Users",
    description: "Students mining daily"
  },
  {
    icon: Zap,
    number: "1M+",
    label: "Mining Sessions",
    description: "Completed successfully"
  },
  {
    icon: Award,
    number: "150+",
    label: "Scholarships",
    description: "Awarded through app"
  },
  {
    icon: Heart,
    number: "4.8★",
    label: "User Rating",
    description: "Average app store rating"
  }
];

export function AppFeaturesSection() {
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Powerful{" "}
            <span className="text-[#9EFF00]">App Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The CELF mobile app is packed with features designed to make token mining simple, 
            scholarship tracking easy, and community engagement meaningful.
          </p>
        </motion.div>

        {/* App Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {appStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                <stat.icon className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <div className="text-2xl font-bold text-[#9EFF00] mb-1">
                {stat.number}
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                {stat.label}
              </h4>
              <p className="text-xs text-gray-400">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {appFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                    <feature.icon className="h-6 w-6 text-[#9EFF00]" />
                  </div>
                  
                  <CardTitle className="mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                  
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Feature List */}
                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-[#9EFF00] rounded-full flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile-Specific Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Mobile-First Experience
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Built from the ground up for mobile devices, CELF delivers a seamless experience 
              that works perfectly on your smartphone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mobileFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                  <feature.icon className="h-8 w-8 text-[#9EFF00]" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[#9EFF00]/20 text-center">
            <h4 className="text-xl font-bold text-white mb-4">
              Regular Updates & New Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div>
                <div className="text-2xl font-bold text-[#9EFF00] mb-2">Monthly</div>
                <div className="text-white font-medium mb-1">App Updates</div>
                <div className="text-gray-400 text-sm">New features & improvements</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#9EFF00] mb-2">24/7</div>
                <div className="text-white font-medium mb-1">Support</div>
                <div className="text-gray-400 text-sm">Community & technical help</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#9EFF00] mb-2">Free</div>
                <div className="text-white font-medium mb-1">Forever</div>
                <div className="text-gray-400 text-sm">No subscriptions or fees</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
