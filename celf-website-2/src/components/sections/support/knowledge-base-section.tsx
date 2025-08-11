"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Download,
  ArrowRight,
  Clock,
  Eye,
  Star,
  Zap,
  Smartphone,
  GraduationCap,
  Users,
  CreditCard,
  Shield
} from "lucide-react";

const knowledgeBaseCategories = [
  {
    icon: Zap,
    title: "Getting Started Guide",
    description: "Complete beginner's guide to CELF",
    articles: 12,
    readTime: "15 min",
    views: "25.4K",
    rating: 4.9,
    href: "/support/getting-started",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5",
    featured: true
  },
  {
    icon: Smartphone,
    title: "Mobile App Guide",
    description: "Everything about the CELF mobile app",
    articles: 18,
    readTime: "25 min",
    views: "18.2K",
    rating: 4.8,
    href: "/support/mobile-app",
    color: "from-blue-500/20 to-blue-500/5",
    featured: true
  },
  {
    icon: Zap,
    title: "Mining & Tokens",
    description: "Token mining, rewards, and blockchain",
    articles: 24,
    readTime: "35 min",
    views: "32.1K",
    rating: 4.9,
    href: "/support/mining-tokens",
    color: "from-yellow-500/20 to-yellow-500/5",
    featured: true
  },
  {
    icon: GraduationCap,
    title: "Scholarship Program",
    description: "Applications, eligibility, and awards",
    articles: 15,
    readTime: "20 min",
    views: "21.7K",
    rating: 4.7,
    href: "/support/scholarships",
    color: "from-purple-500/20 to-purple-500/5",
    featured: false
  },
  {
    icon: Users,
    title: "Account Management",
    description: "Profile, settings, and security",
    articles: 21,
    readTime: "30 min",
    views: "16.8K",
    rating: 4.6,
    href: "/support/account",
    color: "from-orange-500/20 to-orange-500/5",
    featured: false
  },
  {
    icon: CreditCard,
    title: "Payments & Rewards",
    description: "Transactions, withdrawals, and rewards",
    articles: 12,
    readTime: "18 min",
    views: "14.3K",
    rating: 4.5,
    href: "/support/payments",
    color: "from-green-500/20 to-green-500/5",
    featured: false
  }
];

const popularArticles = [
  {
    title: "How to Start Mining CELF Tokens",
    category: "Getting Started",
    readTime: "5 min",
    views: "12.4K",
    rating: 4.9,
    href: "/support/articles/start-mining"
  },
  {
    title: "Troubleshooting App Installation Issues",
    category: "Mobile App",
    readTime: "8 min",
    views: "9.8K",
    rating: 4.8,
    href: "/support/articles/app-installation"
  },
  {
    title: "Understanding Scholarship Requirements",
    category: "Scholarships",
    readTime: "12 min",
    views: "8.7K",
    rating: 4.7,
    href: "/support/articles/scholarship-requirements"
  },
  {
    title: "Setting Up Two-Factor Authentication",
    category: "Security",
    readTime: "6 min",
    views: "7.2K",
    rating: 4.9,
    href: "/support/articles/two-factor-auth"
  },
  {
    title: "How to Increase Your Mining Rate",
    category: "Mining",
    readTime: "10 min",
    views: "15.6K",
    rating: 4.8,
    href: "/support/articles/increase-mining-rate"
  }
];

const resourceTypes = [
  {
    icon: FileText,
    title: "Articles & Guides",
    count: "120+",
    description: "Detailed written guides and tutorials"
  },
  {
    icon: Video,
    title: "Video Tutorials",
    count: "45+",
    description: "Step-by-step video walkthroughs"
  },
  {
    icon: Download,
    title: "Downloads",
    count: "25+",
    description: "Apps, tools, and resources"
  },
  {
    icon: BookOpen,
    title: "Documentation",
    count: "80+",
    description: "Technical docs and API references"
  }
];

export function KnowledgeBaseSection() {
  return (
    <section id="knowledge-base" className="py-24 bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#9EFF00]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-purple-500/8 to-transparent rounded-full blur-3xl" />
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
            Knowledge{" "}
            <span className="text-[#9EFF00] drop-shadow-[0_0_30px_rgba(158,255,0,0.3)]">Base</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive guides, tutorials, and documentation to help you master 
            CELF and maximize your success.
          </p>
        </motion.div>

        {/* Resource Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {resourceTypes.map((type, index) => (
            <div key={type.title} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <type.icon className="h-8 w-8 text-[#9EFF00]" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{type.count}</div>
              <div className="text-lg font-semibold text-gray-300 mb-1">{type.title}</div>
              <div className="text-sm text-gray-500">{type.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Knowledge Base Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {knowledgeBaseCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={category.href}>
                <Card className="h-full group hover:border-[#9EFF00]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(158,255,0,0.1)] cursor-pointer relative">
                  {category.featured && (
                    <div className="absolute -top-2 -right-2 bg-[#9EFF00] text-black px-3 py-1 rounded-full text-xs font-bold z-10">
                      Popular
                    </div>
                  )}
                  <CardContent className="p-6">
                    {/* Icon and Stats */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-yellow-400 mb-1">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs font-medium">{category.rating}</span>
                        </div>
                        <div className="text-xs text-gray-500">{category.views} views</div>
                      </div>
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <FileText className="h-3 w-3" />
                        <span>{category.articles} articles</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{category.readTime} read</span>
                      </div>
                    </div>

                    {/* View All Link */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400 group-hover:text-[#9EFF00] transition-colors duration-300">
                        Explore guides
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#9EFF00] group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Popular Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Most Popular Articles</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The most helpful and frequently accessed articles from our knowledge base
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {popularArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={article.href}>
                  <Card className="h-full group hover:border-[#9EFF00]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(158,255,0,0.1)] cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="bg-[#9EFF00]/10 text-[#9EFF00] px-2 py-1 rounded text-xs font-medium">
                          {article.category}
                        </div>
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs">{article.rating}</span>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-bold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h4>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.views}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/support/knowledge-base" className="group">
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
