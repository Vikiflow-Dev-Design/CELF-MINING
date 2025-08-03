"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Heart, 
  Calendar, 
  Gift,
  Users,
  ArrowRight,
  CheckCircle,
  DollarSign,
  CreditCard,
  Repeat,
  Award
} from "lucide-react";

const donationOptions = [
  {
    icon: Heart,
    title: "One-Time Donation",
    description: "Make a single contribution to support students immediately and see direct impact.",
    amounts: ["$25", "$50", "$100", "$250", "$500", "Custom"],
    impact: "Supports 1-5 students with educational resources",
    features: [
      "Immediate impact on student lives",
      "Tax-deductible receipt provided",
      "Impact report within 30 days",
      "Recognition in donor newsletter",
      "Option to remain anonymous"
    ],
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5",
    borderColor: "border-[#9EFF00]/30",
    popular: false
  },
  {
    icon: Calendar,
    title: "Monthly Giving",
    description: "Provide ongoing support with automatic monthly donations for sustained impact.",
    amounts: ["$10/mo", "$25/mo", "$50/mo", "$100/mo", "$250/mo", "Custom"],
    impact: "Supports 2-10 students continuously",
    features: [
      "Sustained support for student success",
      "Lower processing fees = more impact",
      "Quarterly detailed impact reports",
      "Exclusive donor community access",
      "Cancel or modify anytime"
    ],
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    popular: true
  },
  {
    icon: Gift,
    title: "Memorial & Honor Gifts",
    description: "Donate in memory of a loved one or to honor someone special in your life.",
    amounts: ["$100", "$250", "$500", "$1,000", "$2,500", "Custom"],
    impact: "Creates lasting legacy for education",
    features: [
      "Personalized memorial certificate",
      "Notification sent to honoree/family",
      "Dedicated memorial page option",
      "Annual remembrance in newsletter",
      "Special recognition opportunities"
    ],
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    popular: false
  },
  {
    icon: Users,
    title: "Group Fundraising",
    description: "Organize a fundraising campaign with friends, family, or colleagues.",
    amounts: ["$500", "$1,000", "$2,500", "$5,000", "$10,000", "Custom"],
    impact: "Supports entire student cohorts",
    features: [
      "Custom fundraising page creation",
      "Team progress tracking dashboard",
      "Social sharing tools included",
      "Group recognition opportunities",
      "Dedicated support coordinator"
    ],
    color: "from-green-500/20 to-green-500/5",
    borderColor: "border-green-500/30",
    popular: false
  }
];

const paymentMethods = [
  {
    icon: CreditCard,
    name: "Credit/Debit Card",
    description: "Visa, Mastercard, American Express",
    processing: "Instant"
  },
  {
    icon: DollarSign,
    name: "Bank Transfer",
    description: "Direct bank account transfer",
    processing: "1-3 business days"
  },
  {
    icon: Gift,
    name: "PayPal",
    description: "Secure PayPal payments",
    processing: "Instant"
  },
  {
    icon: Award,
    name: "Cryptocurrency",
    description: "Bitcoin, Ethereum, and more",
    processing: "Network dependent"
  }
];

export function DonationOptionsSection() {
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
            Ways to{" "}
            <span className="text-[#9EFF00]">Give</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose the donation option that works best for you. Every contribution, 
            no matter the size, makes a meaningful difference in a student's life.
          </p>
        </motion.div>

        {/* Donation Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {donationOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full group cursor-pointer border-[#9EFF00]/20 hover:${option.borderColor} transition-colors duration-300 relative`}>
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#9EFF00] text-black text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                      <option.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#9EFF00] transition-colors duration-300">
                        {option.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </div>

                  {/* Suggested Amounts */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white mb-3">Suggested Amounts:</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {option.amounts.map((amount, idx) => (
                        <div key={idx} className="text-center p-2 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-[#9EFF00]/30 transition-colors duration-200">
                          <span className="text-sm text-[#9EFF00] font-medium">{amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="mb-6 p-4 bg-[#9EFF00]/10 border border-[#9EFF00]/20 rounded-lg">
                    <div className="text-sm font-medium text-[#9EFF00] mb-1">Impact:</div>
                    <div className="text-sm text-gray-300">{option.impact}</div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white mb-3">Features:</h4>
                    <div className="space-y-2">
                      {option.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-sm text-gray-300">
                          <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link href="#donation-form" className="group">
                      Choose This Option
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Secure Payment Methods
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <method.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">{method.name}</h4>
                    <p className="text-gray-300 text-sm mb-2">{method.description}</p>
                    <div className="text-xs text-[#9EFF00]">Processing: {method.processing}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security and Trust */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Your Donation is Secure
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We use industry-leading security measures to protect your personal and financial information. 
              Your generosity is safe with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h4 className="font-semibold text-white mb-2">SSL Encryption</h4>
              <p className="text-gray-300 text-sm">
                All transactions are protected with 256-bit SSL encryption
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h4 className="font-semibold text-white mb-2">501(c)(3) Status</h4>
              <p className="text-gray-300 text-sm">
                Registered nonprofit with full tax-deductible benefits
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Repeat className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h4 className="font-semibold text-white mb-2">100% Transparency</h4>
              <p className="text-gray-300 text-sm">
                Detailed reports on how your donation creates impact
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[#9EFF00]/20 text-center">
            <h4 className="text-lg font-bold text-white mb-3">
              Questions About Donating?
            </h4>
            <p className="text-gray-300 text-sm mb-6">
              Our team is here to help you make the most impactful donation possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="#donation-form">Start Donating</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
