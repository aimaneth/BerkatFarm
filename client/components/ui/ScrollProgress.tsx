'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn("fixed bottom-8 right-8 z-50", className)}>
      <div className="relative h-24 w-16">
        {/* Milk Bottle Container */}
        <div className="absolute inset-0">
          {/* SVG Milk Bottle */}
          <svg
            viewBox="0 0 100 150"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
          >
            {/* Bottle Neck */}
            <path
              d="M40,0 L60,0 L65,20 L35,20 Z"
              className="fill-white/80 backdrop-blur-sm"
            />
            
            {/* Bottle Body */}
            <path
              d="M35,20 L65,20 L70,40 C70,40 75,50 75,60 L75,140 C75,145 70,150 65,150 L35,150 C30,150 25,145 25,140 L25,60 C25,50 30,40 30,40 Z"
              className="fill-white/80 backdrop-blur-sm"
            />

            {/* Liquid Container Mask */}
            <clipPath id="liquid-mask">
              <path
                d="M35,20 L65,20 L70,40 C70,40 75,50 75,60 L75,140 C75,145 70,150 65,150 L35,150 C30,150 25,145 25,140 L25,60 C25,50 30,40 30,40 Z"
              />
            </clipPath>

            {/* Liquid Fill */}
            <g clipPath="url(#liquid-mask)">
              <rect
                x="25"
                y={150 - (scrollProgress * 1.3)}
                width="50"
                height="150"
                className="fill-emerald-400/90 transition-all duration-300 ease-out"
              />
              
              {/* Liquid Wave Effect */}
              <g transform={`translate(0, ${150 - (scrollProgress * 1.3)})`}>
                <path
                  d="M25,0 C30,-5 35,-5 40,0 C45,5 50,5 55,0 C60,-5 65,-5 70,0 C75,5 80,5 85,0"
                  className="stroke-white/30 stroke-2 fill-none animate-wave"
                />
                <path
                  d="M25,5 C30,0 35,0 40,5 C45,10 50,10 55,5 C60,0 65,0 70,5 C75,10 80,10 85,5"
                  className="stroke-white/20 stroke-2 fill-none animate-wave-delayed"
                />
              </g>
            </g>

            {/* Bottle Shine */}
            <path
              d="M35,20 C35,20 45,25 50,25 C55,25 65,20 65,20"
              className="stroke-white/40 stroke-[1.5] fill-none"
            />
          </svg>

          {/* Percentage Text */}
          <div className="absolute inset-0 flex items-center justify-center mt-6">
            <span className="text-sm font-medium text-emerald-600">
              {Math.round(scrollProgress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 