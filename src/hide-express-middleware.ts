// src/hide-express-middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HideExpressMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      // Remove X-Powered-By header 
      res.removeHeader('X-Powered-By');

      // Example: Add custom header
      res.setHeader('X-Custom-App', 'My Virtual Host Manager');

      // Example: Modify existing header (if needed)
      const existingContentType = res.getHeader('Content-Type');
      if (existingContentType) {
        res.setHeader('Content-Type', existingContentType + '; charset=utf-8');
      } else {
        res.setHeader('Content-Type', 'text/plain'); // Set a default if none exists
      }

      // Custom logic: Log the incoming request method and URL
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

      // Call next() to pass control to the next middleware
      next();
    } catch (error) {
      // Handle potential errors during header manipulation or other middleware operations
      console.error('Error in HideExpressMiddleware:', error);
      // Consider logging the error to a file or sending an error response (e.g., HTTP 500)
      res.status(500).send('Internal Server Error');
    }
  }
}
