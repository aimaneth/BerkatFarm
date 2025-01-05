'use client';

import { Button } from '@/components/ui/Button';
import { Check, HelpCircle, Leaf, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Header } from '../_components/Header';
import { Footer } from '../_components/Footer';

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const yearlyDiscount = 20; // 20% discount for yearly plans

  const pricingPlans = [
    {
      name: "Basic",
      monthlyPrice: 99,
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
      monthlyPrice: 299,
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
      monthlyPrice: 899,
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
  ].map(plan => ({
    ...plan,
    yearlyPrice: Math.floor(plan.monthlyPrice * 12 * (1 - yearlyDiscount / 100))
  }));

  return (
    <div className="flex-1">
      <Header />

      <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 overflow-x-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base Grid Pattern */}
          <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-5 bg-repeat [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          
          {/* Animated Gradient Orbs */}
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-3xl opacity-30 animate-float" />
          <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-r from-teal-500/30 to-emerald-500/30 rounded-full blur-3xl opacity-30 animate-float-reverse" />
          <div className="absolute top-2/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl opacity-20 animate-float" />
          
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20" />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/50 via-transparent to-emerald-950/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/50 via-transparent to-emerald-950/50" />
          
          {/* Radial Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/50 to-emerald-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        <div className="relative pt-32 pb-20">
          {/* Header with Enhanced Animation */}
          <div className="text-center mb-16">
            <div className="relative py-4">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-transparent to-emerald-500/20 blur-3xl animate-gradient-shift" />
              <h1 className="text-4xl lg:text-6xl font-bold relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-white animate-text-shine">
                  Choose Your Plan
                </span>
              </h1>
            </div>
            <p className="text-xl text-emerald-100/80 max-w-2xl mx-auto mt-6">
              Start with a 14-day free trial. No credit card required.
            </p>

            {/* Billing Toggle */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className={`text-lg transition-colors duration-200 ${!isYearly ? 'text-white' : 'text-emerald-100/60'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-20 h-10 rounded-full bg-white/10 p-1 transition-colors duration-200 hover:bg-white/20"
              >
                <div
                  className={`absolute top-1 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-transform duration-200 transform ${
                    isYearly ? 'translate-x-10' : 'translate-x-0'
                  }`}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-lg transition-colors duration-200 ${isYearly ? 'text-white' : 'text-emerald-100/60'}`}>
                  Yearly
                </span>
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 text-sm font-semibold px-2 py-1 rounded-full">
                  Save {yearlyDiscount}%
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Grid with Enhanced Cards */}
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div key={index} className={`relative group ${plan.popular ? 'scale-105' : ''}`}>
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/[0.15] transition-all duration-300 border border-white/20 h-full shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20">
                    {/* Animated Highlight Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl animate-shimmer" />
                    
                    {/* Popular Badge with Enhanced Style */}
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 px-4 py-1 rounded-full text-sm font-semibold shadow-lg shadow-emerald-500/20">
                        Most Popular
                      </div>
                    )}
                    
                    {/* Card Content with Enhanced Styling */}
                    <div className="relative space-y-4">
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-100">{plan.name}</h3>
                      <div className="space-y-1">
                        <div className="flex items-end gap-2">
                          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-white">
                            RM {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                          </span>
                          <span className="text-emerald-100/80 mb-1">/{isYearly ? 'year' : 'month'}</span>
                        </div>
                        {isYearly && (
                          <div className="text-sm text-emerald-400">
                            Save RM {Math.floor(plan.monthlyPrice * 12 - plan.yearlyPrice)} per year
                          </div>
                        )}
                      </div>
                      <p className="text-emerald-100/80 pb-4">{plan.description}</p>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center gap-3 text-emerald-100/80 group/item">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                              <Check className="w-3 h-3 text-emerald-950" />
                            </div>
                            <span className="group-hover/item:text-white transition-colors">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-6">
                        <Link href="/auth/register" className="block">
                          <Button 
                            className={`w-full ${plan.popular 
                              ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30' 
                              : 'border-2 border-white/20 hover:bg-white/10 backdrop-blur-lg hover:border-white/40'} transition-all duration-300`}
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

            {/* FAQ Section */}
            <div className="mt-24 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
              <div className="space-y-8">
                {[
                  {
                    q: "Can I switch plans later?",
                    a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                  },
                  {
                    q: "What payment methods do you accept?",
                    a: "We accept all major credit cards, bank transfers, and online banking methods available in Malaysia."
                  },
                  {
                    q: "Is there a contract or commitment?",
                    a: "No long-term contracts. All plans are month-to-month, and you can cancel anytime."
                  },
                  {
                    q: "Do you offer discounts for agricultural cooperatives?",
                    a: "Yes, we offer special rates for agricultural cooperatives. Contact our sales team for more information."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all border border-white/20">
                    <div className="flex gap-4">
                      <HelpCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                        <p className="text-emerald-100/80">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-24 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
              <p className="text-emerald-100/80 mb-8">
                Our team is here to help you find the perfect plan for your farm.
              </p>
              <Link href="#contact">
                <Button 
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-lg hover:border-white/40 transition-all duration-300"
                >
                  Contact Sales
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
