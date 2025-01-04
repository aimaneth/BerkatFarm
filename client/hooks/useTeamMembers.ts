import useSWR from 'swr';
import { fetcher } from '@/lib/utils';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
  department: string;
  shift: string;
  status: 'ACTIVE' | 'INACTIVE';
  phone: string;
  specializations: string[];
  location: string;
}

interface TeamMembersResponse {
  items: TeamMember[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  _links: {
    self: string;
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
  };
}

export function useTeamMembers(page = 1, limit = 10) {
  const { data, error, mutate } = useSWR<TeamMembersResponse>(
    `/api/users?page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    data: data?.items,
    isLoading: !error && !data,
    error,
    mutate,
    pagination: data ? {
      page: data.page,
      limit: data.limit,
      total: data.total,
      totalPages: data.totalPages,
      links: data._links
    } : null
  };
} 