"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Quote, 
  Star, 
  MapPin, 
  GraduationCap, 
  ArrowRight,
  Heart,
  Trophy,
  Users
} from "lucide-react";

const successStories = [
  {
    name: "Maria Rodriguez",
    age: 22,
    country: "Philippines",
    field: "Computer Science",
    university: "University of the Philippines",
    scholarship: "$5,000 Pilot Scholarship",
    tokensEarned: "Beta Tester",
    story: "I was selected as one of CELF's early pilot scholarship recipients during their foundation phase. The support I received helped me pursue my Computer Science degree. I'm excited to be part of the community as they prepare for their full platform launch in 2025.",
    achievement: "Pilot program graduate, now beta testing the platform",
    image: "/api/placeholder/80/80"
  },
  {
    name: "Ahmed Hassan",
    age: 24,
    country: "Egypt",
    field: "Engineering",
    university: "Cairo University",
    scholarship: "$3,000 Early Support",
    tokensEarned: "Community Leader",
    story: "Being part of CELF's early community has been incredible. I received support during their pilot phase and now help other students understand the upcoming platform. The traditional scholarship system needed innovation, and CELF is building exactly that.",
    achievement: "Community ambassador, helping prepare for 2025 launch",
    image: "/api/placeholder/80/80"
  },
  {
    name: "Sarah Johnson",
    age: 20,
    country: "Nigeria",
    field: "Medicine",
    university: "University of Lagos",
    scholarship: "$4,000 Foundation Grant",
    tokensEarned: "Early Supporter",
    story: "As a first-generation college student, being part of CELF's early community opened my eyes to the future of education funding. I received a foundation grant and now I'm excited to experience the full platform when it launches. The innovation they're building is revolutionary.",
    achievement: "Foundation grant recipient, platform beta tester",
    image: "/api/placeholder/80/80"
  }
];

const communityStats = [
  {
    icon: Users,
    number: "2,500+",
    label: "Active Community",
    description: "Students supporting each other"
  },
  {
    icon: Trophy,
    number: "25+",
    label: "Pilot Recipients",
    description: "Early scholarship recipients in our foundation phase"
  },
  {
    icon: Heart,
    number: "95%",
    label: "Satisfaction Rate",
    description: "Students recommend CELF"
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "Community Rating",
    description: "Average user experience rating"
  }
];

export function SuccessStoriesSection() {
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
            <Heart className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Success Stories</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Real Students,{" "}
            <span className="text-[#9EFF00]">Real Success</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Meet some of the amazing students who have transformed their lives through CELF scholarships. 
            Their stories inspire us to continue breaking down barriers to education.
          </p>
        </motion.div>

        {/* Success Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {successStories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  {/* Quote icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-full flex items-center justify-center">
                      <Quote className="h-5 w-5 text-[#9EFF00]" />
                    </div>
                  </div>

                  {/* Story */}
                  <blockquote className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                    "{story.story}"
                  </blockquote>

                  {/* Student info */}
                  <div className="border-t border-gray-700/50 pt-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-full flex items-center justify-center">
                        <span className="text-[#9EFF00] font-bold text-lg">
                          {story.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{story.name}</h4>
                        <div className="flex items-center space-x-1 text-gray-400 text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>{story.country}</span>
                          <span>•</span>
                          <span>Age {story.age}</span>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Field:</span>
                        <span className="text-white">{story.field}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">University:</span>
                        <span className="text-gray-300 text-xs">{story.university}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Scholarship:</span>
                        <span className="text-[#9EFF00] font-medium">{story.scholarship}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Tokens Earned:</span>
                        <span className="text-[#9EFF00]">{story.tokensEarned}</span>
                      </div>
                    </div>

                    {/* Achievement */}
                    <div className="mt-4 p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <GraduationCap className="h-4 w-4 text-[#9EFF00]" />
                        <span className="text-xs font-medium text-[#9EFF00]">Achievement</span>
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed">{story.achievement}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)] mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Join Our Success Community
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Become part of a supportive community where students help each other succeed and achieve their educational dreams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                  <stat.icon className="h-8 w-8 text-[#9EFF00]" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-[#9EFF00] mb-2">
                  {stat.number}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
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
                <Trophy className="h-8 w-8 text-[#9EFF00]" />
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Your Success Story Starts Here
              </h3>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join our growing community of early supporters preparing for the 2025 platform launch.
                Be among the first to experience revolutionary blockchain-based education funding.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button size="xl" asChild>
                  <Link href="/download" className="group">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="secondary" size="xl" asChild>
                  <Link href="/community">Join Community</Link>
                </Button>
              </div>

              <div className="text-center text-gray-400 text-sm">
                <Heart className="h-4 w-4 inline mr-1" />
                Join 2,500+ students already mining for their future
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
