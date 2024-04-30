import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VirtualHost } from './virtual-host.model';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getVirtualHosts', () => {
    it('should return virtual hosts', async () => {
      const virtualHosts: VirtualHost[] = [
        { id: 1, domain: 'example.com', ipAddress: '127.0.0.1', documentRoot: '/var/www/example', serverAliases: ['www.example.com'], }
      ];
      jest.spyOn(appService, 'getVirtualHosts').mockResolvedValue(virtualHosts);

      const result = await appController.getVirtualHosts();
      expect(result).toEqual(virtualHosts);
    });
  });
});
