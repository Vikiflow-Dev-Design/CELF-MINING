"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Heart, 
  Users, 
  Award,
  BookOpen,
  Target,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  MessageCircle,
  Lightbulb
} from "lucide-react";

const mentorBenefits = [
  {
    icon: Heart,
    title: "Make a Real Impact",
    description: "Help shape the future by guiding the next generation of leaders and innovators.",
    details: ["Direct impact on student success", "Witness transformational journeys", "Create lasting positive change"]
  },
  {
    icon: Users,
    title: "Build Your Network",
    description: "Connect with like-minded professionals and expand your global network.",
    details: ["Meet fellow mentors worldwide", "Join exclusive mentor community", "Access networking events"]
  },
  {
    icon: BookOpen,
    title: "Develop Leadership Skills",
    description: "Enhance your coaching, communication, and leadership abilities.",
    details: ["Improve communication skills", "Learn coaching techniques", "Develop empathy and patience"]
  },
  {
    icon: Award,
    title: "Recognition & Growth",
    description: "Gain recognition for your contributions and grow personally and professionally.",
    details: ["Mentor appreciation programs", "Professional development opportunities", "Leadership recognition"]
  }
];

const mentorRequirements = [
  {
    category: "Experience",
    requirements: [
      "Completed undergraduate degree or equivalent experience",
      "Demonstrated success in your field of study or career",
      "At least 2 years of relevant experience",
      "Previous mentoring or teaching experience (preferred)"
    ]
  },
  {
    category: "Commitment",
    requirements: [
      "Minimum 6-month commitment to the program",
      "1-2 hours per week for mentorship activities",
      "Regular communication with assigned mentees",
      "Participation in mentor training and check-ins"
    ]
  },
  {
    category: "Skills",
    requirements: [
      "Strong communication and interpersonal skills",
      "Patience and empathy for student challenges",
      "Ability to provide constructive feedback",
      "Cultural sensitivity and global mindset"
    ]
  }
];

const mentorTypes = [
  {
    icon: Target,
    title: "Career Mentor",
    description: "Guide students in career exploration, job search, and professional development.",
    commitment: "2-4 months",
    focus: ["Industry insights", "Resume review", "Interview prep", "Networking"]
  },
  {
    icon: BookOpen,
    title: "Academic Mentor",
    description: "Support students with study strategies, research, and academic excellence.",
    commitment: "Ongoing",
    focus: ["Study techniques", "Research guidance", "Academic planning", "Skill development"]
  },
  {
    icon: Award,
    title: "Scholarship Mentor",
    description: "Help students navigate scholarship applications and funding opportunities.",
    commitment: "2-3 months",
    focus: ["Application strategy", "Essay writing", "Interview prep", "Deadline management"]
  },
  {
    icon: Globe,
    title: "Global Mentor",
    description: "Provide international perspectives and cross-cultural guidance.",
    commitment: "3-6 months",
    focus: ["Cultural exchange", "Study abroad", "Global opportunities", "Language support"]
  }
];

const applicationProcess = [
  {
    step: 1,
    title: "Submit Application",
    description: "Complete our comprehensive mentor application form",
    timeframe: "15-20 minutes"
  },
  {
    step: 2,
    title: "Background Review",
    description: "We review your qualifications and experience",
    timeframe: "3-5 business days"
  },
  {
    step: 3,
    title: "Interview Process",
    description: "Video interview to discuss your motivation and approach",
    timeframe: "30-45 minutes"
  },
  {
    step: 4,
    title: "Training Program",
    description: "Complete our mentor training and orientation",
    timeframe: "2-3 hours"
  },
  {
    step: 5,
    title: "Mentor Matching",
    description: "Get matched with mentees based on expertise and goals",
    timeframe: "1-2 weeks"
  }
];

export function BecomeMentorSection() {
  return (
    <section id="become-mentor" className="py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
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
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[#9EFF00]/15 to-transparent rounded-full blur-3xl"
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
            Become a{" "}
            <span className="text-[#9EFF00]">Mentor</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Share your knowledge, experience, and passion with the next generation. 
            Join our community of mentors making a real difference in students' lives worldwide.
          </p>
        </motion.div>

        {/* Mentor Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {mentorBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                    <benefit.icon className="h-6 w-6 text-[#9EFF00]" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {benefit.description}
                  </p>

                  <div className="space-y-1">
                    {benefit.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-gray-400">
                        <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mentor Types and Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* Mentor Types */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Mentorship Opportunities
            </h3>

            <div className="space-y-6">
              {mentorTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                          <type.icon className="h-5 w-5 text-[#9EFF00]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white mb-2">{type.title}</h4>
                          <p className="text-gray-300 text-sm leading-relaxed mb-3">{type.description}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-400 mb-3">
                            <Clock className="h-3 w-3 text-[#9EFF00]" />
                            <span>Commitment: {type.commitment}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {type.focus.map((item, idx) => (
                              <span key={idx} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Mentor Requirements
                </h3>

                <div className="space-y-6">
                  {mentorRequirements.map((category, index) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="text-lg font-semibold text-white mb-3">{category.category}</h4>
                      <div className="space-y-2">
                        {category.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-sm text-gray-300">
                            <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#9EFF00]/20">
                  <h4 className="text-lg font-bold text-white mb-4 text-center">
                    Ready to Make a Difference?
                  </h4>
                  <p className="text-gray-300 text-sm mb-6 text-center">
                    Join our community of mentors and help shape the future of education.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="#mentor-application" className="group">
                      Apply to Become a Mentor
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Application Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Application Process
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our streamlined application process ensures we find the right mentors 
              who are passionate about helping students succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {applicationProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-[#9EFF00] rounded-full flex items-center justify-center text-black font-bold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <h4 className="font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-2">{step.description}</p>
                <div className="text-xs text-[#9EFF00]">{step.timeframe}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-[#9EFF00]/20 text-center">
            <h4 className="text-lg font-bold text-white mb-3">
              Questions About Becoming a Mentor?
            </h4>
            <p className="text-gray-300 text-sm mb-6">
              Our team is here to help you understand the mentorship program and answer any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="#mentor-application">Start Application</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
