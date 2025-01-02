import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline';
}

export const Badge = ({ 
  className, 
  variant = 'default',
  ...props 
}: BadgeProps) => {
  const variantClasses = {
    default: 'bg-emerald-100 text-emerald-800',
    secondary: 'bg-gray-100 text-gray-800',
    outline: 'border border-gray-200 text-gray-800'
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}; 