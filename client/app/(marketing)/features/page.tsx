'use client';

import { Button } from '@/components/ui/Button';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../_components/Header';
import { Footer } from '../_components/Footer';

export default function FeaturesPage() {
  const features = [
    {
      category: "Livestock Management",
      description: "Comprehensive tools for managing your farm animals",
      features: [
        {
          title: "Health Record Tracking",
          description: "Monitor and maintain detailed health records for each animal, including vaccinations, treatments, and check-ups.",
          benefits: [
            "Automated health alerts",
            "Vaccination schedules",
            "Treatment history",
            "Health analytics",
            "Veterinary reports",
            "Medication tracking"
          ]
        },
        {
          title: "Breeding Management",
          description: "Track breeding cycles, genealogy, and reproductive health for optimal breeding outcomes.",
          benefits: [
            "Breeding schedules",
            "Genetic tracking",
            "Pregnancy monitoring",
            "Offspring records",
            "Breeding analytics",
            "Performance metrics"
          ]
        },
        {
          title: "Growth Monitoring",
          description: "Track and analyze growth patterns with advanced metrics and visualization tools.",
          benefits: [
            "Weight tracking",
            "Growth charts",
            "Feed conversion rates",
            "Performance analysis",
            "Comparative metrics",
            "Growth predictions"
          ]
        }
      ]
    },
    {
      category: "Financial Management",
      description: "Powerful tools for tracking and optimizing farm finances",
      features: [
        {
          title: "Expense Tracking",
          description: "Detailed tracking of all farm-related expenses with categorization and analysis.",
          benefits: [
            "Automated categorization",
            "Receipt scanning",
            "Budget tracking",
            "Vendor management",
            "Cost analysis",
            "Expense reports"
          ]
        },
        {
          title: "Revenue Management",
          description: "Track and analyze all income streams with detailed reporting and forecasting.",
          benefits: [
            "Sales tracking",
            "Invoice generation",
            "Payment processing",
            "Revenue forecasting",
            "Profit analysis",
            "Financial reports"
          ]
        },
        {
          title: "Financial Analytics",
          description: "Advanced analytics and reporting tools for financial decision-making.",
          benefits: [
            "Profit/Loss analysis",
            "ROI calculations",
            "Cash flow tracking",
            "Financial forecasting",
            "Custom reports",
            "Tax preparation"
          ]
        }
      ]
    },
    {
      category: "Team Management",
      description: "Efficient tools for managing farm staff and operations",
      features: [
        {
          title: "Task Management",
          description: "Organize and track farm tasks with our intuitive task management system.",
          benefits: [
            "Task assignment",
            "Progress tracking",
            "Priority setting",
            "Deadline management",
            "Team collaboration",
            "Mobile access"
          ]
        },
        {
          title: "Staff Scheduling",
          description: "Create and manage staff schedules with our advanced scheduling tools.",
          benefits: [
            "Shift planning",
            "Time tracking",
            "Leave management",
            "Schedule conflicts",
            "Mobile updates",
            "Availability tracking"
          ]
        },
        {
          title: "Performance Tracking",
          description: "Monitor and optimize team performance with detailed analytics.",
          benefits: [
            "Performance metrics",
            "Goal setting",
            "Progress reports",
            "Team analytics",
            "Feedback system",
            "Training tracking"
          ]
        }
      ]
    }
  ];

  return (
    <div className="flex-1">
      <Header />

      <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base Grid Pattern */}
          <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-5 bg-repeat [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          
          {/* Animated Gradient Orbs */}
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-3xl opacity-30 animate-float" />
          <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-r from-teal-500/30 to-emerald-500/30 rounded-full blur-3xl opacity-30 animate-float-reverse" />
          
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20" />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/50 via-transparent to-emerald-950/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/50 via-transparent to-emerald-950/50" />
        </div>

        <div className="relative pt-32 pb-20">
          {/* Header with Enhanced Animation */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-white animate-text-shine">
                Powerful Features for Modern Farming
              </span>
            </h1>
            <p className="text-xl text-emerald-100/80 max-w-2xl mx-auto mt-6">
              Everything you need to manage your farm efficiently in one place
            </p>
          </div>

          {/* Features Grid */}
          <div className="container mx-auto px-4">
            <div className="space-y-32">
              {features.map((category, index) => (
                <div key={index} className="relative">
                  {/* Category Header */}
                  <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-4">
                      {category.category}
                    </h2>
                    <p className="text-lg text-emerald-100/80">{category.description}</p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid md:grid-cols-3 gap-8">
                    {category.features.map((feature, fIndex) => (
                      <div key={fIndex} className="relative group">
                        <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/[0.15] transition-all duration-300 border border-white/20 h-full">
                          {/* Animated Highlight Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl animate-shimmer" />
                          
                          <div className="relative space-y-4">
                            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                            <p className="text-emerald-100/80">{feature.description}</p>
                            
                            <ul className="space-y-3 mt-6">
                              {feature.benefits.map((benefit, bIndex) => (
                                <li key={bIndex} className="flex items-center gap-3 text-emerald-100/80 group/item">
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                                    <Check className="w-3 h-3 text-emerald-950" />
                                  </div>
                                  <span className="group-hover/item:text-white transition-colors">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-32 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Farm?</h2>
              <p className="text-lg text-emerald-100/80 mb-8 max-w-2xl mx-auto">
                Start your 14-day free trial today. No credit card required.
              </p>
              <Link href="/auth/register">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 px-8 py-6 gap-2 group"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
