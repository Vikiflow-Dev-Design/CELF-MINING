"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  FileText, 
  Upload, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  AlertCircle,
  Users,
  Award,
  Eye
} from "lucide-react";

const applicationSteps = [
  {
    step: "01",
    icon: FileText,
    title: "Complete Application",
    description: "Fill out the comprehensive scholarship application form with your personal and educational details.",
    timeframe: "15-20 minutes",
    requirements: ["Personal information", "Educational background", "Token wallet address", "Study plans"]
  },
  {
    step: "02",
    icon: Upload,
    title: "Submit Documents",
    description: "Upload required documents including ID verification, enrollment proof, and academic transcripts.",
    timeframe: "10-15 minutes",
    requirements: ["Government ID", "Enrollment verification", "Academic transcripts", "Proof of address"]
  },
  {
    step: "03",
    icon: Eye,
    title: "Initial Review",
    description: "Our team conducts an initial review of your application and verifies your token balance.",
    timeframe: "3-5 business days",
    requirements: ["Token verification", "Document validation", "Eligibility check", "Completeness review"]
  },
  {
    step: "04",
    icon: Users,
    title: "Committee Evaluation",
    description: "The scholarship committee evaluates your application based on merit, need, and community participation.",
    timeframe: "7-10 business days",
    requirements: ["Merit assessment", "Need evaluation", "Community review", "Final scoring"]
  },
  {
    step: "05",
    icon: CheckCircle,
    title: "Decision & Award",
    description: "Receive notification of the decision and, if approved, get your scholarship funding details.",
    timeframe: "2-3 business days",
    requirements: ["Final approval", "Funding arrangement", "Terms agreement", "Disbursement setup"]
  }
];

const requiredDocuments = [
  {
    icon: FileText,
    title: "Government-Issued ID",
    description: "Valid passport, driver's license, or national ID card",
    format: "PDF or high-quality image",
    required: true
  },
  {
    icon: FileText,
    title: "Enrollment Verification",
    description: "Official letter or document from your educational institution",
    format: "PDF from institution",
    required: true
  },
  {
    icon: FileText,
    title: "Academic Transcripts",
    description: "Most recent academic records or transcripts",
    format: "Official PDF document",
    required: true
  },
  {
    icon: FileText,
    title: "Proof of Address",
    description: "Utility bill, bank statement, or official mail",
    format: "PDF or clear image",
    required: false
  }
];

const applicationTips = [
  {
    icon: Clock,
    title: "Apply Early",
    description: "Submit your application as soon as you meet the token requirements. Earlier applications get priority review."
  },
  {
    icon: CheckCircle,
    title: "Complete Information",
    description: "Ensure all fields are filled accurately. Incomplete applications may be delayed or rejected."
  },
  {
    icon: Upload,
    title: "Quality Documents",
    description: "Upload clear, high-quality scans of all documents. Blurry or unclear documents may require resubmission."
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Active participation in the CELF community strengthens your application and demonstrates commitment."
  }
];

export function ApplicationProcessSection() {
  return (
    <section id="application-process" className="py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
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
            <FileText className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Application Process</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            How to{" "}
            <span className="text-[#9EFF00]">Apply</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our streamlined application process is designed to be simple and transparent. 
            Follow these steps to submit your scholarship application.
          </p>
        </motion.div>

        {/* Application Steps */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-bold text-white text-center mb-12"
          >
            5-Step Application Process
          </motion.h3>

          <div className="space-y-8">
            {applicationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-6">
                      {/* Step number and icon */}
                      <div className="flex flex-col items-center space-y-3 flex-shrink-0">
                        <div className="w-12 h-12 bg-[#9EFF00] text-black rounded-full flex items-center justify-center text-lg font-bold">
                          {step.step}
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                          <step.icon className="h-5 w-5 text-[#9EFF00]" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <CardTitle className="text-xl group-hover:text-[#9EFF00] transition-colors duration-300">
                            {step.title}
                          </CardTitle>
                          <span className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-3 py-1 rounded-full font-medium">
                            {step.timeframe}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {step.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                          {step.requirements.map((req, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300 bg-gray-800/30 rounded-lg px-3 py-2">
                              <CheckCircle className="h-4 w-4 text-[#9EFF00] flex-shrink-0" />
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Connecting line (except for last item) */}
                {index < applicationSteps.length - 1 && (
                  <div className="flex justify-center mt-4">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#9EFF00]/50 to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Required Documents and Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Required Documents */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Required Documents</h3>
            
            <div className="space-y-4">
              {requiredDocuments.map((doc, index) => (
                <Card key={doc.title} className={`group cursor-pointer ${doc.required ? 'border-[#9EFF00]/30' : 'border-blue-500/30'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        doc.required 
                          ? 'bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5'
                          : 'bg-gradient-to-br from-blue-500/20 to-blue-500/5'
                      }`}>
                        <doc.icon className={`h-5 w-5 ${doc.required ? 'text-[#9EFF00]' : 'text-blue-400'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{doc.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            doc.required 
                              ? 'bg-[#9EFF00]/20 text-[#9EFF00]'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {doc.required ? 'Required' : 'Optional'}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{doc.description}</p>
                        <p className="text-gray-400 text-xs">Format: {doc.format}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Application Tips */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Application Tips</h3>
            
            <div className="space-y-6 mb-8">
              {applicationTips.map((tip, index) => (
                <div key={tip.title} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <tip.icon className="h-5 w-5 text-[#9EFF00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{tip.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                  <Award className="h-6 w-6 text-[#9EFF00]" />
                </div>

                <h4 className="text-lg font-bold text-white mb-3">
                  Ready to Apply?
                </h4>
                
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  Make sure you have the minimum 1,000 CELF tokens and all required documents ready.
                </p>

                <div className="space-y-3">
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/apply" className="group">
                      Start Application
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  
                  <Button variant="secondary" size="sm" className="w-full" asChild>
                    <Link href="/download">Need More Tokens?</Link>
                  </Button>
                </div>

                <div className="mt-4 pt-4 border-t border-[#9EFF00]/20 text-center">
                  <div className="text-sm text-gray-400">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Applications reviewed within 2 weeks
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
