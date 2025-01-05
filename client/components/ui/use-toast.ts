import { useState, useCallback } from 'react';

interface Toast {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
}

interface ToastState extends Toast {
  id: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const toast = useCallback(({ title, description, variant = 'default', duration = 5000 }: Toast) => {
    const id = Date.now();
    
    setToasts(prev => [...prev, { id, title, description, variant, duration }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  }, []);

  return { toast, toasts };
} 