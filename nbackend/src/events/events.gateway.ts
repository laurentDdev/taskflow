import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { convertHeaders } from 'src/auth';
import { SocketService } from 'src/socket/socket.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('EventsGateway');

  constructor(
    private authService: AuthService,
    private socketService: SocketService,
  ) {}

  async handleConnection(client: Socket) {
    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(client.handshake.headers)) {
      if (value) {
        headers[key] = Array.isArray(value) ? value.join(',') : value;
      }
    }

    const session = await this.authService.api.getSession({
      headers,
    });

    if (!session || (session && !session.user)) {
      client.disconnect();
      return;
    }

    this.socketService.addClient(session.user.id, client);

    this.logger.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(client.handshake.headers)) {
      if (value) {
        headers[key] = Array.isArray(value) ? value.join(',') : value;
      }
    }

    const session = await this.authService.api.getSession({
      headers,
    });

    this.logger.log(`Client disconnected: ${client.id}`);
    if (!session || (session && !session.user)) {
      client.disconnect();
      this.socketService.removeOfflineUser(client.id);
      return;
    }

    this.socketService.removeClient(session.user.id);
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
