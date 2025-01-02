export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const ENDPOINTS = {
  // Team endpoints
  TEAM: {
    BASE: '/team',
    COUNT_ACTIVE: '/team/count/active',
    BY_ID: (id: string) => `/team/${id}`,
  },
  
  // Livestock endpoints
  LIVESTOCK: {
    BASE: '/livestock',
    BY_ID: (id: string) => `/livestock/${id}`,
  },
  
  // Distribution endpoints
  DISTRIBUTION: {
    BASE: '/distribution',
    COUNT_PENDING: '/distribution/count/pending',
    BY_ID: (id: string) => `/distribution/${id}`,
  },
  
  // Activity endpoints
  ACTIVITY: {
    BASE: '/activity',
    RECENT: '/activity/recent',
  },
} as const; 