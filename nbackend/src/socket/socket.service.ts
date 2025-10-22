import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private connectedClients: Map<string, Socket> = new Map();

  addClient(userId: string, socket: Socket) {
    this.connectedClients.set(userId, socket);
  }

  removeClient(userId: string) {
    this.connectedClients.delete(userId);
  }

  getClient(userId: string): Socket | undefined {
    return this.connectedClients.get(userId);
  }

  removeOfflineUser(clientId: string) {
    this.connectedClients.forEach((socket, email) => {
      if (socket.id === clientId) {
        this.connectedClients.delete(email);
      }
    });
  }
}
