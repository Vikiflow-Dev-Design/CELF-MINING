"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Clock,
  Smartphone,
  Server,
  Database,
  Globe,
  ArrowRight,
  Activity,
  Zap,
  Shield,
  TrendingUp
} from "lucide-react";

const systemStatus = [
  {
    service: "Mobile App",
    status: "operational",
    uptime: "99.9%",
    responseTime: "120ms",
    icon: Smartphone,
    description: "iOS and Android applications"
  },
  {
    service: "Mining System",
    status: "operational",
    uptime: "99.8%",
    responseTime: "85ms",
    icon: Zap,
    description: "Token mining and rewards"
  },
  {
    service: "API Services",
    status: "operational",
    uptime: "99.9%",
    responseTime: "95ms",
    icon: Server,
    description: "Backend API and services"
  },
  {
    service: "Database",
    status: "operational",
    uptime: "100%",
    responseTime: "45ms",
    icon: Database,
    description: "User data and transactions"
  },
  {
    service: "Website",
    status: "operational",
    uptime: "99.9%",
    responseTime: "180ms",
    icon: Globe,
    description: "Main website and portal"
  },
  {
    service: "Security Systems",
    status: "operational",
    uptime: "100%",
    responseTime: "30ms",
    icon: Shield,
    description: "Authentication and security"
  }
];

const recentIncidents = [
  {
    title: "Scheduled Maintenance - Mining System",
    status: "resolved",
    date: "2024-01-15",
    duration: "2 hours",
    impact: "low",
    description: "Routine maintenance to improve mining performance and stability."
  },
  {
    title: "Mobile App Login Issues",
    status: "resolved",
    date: "2024-01-12",
    duration: "45 minutes",
    impact: "medium",
    description: "Some users experienced login difficulties due to authentication service issues."
  },
  {
    title: "API Rate Limiting Adjustments",
    status: "resolved",
    date: "2024-01-08",
    duration: "1 hour",
    impact: "low",
    description: "Updated API rate limits to improve service stability and performance."
  }
];

const upcomingMaintenance = [
  {
    title: "Database Optimization",
    date: "2024-01-25",
    time: "02:00 - 04:00 UTC",
    impact: "minimal",
    description: "Performance improvements and database optimization. Minimal service disruption expected."
  },
  {
    title: "Mobile App Update Deployment",
    date: "2024-01-30",
    time: "01:00 - 03:00 UTC",
    impact: "none",
    description: "Rolling deployment of new mobile app features. No service interruption expected."
  }
];

const performanceMetrics = [
  {
    metric: "Overall Uptime",
    value: "99.9%",
    trend: "up",
    period: "Last 30 days"
  },
  {
    metric: "Avg Response Time",
    value: "92ms",
    trend: "down",
    period: "Last 24 hours"
  },
  {
    metric: "Active Users",
    value: "24.8K",
    trend: "up",
    period: "Currently online"
  },
  {
    metric: "Support Tickets",
    value: "12",
    trend: "down",
    period: "Open tickets"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'operational':
      return 'text-green-400';
    case 'degraded':
      return 'text-yellow-400';
    case 'outage':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'operational':
      return CheckCircle;
    case 'degraded':
      return AlertTriangle;
    case 'outage':
      return XCircle;
    default:
      return Clock;
  }
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'low':
    case 'minimal':
    case 'none':
      return 'text-green-400 bg-green-500/20';
    case 'medium':
      return 'text-yellow-400 bg-yellow-500/20';
    case 'high':
      return 'text-red-400 bg-red-500/20';
    default:
      return 'text-gray-400 bg-gray-500/20';
  }
};

export function StatusSection() {
  const overallStatus = systemStatus.every(service => service.status === 'operational') 
    ? 'All Systems Operational' 
    : 'Some Systems Experiencing Issues';

  return (
    <section className="py-24 bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-green-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-[#9EFF00]/8 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            System{" "}
            <span className="text-[#9EFF00] drop-shadow-[0_0_30px_rgba(158,255,0,0.3)]">Status</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Real-time status of all CELF services and systems. Stay informed about 
            any issues or maintenance that might affect your experience.
          </p>

          {/* Overall Status */}
          <div className="inline-flex items-center space-x-3 bg-green-500/20 border border-green-500/30 rounded-full px-6 py-3">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <span className="text-green-400 font-semibold text-lg">{overallStatus}</span>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {performanceMetrics.map((metric, index) => (
            <div key={metric.metric} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-[#9EFF00]" />
              </div>
              <div className="text-3xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
                <span>{metric.value}</span>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-5 w-5 text-green-400" />
                ) : (
                  <TrendingUp className="h-5 w-5 text-green-400 rotate-180" />
                )}
              </div>
              <div className="text-lg font-semibold text-gray-300 mb-1">{metric.metric}</div>
              <div className="text-sm text-gray-500">{metric.period}</div>
            </div>
          ))}
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Service Status</h3>
          
          <Card>
            <CardContent className="p-0">
              {systemStatus.map((service, index) => {
                const StatusIcon = getStatusIcon(service.status);
                return (
                  <div key={service.service} className={`p-6 ${index !== systemStatus.length - 1 ? 'border-b border-gray-800' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#9EFF00]/20 to-[#9EFF00]/5 rounded-xl flex items-center justify-center">
                          <service.icon className="h-6 w-6 text-[#9EFF00]" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{service.service}</h4>
                          <p className="text-gray-400 text-sm">{service.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <div className="text-gray-500 mb-1">Uptime</div>
                          <div className="text-white font-medium">{service.uptime}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-500 mb-1">Response</div>
                          <div className="text-white font-medium">{service.responseTime}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <StatusIcon className={`h-5 w-5 ${getStatusColor(service.status)}`} />
                          <span className={`font-medium capitalize ${getStatusColor(service.status)}`}>
                            {service.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Incidents & Upcoming Maintenance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Incidents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Recent Incidents</h3>
            <Card>
              <CardContent className="p-0">
                {recentIncidents.map((incident, index) => (
                  <div key={incident.title} className={`p-6 ${index !== recentIncidents.length - 1 ? 'border-b border-gray-800' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white">{incident.title}</h4>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(incident.impact)}`}>
                        {incident.impact} impact
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{incident.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{incident.date}</span>
                      <span>Duration: {incident.duration}</span>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span className="text-green-400">Resolved</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Maintenance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Scheduled Maintenance</h3>
            <Card>
              <CardContent className="p-0">
                {upcomingMaintenance.map((maintenance, index) => (
                  <div key={maintenance.title} className={`p-6 ${index !== upcomingMaintenance.length - 1 ? 'border-b border-gray-800' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white">{maintenance.title}</h4>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(maintenance.impact)}`}>
                        {maintenance.impact} impact
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{maintenance.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{maintenance.date}</span>
                      <span>{maintenance.time}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-yellow-400" />
                        <span className="text-yellow-400">Scheduled</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Status Page Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
            <Activity className="h-12 w-12 text-[#9EFF00] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Need More Details?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Visit our dedicated status page for real-time monitoring, detailed incident reports, 
              and historical performance data.
            </p>
            <Button size="lg" asChild>
              <Link href="/status" className="group">
                View Full Status Page
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
