"use client";

import { Button } from '@/components/ui/Button';
import { ArrowRight, Users, LineChart, Sparkles, ChevronDown, Check, HelpCircle, Mail, Phone, MapPin, Plus, Minus, Leaf } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Header } from './_components/Header';
import { Footer } from './_components/Footer';

export default function MarketingPage() {
  const features = [
    {
      icon: Leaf,
      title: "Livestock Management",
      description: "Track health records, monitor growth, and manage breeding schedules"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Efficiently coordinate and schedule your farm staff"
    },
    {
      icon: LineChart,
      title: "Financial Analytics",
      description: "Detailed insights into your farm's financial performance"
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const pricingPlans = [
    {
      name: "Basic",
      price: "RM99",
      description: "Perfect for small farms getting started",
      features: [
        "Up to 200 livestock records",
        "Basic health records",
        "Simple team management (5 users)",
        "Basic financial tracking",
        "Mobile app access",
        "Email support",
        "Daily backups",
        "Basic reporting"
      ]
    },
    {
      name: "Professional",
      price: "RM299",
      description: "Ideal for growing farm operations",
      features: [
        "Up to 2,000 livestock records",
        "Full health record system",
        "Advanced team management (15 users)",
        "Complete financial suite",
        "ROI analysis tools",
        "Custom reports",
        "Priority support",
        "API access",
        "Inventory management",
        "Data export capabilities"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "From RM899",
      description: "For large-scale agricultural operations",
      features: [
        "Unlimited livestock records",
        "Enterprise team management",
        "Advanced analytics & AI insights",
        "24/7 dedicated support",
        "Custom integration",
        "White-label options",
        "Multi-farm management",
        "On-premise deployment",
        "Custom training sessions",
        "Priority feature requests"
      ]
    }
  ];

  const faqs = [
    {
      question: "How does the 14-day trial work?",
      answer: "Start your free trial with full access to all features. No credit card required. At the end of the trial, choose the plan that best fits your needs to continue using FarmSoul."
    },
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Is my data secure?",
      answer: "We use industry-standard encryption and security measures to protect your data. Your information is stored in secure, redundant servers with regular backups."
    },
    {
      question: "Do you offer training?",
      answer: "Yes, we provide comprehensive onboarding, video tutorials, documentation, and live training sessions for teams."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer email support for all plans, with priority support for Professional plans and 24/7 dedicated support for Enterprise customers."
    }
  ];

  return (
    <div className="flex-1">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          {/* Animated Background Patterns */}
          <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-5 bg-repeat [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          
          {/* Gradient Orbs */}
          <div className="absolute top-1/3 -left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-3xl opacity-30 animate-float" />
          <div className="absolute bottom-1/3 right-0 w-[30rem] h-[30rem] bg-gradient-to-r from-teal-500/30 to-emerald-500/30 rounded-full blur-3xl opacity-30 animate-float animation-delay-2000" />
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl opacity-30 animate-float-reverse" />
          
          {/* Decorative Lines */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20" />
          
          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/50 to-emerald-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center space-y-8 max-w-4xl mx-auto pt-32">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full mx-auto border border-white/20 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:bg-white/20 transition-all group cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-white">
            Modern Farm Management System
              </span>
              <Sparkles className="w-4 h-4 text-emerald-400 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Title with Enhanced Animation */}
            <div className="relative py-4">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-transparent to-emerald-500/20 blur-3xl animate-gradient-shift" />
              <h1 className="text-6xl lg:text-8xl font-bold relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-white animate-text-shine inline-block mb-6">
                  Transform Your
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-400 animate-text-shine inline-block">
                  Farm Operations
                </span>
          </h1>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto font-light">
              Streamline your agricultural business with our comprehensive management solution. 
              Track livestock, manage teams, and optimize performance all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/register" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-500 hover:to-teal-400 text-emerald-900 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 gap-2 group relative overflow-hidden px-8 py-6"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 animate-shine" />
                  <span className="relative">Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-lg hover:border-white/40 transition-all duration-300 px-8 py-6"
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Contact Sales
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-3 gap-6 pt-20 pb-24 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="group hover:scale-105 transition-transform duration-300">
                  <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <feature.icon className="w-6 h-6 text-emerald-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <ChevronDown className="w-6 h-6 text-white/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="relative py-24 bg-gradient-to-b from-emerald-950 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-5" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-white mb-4">
              Powerful Dashboard Interface
            </h2>
            <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto">
              Get a complete overview of your farm's performance with our intuitive dashboard
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="relative mx-auto max-w-6xl">
            {/* Browser Window Mockup */}
            <div className="relative bg-emerald-950/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-emerald-950/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center">
                  <div className="px-4 py-1 bg-emerald-900/50 rounded-lg inline-block text-sm text-emerald-100/80">
                    dashboard.FarmSoul.com
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-8">
                {/* Welcome Section */}
                <div className="space-y-0.5 mb-6">
                  <h2 className="text-2xl font-bold tracking-tight text-white">Welcome back, Demo User</h2>
                  <p className="text-emerald-100/60">
                    Here's an overview of your farm's performance
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-3 mt-6">
                  {[
                    {
                      name: 'Total Revenue',
                      value: 'RM 24,000',
                      change: '+4.75%',
                      trend: 'up',
                      icon: "📈",
                      description: 'Total revenue this month'
                    },
                    {
                      name: 'Active Livestock',
                      value: '2,345',
                      change: '+1.54%',
                      trend: 'up',
                      icon: "🐄",
                      description: 'Total active livestock'
                    },
                    {
                      name: 'Team Members',
                      value: '48',
                      change: '+2.59%',
                      trend: 'up',
                      icon: "👥",
                      description: 'Active team members'
                    },
                    {
                      name: 'Pending Orders',
                      value: '15',
                      change: '-0.91%',
                      trend: 'down',
                      icon: "🛒",
                      description: 'Orders awaiting processing'
                    },
                    {
                      name: 'Active Tasks',
                      value: '23',
                      change: '+1.98%',
                      trend: 'up',
                      icon: "✅",
                      description: 'Tasks in progress'
                    },
                    {
                      name: 'Performance',
                      value: '92%',
                      change: '+3.45%',
                      trend: 'up',
                      icon: "📊",
                      description: 'Overall farm performance'
                    }
                  ].map((stat) => (
                    <div key={stat.name} className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/10">
                          <span className="text-2xl">{stat.icon}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-emerald-100/60">{stat.name}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                            <span className={
                              stat.trend === 'up' 
                                ? 'text-xs font-medium text-emerald-400'
                                : 'text-xs font-medium text-red-400'
                            }>
                              {stat.change}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3 mt-6">
                  {/* Main Content Area */}
                  <div className="space-y-4 lg:col-span-2">
                    {/* Recent Activity */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
                          <p className="text-sm text-emerald-100/60">Your farm's latest updates and activities</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {[
                          { action: "New livestock added", details: "Added 5 cattle to Group A", time: "2 hours ago", icon: "🐄" },
                          { action: "Task completed", details: "Daily health check", time: "4 hours ago", icon: "✅" },
                          { action: "Order processed", details: "Order #1234 shipped", time: "6 hours ago", icon: "📦" }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center gap-4 text-emerald-100/80">
                            <span className="text-2xl">{activity.icon}</span>
                            <div className="flex-1">
                              <p className="text-white font-medium">{activity.action}</p>
                              <p className="text-sm text-emerald-100/60">{activity.details}</p>
                            </div>
                            <span className="text-sm text-emerald-100/60">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Livestock Overview */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold text-white">Livestock Overview</h3>
                          <p className="text-sm text-emerald-100/60">Current status of your farm animals</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { category: "Cattle", count: 1250, trend: "+12", icon: "🐄" },
                          { category: "Sheep", count: 850, trend: "+8", icon: "🐑" },
                          { category: "Goats", count: 245, trend: "+5", icon: "🐐" },
                          { category: "Poultry", count: 3200, trend: "+45", icon: "🐔" }
                        ].map((item, index) => (
                          <div key={index} className="bg-white/5 rounded-lg p-4 flex items-center gap-4">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <p className="text-white font-medium">{item.category}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-lg text-white">{item.count}</span>
                                <span className="text-xs text-emerald-400">+{item.trend}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Area */}
                  <div className="space-y-4">
                    {/* Quick Actions */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold text-white">Quick Actions</h3>
                          <p className="text-sm text-emerald-100/60">Frequently used operations</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {[
                          { action: "Add Livestock", icon: "🐄" },
                          { action: "Record Health Check", icon: "🏥" },
                          { action: "Update Inventory", icon: "📦" },
                          { action: "Assign Tasks", icon: "📋" }
                        ].map((action, index) => (
                          <button key={index} className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-lg p-3 text-white transition-colors">
                            <span className="text-xl">{action.icon}</span>
                            <span>{action.action}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Upcoming Tasks */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold text-white">Upcoming Tasks</h3>
                          <p className="text-sm text-emerald-100/60">Tasks scheduled for today</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[
                          { task: "Morning Feed", time: "8:00 AM", icon: "🌾" },
                          { task: "Veterinary Visit", time: "10:30 AM", icon: "👨‍⚕️" },
                          { task: "Equipment Maintenance", time: "2:00 PM", icon: "🔧" }
                        ].map((task, index) => (
                          <div key={index} className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                            <span className="text-xl">{task.icon}</span>
                            <div className="flex-1">
                              <p className="text-white">{task.task}</p>
                              <p className="text-sm text-emerald-100/60">{task.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-emerald-500/30 rounded-full blur-3xl opacity-20 animate-float" />
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-teal-500/30 rounded-full blur-3xl opacity-20 animate-float-reverse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-5" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2,000+", label: "Active Farms" },
              { value: "98%", label: "Customer Satisfaction" },
              { value: "50,000+", label: "Animals Tracked" },
              { value: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                  {stat.value}
                </div>
                <p className="text-emerald-100/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 bg-gradient-to-b from-emerald-950 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-white mb-4">
              Trusted by Farmers Worldwide
            </h2>
            <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto">
              See what our customers are saying about their experience with FarmSoul
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "FarmSoul has revolutionized how we manage our dairy farm. The analytics and tracking features are invaluable.",
                author: "John Smith",
                role: "Dairy Farm Owner",
                image: "/avatars/1.png"
              },
              {
                quote: "The team management features have made coordinating our staff so much easier. We've seen a 40% increase in efficiency.",
                author: "Sarah Johnson",
                role: "Ranch Manager",
                image: "/avatars/2.png"
              },
              {
                quote: "The financial insights have helped us make better decisions and improve our profitability significantly.",
                author: "Michael Chen",
                role: "Agricultural Director",
                image: "/avatars/3.png"
              }
            ].map((testimonial, index) => (
              <div key={index} className="relative group">
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative space-y-4">
                    <p className="text-gray-200 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 flex items-center justify-center">
                        <span className="text-emerald-300 font-semibold text-lg">
                          {testimonial.author[0]}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.author}</div>
                        <div className="text-sm text-emerald-100/80">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features Comparison */}
      <section className="relative py-24 bg-gradient-to-b from-emerald-900 to-emerald-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-5" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-white mb-4">
              Powerful Features for Modern Farming
          </h2>
            <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto">
            Everything you need to manage your farm efficiently
          </p>
        </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Livestock Management",
                features: [
                  "Health record tracking",
                  "Breeding management",
                  "Growth monitoring",
                  "Vaccination schedules",
                  "Feed management",
                  "Genetic tracking"
                ]
              },
              {
                title: "Team Management",
                features: [
                  "Staff scheduling",
                  "Task assignment",
                  "Performance tracking",
                  "Time tracking",
                  "Mobile app access",
                  "Real-time updates"
                ]
              },
              {
                title: "Financial Tools",
                features: [
                  "Expense tracking",
                  "Revenue management",
                  "Profit analysis",
                  "Budget planning",
                  "Financial forecasting",
                  "Custom reports"
                ]
              },
              {
                title: "Analytics & Reporting",
                features: [
                  "Real-time dashboards",
                  "Custom reports",
                  "Data visualization",
                  "Trend analysis",
                  "Performance metrics",
                  "Export capabilities"
                ]
              },
              {
                title: "Inventory Control",
                features: [
                  "Stock management",
                  "Automated alerts",
                  "Supplier management",
                  "Order tracking",
                  "Barcode scanning",
                  "Inventory forecasting"
                ]
              },
              {
                title: "Support & Training",
                features: [
                  "24/7 support",
                  "Video tutorials",
                  "Documentation",
                  "Live training",
                  "Community forum",
                  "Knowledge base"
                ]
              }
            ].map((category, index) => (
              <div key={index} className="relative group">
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-4">{category.title}</h3>
                    <ul className="space-y-3">
                      {category.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-3 text-emerald-100/80">
                          <Check className="w-5 h-5 text-emerald-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-24 bg-gradient-to-b from-emerald-950 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto">
              Choose the perfect plan for your farm's needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative group ${plan.popular ? 'scale-105' : ''}`}>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all border border-white/20 h-full">
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative space-y-4">
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.price !== "Custom" && <span className="text-emerald-100/80 mb-1">/month</span>}
                    </div>
                    <p className="text-emerald-100/80 pb-4">{plan.description}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-3 text-emerald-100/80">
                          <Check className="w-5 h-5 text-emerald-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Link href="/register" className="w-full">
                        <Button 
                          className={`w-full ${plan.popular 
                            ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 hover:from-emerald-500 hover:to-teal-500' 
                            : 'border-2 border-white/20 hover:bg-white/10'} transition-all duration-300`}
                        >
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 bg-gradient-to-b from-emerald-900 to-emerald-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-5" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto">
              Everything you need to know about FarmSoul
                </p>
              </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-xl p-6 transition-all border border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">{faq.question}</span>
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                  {openFaq === index && (
                    <p className="mt-4 text-emerald-100/80">{faq.answer}</p>
                  )}
                </button>
              </div>
            ))}
              </div>
            </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-24 bg-gradient-to-b from-emerald-950 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-white mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto">
              Have questions? We're here to help
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-emerald-100/80">Name</label>
                    <input
                      type="text"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-emerald-100/80">Email</label>
                    <input
                      type="email"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      placeholder="your@email.com"
                    />
                  </div>
              <div className="space-y-2">
                    <label className="text-sm font-medium text-emerald-100/80">Message</label>
                    <textarea
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 h-32"
                      placeholder="How can we help?"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 hover:from-emerald-500 hover:to-teal-500">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-400/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-100/80">Email</p>
                      <p className="text-white">aiman.eth@proton.me</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-400/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-100/80">Phone</p>
                      <p className="text-white">+60 (17) 371-4084</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-400/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-100/80">Location</p>
                      <p className="text-white">Petaling Jaya, Selangor, Malaysia</p>
                    </div>
              </div>
            </div>
          </div>

              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Support Hours</h3>
              <div className="space-y-2">
                  <p className="text-emerald-100/80">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-emerald-100/80">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-emerald-100/80">Sunday: Closed</p>
                  <p className="text-emerald-100/80 mt-4">24/7 support available for Enterprise customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 bg-gradient-to-b from-emerald-900 to-emerald-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-5" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-white">
              Ready to Transform Your Farm?
          </h2>
            <p className="text-xl text-emerald-100/80 max-w-2xl mx-auto">
              Join thousands of successful farmers who have already modernized their operations with FarmSoul
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/register" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-500 hover:to-teal-400 text-emerald-900 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 gap-2 group relative overflow-hidden px-8 py-6"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 animate-shine" />
                  <span className="relative">Start Free Trial</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-lg hover:border-white/40 transition-all duration-300 px-8 py-6"
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Contact Sales
              </Button>
            </div>
            <p className="text-sm text-emerald-100/60">
              Save 20% with annual billing • 14-day free trial • Special rates for agricultural cooperatives
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 