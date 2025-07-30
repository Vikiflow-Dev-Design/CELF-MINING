"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  GraduationCap, 
  Heart, 
  Globe, 
  Users, 
  Target,
  ArrowRight,
  BookOpen,
  Lightbulb
} from "lucide-react";

const missionPoints = [
  {
    icon: GraduationCap,
    title: "Educational Excellence",
    description: "Promoting quality education and creating pathways for students to achieve their academic dreams through innovative funding solutions."
  },
  {
    icon: Heart,
    title: "Social Impact",
    description: "Since 2016, we've been dedicated to transforming lives through education, believing that knowledge is the key to breaking cycles of poverty."
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Making education funding accessible to students worldwide, regardless of their geographical location or economic background."
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Creating a supportive ecosystem where students, educators, and supporters collaborate to advance educational opportunities."
  }
];

const achievements = [
  {
    icon: Target,
    number: "8",
    label: "Years of Impact",
    description: "Transforming education since 2016"
  },
  {
    icon: BookOpen,
    number: "150+",
    label: "Scholarships Awarded",
    description: "Students funded through our programs"
  },
  {
    icon: Globe,
    number: "25+",
    label: "Countries Reached",
    description: "Global presence and impact"
  },
  {
    icon: Lightbulb,
    number: "95%",
    label: "Success Rate",
    description: "Students completing their education"
  }
];

export function MissionSection() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left side - Mission Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 bg-gray-900/80 border border-[#9EFF00]/30 rounded-full px-4 py-2 mb-6"
              >
                <Heart className="h-4 w-4 text-[#9EFF00]" />
                <span className="text-gray-300 text-sm font-medium">Our Mission</span>
              </motion.div>

              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Empowering Education Through{" "}
                <span className="text-[#9EFF00]">Innovation</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                The Clarence Education For Life Foundation was founded with a simple yet powerful vision: 
                to democratize access to quality education by removing traditional barriers and creating 
                innovative pathways for student success.
              </p>

              <div className="space-y-6 mb-8">
                {missionPoints.map((point, index) => (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <point.icon className="h-5 w-5 text-[#9EFF00]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{point.title}</h4>
                      <p className="text-gray-300 leading-relaxed">{point.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" asChild>
                  <Link href="/about" className="group">
                    Learn Our Story
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/scholarship-program">View Programs</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main achievement card */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Our Impact Since 2016</h3>
                  <p className="text-gray-300">
                    Transforming lives through innovative education funding and blockchain technology.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(158,255,0,0.1)]">
                        <achievement.icon className="h-6 w-6 text-[#9EFF00]" />
                      </div>
                      <div className="text-2xl font-bold text-[#9EFF00] mb-1">
                        {achievement.number}
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">
                        {achievement.label}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {achievement.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-4xl text-[#9EFF00] mb-4">"</div>
                    <p className="text-gray-300 italic mb-4 leading-relaxed">
                      Education is the most powerful weapon which you can use to change the world. 
                      Through CELF, we're putting that weapon in the hands of every student.
                    </p>
                    <div className="text-sm text-gray-400">
                      — CELF Foundation Team
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-[#9EFF00] rounded-full opacity-20"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#9EFF00] rounded-full opacity-30"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
