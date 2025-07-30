"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle, CardDescription } from "@/src/components/ui/card";
import { 
  GraduationCap, 
  BookOpen, 
  Laptop, 
  Globe, 
  Award,
  DollarSign,
  Clock,
  Users
} from "lucide-react";

const scholarshipTypes = [
  {
    icon: GraduationCap,
    title: "Full Tuition Scholarship",
    amount: "$5,000 - $25,000",
    description: "Complete tuition coverage for undergraduate and graduate programs at accredited institutions worldwide.",
    coverage: ["Full tuition fees", "Registration costs", "Academic materials", "Lab fees"],
    requirements: "2,000+ CELF tokens",
    duration: "Full academic program",
    availability: "20 per year",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    icon: BookOpen,
    title: "Partial Tuition Support",
    amount: "$1,000 - $5,000",
    description: "Partial tuition assistance to help reduce the financial burden of higher education costs.",
    coverage: ["Partial tuition", "Books & supplies", "Study materials", "Online courses"],
    requirements: "1,000+ CELF tokens",
    duration: "1-2 semesters",
    availability: "50 per year",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Laptop,
    title: "Technology Grant",
    amount: "$500 - $2,000",
    description: "Support for purchasing essential technology and equipment needed for modern education.",
    coverage: ["Laptops/tablets", "Software licenses", "Internet access", "Tech accessories"],
    requirements: "500+ CELF tokens",
    duration: "One-time grant",
    availability: "100 per year",
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: Globe,
    title: "International Student Aid",
    amount: "$2,000 - $10,000",
    description: "Specialized support for international students including visa and living expense assistance.",
    coverage: ["Visa fees", "Living expenses", "Travel costs", "Cultural integration"],
    requirements: "1,500+ CELF tokens",
    duration: "1 academic year",
    availability: "30 per year",
    color: "from-green-500/20 to-green-500/5"
  }
];

const scholarshipStats = [
  {
    icon: DollarSign,
    number: "$2.5M+",
    label: "Total Awarded",
    description: "In scholarships since 2016"
  },
  {
    icon: Users,
    number: "150+",
    label: "Recipients",
    description: "Students funded globally"
  },
  {
    icon: Clock,
    number: "95%",
    label: "Success Rate",
    description: "Students completing programs"
  },
  {
    icon: Award,
    number: "25+",
    label: "Countries",
    description: "Students from worldwide"
  }
];

export function ScholarshipTypesSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-gradient-radial from-[#9EFF00]/10 to-transparent rounded-full blur-3xl"
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
            <Award className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Scholarship Types</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Available{" "}
            <span className="text-[#9EFF00]">Scholarships</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose from various scholarship types designed to meet different educational needs and 
            financial situations. Each scholarship has specific token requirements and coverage areas.
          </p>
        </motion.div>

        {/* Scholarship Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {scholarshipTypes.map((scholarship, index) => (
            <motion.div
              key={scholarship.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${scholarship.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                      <scholarship.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="group-hover:text-[#9EFF00] transition-colors duration-300">
                          {scholarship.title}
                        </CardTitle>
                        <span className="text-lg font-bold text-[#9EFF00]">
                          {scholarship.amount}
                        </span>
                      </div>
                      <CardDescription className="leading-relaxed">
                        {scholarship.description}
                      </CardDescription>
                    </div>
                  </div>

                  {/* Coverage */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3">Coverage Includes:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {scholarship.coverage.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-[#9EFF00] rounded-full flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 gap-3 pt-4 border-t border-gray-700/50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Token Requirement:</span>
                      <span className="text-white font-medium">{scholarship.requirements}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-gray-300">{scholarship.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Available:</span>
                      <span className="text-[#9EFF00] font-medium">{scholarship.availability}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Scholarship Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Scholarship Impact
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              See the real impact our scholarship program has made in transforming lives and creating educational opportunities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {scholarshipStats.map((stat, index) => (
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
      </div>
    </section>
  );
}
