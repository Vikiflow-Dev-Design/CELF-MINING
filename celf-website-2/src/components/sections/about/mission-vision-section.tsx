"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  Target, 
  Eye, 
  Heart, 
  Compass, 
  Shield,
  Users,
  Globe,
  Lightbulb,
  Award,
  Zap
} from "lucide-react";

const missionPoints = [
  {
    icon: Target,
    title: "Democratize Education Access",
    description: "Break down financial, geographical, and systemic barriers that prevent talented students from accessing quality education."
  },
  {
    icon: Shield,
    title: "Ensure Fair Distribution",
    description: "Create transparent, merit-based systems that eliminate bias and discrimination in education funding allocation."
  },
  {
    icon: Users,
    title: "Build Supportive Communities",
    description: "Foster environments where students support each other's success through mentorship and collaborative learning."
  },
  {
    icon: Lightbulb,
    title: "Drive Innovation",
    description: "Leverage cutting-edge technology to continuously improve and evolve education funding mechanisms."
  }
];

const visionElements = [
  {
    icon: Globe,
    title: "Global Education Equality",
    description: "A world where every student has equal opportunity to pursue quality education, regardless of their background or circumstances."
  },
  {
    icon: Zap,
    title: "Technology-Powered Solutions",
    description: "Leading the transformation of education funding through blockchain innovation and community-driven platforms."
  },
  {
    icon: Award,
    title: "Sustainable Impact",
    description: "Creating self-sustaining ecosystems that continue to generate educational opportunities for future generations."
  },
  {
    icon: Heart,
    title: "Compassionate Leadership",
    description: "Setting the standard for how educational foundations can operate with transparency, fairness, and genuine care."
  }
];

const coreValues = [
  {
    value: "Transparency",
    description: "All our operations, from token distribution to scholarship awards, are open and verifiable.",
    icon: Eye
  },
  {
    value: "Fairness",
    description: "Merit-based systems ensure equal opportunities for all students, regardless of background.",
    icon: Shield
  },
  {
    value: "Innovation",
    description: "Continuously evolving our approach using the latest technology and best practices.",
    icon: Lightbulb
  },
  {
    value: "Community",
    description: "Building strong networks of support that extend beyond individual scholarships.",
    icon: Users
  },
  {
    value: "Impact",
    description: "Measuring success by the real-world transformation of students' lives and communities.",
    icon: Target
  },
  {
    value: "Integrity",
    description: "Operating with the highest ethical standards in all our interactions and decisions.",
    icon: Compass
  }
];

export function MissionVisionSection() {
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
            Mission &{" "}
            <span className="text-[#9EFF00]">Vision</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our mission drives everything we do, while our vision guides us toward the future 
            we're building together - a world where education is truly accessible to all.
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-[#9EFF00]/30">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                    <Target className="h-6 w-6 text-[#9EFF00]" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  To democratize access to quality education by creating innovative, transparent, 
                  and fair funding mechanisms that empower students worldwide to achieve their 
                  academic dreams regardless of their economic background.
                </p>

                <div className="space-y-6">
                  {missionPoints.map((point, index) => (
                    <motion.div
                      key={point.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <point.icon className="h-4 w-4 text-[#9EFF00]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{point.title}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{point.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-[#9EFF00]/30">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                    <Eye className="h-6 w-6 text-[#9EFF00]" />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  A world where talent and determination, not financial circumstances, determine 
                  educational opportunities. We envision a global ecosystem where technology 
                  and community support create unlimited pathways to learning and growth.
                </p>

                <div className="space-y-6">
                  {visionElements.map((element, index) => (
                    <motion.div
                      key={element.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <element.icon className="h-4 w-4 text-[#9EFF00]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{element.title}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{element.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our Core Values
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The fundamental principles that guide every decision we make and every action we take 
              in pursuit of our mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                  <value.icon className="h-8 w-8 text-[#9EFF00]" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                  {value.value}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[#9EFF00]/20 text-center">
            <div className="max-w-3xl mx-auto">
              <h4 className="text-xl font-bold text-white mb-4">
                Living Our Values Every Day
              </h4>
              <p className="text-gray-300 leading-relaxed">
                These values aren't just words on a page - they're the foundation of how we operate, 
                how we treat our community members, and how we measure our success. Every scholarship 
                awarded, every student supported, and every innovation implemented reflects these 
                core principles that make CELF more than just a foundation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
