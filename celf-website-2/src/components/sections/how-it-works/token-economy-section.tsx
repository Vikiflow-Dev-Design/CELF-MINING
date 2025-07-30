"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  Coins, 
  TrendingUp, 
  Shield, 
  Users, 
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Repeat,
  Lock
} from "lucide-react";

const tokenFlow = [
  {
    icon: Coins,
    title: "Token Creation",
    description: "Students mine CELF tokens through consistent app usage and community participation.",
    amount: "0.125 CELF/hour",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5",
    direction: "up"
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Tokens encourage active participation in the CELF educational community.",
    amount: "Bonus rewards",
    color: "from-blue-500/20 to-blue-500/5",
    direction: "right"
  },
  {
    icon: Award,
    title: "Scholarship Qualification",
    description: "Accumulated tokens serve as proof of merit for scholarship applications.",
    amount: "1,000+ tokens",
    color: "from-purple-500/20 to-purple-500/5",
    direction: "down"
  },
  {
    icon: TrendingUp,
    title: "Value Creation",
    description: "Successful students create value for the entire CELF ecosystem.",
    amount: "Ecosystem growth",
    color: "from-orange-500/20 to-orange-500/5",
    direction: "cycle"
  }
];

const economicPrinciples = [
  {
    icon: Shield,
    title: "Deflationary Model",
    description: "Tokens used for scholarships are removed from circulation, creating scarcity and value.",
    benefit: "Increasing token value over time"
  },
  {
    icon: Users,
    title: "Merit-Based Distribution",
    description: "Tokens are earned through effort and consistency, not purchased or given arbitrarily.",
    benefit: "Fair and transparent allocation"
  },
  {
    icon: Lock,
    title: "Utility-Driven Value",
    description: "Tokens have real-world utility for education funding, not just speculative trading.",
    benefit: "Sustainable long-term value"
  },
  {
    icon: Repeat,
    title: "Circular Economy",
    description: "Value flows from students to education and back to the community ecosystem.",
    benefit: "Self-sustaining growth model"
  }
];

const tokenMetrics = [
  {
    metric: "1B",
    label: "Total Supply",
    description: "Maximum tokens that will ever exist",
    trend: "fixed"
  },
  {
    metric: "60%",
    label: "Mining Allocation",
    description: "Tokens reserved for student mining",
    trend: "decreasing"
  },
  {
    metric: "25%",
    label: "Scholarship Fund",
    description: "Tokens for direct scholarship distribution",
    trend: "decreasing"
  },
  {
    metric: "95%",
    label: "Utility Rate",
    description: "Tokens used for their intended purpose",
    trend: "stable"
  }
];

export function TokenEconomySection() {
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
            <TrendingUp className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Token Economy</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            CELF{" "}
            <span className="text-[#9EFF00]">Token Economy</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding how CELF tokens create value, drive participation, and sustain 
            the educational funding ecosystem through innovative economic design.
          </p>
        </motion.div>

        {/* Token Flow */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-bold text-white text-center mb-12"
          >
            Token Flow & Value Creation
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tokenFlow.map((flow, index) => (
              <motion.div
                key={flow.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="h-full text-center group cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${flow.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                      <flow.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    
                    <CardTitle className="mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                      {flow.title}
                    </CardTitle>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      {flow.description}
                    </p>

                    <div className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium">
                      {flow.amount}
                    </div>
                  </CardContent>
                </Card>

                {/* Flow indicators */}
                {index < tokenFlow.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    {flow.direction === 'up' && <ArrowUpRight className="h-6 w-6 text-[#9EFF00]/50" />}
                    {flow.direction === 'right' && <ArrowUpRight className="h-6 w-6 text-[#9EFF00]/50 rotate-45" />}
                    {flow.direction === 'down' && <ArrowDownRight className="h-6 w-6 text-[#9EFF00]/50" />}
                    {flow.direction === 'cycle' && <Repeat className="h-6 w-6 text-[#9EFF00]/50" />}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Economic Principles and Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Economic Principles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Economic Principles
            </h3>

            <div className="space-y-6">
              {economicPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-gray-900/30 border border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <principle.icon className="h-5 w-5 text-[#9EFF00]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{principle.title}</h4>
                    <p className="text-gray-300 mb-3 leading-relaxed">{principle.description}</p>
                    <div className="text-sm text-[#9EFF00] font-medium">
                      ✓ {principle.benefit}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Token Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Key Token Metrics
                </h3>

                <div className="space-y-6 mb-8">
                  {tokenMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                    >
                      <div>
                        <div className="text-2xl font-bold text-[#9EFF00] mb-1">
                          {metric.metric}
                        </div>
                        <h4 className="text-sm font-semibold text-white mb-1">
                          {metric.label}
                        </h4>
                        <p className="text-xs text-gray-300">
                          {metric.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                          metric.trend === 'decreasing' ? 'bg-red-500/20 text-red-400' :
                          metric.trend === 'stable' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {metric.trend}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-[#9EFF00]/20 pt-6 text-center">
                  <h4 className="text-lg font-bold text-white mb-3">
                    Sustainable Economics
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    CELF's token economy is designed for long-term sustainability, 
                    ensuring continuous value creation for students and the educational ecosystem.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
