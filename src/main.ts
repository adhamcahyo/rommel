import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HideExpressMiddleware } from './hide-express-middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, HideExpressMiddleware],
})
export class AppModule {}

// Import necessary modules from NestJS/platform-express
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.use(HideExpressMiddleware); // Apply the middleware if needed

  // Configure the port to listen on
  await app.listen(3000);
  console.log(`Application listening on port ${3000}`);
}

bootstrap();
