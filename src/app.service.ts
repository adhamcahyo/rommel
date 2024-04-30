import { Injectable } from '@nestjs/common';
import { VirtualHost } from './virtual-host.model'; // Import the interface

@Injectable()
export class AppService {
  private virtualHosts: VirtualHost[] = [];

  async getVirtualHosts(): Promise<VirtualHost[]> {
    return Promise.resolve(this.virtualHosts); // Assuming synchronous data retrieval for now
  }

  async createVirtualHost(virtualHost: VirtualHost): Promise<VirtualHost> {
    this.virtualHosts.push(virtualHost);
    return Promise.resolve(virtualHost); // Assuming synchronous data storage for now
  }

  async updateVirtualHost(domain: string, updatedVirtualHost: VirtualHost): Promise<VirtualHost> {
    const index = this.virtualHosts.findIndex(vh => vh.domain === domain);
    if (index !== -1) {
      this.virtualHosts[index] = updatedVirtualHost;
      return Promise.resolve(updatedVirtualHost);
    } else {
      return Promise.reject('Virtual host not found');
    }
  }
}
