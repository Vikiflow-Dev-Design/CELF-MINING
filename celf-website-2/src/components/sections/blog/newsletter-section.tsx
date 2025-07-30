"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Mail, 
  CheckCircle, 
  Users,
  Calendar,
  BookOpen,
  Award,
  TrendingUp,
  Bell,
  Star,
  Shield,
  Zap
} from "lucide-react";

const newsletterBenefits = [
  {
    icon: BookOpen,
    title: "Latest Articles",
    description: "Get notified when new educational content is published"
  },
  {
    icon: Award,
    title: "Scholarship Alerts",
    description: "Exclusive scholarship opportunities and deadlines"
  },
  {
    icon: TrendingUp,
    title: "Success Tips",
    description: "Weekly tips from successful students and experts"
  },
  {
    icon: Users,
    title: "Community Updates",
    description: "News from the CELF community and member achievements"
  }
];

const newsletterStats = [
  {
    icon: Users,
    number: "25K+",
    label: "Subscribers",
    description: "Students worldwide"
  },
  {
    icon: Calendar,
    number: "Weekly",
    label: "Delivery",
    description: "Every Tuesday"
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "Rating",
    description: "Subscriber satisfaction"
  },
  {
    icon: CheckCircle,
    number: "95%",
    label: "Open Rate",
    description: "Highly engaging content"
  }
];

const recentNewsletters = [
  {
    title: "10 Scholarship Opportunities Closing This Month",
    date: "February 13, 2024",
    highlights: ["$50K+ in available funding", "Application tips included", "Deadline reminders"]
  },
  {
    title: "Study Abroad Success Stories & Tips",
    date: "February 6, 2024",
    highlights: ["3 inspiring journeys", "Budget planning guide", "Cultural preparation tips"]
  },
  {
    title: "CELF Community Achievements Roundup",
    date: "January 30, 2024",
    highlights: ["15 new scholarship winners", "Mining milestones reached", "Community growth updates"]
  }
];

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
    }, 1500);
  };

  return (
    <section id="newsletter" className="py-20 lg:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
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
          <div className="inline-flex items-center space-x-2 bg-gray-900/80 border border-[#9EFF00]/30 rounded-full px-4 py-2 mb-6">
            <Mail className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Newsletter</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Stay{" "}
            <span className="text-[#9EFF00]">Informed</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join 25,000+ students who receive our weekly newsletter packed with educational insights, 
            scholarship opportunities, and success stories delivered directly to their inbox.
          </p>
        </motion.div>

        {/* Newsletter Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {newsletterStats.map((stat, index) => (
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

        {/* Main Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30 max-w-4xl mx-auto">
            <CardContent className="p-8 lg:p-12">
              {!isSubscribed ? (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(158,255,0,0.2)]">
                      <Mail className="h-8 w-8 text-[#9EFF00]" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Subscribe to Our Newsletter
                    </h3>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                      Get the latest educational content, scholarship opportunities, and success stories 
                      delivered to your inbox every Tuesday.
                    </p>
                  </div>

                  <form onSubmit={handleSubscribe} className="max-w-md mx-auto mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-[#9EFF00]/50 focus:outline-none"
                      />
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="px-8 py-3"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Subscribing...</span>
                          </div>
                        ) : (
                          "Subscribe"
                        )}
                      </Button>
                    </div>
                  </form>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 text-sm mb-8">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-[#9EFF00]" />
                      <span>No spam, ever</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-[#9EFF00]" />
                      <span>Unsubscribe anytime</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-[#9EFF00]" />
                      <span>Free forever</span>
                    </div>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(158,255,0,0.2)]">
                    <CheckCircle className="h-8 w-8 text-[#9EFF00]" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Welcome to the CELF Newsletter!
                  </h3>
                  <p className="text-lg text-gray-300 mb-6">
                    Thank you for subscribing! You'll receive your first newsletter next Tuesday 
                    with the latest educational insights and opportunities.
                  </p>
                  <Button 
                    onClick={() => setIsSubscribed(false)}
                    variant="secondary"
                  >
                    Subscribe Another Email
                  </Button>
                </motion.div>
              )}

              {/* Newsletter Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newsletterBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                      <benefit.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Newsletters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Recent Newsletter Issues
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentNewsletters.map((newsletter, index) => (
              <motion.div
                key={newsletter.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Bell className="h-4 w-4 text-[#9EFF00]" />
                      <span className="text-xs text-gray-400">{newsletter.date}</span>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-4 group-hover:text-[#9EFF00] transition-colors duration-300 leading-tight">
                      {newsletter.title}
                    </h4>

                    <div className="space-y-2">
                      <div className="text-sm text-gray-400 mb-2">Highlights:</div>
                      {newsletter.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                          <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm mb-4">
              Want to see more? Check out our newsletter archive with over 50 issues.
            </p>
            <Button variant="secondary">
              View Newsletter Archive
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
