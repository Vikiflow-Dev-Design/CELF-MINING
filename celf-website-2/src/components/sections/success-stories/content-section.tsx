"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import {
  Star,
  Quote,
  GraduationCap,
  Award,
  BookOpen,
  ChevronRight,
  Calendar,
  MapPin,
  Coins,
  ChevronLeft
} from "lucide-react";

type TabType = "stories" | "testimonials";

export function SuccessStoriesContent() {
  const [activeTab, setActiveTab] = useState<TabType>("stories");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const successStories = [
    {
      id: 1,
      name: "Sarah Chen",
      age: 22,
      location: "San Francisco, CA",
      degree: "Computer Science",
      university: "Stanford University",
      year: "2024",
      image: "/api/placeholder/400/400",
      story: "Growing up in a single-parent household, I never thought college was possible. When I discovered CELF, everything changed. Through their token mining program, I earned enough to cover my tuition and living expenses. Today, I'm a software engineer at a top tech company, and I'm giving back by mentoring other CELF recipients.",
      achievements: ["Full Scholarship Recipient", "Dean's List", "Tech Internship at Google"],
      tokensEarned: "15,000 CELF",
      timeline: "2020-2024"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      age: 25,
      location: "Chicago, IL",
      degree: "Medicine",
      university: "Northwestern University",
      year: "2023",
      image: "/api/placeholder/400/400",
      story: "As a first-generation college student from an underserved community, medical school seemed like an impossible dream. CELF's scholarship program not only covered my education costs but connected me with mentors who guided me through the journey. I'm now a resident physician, working to improve healthcare access in my community.",
      achievements: ["Medical Degree", "Community Health Award", "Research Publication"],
      tokensEarned: "22,000 CELF",
      timeline: "2019-2023"
    },
    {
      id: 3,
      name: "Priya Patel",
      age: 21,
      location: "Austin, TX",
      degree: "Environmental Engineering",
      university: "University of Texas",
      year: "2024",
      image: "/api/placeholder/400/400",
      story: "Climate change has always been my passion, but financial constraints nearly derailed my dreams. CELF's innovative approach to education funding allowed me to focus on my studies instead of worrying about debt. I'm now working on sustainable technology solutions and planning to start my own green tech company.",
      achievements: ["Summa Cum Laude", "Environmental Innovation Award", "Patent Pending"],
      tokensEarned: "18,500 CELF",
      timeline: "2020-2024"
    },
    {
      id: 4,
      name: "James Rodriguez",
      age: 23,
      location: "Miami, FL",
      degree: "Business Administration",
      university: "University of Miami",
      year: "2024",
      image: "/api/placeholder/400/400",
      story: "Coming from a family of immigrants, higher education felt financially out of reach. CELF's token mining system allowed me to earn while learning about blockchain technology. I graduated debt-free and now run my own fintech startup focused on financial inclusion.",
      achievements: ["Magna Cum Laude", "Entrepreneur of the Year", "Startup Founder"],
      tokensEarned: "19,200 CELF",
      timeline: "2020-2024"
    },
    {
      id: 5,
      name: "Lisa Wang",
      age: 24,
      location: "Seattle, WA",
      degree: "Data Science",
      university: "University of Washington",
      year: "2023",
      image: "/api/placeholder/400/400",
      story: "As an international student, funding my education was a major challenge. CELF's innovative platform allowed me to mine tokens while studying, making my dream of studying in the US a reality. I now work at a leading AI company and contribute to open-source projects.",
      achievements: ["International Student Award", "AI Research Publication", "Open Source Contributor"],
      tokensEarned: "16,800 CELF",
      timeline: "2019-2023"
    },
    {
      id: 6,
      name: "Michael Brown",
      age: 26,
      location: "Boston, MA",
      degree: "Law",
      university: "Harvard Law School",
      year: "2023",
      image: "/api/placeholder/400/400",
      story: "Coming from a working-class family, law school seemed financially impossible. CELF's scholarship program not only funded my education but connected me with mentors in the legal field. I now work as a public defender, fighting for justice and equality.",
      achievements: ["Law Review Editor", "Public Interest Award", "Bar Exam Top 10%"],
      tokensEarned: "25,000 CELF",
      timeline: "2020-2023"
    },
    {
      id: 7,
      name: "Amanda Foster",
      age: 22,
      location: "Denver, CO",
      degree: "Biomedical Engineering",
      university: "Colorado State University",
      year: "2024",
      image: "/api/placeholder/400/400",
      story: "My passion for medical technology drove me to pursue biomedical engineering, but financial constraints were a barrier. CELF's token mining system allowed me to fund my education while learning about blockchain. I'm now developing medical devices that save lives.",
      achievements: ["Engineering Excellence Award", "Medical Device Patent", "Research Grant Recipient"],
      tokensEarned: "17,500 CELF",
      timeline: "2020-2024"
    },
    {
      id: 8,
      name: "Carlos Mendez",
      age: 23,
      location: "Los Angeles, CA",
      degree: "Film Production",
      university: "UCLA",
      year: "2024",
      image: "/api/placeholder/400/400",
      story: "Growing up in East LA, film school seemed like an impossible dream. CELF's scholarship program made it possible for me to pursue my passion for storytelling. I've now directed several award-winning short films and work with major studios.",
      achievements: ["Student Film Award", "Sundance Selection", "Studio Contract"],
      tokensEarned: "14,200 CELF",
      timeline: "2020-2024"
    },
    {
      id: 9,
      name: "Rachel Kim",
      age: 25,
      location: "New York, NY",
      degree: "Architecture",
      university: "Columbia University",
      year: "2023",
      image: "/api/placeholder/400/400",
      story: "Architecture was my calling, but the cost of education was overwhelming. Through CELF's innovative funding model, I was able to complete my degree without debt. I now design sustainable buildings that positively impact communities.",
      achievements: ["Design Excellence Award", "Sustainable Architecture Certification", "Community Impact Project"],
      tokensEarned: "20,300 CELF",
      timeline: "2019-2023"
    },
    {
      id: 10,
      name: "David Thompson",
      age: 24,
      location: "Phoenix, AZ",
      degree: "Renewable Energy Engineering",
      university: "Arizona State University",
      year: "2024",
      image: "/api/placeholder/400/400",
      story: "My goal was to work in renewable energy to combat climate change, but funding my specialized degree was challenging. CELF's token mining aligned perfectly with my values of innovation and sustainability. I now lead solar energy projects across the Southwest.",
      achievements: ["Clean Energy Innovation Award", "Solar Project Lead", "Sustainability Champion"],
      tokensEarned: "18,900 CELF",
      timeline: "2020-2024"
    },
    {
      id: 11,
      name: "Jennifer Lee",
      age: 23,
      location: "Portland, OR",
      degree: "Psychology",
      university: "University of Oregon",
      year: "2024",
      image: "/api/placeholder/400/400",
      story: "Mental health advocacy has always been my passion. CELF's scholarship program allowed me to pursue my psychology degree without financial stress, which ironically helped my own mental health journey. I now run a nonprofit focused on student mental wellness.",
      achievements: ["Mental Health Advocate Award", "Nonprofit Founder", "Research Publication"],
      tokensEarned: "16,100 CELF",
      timeline: "2020-2024"
    },
    {
      id: 12,
      name: "Robert Garcia",
      age: 26,
      location: "Houston, TX",
      degree: "Petroleum Engineering",
      university: "University of Texas",
      year: "2023",
      image: "/api/placeholder/400/400",
      story: "Transitioning from oil to renewable energy required additional education I couldn't afford. CELF's program enabled me to retrain and now I work on carbon capture technologies. It's amazing how blockchain technology helped me transition to clean energy.",
      achievements: ["Career Transition Award", "Carbon Capture Patent", "Industry Leadership"],
      tokensEarned: "21,700 CELF",
      timeline: "2021-2023"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Emily Rodriguez",
      role: "CELF Scholarship Recipient",
      university: "MIT",
      quote: "CELF didn't just fund my education - they invested in my future. The community support and mentorship made all the difference in my journey.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 2,
      name: "Dr. James Wilson",
      role: "University Professor",
      university: "Harvard University",
      quote: "I've seen firsthand how CELF transforms students' lives. Their holistic approach to education funding is revolutionary and sustainable.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 3,
      name: "Maria Santos",
      role: "Parent",
      university: "UCLA",
      quote: "As a parent, watching my daughter achieve her dreams through CELF has been incredible. They made the impossible possible for our family.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 4,
      name: "Alex Thompson",
      role: "Recent Graduate",
      university: "Yale University",
      quote: "The token mining system is genius! I earned my way through college while learning about blockchain technology. Best decision ever.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 5,
      name: "Dr. Lisa Chang",
      role: "Education Consultant",
      university: "Columbia University",
      quote: "CELF is pioneering the future of education funding. Their impact on students' lives is immeasurable and truly inspiring.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 6,
      name: "David Kim",
      role: "CELF Alumni",
      university: "Berkeley",
      quote: "From struggling student to successful entrepreneur - CELF made my journey possible. Forever grateful for this opportunity!",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 7,
      name: "Sarah Mitchell",
      role: "High School Counselor",
      university: "Local High School",
      quote: "I recommend CELF to all my students. It's not just about funding - it's about building a community of learners and achievers.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 8,
      name: "Professor Michael Davis",
      role: "Computer Science Professor",
      university: "Stanford University",
      quote: "CELF students are among the most motivated I've taught. The program attracts dedicated learners who truly value education.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 9,
      name: "Jennifer Park",
      role: "CELF Mentor",
      university: "Google",
      quote: "Mentoring CELF students has been incredibly rewarding. Their determination and innovative thinking inspire me every day.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 10,
      name: "Robert Johnson",
      role: "Parent",
      university: "Northwestern University",
      quote: "CELF gave my son the opportunity to pursue medicine without crushing debt. As a family, we're forever grateful for this program.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 11,
      name: "Dr. Amanda Foster",
      role: "Dean of Students",
      university: "University of Texas",
      quote: "CELF recipients consistently demonstrate exceptional academic performance and leadership qualities on our campus.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 12,
      name: "Mark Chen",
      role: "Tech Industry Professional",
      university: "Former CELF Student",
      quote: "The skills I learned through CELF's token mining system directly contributed to my success in the blockchain industry.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 13,
      name: "Dr. Patricia Williams",
      role: "Education Policy Expert",
      university: "Georgetown University",
      quote: "CELF represents the future of education funding - innovative, sustainable, and truly transformative for students.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 14,
      name: "Carlos Mendez Sr.",
      role: "Parent",
      university: "UCLA",
      quote: "Watching my son achieve his filmmaking dreams through CELF has been the proudest moment of my life as a parent.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 15,
      name: "Lisa Wang",
      role: "International Student Advisor",
      university: "University of Washington",
      quote: "CELF has made quality education accessible to international students who otherwise couldn't afford to study in the US.",
      rating: 5,
      image: "/api/placeholder/100/100"
    }
  ];

  // Pagination logic
  const currentData = activeTab === "stories" ? successStories : testimonials;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = currentData.slice(startIndex, endIndex);

  // Reset to page 1 when switching tabs
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      {/* Tab Navigation */}
      <section className="py-8 bg-gray-900/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-2 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-1 border border-gray-800/50">
              <button
                onClick={() => handleTabChange("stories")}
                className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center ${
                  activeTab === "stories"
                    ? "bg-[#9EFF00] text-black shadow-lg shadow-[#9EFF00]/25"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Success Stories
              </button>
              <button
                onClick={() => handleTabChange("testimonials")}
                className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center ${
                  activeTab === "testimonials"
                    ? "bg-[#9EFF00] text-black shadow-lg shadow-[#9EFF00]/25"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <Quote className="h-5 w-5 mr-2" />
                Testimonials
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatePresence mode="wait">
            {activeTab === "stories" && (
              <motion.div
                key="stories"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Success Stories - Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  {currentItems.map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-8 hover:border-[#9EFF00]/30 transition-all duration-300"
                    >
                      {/* Profile Header */}
                      <div className="flex items-start space-x-6 mb-6">
                        <div className="relative flex-shrink-0">
                          <img
                            src={story.image}
                            alt={story.name}
                            className="w-20 h-20 rounded-full object-cover border-2 border-[#9EFF00]/20"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-[#9EFF00] rounded-full p-1.5">
                            <GraduationCap className="h-4 w-4 text-black" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">
                            {story.name}
                          </h3>
                          <p className="text-[#9EFF00] font-medium mb-1">
                            {story.degree}
                          </p>
                          <p className="text-gray-400 text-sm mb-2">
                            {story.university}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {story.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Class of {story.year}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Story Content */}
                      <div className="mb-6">
                        <Quote className="h-6 w-6 text-[#9EFF00] mb-3" />
                        <p className="text-gray-300 leading-relaxed">
                          {story.story}
                        </p>
                      </div>

                      {/* Achievements */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                          <Award className="h-4 w-4 mr-2 text-[#9EFF00]" />
                          Key Achievements
                        </h4>
                        <div className="space-y-2">
                          {story.achievements.map((achievement, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-sm text-gray-400"
                            >
                              <ChevronRight className="h-3 w-3 text-[#9EFF00] mr-2 flex-shrink-0" />
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                          <div className="flex items-center mb-1">
                            <Coins className="h-4 w-4 text-[#9EFF00] mr-2" />
                            <div className="text-lg font-bold text-[#9EFF00]">
                              {story.tokensEarned}
                            </div>
                          </div>
                          <div className="text-xs text-gray-400">
                            Tokens Earned
                          </div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                          <div className="text-lg font-bold text-[#9EFF00] mb-1">
                            {story.timeline}
                          </div>
                          <div className="text-xs text-gray-400">
                            CELF Journey
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "testimonials" && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Testimonials - Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {currentItems.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 hover:border-[#9EFF00]/30 transition-all duration-300"
                    >
                      {/* Rating Stars */}
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-gray-300 mb-6 leading-relaxed text-lg">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-[#9EFF00]/20"
                        />
                        <div>
                          <div className="font-semibold text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {testimonial.role}
                          </div>
                          <div className="text-sm text-[#9EFF00]">
                            {testimonial.university}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center mt-12 space-x-4"
          >
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <div className="hidden sm:flex items-center space-x-1 ml-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 ${
                      currentPage === page
                        ? "bg-[#9EFF00] text-black"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#9EFF00]/10 to-[#9EFF00]/5">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to Write Your Own{" "}
              <span className="text-[#9EFF00]">Success Story?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of students who are already earning their way to a brighter future with CELF. 
              Start mining tokens today and unlock your educational potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" asChild>
                <a href="/scholarship-program" className="flex items-center">
                  Apply for Scholarship
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/download">
                  Download App
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
