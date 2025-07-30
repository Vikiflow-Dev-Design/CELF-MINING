"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { 
  Star, 
  Quote,
  Award,
  Users,
  ArrowLeft,
  ArrowRight,
  Heart,
  Target,
  BookOpen,
  Globe
} from "lucide-react";

const successStories = [
  {
    id: 1,
    name: "Maria Rodriguez",
    role: "Medical Student",
    university: "Harvard Medical School",
    country: "Spain",
    mentorName: "Dr. Elena Martinez",
    mentorRole: "Physician & Medical School Advisor",
    achievement: "$25,000 Scholarship + Harvard Acceptance",
    duration: "6 months",
    category: "Medical School",
    image: "/api/placeholder/100/100",
    story: "When I first joined CELF, I was struggling with my medical school applications and felt overwhelmed by the process. My mentor, Dr. Elena Martinez, not only helped me craft compelling essays but also provided emotional support during the most challenging times. Through our weekly sessions, I learned to articulate my passion for medicine and developed the confidence needed for interviews.",
    quote: "My mentor didn't just help me get into medical school; she helped me believe in myself. The guidance I received through CELF's mentorship program was life-changing.",
    impact: [
      "Improved MCAT score by 15 points",
      "Secured $25,000 merit scholarship",
      "Accepted to 3 top medical schools",
      "Developed lasting professional network"
    ],
    beforeAfter: {
      before: "Struggling with applications, low confidence, unclear career path",
      after: "Harvard Medical School student, scholarship recipient, clear career vision"
    },
    rating: 5
  },
  {
    id: 2,
    name: "James Chen",
    role: "Software Engineer",
    university: "MIT Graduate",
    country: "Singapore",
    mentorName: "Marcus Johnson",
    mentorRole: "Senior Software Engineer at Google",
    achievement: "Google Internship + $15,000 Scholarship",
    duration: "4 months",
    category: "Technology",
    image: "/api/placeholder/100/100",
    story: "As an international student interested in tech, I faced unique challenges in understanding the US job market and building relevant skills. Marcus became more than a mentor; he was a career guide who helped me navigate internship applications, technical interviews, and professional networking. His insights into the tech industry were invaluable.",
    quote: "Marcus helped me understand that success in tech isn't just about coding skills—it's about problem-solving, communication, and continuous learning. His mentorship opened doors I didn't even know existed.",
    impact: [
      "Landed Google summer internship",
      "Built strong professional network",
      "Improved technical interview skills",
      "Received full-time job offer"
    ],
    beforeAfter: {
      before: "Uncertain about career path, limited industry knowledge, no professional network",
      after: "Google software engineer, strong industry connections, clear career trajectory"
    },
    rating: 5
  },
  {
    id: 3,
    name: "Amara Okafor",
    role: "Environmental Science Student",
    university: "Oxford University",
    country: "Nigeria",
    mentorName: "Dr. Priya Sharma",
    mentorRole: "Environmental Scientist at Cambridge",
    achievement: "Oxford Scholarship + Research Publication",
    duration: "8 months",
    category: "Environmental Science",
    image: "/api/placeholder/100/100",
    story: "Coming from Nigeria, I dreamed of studying environmental science at a top university but didn't know how to make it happen. Dr. Priya Sharma guided me through the entire process, from strengthening my academic profile to writing compelling personal statements. She also connected me with research opportunities that became the foundation of my Oxford application.",
    quote: "Dr. Sharma showed me that my background and passion for environmental conservation were strengths, not obstacles. She helped me see how my unique perspective could contribute to global solutions.",
    impact: [
      "Accepted to Oxford with full scholarship",
      "Published research in peer-reviewed journal",
      "Presented at international conference",
      "Established environmental initiative in home country"
    ],
    beforeAfter: {
      before: "Limited research experience, uncertain about international applications, no publications",
      after: "Oxford scholar, published researcher, environmental advocate with global impact"
    },
    rating: 5
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    role: "Business Student",
    university: "London School of Economics",
    country: "Egypt",
    mentorName: "Sarah Williams",
    mentorRole: "Investment Banking Director",
    achievement: "LSE MBA + Investment Banking Offer",
    duration: "5 months",
    category: "Business",
    image: "/api/placeholder/100/100",
    story: "Transitioning from engineering to business was daunting, especially when applying to top MBA programs. Sarah helped me craft a compelling narrative about my career change and prepared me for the rigorous interview process. Her insights into the finance industry and business school expectations were crucial to my success.",
    quote: "Sarah helped me understand that career transitions are opportunities to bring unique perspectives to new fields. Her mentorship gave me the confidence to pursue my business dreams.",
    impact: [
      "Accepted to LSE MBA program",
      "Secured investment banking internship",
      "Built strong business network",
      "Developed leadership skills"
    ],
    beforeAfter: {
      before: "Engineering background, no business experience, uncertain about MBA applications",
      after: "LSE MBA student, investment banking offer, clear business career path"
    },
    rating: 5
  }
];

export function SuccessStoriesSection() {
  const [currentStory, setCurrentStory] = useState(0);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const story = successStories[currentStory];

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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#9EFF00]/15 to-transparent rounded-full blur-3xl"
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
            Success{" "}
            <span className="text-[#9EFF00]">Stories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how our mentorship program has transformed the lives of students worldwide. 
            These stories showcase the power of guidance, support, and determination.
          </p>
        </motion.div>

        {/* Story Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center items-center space-x-4 mb-12"
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={prevStory}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex space-x-2">
            {successStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentStory ? 'bg-[#9EFF00]' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={nextStory}
            className="p-2"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Featured Story */}
        <motion.div
          key={currentStory}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* Story Content */}
                <div className="p-8 lg:p-12">
                  {/* Achievement Badge */}
                  <div className="inline-flex items-center space-x-2 bg-[#9EFF00]/20 text-[#9EFF00] px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Award className="h-4 w-4" />
                    <span>{story.achievement}</span>
                  </div>

                  {/* Student Info */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-[#9EFF00]">
                        {story.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{story.name}</h3>
                      <div className="text-lg text-gray-300">{story.role}</div>
                      <div className="text-sm text-gray-400">{story.university}</div>
                      <div className="text-sm text-gray-400">{story.country}</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-[#9EFF00]/30" />
                    <blockquote className="text-lg text-gray-300 italic leading-relaxed pl-6">
                      "{story.quote}"
                    </blockquote>
                  </div>

                  {/* Story */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {story.story}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-6">
                    <span className="text-sm text-gray-400">Mentorship Rating:</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Mentor Info */}
                  <div className="border-t border-gray-700/50 pt-6">
                    <div className="text-sm text-gray-400 mb-2">Mentored by:</div>
                    <div className="font-semibold text-white">{story.mentorName}</div>
                    <div className="text-sm text-gray-400">{story.mentorRole}</div>
                    <div className="text-sm text-[#9EFF00] mt-1">Duration: {story.duration}</div>
                  </div>
                </div>

                {/* Impact & Results */}
                <div className="bg-gray-800/30 p-8 lg:p-12">
                  <h4 className="text-xl font-bold text-white mb-6">Impact & Results</h4>
                  
                  {/* Key Achievements */}
                  <div className="mb-8">
                    <h5 className="text-lg font-semibold text-white mb-4">Key Achievements:</h5>
                    <div className="space-y-3">
                      {story.impact.map((achievement, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-[#9EFF00]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Award className="h-3 w-3 text-[#9EFF00]" />
                          </div>
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Before & After */}
                  <div className="mb-8">
                    <h5 className="text-lg font-semibold text-white mb-4">Transformation:</h5>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <div className="text-sm font-medium text-red-400 mb-2">Before:</div>
                        <div className="text-gray-300 text-sm">{story.beforeAfter.before}</div>
                      </div>
                      <div className="p-4 bg-[#9EFF00]/10 border border-[#9EFF00]/20 rounded-lg">
                        <div className="text-sm font-medium text-[#9EFF00] mb-2">After:</div>
                        <div className="text-gray-300 text-sm">{story.beforeAfter.after}</div>
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 bg-gray-700/50 px-4 py-2 rounded-full">
                      <BookOpen className="h-4 w-4 text-[#9EFF00]" />
                      <span className="text-sm text-gray-300">{story.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Story Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-[#9EFF00] mb-2">150+</div>
            <div className="text-white font-medium">Success Stories</div>
            <div className="text-gray-400 text-sm">Documented achievements</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#9EFF00] mb-2">$2.5M+</div>
            <div className="text-white font-medium">Scholarships Won</div>
            <div className="text-gray-400 text-sm">By our mentees</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#9EFF00] mb-2">25+</div>
            <div className="text-white font-medium">Countries</div>
            <div className="text-gray-400 text-sm">Success stories from</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#9EFF00] mb-2">95%</div>
            <div className="text-white font-medium">Give Back</div>
            <div className="text-gray-400 text-sm">Become mentors themselves</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
