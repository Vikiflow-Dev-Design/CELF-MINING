"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Award,
  MapPin,
  Calendar,
  DollarSign,
  BookOpen,
  Users,
  Heart,
  Quote
} from "lucide-react";

const successStories = [
  {
    id: 1,
    name: "Maria Rodriguez",
    age: 22,
    country: "Spain",
    field: "Computer Science",
    university: "Universidad Politécnica de Madrid",
    scholarshipAmount: "$15,000",
    miningPeriod: "8 months",
    tokensEarned: "2,847",
    story: "Coming from a small town in Spain, I never thought I could afford to study computer science at a top university. CELF changed everything for me. The community supported me through every step, from understanding the mining process to preparing my scholarship application. The mentorship I received was invaluable.",
    achievement: "Full tuition scholarship + living expenses",
    currentStatus: "Final year student, interning at tech startup",
    communityRole: "Active mentor for new Spanish-speaking students",
    image: "/api/placeholder/120/120",
    rating: 5
  },
  {
    id: 2,
    name: "James Chen",
    age: 20,
    country: "Singapore",
    field: "Biomedical Engineering",
    university: "National University of Singapore",
    scholarshipAmount: "$12,500",
    miningPeriod: "6 months",
    tokensEarned: "2,156",
    story: "The CELF community became my second family. When I was struggling with my application essays, fellow students from around the world helped me refine my story. The global perspective I gained through the community made my application stand out. I'm now studying my dream field thanks to CELF.",
    achievement: "Merit-based scholarship for biomedical engineering",
    currentStatus: "Second year student, research assistant",
    communityRole: "Study group leader for STEM subjects",
    image: "/api/placeholder/120/120",
    rating: 5
  },
  {
    id: 3,
    name: "Amara Okafor",
    age: 24,
    country: "Nigeria",
    field: "International Relations",
    university: "University of Oxford",
    scholarshipAmount: "$25,000",
    miningPeriod: "12 months",
    tokensEarned: "4,234",
    story: "CELF opened doors I never knew existed. The community taught me about opportunities beyond my local knowledge. Through consistent mining and active participation in forums, I not only earned tokens but also gained confidence and global awareness that helped me secure a prestigious scholarship to Oxford.",
    achievement: "Full scholarship to Oxford University",
    currentStatus: "Graduate student, UN internship secured",
    communityRole: "Regional coordinator for African students",
    image: "/api/placeholder/120/120",
    rating: 5
  },
  {
    id: 4,
    name: "Lucas Silva",
    age: 19,
    country: "Brazil",
    field: "Environmental Science",
    university: "Universidade de São Paulo",
    scholarshipAmount: "$8,000",
    miningPeriod: "5 months",
    tokensEarned: "1,892",
    story: "As a first-generation college student, I had no idea how to navigate the scholarship process. The CELF community guided me every step of the way. The study groups helped me improve my English, and the mentorship program connected me with alumni who shared invaluable advice.",
    achievement: "Environmental science scholarship + research grant",
    currentStatus: "First year student, environmental club president",
    communityRole: "Portuguese language forum moderator",
    image: "/api/placeholder/120/120",
    rating: 5
  }
];

const impactStats = [
  {
    icon: Award,
    number: "150+",
    label: "Scholarships Awarded",
    description: "Total scholarships received by community members"
  },
  {
    icon: DollarSign,
    number: "$2.5M+",
    label: "Total Value",
    description: "Combined value of all scholarships awarded"
  },
  {
    icon: Users,
    number: "89%",
    label: "Success Rate",
    description: "Active community members who achieve their goals"
  },
  {
    icon: Heart,
    number: "95%",
    label: "Give Back",
    description: "Recipients who become mentors for others"
  }
];

export function SuccessStoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const currentStory = successStories[currentIndex];

  return (
    <section id="success-stories" className="py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
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
          <div className="inline-flex items-center space-x-2 bg-gray-900/80 border border-[#9EFF00]/30 rounded-full px-4 py-2 mb-6">
            <Award className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Success Stories</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Student{" "}
            <span className="text-[#9EFF00]">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Read inspiring stories from CELF community members who have achieved their educational dreams 
            through token mining, community support, and determination.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {impactStats.map((stat, index) => (
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

        {/* Featured Success Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* Story Content */}
                <div className="p-8 lg:p-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Header */}
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-[#9EFF00]">
                            {currentStory.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{currentStory.name}</h3>
                          <div className="flex items-center space-x-2 text-gray-300 text-sm">
                            <MapPin className="h-4 w-4" />
                            <span>{currentStory.country}</span>
                            <span>•</span>
                            <span>Age {currentStory.age}</span>
                          </div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(currentStory.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                        ))}
                      </div>

                      {/* Quote */}
                      <div className="relative mb-6">
                        <Quote className="absolute -top-2 -left-2 h-8 w-8 text-[#9EFF00]/30" />
                        <blockquote className="text-gray-300 leading-relaxed italic pl-6">
                          {currentStory.story}
                        </blockquote>
                      </div>

                      {/* Achievement */}
                      <div className="bg-[#9EFF00]/10 border border-[#9EFF00]/30 rounded-lg p-4 mb-6">
                        <h4 className="text-[#9EFF00] font-semibold mb-2">Achievement</h4>
                        <p className="text-white text-sm">{currentStory.achievement}</p>
                      </div>

                      {/* Current Status */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Current Status:</span>
                          <span className="text-white">{currentStory.currentStatus}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Community Role:</span>
                          <span className="text-white">{currentStory.communityRole}</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Stats Panel */}
                <div className="bg-gray-800/50 p-8 lg:p-12 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h4 className="text-lg font-bold text-white mb-2">Journey Details</h4>
                        <div className="w-12 h-0.5 bg-[#9EFF00] mx-auto"></div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#9EFF00] mb-1">{currentStory.scholarshipAmount}</div>
                          <div className="text-white text-sm font-medium">Scholarship</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#9EFF00] mb-1">{currentStory.tokensEarned}</div>
                          <div className="text-white text-sm font-medium">Tokens Earned</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#9EFF00] mb-1">{currentStory.miningPeriod}</div>
                          <div className="text-white text-sm font-medium">Mining Period</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#9EFF00] mb-1">{currentStory.field.split(' ')[0]}</div>
                          <div className="text-white text-sm font-medium">Field of Study</div>
                        </div>
                      </div>

                      <div className="border-t border-gray-700/50 pt-6">
                        <div className="text-center">
                          <div className="text-sm text-gray-400 mb-1">University</div>
                          <div className="text-white font-medium text-sm">{currentStory.university}</div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={prevStory}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            <div className="flex space-x-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-[#9EFF00]' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={nextStory}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Call to Action */}
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
                Your Success Story Starts Here
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Join thousands of students who have transformed their educational dreams into reality 
                through the CELF community. Your journey to success begins with a single step.
              </p>
              <Button size="lg" asChild>
                <a href="#join-community" className="group">
                  Start Your Journey
                  <Award className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
