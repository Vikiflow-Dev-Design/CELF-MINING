"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  MessageCircle, 
  Users, 
  BookOpen, 
  HelpCircle,
  Globe,
  TrendingUp,
  Clock,
  ArrowRight,
  Pin,
  Eye,
  ThumbsUp,
  MessageSquare
} from "lucide-react";

const forumCategories = [
  {
    icon: BookOpen,
    title: "Academic Support",
    description: "Get help with coursework, study strategies, and academic challenges",
    topics: 1247,
    posts: 8934,
    members: 892,
    lastActivity: "2 minutes ago",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5",
    subcategories: ["Study Tips", "Exam Prep", "Research Help", "Writing Support"]
  },
  {
    icon: HelpCircle,
    title: "CELF Support",
    description: "Questions about mining, tokens, scholarships, and app functionality",
    topics: 856,
    posts: 5621,
    members: 1205,
    lastActivity: "5 minutes ago",
    color: "from-blue-500/20 to-blue-500/5",
    subcategories: ["Mining Help", "Token Questions", "App Issues", "Scholarship Info"]
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Connect with students worldwide, share cultures, and make friends",
    topics: 2134,
    posts: 12456,
    members: 1876,
    lastActivity: "1 minute ago",
    color: "from-purple-500/20 to-purple-500/5",
    subcategories: ["Introductions", "Cultural Exchange", "Language Practice", "Travel Stories"]
  },
  {
    icon: TrendingUp,
    title: "Career & Future",
    description: "Discuss career paths, job opportunities, and professional development",
    topics: 743,
    posts: 4892,
    members: 654,
    lastActivity: "8 minutes ago",
    color: "from-green-500/20 to-green-500/5",
    subcategories: ["Career Advice", "Job Search", "Internships", "Networking"]
  }
];

const recentTopics = [
  {
    title: "Tips for writing compelling scholarship essays",
    author: "Sarah M.",
    category: "Academic Support",
    replies: 23,
    views: 156,
    lastReply: "15 minutes ago",
    isPinned: true,
    hasNewReplies: true
  },
  {
    title: "Mining session not starting - need help!",
    author: "Alex K.",
    category: "CELF Support",
    replies: 8,
    views: 45,
    lastReply: "32 minutes ago",
    isPinned: false,
    hasNewReplies: true
  },
  {
    title: "Study group for Computer Science students",
    author: "Maria R.",
    category: "Academic Support",
    replies: 34,
    views: 289,
    lastReply: "1 hour ago",
    isPinned: false,
    hasNewReplies: false
  },
  {
    title: "Celebrating my scholarship success! 🎉",
    author: "James C.",
    category: "Global Community",
    replies: 67,
    views: 423,
    lastReply: "2 hours ago",
    isPinned: false,
    hasNewReplies: false
  },
  {
    title: "Internship opportunities in tech - sharing resources",
    author: "Priya S.",
    category: "Career & Future",
    replies: 19,
    views: 134,
    lastReply: "3 hours ago",
    isPinned: false,
    hasNewReplies: true
  }
];

const forumStats = [
  {
    icon: MessageCircle,
    number: "32K+",
    label: "Total Posts",
    description: "Across all forum categories"
  },
  {
    icon: Users,
    number: "2,500+",
    label: "Active Members",
    description: "Participating in discussions"
  },
  {
    icon: Clock,
    number: "< 15min",
    label: "Avg Response",
    description: "Time to get help"
  },
  {
    icon: TrendingUp,
    number: "24/7",
    label: "Activity",
    description: "Always someone online"
  }
];

export function CommunityForumsSection() {
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Community{" "}
            <span className="text-[#9EFF00]">Forums</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students in our active forums. Get help, share knowledge, 
            and connect with peers from around the world in topic-specific discussions.
          </p>
        </motion.div>

        {/* Forum Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {forumStats.map((stat, index) => (
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

        {/* Forum Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {forumCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                      <category.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="mb-2 group-hover:text-[#9EFF00] transition-colors duration-300">
                        {category.title}
                      </CardTitle>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Category Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00]">{category.topics}</div>
                      <div className="text-xs text-gray-400">Topics</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00]">{category.posts}</div>
                      <div className="text-xs text-gray-400">Posts</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00]">{category.members}</div>
                      <div className="text-xs text-gray-400">Members</div>
                    </div>
                  </div>

                  {/* Subcategories */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">Popular Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub, idx) => (
                        <span key={idx} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded-full">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Last Activity */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>Last activity: {category.lastActivity}</span>
                    </div>
                    <Button size="sm" variant="secondary">
                      Browse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Topics and Forum Access */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Recent Topics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Recent Discussions
            </h3>

            <div className="space-y-4">
              {recentTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {topic.isPinned && (
                              <Pin className="h-4 w-4 text-[#9EFF00]" />
                            )}
                            <h4 className="font-semibold text-white group-hover:text-[#9EFF00] transition-colors duration-300 line-clamp-1">
                              {topic.title}
                            </h4>
                            {topic.hasNewReplies && (
                              <div className="w-2 h-2 bg-[#9EFF00] rounded-full"></div>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-400 mb-2">
                            <span>by {topic.author}</span>
                            <span>in {topic.category}</span>
                          </div>

                          <div className="flex items-center space-x-4 text-xs text-gray-400">
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{topic.replies} replies</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{topic.views} views</span>
                            </div>
                            <span>Last: {topic.lastReply}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="secondary" asChild>
                <Link href="/forums">View All Topics</Link>
              </Button>
            </div>
          </motion.div>

          {/* Forum Access */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Join the Discussion
                </h3>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5 text-[#9EFF00]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Ask Questions</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Get help from experienced students and community moderators on any topic.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-[#9EFF00]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Share Knowledge</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Help fellow students by sharing your experiences and expertise.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="h-5 w-5 text-[#9EFF00]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Connect Globally</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Build friendships and professional networks with students worldwide.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#9EFF00]/20 pt-6">
                  <h4 className="text-lg font-bold text-white mb-4 text-center">
                    Forum Guidelines
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300 mb-6">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#9EFF00] rounded-full"></div>
                      <span>Be respectful and supportive</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#9EFF00] rounded-full"></div>
                      <span>Search before posting new topics</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#9EFF00] rounded-full"></div>
                      <span>Use clear, descriptive titles</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#9EFF00] rounded-full"></div>
                      <span>Stay on topic in discussions</span>
                    </li>
                  </ul>

                  <Button asChild className="w-full">
                    <Link href="/forums/join" className="group">
                      Access Forums
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
