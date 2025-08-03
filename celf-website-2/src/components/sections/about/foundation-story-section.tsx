"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  BookOpen, 
  Lightbulb, 
  Users, 
  Award, 
  ArrowRight,
  Heart,
  Globe,
  Zap
} from "lucide-react";

const storyMilestones = [
  {
    year: "2016",
    title: "Foundation Established",
    description: "CELF was founded with a vision to make quality education accessible to students worldwide, regardless of their economic background.",
    icon: BookOpen,
    highlight: "The Beginning"
  },
  {
    year: "2018",
    title: "First Scholarships Awarded",
    description: "We awarded our first scholarships to 25 deserving students, proving that our mission could create real impact in students' lives.",
    icon: Award,
    highlight: "First Impact"
  },
  {
    year: "2020-2023",
    title: "Innovation Development",
    description: "Spent years researching and developing our revolutionary blockchain-based token mining system as an alternative to traditional scholarship exams.",
    icon: Lightbulb,
    highlight: "R&D Phase"
  },
  {
    year: "2024-2025",
    title: "Launch Preparation",
    description: "Finalizing our innovative platform and preparing for the official launch of our blockchain-based education funding system.",
    icon: Zap,
    highlight: "Launch Ready"
  }
];

const foundingPrinciples = [
  {
    icon: Heart,
    title: "Compassionate Mission",
    description: "Born from a deep understanding of educational barriers faced by students worldwide, especially those from underserved communities."
  },
  {
    icon: Lightbulb,
    title: "Innovative Approach",
    description: "Pioneering the use of blockchain technology to create fair, transparent, and accessible education funding mechanisms."
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "Building a supportive ecosystem where students help each other succeed, creating lasting bonds and mutual support."
  },
  {
    icon: Globe,
    title: "Global Vision",
    description: "Committed to breaking down geographical and economic barriers that prevent talented students from accessing quality education."
  }
];

export function FoundationStorySection() {
  return (
    <section id="foundation-story" className="py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
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
            <BookOpen className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Our Story</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            The{" "}
            <span className="text-[#9EFF00]">CELF Story</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From a simple idea to an innovative solution, discover how CELF is developing
            revolutionary blockchain technology to democratize education funding for students worldwide.
          </p>
        </motion.div>

        {/* Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Left side - Story narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-8">
              A Revolutionary Vision in Development
            </h3>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                In 2016, our founders recognized a fundamental problem in education funding:
                talented students were being denied opportunities not because they lacked ability,
                but because they lacked access to traditional scholarship systems.
              </p>

              <p>
                The existing scholarship landscape was riddled with barriers - complex application
                processes, biased selection criteria, geographical limitations, and systems that
                favored those who already had advantages. We knew there had to be a better way.
              </p>

              <p>
                CELF was born from the belief that every student, regardless of their background,
                deserves a fair chance at quality education. We set out to create a revolutionary
                system that would be transparent, accessible, and truly merit-based using blockchain technology.
              </p>

              <p>
                Today, after years of careful development and innovation, we're preparing to launch
                our groundbreaking platform that will transform how students access education funding
                through our unique token mining system - proving that technology and compassion can change the world.
              </p>
            </div>

            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/scholarship-program" className="group">
                  Join Our Mission
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right side - Story milestones */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {storyMilestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                          <milestone.icon className="h-6 w-6 text-[#9EFF00]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-2xl font-bold text-[#9EFF00]">{milestone.year}</div>
                            <span className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium">
                              {milestone.highlight}
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                            {milestone.title}
                          </h4>
                          <p className="text-gray-300 leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Founding Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our Founding Principles
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The core values that have guided CELF from day one and continue to drive our mission forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {foundingPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                  <principle.icon className="h-8 w-8 text-[#9EFF00]" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  {principle.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[#9EFF00]/20 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-[#9EFF00] mb-2">$2.5M+</div>
                <div className="text-white font-medium mb-1">Total Scholarships</div>
                <div className="text-gray-400 text-sm">Distributed since 2016</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#9EFF00] mb-2">150+</div>
                <div className="text-white font-medium mb-1">Lives Changed</div>
                <div className="text-gray-400 text-sm">Students funded globally</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#9EFF00] mb-2">95%</div>
                <div className="text-white font-medium mb-1">Success Rate</div>
                <div className="text-gray-400 text-sm">Students completing education</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
