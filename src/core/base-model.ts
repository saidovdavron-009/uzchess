import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: 'timestamptz' })

  createdAt!: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: string;
}