"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle, CardDescription } from "@/src/components/ui/card";
import { 
  Smartphone, 
  Coins, 
  Users, 
  Award, 
  Shield,
  Globe,
  Zap,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const systemComponents = [
  {
    icon: Smartphone,
    title: "Mobile Application",
    description: "User-friendly mobile app where students mine CELF tokens through simple, engaging activities.",
    features: ["Easy token mining", "Real-time tracking", "Community features", "Progress analytics"],
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5",
    highlight: "iOS & Android"
  },
  {
    icon: Coins,
    title: "CELF Token System",
    description: "Blockchain-based tokens that serve as the foundation for scholarship qualification and rewards.",
    features: ["Secure blockchain", "Fair distribution", "Transparent tracking", "Merit-based earning"],
    color: "from-blue-500/20 to-blue-500/5",
    highlight: "Blockchain Secured"
  },
  {
    icon: Users,
    title: "Community Platform",
    description: "Supportive ecosystem where students connect, learn, and help each other succeed.",
    features: ["Peer mentorship", "Study groups", "Knowledge sharing", "Success stories"],
    color: "from-purple-500/20 to-purple-500/5",
    highlight: "2,500+ Members"
  },
  {
    icon: Award,
    title: "Scholarship Distribution",
    description: "Transparent and fair scholarship allocation based on token accumulation and community participation.",
    features: ["Multiple scholarship types", "Fair evaluation", "Direct funding", "Global accessibility"],
    color: "from-orange-500/20 to-orange-500/5",
    highlight: "150+ Awarded"
  }
];

const systemFlow = [
  {
    step: "01",
    title: "Student Registration",
    description: "Students download the CELF app and create their account to start their educational journey.",
    icon: Smartphone,
    details: ["Account creation", "Identity verification", "Wallet setup", "Community access"]
  },
  {
    step: "02",
    title: "Token Mining",
    description: "Students earn CELF tokens through consistent mining activities and community engagement.",
    icon: Zap,
    details: ["Daily mining sessions", "Community participation", "Learning activities", "Progress tracking"]
  },
  {
    step: "03",
    title: "Qualification Building",
    description: "Students accumulate tokens and build their scholarship qualification over time.",
    icon: TrendingUp,
    details: ["Token accumulation", "Community standing", "Consistency tracking", "Merit assessment"]
  },
  {
    step: "04",
    title: "Scholarship Application",
    description: "Qualified students apply for scholarships using their earned tokens as proof of merit.",
    icon: Award,
    details: ["Application submission", "Document verification", "Committee review", "Award decision"]
  }
];

const systemBenefits = [
  {
    icon: Shield,
    title: "Transparent & Secure",
    description: "Blockchain technology ensures all transactions and distributions are transparent and immutable."
  },
  {
    icon: Globe,
    title: "Globally Accessible",
    description: "Students from any country can participate without geographical or institutional barriers."
  },
  {
    icon: CheckCircle,
    title: "Merit-Based Fairness",
    description: "Success is determined by effort and consistency, not traditional academic prerequisites."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Supportive ecosystem where students help each other succeed and grow together."
  }
];

export function SystemOverviewSection() {
  return (
    <section id="system-overview" className="py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            The{" "}
            <span className="text-[#9EFF00]">CELF System</span>{" "}
            Overview
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            CELF combines mobile technology, blockchain innovation, and community support to create 
            a revolutionary education funding ecosystem that's fair, transparent, and accessible to all.
          </p>
        </motion.div>

        {/* System Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {systemComponents.map((component, index) => (
            <motion.div
              key={component.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${component.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                      <component.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <CardTitle className="group-hover:text-[#9EFF00] transition-colors duration-300">
                          {component.title}
                        </CardTitle>
                        <span className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium">
                          {component.highlight}
                        </span>
                      </div>
                      <CardDescription className="leading-relaxed mb-4">
                        {component.description}
                      </CardDescription>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {component.features.map((feature, idx) => (
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

        {/* System Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              How the System Works
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Follow the journey from student registration to scholarship award through our streamlined process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {systemFlow.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="h-full text-center group cursor-pointer">
                  <CardContent className="p-6">
                    {/* Step number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#9EFF00] text-black rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>

                    <div className="mt-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                        <step.icon className="h-6 w-6 text-[#9EFF00]" />
                      </div>
                      
                      <CardTitle className="mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                        {step.title}
                      </CardTitle>
                      
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        {step.description}
                      </p>

                      <div className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                            <div className="w-1 h-1 bg-[#9EFF00] rounded-full" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Connecting arrow (except for last item) */}
                {index < systemFlow.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#9EFF00]/50 to-transparent transform -translate-y-1/2">
                    <ArrowRight className="h-4 w-4 text-[#9EFF00]/50 absolute -top-2 right-0" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why CELF Works
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our system addresses the fundamental problems with traditional education funding through innovative technology and community-driven solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {systemBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                  <benefit.icon className="h-8 w-8 text-[#9EFF00]" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  {benefit.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
