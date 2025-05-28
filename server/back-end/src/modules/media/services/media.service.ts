import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../../../database/database.service';
import { mediaFiles, type MediaFile, type InsertMediaFile } from '../../../../../shared/schema';

@Injectable()
export class MediaService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(type?: string): Promise<MediaFile[]> {
    const query = this.db.db.select().from(mediaFiles);
    
    if (type) {
      return query.where(eq(mediaFiles.type, type)).orderBy(mediaFiles.id);
    }
    
    return query.orderBy(mediaFiles.id);
  }

  async findOne(id: number): Promise<MediaFile> {
    const [file] = await this.db.db.select().from(mediaFiles).where(eq(mediaFiles.id, id));
    if (!file) {
      throw new NotFoundException(`Media file with ID ${id} not found`);
    }
    return file;
  }

  async create(data: InsertMediaFile): Promise<MediaFile> {
    const [file] = await this.db.db.insert(mediaFiles).values(data).returning();
    return file;
  }

  async remove(id: number): Promise<void> {
    const result = await this.db.db.delete(mediaFiles).where(eq(mediaFiles.id, id));
    if (result.rowCount === 0) {
      throw new NotFoundException(`Media file with ID ${id} not found`);
    }
  }

  async updateProtection(id: number, isProtected: boolean): Promise<MediaFile> {
    const [file] = await this.db.db
      .update(mediaFiles)
      .set({ isProtected })
      .where(eq(mediaFiles.id, id))
      .returning();
    
    if (!file) {
      throw new NotFoundException(`Media file with ID ${id} not found`);
    }
    
    return file;
  }
}