"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import {
  PieChart,
  TrendingUp,
  Shield,
  Users,
  Coins,
  ArrowRight,
  Lock,
  Unlock,
  Target,
} from "lucide-react";

const tokenDistribution = [
  {
    category: "Mining Rewards",
    percentage: 60,
    amount: "600M CELF",
    description: "Tokens distributed to students through mining activities",
    color: "#9EFF00",
    icon: Coins,
  },
  {
    category: "Scholarship Fund",
    percentage: 25,
    amount: "250M CELF",
    description:
      "Reserved for direct scholarship distributions and educational grants",
    color: "#7DD3FC",
    icon: Target,
  },
  {
    category: "Development",
    percentage: 10,
    amount: "100M CELF",
    description:
      "Platform development, maintenance, and technological improvements",
    color: "#F59E0B",
    icon: TrendingUp,
  },
  {
    category: "Foundation Reserve",
    percentage: 5,
    amount: "50M CELF",
    description:
      "Long-term sustainability and emergency fund for the foundation",
    color: "#EF4444",
    icon: Shield,
  },
];

const tokenomicsFeatures = [
  {
    icon: Lock,
    title: "Deflationary Model",
    description:
      "Token supply decreases over time through scholarship distributions, creating scarcity and value appreciation.",
    highlight: "Burn Mechanism",
  },
  {
    icon: Users,
    title: "Community Governed",
    description:
      "Major decisions about token distribution and platform changes are made through community voting.",
    highlight: "DAO Structure",
  },
  {
    icon: Shield,
    title: "Transparent Distribution",
    description:
      "All token movements and distributions are recorded on the blockchain for complete transparency.",
    highlight: "100% Auditable",
  },
  {
    icon: Unlock,
    title: "Utility-Driven",
    description:
      "Tokens have real-world utility for scholarship qualification, not just speculative trading value.",
    highlight: "Real Utility",
  },
];

export function TokenomicsSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-gradient-radial from-[#9EFF00]/10 to-transparent rounded-full blur-3xl"
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
            <PieChart className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">
              Tokenomics
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            CELF Token <span className="text-[#9EFF00]">Economics</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the economic model behind CELF tokens and how they
            create sustainable value for students, educators, and the broader
            educational ecosystem.
          </p>
        </motion.div>

        {/* Token Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left side - Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Token Distribution
                </h3>

                <div className="relative mb-8">
                  {/* Simplified pie chart representation */}
                  <div className="w-48 h-48 mx-auto relative">
                    <div className="w-full h-full rounded-full bg-gradient-conic from-[#9EFF00] via-[#7DD3FC] via-[#F59E0B] to-[#EF4444] shadow-[0_0_50px_rgba(158,255,0,0.3)]"></div>
                    <div className="absolute inset-4 bg-gray-900 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#9EFF00]">
                          1B
                        </div>
                        <div className="text-sm text-gray-300">
                          Total Supply
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {tokenDistribution.map((item, index) => (
                    <motion.div
                      key={item.category}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <div className="text-white font-medium">
                            {item.category}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {item.amount}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">
                          {item.percentage}%
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right side - Distribution Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Sustainable Token Economy
            </h3>

            <div className="space-y-6">
              {tokenDistribution.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-gray-900/30 border border-[#9EFF00]/20"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-[#9EFF00]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {item.category}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-2 text-[#9EFF00] font-medium text-sm">
                      {item.amount}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tokenomics Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Token Economy Features
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tokenomicsFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                      <feature.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>

                    <div className="flex items-center justify-center mb-3">
                      <CardTitle className="text-center group-hover:text-[#9EFF00] transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                    </div>

                    <span className="inline-block text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium mb-3">
                      {feature.highlight}
                    </span>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30 max-w-4xl mx-auto">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Join the CELF Economy?
              </h3>

              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Start mining CELF tokens today and become part of the
                revolutionary blockchain-based education funding ecosystem
                that's changing lives worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button size="xl" asChild>
                  <Link href="/download" className="group">
                    Start Mining Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="secondary" size="xl" asChild>
                  <Link href="/whitepaper">Read Whitepaper</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#9EFF00]/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#9EFF00] mb-1">
                    1B
                  </div>
                  <div className="text-gray-300 text-sm">Total Supply</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#9EFF00] mb-1">
                    60%
                  </div>
                  <div className="text-gray-300 text-sm">Mining Rewards</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#9EFF00] mb-1">
                    25%
                  </div>
                  <div className="text-gray-300 text-sm">Scholarships</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
