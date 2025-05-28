import { 
  users, blogPosts, technologies, newsArticles, mediaFiles, chatMessages,
  type User, type InsertUser, type BlogPost, type InsertBlogPost,
  type Technology, type InsertTechnology, type NewsArticle, type InsertNewsArticle,
  type MediaFile, type InsertMediaFile, type ChatMessage, type InsertChatMessage
} from "@shared/schema";
import { db } from "./db";
import { eq, ilike, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  searchBlogPosts(query: string): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;

  // Technologies
  getTechnologies(): Promise<Technology[]>;
  getTechnology(id: number): Promise<Technology | undefined>;
  createTechnology(tech: InsertTechnology): Promise<Technology>;
  deleteTechnology(id: number): Promise<void>;

  // News Articles
  getNewsArticles(): Promise<NewsArticle[]>;
  getNewsArticle(id: number): Promise<NewsArticle | undefined>;
  createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle>;

  // Media Files
  getMediaFiles(type?: string): Promise<MediaFile[]>;
  getMediaFile(id: number): Promise<MediaFile | undefined>;
  createMediaFile(file: InsertMediaFile): Promise<MediaFile>;
  deleteMediaFile(id: number): Promise<void>;
  updateMediaFileProtection(id: number, isProtected: boolean): Promise<void>;

  // Chat Messages
  getChatMessages(limit?: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(ilike(blogPosts.title, `%${query}%`))
      .orderBy(desc(blogPosts.createdAt));
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Technologies
  async getTechnologies(): Promise<Technology[]> {
    return await db.select().from(technologies).orderBy(desc(technologies.createdAt));
  }

  async getTechnology(id: number): Promise<Technology | undefined> {
    const [tech] = await db.select().from(technologies).where(eq(technologies.id, id));
    return tech || undefined;
  }

  async createTechnology(tech: InsertTechnology): Promise<Technology> {
    const [newTech] = await db.insert(technologies).values(tech).returning();
    return newTech;
  }

  async deleteTechnology(id: number): Promise<void> {
    await db.delete(technologies).where(eq(technologies.id, id));
  }

  // News Articles
  async getNewsArticles(): Promise<NewsArticle[]> {
    return await db.select().from(newsArticles).orderBy(desc(newsArticles.publishedAt));
  }

  async getNewsArticle(id: number): Promise<NewsArticle | undefined> {
    const [article] = await db.select().from(newsArticles).where(eq(newsArticles.id, id));
    return article || undefined;
  }

  async createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle> {
    const [newArticle] = await db.insert(newsArticles).values(article).returning();
    return newArticle;
  }

  // Media Files
  async getMediaFiles(type?: string): Promise<MediaFile[]> {
    if (type) {
      return await db.select().from(mediaFiles)
        .where(eq(mediaFiles.mediaType, type))
        .orderBy(desc(mediaFiles.uploadedAt));
    }
    return await db.select().from(mediaFiles).orderBy(desc(mediaFiles.uploadedAt));
  }

  async getMediaFile(id: number): Promise<MediaFile | undefined> {
    const [file] = await db.select().from(mediaFiles).where(eq(mediaFiles.id, id));
    return file || undefined;
  }

  async createMediaFile(file: InsertMediaFile): Promise<MediaFile> {
    const [newFile] = await db.insert(mediaFiles).values(file).returning();
    return newFile;
  }

  async deleteMediaFile(id: number): Promise<void> {
    await db.delete(mediaFiles).where(eq(mediaFiles.id, id));
  }

  async updateMediaFileProtection(id: number, isProtected: boolean): Promise<void> {
    await db.update(mediaFiles).set({ protected: isProtected }).where(eq(mediaFiles.id, id));
  }

  // Chat Messages
  async getChatMessages(limit: number = 50): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages)
      .orderBy(desc(chatMessages.timestamp))
      .limit(limit);
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [newMessage] = await db.insert(chatMessages).values(message).returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();
