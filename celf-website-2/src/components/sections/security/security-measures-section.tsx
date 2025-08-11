"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Shield, 
  Lock, 
  Eye, 
  Server,
  Database,
  Zap,
  CheckCircle,
  Globe,
  Smartphone,
  Key,
  AlertTriangle,
  FileCheck
} from "lucide-react";

const securityMeasures = [
  {
    icon: Shield,
    title: "Advanced Encryption",
    description: "All data is protected with AES-256 encryption",
    features: [
      "256-bit AES encryption for data at rest",
      "TLS 1.3 for data in transit",
      "End-to-end encryption for sensitive communications",
      "Regular encryption key rotation"
    ],
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Lock,
    title: "Multi-Factor Authentication",
    description: "Multiple layers of authentication protect your account",
    features: [
      "SMS and email verification codes",
      "Authenticator app support (TOTP)",
      "Biometric authentication on mobile",
      "Hardware security key support"
    ],
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    icon: Eye,
    title: "24/7 Monitoring",
    description: "Continuous surveillance of all system activities",
    features: [
      "Real-time threat detection",
      "Automated security alerts",
      "Suspicious activity monitoring",
      "Incident response team on standby"
    ],
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    description: "Enterprise-grade infrastructure protection",
    features: [
      "AWS/Azure cloud security standards",
      "DDoS protection and mitigation",
      "Network segmentation and firewalls",
      "Regular security audits and penetration testing"
    ],
    color: "from-orange-500/20 to-orange-500/5"
  },
  {
    icon: Database,
    title: "Data Protection",
    description: "Comprehensive data security and privacy measures",
    features: [
      "Data minimization principles",
      "Regular automated backups",
      "Geographic data replication",
      "GDPR and CCPA compliance"
    ],
    color: "from-green-500/20 to-green-500/5"
  },
  {
    icon: Smartphone,
    title: "Mobile Security",
    description: "Specialized protection for mobile applications",
    features: [
      "App certificate pinning",
      "Runtime application self-protection",
      "Jailbreak/root detection",
      "Secure local data storage"
    ],
    color: "from-cyan-500/20 to-cyan-500/5"
  }
];

const complianceStandards = [
  {
    icon: FileCheck,
    title: "SOC 2 Type II",
    description: "Audited security controls and procedures"
  },
  {
    icon: Shield,
    title: "ISO 27001",
    description: "Information security management standards"
  },
  {
    icon: Globe,
    title: "GDPR Compliant",
    description: "European data protection regulations"
  },
  {
    icon: Key,
    title: "PCI DSS",
    description: "Payment card industry security standards"
  }
];

export function SecurityMeasuresSection() {
  return (
    <section id="security-measures" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full blur-3xl" />
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
            <span className="text-blue-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">Measures</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive security framework protects your data, tokens, and privacy 
            with enterprise-grade measures and industry-leading practices.
          </p>
        </motion.div>

        {/* Security Measures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityMeasures.map((measure, index) => (
            <motion.div
              key={measure.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${measure.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <measure.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {measure.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {measure.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {measure.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-2 text-sm text-gray-400">
                        <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Compliance Standards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Compliance & Certifications</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We adhere to the highest industry standards and maintain certifications 
              from leading security organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceStandards.map((standard, index) => (
              <motion.div
                key={standard.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center group hover:border-blue-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <standard.icon className="h-8 w-8 text-blue-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {standard.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {standard.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Promise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Security Promise</h3>
              <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
                We are committed to maintaining the highest security standards to protect your educational 
                journey and digital assets. Our security measures are continuously updated to address 
                emerging threats and maintain your trust.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="flex items-center space-x-2 text-blue-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Zero-tolerance for breaches</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Transparent security practices</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Continuous improvement</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
