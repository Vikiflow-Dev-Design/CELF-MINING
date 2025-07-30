"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Users, 
  ArrowRight, 
  Download,
  MessageCircle,
  Award,
  Heart,
  Globe,
  Star,
  CheckCircle,
  Zap,
  Target,
  BookOpen
} from "lucide-react";

const joinSteps = [
  {
    step: 1,
    icon: Download,
    title: "Download CELF App",
    description: "Get the CELF mobile app from your device's app store and create your account.",
    action: "Download Now",
    link: "/download"
  },
  {
    step: 2,
    icon: Zap,
    title: "Start Mining",
    description: "Begin mining CELF tokens to qualify for scholarships and community participation.",
    action: "Learn Mining",
    link: "/how-it-works"
  },
  {
    step: 3,
    icon: Users,
    title: "Join Forums",
    description: "Access our community forums to connect with students and get support.",
    action: "Browse Forums",
    link: "/forums"
  },
  {
    step: 4,
    icon: Target,
    title: "Set Goals",
    description: "Define your educational goals and get matched with mentors and resources.",
    action: "Set Goals",
    link: "/goals"
  }
];

const communityBenefits = [
  {
    icon: MessageCircle,
    title: "24/7 Support",
    description: "Get help anytime from our global community of students and mentors",
    highlight: "Always someone online"
  },
  {
    icon: Award,
    title: "Scholarship Opportunities",
    description: "Access exclusive scholarship information and application support",
    highlight: "$2.5M+ awarded"
  },
  {
    icon: BookOpen,
    title: "Study Resources",
    description: "Share and access study materials, guides, and academic resources",
    highlight: "1000+ resources"
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Connect with students from 25+ countries and expand your worldview",
    highlight: "2,500+ members"
  },
  {
    icon: Heart,
    title: "Peer Mentorship",
    description: "Get guidance from successful students who've walked your path",
    highlight: "1,200+ mentor pairs"
  },
  {
    icon: Star,
    title: "Success Stories",
    description: "Be inspired by and contribute to our growing collection of achievements",
    highlight: "150+ success stories"
  }
];

const testimonials = [
  {
    name: "Maria Rodriguez",
    country: "Spain",
    achievement: "$15,000 Scholarship",
    quote: "The CELF community became my second family. The support and guidance I received helped me achieve my dreams.",
    rating: 5
  },
  {
    name: "James Chen",
    country: "Singapore",
    achievement: "Biomedical Engineering",
    quote: "Through CELF, I found mentors who guided me through my application process and helped me succeed.",
    rating: 5
  },
  {
    name: "Amara Okafor",
    country: "Nigeria",
    achievement: "Oxford University",
    quote: "CELF opened doors I never knew existed. The global perspective I gained was invaluable.",
    rating: 5
  }
];

const communityStats = [
  { number: "2,500+", label: "Active Members", icon: Users },
  { number: "25+", label: "Countries", icon: Globe },
  { number: "10K+", label: "Daily Messages", icon: MessageCircle },
  { number: "150+", label: "Success Stories", icon: Award }
];

export function JoinCommunitySection() {
  return (
    <section id="join-community" className="py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Join Our{" "}
            <span className="text-[#9EFF00]">Community</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Become part of a global network of ambitious students supporting each other's 
            educational journeys. Your success story starts here.
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {communityStats.map((stat, index) => (
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
              <h4 className="text-sm font-semibold text-white">
                {stat.label}
              </h4>
            </motion.div>
          ))}
        </motion.div>

        {/* How to Join */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            How to Join
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {joinSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                  <CardContent className="p-6">
                    {/* Step Number */}
                    <div className="w-8 h-8 bg-[#9EFF00] rounded-full flex items-center justify-center text-black font-bold text-sm mx-auto mb-4">
                      {step.step}
                    </div>

                    <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                      <step.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    
                    <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                      {step.title}
                    </h4>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>

                    <Button size="sm" variant="secondary" asChild>
                      <Link href={step.link}>{step.action}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            Why Students Love Our Community
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                      <benefit.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    
                    <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                      {benefit.title}
                    </h4>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      {benefit.description}
                    </p>

                    <div className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-3 py-1 rounded-full font-medium inline-block">
                      {benefit.highlight}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            What Our Members Say
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-gray-300 leading-relaxed italic mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="border-t border-gray-700/50 pt-4">
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.country}</div>
                      <div className="text-xs text-[#9EFF00] mt-1">{testimonial.achievement}</div>
                    </div>
                  </CardContent>
                </Card>
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
                <Users className="h-8 w-8 text-[#9EFF00]" />
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Join 2,500+ Students?
              </h3>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Your educational journey doesn't have to be a solo adventure. Join our supportive 
                community and turn your dreams into achievements with help from students worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button size="xl" asChild>
                  <Link href="/download" className="group">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="secondary" size="xl" asChild>
                  <Link href="/forums">Browse Forums</Link>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-[#9EFF00]" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-[#9EFF00]" />
                  <span>No commitments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-[#9EFF00]" />
                  <span>Instant access</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
