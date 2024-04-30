import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { VirtualHost } from './virtual-host.model';

@Controller('virtual-hosts')
export class AppController {
  virtualHosts: VirtualHost[] = [];
  isLoading: boolean = false;

  constructor(private readonly appService: AppService) {}

  @Get()
  async getVirtualHosts(): Promise<VirtualHost[]> {
    this.isLoading = true;
    try {
      this.virtualHosts = await this.appService.getVirtualHosts();
    } catch (error) {
      console.error('Error fetching virtual hosts:', error);
    } finally {
      this.isLoading = false;
    }
    return this.virtualHosts;
  }
}
