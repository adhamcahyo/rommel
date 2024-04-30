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
