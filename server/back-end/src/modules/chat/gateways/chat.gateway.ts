import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { ChatService } from '../services/chat.service';

@WebSocketGateway({ path: '/ws' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: WebSocket) {
    console.log('Client connected to chat');
  }

  handleDisconnect(client: WebSocket) {
    console.log('Client disconnected from chat');
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: { username: string; content: string }) {
    // Save message to database
    const message = await this.chatService.create({
      username: data.username,
      content: data.content,
    });

    // Broadcast to all clients
    this.server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'message',
          data: message,
        }));
      }
    });

    return message;
  }
}