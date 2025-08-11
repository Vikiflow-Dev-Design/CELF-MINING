"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Award,
  ArrowRight,
  Clock,
  TrendingUp,
  Star,
  CheckCircle,
  Zap,
  BookOpen,
  HelpCircle
} from "lucide-react";

const communityStats = [
  {
    icon: Users,
    value: "25,000+",
    label: "Active Members",
    description: "Helpful community members"
  },
  {
    icon: MessageCircle,
    value: "1,200+",
    label: "Daily Discussions",
    description: "Questions and answers"
  },
  {
    icon: Clock,
    value: "< 30 min",
    label: "Average Response",
    description: "Community response time"
  },
  {
    icon: CheckCircle,
    value: "95%",
    label: "Resolution Rate",
    description: "Questions answered"
  }
];

const communityFeatures = [
  {
    icon: MessageCircle,
    title: "Discussion Forums",
    description: "Ask questions and share experiences with fellow CELF users",
    features: ["Q&A discussions", "Topic categories", "Expert moderators", "Search functionality"],
    href: "/community/forums",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Users,
    title: "Peer Support",
    description: "Get help from experienced users and mentors in the community",
    features: ["Peer mentoring", "Success stories", "Best practices", "User guides"],
    href: "/community/peer-support",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    icon: BookOpen,
    title: "User Guides",
    description: "Community-created guides and tutorials from real users",
    features: ["Step-by-step guides", "Video tutorials", "Tips & tricks", "User experiences"],
    href: "/community/guides",
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: Award,
    title: "Expert Contributors",
    description: "Learn from top community members and CELF ambassadors",
    features: ["Expert insights", "Advanced strategies", "Exclusive content", "Direct access"],
    href: "/community/experts",
    color: "from-orange-500/20 to-orange-500/5"
  }
];

const recentDiscussions = [
  {
    title: "How to maximize daily mining rewards?",
    author: "CryptoStudent2024",
    category: "Mining Tips",
    replies: 23,
    views: 1240,
    lastActivity: "2 hours ago",
    solved: true,
    trending: true
  },
  {
    title: "Scholarship application deadline approaching - need help!",
    author: "FutureEngineer",
    category: "Scholarships",
    replies: 15,
    views: 890,
    lastActivity: "4 hours ago",
    solved: false,
    trending: false
  },
  {
    title: "App keeps crashing on Android 14",
    author: "TechHelper",
    category: "Technical Issues",
    replies: 8,
    views: 456,
    lastActivity: "6 hours ago",
    solved: true,
    trending: false
  },
  {
    title: "Best practices for account security",
    author: "SecurityExpert",
    category: "Security",
    replies: 31,
    views: 2100,
    lastActivity: "1 day ago",
    solved: false,
    trending: true
  },
  {
    title: "New user - where do I start?",
    author: "NewMiner123",
    category: "Getting Started",
    replies: 12,
    views: 678,
    lastActivity: "1 day ago",
    solved: true,
    trending: false
  }
];

const topContributors = [
  {
    name: "Sarah Chen",
    role: "CELF Ambassador",
    contributions: 245,
    reputation: 4.9,
    specialties: ["Mining", "Scholarships"]
  },
  {
    name: "Alex Rodriguez",
    role: "Community Moderator",
    contributions: 189,
    reputation: 4.8,
    specialties: ["Technical", "App Support"]
  },
  {
    name: "Dr. Emily Johnson",
    role: "Education Expert",
    contributions: 156,
    reputation: 4.9,
    specialties: ["Scholarships", "Academic"]
  }
];

export function CommunityHelpSection() {
  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-radial from-[#9EFF00]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-radial from-blue-500/8 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Community{" "}
            <span className="text-[#9EFF00] drop-shadow-[0_0_30px_rgba(158,255,0,0.3)]">Support</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join our vibrant community of CELF users, mentors, and experts. Get help, 
            share knowledge, and connect with fellow students on their educational journey.
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {communityStats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-[#9EFF00]" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-300 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:border-[#9EFF00]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(158,255,0,0.1)]">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#9EFF00] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="space-y-2 mb-8">
                    {feature.features.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2 text-sm text-gray-400">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild className="w-full group-hover:bg-[#9EFF00] group-hover:text-black transition-colors duration-300">
                    <Link href={feature.href} className="flex items-center justify-center space-x-2">
                      <span>Explore</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Discussions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Recent Discussions</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              See what the community is talking about and join the conversation
            </p>
          </div>

          <Card>
            <CardContent className="p-0">
              {recentDiscussions.map((discussion, index) => (
                <div key={discussion.title} className={`p-6 ${index !== recentDiscussions.length - 1 ? 'border-b border-gray-800' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Link href="#" className="text-lg font-semibold text-white hover:text-[#9EFF00] transition-colors duration-200">
                          {discussion.title}
                        </Link>
                        {discussion.solved && (
                          <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                            Solved
                          </div>
                        )}
                        {discussion.trending && (
                          <div className="bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>Trending</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                        <span>by {discussion.author}</span>
                        <span>in {discussion.category}</span>
                        <span>{discussion.lastActivity}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{discussion.views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href="/community/forums" className="group">
                View All Discussions
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Top Contributors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Top Contributors</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Meet our most helpful community members and experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topContributors.map((contributor, index) => (
              <Card key={contributor.name} className="group hover:border-[#9EFF00]/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-[#9EFF00]" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-2">{contributor.name}</h4>
                  <p className="text-[#9EFF00] font-medium mb-4">{contributor.role}</p>
                  
                  <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-4">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-medium">{contributor.reputation}</span>
                    <span className="text-gray-500 text-sm">({contributor.contributions} contributions)</span>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-2">
                    {contributor.specialties.map((specialty, specialtyIndex) => (
                      <div key={specialtyIndex} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">
                        {specialty}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
