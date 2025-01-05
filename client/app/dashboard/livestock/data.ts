import { Animal } from './types';

// API endpoints
const API_BASE_URL = '/api/livestock';

// Error type
interface ApiError {
  message: string;
  code: string;
}

// API response type
interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

// Service class for livestock data management
export class LivestockService {
  // Fetch all animals with optional filters
  static async getAnimals(filters?: {
    category?: string;
    status?: string;
    search?: string;
  }): Promise<ApiResponse<Animal[]>> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.category) queryParams.append('category', filters.category);
      if (filters?.status) queryParams.append('status', filters.status);
      if (filters?.search) queryParams.append('search', filters.search);

      const response = await fetch(`${API_BASE_URL}/animals?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch animals');
      
      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          code: 'FETCH_ERROR'
        }
      };
    }
  }

  // Add new animal
  static async addAnimal(animal: Omit<Animal, 'id'>): Promise<ApiResponse<Animal>> {
    try {
      const response = await fetch(`${API_BASE_URL}/animals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animal)
      });
      
      if (!response.ok) throw new Error('Failed to add animal');
      
      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to add animal',
          code: 'ADD_ERROR'
        }
      };
    }
  }

  // Update animal
  static async updateAnimal(id: string, updates: Partial<Animal>): Promise<ApiResponse<Animal>> {
    try {
      const response = await fetch(`${API_BASE_URL}/animals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) throw new Error('Failed to update animal');
      
      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to update animal',
          code: 'UPDATE_ERROR'
        }
      };
    }
  }

  // Delete animal
  static async deleteAnimal(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/animals/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete animal');
      
      return {};
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to delete animal',
          code: 'DELETE_ERROR'
        }
      };
    }
  }

  // Batch update animals
  static async batchUpdateAnimals(ids: string[], updates: Partial<Animal>): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/animals/batch`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids, updates })
      });
      
      if (!response.ok) throw new Error('Failed to update animals');
      
      return {};
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to update animals',
          code: 'BATCH_UPDATE_ERROR'
        }
      };
    }
  }

  // Export animals data
  static async exportAnimals(format: 'csv' | 'excel'): Promise<ApiResponse<Blob>> {
    try {
      const response = await fetch(`${API_BASE_URL}/export?format=${format}`);
      if (!response.ok) throw new Error('Failed to export data');
      
      const blob = await response.blob();
      return { data: blob };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to export data',
          code: 'EXPORT_ERROR'
        }
      };
    }
  }

  // Import animals data
  static async importAnimals(file: File): Promise<ApiResponse<{ count: number }>> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/import`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Failed to import data');
      
      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to import data',
          code: 'IMPORT_ERROR'
        }
      };
    }
  }
}

// Keep the mock data for development and testing
export const mockLivestock: Animal[] = [
  // ... existing mock data ...
]; 