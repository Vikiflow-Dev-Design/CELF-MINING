"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Star,
  Users,
  Award,
  BookOpen,
  Globe,
  MessageCircle,
  Calendar,
  ArrowRight,
  Filter,
  Search,
} from "lucide-react";

const mentorProfiles = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Computer Science PhD",
    university: "Stanford University",
    location: "California, USA",
    expertise: [
      "Machine Learning",
      "Research Methods",
      "PhD Applications",
      "Academic Writing",
    ],
    specializations: ["Graduate School", "Research", "STEM"],
    experience: "5 years mentoring",
    students: 23,
    rating: 4.9,
    totalReviews: 18,
    languages: ["English", "Mandarin"],
    mentorshipType: ["1-on-1", "Academic"],
    availability: "Weekends",
    image: "/api/placeholder/80/80",
    bio: "I'm passionate about helping students navigate the complex world of graduate studies and research. Having gone through the PhD journey myself, I understand the challenges and can provide practical guidance.",
    achievements: [
      "Published 15+ research papers",
      "Received NSF Fellowship",
      "Mentored 20+ successful PhD applicants",
    ],
    quote:
      "Every student has unique potential. My role is to help them discover and achieve it.",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Software Engineer",
    university: "MIT Alumni",
    location: "Boston, USA",
    expertise: [
      "Career Development",
      "Tech Industry",
      "Internships",
      "Coding Interviews",
    ],
    specializations: ["Career", "Technology", "Professional Development"],
    experience: "3 years mentoring",
    students: 18,
    rating: 4.8,
    totalReviews: 15,
    languages: ["English", "Spanish"],
    mentorshipType: ["Career", "1-on-1"],
    availability: "Evenings",
    image: "/api/placeholder/80/80",
    bio: "As a software engineer at a top tech company, I help students bridge the gap between academia and industry. I focus on practical skills and career strategy.",
    achievements: [
      "Senior Engineer at Google",
      "Mentored 50+ interns",
      "Led diversity initiatives",
    ],
    quote:
      "Technology changes fast, but strong fundamentals and continuous learning never go out of style.",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Medical Student",
    university: "Harvard Medical School",
    location: "Massachusetts, USA",
    expertise: [
      "Pre-med Guidance",
      "MCAT Prep",
      "Medical School Apps",
      "Healthcare",
    ],
    specializations: ["Medical School", "Healthcare", "Pre-med"],
    experience: "2 years mentoring",
    students: 15,
    rating: 5.0,
    totalReviews: 12,
    languages: ["English", "Spanish", "Portuguese"],
    mentorshipType: ["Academic", "Scholarship"],
    availability: "Flexible",
    image: "/api/placeholder/80/80",
    bio: "I understand the challenges of pursuing medicine and want to help others succeed. From MCAT prep to medical school applications, I provide comprehensive guidance.",
    achievements: [
      "MCAT 99th percentile",
      "$50K scholarship recipient",
      "Research publications",
    ],
    quote:
      "Medicine is a calling that requires dedication, but with the right guidance, anyone can achieve their dreams.",
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    role: "Business Analyst",
    university: "London School of Economics",
    location: "London, UK",
    expertise: [
      "Business Strategy",
      "Finance",
      "MBA Applications",
      "International Business",
    ],
    specializations: ["Business", "Finance", "Global"],
    experience: "4 years mentoring",
    students: 21,
    rating: 4.7,
    totalReviews: 16,
    languages: ["English", "Arabic", "French"],
    mentorshipType: ["Career", "Global"],
    availability: "Mornings",
    image: "/api/placeholder/80/80",
    bio: "With experience in international business and finance, I help students navigate global career opportunities and business education pathways.",
    achievements: [
      "MBA from LSE",
      "Worked in 5 countries",
      "Led $10M+ projects",
    ],
    quote:
      "Global perspective and cultural understanding are key to success in today's interconnected world.",
  },
  {
    id: 5,
    name: "Priya Sharma",
    role: "Environmental Scientist",
    university: "University of Cambridge",
    location: "Cambridge, UK",
    expertise: [
      "Environmental Science",
      "Research",
      "Sustainability",
      "Climate Change",
    ],
    specializations: ["Environmental Science", "Research", "Sustainability"],
    experience: "3 years mentoring",
    students: 12,
    rating: 4.9,
    totalReviews: 10,
    languages: ["English", "Hindi", "German"],
    mentorshipType: ["Academic", "Research"],
    availability: "Afternoons",
    image: "/api/placeholder/80/80",
    bio: "Passionate about environmental conservation and research, I guide students interested in making a positive impact on our planet through science.",
    achievements: [
      "Climate research published in Nature",
      "UN Youth Climate Summit speaker",
      "Green innovation award",
    ],
    quote:
      "Science has the power to solve our biggest challenges. Let's work together to make a difference.",
  },
  {
    id: 6,
    name: "David Kim",
    role: "Scholarship Coordinator",
    university: "Seoul National University",
    location: "Seoul, South Korea",
    expertise: [
      "Scholarship Applications",
      "Essay Writing",
      "Interview Prep",
      "Study Abroad",
    ],
    specializations: ["Scholarships", "Study Abroad", "Applications"],
    experience: "6 years mentoring",
    students: 35,
    rating: 4.8,
    totalReviews: 28,
    languages: ["English", "Korean", "Japanese"],
    mentorshipType: ["Scholarship", "Global"],
    availability: "Flexible",
    image: "/api/placeholder/80/80",
    bio: "Having helped hundreds of students secure scholarships, I specialize in application strategy and essay writing that gets results.",
    achievements: [
      "Helped secure $2M+ in scholarships",
      "Former scholarship recipient",
      "Published scholarship guide",
    ],
    quote:
      "Every scholarship application is an opportunity to tell your unique story. Let me help you tell it well.",
  },
];

const filterOptions = {
  specialization: [
    "All",
    "Academic",
    "Career",
    "Research",
    "Medical School",
    "Technology",
    "Business",
    "Global",
  ],
  mentorshipType: [
    "All",
    "1-on-1",
    "Academic",
    "Career",
    "Scholarship",
    "Global",
  ],
  availability: [
    "All",
    "Mornings",
    "Afternoons",
    "Evenings",
    "Weekends",
    "Flexible",
  ],
};

export function MentorProfilesSection() {
  const [selectedFilters, setSelectedFilters] = useState({
    specialization: "All",
    mentorshipType: "All",
    availability: "All",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMentors = mentorProfiles.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some((exp) =>
        exp.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesSpecialization =
      selectedFilters.specialization === "All" ||
      mentor.specializations.includes(selectedFilters.specialization);

    const matchesMentorshipType =
      selectedFilters.mentorshipType === "All" ||
      mentor.mentorshipType.includes(selectedFilters.mentorshipType);

    const matchesAvailability =
      selectedFilters.availability === "All" ||
      mentor.availability === selectedFilters.availability;

    return (
      matchesSearch &&
      matchesSpecialization &&
      matchesMentorshipType &&
      matchesAvailability
    );
  });

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
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[#9EFF00]/15 to-transparent rounded-full blur-3xl"
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
            Meet Our <span className="text-[#9EFF00]">Mentors</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect with experienced students, alumni, and professionals from
            top universities and companies worldwide. Find the perfect mentor
            for your educational journey.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-gray-900/50 border-[#9EFF00]/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search mentors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-[#9EFF00]/50 focus:outline-none"
                  />
                </div>

                {/* Filters */}
                {Object.entries(filterOptions).map(([key, options]) => (
                  <div key={key}>
                    <select
                      value={
                        selectedFilters[key as keyof typeof selectedFilters]
                      }
                      onChange={(e) =>
                        setSelectedFilters((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:border-[#9EFF00]/50 focus:outline-none"
                    >
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mentor Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredMentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  {/* Mentor Header */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-[#9EFF00]">
                        {mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-1 group-hover:text-[#9EFF00] transition-colors duration-300">
                        {mentor.name}
                      </h3>
                      <div className="text-sm text-gray-300 mb-1">
                        {mentor.role}
                      </div>
                      <div className="text-xs text-gray-400">
                        {mentor.university}
                      </div>
                      <div className="text-xs text-gray-400">
                        {mentor.location}
                      </div>
                    </div>
                  </div>

                  {/* Rating and Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-white">
                          {mentor.rating}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({mentor.totalReviews})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{mentor.students} students</span>
                      </div>
                      <span>{mentor.experience}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {mentor.bio}
                  </p>

                  {/* Expertise */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">
                      Expertise:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {mentor.expertise.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{mentor.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Languages and Availability */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                    <div>
                      <div className="text-gray-400 mb-1">Languages:</div>
                      <div className="text-white">
                        {mentor.languages.join(", ")}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-1">Available:</div>
                      <div className="text-white">{mentor.availability}</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xs text-gray-300 italic mb-4 border-l-2 border-[#9EFF00]/30 pl-3">
                    "{mentor.quote}"
                  </blockquote>

                  <Button asChild className="w-full" size="sm">
                    <Link
                      href={`#application?mentor=${mentor.id}`}
                      className="group"
                    >
                      Connect with {mentor.name.split(" ")[0]}
                      <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredMentors.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              No mentors found matching your criteria.
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                setSelectedFilters({
                  specialization: "All",
                  mentorshipType: "All",
                  availability: "All",
                });
                setSearchTerm("");
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* View More Mentors */}
        {filteredMentors.length > 0 && (
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
                  Can't Find the Right Mentor?
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  We have over 300+ mentors in our network. Our matching system
                  will help you find the perfect mentor based on your specific
                  goals, interests, and preferences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="#application" className="group">
                      Get Matched with a Mentor
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link href="/contact">Request Specific Expertise</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
