"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import {
  Apple,
  Play,
  Download,
  QrCode,
  Smartphone,
  Star,
  Shield,
  Zap,
  ExternalLink,
  CheckCircle,
  Building,
} from "lucide-react";

const downloadOptions = [
  {
    platform: "iOS",
    icon: Apple,
    title: "Download for iPhone",
    subtitle: "Available on the App Store",
    version: "Version 2.1.0",
    size: "45.2 MB",
    rating: "4.8",
    reviews: "1,247",
    requirements: "iOS 13.0 or later",
    href: "#",
    qrCode: "/api/placeholder/120/120",
    color: "from-gray-600/20 to-gray-600/5",
    features: [
      "Face ID Support",
      "iOS Widgets",
      "Siri Shortcuts",
      "Apple Watch App",
    ],
  },
  {
    platform: "Android",
    icon: Play,
    title: "Download for Android",
    subtitle: "Get it on Google Play",
    version: "Version 2.1.0",
    size: "38.7 MB",
    rating: "4.7",
    reviews: "2,156",
    requirements: "Android 7.0 or later",
    href: "#",
    qrCode: "/api/placeholder/120/120",
    color: "from-green-500/20 to-green-500/5",
    features: [
      "Fingerprint Support",
      "Android Widgets",
      "Google Assistant",
      "Wear OS App",
    ],
  },
];

const downloadStats = [
  {
    icon: Download,
    number: "100K+",
    label: "Total Downloads",
    description: "Across all platforms",
  },
  {
    icon: Star,
    number: "4.8",
    label: "Average Rating",
    description: "User satisfaction",
  },
  {
    icon: Shield,
    number: "100%",
    label: "Secure",
    description: "Verified by stores",
  },
  {
    icon: Zap,
    number: "24/7",
    label: "Mining Available",
    description: "Always accessible",
  },
];

const alternativeDownloads = [
  {
    title: "Direct APK Download",
    description: "For Android users who prefer direct installation",
    icon: Download,
    href: "#",
    note: "Enable 'Unknown Sources' in settings",
  },
  {
    title: "Beta Testing Program",
    description: "Get early access to new features",
    icon: Zap,
    href: "#",
    note: "Limited spots available",
  },
  {
    title: "Enterprise Distribution",
    description: "For educational institutions",
    icon: Building,
    href: "#",
    note: "Contact us for bulk licensing",
  },
];

export function DownloadLinksSection() {
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
          <div className="inline-flex items-center space-x-2 bg-gray-900/80 border border-[#9EFF00]/30 rounded-full px-4 py-2 mb-6">
            <Download className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">
              Download Options
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Choose Your <span className="text-[#9EFF00]">Platform</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            CELF is available on both iOS and Android. Download the app that's
            right for your device and start mining tokens today.
          </p>
        </motion.div>

        {/* Download Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {downloadStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                <stat.icon className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <div className="text-2xl font-bold text-[#9EFF00] mb-1">
                {stat.number}
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                {stat.label}
              </h4>
              <p className="text-xs text-gray-400">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Download Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {downloadOptions.map((option, index) => (
            <motion.div
              key={option.platform}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}
                      >
                        <option.icon className="h-8 w-8 text-[#9EFF00]" />
                      </div>
                      <div>
                        <CardTitle className="mb-1 group-hover:text-[#9EFF00] transition-colors duration-300">
                          {option.title}
                        </CardTitle>
                        <p className="text-gray-400 text-sm">
                          {option.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2">
                        <QrCode className="h-12 w-12 text-black" />
                      </div>
                      <p className="text-xs text-gray-400">Scan to download</p>
                    </div>
                  </div>

                  {/* App Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Version</div>
                      <div className="text-white font-medium">
                        {option.version}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Size</div>
                      <div className="text-white font-medium">
                        {option.size}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Rating</div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-white font-medium">
                          {option.rating}
                        </span>
                        <span className="text-gray-400 text-sm">
                          ({option.reviews})
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        Requirements
                      </div>
                      <div className="text-white font-medium text-sm">
                        {option.requirements}
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white mb-3">
                      Platform Features:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {option.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 text-sm text-gray-300"
                        >
                          <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Download Button */}
                  <Button asChild className="w-full" size="lg">
                    <Link href={option.href} className="group">
                      <option.icon className="h-5 w-5 mr-2" />
                      Download for {option.platform}
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Alternative Downloads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Alternative Download Options
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Looking for other ways to get CELF? We offer additional download
              options for specific use cases and requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alternativeDownloads.map((alt, index) => (
              <motion.div
                key={alt.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={alt.href} className="block group">
                  <Card className="h-full border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                        <alt.icon className="h-6 w-6 text-[#9EFF00]" />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#9EFF00] transition-colors duration-300">
                        {alt.title}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        {alt.description}
                      </p>
                      <p className="text-xs text-gray-400 italic">{alt.note}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-[#9EFF00]/20 text-center">
            <h4 className="text-lg font-bold text-white mb-3">
              Need Help with Installation?
            </h4>
            <p className="text-gray-300 mb-4">
              Check our installation guide or contact support if you encounter
              any issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" asChild>
                <Link href="/installation-guide">Installation Guide</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
