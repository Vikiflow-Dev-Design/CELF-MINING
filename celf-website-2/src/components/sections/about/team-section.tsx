"use client";

import React from "react";
import Image from "next/image";
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
    image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=9EFF00&color=000000&size=400&format=png",
    linkedin: "https://linkedin.com/in/sarahchen",
    email: "sarah@celf.org"
  },
  {
    name: "Michael Rodriguez",
    role: "CTO",
    department: "Technology",
    bio: "Blockchain expert and former senior engineer at major tech companies. Leading our technical innovation.",
    expertise: ["Blockchain Development", "Mobile Applications", "System Architecture"],
    icon: Code,
    image: "https://ui-avatars.com/api/?name=Michael+Rodriguez&background=9EFF00&color=000000&size=400&format=png",
    linkedin: "https://linkedin.com/in/michaelrodriguez",
    email: "michael@celf.org"
  },
  {
    name: "Dr. Amara Okafor",
    role: "Head of Education",
    department: "Academic Affairs",
    bio: "Former university dean with expertise in global education systems and student success programs.",
    expertise: ["Academic Programs", "Student Success", "Global Education"],
    icon: BookOpen,
    image: "https://ui-avatars.com/api/?name=Amara+Okafor&background=9EFF00&color=000000&size=400&format=png",
    linkedin: "https://linkedin.com/in/amaraokafor",
    email: "amara@celf.org"
  },
  {
    name: "James Thompson",
    role: "Head of Community",
    department: "Community Relations",
    bio: "Community building specialist focused on creating supportive environments for student success.",
    expertise: ["Community Building", "Student Mentorship", "Program Development"],
    icon: Heart,
    image: "https://ui-avatars.com/api/?name=James+Thompson&background=9EFF00&color=000000&size=400&format=png",
    linkedin: "https://linkedin.com/in/jamesthompson",
    email: "james@celf.org"
  },
  {
    name: "Lisa Wang",
    role: "Global Partnerships Director",
    department: "Partnerships",
    bio: "International relations expert managing partnerships with educational institutions worldwide.",
    expertise: ["International Relations", "Partnership Development", "Cultural Adaptation"],
    icon: Globe,
    image: "https://ui-avatars.com/api/?name=Lisa+Wang&background=9EFF00&color=000000&size=400&format=png",
    linkedin: "https://linkedin.com/in/lisawang",
    email: "lisa@celf.org"
  },
  {
    name: "David Kim",
    role: "Security & Compliance Officer",
    department: "Security",
    bio: "Cybersecurity specialist ensuring the safety and compliance of our blockchain systems.",
    expertise: ["Cybersecurity", "Compliance", "Risk Management"],
    icon: Shield,
    image: "https://ui-avatars.com/api/?name=David+Kim&background=9EFF00&color=000000&size=400&format=png",
    linkedin: "https://linkedin.com/in/davidkim",
    email: "david@celf.org"
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

        {/* Enhanced Team Members with Flip Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group perspective-1000"
            >
              {/* Flip Card Container */}
              <div className="relative w-full h-[500px] preserve-3d group-hover:rotate-y-180 transition-transform duration-700 cursor-pointer">

                {/* Front Side - Image */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                  <div className="h-full border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300 overflow-hidden rounded-lg relative">
                    {/* Team Member Image - Full Coverage */}
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Name and Role Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-[#9EFF00] text-sm font-medium">{member.role}</p>
                      <p className="text-gray-300 text-xs">{member.department}</p>
                    </div>

                    {/* Hover Indicator */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[#9EFF00]/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-[#9EFF00]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Users className="h-4 w-4 text-[#9EFF00]" />
                    </div>
                  </div>
                </div>

                {/* Back Side - Details */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                  <Card className="h-full border-[#9EFF00]/40 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm">
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/30 to-[#9EFF00]/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.3)]">
                          <member.icon className="h-8 w-8 text-[#9EFF00]" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-[#9EFF00] text-sm font-medium">{member.role}</p>
                      </div>

                      {/* Bio */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">
                        {member.bio}
                      </p>

                      {/* Expertise */}
                      <div className="mb-6">
                        <h4 className="text-xs font-medium text-white mb-3">Expertise:</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.map((skill, idx) => (
                            <span key={idx} className="text-xs bg-[#9EFF00]/10 text-[#9EFF00] px-3 py-1 rounded-full border border-[#9EFF00]/20">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Contact Links */}
                      <div className="flex justify-center space-x-4 pt-4 border-t border-gray-700/50">
                        <a
                          href={`mailto:${member.email}`}
                          className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center hover:bg-[#9EFF00]/20 transition-colors duration-200 group/btn"
                        >
                          <Mail className="h-5 w-5 text-gray-400 group-hover/btn:text-[#9EFF00]" />
                        </a>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center hover:bg-[#9EFF00]/20 transition-colors duration-200 group/btn"
                        >
                          <Linkedin className="h-5 w-5 text-gray-400 group-hover/btn:text-[#9EFF00]" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
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
