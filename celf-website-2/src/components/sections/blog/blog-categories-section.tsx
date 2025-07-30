"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  Award, 
  BookOpen, 
  Users, 
  TrendingUp,
  Lightbulb,
  Globe,
  ArrowRight,
  FileText,
  Calendar,
  Eye
} from "lucide-react";

const blogCategories = [
  {
    icon: Award,
    title: "Scholarship Tips",
    description: "Expert advice on finding, applying for, and winning scholarships to fund your education.",
    postCount: 45,
    totalViews: "125K",
    latestPost: "10 Proven Strategies to Write Winning Scholarship Essays",
    lastUpdated: "2 days ago",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5",
    slug: "scholarship-tips",
    topics: ["Essay Writing", "Application Strategy", "Interview Tips", "Deadlines"]
  },
  {
    icon: BookOpen,
    title: "Study Guides",
    description: "Comprehensive study resources, techniques, and academic strategies for student success.",
    postCount: 38,
    totalViews: "98K",
    latestPost: "The Science of Effective Note-Taking: 5 Methods That Work",
    lastUpdated: "4 days ago",
    color: "from-blue-500/20 to-blue-500/5",
    slug: "study-guides",
    topics: ["Study Techniques", "Time Management", "Exam Prep", "Research Skills"]
  },
  {
    icon: Users,
    title: "Success Stories",
    description: "Inspiring journeys of students who achieved their educational dreams through CELF.",
    postCount: 32,
    totalViews: "156K",
    latestPost: "From Mining to Medicine: Maria's Journey to Harvard Medical School",
    lastUpdated: "1 week ago",
    color: "from-purple-500/20 to-purple-500/5",
    slug: "success-stories",
    topics: ["Student Journeys", "Achievements", "Inspiration", "Testimonials"]
  },
  {
    icon: TrendingUp,
    title: "Mining Guide",
    description: "Everything you need to know about CELF token mining, optimization, and best practices.",
    postCount: 28,
    totalViews: "89K",
    latestPost: "The Ultimate Guide to CELF Token Mining for Beginners",
    lastUpdated: "3 days ago",
    color: "from-green-500/20 to-green-500/5",
    slug: "mining-guide",
    topics: ["Token Mining", "Optimization", "Troubleshooting", "Updates"]
  },
  {
    icon: Lightbulb,
    title: "Career Advice",
    description: "Professional development tips, career guidance, and industry insights for students.",
    postCount: 24,
    totalViews: "67K",
    latestPost: "Building Your Professional Network as a Student",
    lastUpdated: "5 days ago",
    color: "from-yellow-500/20 to-yellow-500/5",
    slug: "career-advice",
    topics: ["Career Planning", "Networking", "Skills Development", "Industry Trends"]
  },
  {
    icon: Globe,
    title: "Global Education",
    description: "International education opportunities, study abroad programs, and cultural insights.",
    postCount: 19,
    totalViews: "54K",
    latestPost: "Top 10 Countries for International Students in 2024",
    lastUpdated: "1 week ago",
    color: "from-red-500/20 to-red-500/5",
    slug: "global-education",
    topics: ["Study Abroad", "International Programs", "Cultural Exchange", "Visa Guidance"]
  }
];

const categoryStats = [
  {
    icon: FileText,
    number: "150+",
    label: "Total Articles",
    description: "Across all categories"
  },
  {
    icon: Eye,
    number: "500K+",
    label: "Total Views",
    description: "Monthly readership"
  },
  {
    icon: Calendar,
    number: "3x",
    label: "Weekly Posts",
    description: "Fresh content regularly"
  },
  {
    icon: Users,
    number: "25K+",
    label: "Subscribers",
    description: "Newsletter readers"
  }
];

export function BlogCategoriesSection() {
  return (
    <section id="blog-categories" className="py-20 lg:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
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
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#9EFF00]/20 to-transparent rounded-full blur-3xl"
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
            <span className="text-[#9EFF00]">Categories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive collection of articles organized by topic. 
            Find exactly what you need to succeed in your educational journey.
          </p>
        </motion.div>

        {/* Category Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {categoryStats.map((stat, index) => (
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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogCategories.map((category, index) => (
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
                  <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00]">{category.postCount}</div>
                      <div className="text-xs text-gray-400">Articles</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00]">{category.totalViews}</div>
                      <div className="text-xs text-gray-400">Views</div>
                    </div>
                  </div>

                  {/* Latest Post */}
                  <div className="mb-4 p-3 bg-gray-800/30 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Latest Post:</div>
                    <h4 className="text-sm font-medium text-white leading-tight mb-2 line-clamp-2">
                      {category.latestPost}
                    </h4>
                    <div className="text-xs text-gray-400">Updated {category.lastUpdated}</div>
                  </div>

                  {/* Topics */}
                  <div className="mb-6">
                    <div className="text-xs text-gray-400 mb-2">Popular Topics:</div>
                    <div className="flex flex-wrap gap-1">
                      {category.topics.map((topic, idx) => (
                        <span key={idx} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full" size="sm">
                    <Link href={`/blog/category/${category.slug}`} className="group">
                      Explore Category
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Find What You're Looking For
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Use our category system to quickly find articles that match your interests and needs. 
              Each category is regularly updated with fresh, relevant content.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {blogCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/category/${category.slug}`} className="block group">
                  <div className="text-center p-4 rounded-xl border border-gray-700/50 hover:border-[#9EFF00]/30 hover:bg-gray-800/30 transition-colors duration-200">
                    <category.icon className="h-6 w-6 mx-auto mb-2 text-gray-400 group-hover:text-[#9EFF00] transition-colors duration-200" />
                    <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                      {category.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {category.postCount} posts
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-[#9EFF00]/20 pt-8 text-center">
            <h4 className="text-lg font-bold text-white mb-3">
              Can't Find What You Need?
            </h4>
            <p className="text-gray-300 text-sm mb-6">
              Suggest a topic or request specific content. We're always looking to create 
              articles that help our community succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/blog/search">Search Articles</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/contact">Suggest Topic</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
