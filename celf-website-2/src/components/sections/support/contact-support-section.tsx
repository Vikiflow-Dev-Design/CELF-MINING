"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  Users,
  Video,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe
} from "lucide-react";

const contactOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our support team",
    responseTime: "Usually under 2 minutes",
    availability: "24/7",
    features: ["Instant responses", "Screen sharing", "File uploads", "Chat history"],
    action: "Start Chat",
    href: "#",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5",
    priority: "high"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Detailed help for complex issues",
    responseTime: "Within 24 hours",
    availability: "24/7",
    features: ["Detailed responses", "Attachments", "Follow-up support", "Priority handling"],
    action: "Send Email",
    href: "mailto:support@celf.app",
    color: "from-blue-500/20 to-blue-500/5",
    priority: "medium"
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Direct voice support for urgent issues",
    responseTime: "Immediate",
    availability: "Mon-Fri, 9AM-6PM EST",
    features: ["Voice support", "Screen sharing", "Urgent issues", "Technical guidance"],
    action: "Call Now",
    href: "tel:+1-800-CELF-HELP",
    color: "from-green-500/20 to-green-500/5",
    priority: "urgent"
  },
  {
    icon: Video,
    title: "Video Call",
    description: "Face-to-face support for complex problems",
    responseTime: "Schedule required",
    availability: "Mon-Fri, 10AM-5PM EST",
    features: ["Screen sharing", "Personal guidance", "Complex issues", "Training sessions"],
    action: "Schedule Call",
    href: "#",
    color: "from-purple-500/20 to-purple-500/5",
    priority: "scheduled"
  }
];

const supportStats = [
  {
    icon: Clock,
    value: "< 2 min",
    label: "Average Response Time",
    description: "Live chat responses"
  },
  {
    icon: CheckCircle,
    value: "98.5%",
    label: "Resolution Rate",
    description: "First contact resolution"
  },
  {
    icon: Users,
    value: "24/7",
    label: "Support Availability",
    description: "Always here to help"
  },
  {
    icon: Globe,
    value: "15+",
    label: "Languages Supported",
    description: "Global support team"
  }
];

const emergencyContacts = [
  {
    title: "Security Issues",
    description: "Account compromised or suspicious activity",
    contact: "security@celf.app",
    phone: "+1-800-CELF-SEC",
    urgent: true
  },
  {
    title: "Payment Problems",
    description: "Transaction issues or payment failures",
    contact: "payments@celf.app",
    phone: "+1-800-CELF-PAY",
    urgent: false
  },
  {
    title: "Technical Emergencies",
    description: "Critical app issues or data loss",
    contact: "emergency@celf.app",
    phone: "+1-800-CELF-911",
    urgent: true
  }
];

export function ContactSupportSection() {
  return (
    <section id="contact-support" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-radial from-[#9EFF00]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-3xl" />
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
            Contact{" "}
            <span className="text-[#9EFF00] drop-shadow-[0_0_30px_rgba(158,255,0,0.3)]">Support</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose the best way to reach our support team. We're here to help you 
            succeed with CELF and resolve any issues quickly.
          </p>
        </motion.div>

        {/* Support Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {supportStats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-[#9EFF00]" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-300 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contactOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:border-[#9EFF00]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(158,255,0,0.1)]">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    {option.priority === "high" && (
                      <div className="bg-[#9EFF00]/20 text-[#9EFF00] px-3 py-1 rounded-full text-xs font-medium">
                        Recommended
                      </div>
                    )}
                    {option.priority === "urgent" && (
                      <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium">
                        Urgent Only
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                    {option.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {option.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Response Time:</span>
                      <span className="text-[#9EFF00] font-medium">{option.responseTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Availability:</span>
                      <span className="text-white font-medium">{option.availability}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-8">
                    {option.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-400">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button asChild className="w-full group-hover:bg-[#9EFF00] group-hover:text-black transition-colors duration-300">
                    <Link href={option.href} className="flex items-center justify-center space-x-2">
                      <span>{option.action}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-2xl p-8 border border-red-500/20"
        >
          <div className="text-center mb-8">
            <Zap className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Emergency Support</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              For urgent issues that require immediate attention, use these emergency contact methods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyContacts.map((emergency, index) => (
              <div key={emergency.title} className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-bold text-white">{emergency.title}</h4>
                  {emergency.urgent && (
                    <div className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-medium">
                      URGENT
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-4">{emergency.description}</p>
                <div className="space-y-2">
                  <Link 
                    href={`mailto:${emergency.contact}`}
                    className="flex items-center space-x-2 text-[#9EFF00] hover:text-[#8FEF00] transition-colors duration-200"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{emergency.contact}</span>
                  </Link>
                  <Link 
                    href={`tel:${emergency.phone}`}
                    className="flex items-center space-x-2 text-[#9EFF00] hover:text-[#8FEF00] transition-colors duration-200"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{emergency.phone}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
