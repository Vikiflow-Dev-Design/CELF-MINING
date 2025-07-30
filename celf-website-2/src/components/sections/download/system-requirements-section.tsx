"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  Smartphone, 
  Apple, 
  Play, 
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Shield,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

const systemRequirements = [
  {
    platform: "iOS",
    icon: Apple,
    color: "from-gray-600/20 to-gray-600/5",
    requirements: {
      minimum: {
        os: "iOS 13.0 or later",
        device: "iPhone 6s or newer",
        storage: "100 MB free space",
        ram: "2 GB RAM",
        network: "Wi-Fi or cellular data"
      },
      recommended: {
        os: "iOS 15.0 or later",
        device: "iPhone 8 or newer",
        storage: "200 MB free space",
        ram: "3 GB RAM",
        network: "Wi-Fi connection"
      }
    },
    features: [
      "Face ID / Touch ID support",
      "iOS Widgets",
      "Siri Shortcuts",
      "Apple Watch companion",
      "Background app refresh"
    ],
    compatibility: [
      "iPhone 6s and later",
      "iPad Air 2 and later",
      "iPad mini 4 and later",
      "iPod touch (7th generation)"
    ]
  },
  {
    platform: "Android",
    icon: Play,
    color: "from-green-500/20 to-green-500/5",
    requirements: {
      minimum: {
        os: "Android 7.0 (API level 24)",
        device: "Any Android device",
        storage: "80 MB free space",
        ram: "2 GB RAM",
        network: "Wi-Fi or mobile data"
      },
      recommended: {
        os: "Android 10.0 or later",
        device: "Mid-range or flagship",
        storage: "150 MB free space",
        ram: "4 GB RAM",
        network: "Wi-Fi connection"
      }
    },
    features: [
      "Fingerprint authentication",
      "Android Widgets",
      "Google Assistant integration",
      "Wear OS companion",
      "Adaptive battery optimization"
    ],
    compatibility: [
      "Most Android phones",
      "Android tablets",
      "Chromebooks with Play Store",
      "Android TV (limited features)"
    ]
  }
];

const generalRequirements = [
  {
    icon: Wifi,
    title: "Internet Connection",
    description: "Required for token synchronization and community features",
    details: ["Wi-Fi or cellular data", "Minimum 1 Mbps", "Offline mining available", "Auto-sync when connected"]
  },
  {
    icon: Battery,
    title: "Battery Optimization",
    description: "Designed to minimize battery drain during mining sessions",
    details: ["Low power consumption", "Background processing", "Battery saver mode", "Charging recommendations"]
  },
  {
    icon: Shield,
    title: "Security Features",
    description: "Enhanced security for token storage and account protection",
    details: ["Biometric authentication", "Encrypted storage", "Secure communication", "Privacy controls"]
  },
  {
    icon: HardDrive,
    title: "Storage Management",
    description: "Efficient storage usage with automatic cleanup features",
    details: ["Minimal storage footprint", "Cache management", "Offline data sync", "Auto-cleanup options"]
  }
];

const performanceNotes = [
  {
    type: "info",
    icon: Info,
    title: "Performance Tips",
    message: "For best performance, ensure your device has at least 1 GB of free storage and close unnecessary background apps."
  },
  {
    type: "warning",
    icon: AlertCircle,
    title: "Older Devices",
    message: "Devices older than 5 years may experience slower performance. Consider upgrading for the best experience."
  },
  {
    type: "success",
    icon: CheckCircle,
    title: "Compatibility",
    message: "CELF is compatible with 95% of active smartphones worldwide. Check your device specifications above."
  }
];

export function SystemRequirementsSection() {
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
            <Cpu className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">System Requirements</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Device{" "}
            <span className="text-[#9EFF00]">Compatibility</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            CELF is designed to work on a wide range of devices. Check if your smartphone 
            meets the requirements for the best mining experience.
          </p>
        </motion.div>

        {/* Platform Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {systemRequirements.map((platform, index) => (
            <motion.div
              key={platform.platform}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                      <platform.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <CardTitle className="text-2xl">{platform.platform} Requirements</CardTitle>
                  </div>

                  {/* Minimum vs Recommended */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        <span>Minimum</span>
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">OS:</span>
                          <span className="text-white">{platform.requirements.minimum.os}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Device:</span>
                          <span className="text-white">{platform.requirements.minimum.device}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Storage:</span>
                          <span className="text-white">{platform.requirements.minimum.storage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">RAM:</span>
                          <span className="text-white">{platform.requirements.minimum.ram}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Network:</span>
                          <span className="text-white">{platform.requirements.minimum.network}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00]" />
                        <span>Recommended</span>
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">OS:</span>
                          <span className="text-white">{platform.requirements.recommended.os}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Device:</span>
                          <span className="text-white">{platform.requirements.recommended.device}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Storage:</span>
                          <span className="text-white">{platform.requirements.recommended.storage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">RAM:</span>
                          <span className="text-white">{platform.requirements.recommended.ram}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Network:</span>
                          <span className="text-white">{platform.requirements.recommended.network}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Platform Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Platform Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {platform.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                          <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Device Compatibility */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Compatible Devices:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {platform.compatibility.map((device, idx) => (
                        <div key={idx} className="text-sm text-gray-300 bg-gray-800/30 rounded px-2 py-1">
                          {device}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* General Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Additional Requirements
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {generalRequirements.map((req, index) => (
              <motion.div
                key={req.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                      <req.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-3">{req.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{req.description}</p>
                    <div className="space-y-1">
                      {req.details.map((detail, idx) => (
                        <div key={idx} className="text-xs text-gray-400">• {detail}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {performanceNotes.map((note, index) => (
            <motion.div
              key={note.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`border-l-4 ${
                note.type === 'info' ? 'border-l-blue-500 bg-blue-500/5' :
                note.type === 'warning' ? 'border-l-yellow-500 bg-yellow-500/5' :
                'border-l-green-500 bg-green-500/5'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <note.icon className={`h-5 w-5 mt-0.5 ${
                      note.type === 'info' ? 'text-blue-500' :
                      note.type === 'warning' ? 'text-yellow-500' :
                      'text-green-500'
                    }`} />
                    <div>
                      <h4 className="font-semibold text-white mb-1">{note.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{note.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
