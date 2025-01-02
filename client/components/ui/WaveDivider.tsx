'use client';

import { cn } from '@/lib/utils';

interface WaveDividerProps {
  className?: string;
  flip?: boolean;
  variant?: 'default' | 'gradient';
}

export function WaveDivider({ 
  className, 
  flip = false,
  variant = 'default'
}: WaveDividerProps) {
  return (
    <div 
      className={cn(
        "absolute left-0 right-0 h-20 overflow-hidden",
        flip ? "-bottom-1 rotate-180" : "-top-1",
        className
      )}
    >
      <div className="w-[200%] h-full relative left-[-50%]">
        <div className={cn(
          "w-[50%] h-full absolute animate-wave",
          variant === 'default' 
            ? "bg-white" 
            : "bg-gradient-to-r from-emerald-500 to-teal-400"
        )} />
        <div className={cn(
          "w-[50%] h-full absolute left-[50%] animate-wave-delayed",
          variant === 'default' 
            ? "bg-white" 
            : "bg-gradient-to-r from-emerald-500 to-teal-400"
        )} />
      </div>
    </div>
  );
} 