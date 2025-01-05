import { useEffect, useRef } from 'react';
import { LivestockWebSocket } from '../services/websocket';
import { Animal, LivestockData } from '../types';

interface UseWebSocketOptions {
  onAnimalAdded?: (animal: Animal) => void;
  onAnimalUpdated?: (animal: Animal) => void;
  onAnimalDeleted?: (animalId: string) => void;
  onBatchUpdated?: (animalIds: string[], updates: Partial<Animal>) => void;
  onDataUpdated?: (data: LivestockData) => void;
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const wsRef = useRef<LivestockWebSocket | null>(null);

  useEffect(() => {
    // Create WebSocket instance
    wsRef.current = new LivestockWebSocket();

    // Connect and subscribe to events
    const ws = wsRef.current;
    ws.connect();

    const unsubscribe = ws.subscribe((event) => {
      switch (event.type) {
        case 'ANIMAL_ADDED':
          options.onAnimalAdded?.(event.data);
          break;
        case 'ANIMAL_UPDATED':
          options.onAnimalUpdated?.(event.data);
          break;
        case 'ANIMAL_DELETED':
          options.onAnimalDeleted?.(event.data.id);
          break;
        case 'BATCH_UPDATED':
          options.onBatchUpdated?.(event.data.ids, event.data.updates);
          break;
        case 'DATA_UPDATED':
          options.onDataUpdated?.(event.data);
          break;
      }
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
      ws.disconnect();
    };
  }, []); // Only run once on mount

  return wsRef.current;
} 