"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Shield, 
  Heart, 
  Users, 
  Lightbulb, 
  Target,
  Globe,
  Eye,
  Compass,
  Award,
  Zap
} from "lucide-react";

const coreValues = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We operate with the highest ethical standards, ensuring transparency in all our operations and maintaining trust with our community.",
    principles: ["Honest communication", "Ethical decision-making", "Transparent operations", "Accountability"],
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    icon: Heart,
    title: "Compassion",
    description: "We approach every interaction with empathy and understanding, recognizing the unique challenges each student faces.",
    principles: ["Empathetic support", "Understanding barriers", "Inclusive approach", "Student-first mindset"],
    color: "from-red-500/20 to-red-500/5"
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in the power of collective support and create environments where students help each other succeed.",
    principles: ["Collaborative spirit", "Mutual support", "Shared success", "Network building"],
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously seek new and better ways to serve our students, embracing technology and creative solutions.",
    principles: ["Creative problem-solving", "Technology adoption", "Continuous improvement", "Future-focused"],
    color: "from-yellow-500/20 to-yellow-500/5"
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for the highest quality in everything we do, from our technology to our student support services.",
    principles: ["Quality standards", "Continuous learning", "Best practices", "Performance focus"],
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: Globe,
    title: "Inclusivity",
    description: "We welcome students from all backgrounds and work to remove barriers that prevent access to education.",
    principles: ["Equal opportunity", "Cultural sensitivity", "Barrier removal", "Global accessibility"],
    color: "from-green-500/20 to-green-500/5"
  }
];

const valueImpacts = [
  {
    icon: Eye,
    title: "Transparency in Action",
    description: "All token distributions and scholarship awards are publicly verifiable on the blockchain.",
    metric: "100%",
    label: "Transparent Operations"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Students actively help each other through mentorship and peer support programs.",
    metric: "95%",
    label: "Community Satisfaction"
  },
  {
    icon: Award,
    title: "Merit-Based Fairness",
    description: "Scholarships awarded based purely on effort and consistency, not background or connections.",
    metric: "0%",
    label: "Bias in Selection"
  },
  {
    icon: Zap,
    title: "Innovation Leadership",
    description: "First foundation to successfully implement blockchain-based scholarship distribution.",
    metric: "1st",
    label: "Blockchain Pioneer"
  }
];

export function ValuesSection() {
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
            <Compass className="h-4 w-4 text-[#9EFF00]" />
            <span className="text-gray-300 text-sm font-medium">Our Values</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Values That{" "}
            <span className="text-[#9EFF00]">Guide Us</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our core values are more than just words - they're the foundation of every decision we make, 
            every program we create, and every student we support.
          </p>
        </motion.div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                    <value.icon className="h-6 w-6 text-[#9EFF00]" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#9EFF00] transition-colors duration-300">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {value.description}
                  </p>

                  {/* Principles */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">Key Principles:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {value.principles.map((principle, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-gray-300">
                          <div className="w-1.5 h-1.5 bg-[#9EFF00] rounded-full flex-shrink-0" />
                          <span>{principle}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Values in Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Values in Action
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              See how our values translate into real-world impact and measurable outcomes 
              for our students and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {valueImpacts.map((impact, index) => (
              <motion.div
                key={impact.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                  <impact.icon className="h-8 w-8 text-[#9EFF00]" />
                </div>
                <div className="text-3xl font-bold text-[#9EFF00] mb-2">
                  {impact.metric}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {impact.label}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {impact.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="pt-8 border-t border-[#9EFF00]/20">
            <div className="text-center">
              <h4 className="text-xl font-bold text-white mb-4">
                Living Our Values Every Day
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="text-left">
                  <h5 className="font-semibold text-white mb-2">In Our Technology:</h5>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Our blockchain-based system embodies transparency and fairness, 
                    ensuring every token earned and scholarship awarded is verifiable and merit-based.
                  </p>
                </div>
                <div className="text-left">
                  <h5 className="font-semibold text-white mb-2">In Our Community:</h5>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    We foster an inclusive environment where students from all backgrounds 
                    support each other's success through mentorship and collaborative learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
