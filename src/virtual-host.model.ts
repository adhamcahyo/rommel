// src/virtual-host.model.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VirtualHost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  domain: string;

  @Column()
  ipAddress: string;

  @Column()
  documentRoot: string; // Path to the directory containing website content

  @Column("simple-array", { nullable: true })
  serverAliases?: string[]; // Optional array of alternative domain names
}
