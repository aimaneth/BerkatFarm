'use client';

import React from 'react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Product } from '@/shared/types/product';

interface ProductGridProps {
  category: 'milk' | 'meat';
  products: Product[];
}

export function ProductGrid({ category, products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <div className="relative h-48">
            <OptimizedImage
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
              {product.name}
            </h3>
            <p className="mt-2 text-gray-600">{product.description}</p>
            
            {/* Nutrition Info */}
            {product.nutritionInfo && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {product.nutritionInfo.calories && (
                  <div className="text-center p-2 bg-emerald-50 rounded-lg">
                    <div className="text-sm text-gray-600">Calories</div>
                    <div className="font-semibold text-emerald-600">{product.nutritionInfo.calories}</div>
                  </div>
                )}
                {product.nutritionInfo.protein && (
                  <div className="text-center p-2 bg-emerald-50 rounded-lg">
                    <div className="text-sm text-gray-600">Protein</div>
                    <div className="font-semibold text-emerald-600">{product.nutritionInfo.protein}g</div>
                  </div>
                )}
                {product.nutritionInfo.fat && (
                  <div className="text-center p-2 bg-emerald-50 rounded-lg">
                    <div className="text-sm text-gray-600">Fat</div>
                    <div className="font-semibold text-emerald-600">{product.nutritionInfo.fat}g</div>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-6 flex justify-between items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                ${product.price.toFixed(2)}/{product.unit}
              </span>
              <button 
                className="inline-flex items-center px-4 py-2 rounded-full text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 