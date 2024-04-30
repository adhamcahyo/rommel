// src/virtual-host.service.ts

import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm'; // Import UpdateResult
import { VirtualHost } from './virtual-host.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VirtualHostService {
  constructor(
    @InjectRepository(VirtualHost)
    private readonly virtualHostRepository: Repository<VirtualHost>,
  ) {}

  async getVirtualHosts(): Promise<VirtualHost[]> {
    return await this.virtualHostRepository.find();
  }

  async createVirtualHost(virtualHost: VirtualHost): Promise<VirtualHost> {
    return await this.virtualHostRepository.save(virtualHost);
  }

  async updateVirtualHost(
    id: number,
    updatedVirtualHost: VirtualHost,
  ): Promise<VirtualHost> {
    // Use UpdateResult type for update method
    const updateResult: UpdateResult = await this.virtualHostRepository.update(
      id,
      updatedVirtualHost,
    );
    if (updateResult.affected && updateResult.affected > 0) {
      return updatedVirtualHost;
    } else {
      throw new Error('Failed to update virtual host.');
    }
  }

  async deleteVirtualHost(id: number): Promise<void> {
    await this.virtualHostRepository.delete(id);
  }
}