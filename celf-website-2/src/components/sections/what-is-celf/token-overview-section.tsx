"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle, CardDescription } from "@/src/components/ui/card";
import { 
  Coins, 
  Shield, 
  TrendingUp, 
  Users, 
  Zap, 
  Award,
  Globe,
  Clock
} from "lucide-react";

const tokenFeatures = [
  {
    icon: Coins,
    title: "CELF Token",
    description: "Digital currency earned through mining activities, used to qualify for educational scholarships and rewards.",
    highlight: "Primary Currency"
  },
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Built on secure blockchain technology ensuring transparency, immutability, and fair distribution of tokens.",
    highlight: "100% Secure"
  },
  {
    icon: TrendingUp,
    title: "Merit-Based System",
    description: "Token distribution based purely on mining effort and consistency, creating a fair scholarship qualification system.",
    highlight: "Fair & Transparent"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Global community of students, educators, and supporters working together to democratize education funding.",
    highlight: "25+ Countries"
  },
  {
    icon: Zap,
    title: "Instant Mining",
    description: "Start earning CELF tokens immediately through our user-friendly mobile application with real-time tracking.",
    highlight: "Real-Time"
  },
  {
    icon: Award,
    title: "Scholarship Rewards",
    description: "Convert your mined CELF tokens into actual educational scholarships and funding opportunities.",
    highlight: "150+ Awarded"
  }
];

const tokenStats = [
  {
    icon: Globe,
    number: "1M+",
    label: "Tokens Mined",
    description: "Total CELF tokens mined by our global community"
  },
  {
    icon: Users,
    number: "2,500+",
    label: "Active Miners",
    description: "Students actively mining and earning tokens"
  },
  {
    icon: Award,
    number: "150+",
    label: "Scholarships",
    description: "Educational scholarships awarded through CELF"
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Mining Active",
    description: "Continuous mining opportunities available"
  }
];

export function TokenOverviewSection() {
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
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#9EFF00]/10 to-transparent rounded-full blur-3xl"
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
            Understanding{" "}
            <span className="text-[#9EFF00]">CELF Tokens</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            CELF tokens represent a revolutionary approach to education funding, combining blockchain 
            technology with merit-based scholarship distribution to create opportunities for students worldwide.
          </p>
        </motion.div>

        {/* Token Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {tokenFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                      <feature.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <CardTitle className="group-hover:text-[#9EFF00] transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                      <span className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium">
                        {feature.highlight}
                      </span>
                    </div>
                    <CardDescription className="leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Token Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              CELF Token Impact
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              See the real-world impact of CELF tokens in transforming education funding and creating opportunities for students globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tokenStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                  <stat.icon className="h-8 w-8 text-[#9EFF00]" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-[#9EFF00] mb-2">
                  {stat.number}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
