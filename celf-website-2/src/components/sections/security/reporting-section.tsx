"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { 
  AlertTriangle, 
  Shield, 
  Mail, 
  Phone,
  Clock,
  CheckCircle,
  Bug,
  Eye,
  Lock,
  ArrowRight,
  Award,
  Users
} from "lucide-react";

const reportingChannels = [
  {
    icon: AlertTriangle,
    title: "Critical Security Issues",
    description: "Immediate threats requiring urgent attention",
    contact: "security@celf.app",
    phone: "+1-800-CELF-SEC",
    responseTime: "Within 1 hour",
    priority: "critical",
    examples: ["Account compromise", "Data breach", "System vulnerabilities", "Unauthorized access"]
  },
  {
    icon: Bug,
    title: "Security Bugs",
    description: "Non-critical security vulnerabilities and bugs",
    contact: "bugs@celf.app",
    phone: "N/A",
    responseTime: "Within 24 hours",
    priority: "high",
    examples: ["App security flaws", "Website vulnerabilities", "Authentication issues", "Permission bugs"]
  },
  {
    icon: Eye,
    title: "Suspicious Activity",
    description: "Unusual account or platform activity",
    contact: "support@celf.app",
    phone: "+1-800-CELF-HELP",
    responseTime: "Within 4 hours",
    priority: "medium",
    examples: ["Unusual login attempts", "Suspicious transactions", "Phishing attempts", "Fake accounts"]
  },
  {
    icon: Shield,
    title: "General Security Concerns",
    description: "Questions and concerns about security practices",
    contact: "privacy@celf.app",
    phone: "N/A",
    responseTime: "Within 48 hours",
    priority: "low",
    examples: ["Privacy questions", "Security best practices", "Policy clarifications", "General concerns"]
  }
];

const bugBountyInfo = {
  title: "Security Bug Bounty Program",
  description: "We reward security researchers who help us improve CELF's security",
  rewards: [
    { severity: "Critical", reward: "$500 - $2,000", description: "Remote code execution, data breach" },
    { severity: "High", reward: "$200 - $500", description: "Authentication bypass, privilege escalation" },
    { severity: "Medium", reward: "$50 - $200", description: "XSS, CSRF, information disclosure" },
    { severity: "Low", reward: "$25 - $50", description: "Minor security issues, best practice violations" }
  ],
  rules: [
    "Only test on designated testing environments",
    "Do not access or modify user data",
    "Report vulnerabilities responsibly",
    "Allow reasonable time for fixes before disclosure"
  ]
};

const responseProcess = [
  {
    step: 1,
    title: "Report Received",
    description: "We acknowledge your security report within 1 hour for critical issues",
    icon: Mail
  },
  {
    step: 2,
    title: "Initial Assessment",
    description: "Our security team evaluates the severity and impact",
    icon: Eye
  },
  {
    step: 3,
    title: "Investigation",
    description: "We investigate the issue and develop a fix if needed",
    icon: Bug
  },
  {
    step: 4,
    title: "Resolution",
    description: "We implement the fix and notify you of the resolution",
    icon: CheckCircle
  }
];

export function ReportingSection() {
  return (
    <section id="report-security" className="py-24 bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-red-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-[#9EFF00]/8 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Report Security{" "}
            <span className="text-red-400 drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]">Issues</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Help us keep CELF secure by reporting security vulnerabilities, suspicious activity, 
            or any concerns you may have about our platform's security.
          </p>
        </motion.div>

        {/* Reporting Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {reportingChannels.map((channel, index) => (
            <motion.div
              key={channel.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <channel.icon className="h-8 w-8 text-red-400" />
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      channel.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                      channel.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      channel.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {channel.priority.toUpperCase()}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors duration-300">
                    {channel.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {channel.description}
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-[#9EFF00]" />
                      <Link href={`mailto:${channel.contact}`} className="text-[#9EFF00] hover:text-[#8FEF00] transition-colors duration-200">
                        {channel.contact}
                      </Link>
                    </div>
                    {channel.phone !== "N/A" && (
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-[#9EFF00]" />
                        <Link href={`tel:${channel.phone}`} className="text-[#9EFF00] hover:text-[#8FEF00] transition-colors duration-200">
                          {channel.phone}
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400 text-sm">{channel.responseTime}</span>
                    </div>
                  </div>

                  {/* Examples */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Examples:</h4>
                    <div className="space-y-1">
                      {channel.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="flex items-center space-x-2 text-sm text-gray-400">
                          <div className="w-1 h-1 bg-[#9EFF00] rounded-full" />
                          <span>{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Response Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Our Response Process</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Here's what happens when you report a security issue to us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {responseProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-2xl flex items-center justify-center mx-auto">
                    <step.icon className="h-8 w-8 text-[#9EFF00]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#9EFF00] text-black rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bug Bounty Program */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-[#9EFF00]/10 to-blue-500/10 border-[#9EFF00]/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-[#9EFF00]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{bugBountyInfo.title}</h3>
                <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  {bugBountyInfo.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Rewards */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4">Reward Structure</h4>
                  <div className="space-y-3">
                    {bugBountyInfo.rewards.map((reward, index) => (
                      <div key={reward.severity} className="bg-gray-900/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-white">{reward.severity}</span>
                          <span className="text-[#9EFF00] font-bold">{reward.reward}</span>
                        </div>
                        <p className="text-gray-400 text-sm">{reward.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rules */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4">Program Rules</h4>
                  <div className="space-y-3">
                    {bugBountyInfo.rules.map((rule, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button size="lg" asChild>
                  <Link href="mailto:bugs@celf.app" className="group">
                    Join Bug Bounty Program
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Emergency Security Contact</h3>
              <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
                For critical security emergencies that pose immediate risk to user safety or data, 
                contact our emergency security team immediately.
              </p>
              <div className="space-y-2 text-gray-400 mb-6">
                <p>Emergency Email: security@celf.app</p>
                <p>Emergency Phone: +1-800-CELF-SEC</p>
                <p>Available: 24/7 for critical issues</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-red-400 text-sm">
                  <strong>Note:</strong> Only use emergency contacts for critical security issues that require immediate attention. 
                  For non-urgent matters, please use the appropriate reporting channels above.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
