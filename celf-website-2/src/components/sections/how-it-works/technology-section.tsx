"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  Shield, 
  Smartphone, 
  Globe, 
  Zap, 
  Lock,
  Eye,
  Users,
  Database,
  CheckCircle,
  Server
} from "lucide-react";

const techStack = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Built on secure blockchain infrastructure ensuring transparency and immutability of all transactions.",
    features: ["Immutable records", "Transparent transactions", "Decentralized verification", "Smart contracts"],
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Native mobile applications optimized for iOS and Android with intuitive user experience.",
    features: ["Cross-platform support", "Offline capabilities", "Push notifications", "Biometric security"],
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Database,
    title: "Scalable Infrastructure",
    description: "Cloud-based architecture designed to handle millions of users and transactions efficiently.",
    features: ["Auto-scaling", "Load balancing", "99.9% uptime", "Global CDN"],
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: Lock,
    title: "Advanced Security",
    description: "Multi-layered security protocols protecting user data and token transactions.",
    features: ["End-to-end encryption", "Multi-factor auth", "Regular audits", "Secure key management"],
    color: "from-orange-500/20 to-orange-500/5"
  }
];

const securityFeatures = [
  {
    icon: Eye,
    title: "Transparent Operations",
    description: "All token distributions and scholarship awards are publicly verifiable on the blockchain."
  },
  {
    icon: Shield,
    title: "Secure Wallets",
    description: "Industry-standard wallet security with private key encryption and backup systems."
  },
  {
    icon: Users,
    title: "Identity Verification",
    description: "KYC processes ensure legitimate users while maintaining privacy and security."
  },
  {
    icon: Server,
    title: "Redundant Systems",
    description: "Multiple backup systems and failsafes ensure continuous service availability."
  }
];

const performanceMetrics = [
  {
    metric: "99.9%",
    label: "Uptime",
    description: "System availability"
  },
  {
    metric: "<2s",
    label: "Response Time",
    description: "Average API response"
  },
  {
    metric: "256-bit",
    label: "Encryption",
    description: "Data protection level"
  },
  {
    metric: "24/7",
    label: "Monitoring",
    description: "System surveillance"
  }
];

export function TechnologySection() {
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
            <Zap className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Technology</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Powered by{" "}
            <span className="text-[#9EFF00]">Advanced Technology</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            CELF leverages cutting-edge blockchain technology, mobile innovation, and secure infrastructure 
            to deliver a reliable, transparent, and user-friendly educational funding platform.
          </p>
        </motion.div>

        {/* Technology Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                      <tech.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                        {tech.title}
                      </CardTitle>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {tech.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {tech.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300 bg-gray-800/30 rounded-lg px-3 py-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Security & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Security & Trust
            </h3>

            <div className="space-y-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-gray-900/30 border border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-[#9EFF00]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Performance Metrics
                </h3>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  {performanceMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-[#9EFF00] mb-1">
                        {metric.metric}
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">
                        {metric.label}
                      </h4>
                      <p className="text-xs text-gray-300">
                        {metric.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-[#9EFF00]/20 pt-6">
                  <h4 className="text-lg font-bold text-white mb-4 text-center">
                    Enterprise-Grade Infrastructure
                  </h4>
                  
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center justify-between">
                      <span>Cloud Provider:</span>
                      <span className="text-white">AWS/Google Cloud</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Database:</span>
                      <span className="text-white">Distributed NoSQL</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Blockchain:</span>
                      <span className="text-white">Ethereum Compatible</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Security Audits:</span>
                      <span className="text-[#9EFF00]">Quarterly</span>
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
