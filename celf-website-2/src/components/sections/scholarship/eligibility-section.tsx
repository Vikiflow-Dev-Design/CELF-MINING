"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  CheckCircle, 
  X, 
  Coins, 
  Calendar, 
  Users, 
  GraduationCap,
  ArrowRight,
  AlertCircle,
  Globe,
  Clock
} from "lucide-react";

const eligibilityRequirements = [
  {
    icon: Coins,
    title: "Token Requirements",
    description: "Minimum 1,000 CELF tokens earned through mining activities",
    requirement: "1,000+ CELF Tokens",
    timeframe: "Typically 6-8 months of consistent mining",
    status: "required"
  },
  {
    icon: Calendar,
    title: "Age Requirement",
    description: "Must be between 16-35 years old at time of application",
    requirement: "16-35 Years Old",
    timeframe: "Valid government ID required",
    status: "required"
  },
  {
    icon: GraduationCap,
    title: "Educational Status",
    description: "Enrolled or accepted in an accredited educational institution",
    requirement: "Active Student Status",
    timeframe: "Enrollment verification needed",
    status: "required"
  },
  {
    icon: Users,
    title: "Community Participation",
    description: "Active participation in CELF community for at least 3 months",
    requirement: "3+ Months Active",
    timeframe: "Community engagement tracked",
    status: "preferred"
  }
];

const eligibilityBenefits = [
  {
    icon: Globe,
    title: "Global Eligibility",
    description: "Students from any country can apply - no geographical restrictions",
    highlight: "Worldwide Access"
  },
  {
    icon: CheckCircle,
    title: "No Academic Prerequisites",
    description: "No minimum GPA or previous academic performance requirements",
    highlight: "Merit-Based Only"
  },
  {
    icon: Clock,
    title: "Flexible Timeline",
    description: "Mine tokens at your own pace - no strict deadlines or time pressure",
    highlight: "Self-Paced"
  },
  {
    icon: Users,
    title: "Inclusive Program",
    description: "Open to all backgrounds, ethnicities, and socioeconomic statuses",
    highlight: "100% Inclusive"
  }
];

const disqualifiers = [
  "Previous CELF scholarship recipients (within 2 years)",
  "Fraudulent token mining or community violations",
  "Incomplete or false application information",
  "Not enrolled in an accredited institution"
];

export function EligibilitySection() {
  return (
    <section id="eligibility" className="py-20 lg:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
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
          <div className="inline-flex items-center space-x-2 bg-gray-900/80 border border-[#9EFF00]/30 rounded-full px-4 py-2 mb-6">
            <CheckCircle className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Eligibility Requirements</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Who Can{" "}
            <span className="text-[#9EFF00]">Apply</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our scholarship program is designed to be accessible and fair. Check if you meet 
            our requirements and start your journey toward educational funding.
          </p>
        </motion.div>

        {/* Main Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {eligibilityRequirements.map((req, index) => (
            <motion.div
              key={req.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full group cursor-pointer ${req.status === 'required' ? 'border-[#9EFF00]/30' : 'border-blue-500/30'}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${
                      req.status === 'required' 
                        ? 'bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 shadow-[0_0_20px_rgba(158,255,0,0.1)]'
                        : 'bg-gradient-to-br from-blue-500/20 to-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                    }`}>
                      <req.icon className={`h-6 w-6 ${req.status === 'required' ? 'text-[#9EFF00]' : 'text-blue-400'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <CardTitle className="group-hover:text-[#9EFF00] transition-colors duration-300">
                          {req.title}
                        </CardTitle>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          req.status === 'required' 
                            ? 'bg-[#9EFF00]/20 text-[#9EFF00]'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {req.status === 'required' ? 'Required' : 'Preferred'}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {req.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Requirement:</span>
                          <span className="text-white font-medium">{req.requirement}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Details:</span>
                          <span className="text-gray-300">{req.timeframe}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Our Eligibility is Different
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We've removed traditional barriers to make education funding accessible to everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eligibilityBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                      <benefit.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    
                    <CardTitle className="mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                      {benefit.title}
                    </CardTitle>
                    
                    <span className="inline-block text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium mb-3">
                      {benefit.highlight}
                    </span>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Disqualifiers and CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Disqualifiers */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-red-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-xl flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Disqualifying Factors</h3>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Please note the following conditions that may disqualify your application:
                </p>

                <ul className="space-y-3">
                  {disqualifiers.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(158,255,0,0.2)]">
                  <CheckCircle className="h-8 w-8 text-[#9EFF00]" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Check Your Eligibility?
                </h3>
                
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Start mining CELF tokens today and begin your journey toward earning a scholarship. 
                  The sooner you start, the sooner you qualify!
                </p>

                <div className="space-y-4">
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/download" className="group">
                      Start Mining Now
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  
                  <Button variant="secondary" size="lg" className="w-full" asChild>
                    <Link href="#application-process">Application Process</Link>
                  </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-[#9EFF00]/20">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00]">1,000</div>
                      <div className="text-xs text-gray-400">Min. Tokens</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00]">6-8</div>
                      <div className="text-xs text-gray-400">Months Avg.</div>
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
