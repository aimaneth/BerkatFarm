import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ 
  message = "Loading...", 
  className = "h-[200px]" 
}: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-gray-500 ${className}`}>
      <Loader2 className="h-8 w-8 mb-2 animate-spin" />
      <p>{message}</p>
    </div>
  );
} 