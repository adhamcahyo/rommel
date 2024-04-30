import { Controller, Get, Post, Put, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { VirtualHost } from './virtual-host.model';
import * as fs from 'fs';

@Controller('virtual-hosts')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getVirtualHosts(): Promise<VirtualHost[]> {
    return await this.appService.getVirtualHosts();
  }

  @Get('component-html')
  getAppComponentHTML(): string {
    try {
      const htmlContent = fs.readFileSync('./src/app.component.html', 'utf8');
      return htmlContent;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createVirtualHost(@Body() virtualHost: VirtualHost): Promise<VirtualHost> {
    return await this.appService.createVirtualHost(virtualHost);
  }

  @Put(':domain')
  async updateVirtualHost(
    @Param('domain') domain: string,
    @Body() updatedVirtualHost: VirtualHost,
  ): Promise<VirtualHost> {
    try {
      const updated = await this.appService.updateVirtualHost(domain, updatedVirtualHost);
      return updated;
    } catch (error) {
      if (error.message === 'Virtual host not found') {
        throw new HttpException('Virtual host not found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
