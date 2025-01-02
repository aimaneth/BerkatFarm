'use client';

import React from 'react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function ProductHero() {
  return (
    <div className="relative h-[70vh] min-h-[500px] w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
      
      {/* Background Image */}
      <OptimizedImage
        src="/images/products/hero-products.jpg"
        alt="Farm Products"
        fill
        className="object-cover brightness-[0.35]"
        priority
        sizes="100vw"
      />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
          Farm Fresh Products
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-2xl px-4 text-gray-200">
          From our farm to your table. Quality dairy and meat products, raised with care.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <a
            href="#milk-products"
            className="group inline-flex items-center px-8 py-3 rounded-full text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            View Milk Products
            <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#meat-products"
            className="group inline-flex items-center px-8 py-3 rounded-full text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            View Meat Products
            <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </div>
  );
} 