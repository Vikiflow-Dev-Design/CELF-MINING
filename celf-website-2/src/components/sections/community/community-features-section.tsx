"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import {
  MessageCircle,
  Users,
  BookOpen,
  Award,
  Calendar,
  Video,
  Heart,
  Globe,
  Zap,
  Target,
  HelpCircle,
  Star,
} from "lucide-react";

const communityFeatures = [
  {
    icon: MessageCircle,
    title: "Student Forums",
    description:
      "Connect with fellow students in topic-specific forums covering academics, career advice, and general support.",
    features: [
      "Subject-specific discussions",
      "Q&A sections",
      "Study tips sharing",
      "Real-time chat",
    ],
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5",
    stats: "500+ daily posts",
  },
  {
    icon: Users,
    title: "Mentorship Program",
    description:
      "Get paired with successful students or alumni who can guide you through your educational journey.",
    features: [
      "1-on-1 mentoring",
      "Group mentorship",
      "Career guidance",
      "Application support",
    ],
    color: "from-blue-500/20 to-blue-500/5",
    stats: "1,200+ active pairs",
  },
  {
    icon: BookOpen,
    title: "Study Groups",
    description:
      "Join or create study groups for specific subjects, exam preparation, or collaborative learning projects.",
    features: [
      "Subject-based groups",
      "Exam prep sessions",
      "Project collaboration",
      "Resource sharing",
    ],
    color: "from-purple-500/20 to-purple-500/5",
    stats: "500+ active groups",
  },
  {
    icon: Award,
    title: "Success Stories",
    description:
      "Read inspiring stories from scholarship recipients and share your own achievements with the community.",
    features: [
      "Scholarship journeys",
      "Achievement celebrations",
      "Motivational content",
      "Tips from winners",
    ],
    color: "from-yellow-500/20 to-yellow-500/5",
    stats: "150+ stories shared",
  },
  {
    icon: Calendar,
    title: "Community Events",
    description:
      "Participate in virtual events, workshops, webinars, and networking sessions with students worldwide.",
    features: [
      "Weekly webinars",
      "Networking events",
      "Skill workshops",
      "Cultural exchanges",
    ],
    color: "from-green-500/20 to-green-500/5",
    stats: "20+ monthly events",
  },
  {
    icon: Video,
    title: "Live Sessions",
    description:
      "Join live video sessions for real-time discussions, study sessions, and expert talks.",
    features: [
      "Expert interviews",
      "Live Q&A sessions",
      "Study streams",
      "Community meetings",
    ],
    color: "from-red-500/20 to-red-500/5",
    stats: "50+ hours weekly",
  },
];

const communityBenefits = [
  {
    icon: Heart,
    title: "Emotional Support",
    description:
      "Find encouragement and motivation from peers who understand your challenges",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description:
      "Learn about different educational systems and cultures from around the world",
  },
  {
    icon: Zap,
    title: "Quick Help",
    description:
      "Get fast answers to questions with our responsive community members",
  },
  {
    icon: Target,
    title: "Goal Achievement",
    description:
      "Stay motivated and accountable with community support and tracking",
  },
];

const communityGuidelines = [
  "Be respectful and supportive to all community members",
  "Share knowledge and resources generously",
  "Keep discussions relevant and constructive",
  "Protect privacy and personal information",
  "Report inappropriate behavior to moderators",
  "Celebrate others' successes and milestones",
];

export function CommunityFeaturesSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
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
            Community <span className="text-[#9EFF00]">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover all the ways you can connect, learn, and grow with the CELF
            community. From forums to mentorship, we provide multiple channels
            for meaningful engagement.
          </p>
        </motion.div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}
                  >
                    <feature.icon className="h-6 w-6 text-[#9EFF00]" />
                  </div>

                  <CardTitle className="mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                    {feature.title}
                  </CardTitle>

                  <p className="text-gray-300 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Feature List */}
                  <div className="space-y-2 mb-4">
                    {feature.features.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 text-sm text-gray-300"
                      >
                        <div className="w-1.5 h-1.5 bg-[#9EFF00] rounded-full flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-3 py-1 rounded-full font-medium">
                    {feature.stats}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Community Benefits and Guidelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Community Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Why Join Our Community?
            </h3>

            <div className="space-y-6">
              {communityBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-5 w-5 text-[#9EFF00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-[#9EFF00]/10 to-[#9EFF00]/5 border border-[#9EFF00]/30 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Star className="h-6 w-6 text-[#9EFF00]" />
                <h4 className="text-lg font-bold text-white">
                  Community Impact
                </h4>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                "Being part of the CELF community has been transformative. The
                support, knowledge sharing, and friendships I've gained here are
                invaluable. It's more than just a platform - it's a global
                family of students helping each other succeed."
              </p>
              <div className="mt-3 text-xs text-[#9EFF00]">
                - Sarah Chen, Scholarship Recipient
              </div>
            </div>
          </motion.div>

          {/* Community Guidelines */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <HelpCircle className="h-6 w-6 text-[#9EFF00]" />
                  <span>Community Guidelines</span>
                </h3>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Our community thrives on mutual respect, support, and shared
                  learning. Follow these guidelines to help maintain a positive
                  environment for everyone.
                </p>

                <div className="space-y-4 mb-8">
                  {communityGuidelines.map((guideline, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-6 h-6 bg-[#9EFF00]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#9EFF00] text-xs font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed">
                        {guideline}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-[#9EFF00]/20 pt-6">
                  <h4 className="text-lg font-bold text-white mb-3">
                    Moderation & Support
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Our dedicated moderation team ensures a safe and supportive
                    environment. If you encounter any issues, don't hesitate to
                    reach out for help.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00] mb-1">
                        24/7
                      </div>
                      <div className="text-white text-sm font-medium">
                        Moderation
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00] mb-1">
                        &lt; 1hr
                      </div>
                      <div className="text-white text-sm font-medium">
                        Response Time
                      </div>
                    </div>
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
