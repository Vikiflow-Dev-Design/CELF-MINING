"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Users, 
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Heart,
  Target,
  MessageCircle,
  Calendar,
  Award
} from "lucide-react";

const applicationTypes = [
  {
    id: "mentee",
    title: "Find a Mentor",
    description: "Get personalized guidance to achieve your educational and career goals",
    icon: Users,
    benefits: [
      "Personalized mentor matching",
      "Weekly guidance sessions",
      "Goal tracking and accountability",
      "Access to exclusive resources",
      "Community support network"
    ],
    commitment: "3-6 months",
    timeInvestment: "1-2 hours/week",
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    id: "mentor",
    title: "Become a Mentor",
    description: "Share your expertise and make a meaningful impact on students' lives",
    icon: Heart,
    benefits: [
      "Make a real difference",
      "Develop leadership skills",
      "Expand professional network",
      "Recognition and growth",
      "Flexible scheduling"
    ],
    commitment: "6+ months",
    timeInvestment: "1-2 hours/week",
    color: "from-purple-500/20 to-purple-500/5"
  }
];

const formFields = {
  mentee: [
    { name: "fullName", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: false },
    { name: "country", label: "Country", type: "text", required: true },
    { name: "university", label: "University/Institution", type: "text", required: false },
    { name: "fieldOfStudy", label: "Field of Study", type: "text", required: true },
    { name: "currentLevel", label: "Current Education Level", type: "select", required: true, options: ["High School", "Undergraduate", "Graduate", "PhD", "Other"] },
    { name: "mentorshipType", label: "Preferred Mentorship Type", type: "select", required: true, options: ["1-on-1 Mentorship", "Academic Mentorship", "Career Mentorship", "Scholarship Mentorship", "Global Mentorship"] },
    { name: "goals", label: "Primary Goals", type: "textarea", required: true },
    { name: "challenges", label: "Current Challenges", type: "textarea", required: true },
    { name: "availability", label: "Availability", type: "select", required: true, options: ["Mornings", "Afternoons", "Evenings", "Weekends", "Flexible"] },
    { name: "experience", label: "Previous Mentorship Experience", type: "textarea", required: false }
  ],
  mentor: [
    { name: "fullName", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "country", label: "Country", type: "text", required: true },
    { name: "currentRole", label: "Current Role/Position", type: "text", required: true },
    { name: "organization", label: "Organization/Company", type: "text", required: true },
    { name: "education", label: "Highest Education Level", type: "text", required: true },
    { name: "expertise", label: "Areas of Expertise", type: "textarea", required: true },
    { name: "mentorshipType", label: "Preferred Mentorship Type", type: "select", required: true, options: ["1-on-1 Mentorship", "Academic Mentorship", "Career Mentorship", "Scholarship Mentorship", "Global Mentorship"] },
    { name: "experience", label: "Relevant Experience", type: "textarea", required: true },
    { name: "motivation", label: "Why do you want to be a mentor?", type: "textarea", required: true },
    { name: "availability", label: "Availability", type: "select", required: true, options: ["Mornings", "Afternoons", "Evenings", "Weekends", "Flexible"] },
    { name: "languages", label: "Languages Spoken", type: "text", required: true }
  ]
};

export function ApplicationSection() {
  const [selectedType, setSelectedType] = useState<"mentee" | "mentor">("mentee");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({});
  };

  if (isSubmitted) {
    return (
      <section id="application" className="py-20 lg:py-32 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-12">
                <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(158,255,0,0.2)]">
                  <CheckCircle className="h-8 w-8 text-[#9EFF00]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Application Submitted Successfully!
                </h3>
                <p className="text-lg text-gray-300 mb-8">
                  Thank you for your interest in our mentorship program. We'll review your application and get back to you within 48 hours.
                </p>
                <div className="space-y-4">
                  <div className="text-sm text-gray-400">
                    What happens next:
                  </div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-[#9EFF00]" />
                      <span>Application review (24-48 hours)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-[#9EFF00]" />
                      <span>{selectedType === "mentee" ? "Mentor matching" : "Interview scheduling"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-[#9EFF00]" />
                      <span>Introduction and onboarding</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <Button onClick={resetForm} className="w-full">
                    Submit Another Application
                  </Button>
                  <Button variant="secondary" asChild className="w-full">
                    <a href="/community">Join Our Community</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="application" className="py-20 lg:py-32 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] relative overflow-hidden">
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Start Your{" "}
            <span className="text-[#9EFF00]">Journey</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Take the first step towards achieving your goals or making a difference in someone else's life. 
            Choose your path and begin your mentorship journey today.
          </p>
        </motion.div>

        {/* Application Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto"
        >
          {applicationTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 ${
                  selectedType === type.id 
                    ? 'border-[#9EFF00]/60 bg-[#9EFF00]/5 shadow-[0_0_30px_rgba(158,255,0,0.2)]' 
                    : 'border-[#9EFF00]/20 hover:border-[#9EFF00]/40'
                }`}
                onClick={() => setSelectedType(type.id as "mentee" | "mentor")}
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center mx-auto mb-4 ${selectedType === type.id ? 'scale-110' : ''} transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                    <type.icon className="h-8 w-8 text-[#9EFF00]" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {type.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {type.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Clock className="h-4 w-4 text-[#9EFF00]" />
                      <span>{type.commitment}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="h-4 w-4 text-[#9EFF00]" />
                      <span>{type.timeInvestment}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {type.benefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                        <CheckCircle className="h-3 w-3 text-[#9EFF00] flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                    {type.benefits.length > 3 && (
                      <div className="text-xs text-gray-400 italic">
                        +{type.benefits.length - 3} more benefits
                      </div>
                    )}
                  </div>

                  {selectedType === type.id && (
                    <div className="text-sm text-[#9EFF00] font-medium">
                      Selected ✓
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {selectedType === "mentee" ? "Mentee Application" : "Mentor Application"}
                </h3>
                <p className="text-gray-300">
                  Please fill out the form below to {selectedType === "mentee" ? "find your perfect mentor" : "join our mentor community"}.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formFields[selectedType].map((field, index) => (
                    <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                      <label className="block text-sm font-medium text-white mb-2">
                        {field.label} {field.required && <span className="text-red-400">*</span>}
                      </label>
                      {field.type === "select" ? (
                        <select
                          required={field.required}
                          value={formData[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:border-[#9EFF00]/50 focus:outline-none"
                        >
                          <option value="">Select {field.label}</option>
                          {field.options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : field.type === "textarea" ? (
                        <textarea
                          required={field.required}
                          value={formData[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-[#9EFF00]/50 focus:outline-none resize-none"
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                        />
                      ) : (
                        <input
                          type={field.type}
                          required={field.required}
                          value={formData[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-[#9EFF00]/50 focus:outline-none"
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700/50 pt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="h-5 w-5 text-[#9EFF00]" />
                    <span className="text-sm text-gray-300">Your information is secure and will only be used for mentorship matching.</span>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting Application...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Submit Application</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
