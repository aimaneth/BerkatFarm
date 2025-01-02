import React from 'react';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductHero } from '@/components/products/ProductHero';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import type { Product } from '@/shared/types/product';

export default function ProductsPage() {
  const milkProducts: Product[] = [
    {
      id: '1',
      name: 'Fresh Whole Milk',
      description: 'Farm-fresh whole milk, rich in nutrients and naturally creamy. Perfect for your daily dairy needs.',
      price: 5.99,
      image: '/images/products/milk.jpg',
      unit: 'liter',
      category: 'milk',
      inStock: true,
      nutritionInfo: {
        calories: 150,
        protein: 8,
        fat: 8
      }
    },
    {
      id: '2',
      name: 'Low-Fat Milk',
      description: 'Fresh low-fat milk, perfect for health-conscious consumers. All the nutrition with less fat.',
      price: 4.99,
      image: '/images/products/low-fat-milk.jpg',
      unit: 'liter',
      category: 'milk',
      inStock: true,
      nutritionInfo: {
        calories: 90,
        protein: 8,
        fat: 2
      }
    },
    {
      id: '3',
      name: 'Farm Fresh Yogurt',
      description: 'Creamy yogurt made from our farm-fresh milk. Rich in probiotics and perfect for a healthy snack.',
      price: 3.99,
      image: '/images/products/yogurt.jpg',
      unit: 'kg',
      category: 'milk',
      inStock: true,
      nutritionInfo: {
        calories: 120,
        protein: 4,
        fat: 3
      }
    }
  ];

  const meatProducts: Product[] = [
    {
      id: '4',
      name: 'Premium Beef Cuts',
      description: 'High-quality, farm-raised beef from grass-fed cattle. Tender, flavorful, and ethically sourced.',
      price: 25.99,
      image: '/images/products/beef.jpg',
      unit: 'kg',
      category: 'meat',
      inStock: true,
      origin: 'Local Farm',
      nutritionInfo: {
        calories: 250,
        protein: 26,
        fat: 15
      }
    },
    {
      id: '5',
      name: 'Organic Chicken',
      description: 'Free-range, organically raised chicken. Lean, tender, and perfect for healthy meals.',
      price: 15.99,
      image: '/images/products/chicken.jpg',
      unit: 'kg',
      category: 'meat',
      inStock: true,
      origin: 'Local Farm',
      nutritionInfo: {
        calories: 165,
        protein: 31,
        fat: 3.6
      }
    },
    {
      id: '6',
      name: 'Farm Fresh Lamb',
      description: 'Premium quality lamb from our pasture-raised flock. Tender and full of flavor.',
      price: 29.99,
      image: '/images/products/lamb.jpg',
      unit: 'kg',
      category: 'meat',
      inStock: true,
      origin: 'Local Farm',
      nutritionInfo: {
        calories: 294,
        protein: 25,
        fat: 21
      }
    }
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-emerald-50">
        <ProductHero />
        
        {/* Milk Products Section */}
        <section id="milk-products" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text inline-block">
                Fresh Farm Milk Products
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                Discover our range of fresh dairy products, sourced directly from our farm to ensure the highest quality.
              </p>
            </div>
            <ProductGrid 
              category="milk"
              products={milkProducts}
            />
          </div>
        </section>

        {/* Meat Products Section */}
        <section id="meat-products" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text inline-block">
                Premium Quality Meat
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                Ethically raised, premium quality meat products from our farm. Tender, flavorful, and sustainably sourced.
              </p>
            </div>
            <ProductGrid 
              category="meat"
              products={meatProducts}
            />
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
} 