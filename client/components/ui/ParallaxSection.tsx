'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxSection({ 
  children, 
  className,
  speed = 0.5 
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollPosition = window.scrollY;
        const offset = rect.top + scrollPosition;
        const parallaxOffset = (scrollPosition - offset) * speed;
        setScrollY(parallaxOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, isVisible]);

  return (
    <div 
      ref={sectionRef}
      className={cn("relative overflow-hidden", className)}
    >
      <div 
        className="transition-transform duration-100 ease-out will-change-transform"
        style={{ 
          transform: `translateY(${scrollY}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
} 