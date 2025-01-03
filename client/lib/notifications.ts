import { toast } from "@/hooks/use-toast"

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface ShowNotificationProps {
  title: string;
  message: string;
  type?: NotificationType;
  duration?: number;
}

export const showNotification = ({ 
  title, 
  message, 
  type = 'info',
  duration = 5000 
}: ShowNotificationProps) => {
  const variants: Record<NotificationType, any> = {
    success: 'success',
    error: 'destructive',
    warning: 'warning',
    info: 'info'
  };

  return toast({
    title,
    description: message,
    variant: variants[type],
    duration
  });
}; 