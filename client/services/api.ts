import axios from 'axios';
import type { Livestock, TeamMember, Distribution, Activity } from '@/types/api';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const livestockApi = {
  getAll: () => api.get<Livestock[]>('/livestock').then(res => res.data),
  getById: (id: string) => api.get<Livestock>(`/livestock/${id}`).then(res => res.data),
  create: (data: Partial<Livestock>) => api.post<Livestock>('/livestock', data).then(res => res.data),
  update: (id: string, data: Partial<Livestock>) => api.put<Livestock>(`/livestock/${id}`, data).then(res => res.data),
  delete: (id: string) => api.delete(`/livestock/${id}`).then(res => res.data),
  getCount: () => api.get<number>('/livestock/count').then(res => res.data),
};

export const teamApi = {
  getAll: () => api.get<TeamMember[]>('/team').then(res => res.data),
  getById: (id: string) => api.get<TeamMember>(`/team/${id}`).then(res => res.data),
  create: (data: Partial<TeamMember>) => api.post<TeamMember>('/team', data).then(res => res.data),
  update: (id: string, data: Partial<TeamMember>) => api.put<TeamMember>(`/team/${id}`, data).then(res => res.data),
  delete: (id: string) => api.delete(`/team/${id}`).then(res => res.data),
  getActiveCount: () => api.get<number>('/team/count/active').then(res => res.data),
};

export const distributionApi = {
  getAll: () => api.get<Distribution[]>('/distribution').then(res => res.data),
  getById: (id: string) => api.get<Distribution>(`/distribution/${id}`).then(res => res.data),
  create: (data: Partial<Distribution>) => api.post<Distribution>('/distribution', data).then(res => res.data),
  update: (id: string, data: Partial<Distribution>) => api.put<Distribution>(`/distribution/${id}`, data).then(res => res.data),
  delete: (id: string) => api.delete(`/distribution/${id}`).then(res => res.data),
  getPendingCount: () => api.get<number>('/distribution/count/pending').then(res => res.data),
};

export const activityApi = {
  getRecent: (limit = 10) => api.get<Activity[]>(`/activity/recent?limit=${limit}`).then(res => res.data),
}; 