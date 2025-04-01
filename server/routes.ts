import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // This is mainly a frontend application, but we'll set up a basic health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Password Analyzer API is running' });
  });

  const httpServer = createServer(app);

  return httpServer;
}
