import { Controller, Get, Post, Body, Query, ParseIntPipe } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { CreateChatMessageDto } from '../dto/create-chat-message.dto';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  async getMessages(@Query('limit', ParseIntPipe) limit: number = 50) {
    return this.chatService.findAll(limit);
  }

  @Post('messages')
  async createMessage(@Body() createMessageDto: CreateChatMessageDto) {
    return this.chatService.create(createMessageDto);
  }
}