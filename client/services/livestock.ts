import axios from 'axios';

export interface Livestock {
  id: number;
  tag: string;
  type: string;
  breed: string;
  status: string;
  age: string;
  weight: string;
  location: string;
  lastCheckup: string;
  nextCheckup: string;
  purchaseDate?: string;
  purchasePrice?: string;
  notes?: string;
}

const api = axios.create({
  baseURL: '/api/livestock',
});

export const livestockApi = {
  // Get all livestock with optional filters
  getAll: async (filters?: any) => {
    const response = await api.get('/', { params: filters });
    return response.data;
  },

  // Get a single livestock by ID
  getById: async (id: number) => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  // Create a new livestock
  create: async (data: Omit<Livestock, 'id'>) => {
    const response = await api.post('/', data);
    return response.data;
  },

  // Update a livestock
  update: async (id: number, data: Partial<Livestock>) => {
    const response = await api.put(`/${id}`, data);
    return response.data;
  },

  // Delete a livestock
  delete: async (id: number) => {
    const response = await api.delete(`/${id}`);
    return response.data;
  },

  // Batch operations
  batchCreate: async (data: Omit<Livestock, 'id'>[]) => {
    const response = await api.post('/batch', data);
    return response.data;
  },

  batchUpdate: async (data: { id: number; updates: Partial<Livestock> }[]) => {
    const response = await api.put('/batch', data);
    return response.data;
  },

  batchDelete: async (ids: number[]) => {
    const response = await api.delete('/batch', { data: { ids } });
    return response.data;
  },

  // Export data
  export: async (format: 'csv' | 'pdf') => {
    const response = await api.get('/export', {
      params: { format },
      responseType: 'blob',
    });
    return response.data;
  },
}; 