"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  FileText, 
  Users, 
  Zap, 
  GraduationCap,
  Shield,
  AlertTriangle,
  Scale,
  Globe,
  Mail,
  Calendar
} from "lucide-react";

const termsData = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    icon: Scale,
    content: `By accessing and using the CELF platform, mobile application, and related services (collectively, the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.

These Terms of Service ("Terms") govern your use of our website located at celf-website.vikiflow.com and our mobile application operated by Clarence Education For Life Foundation ("CELF", "we", "us", or "our").

Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.`
  },
  {
    id: "services",
    title: "2. Description of Service",
    icon: Zap,
    content: `CELF provides a blockchain-based educational platform that allows users to:

• Mine CELF tokens through mobile application engagement
• Apply for educational scholarships using accumulated tokens
• Participate in educational programs and mentorship opportunities
• Access educational resources and community features
• Connect with mentors and fellow students

The Service is designed to revolutionize education funding by replacing traditional scholarship exams with innovative token mining mechanisms. Users earn tokens through consistent platform engagement and educational activities.`
  },
  {
    id: "eligibility",
    title: "3. User Eligibility",
    icon: Users,
    content: `To use our Service, you must:

• Be at least 13 years of age (or the minimum age required in your jurisdiction)
• Have the legal capacity to enter into these Terms
• Provide accurate and complete registration information
• Maintain the security of your account credentials
• Comply with all applicable laws and regulations

If you are under 18, you must have parental or guardian consent to use the Service. We reserve the right to verify your eligibility at any time.

Users from certain jurisdictions may be restricted from using specific features of the Service due to local laws and regulations.`
  },
  {
    id: "account",
    title: "4. Account Registration and Security",
    icon: Shield,
    content: `When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.

Account Security Requirements:
• Use a strong, unique password
• Enable two-factor authentication when available
• Keep your contact information updated
• Notify us immediately of any unauthorized access
• Do not share your account credentials with others

We reserve the right to suspend or terminate accounts that violate these security requirements or show signs of unauthorized access.`
  },
  {
    id: "tokens",
    title: "5. CELF Tokens and Mining",
    icon: Zap,
    content: `CELF tokens are digital assets earned through platform engagement and used for scholarship applications. Key points:

Token Mining:
• Tokens are earned through consistent app usage and educational activities
• Mining rates may vary based on user engagement and platform algorithms
• We reserve the right to adjust mining rates and mechanisms

Token Usage:
• Tokens can be used to apply for scholarships and educational programs
• Tokens have no monetary value and cannot be exchanged for cash
• Token balances may be subject to expiration policies
• Fraudulent token acquisition may result in account termination

We do not guarantee any specific token earning rates or scholarship awards based on token accumulation.`
  },
  {
    id: "scholarships",
    title: "6. Scholarship Programs",
    icon: GraduationCap,
    content: `CELF scholarship programs are subject to specific terms and conditions:

Application Process:
• Scholarships require minimum token thresholds
• Additional eligibility criteria may apply
• Applications are reviewed quarterly
• Selection is based on multiple factors beyond token count

Award Terms:
• Scholarship awards are grants, not loans
• Awards must be used for educational purposes
• Recipients may be required to provide progress reports
• Misuse of scholarship funds may result in recovery actions

We reserve the right to modify scholarship programs, eligibility criteria, and award amounts at our discretion.`
  }
];

export function TermsContent() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0A0A0A] to-[#0F0F0F] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#9EFF00]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-blue-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Terms Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {termsData.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                      <section.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Important Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16"
        >
          <Card className="border-yellow-500/20 bg-yellow-500/5">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <AlertTriangle className="h-8 w-8 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Important Additional Terms</h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">7. Prohibited Activities</h3>
                      <p>Users may not engage in fraudulent token mining, create multiple accounts, manipulate the platform, or use the Service for illegal activities. Violations may result in immediate account termination.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">8. Intellectual Property</h3>
                      <p>All content, trademarks, and intellectual property on the CELF platform are owned by CELF or our licensors. Users may not reproduce, distribute, or create derivative works without permission.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">9. Privacy and Data</h3>
                      <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">10. Limitation of Liability</h3>
                      <p>CELF shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability is limited to the amount you paid for the Service in the past 12 months.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">11. Modifications</h3>
                      <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Continued use of the Service constitutes acceptance of modified Terms.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16"
        >
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-[#9EFF00]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Questions About These Terms?</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                If you have any questions about these Terms of Service, please contact our legal team.
              </p>
              <div className="space-y-2 text-gray-400">
                <p>Email: legal@celf.app</p>
                <p>Address: Clarence Education For Life Foundation</p>
                <p>Last Updated: January 1, 2025</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
