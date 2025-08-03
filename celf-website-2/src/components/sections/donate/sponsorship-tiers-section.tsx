"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Star, 
  Crown, 
  Award,
  Building,
  ArrowRight,
  CheckCircle,
  Users,
  Globe,
  Zap,
  Heart,
  Target,
  Trophy
} from "lucide-react";

const sponsorshipTiers = [
  {
    name: "Bronze Partner",
    icon: Award,
    amount: "$1,000 - $4,999",
    duration: "Annual",
    description: "Perfect for small businesses and organizations looking to make a meaningful impact on education.",
    color: "from-amber-600/20 to-amber-600/5",
    borderColor: "border-amber-600/30",
    popular: false,
    benefits: [
      "Logo on website sponsor page",
      "Recognition in quarterly newsletter",
      "Annual impact report with your contribution",
      "Social media recognition (2x per year)",
      "Certificate of partnership",
      "Tax-deductible receipt"
    ],
    impact: "Supports 5-20 students annually",
    commitment: "1 year minimum"
  },
  {
    name: "Silver Partner",
    icon: Star,
    amount: "$5,000 - $14,999",
    duration: "Annual",
    description: "Ideal for growing companies wanting to demonstrate corporate social responsibility and community impact.",
    color: "from-gray-400/20 to-gray-400/5",
    borderColor: "border-gray-400/30",
    popular: true,
    benefits: [
      "All Bronze Partner benefits",
      "Logo on website homepage",
      "Featured story in newsletter (quarterly)",
      "Social media recognition (monthly)",
      "Invitation to exclusive donor events",
      "Custom impact dashboard access",
      "Co-branded content opportunities"
    ],
    impact: "Supports 20-60 students annually",
    commitment: "1 year minimum"
  },
  {
    name: "Gold Partner",
    icon: Crown,
    amount: "$15,000 - $49,999",
    duration: "Annual",
    description: "For established organizations committed to transforming education and creating lasting change globally.",
    color: "from-yellow-500/20 to-yellow-500/5",
    borderColor: "border-yellow-500/30",
    popular: false,
    benefits: [
      "All Silver Partner benefits",
      "Premium logo placement on all materials",
      "Dedicated account manager",
      "Quarterly strategy meetings",
      "Speaking opportunities at CELF events",
      "Custom scholarship program naming rights",
      "Employee volunteer opportunities",
      "Press release collaboration"
    ],
    impact: "Supports 60-200 students annually",
    commitment: "2 year minimum"
  },
  {
    name: "Platinum Partner",
    icon: Trophy,
    amount: "$50,000+",
    duration: "Annual",
    description: "Our highest tier for visionary organizations leading the future of global education and student empowerment.",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5",
    borderColor: "border-[#9EFF00]/40",
    popular: false,
    benefits: [
      "All Gold Partner benefits",
      "Title sponsor opportunities",
      "Board advisory position (optional)",
      "Custom program development",
      "Global event speaking platforms",
      "Dedicated impact measurement team",
      "Executive mentorship program access",
      "Annual recognition gala invitation",
      "Custom research collaboration"
    ],
    impact: "Supports 200+ students annually",
    commitment: "3 year minimum"
  }
];

const corporateBenefits = [
  {
    icon: Building,
    title: "Brand Visibility",
    description: "Showcase your commitment to education across our global platform and community."
  },
  {
    icon: Users,
    title: "Employee Engagement",
    description: "Provide meaningful volunteer opportunities and team building experiences."
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Make a measurable difference in students' lives across 25+ countries."
  },
  {
    icon: Target,
    title: "CSR Goals",
    description: "Achieve corporate social responsibility objectives with transparent impact tracking."
  }
];

export function SponsorshipTiersSection() {
  return (
    <section id="sponsorship-tiers" className="py-20 lg:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Sponsorship{" "}
            <span className="text-[#9EFF00]">Tiers</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Partner with CELF to amplify your impact on global education. Our sponsorship tiers 
            offer meaningful benefits while creating lasting change in students' lives.
          </p>
        </motion.div>

        {/* Sponsorship Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {sponsorshipTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full group cursor-pointer border-[#9EFF00]/20 hover:${tier.borderColor} transition-colors duration-300 relative`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#9EFF00] text-black text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  {/* Tier Header */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                      <tier.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#9EFF00] transition-colors duration-300">
                        {tier.name}
                      </h3>
                      <div className="text-2xl font-bold text-[#9EFF00] mb-2">{tier.amount}</div>
                      <div className="text-sm text-gray-400">{tier.duration}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Impact and Commitment */}
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="p-3 bg-[#9EFF00]/10 border border-[#9EFF00]/20 rounded-lg">
                      <div className="text-sm font-medium text-[#9EFF00] mb-1">Impact:</div>
                      <div className="text-sm text-gray-300">{tier.impact}</div>
                    </div>
                    <div className="p-3 bg-gray-800/30 border border-gray-700/50 rounded-lg">
                      <div className="text-sm font-medium text-white mb-1">Commitment:</div>
                      <div className="text-sm text-gray-300">{tier.commitment}</div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white mb-3">Benefits Include:</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {tier.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-sm text-gray-300">
                          <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link href="/contact" className="group">
                      Become a {tier.name}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Corporate Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Why Partner with CELF?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corporateBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <h4 className="font-semibold text-white mb-3">{benefit.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Custom Sponsorship CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Need a Custom Partnership?
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We understand that every organization has unique goals and capabilities. 
              Let's create a custom sponsorship package that aligns with your objectives and maximizes impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h4 className="font-semibold text-white mb-2">Flexible Terms</h4>
              <p className="text-gray-300 text-sm">
                Customized commitment periods and payment structures
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h4 className="font-semibold text-white mb-2">Targeted Impact</h4>
              <p className="text-gray-300 text-sm">
                Focus your support on specific regions, programs, or student demographics
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h4 className="font-semibold text-white mb-2">Meaningful Recognition</h4>
              <p className="text-gray-300 text-sm">
                Tailored recognition and branding opportunities that align with your values
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact" className="group">
                Discuss Custom Partnership
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="#impact">View Our Impact</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
