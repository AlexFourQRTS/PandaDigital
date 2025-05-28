import { pgTable, serial, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email'),
  displayName: text('display_name'),
  photoURL: text('photo_url'),
  createdAt: timestamp('created_at').defaultNow()
});

// Blog posts table (matching existing database structure)
export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  codeSnippet: text('code_snippet'),
  language: text('language'),
  fileName: text('file_name'),
  readTime: integer('read_time'),
  createdAt: timestamp('created_at').defaultNow()
});

// Technologies table (matching existing database structure)
export const technologies = pgTable('technologies', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  tags: text('tags').array(),
  createdAt: timestamp('created_at').defaultNow()
});

// News articles table
export const newsArticles = pgTable('news_articles', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  source: text('source'),
  url: text('url'),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow()
});

// Media files table
export const mediaFiles = pgTable('media_files', {
  id: serial('id').primaryKey(),
  filename: text('filename').notNull(),
  originalName: text('original_name').notNull(),
  mimeType: text('mime_type').notNull(),
  size: integer('size').notNull(),
  path: text('path').notNull(),
  isProtected: boolean('is_protected').default(false),
  createdAt: timestamp('created_at').defaultNow()
});

// Chat messages table (matching existing database structure)
export const chatMessages = pgTable('chat_messages', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  content: text('content').notNull(),
  timestamp: timestamp('timestamp').defaultNow()
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, createdAt: true });
export const insertTechnologySchema = createInsertSchema(technologies).omit({ id: true, createdAt: true });
export const insertNewsArticleSchema = createInsertSchema(newsArticles).omit({ id: true, createdAt: true });
export const insertMediaFileSchema = createInsertSchema(mediaFiles).omit({ id: true, createdAt: true });
export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({ id: true, createdAt: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type Technology = typeof technologies.$inferSelect;
export type InsertTechnology = z.infer<typeof insertTechnologySchema>;
export type NewsArticle = typeof newsArticles.$inferSelect;
export type InsertNewsArticle = z.infer<typeof insertNewsArticleSchema>;
export type MediaFile = typeof mediaFiles.$inferSelect;
export type InsertMediaFile = z.infer<typeof insertMediaFileSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;