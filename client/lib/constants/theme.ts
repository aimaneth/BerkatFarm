export const COLORS = {
  primary: '#10B981',
  secondary: '#F59E0B',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827'
  }
} as const;

export const CHART_CONFIG = {
  height: 300,
  innerRadius: 60,
  outerRadius: 80,
  paddingAngle: 5,
  strokeDasharray: '3 3'
} as const; 