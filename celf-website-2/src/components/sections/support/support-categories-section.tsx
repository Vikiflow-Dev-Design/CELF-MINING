"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Smartphone, 
  Zap, 
  GraduationCap, 
  Users, 
  CreditCard, 
  Shield,
  Settings,
  BookOpen,
  ArrowRight,
  HelpCircle
} from "lucide-react";

const supportCategories = [
  {
    icon: Smartphone,
    title: "App & Download",
    description: "Installation, updates, and mobile app troubleshooting",
    topics: ["App installation", "Login issues", "Update problems", "Performance"],
    articleCount: 24,
    href: "/support/app-download",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Zap,
    title: "Mining & Tokens",
    description: "Token mining, rewards, and blockchain operations",
    topics: ["Mining process", "Token rewards", "Mining sessions", "Blockchain sync"],
    articleCount: 18,
    href: "/support/mining-tokens",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    icon: GraduationCap,
    title: "Scholarships",
    description: "Applications, eligibility, and scholarship programs",
    topics: ["Application process", "Eligibility criteria", "Award notifications", "Requirements"],
    articleCount: 15,
    href: "/support/scholarships",
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: Users,
    title: "Account & Profile",
    description: "Account management, profile settings, and security",
    topics: ["Account creation", "Profile updates", "Password reset", "Verification"],
    articleCount: 21,
    href: "/support/account-profile",
    color: "from-orange-500/20 to-orange-500/5"
  },
  {
    icon: CreditCard,
    title: "Payments & Rewards",
    description: "Payment methods, withdrawals, and reward redemption",
    topics: ["Payment setup", "Withdrawal process", "Reward redemption", "Transaction history"],
    articleCount: 12,
    href: "/support/payments-rewards",
    color: "from-green-500/20 to-green-500/5"
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Account security, privacy settings, and data protection",
    topics: ["Two-factor auth", "Privacy settings", "Data security", "Suspicious activity"],
    articleCount: 16,
    href: "/support/security-privacy",
    color: "from-red-500/20 to-red-500/5"
  },
  {
    icon: Settings,
    title: "Technical Issues",
    description: "Bug reports, performance issues, and troubleshooting",
    topics: ["Bug reporting", "Performance issues", "Error messages", "System requirements"],
    articleCount: 19,
    href: "/support/technical-issues",
    color: "from-gray-500/20 to-gray-500/5"
  },
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "New user guides, tutorials, and basic setup",
    topics: ["First steps", "Account setup", "Basic tutorials", "Quick start guide"],
    articleCount: 8,
    href: "/support/getting-started",
    color: "from-cyan-500/20 to-cyan-500/5"
  }
];

export function SupportCategoriesSection() {
  return (
    <section id="support-categories" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#9EFF00]/5 to-transparent rounded-full blur-3xl" />
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
            Browse by{" "}
            <span className="text-[#9EFF00] drop-shadow-[0_0_30px_rgba(158,255,0,0.3)]">Category</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find answers quickly by exploring our organized help topics. Each category contains 
            detailed guides, tutorials, and solutions to common questions.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={category.href}>
                <Card className="h-full group hover:border-[#9EFF00]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(158,255,0,0.1)] cursor-pointer">
                  <CardContent className="p-6">
                    {/* Icon and Article Count */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[#9EFF00] font-medium">{category.articleCount} articles</div>
                      </div>
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>

                    {/* Topics */}
                    <div className="space-y-2 mb-4">
                      {category.topics.slice(0, 3).map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-1 h-1 bg-[#9EFF00] rounded-full" />
                          <span>{topic}</span>
                        </div>
                      ))}
                      {category.topics.length > 3 && (
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-1 h-1 bg-[#9EFF00] rounded-full" />
                          <span>+{category.topics.length - 3} more topics</span>
                        </div>
                      )}
                    </div>

                    {/* View All Link */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400 group-hover:text-[#9EFF00] transition-colors duration-300">
                        View all articles
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#9EFF00] group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
            <HelpCircle className="h-12 w-12 text-[#9EFF00] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our support team is always ready to help. Contact us directly or browse our 
              comprehensive knowledge base for more detailed information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#contact-support">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-[#9EFF00] text-black font-semibold rounded-lg hover:bg-[#8FEF00] transition-colors duration-200"
                >
                  Contact Support
                </motion.button>
              </Link>
              <Link href="#knowledge-base">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Browse Knowledge Base
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
