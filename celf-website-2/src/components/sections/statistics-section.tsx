"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";

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
    number: "2500+",
    label: "Active Miners",
    description:
      "Students actively mining CELF tokens and building their educational future",
  },
  {
    number: "150+",
    label: "Scholarships Awarded",
    description:
      "Educational scholarships distributed to deserving students worldwide",
  },
  {
    number: "25+",
    label: "Countries Reached",
    description:
      "Global presence spanning across multiple continents and cultures",
  },
  {
    number: "8",
    label: "Years of Impact",
    description:
      "Since 2016, transforming lives through educational opportunities",
  },
  {
    number: "95%",
    label: "Success Rate",
    description:
      "Of scholarship recipients successfully completing their educational goals",
  },
  {
    number: "1M+",
    label: "CELF Tokens Mined",
    description:
      "Total tokens mined by our global community of dedicated students",
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
            Trusted by{" "}
            <span className="text-[#9EFF00]">Millions Worldwide</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our impact speaks for itself. Join a global community that's
            revolutionizing education funding through innovative blockchain
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

        {/* Globe visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative max-w-md mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="w-64 h-64 mx-auto relative"
            >
              <div className="absolute inset-0 bg-gradient-radial from-[#9EFF00]/20 to-transparent rounded-full shadow-[0_0_100px_rgba(158,255,0,0.3)]" />
              <div className="absolute inset-4 bg-gray-900/80 rounded-full border border-[#9EFF00]/30 backdrop-blur-sm" />

              {/* Animated dots representing global users */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[#9EFF00] rounded-full shadow-[0_0_10px_rgba(158,255,0,0.6)]"
                  style={{
                    top: `${20 + Math.sin(i * 0.8) * 30}%`,
                    left: `${20 + Math.cos(i * 0.8) * 30}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-300 mt-6 text-lg font-medium"
            >
              Connecting students globally through blockchain education
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
