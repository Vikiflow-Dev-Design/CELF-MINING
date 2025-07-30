"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  Target, 
  FileText, 
  Eye, 
  Award, 
  GraduationCap,
  ArrowRight,
  Clock,
  CheckCircle,
  Users,
  Coins
} from "lucide-react";

const journeySteps = [
  {
    phase: "Preparation",
    duration: "6-8 months",
    steps: [
      {
        icon: Target,
        title: "Set Your Goal",
        description: "Determine your scholarship target and required token amount.",
        requirement: "Choose scholarship type",
        timeframe: "Day 1"
      },
      {
        icon: Coins,
        title: "Start Mining",
        description: "Begin consistent daily mining to accumulate CELF tokens.",
        requirement: "Download app & mine daily",
        timeframe: "Ongoing"
      },
      {
        icon: Users,
        title: "Join Community",
        description: "Engage with the CELF community and build your reputation.",
        requirement: "Active participation",
        timeframe: "3+ months"
      }
    ]
  },
  {
    phase: "Application",
    duration: "2-3 weeks",
    steps: [
      {
        icon: FileText,
        title: "Submit Application",
        description: "Complete and submit your scholarship application with all required documents.",
        requirement: "1,000+ tokens minimum",
        timeframe: "1-2 days"
      },
      {
        icon: Eye,
        title: "Review Process",
        description: "Application undergoes thorough review by the scholarship committee.",
        requirement: "Committee evaluation",
        timeframe: "7-10 days"
      },
      {
        icon: CheckCircle,
        title: "Decision Notification",
        description: "Receive notification about your scholarship application status.",
        requirement: "Final decision",
        timeframe: "2-3 days"
      }
    ]
  },
  {
    phase: "Award & Education",
    duration: "1-4 years",
    steps: [
      {
        icon: Award,
        title: "Scholarship Award",
        description: "Receive your scholarship funding and begin your educational journey.",
        requirement: "Enrollment verification",
        timeframe: "Upon acceptance"
      },
      {
        icon: GraduationCap,
        title: "Educational Success",
        description: "Complete your studies with CELF scholarship support and community backing.",
        requirement: "Academic progress",
        timeframe: "Program duration"
      },
      {
        icon: Users,
        title: "Give Back",
        description: "Mentor new students and contribute to the CELF community ecosystem.",
        requirement: "Community contribution",
        timeframe: "Post-graduation"
      }
    ]
  }
];

const successFactors = [
  {
    icon: Clock,
    title: "Consistency",
    description: "Regular mining and community participation demonstrate commitment and reliability.",
    impact: "Higher approval rates"
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Active participation in discussions, helping others, and contributing to the ecosystem.",
    impact: "Priority consideration"
  },
  {
    icon: Target,
    title: "Clear Goals",
    description: "Well-defined educational objectives and career plans strengthen your application.",
    impact: "Better evaluation scores"
  },
  {
    icon: CheckCircle,
    title: "Complete Documentation",
    description: "Thorough and accurate application materials speed up the review process.",
    impact: "Faster processing"
  }
];

export function ScholarshipJourneySection() {
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
          <div className="inline-flex items-center space-x-2 bg-gray-900/80 border border-[#9EFF00]/30 rounded-full px-4 py-2 mb-6">
            <GraduationCap className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Scholarship Journey</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Your Path to{" "}
            <span className="text-[#9EFF00]">Educational Success</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Follow the complete journey from starting your CELF mining to receiving your scholarship 
            and achieving your educational goals. Every step is designed to support your success.
          </p>
        </motion.div>

        {/* Journey Phases */}
        <div className="space-y-16 mb-20">
          {journeySteps.map((phase, phaseIndex) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: phaseIndex * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Phase Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-3 bg-gray-900/80 border border-[#9EFF00]/30 rounded-full px-6 py-3 mb-4">
                  <span className="text-[#9EFF00] font-bold">Phase {phaseIndex + 1}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-white font-semibold">{phase.phase}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-400 text-sm">{phase.duration}</span>
                </div>
              </div>

              {/* Phase Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {phase.steps.map((step, stepIndex) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: stepIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                          <step.icon className="h-6 w-6 text-[#9EFF00]" />
                        </div>
                        
                        <CardTitle className="mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                          {step.title}
                        </CardTitle>
                        
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                          {step.description}
                        </p>

                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Requirement:</span>
                            <span className="text-white">{step.requirement}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Timeline:</span>
                            <span className="text-[#9EFF00]">{step.timeframe}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Connecting arrow within phase */}
                    {stepIndex < phase.steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#9EFF00]/50 to-transparent transform -translate-y-1/2">
                        <ArrowRight className="h-4 w-4 text-[#9EFF00]/50 absolute -top-2 right-0" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Phase connector */}
              {phaseIndex < journeySteps.length - 1 && (
                <div className="flex justify-center mt-12">
                  <div className="w-0.5 h-16 bg-gradient-to-b from-[#9EFF00]/50 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Success Factors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)] mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Keys to Success
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Maximize your chances of scholarship success by focusing on these critical factors that scholarship committees value most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successFactors.map((factor, index) => (
              <motion.div
                key={factor.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                  <factor.icon className="h-8 w-8 text-[#9EFF00]" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  {factor.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {factor.description}
                </p>
                <div className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium">
                  {factor.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
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
                <GraduationCap className="h-8 w-8 text-[#9EFF00]" />
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Start Your Journey?
              </h3>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Begin your path to educational success today. Download the CELF app, start mining tokens, 
                and join thousands of students already working toward their scholarship goals.
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#9EFF00]/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#9EFF00] mb-1">6-8</div>
                  <div className="text-gray-300 text-sm">Months to qualify</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#9EFF00] mb-1">1,000+</div>
                  <div className="text-gray-300 text-sm">Tokens needed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#9EFF00] mb-1">150+</div>
                  <div className="text-gray-300 text-sm">Students funded</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
