"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Users, 
  Globe, 
  MessageCircle, 
  Award,
  TrendingUp,
  Clock,
  Heart,
  Target,
  BookOpen,
  Zap
} from "lucide-react";

const communityStats = [
  {
    icon: Users,
    number: "2,500+",
    label: "Active Members",
    description: "Students actively participating in the community",
    growth: "+15% this month",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    icon: Globe,
    number: "5+",
    label: "Countries",
    description: "Initial markets with research completed",
    growth: "Expanding reach",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: MessageCircle,
    number: "10K+",
    label: "Daily Messages",
    description: "Active conversations and knowledge sharing",
    growth: "+25% engagement",
    color: "from-green-500/20 to-green-500/5"
  },
  {
    icon: Award,
    number: "25+",
    label: "Pilot Recipients",
    description: "Early scholarship recipients in foundation phase",
    growth: "Foundation program",
    color: "from-yellow-500/20 to-yellow-500/5"
  },
  {
    icon: BookOpen,
    number: "500+",
    label: "Study Groups",
    description: "Active study and support groups",
    growth: "+8 new groups",
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: Heart,
    number: "1,200+",
    label: "Mentorship Pairs",
    description: "Students helping fellow students",
    growth: "+20% matches",
    color: "from-red-500/20 to-red-500/5"
  }
];

const engagementMetrics = [
  {
    icon: Clock,
    title: "Average Response Time",
    value: "< 15 minutes",
    description: "Community members respond quickly to questions"
  },
  {
    icon: TrendingUp,
    title: "Monthly Growth",
    value: "12%",
    description: "Steady growth in active community participation"
  },
  {
    icon: Target,
    title: "Success Rate",
    value: "89%",
    description: "Members who achieve their educational goals"
  },
  {
    icon: Zap,
    title: "Daily Activity",
    value: "24/7",
    description: "Always someone online across global time zones"
  }
];

const regionalBreakdown = [
  { region: "North America", percentage: 40, members: "200+" },
  { region: "Europe", percentage: 25, members: "125+" },
  { region: "Asia Pacific", percentage: 20, members: "100+" },
  { region: "Latin America", percentage: 10, members: "50+" },
  { region: "Africa & Middle East", percentage: 5, members: "25+" }
];

export function CommunityStatsSection() {
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
          <div className="inline-flex items-center space-x-2 bg-gray-900/80 border border-[#9EFF00]/30 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Community Stats</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Growing{" "}
            <span className="text-[#9EFF00]">Together</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our community continues to grow stronger every day, with students from around the world 
            supporting each other's educational journeys and celebrating shared successes.
          </p>
        </motion.div>

        {/* Main Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {communityStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                    <stat.icon className="h-8 w-8 text-[#9EFF00]" />
                  </div>
                  
                  <div className="text-3xl lg:text-4xl font-bold text-[#9EFF00] mb-2">
                    {stat.number}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                    {stat.label}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    {stat.description}
                  </p>

                  <div className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-3 py-1 rounded-full font-medium">
                    {stat.growth}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Engagement Metrics and Regional Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Engagement Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Community Engagement
            </h3>

            <div className="space-y-6">
              {engagementMetrics.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-gray-900/30 border border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <metric.icon className="h-6 w-6 text-[#9EFF00]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white">{metric.title}</h4>
                      <span className="text-2xl font-bold text-[#9EFF00]">{metric.value}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{metric.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Regional Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Global Distribution
                </h3>

                <div className="space-y-4 mb-8">
                  {regionalBreakdown.map((region, index) => (
                    <motion.div
                      key={region.region}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white font-medium">{region.region}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-300">{region.members}</span>
                          <span className="text-[#9EFF00] font-bold">{region.percentage}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${region.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-r from-[#9EFF00] to-[#7ACC00] h-2 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-[#9EFF00]/20 pt-6">
                  <h4 className="text-lg font-bold text-white mb-4 text-center">
                    Community Highlights
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#9EFF00] mb-1">12</div>
                      <div className="text-white font-medium mb-1">Languages</div>
                      <div className="text-gray-400 text-xs">Supported in forums</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#9EFF00] mb-1">95%</div>
                      <div className="text-white font-medium mb-1">Satisfaction</div>
                      <div className="text-gray-400 text-xs">Community rating</div>
                    </div>
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
