'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const FloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<FloatingElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const generateElements = () => {
      const elements: FloatingElement[] = [];
      const count = 15;

      for (let i = 0; i < count; i++) {
        elements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 40 + 20,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * -20,
        });
      }

      elementsRef.current = elements;
    };

    generateElements();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {elementsRef.current.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: element.delay,
          }}
        />
      ))}
    </div>
  );
}; 