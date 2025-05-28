import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../../../database/database.service';
import { users, type User, type InsertUser } from '../../../../../shared/schema';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async findOne(id: number): Promise<User> {
    const [user] = await this.db.db.select().from(users).where(eq(users.id, id));
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const [user] = await this.db.db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async create(data: InsertUser): Promise<User> {
    const [user] = await this.db.db.insert(users).values(data).returning();
    return user;
  }
}