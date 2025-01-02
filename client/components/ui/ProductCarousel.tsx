'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Fresh Farm Milk',
    description: 'Pure, organic milk from our grass-fed cows',
    image: '/images/products/milk.jpg',
    price: 'RM 8.90/L',
    category: 'Dairy'
  },
  {
    id: 2,
    name: 'Low Fat Milk',
    description: 'Healthy, low-fat option for the health conscious',
    image: '/images/products/low-fat-milk.jpg',
    price: 'RM 9.90/L',
    category: 'Dairy'
  },
  {
    id: 3,
    name: 'Fresh Yogurt',
    description: 'Probiotic-rich yogurt made from our farm milk',
    image: '/images/products/yogurt.jpg',
    price: 'RM 12.90/500g',
    category: 'Dairy'
  },
  {
    id: 4,
    name: 'Premium Beef',
    description: 'High-quality beef from our grass-fed cattle',
    image: '/images/products/beef.jpg',
    price: 'RM 45.90/kg',
    category: 'Meat'
  },
  {
    id: 5,
    name: 'Fresh Lamb',
    description: 'Tender lamb raised in natural pastures',
    image: '/images/products/lamb.jpg',
    price: 'RM 55.90/kg',
    category: 'Meat'
  },
  {
    id: 6,
    name: 'Farm Chicken',
    description: 'Free-range chicken raised naturally',
    image: '/images/products/chicken.jpg',
    price: 'RM 18.90/kg',
    category: 'Poultry'
  }
];

export const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (isAnimating) return;
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex >= products.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = products.length - 1;
      return nextIndex;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        paginate(1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative h-[500px] bg-gray-100 rounded-2xl overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <Image
                src={products[currentIndex].image}
                alt={products[currentIndex].name}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-emerald-500/80 rounded-full">
                  {products[currentIndex].category}
                </div>
                <h3 className="text-2xl font-bold mb-2">{products[currentIndex].name}</h3>
                <p className="text-gray-200 mb-4">{products[currentIndex].description}</p>
                <div className="text-xl font-semibold">{products[currentIndex].price}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none z-10">
          <button
            onClick={() => paginate(-1)}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-all duration-200 hover:scale-105 group"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-white/90 transition-colors" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-all duration-200 hover:scale-105 group"
            aria-label="Next product"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-white/90 transition-colors" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-10">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const direction = index > currentIndex ? 1 : -1;
                setDirection(direction);
                setCurrentIndex(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 