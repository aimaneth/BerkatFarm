'use client';

import { motion } from 'framer-motion';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

export const Card3D = ({
  children,
  className = '',
}: Card3DProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        scale: 1.02,
        y: -4,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
}; 