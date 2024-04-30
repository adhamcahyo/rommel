import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { VirtualHost } from './virtual-host.model';

@Controller('virtual-hosts')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getVirtualHosts(): Promise<VirtualHost[]> {
    return await this.appService.getVirtualHosts();
  }
}
