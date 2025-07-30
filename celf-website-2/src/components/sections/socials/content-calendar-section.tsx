"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";

export function ContentCalendarSection() {
  return (
    <section id="content-calendar" className="py-20 lg:py-32 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Content Calendar</h2>
              <p className="text-gray-300">Coming soon - upcoming content schedule and events.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
