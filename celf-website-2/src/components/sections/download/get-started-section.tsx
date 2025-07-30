"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Download, 
  UserPlus, 
  Zap, 
  Award,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Target,
  Play
} from "lucide-react";

const gettingStartedSteps = [
  {
    step: 1,
    icon: Download,
    title: "Download CELF",
    description: "Get the CELF app from your device's app store and install it on your smartphone.",
    details: ["Available on iOS & Android", "Free download", "Quick installation", "No registration required yet"],
    estimatedTime: "2 minutes",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    step: 2,
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up with your email or phone number to create your CELF account and secure wallet.",
    details: ["Email or phone signup", "Secure verification", "Privacy protected", "Instant account creation"],
    estimatedTime: "3 minutes",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    step: 3,
    icon: Zap,
    title: "Start Mining",
    description: "Tap the mining button to begin your first session and start earning CELF tokens.",
    details: ["One-tap to start", "1-hour sessions", "0.125 CELF/hour", "Background mining"],
    estimatedTime: "1 minute",
    color: "from-yellow-500/20 to-yellow-500/5"
  },
  {
    step: 4,
    icon: Award,
    title: "Track Progress",
    description: "Monitor your token accumulation and scholarship eligibility through the app dashboard.",
    details: ["Real-time balance", "Progress tracking", "Milestone alerts", "Scholarship readiness"],
    estimatedTime: "Ongoing",
    color: "from-purple-500/20 to-purple-500/5"
  }
];

const quickTips = [
  {
    icon: Clock,
    title: "Mine Consistently",
    tip: "Regular mining sessions help you accumulate tokens faster and show commitment to scholarship committees."
  },
  {
    icon: Users,
    title: "Join Community",
    tip: "Connect with other students for support, tips, and motivation throughout your scholarship journey."
  },
  {
    icon: Target,
    title: "Set Goals",
    tip: "Use the app's goal-setting features to track your progress toward specific scholarship targets."
  },
  {
    icon: CheckCircle,
    title: "Complete Profile",
    tip: "Fill out your profile completely to improve your scholarship application readiness score."
  }
];

const firstSessionGuide = [
  "Open the CELF app after installation",
  "Complete the quick onboarding tutorial",
  "Verify your email or phone number",
  "Tap the green 'Start Mining' button",
  "Keep the app open for your first session",
  "Watch your token balance increase in real-time",
  "Receive notification when session completes",
  "Start your next session when ready"
];

export function GetStartedSection() {
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
          <div className="inline-flex items-center space-x-2 bg-gray-900/80 border border-[#9EFF00]/30 rounded-full px-4 py-2 mb-6">
            <Play className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Getting Started</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Start Your{" "}
            <span className="text-[#9EFF00]">Journey</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get up and running with CELF in just a few minutes. Follow these simple steps 
            to download the app and start mining your first tokens.
          </p>
        </motion.div>

        {/* Getting Started Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {gettingStartedSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full relative group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#9EFF00] rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {step.step}
                  </div>

                  <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                    <step.icon className="h-6 w-6 text-[#9EFF00]" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Step Details */}
                  <div className="space-y-2 mb-4">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-gray-400">
                        <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Estimated Time */}
                  <div className="flex items-center space-x-2 text-xs text-[#9EFF00] bg-[#9EFF00]/10 rounded-full px-3 py-1">
                    <Clock className="h-3 w-3" />
                    <span>{step.estimatedTime}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* First Session Guide and Quick Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* First Session Guide */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-[#9EFF00]" />
                  <span>Your First Mining Session</span>
                </h3>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Follow this step-by-step guide to complete your first successful mining session 
                  and start earning CELF tokens immediately.
                </p>

                <div className="space-y-3">
                  {firstSessionGuide.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/30"
                    >
                      <div className="w-6 h-6 bg-[#9EFF00]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#9EFF00] text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed">{step}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-[#9EFF00]/10 border border-[#9EFF00]/30 rounded-lg">
                  <div className="flex items-center space-x-2 text-[#9EFF00] mb-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-semibold text-sm">Pro Tip</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Your first session is the most important! Keep the app open and watch your 
                    balance grow in real-time to understand how mining works.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <Target className="h-6 w-6 text-[#9EFF00]" />
                  <span>Success Tips</span>
                </h3>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Maximize your CELF experience with these proven tips from successful 
                  scholarship recipients in our community.
                </p>

                <div className="space-y-6">
                  {quickTips.map((tip, index) => (
                    <motion.div
                      key={tip.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                        <tip.icon className="h-5 w-5 text-[#9EFF00]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">{tip.title}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{tip.tip}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700/50">
                  <h4 className="font-semibold text-white mb-3">Need More Help?</h4>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="secondary" size="sm" asChild className="flex-1">
                      <Link href="/community">Join Community</Link>
                    </Button>
                    <Button variant="secondary" size="sm" asChild className="flex-1">
                      <Link href="/support">Get Support</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Start Mining?
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Join thousands of students who are already earning tokens and working 
                toward their educational goals with CELF.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="#download-links" className="group">
                    Download CELF Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/how-it-works">Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
