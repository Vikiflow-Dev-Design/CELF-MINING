"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Shield, FileText, Users, Globe, CheckCircle, AlertTriangle } from "lucide-react";

export function LicenseContent() {
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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#9EFF00]/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gray-900/80 border border-[#9EFF00]/30 rounded-full px-6 py-3 mb-8">
            <Shield className="h-5 w-5 text-[#9EFF00]" />
            <span className="text-gray-300 font-medium">License Agreement</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            CELF Platform{" "}
            <span className="text-[#9EFF00]">License</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Terms and conditions governing the use of the CELF educational platform and services.
          </p>
        </motion.div>

        {/* License Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="border-[#9EFF00]/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h3 className="font-bold text-white mb-2">User License</h3>
              <p className="text-gray-300 text-sm">Personal, non-commercial use of CELF platform and services</p>
            </CardContent>
          </Card>

          <Card className="border-[#9EFF00]/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h3 className="font-bold text-white mb-2">Global Coverage</h3>
              <p className="text-gray-300 text-sm">License terms apply worldwide with local law compliance</p>
            </CardContent>
          </Card>

          <Card className="border-[#9EFF00]/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h3 className="font-bold text-white mb-2">Open Source</h3>
              <p className="text-gray-300 text-sm">Certain components available under open source licenses</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* License Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-8"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
            <CardContent className="p-8">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FileText className="h-6 w-6 text-[#9EFF00] mr-3" />
                  CELF Platform License Agreement
                </h2>

                <div className="text-gray-300 space-y-6 leading-relaxed">
                  <div>
                    <p className="text-sm text-gray-400 mb-4">
                      <strong>Effective Date:</strong> January 1, 2024<br />
                      <strong>Last Updated:</strong> January 1, 2024<br />
                      <strong>Version:</strong> 1.0
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">1. Grant of License</h3>
                    <p>
                      Subject to the terms and conditions of this License Agreement, CELF grants you a limited, 
                      non-exclusive, non-transferable, revocable license to use the CELF platform and services 
                      for personal, educational, and non-commercial purposes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">2. Permitted Uses</h3>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Access and use CELF educational content and resources</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Participate in CELF token mining activities</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Engage with the CELF community and mentorship programs</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Apply for scholarships and educational opportunities</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Share your educational journey and achievements</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">3. Restrictions</h3>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                        <span>You may not use the platform for commercial purposes without explicit permission</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                        <span>You may not reverse engineer, decompile, or disassemble the platform</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                        <span>You may not redistribute or resell access to CELF services</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                        <span>You may not use the platform for illegal or harmful activities</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">4. Intellectual Property</h3>
                    <p>
                      All content, features, and functionality of the CELF platform, including but not limited to 
                      text, graphics, logos, icons, images, audio clips, and software, are the exclusive property 
                      of CELF or its licensors and are protected by copyright, trademark, and other intellectual 
                      property laws.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">5. Open Source Components</h3>
                    <p>
                      Certain components of the CELF platform may be made available under open source licenses. 
                      These components are clearly identified and governed by their respective open source license 
                      terms, which may grant you additional rights beyond this License Agreement.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">6. Token Mining License</h3>
                    <p>
                      The CELF token mining feature is provided under this license for educational and community 
                      participation purposes. Mined tokens have no monetary value and are used solely within the 
                      CELF ecosystem for accessing educational opportunities and services.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">7. Termination</h3>
                    <p>
                      This license is effective until terminated. CELF may terminate this license at any time 
                      if you fail to comply with any term or condition. Upon termination, you must cease all 
                      use of the CELF platform and destroy any downloaded materials.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">8. Disclaimer of Warranties</h3>
                    <p>
                      The CELF platform is provided "as is" without warranty of any kind. CELF disclaims all 
                      warranties, express or implied, including but not limited to warranties of merchantability, 
                      fitness for a particular purpose, and non-infringement.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">9. Limitation of Liability</h3>
                    <p>
                      In no event shall CELF be liable for any indirect, incidental, special, consequential, 
                      or punitive damages, including but not limited to loss of profits, data, or use, arising 
                      out of or in connection with your use of the platform.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">10. Governing Law</h3>
                    <p>
                      This License Agreement shall be governed by and construed in accordance with the laws 
                      of the jurisdiction where CELF is incorporated, without regard to its conflict of law 
                      provisions.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">11. Contact Information</h3>
                    <p>
                      If you have any questions about this License Agreement, please contact us at:
                    </p>
                    <div className="mt-3 p-4 bg-gray-800/50 rounded-lg">
                      <p><strong>Email:</strong> legal@celf.education</p>
                      <p><strong>Address:</strong> CELF Legal Department</p>
                      <p><strong>Website:</strong> https://celf.education/contact</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-700/50 pt-6 mt-8">
                    <p className="text-sm text-gray-400">
                      By using the CELF platform, you acknowledge that you have read, understood, and agree 
                      to be bound by the terms and conditions of this License Agreement.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
