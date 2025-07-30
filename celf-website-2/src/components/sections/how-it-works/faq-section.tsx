"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  ArrowRight,
  MessageCircle,
  Book,
  Users
} from "lucide-react";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I start mining CELF tokens?",
        answer: "Download the CELF mobile app from the App Store or Google Play, create your account, and tap the mining button to start your first 1-hour session. You'll earn 0.125 CELF tokens per hour of mining."
      },
      {
        question: "Is CELF mining really free?",
        answer: "Yes, CELF mining is completely free. You only need a smartphone and internet connection. There are no fees, subscriptions, or hidden costs to participate in the CELF ecosystem."
      },
      {
        question: "How long does it take to qualify for a scholarship?",
        answer: "Most students qualify for scholarships after 6-8 months of consistent mining, which typically results in 1,000+ CELF tokens. However, the exact time depends on your mining consistency and community participation."
      }
    ]
  },
  {
    category: "Token Mining",
    questions: [
      {
        question: "Why is the mining rate the same for everyone?",
        answer: "CELF uses a fair, equal mining rate of 0.125 tokens per hour for all users to ensure no one has an unfair advantage. This creates a merit-based system where success depends on consistency and effort, not resources."
      },
      {
        question: "Can I mine tokens on multiple devices?",
        answer: "No, each user account is limited to one active mining session at a time. This prevents abuse and ensures fair distribution. You can switch between devices, but only one can mine at a time."
      },
      {
        question: "What happens if I miss mining sessions?",
        answer: "Missing occasional sessions won't disqualify you, but consistency is important for scholarship applications. Regular mining demonstrates commitment and is valued by the scholarship committee."
      }
    ]
  },
  {
    category: "Scholarships",
    questions: [
      {
        question: "What types of scholarships are available?",
        answer: "CELF offers Full Tuition Scholarships ($5K-$25K), Partial Tuition Support ($1K-$5K), Technology Grants ($500-$2K), and International Student Aid ($2K-$10K). Each has different token requirements and coverage areas."
      },
      {
        question: "Can I apply for multiple scholarships?",
        answer: "You can apply for one scholarship at a time. If unsuccessful, you can reapply after 6 months. Previous recipients must wait 2 years before applying again to give others opportunities."
      },
      {
        question: "How are scholarship recipients selected?",
        answer: "Selection is based on token accumulation, community participation, educational goals, and application completeness. The process is transparent and merit-based, with no bias or discrimination."
      }
    ]
  },
  {
    category: "Technical",
    questions: [
      {
        question: "Is my personal data secure?",
        answer: "Yes, CELF uses enterprise-grade security with 256-bit encryption, secure blockchain technology, and regular security audits. Your personal data is protected and never sold to third parties."
      },
      {
        question: "What blockchain does CELF use?",
        answer: "CELF tokens are built on Ethereum-compatible blockchain infrastructure, ensuring security, transparency, and interoperability with existing blockchain ecosystems."
      },
      {
        question: "Can I transfer my CELF tokens to other wallets?",
        answer: "CELF tokens are designed specifically for scholarship qualification within the CELF ecosystem. They cannot be transferred to external wallets or traded on exchanges, maintaining their educational purpose."
      }
    ]
  }
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
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
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#9EFF00]/20 to-transparent rounded-full blur-3xl"
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
            <HelpCircle className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Frequently Asked Questions</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Got{" "}
            <span className="text-[#9EFF00]">Questions</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find answers to the most common questions about CELF, token mining, scholarships, 
            and how our innovative education funding system works.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#9EFF00] rounded-full" />
                    <span>{category.category}</span>
                  </h3>

                  <div className="space-y-4">
                    {category.questions.map((faq, index) => {
                      const itemId = `${categoryIndex}-${index}`;
                      const isOpen = openItems.includes(itemId);

                      return (
                        <div key={index} className="border border-gray-700/50 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleItem(itemId)}
                            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors duration-200"
                          >
                            <span className="text-white font-medium pr-4">{faq.question}</span>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-[#9EFF00] flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>
                          
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-2 text-gray-300 leading-relaxed border-t border-gray-700/30">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Still Need Help?
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our community and support team are here to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                <Users className="h-8 w-8 text-[#9EFF00]" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">
                Join Community
              </h4>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Connect with other students and get help from experienced community members.
              </p>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/community">Join Now</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                <Book className="h-8 w-8 text-[#9EFF00]" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">
                Documentation
              </h4>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Explore detailed guides and documentation for all CELF features and processes.
              </p>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/docs">Read Docs</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                <MessageCircle className="h-8 w-8 text-[#9EFF00]" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">
                Contact Support
              </h4>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Get direct help from our support team for technical issues or account questions.
              </p>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/support">Get Support</Link>
              </Button>
            </motion.div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#9EFF00]/20 text-center">
            <h4 className="text-xl font-bold text-white mb-4">
              Ready to Get Started?
            </h4>
            <p className="text-gray-300 mb-6">
              Download the CELF app and begin your journey toward educational funding today.
            </p>
            <Button size="lg" asChild>
              <Link href="/download" className="group">
                Download CELF App
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
