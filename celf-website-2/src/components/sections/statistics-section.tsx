"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import WorldMap from "@/src/components/ui/world-map";

interface StatisticProps {
  number: string;
  label: string;
  description: string;
  delay?: number;
}

function AnimatedNumber({
  target,
  duration = 2000,
}: {
  target: number;
  duration?: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
      setCurrent((prev) => {
        const next = prev + increment;
        if (next >= target) {
          clearInterval(timer);
          return target;
        }
        return next;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return Math.floor(current);
}

function Statistic({ number, label, description, delay = 0 }: StatisticProps) {
  const numericValue = parseInt(number.replace(/[^0-9]/g, ""));
  const suffix = number.replace(/[0-9]/g, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    >
      <Card className="text-center h-full">
        <CardContent className="p-8">
          <div className="text-stat font-bold text-brand-primary mb-2">
            <AnimatedNumber target={numericValue} />
            {suffix}
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-3">
            {label}
          </h3>
          <p className="text-text-secondary leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const statistics = [
  {
    number: "500+",
    label: "Community Members",
    description:
      "Early supporters and beta testers preparing for our platform launch",
  },
  {
    number: "25+",
    label: "Pilot Scholarships",
    description:
      "Early scholarships awarded during our foundation phase",
  },
  {
    number: "5+",
    label: "Countries Interested",
    description:
      "Initial markets where we've conducted research and built interest",
  },
  {
    number: "8",
    label: "Years of Development",
    description:
      "Since 2016, researching and developing innovative education solutions",
  },
  {
    number: "2025",
    label: "Launch Year",
    description:
      "When our revolutionary blockchain platform will go live",
  },
  {
    number: "100%",
    label: "Innovation Focus",
    description:
      "Dedicated to creating the most advanced education funding platform",
  },
];

export function StatisticsSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-[#0A0A0A]">
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
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#9EFF00]/10 to-transparent rounded-full blur-3xl"
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
            Building the{" "}
            <span className="text-[#9EFF00]">Future of Education</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our development progress speaks for itself. Join our growing community
            as we prepare to revolutionize education funding through innovative blockchain
            technology.
          </p>
        </motion.div>

        {/* Statistics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {statistics.map((stat, index) => (
            <Statistic
              key={stat.label}
              number={stat.number}
              label={stat.label}
              description={stat.description}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Enhanced World Map Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="relative max-w-7xl mx-auto">
            {/* Modern container with enhanced styling */}
            <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 rounded-3xl p-8 lg:p-12 border border-[#9EFF00]/30 backdrop-blur-xl shadow-[0_0_80px_rgba(158,255,0,0.15)]">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#9EFF00]/5 via-transparent to-[#9EFF00]/5 rounded-3xl" />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#9EFF00] to-transparent rounded-full" />

              {/* Section title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Global <span className="text-[#9EFF00]">Network</span>
                </h3>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  Connecting students worldwide through blockchain education
                </p>
              </motion.div>

              {/* Enhanced WorldMap */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <WorldMap
                  dots={[
                    {
                      start: { lat: 40.7128, lng: -74.0060, label: "New York" },
                      end: { lat: 51.5074, lng: -0.1278, label: "London" },
                    },
                    {
                      start: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
                      end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
                    },
                    {
                      start: { lat: 55.7558, lng: 37.6176, label: "Moscow" },
                      end: { lat: -26.2041, lng: 28.0473, label: "Johannesburg" },
                    },
                    {
                      start: { lat: 19.0760, lng: 72.8777, label: "Mumbai" },
                      end: { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
                    },
                    {
                      start: { lat: 39.9042, lng: 116.4074, label: "Beijing" },
                      end: { lat: 52.5200, lng: 13.4050, label: "Berlin" },
                    },
                    {
                      start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
                      end: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
                    },
                    {
                      start: { lat: -34.6037, lng: -58.3816, label: "Buenos Aires" },
                      end: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
                    },
                    {
                      start: { lat: 30.0444, lng: 31.2357, label: "Cairo" },
                      end: { lat: 13.7563, lng: 100.5018, label: "Bangkok" },
                    },
                  ]}
                  lineColor="#9EFF00"
                />
              </motion.div>

              {/* Stats overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                viewport={{ once: true }}
                className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
              >
                <div className="bg-[#9EFF00]/10 rounded-xl p-4 border border-[#9EFF00]/20">
                  <div className="text-2xl font-bold text-[#9EFF00]">5+</div>
                  <div className="text-sm text-gray-300">Countries</div>
                </div>
                <div className="bg-[#9EFF00]/10 rounded-xl p-4 border border-[#9EFF00]/20">
                  <div className="text-2xl font-bold text-[#9EFF00]">500+</div>
                  <div className="text-sm text-gray-300">Community</div>
                </div>
                <div className="bg-[#9EFF00]/10 rounded-xl p-4 border border-[#9EFF00]/20">
                  <div className="text-2xl font-bold text-[#9EFF00]">2025</div>
                  <div className="text-sm text-gray-300">Launch Year</div>
                </div>
                <div className="bg-[#9EFF00]/10 rounded-xl p-4 border border-[#9EFF00]/20">
                  <div className="text-2xl font-bold text-[#9EFF00]">24/7</div>
                  <div className="text-sm text-gray-300">Development</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
