"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Users, Award, Globe, Target, TrendingUp, Heart } from "lucide-react";

const impactMetrics = [
  {
    icon: Users,
    number: "50,000+",
    label: "Students Supported",
    description: "Across 25+ countries worldwide",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    icon: Award,
    number: "$2.5M+",
    label: "Scholarships Awarded",
    description: "Direct financial support provided",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Globe,
    number: "25+",
    label: "Countries Reached",
    description: "Global educational impact",
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: Target,
    number: "85%",
    label: "Success Rate",
    description: "Students achieving their goals",
    color: "from-green-500/20 to-green-500/5"
  },
  {
    icon: TrendingUp,
    number: "300%",
    label: "Growth Rate",
    description: "Year-over-year impact increase",
    color: "from-yellow-500/20 to-yellow-500/5"
  },
  {
    icon: Heart,
    number: "1,200+",
    label: "Active Donors",
    description: "Supporting our mission",
    color: "from-red-500/20 to-red-500/5"
  }
];

export function ImpactSection() {
  return (
    <section id="impact" className="py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#9EFF00]/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Our{" "}
            <span className="text-[#9EFF00]">Impact</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See how your donations and sponsorships create real, measurable change in students' lives around the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                    <metric.icon className="h-8 w-8 text-[#9EFF00]" />
                  </div>
                  
                  <div className="text-3xl lg:text-4xl font-bold text-[#9EFF00] mb-2">
                    {metric.number}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                    {metric.label}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
