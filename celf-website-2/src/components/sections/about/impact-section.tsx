"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Award, 
  DollarSign,
  GraduationCap,
  Heart,
  ArrowRight,
  BookOpen,
  Target,
  Zap,
  Star
} from "lucide-react";

const impactMetrics = [
  {
    icon: DollarSign,
    number: "$2.5M+",
    label: "Total Scholarships",
    description: "Distributed to students worldwide",
    growth: "+45% this year"
  },
  {
    icon: Users,
    number: "2,500+",
    label: "Students Supported",
    description: "Active community members globally",
    growth: "+60% this year"
  },
  {
    icon: Globe,
    number: "25+",
    label: "Countries Reached",
    description: "Global presence and impact",
    growth: "+8 new countries"
  },
  {
    icon: Award,
    number: "150+",
    label: "Scholarships Awarded",
    description: "Lives transformed through education",
    growth: "+50 this year"
  },
  {
    icon: GraduationCap,
    number: "95%",
    label: "Success Rate",
    description: "Students completing their education",
    growth: "Consistent excellence"
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "Community Rating",
    description: "Student satisfaction score",
    growth: "Highest rated program"
  }
];

const impactStories = [
  {
    category: "Educational Access",
    title: "Breaking Down Barriers",
    description: "We've eliminated geographical and economic barriers that traditionally prevented talented students from accessing quality education.",
    achievements: ["No location restrictions", "Merit-based selection", "Fair token distribution", "Global accessibility"],
    icon: Globe
  },
  {
    category: "Technology Innovation",
    title: "Pioneering Blockchain Education",
    description: "First foundation to successfully implement blockchain technology for transparent and fair scholarship distribution.",
    achievements: ["Blockchain transparency", "Smart contract automation", "Immutable records", "Decentralized verification"],
    icon: Zap
  },
  {
    category: "Community Building",
    title: "Creating Support Networks",
    description: "Built a global community where students mentor each other and share knowledge across cultural boundaries.",
    achievements: ["Peer mentorship programs", "Cross-cultural exchange", "Knowledge sharing", "Lifelong connections"],
    icon: Heart
  },
  {
    category: "Student Success",
    title: "Transforming Lives",
    description: "Our graduates go on to become leaders in their fields, creating positive change in their communities.",
    achievements: ["95% graduation rate", "Career advancement", "Community leadership", "Continued giving back"],
    icon: Target
  }
];

const futureGoals = [
  {
    year: "2025",
    goal: "5,000+ Active Students",
    description: "Double our community size and reach more students in need"
  },
  {
    year: "2026",
    goal: "50+ Countries",
    description: "Expand to new regions and establish local partnerships"
  },
  {
    year: "2027",
    goal: "$10M+ Distributed",
    description: "Quadruple our scholarship distribution capacity"
  },
  {
    year: "2028",
    goal: "Next-Gen Platform",
    description: "Launch advanced AI-powered student support systems"
  }
];

export function ImpactSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] relative overflow-hidden">
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
            <TrendingUp className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Our Impact</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Measuring Our{" "}
            <span className="text-[#9EFF00]">Impact</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Since 2016, CELF has been transforming lives through education. See the real-world 
            impact we've created and our vision for the future.
          </p>
        </motion.div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                    <metric.icon className="h-8 w-8 text-[#9EFF00]" />
                  </div>
                  
                  <div className="text-3xl lg:text-4xl font-bold text-[#9EFF00] mb-2">
                    {metric.number}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#9EFF00] transition-colors duration-300">
                    {metric.label}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    {metric.description}
                  </p>

                  <div className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium">
                    {metric.growth}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Impact Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {impactStories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                      <story.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium mb-2 inline-block">
                        {story.category}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                        {story.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {story.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {story.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-[#9EFF00] rounded-full flex-shrink-0" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Future Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)] mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our Future Vision
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We're just getting started. Here's our roadmap for expanding our impact 
              and reaching even more students worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {futureGoals.map((goal, index) => (
              <motion.div
                key={goal.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-[#9EFF00] mb-2">
                  {goal.year}
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  {goal.goal}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {goal.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30 max-w-4xl mx-auto">
            <CardContent className="p-8 lg:p-12">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(158,255,0,0.2)]">
                <BookOpen className="h-8 w-8 text-[#9EFF00]" />
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Be Part of Our Impact
              </h3>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of students who are already transforming their lives through CELF. 
                Your journey toward educational success starts with a single step.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button size="xl" asChild>
                  <Link href="/download" className="group">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="secondary" size="xl" asChild>
                  <Link href="/scholarship-program">View Scholarships</Link>
                </Button>
              </div>

              <div className="text-center text-gray-400 text-sm">
                <Heart className="h-4 w-4 inline mr-1" />
                Join 2,500+ students already building their future with CELF
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
