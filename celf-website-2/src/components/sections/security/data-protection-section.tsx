"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Database, 
  Shield, 
  Eye, 
  Trash2,
  Download,
  Globe,
  Lock,
  UserCheck,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const dataProtectionPrinciples = [
  {
    icon: Database,
    title: "Data Minimization",
    description: "We only collect data that is necessary for providing our services",
    details: [
      "Collect only essential information",
      "Regular data audits and cleanup",
      "Purpose limitation for data use",
      "Automatic data expiration policies"
    ]
  },
  {
    icon: Lock,
    title: "Encryption at Rest",
    description: "All stored data is encrypted using industry-standard methods",
    details: [
      "AES-256 encryption for databases",
      "Encrypted file storage systems",
      "Secure key management",
      "Regular encryption key rotation"
    ]
  },
  {
    icon: Shield,
    title: "Access Controls",
    description: "Strict controls govern who can access your data",
    details: [
      "Role-based access permissions",
      "Multi-factor authentication required",
      "Regular access reviews",
      "Principle of least privilege"
    ]
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear visibility into how your data is used and protected",
    details: [
      "Detailed privacy policy",
      "Data processing notifications",
      "Regular transparency reports",
      "User data dashboard"
    ]
  }
];

const userRights = [
  {
    icon: FileText,
    title: "Right to Access",
    description: "Request a copy of all personal data we hold about you"
  },
  {
    icon: Download,
    title: "Data Portability",
    description: "Export your data in a machine-readable format"
  },
  {
    icon: UserCheck,
    title: "Right to Rectification",
    description: "Correct any inaccurate or incomplete personal data"
  },
  {
    icon: Trash2,
    title: "Right to Erasure",
    description: "Request deletion of your personal data under certain conditions"
  },
  {
    icon: Eye,
    title: "Right to Object",
    description: "Object to processing of your data for specific purposes"
  },
  {
    icon: Clock,
    title: "Right to Restrict",
    description: "Limit how we process your personal data"
  }
];

const dataCategories = [
  {
    category: "Account Information",
    description: "Basic account details and preferences",
    retention: "Account lifetime + 2 years",
    purpose: "Service provision and support"
  },
  {
    category: "Educational Data",
    description: "Academic records and scholarship information",
    retention: "7 years after graduation",
    purpose: "Scholarship management and verification"
  },
  {
    category: "Token Mining Data",
    description: "Mining sessions and token transactions",
    retention: "5 years for compliance",
    purpose: "Platform operation and fraud prevention"
  },
  {
    category: "Communication Data",
    description: "Support tickets and correspondence",
    retention: "3 years after resolution",
    purpose: "Customer support and service improvement"
  }
];

export function DataProtectionSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-green-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-blue-500/8 to-transparent rounded-full blur-3xl" />
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
            Data{" "}
            <span className="text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]">Protection</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your privacy is fundamental to our mission. We implement comprehensive data 
            protection measures and respect your rights over your personal information.
          </p>
        </motion.div>

        {/* Data Protection Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {dataProtectionPrinciples.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:border-green-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <principle.icon className="h-8 w-8 text-green-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                    {principle.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {principle.description}
                  </p>

                  <div className="space-y-2">
                    {principle.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start space-x-2 text-sm text-gray-400">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* User Rights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Your Data Rights</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              You have comprehensive rights over your personal data. Here's what you can do:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRights.map((right, index) => (
              <motion.div
                key={right.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center group hover:border-green-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <right.icon className="h-6 w-6 text-green-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                      {right.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {right.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Categories and Retention */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Data Categories & Retention</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Understanding what data we collect, why we need it, and how long we keep it.
            </p>
          </div>

          <div className="space-y-4">
            {dataCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">{category.category}</h4>
                        <p className="text-gray-400 text-sm">{category.description}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-green-400 font-semibold mb-1">Retention Period</div>
                        <div className="text-gray-300 text-sm">{category.retention}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-blue-400 font-semibold mb-1">Purpose</div>
                        <div className="text-gray-300 text-sm">{category.purpose}</div>
                      </div>
                      <div className="text-center">
                        <div className="inline-flex items-center space-x-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                          <Shield className="h-3 w-3" />
                          <span>Protected</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact for Data Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <UserCheck className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Exercise Your Data Rights</h3>
              <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
                To exercise any of your data rights or if you have questions about our data practices, 
                contact our Data Protection Officer. We'll respond to your request within 30 days.
              </p>
              <div className="space-y-2 text-gray-400">
                <p>Email: privacy@celf.app</p>
                <p>Data Protection Officer: dpo@celf.app</p>
                <p>Response Time: Within 30 days</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
