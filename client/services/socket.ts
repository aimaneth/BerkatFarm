import { io, Socket } from 'socket.io-client';
import { Livestock } from './livestock';

interface ServerToClientEvents {
  'livestock:created': (data: Livestock) => void;
  'livestock:updated': (data: Livestock) => void;
  'livestock:deleted': (id: number) => void;
  'livestock:batch-created': (data: Livestock[]) => void;
  'livestock:batch-updated': (data: Livestock[]) => void;
  'livestock:batch-deleted': (ids: number[]) => void;
}

interface ClientToServerEvents {
  'subscribe:livestock': () => void;
  'unsubscribe:livestock': () => void;
}

class SocketService {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  connect() {
    if (!this.socket) {
      this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
        transports: ['websocket'],
      });

      this.setupEventListeners();
    }
    return this.socket;
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.socket?.emit('subscribe:livestock');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Livestock events
    this.socket.on('livestock:created', (data) => {
      this.notifyListeners('livestock:created', data);
    });

    this.socket.on('livestock:updated', (data) => {
      this.notifyListeners('livestock:updated', data);
    });

    this.socket.on('livestock:deleted', (id) => {
      this.notifyListeners('livestock:deleted', id);
    });

    this.socket.on('livestock:batch-created', (data) => {
      this.notifyListeners('livestock:batch-created', data);
    });

    this.socket.on('livestock:batch-updated', (data) => {
      this.notifyListeners('livestock:batch-updated', data);
    });

    this.socket.on('livestock:batch-deleted', (ids) => {
      this.notifyListeners('livestock:batch-deleted', ids);
    });
  }

  subscribe(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback);
  }

  unsubscribe(event: string, callback: Function) {
    this.listeners.get(event)?.delete(callback);
  }

  private notifyListeners(event: string, data: any) {
    this.listeners.get(event)?.forEach(callback => callback(data));
  }

  disconnect() {
    if (this.socket) {
      this.socket.emit('unsubscribe:livestock');
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService(); 