"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { 
  ChevronDown, 
  Search, 
  Zap, 
  Smartphone, 
  GraduationCap, 
  Users,
  CreditCard,
  Shield
} from "lucide-react";

const faqCategories = [
  {
    category: "Getting Started",
    icon: Zap,
    color: "text-[#9EFF00]",
    questions: [
      {
        question: "How do I create a CELF account?",
        answer: "Creating a CELF account is simple! Download our mobile app from the App Store or Google Play, tap 'Sign Up', enter your email and create a secure password. You'll need to verify your email address and complete a brief profile setup to start mining tokens."
      },
      {
        question: "What is CELF token mining?",
        answer: "CELF token mining is our innovative approach to earning educational scholarships. Instead of traditional exams, you mine CELF tokens through our mobile app by completing educational activities, maintaining consistent engagement, and participating in our community. These tokens can then be used to qualify for scholarships."
      },
      {
        question: "How long does it take to start earning tokens?",
        answer: "You can start earning tokens immediately after completing your account setup! Your first mining session begins as soon as you verify your account and complete the onboarding tutorial, which takes about 5-10 minutes."
      }
    ]
  },
  {
    category: "Mining & Tokens",
    icon: Zap,
    color: "text-yellow-400",
    questions: [
      {
        question: "How does the mining process work?",
        answer: "Mining involves opening the CELF app daily and maintaining an active session. The app uses a proof-of-engagement algorithm that rewards consistent participation, educational content consumption, and community interaction. Mining sessions typically last 24 hours and automatically renew."
      },
      {
        question: "Why did my mining stop?",
        answer: "Mining can stop for several reasons: your 24-hour session expired, you haven't opened the app in over 24 hours, there's a connectivity issue, or your account needs verification. Simply open the app and tap the mining button to restart your session."
      },
      {
        question: "How many tokens can I earn per day?",
        answer: "Token earnings vary based on your mining rate, which increases with consistent participation, referrals, and achievements. New users typically start at 0.5 tokens/hour, but this can increase up to 2.0 tokens/hour or more with active engagement."
      }
    ]
  },
  {
    category: "App & Technical",
    icon: Smartphone,
    color: "text-blue-400",
    questions: [
      {
        question: "The app won't open or keeps crashing",
        answer: "Try these steps: 1) Force close and restart the app, 2) Restart your device, 3) Check for app updates in your app store, 4) Ensure you have a stable internet connection, 5) Clear the app cache (Android) or reinstall the app if issues persist."
      },
      {
        question: "I'm not receiving push notifications",
        answer: "Check your device notification settings: Go to Settings > Notifications > CELF and ensure notifications are enabled. Also verify that 'Do Not Disturb' mode isn't blocking notifications. In the CELF app, check Settings > Notifications to customize your preferences."
      },
      {
        question: "My mining session isn't updating",
        answer: "This usually indicates a connectivity issue. Ensure you have a stable internet connection, try switching between WiFi and mobile data, and force close and reopen the app. If the issue persists, contact support with your account details."
      }
    ]
  },
  {
    category: "Scholarships",
    icon: GraduationCap,
    color: "text-purple-400",
    questions: [
      {
        question: "How do I qualify for scholarships?",
        answer: "Scholarship qualification is based on your accumulated CELF tokens, consistent mining activity, academic achievements, and community participation. Different scholarship tiers have different token requirements, typically ranging from 1,000 to 10,000 tokens."
      },
      {
        question: "When are scholarship applications reviewed?",
        answer: "We review scholarship applications quarterly (March, June, September, December). Applications must be submitted at least 30 days before the review period. Winners are notified within 60 days of the review period."
      },
      {
        question: "Can I apply for multiple scholarships?",
        answer: "Yes! You can apply for multiple scholarships as long as you meet the individual requirements for each. However, you can only receive one scholarship award per academic year to ensure fair distribution among our community."
      }
    ]
  }
];

export function FAQSupportSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredCategories = faqCategories.filter(category => {
    if (selectedCategory && category.category !== selectedCategory) return false;
    if (!searchQuery) return true;
    
    return category.questions.some(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <section className="py-24 bg-gradient-to-br from-[#0A0A0A] to-[#0F0F0F] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#9EFF00]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-3xl" />
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
            Frequently Asked{" "}
            <span className="text-[#9EFF00] drop-shadow-[0_0_30px_rgba(158,255,0,0.3)]">Questions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Quick answers to the most common questions about CELF, token mining, 
            scholarships, and our platform.
          </p>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-gray-900/50 border-gray-700 rounded-xl focus:border-[#9EFF00] focus:ring-[#9EFF00] text-white placeholder-gray-400"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  !selectedCategory 
                    ? 'bg-[#9EFF00] text-black' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                All Categories
              </button>
              {faqCategories.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setSelectedCategory(category.category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.category 
                      ? 'bg-[#9EFF00] text-black' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center">
                      <category.icon className={`h-5 w-5 ${category.color}`} />
                    </div>
                    <span>{category.category}</span>
                  </h3>

                  <div className="space-y-4">
                    {category.questions.map((faq, index) => {
                      const itemId = `${categoryIndex}-${index}`;
                      const isOpen = openItems.includes(itemId);
                      
                      // Filter questions based on search
                      if (searchQuery && 
                          !faq.question.toLowerCase().includes(searchQuery.toLowerCase()) &&
                          !faq.answer.toLowerCase().includes(searchQuery.toLowerCase())) {
                        return null;
                      }

                      return (
                        <div key={index} className="border border-gray-800 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleItem(itemId)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors duration-200"
                          >
                            <span className="text-white font-medium pr-4">{faq.question}</span>
                            <ChevronDown 
                              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                              }`} 
                            />
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
                                <div className="px-6 pb-4 text-gray-300 leading-relaxed border-t border-gray-800">
                                  <div className="pt-4">
                                    {faq.answer}
                                  </div>
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

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or browse all categories
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="px-6 py-3 bg-[#9EFF00] text-black font-semibold rounded-lg hover:bg-[#8FEF00] transition-colors duration-200"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
