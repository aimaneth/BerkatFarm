'use client';

import { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magneticIntensity?: number;
}

export const MagneticButton = ({
  children,
  className = '',
  magneticIntensity = 0.3,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Track button position
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Spring animations for smooth movement
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  // Transform spring values to actual pixels
  const translateX = useTransform(x, (value) => `${value}px`);
  const translateY = useTransform(y, (value) => `${value}px`);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || !isHovered) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Update position with magnetic effect
    x.set(distanceX * magneticIntensity);
    y.set(distanceY * magneticIntensity);
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        x: translateX,
        y: translateY,
      }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.button>
  );
}; 