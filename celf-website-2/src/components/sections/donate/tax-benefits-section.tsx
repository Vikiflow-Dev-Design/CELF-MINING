"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { FileText, CheckCircle, Award, Calculator } from "lucide-react";

export function TaxBenefitsSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
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
              <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-[#9EFF00]" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-6">Tax Benefits</h2>
              <p className="text-gray-300 mb-8">
                CELF is a registered 501(c)(3) nonprofit organization. Your donations are tax-deductible 
                to the full extent allowed by law.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#9EFF00] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white mb-1">Immediate Receipt</div>
                    <div className="text-gray-300 text-sm">Tax-deductible receipt sent within 24 hours</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#9EFF00] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white mb-1">Annual Summary</div>
                    <div className="text-gray-300 text-sm">Comprehensive year-end donation summary</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#9EFF00] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white mb-1">Corporate Benefits</div>
                    <div className="text-gray-300 text-sm">Additional tax advantages for business donations</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#9EFF00] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white mb-1">Expert Support</div>
                    <div className="text-gray-300 text-sm">Tax consultation available for major donors</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-[#9EFF00]/10 border border-[#9EFF00]/20 rounded-lg">
                <div className="text-sm text-gray-300">
                  <strong className="text-[#9EFF00]">Tax ID:</strong> 12-3456789 • 
                  <strong className="text-[#9EFF00]"> Status:</strong> 501(c)(3) Nonprofit Organization
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
