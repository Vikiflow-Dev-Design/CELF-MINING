"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Building, Star, Award } from "lucide-react";

const sponsors = [
  { name: "TechCorp Global", tier: "Platinum", logo: "TC" },
  { name: "Education First", tier: "Gold", logo: "EF" },
  { name: "Future Foundation", tier: "Silver", logo: "FF" },
  { name: "Innovation Labs", tier: "Bronze", logo: "IL" },
  { name: "Global Partners", tier: "Silver", logo: "GP" },
  { name: "Learning Solutions", tier: "Gold", logo: "LS" }
];

export function SponsorShowcaseSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Our{" "}
            <span className="text-[#9EFF00]">Partners</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're proud to work with organizations that share our commitment to educational excellence and student success.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-[#9EFF00]/20 hover:border-[#9EFF00]/40 transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-[#9EFF00]">{sponsor.logo}</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2 text-sm">{sponsor.name}</h4>
                  <div className="text-xs text-[#9EFF00]">{sponsor.tier} Partner</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
