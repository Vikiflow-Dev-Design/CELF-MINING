"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  BookOpen, 
  Users, 
  Eye, 
  MessageCircle,
  Calendar,
  TrendingUp,
  Award,
  Globe,
  Clock,
  Star,
  Heart,
  Share
} from "lucide-react";

const blogStats = [
  {
    icon: BookOpen,
    number: "150+",
    label: "Articles Published",
    description: "Comprehensive educational content",
    growth: "+12 this month",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    icon: Users,
    number: "25K+",
    label: "Monthly Readers",
    description: "Students accessing our content",
    growth: "+18% growth",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Eye,
    number: "500K+",
    label: "Total Views",
    description: "Across all articles and categories",
    growth: "+25% this quarter",
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: MessageCircle,
    number: "2.5K+",
    label: "Comments",
    description: "Community engagement and discussions",
    growth: "+30% engagement",
    color: "from-green-500/20 to-green-500/5"
  },
  {
    icon: Calendar,
    number: "3x",
    label: "Weekly Posts",
    description: "Fresh content published regularly",
    growth: "Consistent schedule",
    color: "from-yellow-500/20 to-yellow-500/5"
  },
  {
    icon: Star,
    number: "4.8/5",
    label: "Average Rating",
    description: "Reader satisfaction score",
    growth: "Highly rated content",
    color: "from-red-500/20 to-red-500/5"
  }
];

const contentMetrics = [
  {
    icon: TrendingUp,
    title: "Most Popular Category",
    value: "Scholarship Tips",
    description: "45 articles • 125K views"
  },
  {
    icon: Clock,
    title: "Average Read Time",
    value: "7 minutes",
    description: "Optimal content length"
  },
  {
    icon: Share,
    title: "Most Shared Article",
    value: "Scholarship Essay Guide",
    description: "2.3K shares across platforms"
  },
  {
    icon: Heart,
    title: "Reader Retention",
    value: "78%",
    description: "Return to read more articles"
  }
];

const authorStats = [
  {
    name: "Dr. Sarah Chen",
    role: "Scholarship Advisor",
    articles: 23,
    totalViews: "89K",
    avgRating: 4.9
  },
  {
    name: "Marcus Johnson",
    role: "Academic Coach",
    articles: 18,
    totalViews: "67K",
    avgRating: 4.8
  },
  {
    name: "Elena Rodriguez",
    role: "Study Abroad Advisor",
    articles: 15,
    totalViews: "54K",
    avgRating: 4.9
  },
  {
    name: "Tech Team",
    role: "CELF Developers",
    articles: 12,
    totalViews: "78K",
    avgRating: 4.7
  }
];

export function BlogStatsSection() {
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
            duration: 15,
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Blog{" "}
            <span className="text-[#9EFF00]">Impact</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See how our educational content is making a difference in students' lives 
            around the world through comprehensive analytics and community engagement.
          </p>
        </motion.div>

        {/* Main Blog Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {blogStats.map((stat, index) => (
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

        {/* Content Metrics and Top Authors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Content Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Content Insights
            </h3>

            <div className="space-y-6">
              {contentMetrics.map((metric, index) => (
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
                      <span className="text-xl font-bold text-[#9EFF00]">{metric.value}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{metric.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Top Authors */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Top Contributors
                </h3>

                <div className="space-y-6">
                  {authorStats.map((author, index) => (
                    <motion.div
                      key={author.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-[#9EFF00]">
                          {author.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{author.name}</h4>
                        <div className="text-sm text-gray-400">{author.role}</div>
                        <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
                          <span>{author.articles} articles</span>
                          <span>{author.totalViews} views</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span>{author.avgRating}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#9EFF00]/20 text-center">
                  <h4 className="text-lg font-bold text-white mb-3">
                    Expert Contributors
                  </h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Our content is created by education professionals, successful students, 
                    and industry experts committed to helping you succeed.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00] mb-1">15+</div>
                      <div className="text-white text-sm font-medium">Expert Authors</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00] mb-1">95%</div>
                      <div className="text-white text-sm font-medium">Accuracy Rate</div>
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
