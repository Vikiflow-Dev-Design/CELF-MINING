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
  Clock,
  Mail
} from "lucide-react";

const contactFAQs = [
  {
    question: "How quickly will I receive a response to my inquiry?",
    answer: "Response times vary by contact method: Live chat responses are typically under 2 minutes during business hours, email inquiries are answered within 24 hours, and community forum questions usually get responses within 30 minutes from fellow students or mentors."
  },
  {
    question: "What information should I include when contacting support?",
    answer: "Please include your full name, email address associated with your CELF account, a detailed description of your issue or question, any error messages you've encountered, and screenshots if applicable. This helps us provide faster and more accurate assistance."
  },
  {
    question: "Can I schedule a phone call or video meeting?",
    answer: "Yes! We offer scheduled video calls for complex issues or personalized guidance. You can book a session through our scheduling system, and we'll send you a calendar invite with the meeting link. These sessions are available during business hours."
  },
  {
    question: "Is support available in languages other than English?",
    answer: "We provide support in multiple languages including Spanish, French, German, Portuguese, and Mandarin. Our community forum also has language-specific sections where you can get help from native speakers in your preferred language."
  },
  {
    question: "What if my issue is urgent or time-sensitive?",
    answer: "For urgent matters, use our live chat during business hours or post in our community forum which has 24/7 activity. For scholarship application deadlines or technical issues preventing app access, mark your inquiry as 'urgent' and we'll prioritize your request."
  },
  {
    question: "How do I provide feedback about CELF services?",
    answer: "We welcome all feedback! You can send suggestions through our contact form, email us directly at feedback@celf.foundation, or participate in our monthly community feedback sessions. Your input helps us improve our services for all students."
  }
];

export function FAQContactSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Contact{" "}
            <span className="text-[#9EFF00]">FAQ</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Quick answers to common questions about contacting CELF support and getting help with your inquiries.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              {contactFAQs.map((faq, index) => {
                const isOpen = openItems.includes(index);

                return (
                  <div key={index} className="border border-gray-700/50 rounded-lg overflow-hidden bg-gray-900/30">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors duration-200"
                    >
                      <span className="text-white font-medium pr-4 leading-relaxed">{faq.question}</span>
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
                          <div className="px-6 pb-4 pt-2 text-gray-300 leading-relaxed border-t border-gray-700/30">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quick Contact Card */}
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Still Have Questions?
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Can't find the answer you're looking for? Our support team is ready to help you with any questions or concerns.
                </p>

                <div className="space-y-4">
                  <Button asChild className="w-full">
                    <Link href="#contact-form" className="group">
                      Send Us a Message
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  
                  <Button variant="secondary" asChild className="w-full">
                    <Link href="/community">Join Community Forum</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Response Time Info */}
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Response Times
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-[#9EFF00]" />
                    <div>
                      <div className="text-white font-medium">Live Chat</div>
                      <div className="text-gray-400 text-sm">Under 2 minutes</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-[#9EFF00]" />
                    <div>
                      <div className="text-white font-medium">Email Support</div>
                      <div className="text-gray-400 text-sm">Within 24 hours</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-5 w-5 text-[#9EFF00]" />
                    <div>
                      <div className="text-white font-medium">Community Forum</div>
                      <div className="text-gray-400 text-sm">Under 30 minutes</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-[#9EFF00]" />
                    <div>
                      <div className="text-white font-medium">Video Calls</div>
                      <div className="text-gray-400 text-sm">Same day scheduling</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-gradient-to-br from-red-900/20 to-red-800/20 border-red-500/30">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Emergency Support
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  For urgent scholarship deadlines or critical technical issues that prevent app access, 
                  mark your inquiry as "urgent" or use our emergency contact.
                </p>
                <div className="text-sm text-red-400">
                  Emergency: urgent@celf.foundation
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Need More Help?
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Explore our comprehensive documentation, join our active community, or browse our complete FAQ section for detailed answers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/docs">View Documentation</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/how-it-works#faq">Complete FAQ</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
