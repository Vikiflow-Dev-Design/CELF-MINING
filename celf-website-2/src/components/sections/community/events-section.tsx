"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { 
  Calendar, 
  Clock, 
  Users, 
  Video,
  MapPin,
  ArrowRight,
  Play,
  BookOpen,
  Award,
  Globe,
  Mic,
  Coffee,
  Star
} from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Scholarship Application Workshop",
    type: "Workshop",
    date: "2024-02-15",
    time: "2:00 PM EST",
    duration: "2 hours",
    attendees: 156,
    maxAttendees: 200,
    speaker: "Dr. Sarah Chen",
    speakerRole: "Scholarship Advisor",
    description: "Learn the secrets to writing compelling scholarship applications that stand out from the crowd.",
    topics: ["Essay Writing", "Application Strategy", "Interview Prep", "Common Mistakes"],
    isLive: false,
    isFeatured: true,
    registrationLink: "/events/scholarship-workshop",
    icon: Award,
    color: "from-[#9EFF00]/20 to-[#9EFF00]/5"
  },
  {
    id: 2,
    title: "Global Student Networking Hour",
    type: "Networking",
    date: "2024-02-18",
    time: "7:00 PM EST",
    duration: "1.5 hours",
    attendees: 89,
    maxAttendees: 150,
    speaker: "Community Team",
    speakerRole: "CELF Moderators",
    description: "Connect with students from around the world, share experiences, and build lasting friendships.",
    topics: ["Cultural Exchange", "Study Abroad", "International Perspectives", "Friendship Building"],
    isLive: false,
    isFeatured: false,
    registrationLink: "/events/networking-hour",
    icon: Globe,
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    id: 3,
    title: "STEM Career Panel Discussion",
    type: "Panel",
    date: "2024-02-22",
    time: "4:00 PM EST",
    duration: "1 hour",
    attendees: 234,
    maxAttendees: 300,
    speaker: "Industry Professionals",
    speakerRole: "Tech Leaders",
    description: "Hear from successful professionals in STEM fields about career paths, opportunities, and advice.",
    topics: ["Career Paths", "Industry Insights", "Skill Development", "Q&A Session"],
    isLive: false,
    isFeatured: true,
    registrationLink: "/events/stem-panel",
    icon: Mic,
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    id: 4,
    title: "Study Techniques Masterclass",
    type: "Masterclass",
    date: "2024-02-25",
    time: "1:00 PM EST",
    duration: "90 minutes",
    attendees: 67,
    maxAttendees: 100,
    speaker: "Prof. Elena Martinez",
    speakerRole: "Educational Psychologist",
    description: "Master proven study techniques that will help you learn more effectively and retain information better.",
    topics: ["Memory Techniques", "Time Management", "Note Taking", "Exam Strategies"],
    isLive: false,
    isFeatured: false,
    registrationLink: "/events/study-masterclass",
    icon: BookOpen,
    color: "from-green-500/20 to-green-500/5"
  }
];

const eventTypes = [
  {
    icon: Award,
    title: "Workshops",
    description: "Interactive sessions on scholarship applications, study skills, and career development",
    count: "8 monthly"
  },
  {
    icon: Mic,
    title: "Panel Discussions",
    description: "Expert panels featuring industry professionals and successful alumni",
    count: "4 monthly"
  },
  {
    icon: Globe,
    title: "Networking Events",
    description: "Connect with students worldwide through structured networking sessions",
    count: "6 monthly"
  },
  {
    icon: Coffee,
    title: "Coffee Chats",
    description: "Casual conversations with mentors and peers in small group settings",
    count: "12 monthly"
  }
];

const eventStats = [
  {
    icon: Calendar,
    number: "30+",
    label: "Monthly Events",
    description: "Diverse programming"
  },
  {
    icon: Users,
    number: "1,500+",
    label: "Participants",
    description: "Average monthly attendance"
  },
  {
    icon: Star,
    number: "4.8/5",
    label: "Event Rating",
    description: "Participant satisfaction"
  },
  {
    icon: Globe,
    number: "20+",
    label: "Time Zones",
    description: "Global accessibility"
  }
];

export function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState(upcomingEvents[0]);

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#9EFF00]/20 to-transparent rounded-full blur-3xl"
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
            Community{" "}
            <span className="text-[#9EFF00]">Events</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join our regular events designed to help you learn, grow, and connect with the global CELF community. 
            From workshops to networking sessions, there's something for everyone.
          </p>
        </motion.div>

        {/* Event Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {eventStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                <stat.icon className="h-6 w-6 text-[#9EFF00]" />
              </div>
              <div className="text-2xl font-bold text-[#9EFF00] mb-1">
                {stat.number}
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                {stat.label}
              </h4>
              <p className="text-xs text-gray-400">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Event and Event List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Featured Event */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Featured Event</h3>
            
            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-[#9EFF00]/30">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${selectedEvent.color} rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(158,255,0,0.1)]`}>
                    <selectedEvent.icon className="h-6 w-6 text-[#9EFF00]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs bg-[#9EFF00]/20 text-[#9EFF00] px-2 py-1 rounded-full font-medium">
                        {selectedEvent.type}
                      </span>
                      {selectedEvent.isFeatured && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <CardTitle className="mb-2">{selectedEvent.title}</CardTitle>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {selectedEvent.description}
                </p>

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar className="h-4 w-4 text-[#9EFF00]" />
                    <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock className="h-4 w-4 text-[#9EFF00]" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Video className="h-4 w-4 text-[#9EFF00]" />
                    <span>{selectedEvent.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Users className="h-4 w-4 text-[#9EFF00]" />
                    <span>{selectedEvent.attendees}/{selectedEvent.maxAttendees}</span>
                  </div>
                </div>

                {/* Speaker */}
                <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Speaker</div>
                  <div className="font-medium text-white">{selectedEvent.speaker}</div>
                  <div className="text-xs text-gray-400">{selectedEvent.speakerRole}</div>
                </div>

                {/* Topics */}
                <div className="mb-6">
                  <div className="text-sm text-gray-400 mb-2">Topics Covered:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.topics.map((topic, idx) => (
                      <span key={idx} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href={selectedEvent.registrationLink} className="group">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Events List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Upcoming Events</h3>
            
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className={`group cursor-pointer transition-colors duration-300 ${
                      selectedEvent.id === event.id 
                        ? 'border-[#9EFF00]/40 bg-[#9EFF00]/5' 
                        : 'border-[#9EFF00]/20 hover:border-[#9EFF00]/40'
                    }`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${event.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <event.icon className="h-5 w-5 text-[#9EFF00]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-white text-sm group-hover:text-[#9EFF00] transition-colors duration-300 truncate">
                              {event.title}
                            </h4>
                            {event.isFeatured && (
                              <Star className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-gray-400 mb-2">
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                            <span>{event.time}</span>
                            <span>{event.attendees} attending</span>
                          </div>
                          <div className="text-xs text-gray-300 line-clamp-2">
                            {event.description}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="secondary" asChild>
                <Link href="/events">View All Events</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Event Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#9EFF00]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(158,255,0,0.1)]"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Types of Events
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We host a variety of events throughout the month to cater to different interests 
              and learning styles within our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(158,255,0,0.1)]">
                  <type.icon className="h-8 w-8 text-[#9EFF00]" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {type.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {type.description}
                </p>
                <div className="text-xs text-[#9EFF00] bg-[#9EFF00]/10 rounded-full px-3 py-1 font-medium">
                  {type.count}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-[#9EFF00]/20 text-center">
            <h4 className="text-lg font-bold text-white mb-3">
              Never Miss an Event
            </h4>
            <p className="text-gray-300 text-sm mb-6">
              Subscribe to our event calendar and get notified about upcoming events that match your interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/events/calendar">View Calendar</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/events/notifications">Set Notifications</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
