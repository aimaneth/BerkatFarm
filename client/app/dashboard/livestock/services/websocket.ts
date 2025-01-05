import { Animal, LivestockData } from '../types';

type WebSocketEventType = 
  | 'ANIMAL_ADDED'
  | 'ANIMAL_UPDATED'
  | 'ANIMAL_DELETED'
  | 'BATCH_UPDATED'
  | 'DATA_UPDATED';

interface WebSocketEvent<T = any> {
  type: WebSocketEventType;
  data: T;
}

type WebSocketEventHandler = (event: WebSocketEvent) => void;

export class LivestockWebSocket {
  private ws: WebSocket | null = null;
  private eventHandlers: WebSocketEventHandler[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private pingInterval: NodeJS.Timeout | null = null;

  constructor(private url: string = `${process.env.NEXT_PUBLIC_WS_URL}/livestock`) {}

  connect() {
    try {
      this.ws = new WebSocket(this.url);
      this.setupEventListeners();
      this.startPingInterval();
    } catch (error) {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    }
  }

  private setupEventListeners() {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.handleReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onmessage = (event) => {
      try {
        const wsEvent: WebSocketEvent = JSON.parse(event.data);
        this.notifyEventHandlers(wsEvent);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
  }

  private handleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(`Attempting to reconnect in ${delay}ms...`);
    setTimeout(() => this.connect(), delay);
  }

  private startPingInterval() {
    this.pingInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'PING' }));
      }
    }, 30000); // Send ping every 30 seconds
  }

  subscribe(handler: WebSocketEventHandler) {
    this.eventHandlers.push(handler);
    return () => this.unsubscribe(handler);
  }

  unsubscribe(handler: WebSocketEventHandler) {
    this.eventHandlers = this.eventHandlers.filter(h => h !== handler);
  }

  private notifyEventHandlers(event: WebSocketEvent) {
    this.eventHandlers.forEach(handler => {
      try {
        handler(event);
      } catch (error) {
        console.error('Error in event handler:', error);
      }
    });
  }

  disconnect() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  // Helper methods for sending specific events
  sendAnimalAdded(animal: Animal) {
    this.sendEvent('ANIMAL_ADDED', animal);
  }

  sendAnimalUpdated(animal: Animal) {
    this.sendEvent('ANIMAL_UPDATED', animal);
  }

  sendAnimalDeleted(animalId: string) {
    this.sendEvent('ANIMAL_DELETED', { id: animalId });
  }

  sendBatchUpdated(animalIds: string[], updates: Partial<Animal>) {
    this.sendEvent('BATCH_UPDATED', { ids: animalIds, updates });
  }

  sendDataUpdated(data: LivestockData) {
    this.sendEvent('DATA_UPDATED', data);
  }

  private sendEvent(type: WebSocketEventType, data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, data }));
    } else {
      console.warn('WebSocket is not connected');
    }
  }
} 