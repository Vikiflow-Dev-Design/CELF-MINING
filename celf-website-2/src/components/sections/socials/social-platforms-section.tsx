"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin,
  Facebook,
  MessageCircle,
  ArrowRight,
  Users,
  Heart,
  Share2,
  Play,
  Calendar,
  Zap
} from "lucide-react";

const socialPlatforms = [
  {
    name: "Instagram",
    handle: "@celf_education",
    followers: "25.2K",
    posts: "1,247",
    engagement: "8.5%",
    description: "Daily inspiration, success stories, and behind-the-scenes content from our global student community.",
    icon: Instagram,
    color: "from-pink-500/20 to-pink-500/5",
    borderColor: "border-pink-500/30",
    url: "https://instagram.com/celf_education",
    content: [
      "Student success stories",
      "Daily motivation quotes",
      "Study tips and tricks",
      "Community highlights",
      "Behind-the-scenes content"
    ],
    recentPosts: [
      { type: "Story", title: "Maria's Harvard acceptance!", likes: "2.3K", time: "2h" },
      { type: "Post", title: "5 scholarship application tips", likes: "1.8K", time: "1d" },
      { type: "Reel", title: "Study routine that works", likes: "4.1K", time: "2d" }
    ]
  },
  {
    name: "Twitter",
    handle: "@CELF_Official",
    followers: "18.7K",
    posts: "3,456",
    engagement: "12.3%",
    description: "Real-time updates, educational threads, and quick tips for students pursuing their dreams.",
    icon: Twitter,
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    url: "https://twitter.com/CELF_Official",
    content: [
      "Educational threads",
      "Quick study tips",
      "Scholarship alerts",
      "Community discussions",
      "Live tweet events"
    ],
    recentPosts: [
      { type: "Thread", title: "How to write scholarship essays", likes: "892", time: "3h" },
      { type: "Tweet", title: "New scholarship opportunity!", likes: "1.2K", time: "6h" },
      { type: "Poll", title: "Best study time?", likes: "567", time: "1d" }
    ]
  },
  {
    name: "YouTube",
    handle: "CELF Education",
    followers: "15.4K",
    posts: "234",
    engagement: "15.7%",
    description: "In-depth tutorials, student interviews, and educational content to help you succeed.",
    icon: Youtube,
    color: "from-red-500/20 to-red-500/5",
    borderColor: "border-red-500/30",
    url: "https://youtube.com/@CELFEducation",
    content: [
      "Educational tutorials",
      "Student interviews",
      "Scholarship guides",
      "Study techniques",
      "Live Q&A sessions"
    ],
    recentPosts: [
      { type: "Video", title: "Complete scholarship guide", likes: "3.4K", time: "1w" },
      { type: "Short", title: "Quick study hack", likes: "8.9K", time: "3d" },
      { type: "Live", title: "Q&A with mentors", likes: "2.1K", time: "5d" }
    ]
  },
  {
    name: "LinkedIn",
    handle: "CELF Education",
    followers: "12.8K",
    posts: "567",
    engagement: "9.2%",
    description: "Professional insights, career advice, and networking opportunities for ambitious students.",
    icon: Linkedin,
    color: "from-blue-600/20 to-blue-600/5",
    borderColor: "border-blue-600/30",
    url: "https://linkedin.com/company/celf-education",
    content: [
      "Career advice",
      "Professional insights",
      "Industry trends",
      "Networking tips",
      "Alumni spotlights"
    ],
    recentPosts: [
      { type: "Article", title: "Future of education", likes: "456", time: "2d" },
      { type: "Post", title: "Alumni spotlight: Tech leader", likes: "789", time: "4d" },
      { type: "Event", title: "Virtual networking event", likes: "234", time: "1w" }
    ]
  },
  {
    name: "TikTok",
    handle: "@celf_edu",
    followers: "32.1K",
    posts: "892",
    engagement: "18.4%",
    description: "Fun, engaging educational content and study tips in bite-sized videos.",
    icon: MessageCircle,
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    url: "https://tiktok.com/@celf_edu",
    content: [
      "Study hacks",
      "Educational trends",
      "Student life content",
      "Quick tips",
      "Viral challenges"
    ],
    recentPosts: [
      { type: "Video", title: "Study with me routine", likes: "12.3K", time: "1d" },
      { type: "Trend", title: "Scholarship application dance", likes: "8.7K", time: "2d" },
      { type: "Tip", title: "Memory technique hack", likes: "15.2K", time: "3d" }
    ]
  },
  {
    name: "Discord",
    handle: "CELF Community",
    followers: "8.9K",
    posts: "∞",
    engagement: "Active 24/7",
    description: "Real-time community chat, study groups, and peer support for students worldwide.",
    icon: MessageCircle,
    color: "from-indigo-500/20 to-indigo-500/5",
    borderColor: "border-indigo-500/30",
    url: "https://discord.gg/celf",
    content: [
      "Study groups",
      "Peer support",
      "Live discussions",
      "Voice channels",
      "Community events"
    ],
    recentPosts: [
      { type: "Message", title: "Active study session", likes: "45", time: "now" },
      { type: "Event", title: "Weekly mentor chat", likes: "123", time: "2h" },
      { type: "Channel", title: "Scholarship discussions", likes: "89", time: "ongoing" }
    ]
  }
];

export function SocialPlatformsSection() {
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Our{" "}
            <span className="text-[#9EFF00]">Platforms</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect with us across all major social platforms. Each platform offers unique content 
            tailored to help you succeed in your educational journey.
          </p>
        </motion.div>

        {/* Social Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {socialPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full group cursor-pointer border-[#9EFF00]/20 hover:${platform.borderColor} transition-colors duration-300`}>
                <CardContent className="p-6">
                  {/* Platform Header */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                      <platform.icon className="h-6 w-6 text-[#9EFF00]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#9EFF00] transition-colors duration-300">
                        {platform.name}
                      </h3>
                      <div className="text-sm text-gray-400">{platform.handle}</div>
                    </div>
                  </div>

                  {/* Platform Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00]">{platform.followers}</div>
                      <div className="text-xs text-gray-400">Followers</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00]">{platform.posts}</div>
                      <div className="text-xs text-gray-400">Posts</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#9EFF00]">{platform.engagement}</div>
                      <div className="text-xs text-gray-400">Engagement</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {platform.description}
                  </p>

                  {/* Content Types */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">Content:</h4>
                    <div className="flex flex-wrap gap-1">
                      {platform.content.slice(0, 3).map((type, idx) => (
                        <span key={idx} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded">
                          {type}
                        </span>
                      ))}
                      {platform.content.length > 3 && (
                        <span className="text-xs text-gray-400">+{platform.content.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  {/* Recent Posts */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white mb-2">Recent:</h4>
                    <div className="space-y-2">
                      {platform.recentPosts.slice(0, 2).map((post, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            <span className="text-[#9EFF00]">{post.type}</span>
                            <span className="text-gray-300 truncate">{post.title}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-400">
                            <Heart className="h-3 w-3" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full" size="sm">
                    <Link href={platform.url} target="_blank" rel="noopener noreferrer" className="group">
                      Follow on {platform.name}
                      <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Follow All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Connected Everywhere
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Follow us on all platforms to never miss updates, tips, and inspiration. 
                Each platform offers unique content designed to support your educational journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="#follow-us" className="group">
                    Follow All Platforms
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="#content-calendar">View Content Calendar</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
