"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Star, 
  Clock, 
  Eye, 
  ArrowRight,
  Award,
  BookOpen,
  Users,
  TrendingUp,
  Calendar,
  MessageCircle
} from "lucide-react";

const featuredPosts = [
  {
    id: 1,
    title: "10 Proven Strategies to Write Winning Scholarship Essays",
    excerpt: "Learn from scholarship recipients who secured over $2.5M in funding. Discover the writing techniques and strategies that made their applications stand out from thousands of competitors.",
    author: "Dr. Sarah Chen",
    authorRole: "Scholarship Advisor",
    publishDate: "2024-02-10",
    readTime: "8 min read",
    views: "12.5K",
    comments: 47,
    category: "Scholarship Tips",
    tags: ["Essays", "Applications", "Writing", "Strategy"],
    image: "/api/placeholder/600/400",
    isFeatured: true,
    slug: "scholarship-essay-strategies",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    id: 2,
    title: "From Mining to Medicine: Maria's Journey to Harvard Medical School",
    excerpt: "Follow Maria Rodriguez's inspiring journey from a small town in Spain to Harvard Medical School, powered by CELF tokens and unwavering determination. A story of perseverance and community support.",
    author: "Maria Rodriguez",
    authorRole: "Medical Student",
    publishDate: "2024-02-08",
    readTime: "6 min read",
    views: "8.7K",
    comments: 89,
    category: "Success Stories",
    tags: ["Success Story", "Medical School", "Harvard", "Inspiration"],
    image: "/api/placeholder/600/400",
    isFeatured: true,
    slug: "maria-harvard-journey",
    color: "from-red-500/20 to-red-500/5"
  },
  {
    id: 3,
    title: "The Ultimate Guide to CELF Token Mining for Beginners",
    excerpt: "Everything you need to know about mining CELF tokens effectively. From setup to optimization, this comprehensive guide covers all the essentials for new users to maximize their mining potential.",
    author: "Tech Team",
    authorRole: "CELF Developers",
    publishDate: "2024-02-05",
    readTime: "12 min read",
    views: "15.2K",
    comments: 156,
    category: "Mining Guide",
    tags: ["Mining", "Tokens", "Tutorial", "Beginners"],
    image: "/api/placeholder/600/400",
    isFeatured: true,
    slug: "token-mining-guide",
    color: "from-blue-500/20 to-blue-500/5"
  }
];

const featuredStats = [
  {
    icon: Eye,
    number: "500K+",
    label: "Total Views",
    description: "Across all featured posts"
  },
  {
    icon: MessageCircle,
    number: "2.5K+",
    label: "Comments",
    description: "Community engagement"
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "Average Rating",
    description: "Reader satisfaction"
  },
  {
    icon: TrendingUp,
    number: "85%",
    label: "Helpful Rate",
    description: "Found content useful"
  }
];

export function FeaturedPostsSection() {
  return (
    <section id="featured-posts" className="py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
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
            <Star className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Featured Posts</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Must-Read{" "}
            <span className="text-[#9EFF00]">Articles</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our most popular and impactful articles, carefully selected to help you 
            succeed in your educational journey and make the most of the CELF platform.
          </p>
        </motion.div>

        {/* Featured Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {featuredStats.map((stat, index) => (
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

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Main Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300 overflow-hidden">
              <div className="relative">
                {/* Featured badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center space-x-2 bg-[#9EFF00] text-black px-3 py-1 rounded-full text-xs font-bold">
                    <Star className="h-3 w-3" />
                    <span>Featured</span>
                  </div>
                </div>
                
                {/* Image placeholder */}
                <div className="h-64 lg:h-80 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-[#9EFF00]/30" />
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium">
                    {featuredPosts[0].category}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(featuredPosts[0].publishDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#9EFF00] transition-colors duration-300 leading-tight">
                  {featuredPosts[0].title}
                </h3>

                <p className="text-gray-300 leading-relaxed mb-6">
                  {featuredPosts[0].excerpt}
                </p>

                {/* Author and meta */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-[#9EFF00]">
                        {featuredPosts[0].author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">{featuredPosts[0].author}</div>
                      <div className="text-xs text-gray-400">{featuredPosts[0].authorRole}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{featuredPosts[0].readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{featuredPosts[0].views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{featuredPosts[0].comments}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredPosts[0].tags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <Button asChild className="w-full">
                  <Link href={`/blog/${featuredPosts[0].slug}`} className="group">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Secondary Featured Posts */}
          <div className="space-y-8">
            {featuredPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-gray-400">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300 leading-tight">
                      {post.title}
                    </h4>

                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Author and meta */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-[#9EFF00]">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-white text-xs">{post.author}</div>
                          <div className="text-xs text-gray-400">{post.authorRole}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-xs text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                    </div>

                    <Button size="sm" variant="secondary" asChild className="w-full">
                      <Link href={`/blog/${post.slug}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Posts CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Explore More Articles
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Discover hundreds of articles covering scholarships, study tips, success stories, 
                and everything you need to succeed in your educational journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/blog/all" className="group">
                    View All Posts
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="#blog-categories">Browse Categories</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
