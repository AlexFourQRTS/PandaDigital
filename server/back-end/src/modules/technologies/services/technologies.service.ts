import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../../../database/database.service';
import { technologies, type Technology, type InsertTechnology } from '../../../../../shared/schema';

@Injectable()
export class TechnologiesService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<Technology[]> {
    return this.db.db.select().from(technologies).orderBy(technologies.id);
  }

  async findOne(id: number): Promise<Technology> {
    const [tech] = await this.db.db.select().from(technologies).where(eq(technologies.id, id));
    if (!tech) {
      throw new NotFoundException(`Technology with ID ${id} not found`);
    }
    return tech;
  }

  async create(data: InsertTechnology): Promise<Technology> {
    const [tech] = await this.db.db.insert(technologies).values(data).returning();
    return tech;
  }

  async remove(id: number): Promise<void> {
    const result = await this.db.db.delete(technologies).where(eq(technologies.id, id));
    if (result.rowCount === 0) {
      throw new NotFoundException(`Technology with ID ${id} not found`);
    }
  }
}