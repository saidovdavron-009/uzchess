import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ReportCategory } from './reportCategories.entity';
import { BaseModel } from '../../../core/base-model';
import { ReportType } from '../../../core/enum/enum';
import { User } from '../../auth/entities/users.entity';

@Entity('reports')
export class Report extends BaseModel {
  @Column()
  userId! : number

  @Column()
  categoryId! : number

  @Column({ type: 'enum', enum: ReportType })
  target!: ReportType;

  @Column()
  targetId!: number;

  @Column({ length: 256, nullable: true })
  description!: string;

  @ManyToOne(() => ReportCategory,(category) => category.reports)
  @JoinColumn({name : 'categoryId'})
  category!: ReportCategory;

  @ManyToOne(() => User,(user) => user.reports)
  users! : User
}