import { io, Socket } from 'socket.io-client';
import { queryClient } from '@/lib/react-query';

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(): Socket | null {
    if (this.socket?.connected) return this.socket;

    this.socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000', {
      reconnectionAttempts: this.maxReconnectAttempts,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    // Dashboard updates
    this.socket.on('dashboard:update', (role: string) => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', role] });
    });

    // Livestock updates
    this.socket.on('livestock:update', () => {
      queryClient.invalidateQueries({ queryKey: ['livestock'] });
    });

    // Task updates
    this.socket.on('task:update', () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    });

    // Order updates
    this.socket.on('order:update', () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data: any) {
    if (!this.socket?.connected) {
      console.warn('Socket not connected. Attempting to connect...');
      this.connect();
    }
    this.socket?.emit(event, data);
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export const socketService = new SocketService(); 