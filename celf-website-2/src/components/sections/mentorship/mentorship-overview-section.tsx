"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Users, 
  Target, 
  Heart, 
  BookOpen,
  Award,
  MessageCircle,
  Calendar,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Globe
} from "lucide-react";

const mentorshipBenefits = [
  {
    icon: Target,
    title: "Goal-Oriented Guidance",
    description: "Work with mentors to set clear, achievable goals and create actionable plans to reach them.",
    features: ["Personal goal setting", "Progress tracking", "Milestone celebrations", "Course corrections"]
  },
  {
    icon: BookOpen,
    title: "Academic Excellence",
    description: "Get subject-specific support, study strategies, and academic advice from successful students.",
    features: ["Study techniques", "Research guidance", "Exam preparation", "Academic planning"]
  },
  {
    icon: Award,
    title: "Scholarship Success",
    description: "Learn from scholarship recipients about application strategies, essay writing, and interview skills.",
    features: ["Application review", "Essay feedback", "Interview prep", "Deadline management"]
  },
  {
    icon: Users,
    title: "Career Development",
    description: "Connect with professionals and alumni to explore career paths and build industry knowledge.",
    features: ["Industry insights", "Networking tips", "Resume review", "Career planning"]
  },
  {
    icon: Heart,
    title: "Personal Growth",
    description: "Develop confidence, leadership skills, and resilience with supportive mentorship relationships.",
    features: ["Confidence building", "Leadership development", "Stress management", "Life skills"]
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description: "Learn from mentors worldwide and gain international insights for your educational journey.",
    features: ["Cultural exchange", "Global opportunities", "International programs", "Diverse perspectives"]
  }
];

const programHighlights = [
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Meet with your mentor at times that work for both of you, accommodating different time zones and schedules."
  },
  {
    icon: MessageCircle,
    title: "Multiple Communication Channels",
    description: "Connect through video calls, messaging, email, and in-person meetings based on your preferences."
  },
  {
    icon: CheckCircle,
    title: "Structured Support",
    description: "Follow proven frameworks and resources designed to maximize the impact of your mentorship experience."
  },
  {
    icon: Star,
    title: "Quality Assurance",
    description: "All mentors are vetted and trained to provide high-quality guidance and support to mentees."
  }
];

const successMetrics = [
  {
    metric: "85%",
    label: "Goal Achievement",
    description: "Mentees who achieve their primary goals"
  },
  {
    metric: "92%",
    label: "Program Completion",
    description: "Mentees who complete the full program"
  },
  {
    metric: "4.9/5",
    label: "Satisfaction Rating",
    description: "Average mentee satisfaction score"
  },
  {
    metric: "78%",
    label: "Continued Relationship",
    description: "Pairs who maintain contact after program"
  }
];

export function MentorshipOverviewSection() {
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Why Choose{" "}
            <span className="text-[#9EFF00]">CELF Mentorship</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our mentorship program connects you with experienced guides who understand your journey 
            and are committed to helping you achieve your educational and career goals.
          </p>
        </motion.div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {successMetrics.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-[#9EFF00] mb-2">
                {item.metric}
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                {item.label}
              </h4>
              <p className="text-sm text-gray-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mentorship Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {mentorshipBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                    <benefit.icon className="h-6 w-6 text-[#9EFF00]" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {benefit.description}
                  </p>

                  <div className="space-y-2">
                    {benefit.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                        <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Program Highlights and CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Program Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Program Highlights
            </h3>

            <div className="space-y-6">
              {programHighlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <highlight.icon className="h-5 w-5 text-[#9EFF00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{highlight.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{highlight.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Ready to Start Your Journey?
                </h3>

                <div className="space-y-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(158,255,0,0.2)]">
                      <Users className="h-8 w-8 text-[#9EFF00]" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Join 1,200+ Students</h4>
                    <p className="text-gray-300 text-sm">
                      Who are already benefiting from our mentorship program
                    </p>
                  </div>

                  <div className="border-t border-[#9EFF00]/20 pt-6">
                    <h4 className="text-lg font-bold text-white mb-4 text-center">
                      What You'll Get
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0" />
                        <span>Personalized mentor matching</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0" />
                        <span>Weekly guidance sessions</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0" />
                        <span>Goal tracking and accountability</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0" />
                        <span>Access to exclusive resources</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0" />
                        <span>Community support network</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button asChild className="w-full">
                    <Link href="#application" className="group">
                      Apply for Mentorship
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="secondary" asChild className="w-full">
                    <Link href="#mentorship-types">Explore Mentorship Types</Link>
                  </Button>
                </div>

                <div className="mt-6 text-center text-xs text-gray-400">
                  Free for all CELF community members • No hidden fees
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
