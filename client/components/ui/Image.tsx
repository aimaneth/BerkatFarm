'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ComponentProps<typeof NextImage> {
  fallback?: string;
  aspectRatio?: string;
}

export function Image({
  src,
  alt,
  className,
  fallback = '/images/placeholder.jpg',
  aspectRatio = '16/9',
  ...props
}: ImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blurDataUrl, setBlurDataUrl] = useState<string | null>(null);

  useEffect(() => {
    // Generate blur placeholder
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 40;
      canvas.height = 40;
      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setBlurDataUrl(canvas.toDataURL());
    }
  }, []);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gray-100 rounded-lg',
        className
      )}
      style={{ aspectRatio }}
    >
      <NextImage
        src={error ? fallback : src}
        alt={alt}
        className={cn(
          'object-cover transition-opacity duration-300',
          loading ? 'opacity-0' : 'opacity-100'
        )}
        placeholder={blurDataUrl ? 'blur' : 'empty'}
        blurDataURL={blurDataUrl || undefined}
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
      {loading && !error && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-500">Failed to load image</span>
        </div>
      )}
    </div>
  );
}

export function Avatar({
  src,
  alt,
  size = 'md',
  className,
  ...props
}: ImageProps & {
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden bg-gray-100',
        sizes[size],
        className
      )}
    >
      <NextImage
        src={src}
        alt={alt}
        className="object-cover"
        fill
        sizes="96px"
        {...props}
      />
    </div>
  );
}

export function ImageGrid({
  images,
  className,
}: {
  images: { src: string; alt: string }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
        className
      )}
    >
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.src}
          alt={image.alt}
          className="w-full"
          aspectRatio="1"
        />
      ))}
    </div>
  );
} 