"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe,
  Users,
  Building,
  ArrowRight,
  ExternalLink,
  Navigation
} from "lucide-react";

const offices = [
  {
    id: "headquarters",
    title: "Global Headquarters",
    city: "San Francisco",
    country: "United States",
    address: "123 Innovation Drive, Suite 400",
    postalCode: "San Francisco, CA 94105",
    phone: "+1 (555) 123-4567",
    email: "sf@celf.foundation",
    timezone: "PST (UTC-8)",
    hours: "Mon-Fri: 9AM-6PM PST",
    description: "Our main headquarters housing the executive team, product development, and global operations.",
    departments: ["Executive Leadership", "Product Development", "Global Operations", "Marketing"],
    mapUrl: "https://maps.google.com/?q=San+Francisco+CA",
    image: "/api/placeholder/400/250"
  },
  {
    id: "europe",
    title: "European Office",
    city: "London",
    country: "United Kingdom",
    address: "456 Tech Square, Floor 12",
    postalCode: "London, UK SW1A 1AA",
    phone: "+44 20 7123 4567",
    email: "london@celf.foundation",
    timezone: "GMT (UTC+0)",
    hours: "Mon-Fri: 9AM-6PM GMT",
    description: "European operations center serving students across Europe, Middle East, and Africa.",
    departments: ["European Operations", "Student Support", "Partnerships", "Compliance"],
    mapUrl: "https://maps.google.com/?q=London+UK",
    image: "/api/placeholder/400/250"
  },
  {
    id: "asia",
    title: "Asia Pacific Office",
    city: "Singapore",
    country: "Singapore",
    address: "789 Digital Plaza, Level 25",
    postalCode: "Singapore 018956",
    phone: "+65 6123 4567",
    email: "singapore@celf.foundation",
    timezone: "SGT (UTC+8)",
    hours: "Mon-Fri: 9AM-6PM SGT",
    description: "Asia Pacific hub supporting students across Asia, Australia, and the Pacific region.",
    departments: ["APAC Operations", "Community Management", "Local Partnerships", "Cultural Adaptation"],
    mapUrl: "https://maps.google.com/?q=Singapore",
    image: "/api/placeholder/400/250"
  }
];

const globalStats = [
  {
    icon: Globe,
    number: "25+",
    label: "Countries",
    description: "Global presence"
  },
  {
    icon: Users,
    number: "50+",
    label: "Team Members",
    description: "Across all offices"
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Coverage",
    description: "Global time zones"
  },
  {
    icon: Building,
    number: "3",
    label: "Offices",
    description: "Strategic locations"
  }
];

export function OfficeLocationsSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
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
            <MapPin className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Global Offices</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Our{" "}
            <span className="text-[#9EFF00]">Global Presence</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            With offices across three continents, we provide local support and maintain 
            global coverage to serve our international student community.
          </p>
        </motion.div>

        {/* Global Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {globalStats.map((stat, index) => (
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
              <p className="text-xs text-gray-400">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Office Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {offices.map((office, index) => (
            <motion.div
              key={office.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  {/* Office Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <CardTitle className="mb-1 group-hover:text-[#9EFF00] transition-colors duration-300">
                          {office.title}
                        </CardTitle>
                        <div className="text-lg text-[#9EFF00] font-medium">
                          {office.city}, {office.country}
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="h-5 w-5 text-[#9EFF00]" />
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {office.description}
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-4 w-4 text-[#9EFF00] mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-300">
                        <div>{office.address}</div>
                        <div>{office.postalCode}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-[#9EFF00] flex-shrink-0" />
                      <Link href={`tel:${office.phone}`} className="text-sm text-gray-300 hover:text-[#9EFF00] transition-colors">
                        {office.phone}
                      </Link>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-[#9EFF00] flex-shrink-0" />
                      <Link href={`mailto:${office.email}`} className="text-sm text-gray-300 hover:text-[#9EFF00] transition-colors">
                        {office.email}
                      </Link>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-[#9EFF00] flex-shrink-0" />
                      <div className="text-sm text-gray-300">
                        <div>{office.hours}</div>
                        <div className="text-xs text-gray-400">{office.timezone}</div>
                      </div>
                    </div>
                  </div>

                  {/* Departments */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white mb-3">Departments:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {office.departments.map((dept, idx) => (
                        <div key={idx} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded">
                          {dept}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button size="sm" asChild className="flex-1">
                      <Link href={office.mapUrl} target="_blank" rel="noopener noreferrer" className="group">
                        <Navigation className="h-4 w-4 mr-2" />
                        Directions
                      </Link>
                    </Button>
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={`mailto:${office.email}`}>
                        <Mail className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Visit Us CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30 max-w-4xl mx-auto">
            <CardContent className="p-8 lg:p-12">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(158,255,0,0.2)]">
                <Building className="h-8 w-8 text-[#9EFF00]" />
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Visit Our Offices
              </h3>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Planning to visit one of our offices? We'd love to meet you in person! 
                Schedule a visit to learn more about CELF and meet our team.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button size="lg" asChild>
                  <Link href="/schedule-visit" className="group">
                    Schedule a Visit
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="#contact-form">Contact Us First</Link>
                </Button>
              </div>

              <div className="text-center text-gray-400 text-sm">
                <Clock className="h-4 w-4 inline mr-1" />
                All visits require advance scheduling • Photo ID required
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
