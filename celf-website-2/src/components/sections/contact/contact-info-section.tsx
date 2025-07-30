"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Globe,
  MessageCircle,
  Users,
  ExternalLink,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Github
} from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    primary: "hello@celf.foundation",
    secondary: "support@celf.foundation",
    description: "General inquiries and support requests",
    action: "Send Email",
    href: "mailto:hello@celf.foundation",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    icon: Phone,
    title: "Phone Support",
    primary: "+1 (555) 123-4567",
    secondary: "Mon-Fri, 9AM-6PM PST",
    description: "Direct phone support for urgent matters",
    action: "Call Now",
    href: "tel:+15551234567",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    primary: "Available 24/7",
    secondary: "Average response: 2 minutes",
    description: "Instant support through our community",
    action: "Start Chat",
    href: "/chat",
    color: "from-green-500/20 to-green-500/5"
  },
  {
    icon: Users,
    title: "Community Forum",
    primary: "2,500+ Active Members",
    secondary: "Peer-to-peer support",
    description: "Get help from fellow students and mentors",
    action: "Join Forum",
    href: "/community",
    color: "from-purple-500/20 to-purple-500/5"
  }
];

const officeInfo = [
  {
    icon: MapPin,
    title: "Headquarters",
    address: "123 Innovation Drive",
    city: "San Francisco, CA 94105",
    country: "United States",
    timezone: "PST (UTC-8)"
  },
  {
    icon: Globe,
    title: "European Office",
    address: "456 Tech Square",
    city: "London, UK SW1A 1AA",
    country: "United Kingdom",
    timezone: "GMT (UTC+0)"
  },
  {
    icon: Clock,
    title: "Asia Pacific Office",
    address: "789 Digital Plaza",
    city: "Singapore 018956",
    country: "Singapore",
    timezone: "SGT (UTC+8)"
  }
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/celf_foundation", label: "Twitter", followers: "12.5K" },
  { icon: Linkedin, href: "https://linkedin.com/company/celf-foundation", label: "LinkedIn", followers: "8.2K" },
  { icon: Facebook, href: "https://facebook.com/celf.foundation", label: "Facebook", followers: "15.3K" },
  { icon: Instagram, href: "https://instagram.com/celf_foundation", label: "Instagram", followers: "9.7K" },
  { icon: Youtube, href: "https://youtube.com/@celf-foundation", label: "YouTube", followers: "5.1K" },
  { icon: Github, href: "https://github.com/celf-foundation", label: "GitHub", followers: "2.8K" }
];

const businessHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM PST", status: "open" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM PST", status: "open" },
  { day: "Sunday", hours: "Closed", status: "closed" },
  { day: "Holidays", hours: "Limited Hours", status: "limited" }
];

export function ContactInfoSection() {
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
            Multiple Ways to{" "}
            <span className="text-[#9EFF00]">Connect</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose the communication method that works best for you. We're available across 
            multiple channels and time zones to provide the support you need.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                    <method.icon className="h-8 w-8 text-[#9EFF00]" />
                  </div>
                  
                  <CardTitle className="mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                    {method.title}
                  </CardTitle>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-lg font-semibold text-white">{method.primary}</div>
                    <div className="text-sm text-gray-400">{method.secondary}</div>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {method.description}
                  </p>

                  <Link
                    href={method.href}
                    className="inline-flex items-center space-x-2 text-[#9EFF00] hover:text-[#9EFF00]/80 transition-colors text-sm font-medium"
                  >
                    <span>{method.action}</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Office Locations and Business Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* Office Locations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Global Offices
            </h3>

            <div className="space-y-6">
              {officeInfo.map((office, index) => (
                <motion.div
                  key={office.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-gray-900/30 border border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <office.icon className="h-5 w-5 text-[#9EFF00]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{office.title}</h4>
                    <div className="space-y-1 text-gray-300 text-sm">
                      <div>{office.address}</div>
                      <div>{office.city}</div>
                      <div>{office.country}</div>
                      <div className="text-[#9EFF00] text-xs">{office.timezone}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Business Hours
            </h3>

            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30 mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {businessHours.map((schedule, index) => (
                    <div key={schedule.day} className="flex items-center justify-between py-2 border-b border-gray-700/30 last:border-b-0">
                      <span className="text-white font-medium">{schedule.day}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-300">{schedule.hours}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          schedule.status === 'open' ? 'bg-green-500' :
                          schedule.status === 'limited' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700/30">
                  <h4 className="text-white font-semibold mb-3">Emergency Support</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    For urgent scholarship or technical issues, our community forum provides 24/7 support 
                    from fellow students and mentors worldwide.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Follow Us</h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-gray-900/30 border border-[#9EFF00]/20 rounded-lg hover:border-[#9EFF00]/40 transition-colors duration-300 group"
                  >
                    <social.icon className="h-5 w-5 text-[#9EFF00] group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-white text-sm font-medium">{social.label}</div>
                      <div className="text-gray-400 text-xs">{social.followers} followers</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
