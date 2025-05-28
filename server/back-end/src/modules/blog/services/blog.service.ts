import { Injectable, NotFoundException } from '@nestjs/common';
import { eq, ilike } from 'drizzle-orm';
import { DatabaseService } from '../../../database/database.service';
import { blogPosts, type BlogPost, type InsertBlogPost } from '../../../../../shared/schema';

@Injectable()
export class BlogService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<BlogPost[]> {
    return this.db.db.select().from(blogPosts).orderBy(blogPosts.id);
  }

  async findOne(id: number): Promise<BlogPost> {
    const [post] = await this.db.db.select().from(blogPosts).where(eq(blogPosts.id, id));
    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    return post;
  }

  async search(query: string): Promise<BlogPost[]> {
    return this.db.db
      .select()
      .from(blogPosts)
      .where(ilike(blogPosts.title, `%${query}%`))
      .orderBy(blogPosts.id);
  }

  async create(data: InsertBlogPost): Promise<BlogPost> {
    const [post] = await this.db.db.insert(blogPosts).values(data).returning();
    return post;
  }

  async remove(id: number): Promise<void> {
    const result = await this.db.db.delete(blogPosts).where(eq(blogPosts.id, id));
    if (result.rowCount === 0) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
  }
}