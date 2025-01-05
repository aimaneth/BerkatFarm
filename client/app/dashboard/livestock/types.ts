export interface Animal {
  id: string;
  tag: string;
  category: string;
  breed: string;
  status: 'healthy' | 'sick' | 'quarantined';
  age: string;
  weight: string;
  lastCheckup: string;
  nextVaccination: string;
  location: string;
  notes: string;
  reproductiveStatus: string;
  expectedDelivery?: string;
  genetics: {
    sire: string;
    dam: string;
    bloodline: string;
    breedingValue: string;
  };
  production: {
    type: string;
    average: string;
    quality: string;
    lastRecord: string;
  };
  health: {
    vaccinations: string[];
    medications: string[];
    conditions: string[];
    vetNotes: string;
  };
  nutrition: {
    feedPlan: string;
    supplements: string[];
    consumption: string;
    waterIntake: string;
  };
  financial: {
    purchasePrice: string;
    currentValue: string;
    productionValue: string;
    costs: string;
  };
}

export interface LivestockStats {
  total: number;
  healthy: number;
  sick: number;
  quarantined: number;
  pregnant: number;
  recentBirths: number;
  upcomingVaccinations: number;
  totalValue: number;
  monthlyProduction: {
    milk: number;
    wool: number;
    meat: number;
  };
  feedStock: {
    hay: number;
    grain: number;
    supplements: number;
  };
}

export interface CategoryStats {
  id: string;
  name: string;
  count: number;
  trend: string;
  production: {
    milk?: string;
    meat?: string;
    wool?: string;
  };
  feed: {
    daily: string;
    cost: string;
  };
  revenue: string;
}

export interface LivestockData {
  stats: LivestockStats;
  categories: CategoryStats[];
  animals: Animal[];
} 