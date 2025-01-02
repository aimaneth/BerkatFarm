'use client';

import Image from 'next/image';
import { ComponentProps } from 'react';

type OptimizedImageProps = Omit<ComponentProps<typeof Image>, 'onLoad'> & {
  fadeIn?: boolean;
};

export const OptimizedImage = ({ className = '', fadeIn = true, ...props }: OptimizedImageProps) => {
  const baseClasses = className;
  const fadeClasses = fadeIn ? 'opacity-0 transition-opacity duration-500' : '';
  
  return (
    <Image
      {...props}
      className={`${baseClasses} ${fadeClasses}`.trim()}
      onLoad={(event) => {
        const target = event.target as HTMLImageElement;
        if (target.src.indexOf('data:image/gif;base64') < 0) {
          target.style.opacity = '1';
        }
      }}
    />
  );
}; 