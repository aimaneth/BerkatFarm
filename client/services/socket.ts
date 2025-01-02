import { io, Socket } from 'socket.io-client';
import type { Activity } from '@/types/api';

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;

  private constructor() {
    const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000';
    this.socket = io(SOCKET_URL);

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public onLivestockUpdate(callback: (data: any) => void) {
    this.socket?.on('livestock:update', callback);
  }

  public onTeamUpdate(callback: (data: any) => void) {
    this.socket?.on('team:update', callback);
  }

  public onDistributionUpdate(callback: (data: any) => void) {
    this.socket?.on('distribution:update', callback);
  }

  public onNewActivity(callback: (activity: Activity) => void) {
    this.socket?.on('activity:new', callback);
  }

  public disconnect() {
    this.socket?.disconnect();
  }
}

export const socketService = SocketService.getInstance(); 