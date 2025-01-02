'use client';

import Image from 'next/image';

interface TestimonialImageProps {
  src: string;
  alt: string;
}

export const TestimonialImage = ({ src, alt }: TestimonialImageProps) => {
  return (
    <div className="relative w-16 h-16 rounded-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-0 transition-opacity duration-200"
        onLoad={(event) => {
          const target = event.target as HTMLImageElement;
          if (target.src.indexOf('data:image/gif;base64') < 0) {
            target.style.opacity = '1';
          }
        }}
      />
    </div>
  );
}; 