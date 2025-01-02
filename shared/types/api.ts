import { ITeam, ILivestock, IDistribution, IActivity } from './models';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface CountResponse {
  count: number;
}

// Team API Types
export type TeamResponse = ApiResponse<ITeam>;
export type TeamsResponse = ApiResponse<ITeam[]>;
export type TeamCountResponse = ApiResponse<CountResponse>;

// Livestock API Types
export type LivestockResponse = ApiResponse<ILivestock>;
export type LivestockListResponse = ApiResponse<ILivestock[]>;

// Distribution API Types
export type DistributionResponse = ApiResponse<IDistribution>;
export type DistributionListResponse = ApiResponse<IDistribution[]>;
export type DistributionCountResponse = ApiResponse<CountResponse>;

// Activity API Types
export type ActivityResponse = ApiResponse<IActivity>;
export type ActivityListResponse = ApiResponse<IActivity[]>; 