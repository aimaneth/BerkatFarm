import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  icon?: LucideIcon;
  className?: string;
}

export function EmptyState({ message, icon: Icon, className = "h-[200px]" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-gray-500 ${className}`}>
      {Icon && <Icon className="h-8 w-8 mb-2 opacity-50" />}
      <p>{message}</p>
    </div>
  );
} 