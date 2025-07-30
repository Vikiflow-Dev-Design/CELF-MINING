"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Users, 
  Linkedin, 
  Mail, 
  Award,
  BookOpen,
  Code,
  Heart,
  Globe,
  Shield,
  Zap
} from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Founder & CEO",
    department: "Leadership",
    bio: "Visionary leader with 15+ years in education technology. PhD in Educational Psychology from Stanford University.",
    expertise: ["Education Technology", "Strategic Leadership", "Student Psychology"],
    icon: Award,
    image: "/api/placeholder/120/120"
  },
  {
    name: "Michael Rodriguez",
    role: "CTO",
    department: "Technology",
    bio: "Blockchain expert and former senior engineer at major tech companies. Leading our technical innovation.",
    expertise: ["Blockchain Development", "Mobile Applications", "System Architecture"],
    icon: Code,
    image: "/api/placeholder/120/120"
  },
  {
    name: "Dr. Amara Okafor",
    role: "Head of Education",
    department: "Academic Affairs",
    bio: "Former university dean with expertise in global education systems and student success programs.",
    expertise: ["Academic Programs", "Student Success", "Global Education"],
    icon: BookOpen,
    image: "/api/placeholder/120/120"
  },
  {
    name: "James Thompson",
    role: "Head of Community",
    department: "Community Relations",
    bio: "Community building specialist focused on creating supportive environments for student success.",
    expertise: ["Community Building", "Student Mentorship", "Program Development"],
    icon: Heart,
    image: "/api/placeholder/120/120"
  },
  {
    name: "Lisa Wang",
    role: "Global Partnerships Director",
    department: "Partnerships",
    bio: "International relations expert managing partnerships with educational institutions worldwide.",
    expertise: ["International Relations", "Partnership Development", "Cultural Adaptation"],
    icon: Globe,
    image: "/api/placeholder/120/120"
  },
  {
    name: "David Kim",
    role: "Security & Compliance Officer",
    department: "Security",
    bio: "Cybersecurity specialist ensuring the safety and compliance of our blockchain systems.",
    expertise: ["Cybersecurity", "Compliance", "Risk Management"],
    icon: Shield,
    image: "/api/placeholder/120/120"
  }
];

const departments = [
  {
    name: "Leadership",
    description: "Strategic vision and organizational direction",
    icon: Award,
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    name: "Technology",
    description: "Blockchain innovation and platform development",
    icon: Zap,
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    name: "Academic Affairs",
    description: "Educational programs and student success",
    icon: BookOpen,
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    name: "Community Relations",
    description: "Student support and community building",
    icon: Heart,
    color: "from-pink-500/20 to-pink-500/5"
  }
];

export function TeamSection() {
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
            <Users className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Our Team</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Meet the{" "}
            <span className="text-[#9EFF00]">CELF Team</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our diverse team of educators, technologists, and community builders is united by a 
            shared passion for democratizing education and empowering students worldwide.
          </p>
        </motion.div>

        {/* Departments Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {departments.map((dept, index) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${dept.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                    <dept.icon className="h-6 w-6 text-[#9EFF00]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#9EFF00] transition-colors duration-300">
                    {dept.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {dept.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    {/* Profile Image Placeholder */}
                    <div className="w-20 h-20 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                      <member.icon className="h-10 w-10 text-[#9EFF00]" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#9EFF00] transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-[#9EFF00] text-sm font-medium mb-1">{member.role}</p>
                    <p className="text-gray-400 text-xs">{member.department}</p>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  {/* Expertise */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-white mb-2">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, idx) => (
                        <span key={idx} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Icons */}
                  <div className="flex justify-center space-x-3 pt-4 border-t border-gray-700/50">
                    <button className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center hover:bg-[#9EFF00]/20 transition-colors duration-200">
                      <Mail className="h-4 w-4 text-gray-400 hover:text-[#9EFF00]" />
                    </button>
                    <button className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center hover:bg-[#9EFF00]/20 transition-colors duration-200">
                      <Linkedin className="h-4 w-4 text-gray-400 hover:text-[#9EFF00]" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team Culture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our Team Culture
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We believe that diverse perspectives and collaborative spirit are essential 
              to achieving our mission of democratizing education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#9EFF00] mb-2">15+</div>
              <div className="text-white font-medium mb-1">Team Members</div>
              <div className="text-gray-400 text-sm">Across 8 countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#9EFF00] mb-2">8</div>
              <div className="text-white font-medium mb-1">Countries</div>
              <div className="text-gray-400 text-sm">Global representation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#9EFF00] mb-2">50+</div>
              <div className="text-white font-medium mb-1">Years Experience</div>
              <div className="text-gray-400 text-sm">Combined expertise</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#9EFF00] mb-2">100%</div>
              <div className="text-white font-medium mb-1">Remote-First</div>
              <div className="text-gray-400 text-sm">Flexible work culture</div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[#9EFF00]/20 text-center">
            <h4 className="text-xl font-bold text-white mb-4">
              Join Our Mission
            </h4>
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
              We're always looking for passionate individuals who share our vision of making 
              education accessible to all. If you're interested in joining our team, we'd love to hear from you.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
