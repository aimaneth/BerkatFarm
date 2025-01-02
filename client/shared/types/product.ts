export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  unit: string;
  category: 'milk' | 'meat';
  inStock?: boolean;
  nutritionInfo?: {
    calories?: number;
    protein?: number;
    fat?: number;
  };
  origin?: string;
  processingDate?: string;
  expiryDate?: string;
} 