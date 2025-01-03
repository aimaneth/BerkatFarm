import { useEffect, useRef, useCallback } from 'react';
import { useNotifications } from './useNotifications';

export function useWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const { addNotification } = useNotifications();

  const connect = useCallback(() => {
    // Replace with your actual WebSocket server URL
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'notification') {
          addNotification(data.notification);
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      // Attempt to reconnect after 5 seconds
      setTimeout(connect, 5000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws.close();
    };

    wsRef.current = ws;
  }, [addNotification]);

  useEffect(() => {
    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return wsRef.current;
} 