import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { insertBlogPostSchema, insertTechnologySchema, insertChatMessageSchema } from "../shared/schema";
import { z } from "zod";

// Extend Express Request type to include file
interface FileRequest extends Request {
  file?: Express.Multer.File;
}

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // WebSocket server for chat
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
    
    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());
        if (message.type === 'chat_message') {
          // Save message to database
          const savedMessage = await storage.createChatMessage({
            username: message.username,
            content: message.content,
          });
          
          // Broadcast to all connected clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'chat_message',
                data: savedMessage,
              }));
            }
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });

  // Blog routes
  app.get("/api/blog", async (req, res) => {
    try {
      const { search } = req.query;
      let posts;
      
      if (search && typeof search === 'string') {
        posts = await storage.searchBlogPosts(search);
      } else {
        posts = await storage.getBlogPosts();
      }
      
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  app.delete("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBlogPost(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // Technologies routes
  app.get("/api/technologies", async (req, res) => {
    try {
      const technologies = await storage.getTechnologies();
      res.json(technologies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch technologies" });
    }
  });

  app.post("/api/technologies", async (req, res) => {
    try {
      const validatedData = insertTechnologySchema.parse(req.body);
      const technology = await storage.createTechnology(validatedData);
      res.status(201).json(technology);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid technology data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create technology" });
    }
  });

  app.delete("/api/technologies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTechnology(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete technology" });
    }
  });

  // News routes
  app.get("/api/news", async (req, res) => {
    try {
      const articles = await storage.getNewsArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news articles" });
    }
  });

  // Fetch news from external API (mock implementation)
  app.post("/api/news/fetch", async (req, res) => {
    try {
      // This would normally fetch from an external news API
      // For now, we'll create some sample news articles
      const sampleNews = [
        {
          title: "AI Revolution: New Breakthrough in Machine Learning",
          description: "Researchers announce significant advancement in AI capabilities that could transform various industries...",
          imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
          category: "TECHNOLOGY",
          sourceUrl: "https://example.com/news/ai-breakthrough"
        },
        {
          title: "New Mobile Framework Promises Faster Development",
          description: "Cross-platform development gets easier with the latest framework that reduces development time by 40%...",
          imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
          category: "MOBILE",
          sourceUrl: "https://example.com/news/mobile-framework"
        },
        {
          title: "Big Data Analytics Trends for 2024",
          description: "Industry experts share insights on emerging trends in data analytics and visualization tools...",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
          category: "DATA",
          sourceUrl: "https://example.com/news/data-trends"
        }
      ];

      const savedArticles = [];
      for (const article of sampleNews) {
        const saved = await storage.createNewsArticle(article);
        savedArticles.push(saved);
      }

      res.json({ message: "News articles fetched and saved", articles: savedArticles });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news from external API" });
    }
  });

  // Media routes
  app.get("/api/media", async (req, res) => {
    try {
      const { type } = req.query;
      const files = await storage.getMediaFiles(type as string);
      res.json(files);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch media files" });
    }
  });

  app.post("/api/media/upload", upload.single("file"), async (req: FileRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { originalname, filename, mimetype, size } = req.file;
      
      // Determine media type based on mime type
      let mediaType = "document"; // Default to document
      if (mimetype.startsWith("image/")) {
        mediaType = "photo";
      } else if (mimetype.startsWith("video/")) {
        mediaType = "video";
      } else if (mimetype.startsWith("audio/")) {
        mediaType = "audio";
      }
      // All other files remain as 'document'

      const mediaFile = await storage.createMediaFile({
        fileName: filename,
        originalName: originalname,
        mimeType: mimetype,
        fileSize: size,
        mediaType: mediaType as "photo" | "video" | "audio" | "document",
      });

      res.status(201).json(mediaFile);
    } catch (error) {
      res.status(500).json({ message: "Failed to upload media file" });
    }
  });

  // Serve uploaded files
  app.get("/api/media/file/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);
    
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: "File not found" });
    }
  });

  // Serve media files with pretty URLs ending with original filename
  app.get("/api/media/:id/:originalName", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const file = await storage.getMediaFile(id);
      
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      
      const filePath = path.join(uploadDir, file.fileName);
      if (fs.existsSync(filePath)) {
        // Set proper headers for file serving
        res.setHeader('Content-Type', file.mimeType);
        res.setHeader('Content-Disposition', `inline; filename="${file.originalName}"`);
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        res.sendFile(path.resolve(filePath));
      } else {
        res.status(404).json({ message: "File not found on disk" });
      }
    } catch (error) {
      console.error('Error serving file:', error);
      res.status(500).json({ message: "Failed to serve file" });
    }
  });

  // Download files with original filename
  app.get("/api/media/download/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const file = await storage.getMediaFile(id);
      
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }

      const filePath = path.join(uploadDir, file.fileName);
      
      if (fs.existsSync(filePath)) {
        res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
        res.setHeader('Content-Type', file.mimeType);
        res.sendFile(filePath);
      } else {
        res.status(404).json({ message: "File not found on disk" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to download file" });
    }
  });

  app.delete("/api/media/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const file = await storage.getMediaFile(id);
      
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      
      // Check if file is protected
      if (file.protected) {
        return res.status(403).json({ message: "This file is protected and cannot be deleted" });
      }
      
      // Delete file from filesystem
      const filePath = path.join(uploadDir, file.fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      // Delete from database
      await storage.deleteMediaFile(id);
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete media file" });
    }
  });

  // Toggle file protection
  app.patch("/api/media/:id/protection", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { protected: isProtected } = req.body;
      
      await storage.updateMediaFileProtection(id, isProtected);
      res.json({ message: "Protection status updated" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update protection status" });
    }
  });

  // Chat routes
  app.get("/api/chat/messages", async (req, res) => {
    try {
      const { limit } = req.query;
      const messages = await storage.getChatMessages(limit ? parseInt(limit as string) : 50);
      res.json(messages.reverse()); // Reverse to show oldest first
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });

  return httpServer;
}
