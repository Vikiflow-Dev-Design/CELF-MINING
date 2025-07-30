"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  Users, 
  BookOpen, 
  Target, 
  Heart,
  Award,
  Globe,
  ArrowRight,
  CheckCircle,
  Clock,
  MessageCircle,
  Video,
  Calendar
} from "lucide-react";

const mentorshipTypes = [
  {
    icon: Users,
    title: "1-on-1 Mentorship",
    description: "Get paired with an experienced student or alumni for personalized guidance throughout your journey.",
    duration: "3-6 months",
    frequency: "Weekly sessions",
    format: "Video calls & messaging",
    availability: "50+ mentors available",
    features: [
      "Personal mentor matching based on goals and interests",
      "Weekly 45-minute video call sessions",
      "Goal setting and progress tracking",
      "Application and essay review",
      "Career guidance and networking advice",
      "24/7 messaging support between sessions"
    ],
    idealFor: ["Students seeking personalized guidance", "Those with specific academic goals", "Scholarship applicants", "Career changers"],
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5",
    slug: "one-on-one"
  },
  {
    icon: BookOpen,
    title: "Academic Mentorship",
    description: "Connect with students in your field of study for subject-specific support and study strategies.",
    duration: "Ongoing",
    frequency: "Bi-weekly sessions",
    format: "Study groups & calls",
    availability: "200+ academic mentors",
    features: [
      "Subject-specific expertise and guidance",
      "Study techniques and time management",
      "Research methodology and skills",
      "Exam preparation strategies",
      "Academic writing support",
      "Course selection advice"
    ],
    idealFor: ["Students struggling with specific subjects", "Research project support", "Study strategy improvement", "Academic skill development"],
    color: "from-blue-500/20 to-blue-500/5",
    slug: "academic"
  },
  {
    icon: Target,
    title: "Career Mentorship",
    description: "Learn from professionals and alumni about career paths, internships, and industry insights.",
    duration: "2-4 months",
    frequency: "Bi-weekly sessions",
    format: "Professional meetings",
    availability: "75+ career mentors",
    features: [
      "Industry insights and career exploration",
      "Resume and LinkedIn profile optimization",
      "Interview preparation and practice",
      "Networking strategies and introductions",
      "Internship and job search guidance",
      "Professional skill development"
    ],
    idealFor: ["Students exploring career options", "Job seekers and internship hunters", "Professional skill development", "Industry networking"],
    color: "from-purple-500/20 to-purple-500/5",
    slug: "career"
  },
  {
    icon: Heart,
    title: "Peer Support Groups",
    description: "Join small groups of students facing similar challenges for mutual support and encouragement.",
    duration: "Flexible",
    frequency: "Weekly meetings",
    format: "Group discussions",
    availability: "30+ active groups",
    features: [
      "Small group discussions (4-6 students)",
      "Shared experiences and challenges",
      "Emotional support and encouragement",
      "Accountability partnerships",
      "Group study sessions",
      "Social connection and friendship building"
    ],
    idealFor: ["Students seeking community support", "Those facing similar challenges", "Social connection needs", "Accountability partners"],
    color: "from-red-500/20 to-red-500/5",
    slug: "peer-support"
  },
  {
    icon: Award,
    title: "Scholarship Mentorship",
    description: "Specialized guidance from scholarship recipients on applications, essays, and interview preparation.",
    duration: "2-3 months",
    frequency: "Weekly sessions",
    format: "Application workshops",
    availability: "40+ scholarship mentors",
    features: [
      "Scholarship search and identification",
      "Application strategy and timeline",
      "Essay writing and editing support",
      "Interview preparation and practice",
      "Document review and feedback",
      "Deadline management and organization"
    ],
    idealFor: ["Scholarship applicants", "Essay writing support", "Interview preparation", "Application strategy"],
    color: "from-yellow-500/20 to-yellow-500/5",
    slug: "scholarship"
  },
  {
    icon: Globe,
    title: "Global Mentorship",
    description: "Connect with international students and professionals for global perspectives and opportunities.",
    duration: "3-6 months",
    frequency: "Bi-weekly sessions",
    format: "Cross-cultural exchange",
    availability: "60+ global mentors",
    features: [
      "International education opportunities",
      "Cultural exchange and understanding",
      "Study abroad guidance and preparation",
      "Global career perspectives",
      "Language practice and support",
      "Cross-cultural communication skills"
    ],
    idealFor: ["International students", "Study abroad candidates", "Global career interests", "Cultural exchange"],
    color: "from-green-500/20 to-green-500/5",
    slug: "global"
  }
];

export function MentorshipTypesSection() {
  return (
    <section id="mentorship-types" className="py-20 lg:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
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
            Mentorship{" "}
            <span className="text-[#9EFF00]">Types</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose the mentorship format that best fits your needs and goals. 
            Each type is designed to provide targeted support for different aspects of your educational journey.
          </p>
        </motion.div>

        {/* Mentorship Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mentorshipTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                      <type.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="mb-2 group-hover:text-[#9EFF00] transition-colors duration-300">
                        {type.title}
                      </CardTitle>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {type.description}
                      </p>
                    </div>
                  </div>

                  {/* Program Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Clock className="h-3 w-3 text-[#9EFF00]" />
                      <span>{type.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="h-3 w-3 text-[#9EFF00]" />
                      <span>{type.frequency}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Video className="h-3 w-3 text-[#9EFF00]" />
                      <span>{type.format}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Users className="h-3 w-3 text-[#9EFF00]" />
                      <span className="text-[#9EFF00]">{type.availability}</span>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">Key Features:</h4>
                    <div className="space-y-1">
                      {type.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-gray-300">
                          <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {type.features.length > 3 && (
                        <div className="text-xs text-gray-400 italic">
                          +{type.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ideal For */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white mb-2">Ideal For:</h4>
                    <div className="flex flex-wrap gap-1">
                      {type.idealFor.map((item, idx) => (
                        <span key={idx} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full" size="sm">
                    <Link href={`#application?type=${type.slug}`} className="group">
                      Apply for {type.title}
                      <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison and CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Not Sure Which Type is Right for You?
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our mentorship coordinators will help you choose the best program based on your goals, 
              current situation, and preferences. You can also combine multiple types for comprehensive support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h4 className="font-semibold text-white mb-2">Free Consultation</h4>
              <p className="text-gray-300 text-sm">
                Speak with our team to find the perfect mentorship match
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h4 className="font-semibold text-white mb-2">Multiple Programs</h4>
              <p className="text-gray-300 text-sm">
                Combine different mentorship types for comprehensive support
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h4 className="font-semibold text-white mb-2">Flexible Switching</h4>
              <p className="text-gray-300 text-sm">
                Change mentorship types if your needs evolve over time
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="#application" className="group">
                Start Application
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
