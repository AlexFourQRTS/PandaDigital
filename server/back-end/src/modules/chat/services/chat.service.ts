import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { chatMessages, type ChatMessage, type InsertChatMessage } from '../../../../../shared/schema';

@Injectable()
export class ChatService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(limit: number = 50): Promise<ChatMessage[]> {
    return this.db.db
      .select()
      .from(chatMessages)
      .orderBy(chatMessages.id)
      .limit(limit);
  }

  async create(data: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await this.db.db.insert(chatMessages).values(data).returning();
    return message;
  }
}