"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { PieChart, FileText, Eye, CheckCircle } from "lucide-react";

export function TransparencySection() {
  return (
    <section className="py-20 lg:py-32 bg-[#0A0A0A]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Financial Transparency</h2>
              <p className="text-gray-300 mb-8">
                We believe in complete transparency about how your donations are used. 
                Here's exactly where your money goes to create maximum impact.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#9EFF00] mb-2">85%</div>
                  <div className="text-white font-medium mb-1">Direct Programs</div>
                  <div className="text-gray-400 text-sm">Student support & scholarships</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#9EFF00] mb-2">10%</div>
                  <div className="text-white font-medium mb-1">Operations</div>
                  <div className="text-gray-400 text-sm">Platform & technology</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#9EFF00] mb-2">5%</div>
                  <div className="text-white font-medium mb-1">Fundraising</div>
                  <div className="text-gray-400 text-sm">Donor acquisition & events</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
