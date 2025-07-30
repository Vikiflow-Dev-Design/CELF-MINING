"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  HelpCircle, 
  BookOpen, 
  Users, 
  MessageSquare,
  Video,
  Download,
  ArrowRight,
  Clock,
  CheckCircle,
  Star,
  Zap
} from "lucide-react";

const supportOptions = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive guides, tutorials, and API documentation to help you get started and troubleshoot issues.",
    features: ["Step-by-step guides", "Video tutorials", "API reference", "Best practices"],
    responseTime: "Instant access",
    availability: "24/7",
    href: "/docs",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    icon: Users,
    title: "Community Forum",
    description: "Connect with fellow students, mentors, and CELF team members for peer-to-peer support and discussions.",
    features: ["Peer support", "Expert mentors", "Success stories", "Q&A discussions"],
    responseTime: "< 30 minutes",
    availability: "24/7",
    href: "/community",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Get instant help from our support team through live chat for urgent questions and technical issues.",
    features: ["Real-time support", "Screen sharing", "File uploads", "Chat history"],
    responseTime: "< 2 minutes",
    availability: "Business hours",
    href: "/chat",
    color: "from-green-500/20 to-green-500/5"
  },
  {
    icon: Video,
    title: "Video Calls",
    description: "Schedule one-on-one video sessions with our support specialists for complex issues and personalized guidance.",
    features: ["Screen sharing", "Personal guidance", "Recording available", "Follow-up notes"],
    responseTime: "Same day",
    availability: "By appointment",
    href: "/schedule",
    color: "from-purple-500/20 to-purple-500/5"
  }
];

const quickHelp = [
  {
    icon: Download,
    title: "App Download Issues",
    description: "Having trouble downloading or installing the CELF app?",
    action: "Download Guide",
    href: "/download-help"
  },
  {
    icon: Zap,
    title: "Mining Problems",
    description: "Issues with token mining or session tracking?",
    action: "Mining FAQ",
    href: "/mining-help"
  },
  {
    icon: CheckCircle,
    title: "Scholarship Applications",
    description: "Questions about applying for scholarships?",
    action: "Application Guide",
    href: "/scholarship-help"
  },
  {
    icon: Users,
    title: "Account Management",
    description: "Need help with your CELF account or profile?",
    action: "Account Help",
    href: "/account-help"
  }
];

const supportStats = [
  {
    icon: Clock,
    number: "< 2min",
    label: "Average Response",
    description: "Live chat response time"
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "Support Rating",
    description: "Customer satisfaction score"
  },
  {
    icon: Users,
    number: "24/7",
    label: "Community Help",
    description: "Always available support"
  },
  {
    icon: CheckCircle,
    number: "98%",
    label: "Resolution Rate",
    description: "Issues resolved successfully"
  }
];

export function SupportOptionsSection() {
  return (
    <section id="support-options" className="py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
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
            <HelpCircle className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Support Options</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Choose Your{" "}
            <span className="text-[#9EFF00]">Support Method</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We offer multiple support channels to ensure you get the help you need, 
            when you need it, in the way that works best for you.
          </p>
        </motion.div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {supportOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                      <option.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                        {option.title}
                      </CardTitle>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {option.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white mb-3">Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {option.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                          <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-gray-700/50">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Response Time</div>
                      <div className="text-sm font-medium text-[#9EFF00]">{option.responseTime}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Availability</div>
                      <div className="text-sm font-medium text-white">{option.availability}</div>
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={option.href} className="group">
                      Get Help
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Help and Support Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Quick Help */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Quick Help Topics
            </h3>

            <div className="space-y-4">
              {quickHelp.map((help, index) => (
                <motion.div
                  key={help.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={help.href} className="block">
                    <Card className="group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <help.icon className="h-5 w-5 text-[#9EFF00]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-1 group-hover:text-[#9EFF00] transition-colors duration-300">
                              {help.title}
                            </h4>
                            <p className="text-gray-300 text-sm">{help.description}</p>
                          </div>
                          <div className="text-[#9EFF00] text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                            {help.action} →
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Support Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Support Excellence
                </h3>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  {supportStats.map((stat, index) => (
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
                      <p className="text-xs text-gray-300">
                        {stat.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-[#9EFF00]/20 pt-6 text-center">
                  <h4 className="text-lg font-bold text-white mb-3">
                    Need Immediate Help?
                  </h4>
                  <p className="text-gray-300 text-sm mb-6">
                    Our community forum is always active with students and mentors ready to help.
                  </p>
                  <Button asChild>
                    <Link href="/community" className="group">
                      Join Community
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
