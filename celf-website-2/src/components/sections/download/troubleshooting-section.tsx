"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  HelpCircle,
  Download,
  Smartphone,
  Wifi,
  Battery,
  Settings,
  RefreshCw,
  MessageCircle,
  ExternalLink
} from "lucide-react";

const troubleshootingFAQs = [
  {
    category: "Download Issues",
    icon: Download,
    questions: [
      {
        question: "App won't download from the App Store/Google Play",
        answer: "Check your internet connection and ensure you have enough storage space. Try restarting your device and attempting the download again. If the issue persists, try downloading using a different network (Wi-Fi vs cellular).",
        steps: ["Check internet connection", "Verify storage space (need 200MB+)", "Restart device", "Try different network", "Clear app store cache"]
      },
      {
        question: "Download keeps failing or stopping",
        answer: "This usually indicates a network issue or insufficient storage. Ensure you have a stable internet connection and at least 200MB of free space. Try downloading during off-peak hours for better speeds.",
        steps: ["Check available storage", "Use stable Wi-Fi connection", "Close other apps", "Try downloading later", "Restart your router"]
      }
    ]
  },
  {
    category: "Installation Problems",
    icon: Smartphone,
    questions: [
      {
        question: "App won't install after downloading",
        answer: "This could be due to insufficient storage, incompatible device, or corrupted download. Check system requirements and try downloading again.",
        steps: ["Verify device compatibility", "Check storage space", "Delete and re-download", "Restart device", "Update your OS"]
      },
      {
        question: "Installation stuck or frozen",
        answer: "Force close the installation process, restart your device, and try again. Ensure no other apps are installing simultaneously.",
        steps: ["Force close installation", "Restart device", "Clear app store cache", "Try installing one app at a time", "Check for OS updates"]
      }
    ]
  },
  {
    category: "App Performance",
    icon: Settings,
    questions: [
      {
        question: "App is slow or laggy",
        answer: "Close background apps, restart the CELF app, and ensure your device meets the recommended requirements. Consider restarting your device if performance issues persist.",
        steps: ["Close background apps", "Restart CELF app", "Restart device", "Check available RAM", "Update to latest version"]
      },
      {
        question: "App crashes or closes unexpectedly",
        answer: "Update to the latest version, restart your device, and ensure you have sufficient storage. If crashes continue, contact support with your device details.",
        steps: ["Update app", "Restart device", "Clear app cache", "Check storage space", "Report crash to support"]
      }
    ]
  },
  {
    category: "Connection Issues",
    icon: Wifi,
    questions: [
      {
        question: "Can't connect to CELF servers",
        answer: "Check your internet connection and try switching between Wi-Fi and cellular data. The app requires a stable internet connection for token synchronization.",
        steps: ["Check internet connection", "Switch network types", "Restart router/modem", "Disable VPN if active", "Try again later"]
      },
      {
        question: "Mining sessions not syncing",
        answer: "Ensure you have a stable internet connection. Mining data will sync automatically when connection is restored. Check the sync status in app settings.",
        steps: ["Check connection status", "Force sync in settings", "Restart app", "Wait for auto-sync", "Contact support if persistent"]
      }
    ]
  }
];

const quickFixes = [
  {
    icon: RefreshCw,
    title: "Restart the App",
    description: "Close CELF completely and reopen it",
    success: "Fixes 60% of common issues"
  },
  {
    icon: Smartphone,
    title: "Restart Your Device",
    description: "Power off and on your phone",
    success: "Resolves 80% of performance issues"
  },
  {
    icon: Download,
    title: "Update the App",
    description: "Check app store for latest version",
    success: "Fixes compatibility problems"
  },
  {
    icon: Wifi,
    title: "Check Internet",
    description: "Ensure stable Wi-Fi or cellular connection",
    success: "Resolves sync and connection issues"
  }
];

const supportOptions = [
  {
    title: "Community Forum",
    description: "Get help from fellow users and moderators",
    icon: MessageCircle,
    href: "/community",
    responseTime: "Usually within 30 minutes"
  },
  {
    title: "Contact Support",
    description: "Direct help from our technical team",
    icon: HelpCircle,
    href: "/contact",
    responseTime: "Within 24 hours"
  },
  {
    title: "Installation Guide",
    description: "Detailed step-by-step installation help",
    icon: Download,
    href: "/installation-guide",
    responseTime: "Instant access"
  }
];

export function TroubleshootingSection() {
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
            <AlertTriangle className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Troubleshooting</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Need{" "}
            <span className="text-[#9EFF00]">Help</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Having trouble downloading or using the CELF app? Find solutions to common issues 
            and get back to mining tokens quickly.
          </p>
        </motion.div>

        {/* Quick Fixes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Try These Quick Fixes First
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickFixes.map((fix, index) => (
              <motion.div
                key={fix.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                      <fix.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#9EFF00] transition-colors duration-300">
                      {fix.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      {fix.description}
                    </p>
                    <div className="text-xs text-[#9EFF00] bg-[#9EFF00]/10 rounded-full px-3 py-1">
                      {fix.success}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Troubleshooting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Detailed Troubleshooting
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {troubleshootingFAQs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center">
                        <category.icon className="h-5 w-5 text-[#9EFF00]" />
                      </div>
                      <h4 className="text-xl font-bold text-white">{category.category}</h4>
                    </div>

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
                              <span className="text-white font-medium pr-4 text-sm">{faq.question}</span>
                              {isOpen ? (
                                <ChevronUp className="h-4 w-4 text-[#9EFF00] flex-shrink-0" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
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
                                  <div className="px-4 pb-4 pt-2 border-t border-gray-700/30">
                                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                      {faq.answer}
                                    </p>
                                    <div>
                                      <h5 className="text-white font-medium text-xs mb-2">Steps to try:</h5>
                                      <ol className="space-y-1">
                                        {faq.steps.map((step, stepIndex) => (
                                          <li key={stepIndex} className="text-gray-400 text-xs flex items-start space-x-2">
                                            <span className="text-[#9EFF00] font-bold">{stepIndex + 1}.</span>
                                            <span>{step}</span>
                                          </li>
                                        ))}
                                      </ol>
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
        </motion.div>

        {/* Support Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Still Need Help?
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Can't find a solution? Our support team and community are here to help you get CELF working perfectly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={option.href} className="block group">
                  <Card className="h-full border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                        <option.icon className="h-6 w-6 text-[#9EFF00]" />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#9EFF00] transition-colors duration-300">
                        {option.title}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        {option.description}
                      </p>
                      <div className="text-xs text-[#9EFF00] bg-[#9EFF00]/10 rounded-full px-3 py-1 inline-flex items-center space-x-1">
                        <span>{option.responseTime}</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-[#9EFF00]/20 text-center">
            <h4 className="text-lg font-bold text-white mb-3">
              Emergency Support
            </h4>
            <p className="text-gray-300 text-sm mb-4">
              For urgent issues preventing app access during scholarship deadlines, 
              contact our emergency support line.
            </p>
            <Button variant="secondary" asChild>
              <Link href="mailto:urgent@celf.foundation">Emergency Contact</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
