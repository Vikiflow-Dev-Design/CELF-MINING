"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Smartphone, 
  Zap,
  Award,
  Users,
  TrendingUp,
  Bell,
  Eye
} from "lucide-react";

const screenshots = [
  {
    id: "mining",
    title: "Token Mining",
    description: "Simple one-tap mining interface with real-time progress tracking and session management.",
    image: "/api/placeholder/300/600",
    features: ["One-tap start", "Real-time tracking", "Session timer", "Battery optimized"]
  },
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Comprehensive overview of your tokens, mining progress, and scholarship eligibility status.",
    image: "/api/placeholder/300/600",
    features: ["Token balance", "Mining stats", "Progress tracking", "Quick actions"]
  },
  {
    id: "scholarships",
    title: "Scholarships",
    description: "Browse available scholarships, track applications, and monitor your eligibility progress.",
    image: "/api/placeholder/300/600",
    features: ["Scholarship browser", "Application tracking", "Eligibility checker", "Deadline alerts"]
  },
  {
    id: "community",
    title: "Community",
    description: "Connect with fellow students, share experiences, and get support from mentors worldwide.",
    image: "/api/placeholder/300/600",
    features: ["Student forums", "Mentor chat", "Success stories", "Global community"]
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Detailed insights into your mining performance, token accumulation, and goal progress.",
    image: "/api/placeholder/300/600",
    features: ["Performance charts", "Goal tracking", "Historical data", "Trend analysis"]
  },
  {
    id: "profile",
    title: "Profile",
    description: "Manage your account, customize settings, and track your achievements and milestones.",
    image: "/api/placeholder/300/600",
    features: ["Account settings", "Achievement badges", "Notification preferences", "Privacy controls"]
  }
];

const screenCategories = [
  { id: "mining", label: "Mining", icon: Zap },
  { id: "dashboard", label: "Dashboard", icon: TrendingUp },
  { id: "scholarships", label: "Scholarships", icon: Award },
  { id: "community", label: "Community", icon: Users },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "profile", label: "Profile", icon: Eye }
];

export function AppScreenshotsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("mining");

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentScreenshot = screenshots[currentIndex];

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
            <Smartphone className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">App Screenshots</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            See CELF in{" "}
            <span className="text-[#9EFF00]">Action</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore the CELF app interface and discover how easy it is to mine tokens, 
            track scholarships, and connect with the global student community.
          </p>
        </motion.div>

        {/* Screenshot Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative mx-auto w-80 h-[640px]">
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] border-8 border-gray-700 shadow-2xl">
                {/* Phone Screen */}
                <div className="absolute inset-6 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] rounded-[2rem] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {/* Screenshot placeholder */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00] to-[#7ACC00] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.3)]">
                            <span className="text-black font-bold text-2xl">C</span>
                          </div>
                          <div className="text-white font-bold text-lg mb-2">{currentScreenshot.title}</div>
                          <div className="text-[#9EFF00] text-sm">CELF App</div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-xl"></div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-900/80 border border-[#9EFF00]/30 rounded-full flex items-center justify-center hover:bg-[#9EFF00]/20 transition-colors duration-200"
              >
                <ChevronLeft className="h-6 w-6 text-[#9EFF00]" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-900/80 border border-[#9EFF00]/30 rounded-full flex items-center justify-center hover:bg-[#9EFF00]/20 transition-colors duration-200"
              >
                <ChevronRight className="h-6 w-6 text-[#9EFF00]" />
              </button>
            </div>
          </motion.div>

          {/* Screenshot Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {currentScreenshot.title} Screen
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {currentScreenshot.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {currentScreenshot.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                            <div className="w-2 h-2 bg-[#9EFF00] rounded-full flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Screenshot Navigation Dots */}
                    <div className="flex space-x-2 mb-6">
                      {screenshots.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                            index === currentIndex ? 'bg-[#9EFF00]' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-2">
                        Screenshot {currentIndex + 1} of {screenshots.length}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Screenshot Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Explore All Features
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Jump to specific app sections to see how CELF makes token mining and scholarship tracking simple and engaging.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {screenCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => {
                  const screenIndex = screenshots.findIndex(s => s.id === category.id);
                  if (screenIndex !== -1) goToSlide(screenIndex);
                }}
                className={`p-4 rounded-xl border transition-colors duration-200 ${
                  screenshots[currentIndex].id === category.id
                    ? 'border-[#9EFF00]/40 bg-[#9EFF00]/10'
                    : 'border-gray-700/50 hover:border-[#9EFF00]/30 hover:bg-gray-800/30'
                }`}
              >
                <category.icon className={`h-6 w-6 mx-auto mb-2 ${
                  screenshots[currentIndex].id === category.id ? 'text-[#9EFF00]' : 'text-gray-400'
                }`} />
                <div className={`text-sm font-medium ${
                  screenshots[currentIndex].id === category.id ? 'text-[#9EFF00]' : 'text-gray-300'
                }`}>
                  {category.label}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
