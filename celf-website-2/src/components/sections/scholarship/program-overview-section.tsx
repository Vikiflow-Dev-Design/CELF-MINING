"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle, CardDescription } from "@/src/components/ui/card";
import { 
  Zap, 
  Shield, 
  Globe, 
  Users, 
  Award,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";

const programFeatures = [
  {
    icon: Zap,
    title: "Token-Based Qualification",
    description: "Earn CELF tokens through consistent mining activities instead of taking traditional scholarship exams.",
    highlight: "No Exams",
    benefits: ["Mine at your own pace", "Real-time progress tracking", "Fair merit system"]
  },
  {
    icon: Shield,
    title: "Blockchain Transparency",
    description: "All token earnings and scholarship distributions are recorded on the blockchain for complete transparency.",
    highlight: "100% Transparent",
    benefits: ["Immutable records", "Fair distribution", "Public verification"]
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Students from any country can participate, breaking down geographical barriers to education funding.",
    highlight: "Worldwide",
    benefits: ["No location restrictions", "Multiple currencies", "Local partnerships"]
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a supportive community of students, mentors, and educators working together for educational success.",
    highlight: "2,500+ Members",
    benefits: ["Peer mentorship", "Study groups", "Career guidance"]
  }
];

const programStats = [
  {
    icon: Award,
    number: "$2.5M+",
    label: "Total Scholarships",
    description: "Distributed to students worldwide"
  },
  {
    icon: TrendingUp,
    number: "95%",
    label: "Success Rate",
    description: "Students completing their education"
  },
  {
    icon: Clock,
    number: "6 Months",
    label: "Average Mining",
    description: "To qualify for scholarships"
  },
  {
    icon: CheckCircle,
    number: "100%",
    label: "Merit-Based",
    description: "No bias or discrimination"
  }
];

const howItWorks = [
  {
    step: "01",
    title: "Download & Mine",
    description: "Download the CELF app and start mining tokens through consistent daily activities."
  },
  {
    step: "02", 
    title: "Accumulate Tokens",
    description: "Build your token balance over time through regular mining sessions and community participation."
  },
  {
    step: "03",
    title: "Meet Requirements",
    description: "Reach the minimum token threshold and maintain good standing in the community."
  },
  {
    step: "04",
    title: "Apply for Scholarships",
    description: "Submit your scholarship application using your earned tokens as qualification proof."
  },
  {
    step: "05",
    title: "Receive Funding",
    description: "Get approved and receive direct funding for your educational expenses and tuition."
  }
];

export function ProgramOverviewSection() {
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            How Our{" "}
            <span className="text-[#9EFF00]">Scholarship Program</span>{" "}
            Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            CELF revolutionizes scholarship distribution by replacing traditional exams with blockchain-based 
            token mining, creating a fair and accessible system for students worldwide.
          </p>
        </motion.div>

        {/* Program Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {programFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                      <feature.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <CardTitle className="group-hover:text-[#9EFF00] transition-colors duration-300">
                          {feature.title}
                        </CardTitle>
                        <span className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium">
                          {feature.highlight}
                        </span>
                      </div>
                      <CardDescription className="mb-4 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                            <CheckCircle className="h-4 w-4 text-[#9EFF00] flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Program Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)] mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Program Impact & Results
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              See the real-world impact of our scholarship program and how we're transforming education funding globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                  <stat.icon className="h-8 w-8 text-[#9EFF00]" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-[#9EFF00] mb-2">
                  {stat.number}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              5 Simple Steps to Your Scholarship
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our streamlined process makes it easy for any student to earn their way to higher education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {howItWorks.map((step, index) => (
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
                      <CardTitle className="mb-3 text-lg group-hover:text-[#9EFF00] transition-colors duration-300">
                        {step.title}
                      </CardTitle>
                      
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Connecting arrow (except for last item) */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#9EFF00]/50 to-transparent transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
