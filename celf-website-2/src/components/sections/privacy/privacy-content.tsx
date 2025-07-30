"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Shield, Lock, Eye, Users, Globe, Database, CheckCircle, AlertTriangle, Settings } from "lucide-react";

export function PrivacyContent() {
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
            <span className="text-gray-300 font-medium">Privacy Policy</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Your Privacy{" "}
            <span className="text-[#9EFF00]">Matters</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Learn how we collect, use, and protect your personal information on the CELF platform.
          </p>
        </motion.div>

        {/* Privacy Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="border-[#9EFF00]/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h3 className="font-bold text-white mb-2">Data Protection</h3>
              <p className="text-gray-300 text-sm">Your data is encrypted and securely stored with industry-standard protection</p>
            </CardContent>
          </Card>

          <Card className="border-[#9EFF00]/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h3 className="font-bold text-white mb-2">Transparency</h3>
              <p className="text-gray-300 text-sm">Clear information about what data we collect and how we use it</p>
            </CardContent>
          </Card>

          <Card className="border-[#9EFF00]/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Settings className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <h3 className="font-bold text-white mb-2">Your Control</h3>
              <p className="text-gray-300 text-sm">Full control over your data with options to view, edit, or delete</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Policy Content */}
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
                  <Shield className="h-6 w-6 text-[#9EFF00] mr-3" />
                  CELF Privacy Policy
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
                    <h3 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h3>
                    <p className="mb-4">
                      We collect information you provide directly to us, information we obtain automatically when you use our services, 
                      and information from third parties.
                    </p>
                    
                    <h4 className="text-lg font-semibold text-white mb-2">Personal Information:</h4>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Name, email address, and contact information</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Educational background and academic goals</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Profile information and preferences</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Communication and interaction data</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold text-white mb-2">Usage Information:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Platform usage patterns and preferences</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Token mining activity and progress</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Device information and technical data</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Provide and improve our educational services</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Match you with appropriate mentors and opportunities</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Communicate with you about platform updates and opportunities</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Ensure platform security and prevent fraud</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Analyze usage patterns to improve user experience</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">3. Information Sharing</h3>
                    <p className="mb-4">
                      We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                      except as described in this policy.
                    </p>
                    
                    <h4 className="text-lg font-semibold text-white mb-2">We may share information:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>With mentors for mentorship matching and communication</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>With service providers who assist in platform operations</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>When required by law or to protect our rights</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>In connection with business transfers or mergers</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">4. Data Security</h3>
                    <p className="mb-4">
                      We implement appropriate technical and organizational measures to protect your personal information 
                      against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <Lock className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>End-to-end encryption for sensitive data</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Lock className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Regular security audits and updates</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Lock className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Secure data centers with 24/7 monitoring</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Lock className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Access controls and employee training</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">5. Your Rights and Choices</h3>
                    <p className="mb-4">
                      You have certain rights regarding your personal information, including:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <Settings className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Access and review your personal information</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Settings className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Correct or update inaccurate information</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Settings className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Delete your account and associated data</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Settings className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Opt-out of marketing communications</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Settings className="h-4 w-4 text-[#9EFF00] mt-1 flex-shrink-0" />
                        <span>Data portability and export options</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">6. Cookies and Tracking</h3>
                    <p className="mb-4">
                      We use cookies and similar technologies to enhance your experience, analyze usage, and provide 
                      personalized content. You can control cookie settings through your browser preferences.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">7. International Data Transfers</h3>
                    <p>
                      Your information may be transferred to and processed in countries other than your own. 
                      We ensure appropriate safeguards are in place to protect your data during international transfers.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">8. Children's Privacy</h3>
                    <p>
                      Our services are not directed to children under 13. We do not knowingly collect personal 
                      information from children under 13. If we become aware of such collection, we will delete 
                      the information immediately.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">9. Changes to This Policy</h3>
                    <p>
                      We may update this Privacy Policy from time to time. We will notify you of any material 
                      changes by posting the new policy on our website and updating the "Last Updated" date.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">10. Contact Us</h3>
                    <p>
                      If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="mt-3 p-4 bg-gray-800/50 rounded-lg">
                      <p><strong>Email:</strong> privacy@celf.education</p>
                      <p><strong>Address:</strong> CELF Privacy Officer</p>
                      <p><strong>Website:</strong> https://celf.education/contact</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-700/50 pt-6 mt-8">
                    <p className="text-sm text-gray-400">
                      By using the CELF platform, you acknowledge that you have read and understood this Privacy Policy 
                      and agree to the collection, use, and disclosure of your information as described herein.
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
