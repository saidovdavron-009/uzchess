import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { Report } from './report.entity';

@Entity('reportCategories')
export class ReportCategory extends BaseModel {
  @Column({ length: 64, unique: true })
  title!: string;

  @Column({ nullable: true })
  order?: number;

  @OneToMany(() => Report,(report) => report.category)
  reports? : Report []
}