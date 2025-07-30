"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Clock, 
  Eye, 
  MessageCircle,
  Calendar,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  Lightbulb,
  Globe
} from "lucide-react";

const recentPosts = [
  {
    id: 1,
    title: "5 Common Scholarship Application Mistakes to Avoid",
    excerpt: "Learn from the most frequent errors that cost students scholarship opportunities and how to avoid them in your applications.",
    author: "Dr. Emily Watson",
    authorRole: "Education Consultant",
    publishDate: "2024-02-12",
    readTime: "6 min read",
    views: "3.2K",
    comments: 18,
    category: "Scholarship Tips",
    categoryIcon: Award,
    slug: "scholarship-application-mistakes",
    isNew: true
  },
  {
    id: 2,
    title: "How to Build a Study Schedule That Actually Works",
    excerpt: "Discover proven time management techniques that help students balance academics, work, and personal life effectively.",
    author: "Marcus Johnson",
    authorRole: "Academic Coach",
    publishDate: "2024-02-11",
    readTime: "8 min read",
    views: "2.8K",
    comments: 24,
    category: "Study Guides",
    categoryIcon: BookOpen,
    slug: "effective-study-schedule",
    isNew: true
  },
  {
    id: 3,
    title: "James's Journey: From Community College to MIT",
    excerpt: "Follow James Chen's inspiring path from community college to one of the world's top engineering programs through determination and CELF support.",
    author: "James Chen",
    authorRole: "MIT Student",
    publishDate: "2024-02-10",
    readTime: "7 min read",
    views: "4.1K",
    comments: 56,
    category: "Success Stories",
    categoryIcon: Users,
    slug: "james-mit-journey",
    isNew: false
  },
  {
    id: 4,
    title: "Maximizing Your Mining Efficiency: Advanced Tips",
    excerpt: "Take your CELF token mining to the next level with these advanced optimization strategies and best practices.",
    author: "Tech Team",
    authorRole: "CELF Developers",
    publishDate: "2024-02-09",
    readTime: "10 min read",
    views: "5.7K",
    comments: 89,
    category: "Mining Guide",
    categoryIcon: TrendingUp,
    slug: "advanced-mining-tips",
    isNew: false
  },
  {
    id: 5,
    title: "Networking 101: Building Professional Relationships as a Student",
    excerpt: "Essential networking strategies for students to build meaningful professional relationships that last beyond graduation.",
    author: "Sarah Martinez",
    authorRole: "Career Counselor",
    publishDate: "2024-02-08",
    readTime: "9 min read",
    views: "2.1K",
    comments: 31,
    category: "Career Advice",
    categoryIcon: Lightbulb,
    slug: "student-networking-guide",
    isNew: false
  },
  {
    id: 6,
    title: "Study Abroad on a Budget: Complete Guide for 2024",
    excerpt: "Comprehensive guide to studying abroad affordably, including scholarships, grants, and cost-saving strategies for international students.",
    author: "Elena Rodriguez",
    authorRole: "Study Abroad Advisor",
    publishDate: "2024-02-07",
    readTime: "12 min read",
    views: "6.3K",
    comments: 72,
    category: "Global Education",
    categoryIcon: Globe,
    slug: "budget-study-abroad-guide",
    isNew: false
  }
];

export function RecentPostsSection() {
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
            duration: 18,
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Recent{" "}
            <span className="text-[#9EFF00]">Posts</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stay up-to-date with our latest articles covering scholarships, study tips, 
            success stories, and everything you need for educational success.
          </p>
        </motion.div>

        {/* Recent Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  {/* Category and New Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-lg flex items-center justify-center">
                        <post.categoryIcon className="h-3 w-3 text-[#9EFF00]" />
                      </div>
                      <span className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    {post.isNew && (
                      <span className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium">
                        New
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-[#9EFF00]">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">{post.author}</div>
                      <div className="text-xs text-gray-400">{post.authorRole}</div>
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Button size="sm" variant="secondary" asChild className="w-full">
                    <Link href={`/blog/${post.slug}`} className="group">
                      Read Article
                      <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More and Subscription CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Load More Posts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  More Articles Available
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Explore our complete archive of educational content with over 150 articles 
                  covering every aspect of student success and scholarship opportunities.
                </p>
                <div className="space-y-4">
                  <Button asChild className="w-full">
                    <Link href="/blog/all" className="group">
                      View All Posts
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="secondary" asChild className="w-full">
                    <Link href="/blog/search">Search Articles</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Newsletter Subscription */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Never Miss an Update
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Subscribe to our newsletter and get the latest articles, scholarship opportunities, 
                  and educational insights delivered directly to your inbox.
                </p>
                <div className="space-y-4">
                  <Button asChild className="w-full">
                    <Link href="#newsletter" className="group">
                      Subscribe Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <div className="text-xs text-gray-400">
                    Join 25,000+ students • No spam • Unsubscribe anytime
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
