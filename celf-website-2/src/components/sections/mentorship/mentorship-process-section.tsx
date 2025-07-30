"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  FileText, 
  Users, 
  MessageCircle, 
  Target,
  CheckCircle,
  ArrowRight,
  Clock,
  Calendar,
  Award,
  Heart,
  Star,
  Zap
} from "lucide-react";

const processSteps = [
  {
    step: 1,
    icon: FileText,
    title: "Complete Application",
    description: "Fill out our comprehensive application form with your goals, interests, and preferences.",
    details: [
      "Personal and academic background",
      "Educational and career goals",
      "Mentorship preferences and expectations",
      "Availability and communication style",
      "Specific areas where you need support"
    ],
    timeframe: "10-15 minutes",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    step: 2,
    icon: Users,
    title: "Mentor Matching",
    description: "Our algorithm and team match you with the perfect mentor based on your profile and needs.",
    details: [
      "AI-powered compatibility analysis",
      "Manual review by our team",
      "Consideration of goals and expertise",
      "Timezone and availability alignment",
      "Personality and communication style fit"
    ],
    timeframe: "24-48 hours",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    step: 3,
    icon: MessageCircle,
    title: "Introduction Call",
    description: "Meet your mentor in a structured introduction session to establish goals and expectations.",
    details: [
      "Get to know each other personally",
      "Discuss your specific goals and challenges",
      "Set clear expectations and boundaries",
      "Plan your mentorship journey together",
      "Schedule regular meeting times"
    ],
    timeframe: "45-60 minutes",
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    step: 4,
    icon: Target,
    title: "Goal Setting",
    description: "Work together to define specific, measurable goals and create an action plan to achieve them.",
    details: [
      "SMART goal framework implementation",
      "Break down long-term objectives",
      "Create actionable milestones",
      "Establish success metrics",
      "Set timeline and deadlines"
    ],
    timeframe: "Ongoing",
    color: "from-green-500/20 to-green-500/5"
  },
  {
    step: 5,
    icon: Calendar,
    title: "Regular Sessions",
    description: "Engage in consistent mentorship sessions with ongoing support and guidance.",
    details: [
      "Weekly or bi-weekly video calls",
      "Progress review and feedback",
      "Problem-solving and guidance",
      "Resource sharing and recommendations",
      "Continuous support via messaging"
    ],
    timeframe: "3-6 months",
    color: "from-yellow-500/20 to-yellow-500/5"
  },
  {
    step: 6,
    icon: Award,
    title: "Achievement & Growth",
    description: "Celebrate your successes and plan for continued growth beyond the formal program.",
    details: [
      "Goal achievement celebration",
      "Reflection on growth and learning",
      "Future planning and next steps",
      "Transition to ongoing relationship",
      "Opportunity to become a mentor yourself"
    ],
    timeframe: "Ongoing",
    color: "from-red-500/20 to-red-500/5"
  }
];

const processFeatures = [
  {
    icon: Zap,
    title: "Quick Matching",
    description: "Get matched with your ideal mentor within 48 hours of application submission."
  },
  {
    icon: Heart,
    title: "Personal Connection",
    description: "Build meaningful relationships that often extend beyond the formal program."
  },
  {
    icon: CheckCircle,
    title: "Structured Support",
    description: "Follow proven frameworks designed to maximize your mentorship experience."
  },
  {
    icon: Star,
    title: "Quality Assurance",
    description: "Regular check-ins ensure both mentors and mentees have positive experiences."
  }
];

const successMetrics = [
  { metric: "< 48hrs", label: "Average Match Time" },
  { metric: "92%", label: "Successful Pairings" },
  { metric: "4.9/5", label: "Satisfaction Rating" },
  { metric: "85%", label: "Goal Achievement" }
];

export function MentorshipProcessSection() {
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
            duration: 15,
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            How It{" "}
            <span className="text-[#9EFF00]">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our proven mentorship process is designed to create meaningful connections 
            and deliver real results. Here's how we guide you from application to achievement.
          </p>
        </motion.div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
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
              <h4 className="text-sm font-semibold text-white">
                {item.label}
              </h4>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  {/* Step Number */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-8 h-8 bg-[#9EFF00] rounded-full flex items-center justify-center text-black font-bold text-sm">
                      {step.step}
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                      <step.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Timeframe */}
                  <div className="flex items-center space-x-2 mb-4 text-sm">
                    <Clock className="h-4 w-4 text-[#9EFF00]" />
                    <span className="text-[#9EFF00] font-medium">{step.timeframe}</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-sm text-gray-300">
                        <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Process Features and CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Process Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Why Our Process Works
            </h3>

            <div className="space-y-6">
              {processFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-[#9EFF00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
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
                  Ready to Begin Your Journey?
                </h3>

                <div className="space-y-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(158,255,0,0.2)]">
                      <FileText className="h-8 w-8 text-[#9EFF00]" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Start Your Application</h4>
                    <p className="text-gray-300 text-sm">
                      Take the first step towards achieving your educational goals
                    </p>
                  </div>

                  <div className="border-t border-[#9EFF00]/20 pt-6">
                    <h4 className="text-lg font-bold text-white mb-4 text-center">
                      What Happens Next
                    </h4>
                    <div className="space-y-3 text-sm text-gray-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-[#9EFF00] rounded-full flex items-center justify-center text-black font-bold text-xs">1</div>
                        <span>Complete application (10-15 minutes)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-[#9EFF00] rounded-full flex items-center justify-center text-black font-bold text-xs">2</div>
                        <span>Get matched within 48 hours</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-[#9EFF00] rounded-full flex items-center justify-center text-black font-bold text-xs">3</div>
                        <span>Schedule your introduction call</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-[#9EFF00] rounded-full flex items-center justify-center text-black font-bold text-xs">4</div>
                        <span>Begin your mentorship journey</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button asChild className="w-full">
                    <Link href="#application" className="group">
                      Start Application Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="secondary" asChild className="w-full">
                    <Link href="/contact">Have Questions? Contact Us</Link>
                  </Button>
                </div>

                <div className="mt-6 text-center text-xs text-gray-400">
                  Free for CELF community members • No commitments • Cancel anytime
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
