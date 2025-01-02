import React from 'react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  UserGroupIcon,
  HeartIcon,
  SparklesIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  SunIcon
} from '@heroicons/react/24/outline';

const values = [
  {
    icon: SunIcon,
    title: 'Sustainable Farming',
    description: 'We practice sustainable farming methods to protect our environment for future generations.'
  },
  {
    icon: HeartIcon,
    title: 'Animal Welfare',
    description: 'Our animals are treated with the utmost care and respect, ensuring their well-being.'
  },
  {
    icon: UserGroupIcon,
    title: 'Community Focus',
    description: 'We support our local community through job creation and sustainable practices.'
  },
  {
    icon: SparklesIcon,
    title: 'Quality First',
    description: 'We maintain the highest standards in all our farming and production processes.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Environmental Care',
    description: 'Our practices are designed to minimize environmental impact and promote biodiversity.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Food Safety',
    description: 'We follow strict safety protocols to ensure the quality of our products.'
  }
];

const stats = [
  { value: 1000, label: 'Acres of Land', suffix: '+' },
  { value: 50, label: 'Years Experience', suffix: '+' },
  { value: 100, label: 'Team Members', suffix: '+' },
  { value: 10000, label: 'Happy Customers', suffix: '+' }
];

const teamMembers = [
  {
    name: 'John Smith',
    role: 'Farm Director',
    image: '/images/team/director.jpg',
    bio: '25 years of experience in sustainable farming practices.'
  },
  {
    name: 'Sarah Johnson',
    role: 'Head of Operations',
    image: '/images/team/operations.jpg',
    bio: 'Expert in agricultural operations and team management.'
  },
  {
    name: 'Michael Brown',
    role: 'Livestock Manager',
    image: '/images/team/livestock.jpg',
    bio: 'Specialized in animal welfare and sustainable breeding.'
  },
  {
    name: 'Emily Davis',
    role: 'Quality Control',
    image: '/images/team/quality.jpg',
    bio: 'Ensures the highest standards in all our products.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <OptimizedImage
          src="/images/about/hero.jpg"
          alt="Our Farm"
          fill
          className="object-cover brightness-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl px-4">
            A legacy of sustainable farming and quality produce since 2020
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-6">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Founded in 2020, Berkat Farm started as a small family operation with a vision to provide the highest quality farm products while maintaining sustainable practices. Over the decades, we've grown into a leading agricultural enterprise, never losing sight of our core values and commitment to excellence.
            </p>
            <p className="text-lg text-gray-600">
              Today, we continue to innovate and improve our farming practices, combining traditional wisdom with modern technology to produce the best possible products for our customers while protecting the environment for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-16">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-emerald-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-800 to-emerald-900" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-emerald-200 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-16">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <OptimizedImage
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <div className="text-emerald-600 mb-2">{member.role}</div>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-6">
              Visit Our Farm
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We're located in the heart of the countryside, where the perfect combination of climate and soil creates ideal conditions for our farming operations.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <p className="font-semibold text-gray-900 mb-2">Berkat Farm</p>
              <p className="text-gray-600">123 Farm Road</p>
              <p className="text-gray-600">Countryside, State 12345</p>
              <p className="text-gray-600 mt-4">Open for visits: Monday - Saturday, 9 AM - 5 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 