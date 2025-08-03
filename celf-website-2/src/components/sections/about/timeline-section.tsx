"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Calendar, 
  BookOpen, 
  Award, 
  Users, 
  Globe, 
  Zap,
  TrendingUp,
  Heart,
  Smartphone,
  Target
} from "lucide-react";

const timelineEvents = [
  {
    year: "2016",
    quarter: "Q1",
    title: "Foundation Established",
    description: "CELF was officially founded with the mission to democratize education funding and remove barriers to quality education.",
    icon: BookOpen,
    achievements: ["Legal foundation established", "Initial team assembled", "Mission statement defined"],
    impact: "Foundation created"
  },
  {
    year: "2017",
    quarter: "Q2",
    title: "First Partnerships",
    description: "Established partnerships with 5 educational institutions and began developing our scholarship framework.",
    icon: Users,
    achievements: ["5 university partnerships", "Scholarship criteria developed", "Application process designed"],
    impact: "Framework built"
  },
  {
    year: "2018",
    quarter: "Q1",
    title: "First Scholarships Awarded",
    description: "Awarded our first 25 scholarships, proving the viability of our mission and creating our first success stories.",
    icon: Award,
    achievements: ["25 scholarships awarded", "$125,000 distributed", "First success stories documented"],
    impact: "25 students funded"
  },
  {
    year: "2019",
    quarter: "Q3",
    title: "Community Growth",
    description: "Expanded to 500+ active community members and established mentorship programs connecting students globally.",
    icon: Heart,
    achievements: ["500+ community members", "Mentorship program launched", "Student support network created"],
    impact: "Community established"
  },
  {
    year: "2020",
    quarter: "Q2",
    title: "Early Startup Phase",
    description: "CELF was in its early startup phase, building the foundational team and exploring innovative solutions for education funding challenges.",
    icon: Globe,
    achievements: ["Core team formation", "Initial concept development", "Market opportunity research"],
    impact: "Startup foundation"
  },
  {
    year: "2021",
    quarter: "Q4",
    title: "Pre-Launch Development",
    description: "Intensive development phase preparing for the launch of our website and mobile application with innovative blockchain concepts.",
    icon: Smartphone,
    achievements: ["Website development in progress", "App architecture designed", "Blockchain research initiated"],
    impact: "Pre-launch preparation"
  },
  {
    year: "2022",
    quarter: "Q1",
    title: "Concept Refinement",
    description: "Refined our revolutionary token mining concept while continuing development without any blockchain implementation yet.",
    icon: Zap,
    achievements: ["Mining concept refined", "Technical specifications improved", "Development roadmap updated"],
    impact: "Concept maturation"
  },
  {
    year: "2023",
    quarter: "Q3",
    title: "Pre-Mining Development",
    description: "Continued platform development and preparation phases before launching any mining operations or token systems.",
    icon: TrendingUp,
    achievements: ["Platform development continued", "System testing planned", "Launch strategy refined"],
    impact: "Development progress"
  },
  {
    year: "2024",
    quarter: "Q1",
    title: "Launch Preparation",
    description: "Final preparations for launching our innovative platform, with website and app development nearing completion.",
    icon: Target,
    achievements: ["Final development phase", "Launch preparations underway", "Community building initiated"],
    impact: "Launch readiness"
  }
];

export function TimelineSection() {
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
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[#9EFF00]/15 to-transparent rounded-full blur-3xl"
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
            <Calendar className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Our Journey</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            CELF{" "}
            <span className="text-[#9EFF00]">Timeline</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Follow our journey from a small foundation with big dreams to a global movement 
            that's transforming education funding through innovation and community.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#9EFF00]/50 via-[#9EFF00]/30 to-transparent hidden lg:block" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={`${event.year}-${event.quarter}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#9EFF00] rounded-full border-4 border-[#0A0A0A] z-10 hidden lg:block" />

                {/* Content */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <Card className="group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                          <event.icon className="h-6 w-6 text-[#9EFF00]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-[#9EFF00]">{event.year}</span>
                              <span className="text-sm bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium">
                                {event.quarter}
                              </span>
                            </div>
                            <span className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded-full">
                              {event.impact}
                            </span>
                          </div>
                          
                          <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                            {event.title}
                          </h4>
                          
                          <p className="text-gray-300 leading-relaxed mb-4">
                            {event.description}
                          </p>

                          {/* Achievements */}
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-white">Key Achievements:</h5>
                            <div className="grid grid-cols-1 gap-2">
                              {event.achievements.map((achievement, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                                  <div className="w-1.5 h-1.5 bg-[#9EFF00] rounded-full flex-shrink-0" />
                                  <span>{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden lg:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(158,255,0,0.2)]">
              <Target className="h-8 w-8 text-[#9EFF00]" />
            </div>

            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Looking Ahead
            </h3>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Our journey is far from over. We're committed to continuous innovation, expanding our reach, 
              and creating even more opportunities for students worldwide. The next chapter of CELF will 
              bring new technologies, partnerships, and possibilities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#9EFF00] mb-2">2025</div>
                <div className="text-white font-medium mb-1">Official Launch</div>
                <div className="text-gray-400 text-sm">Website & app go live</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#9EFF00] mb-2">2026</div>
                <div className="text-white font-medium mb-1">Mining Launch</div>
                <div className="text-gray-400 text-sm">Token mining begins</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#9EFF00] mb-2">2027</div>
                <div className="text-white font-medium mb-1">First Scholarships</div>
                <div className="text-gray-400 text-sm">Scholarship program starts</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
