"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Key, 
  Smartphone, 
  Wifi, 
  Eye,
  AlertTriangle,
  Shield,
  Lock,
  CheckCircle,
  XCircle,
  Mail,
  Download,
  Globe
} from "lucide-react";

const bestPractices = [
  {
    icon: Key,
    title: "Strong Passwords",
    description: "Create secure passwords to protect your account",
    dos: [
      "Use at least 12 characters",
      "Include uppercase, lowercase, numbers, and symbols",
      "Use a unique password for CELF",
      "Consider using a password manager"
    ],
    donts: [
      "Don't use personal information",
      "Don't reuse passwords from other sites",
      "Don't share your password with anyone",
      "Don't use common words or patterns"
    ],
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Smartphone,
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security to your account",
    dos: [
      "Enable 2FA on your account",
      "Use an authenticator app when possible",
      "Keep backup codes in a safe place",
      "Update your phone number if it changes"
    ],
    donts: [
      "Don't rely only on SMS if avoidable",
      "Don't share your 2FA codes",
      "Don't disable 2FA unless necessary",
      "Don't ignore 2FA setup prompts"
    ],
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    icon: Wifi,
    title: "Safe Browsing",
    description: "Protect yourself when accessing CELF online",
    dos: [
      "Always check the URL is correct",
      "Look for the secure lock icon",
      "Use trusted networks when possible",
      "Keep your browser updated"
    ],
    donts: [
      "Don't access CELF on public WiFi",
      "Don't click suspicious links in emails",
      "Don't ignore security warnings",
      "Don't save passwords on shared devices"
    ],
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: Eye,
    title: "Account Monitoring",
    description: "Stay vigilant about your account activity",
    dos: [
      "Check your account regularly",
      "Review login notifications",
      "Monitor token transactions",
      "Report suspicious activity immediately"
    ],
    donts: [
      "Don't ignore security alerts",
      "Don't dismiss unusual activity",
      "Don't delay reporting issues",
      "Don't assume everything is fine"
    ],
    color: "from-orange-500/20 to-orange-500/5"
  }
];

const securityTips = [
  {
    icon: Download,
    title: "App Security",
    tip: "Only download the CELF app from official app stores (Google Play, Apple App Store)",
    importance: "high"
  },
  {
    icon: Mail,
    title: "Email Verification",
    tip: "Always verify emails claiming to be from CELF by checking the sender address",
    importance: "high"
  },
  {
    icon: Globe,
    title: "Official Websites",
    tip: "Only access CELF through our official website: celf-website.vikiflow.com",
    importance: "high"
  },
  {
    icon: Shield,
    title: "Device Security",
    tip: "Keep your devices updated and use screen locks to prevent unauthorized access",
    importance: "medium"
  },
  {
    icon: Lock,
    title: "Logout Practices",
    tip: "Always log out of CELF when using shared or public computers",
    importance: "medium"
  },
  {
    icon: AlertTriangle,
    title: "Phishing Awareness",
    tip: "Be cautious of emails, texts, or calls asking for your CELF login credentials",
    importance: "high"
  }
];

const commonThreats = [
  {
    threat: "Phishing Emails",
    description: "Fake emails designed to steal your credentials",
    prevention: "Always verify sender and never click suspicious links"
  },
  {
    threat: "Fake Apps",
    description: "Malicious apps impersonating CELF",
    prevention: "Only download from official app stores"
  },
  {
    threat: "Social Engineering",
    description: "Attempts to manipulate you into revealing information",
    prevention: "CELF will never ask for passwords via phone or email"
  },
  {
    threat: "Public WiFi Attacks",
    description: "Intercepting data on unsecured networks",
    prevention: "Use mobile data or VPN on public networks"
  }
];

export function BestPracticesSection() {
  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-radial from-[#9EFF00]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-radial from-purple-500/8 to-transparent rounded-full blur-3xl" />
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
            Security{" "}
            <span className="text-[#9EFF00] drop-shadow-[0_0_30px_rgba(158,255,0,0.3)]">Best Practices</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Follow these essential security practices to keep your CELF account and 
            tokens safe from threats and unauthorized access.
          </p>
        </motion.div>

        {/* Best Practices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {bestPractices.map((practice, index) => (
            <motion.div
              key={practice.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:border-[#9EFF00]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(158,255,0,0.1)]">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${practice.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <practice.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#9EFF00] transition-colors duration-300">
                    {practice.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {practice.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Do's */}
                    <div>
                      <h4 className="text-green-400 font-semibold mb-3 flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Do</span>
                      </h4>
                      <div className="space-y-2">
                        {practice.dos.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start space-x-2 text-sm text-gray-400">
                            <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Don'ts */}
                    <div>
                      <h4 className="text-red-400 font-semibold mb-3 flex items-center space-x-2">
                        <XCircle className="h-4 w-4" />
                        <span>Don't</span>
                      </h4>
                      <div className="space-y-2">
                        {practice.donts.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start space-x-2 text-sm text-gray-400">
                            <XCircle className="h-3 w-3 text-red-400 mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Security Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Quick Security Tips</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Essential tips to keep your account secure and protect yourself from common threats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityTips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group hover:border-[#9EFF00]/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <tip.icon className="h-6 w-6 text-[#9EFF00]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-lg font-bold text-white group-hover:text-[#9EFF00] transition-colors duration-300">
                            {tip.title}
                          </h4>
                          {tip.importance === 'high' && (
                            <div className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-medium">
                              HIGH
                            </div>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {tip.tip}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Common Threats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Common Security Threats</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Be aware of these common threats and how to protect yourself from them.
            </p>
          </div>

          <div className="space-y-4">
            {commonThreats.map((threat, index) => (
              <motion.div
                key={threat.threat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:border-red-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-xl flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="h-6 w-6 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                          {threat.threat}
                        </h4>
                        <p className="text-gray-400 mb-3 leading-relaxed">
                          {threat.description}
                        </p>
                        <div className="flex items-start space-x-2">
                          <Shield className="h-4 w-4 text-[#9EFF00] mt-0.5 flex-shrink-0" />
                          <p className="text-[#9EFF00] text-sm font-medium">
                            Prevention: {threat.prevention}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
