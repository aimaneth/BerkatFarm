interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
}

const variants = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  default: 'bg-gray-100 text-gray-800',
};

const statusVariantMap: Record<string, keyof typeof variants> = {
  // Livestock statuses
  active: 'success',
  sold: 'info',
  deceased: 'error',
  healthy: 'success',
  sick: 'error',
  under_treatment: 'warning',

  // Team statuses
  on_leave: 'warning',
  inactive: 'error',

  // Distribution statuses
  pending: 'warning',
  processing: 'info',
  shipped: 'info',
  delivered: 'success',
  cancelled: 'error',

  // Payment statuses
  paid: 'success',
  refunded: 'warning',
};

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const statusClass = variants[variant || statusVariantMap[status] || 'default'];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
      {status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ')}
    </span>
  );
} 