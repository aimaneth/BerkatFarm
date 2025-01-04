'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface ToasterProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  duration?: number;
}

export function Toaster({ 
  position = 'top-right',
  duration = 5000 
}: ToasterProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToast = (event: CustomEvent<Toast>) => {
      const newToast = event.detail;
      setToasts(prev => [...prev, newToast]);
      
      // Auto remove toast after duration
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, duration);
    };

    window.addEventListener('toast' as any, handleToast);
    return () => window.removeEventListener('toast' as any, handleToast);
  }, [duration]);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left': return 'top-4 left-4';
      case 'top-right': return 'top-4 right-4';
      case 'bottom-left': return 'bottom-4 left-4';
      case 'bottom-right': return 'bottom-4 right-4';
      default: return 'top-4 right-4';
    }
  };

  const getToastClasses = (type: Toast['type']) => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className={`fixed z-50 ${getPositionClasses()} space-y-2 min-w-[300px]`}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastClasses(toast.type)} text-white p-4 rounded-lg shadow-lg flex items-center justify-between animate-slide-in`}
        >
          <p>{toast.message}</p>
          <button
            onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
            className="ml-4 hover:opacity-80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

// Helper function to show toasts
export const showToast = (message: string, type: Toast['type'] = 'info') => {
  const event = new CustomEvent('toast', {
    detail: {
      id: Date.now().toString(),
      message,
      type
    }
  });
  window.dispatchEvent(event);
}; 