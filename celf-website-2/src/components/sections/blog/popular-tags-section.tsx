"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Tag, 
  TrendingUp, 
  Search,
  ArrowRight,
  Hash,
  Eye,
  BookOpen
} from "lucide-react";

const popularTags = [
  { name: "Scholarship Essays", count: 28, views: "45K", trending: true },
  { name: "Study Tips", count: 24, views: "38K", trending: true },
  { name: "Token Mining", count: 22, views: "52K", trending: false },
  { name: "Application Strategy", count: 19, views: "31K", trending: true },
  { name: "Success Stories", count: 18, views: "67K", trending: false },
  { name: "Time Management", count: 16, views: "29K", trending: false },
  { name: "Career Advice", count: 15, views: "24K", trending: false },
  { name: "Interview Tips", count: 14, views: "22K", trending: true },
  { name: "Study Abroad", count: 13, views: "35K", trending: false },
  { name: "Financial Aid", count: 12, views: "28K", trending: false },
  { name: "STEM Education", count: 11, views: "19K", trending: false },
  { name: "Graduate School", count: 10, views: "26K", trending: false },
  { name: "Research Skills", count: 9, views: "17K", trending: false },
  { name: "Networking", count: 8, views: "15K", trending: false },
  { name: "Online Learning", count: 7, views: "13K", trending: false }
];

const trendingTopics = [
  {
    tag: "AI in Education",
    growth: "+150%",
    description: "How artificial intelligence is transforming learning",
    articles: 5
  },
  {
    tag: "Remote Learning",
    growth: "+89%",
    description: "Best practices for online education success",
    articles: 8
  },
  {
    tag: "Mental Health",
    growth: "+76%",
    description: "Student wellness and academic balance",
    articles: 6
  },
  {
    tag: "Sustainability",
    growth: "+65%",
    description: "Green education and environmental careers",
    articles: 4
  }
];

const tagCategories = [
  {
    category: "Academic",
    tags: ["Study Tips", "Research Skills", "Time Management", "Online Learning"],
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    category: "Scholarships",
    tags: ["Scholarship Essays", "Application Strategy", "Financial Aid", "Interview Tips"],
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    category: "Career",
    tags: ["Career Advice", "Networking", "Graduate School", "STEM Education"],
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    category: "Global",
    tags: ["Study Abroad", "Cultural Exchange", "International Programs", "Language Learning"],
    color: "from-green-500/20 to-green-500/5"
  }
];

export function PopularTagsSection() {
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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#9EFF00]/15 to-transparent rounded-full blur-3xl"
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
            <Tag className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Popular Tags</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Explore by{" "}
            <span className="text-[#9EFF00]">Topics</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover articles by topic and find exactly what you're looking for. 
            Our tag system helps you navigate our extensive library of educational content.
          </p>
        </motion.div>

        {/* Popular Tags Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Most Popular Tags
          </h3>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {popularTags.map((tag, index) => (
              <motion.div
                key={tag.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/tag/${tag.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className={`group cursor-pointer px-4 py-2 rounded-full border transition-colors duration-300 ${
                    tag.trending 
                      ? 'border-[#9EFF00]/40 bg-[#9EFF00]/10 hover:bg-[#9EFF00]/20' 
                      : 'border-gray-700/50 bg-gray-800/30 hover:border-[#9EFF00]/30 hover:bg-gray-800/50'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {tag.trending && (
                        <TrendingUp className="h-3 w-3 text-[#9EFF00]" />
                      )}
                      <span className={`text-sm font-medium ${
                        tag.trending ? 'text-[#9EFF00]' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {tag.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({tag.count})
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="secondary" asChild>
              <Link href="/blog/tags">View All Tags</Link>
            </Button>
          </div>
        </motion.div>

        {/* Trending Topics and Tag Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Trending Topics
            </h3>

            <div className="space-y-6">
              {trendingTopics.map((topic, index) => (
                <motion.div
                  key={topic.tag}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center">
                            <Hash className="h-5 w-5 text-[#9EFF00]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white group-hover:text-[#9EFF00] transition-colors duration-300">
                              {topic.tag}
                            </h4>
                            <div className="text-sm text-gray-400">{topic.articles} articles</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-[#9EFF00]">{topic.growth}</div>
                          <div className="text-xs text-gray-400">growth</div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {topic.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tag Categories */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Browse by Category
                </h3>

                <div className="space-y-6">
                  {tagCategories.map((category, index) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-300"
                    >
                      <h4 className="font-semibold text-white mb-3">{category.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.tags.map((tag, idx) => (
                          <Link key={idx} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                            <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded hover:bg-[#9EFF00]/20 hover:text-[#9EFF00] transition-colors duration-200 cursor-pointer">
                              {tag}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#9EFF00]/20">
                  <h4 className="text-lg font-bold text-white mb-4 text-center">
                    Search by Tag
                  </h4>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search tags..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-[#9EFF00]/50 focus:outline-none"
                      />
                    </div>
                    <Button size="sm">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button variant="secondary" asChild className="w-full">
                      <Link href="/blog/search" className="group">
                        Advanced Search
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
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
