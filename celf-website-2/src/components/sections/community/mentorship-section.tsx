"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  Users, 
  Heart, 
  Target, 
  Award,
  MessageCircle,
  Calendar,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Star,
  CheckCircle,
  Clock
} from "lucide-react";

const mentorshipTypes = [
  {
    icon: Users,
    title: "1-on-1 Mentorship",
    description: "Get paired with an experienced student or alumni for personalized guidance throughout your journey.",
    features: ["Personal mentor matching", "Weekly video calls", "Goal setting & tracking", "Application review"],
    duration: "3-6 months",
    availability: "50+ mentors available",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    icon: BookOpen,
    title: "Academic Mentorship",
    description: "Connect with students in your field of study for subject-specific support and study strategies.",
    features: ["Subject expertise", "Study techniques", "Research guidance", "Exam preparation"],
    duration: "Ongoing",
    availability: "200+ academic mentors",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Target,
    title: "Career Mentorship",
    description: "Learn from professionals and alumni about career paths, internships, and industry insights.",
    features: ["Industry insights", "Resume review", "Interview prep", "Networking guidance"],
    duration: "2-4 months",
    availability: "75+ career mentors",
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: Heart,
    title: "Peer Support Groups",
    description: "Join small groups of students facing similar challenges for mutual support and encouragement.",
    features: ["Group discussions", "Shared experiences", "Emotional support", "Accountability partners"],
    duration: "Flexible",
    availability: "30+ active groups",
    color: "from-red-500/20 to-red-500/5"
  }
];

const mentorProfiles = [
  {
    name: "Dr. Sarah Chen",
    role: "Computer Science PhD",
    university: "Stanford University",
    expertise: ["Machine Learning", "Research Methods", "PhD Applications"],
    experience: "5 years mentoring",
    students: 23,
    rating: 4.9,
    image: "/api/placeholder/80/80",
    quote: "I love helping students navigate the complex world of graduate studies and research."
  },
  {
    name: "Marcus Johnson",
    role: "Software Engineer",
    university: "MIT Alumni",
    expertise: ["Career Development", "Tech Industry", "Internships"],
    experience: "3 years mentoring",
    students: 18,
    rating: 4.8,
    image: "/api/placeholder/80/80",
    quote: "My goal is to help students bridge the gap between academia and industry."
  },
  {
    name: "Elena Rodriguez",
    role: "Medical Student",
    university: "Harvard Medical School",
    expertise: ["Pre-med Guidance", "MCAT Prep", "Medical School Apps"],
    experience: "2 years mentoring",
    students: 15,
    rating: 5.0,
    image: "/api/placeholder/80/80",
    quote: "I understand the challenges of pursuing medicine and want to help others succeed."
  }
];

const mentorshipStats = [
  {
    icon: Users,
    number: "1,200+",
    label: "Active Pairs",
    description: "Mentor-mentee relationships"
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "Satisfaction",
    description: "Average mentorship rating"
  },
  {
    icon: Award,
    number: "85%",
    label: "Success Rate",
    description: "Mentees achieving goals"
  },
  {
    icon: Clock,
    number: "< 48hrs",
    label: "Match Time",
    description: "Average mentor matching"
  }
];

const mentorshipProcess = [
  {
    step: 1,
    title: "Complete Profile",
    description: "Tell us about your goals, interests, and what kind of mentorship you're looking for."
  },
  {
    step: 2,
    title: "Get Matched",
    description: "Our algorithm pairs you with the perfect mentor based on your profile and preferences."
  },
  {
    step: 3,
    title: "Start Connecting",
    description: "Begin your mentorship journey with an introductory call and goal-setting session."
  },
  {
    step: 4,
    title: "Achieve Goals",
    description: "Work together towards your educational and career objectives with ongoing support."
  }
];

export function MentorshipSection() {
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
            Mentorship{" "}
            <span className="text-[#9EFF00]">Program</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect with experienced students, alumni, and professionals who can guide you 
            through your educational journey and help you achieve your goals.
          </p>
        </motion.div>

        {/* Mentorship Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {mentorshipStats.map((stat, index) => (
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

        {/* Mentorship Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {mentorshipTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                      <type.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="mb-2 group-hover:text-[#9EFF00] transition-colors duration-300">
                        {type.title}
                      </CardTitle>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {type.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {type.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                        <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700/50">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Duration</div>
                      <div className="text-sm font-medium text-white">{type.duration}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Availability</div>
                      <div className="text-sm font-medium text-[#9EFF00]">{type.availability}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Mentors and Process */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Featured Mentors */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Meet Our Mentors
            </h3>

            <div className="space-y-6">
              {mentorProfiles.map((mentor, index) => (
                <motion.div
                  key={mentor.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-[#9EFF00]">
                            {mentor.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1 group-hover:text-[#9EFF00] transition-colors duration-300">
                            {mentor.name}
                          </h4>
                          <div className="text-sm text-gray-300 mb-2">
                            {mentor.role} • {mentor.university}
                          </div>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-400 mb-3">
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{mentor.students} students</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span>{mentor.rating}/5</span>
                            </div>
                            <span>{mentor.experience}</span>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {mentor.expertise.map((skill, idx) => (
                              <span key={idx} className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>

                          <blockquote className="text-sm text-gray-300 italic">
                            "{mentor.quote}"
                          </blockquote>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="secondary" asChild>
                <Link href="/mentors">View All Mentors</Link>
              </Button>
            </div>
          </motion.div>

          {/* Mentorship Process */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  How It Works
                </h3>

                <div className="space-y-6 mb-8">
                  {mentorshipProcess.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-8 h-8 bg-[#9EFF00] rounded-full flex items-center justify-center flex-shrink-0 text-black font-bold text-sm">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">{step.title}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-[#9EFF00]/20 pt-6">
                  <h4 className="text-lg font-bold text-white mb-4 text-center">
                    Ready to Get Started?
                  </h4>
                  <p className="text-gray-300 text-sm mb-6 text-center">
                    Join our mentorship program and get the guidance you need to achieve your educational goals.
                  </p>
                  
                  <div className="space-y-3">
                    <Button asChild className="w-full">
                      <Link href="/mentorship/apply" className="group">
                        Find a Mentor
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button variant="secondary" asChild className="w-full">
                      <Link href="/mentorship/become-mentor">Become a Mentor</Link>
                    </Button>
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
