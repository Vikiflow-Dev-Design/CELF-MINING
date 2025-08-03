"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Heart, CreditCard, CheckCircle, ArrowRight, Shield } from "lucide-react";

const donationAmounts = [
  { amount: 25, impact: "Provides study materials for 1 student" },
  { amount: 50, impact: "Supports mentorship for 1 month" },
  { amount: 100, impact: "Funds scholarship application support" },
  { amount: 250, impact: "Sponsors a student's educational resources" },
  { amount: 500, impact: "Supports 5 students for a full month" },
];

export function DonationFormSection() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate donation processing
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <section id="donation-form" className="py-20 lg:py-32 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-12">
                <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-[#9EFF00]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Thank You!</h3>
                <p className="text-lg text-gray-300 mb-6">
                  Your generous donation will make a real difference in students' lives. 
                  You'll receive a confirmation email with your tax-deductible receipt shortly.
                </p>
                <Button onClick={() => setIsSubmitted(false)}>
                  Make Another Donation
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="donation-form" className="py-20 lg:py-32 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Make Your{" "}
            <span className="text-[#9EFF00]">Donation</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your contribution directly supports students worldwide. Choose your amount and see the immediate impact you'll make.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
            <CardContent className="p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Donation Type */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Donation Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setDonationType("one-time")}
                      className={`p-4 rounded-lg border transition-colors duration-300 ${
                        donationType === "one-time" 
                          ? 'border-[#9EFF00]/60 bg-[#9EFF00]/10' 
                          : 'border-gray-700/50 hover:border-[#9EFF00]/30'
                      }`}
                    >
                      <div className="text-left">
                        <div className="font-semibold text-white mb-1">One-Time Donation</div>
                        <div className="text-sm text-gray-300">Make a single contribution</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonationType("monthly")}
                      className={`p-4 rounded-lg border transition-colors duration-300 ${
                        donationType === "monthly" 
                          ? 'border-[#9EFF00]/60 bg-[#9EFF00]/10' 
                          : 'border-gray-700/50 hover:border-[#9EFF00]/30'
                      }`}
                    >
                      <div className="text-left">
                        <div className="font-semibold text-white mb-1">Monthly Giving</div>
                        <div className="text-sm text-gray-300">Ongoing monthly support</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    Select Amount {donationType === "monthly" && "(per month)"}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                    {donationAmounts.map((option) => (
                      <button
                        key={option.amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(option.amount);
                          setCustomAmount("");
                        }}
                        className={`p-4 rounded-lg border transition-colors duration-300 ${
                          selectedAmount === option.amount && !customAmount
                            ? 'border-[#9EFF00]/60 bg-[#9EFF00]/10' 
                            : 'border-gray-700/50 hover:border-[#9EFF00]/30'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#9EFF00]">${option.amount}</div>
                          <div className="text-xs text-gray-400 mt-1">{option.impact}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Custom Amount</label>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(0);
                      }}
                      placeholder="Enter custom amount"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-[#9EFF00]/50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Impact Preview */}
                <div className="p-4 bg-[#9EFF00]/10 border border-[#9EFF00]/20 rounded-lg">
                  <div className="text-sm font-medium text-[#9EFF00] mb-1">Your Impact:</div>
                  <div className="text-sm text-gray-300">
                    {customAmount 
                      ? `Your $${customAmount} donation will help support ${Math.floor(parseInt(customAmount) / 25)} students with educational resources.`
                      : donationAmounts.find(a => a.amount === selectedAmount)?.impact || "Select an amount to see your impact"
                    }
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-[#9EFF00]/50 focus:outline-none"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-[#9EFF00]/50 focus:outline-none"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-[#9EFF00]/50 focus:outline-none"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Shield className="h-4 w-4 text-[#9EFF00]" />
                  <span>Your donation is secure and encrypted. We never store payment information.</span>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting || (!selectedAmount && !customAmount)}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing Donation...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5" />
                      <span>
                        Donate ${customAmount || selectedAmount} {donationType === "monthly" && "Monthly"}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
