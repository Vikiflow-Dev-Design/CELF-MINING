"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Users, 
  Award, 
  Star,
  Clock,
  Globe,
  TrendingUp,
  Heart,
  Target,
  MessageCircle,
  Calendar,
  CheckCircle,
  BookOpen
} from "lucide-react";

const mainStats = [
  {
    icon: Users,
    number: "1,200+",
    label: "Active Mentorship Pairs",
    description: "Currently engaged in mentorship relationships",
    growth: "+25% this quarter",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "Average Satisfaction",
    description: "Rating from mentees and mentors",
    growth: "Consistently high",
    color: "from-yellow-500/20 to-yellow-500/5"
  },
  {
    icon: Award,
    number: "85%",
    label: "Goal Achievement Rate",
    description: "Mentees who achieve their primary goals",
    growth: "+8% improvement",
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: Clock,
    number: "< 48hrs",
    label: "Average Match Time",
    description: "Time to find the perfect mentor match",
    growth: "Industry leading",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Globe,
    number: "25+",
    label: "Countries Represented",
    description: "Global diversity in our mentor network",
    growth: "+5 new countries",
    color: "from-green-500/20 to-green-500/5"
  },
  {
    icon: TrendingUp,
    number: "300+",
    label: "Expert Mentors",
    description: "Verified professionals and successful students",
    growth: "+50 new mentors",
    color: "from-red-500/20 to-red-500/5"
  }
];

const programMetrics = [
  {
    category: "Mentorship Outcomes",
    stats: [
      { label: "Successful Program Completion", value: "92%" },
      { label: "Continued Relationship Post-Program", value: "78%" },
      { label: "Mentees Who Become Mentors", value: "65%" },
      { label: "Goal Achievement Within Timeline", value: "85%" }
    ]
  },
  {
    category: "Engagement Metrics",
    stats: [
      { label: "Average Session Duration", value: "52 min" },
      { label: "Weekly Communication Frequency", value: "3.2x" },
      { label: "Resource Sharing Rate", value: "89%" },
      { label: "Follow-up Action Completion", value: "94%" }
    ]
  },
  {
    category: "Impact Areas",
    stats: [
      { label: "Academic Performance Improvement", value: "76%" },
      { label: "Scholarship Applications Success", value: "68%" },
      { label: "Career Clarity Achievement", value: "82%" },
      { label: "Confidence Level Increase", value: "91%" }
    ]
  }
];

const mentorshipTypes = [
  {
    type: "1-on-1 Mentorship",
    pairs: 450,
    satisfaction: 4.9,
    completion: 94,
    icon: Users
  },
  {
    type: "Academic Mentorship",
    pairs: 320,
    satisfaction: 4.8,
    completion: 89,
    icon: BookOpen
  },
  {
    type: "Career Mentorship",
    pairs: 280,
    satisfaction: 4.7,
    completion: 91,
    icon: Target
  },
  {
    type: "Peer Support Groups",
    pairs: 150,
    satisfaction: 4.6,
    completion: 87,
    icon: Heart
  }
];

const timelineStats = [
  {
    period: "Q1 2024",
    newPairs: 156,
    completions: 89,
    satisfaction: 4.8
  },
  {
    period: "Q2 2024",
    newPairs: 203,
    completions: 124,
    satisfaction: 4.9
  },
  {
    period: "Q3 2024",
    newPairs: 267,
    completions: 178,
    satisfaction: 4.9
  },
  {
    period: "Q4 2024",
    newPairs: 298,
    completions: 201,
    satisfaction: 4.9
  }
];

export function MentorshipStatsSection() {
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
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#9EFF00]/20 to-transparent rounded-full blur-3xl"
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
            Mentorship{" "}
            <span className="text-[#9EFF00]">Impact</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our mentorship program delivers measurable results. Here's how we're making 
            a difference in students' lives through data-driven mentorship excellence.
          </p>
        </motion.div>

        {/* Main Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {mainStats.map((stat, index) => (
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

        {/* Program Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            Program Performance Metrics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programMetrics.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-[#9EFF00]/20">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-white mb-6 text-center">
                      {category.category}
                    </h4>
                    <div className="space-y-4">
                      {category.stats.map((stat, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">{stat.label}</span>
                          <span className="text-[#9EFF00] font-bold">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mentorship Types Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            Performance by Mentorship Type
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentorshipTypes.map((type, index) => (
              <motion.div
                key={type.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <type.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    
                    <h4 className="font-semibold text-white mb-4 text-sm">
                      {type.type}
                    </h4>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Active Pairs:</span>
                        <span className="text-[#9EFF00] font-medium">{type.pairs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Satisfaction:</span>
                        <span className="text-[#9EFF00] font-medium">{type.satisfaction}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Completion:</span>
                        <span className="text-[#9EFF00] font-medium">{type.completion}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Growth Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              2024 Growth Timeline
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our mentorship program continues to grow, helping more students achieve 
              their goals with each passing quarter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {timelineStats.map((period, index) => (
              <motion.div
                key={period.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-gray-800/30 border border-gray-700/50"
              >
                <h4 className="text-lg font-bold text-[#9EFF00] mb-4">{period.period}</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold text-white">{period.newPairs}</div>
                    <div className="text-xs text-gray-400">New Pairs</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{period.completions}</div>
                    <div className="text-xs text-gray-400">Completions</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{period.satisfaction}/5</div>
                    <div className="text-xs text-gray-400">Satisfaction</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-[#9EFF00]/20 text-center">
            <h4 className="text-lg font-bold text-white mb-3">
              Continuous Improvement
            </h4>
            <p className="text-gray-300 text-sm max-w-2xl mx-auto">
              We regularly analyze these metrics to enhance our mentorship program, 
              ensuring we provide the best possible experience for both mentors and mentees.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
