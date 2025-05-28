import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { newsArticles, type NewsArticle, type InsertNewsArticle } from '../../../../../shared/schema';

@Injectable()
export class NewsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<NewsArticle[]> {
    return this.db.db.select().from(newsArticles).orderBy(newsArticles.publishedAt);
  }

  async findOne(id: number): Promise<NewsArticle | undefined> {
    const [article] = await this.db.db.select().from(newsArticles).where(eq(newsArticles.id, id));
    return article;
  }

  async create(data: InsertNewsArticle): Promise<NewsArticle> {
    const [article] = await this.db.db.insert(newsArticles).values(data).returning();
    return article;
  }
}