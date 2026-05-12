import { Entity, Column, ManyToOne } from 'typeorm';
import { News } from './news.entity';
import { BaseModel } from '../../../../core/base-model';
import { User } from '../../../auth/entities/users.entity';

@Entity('newsViews')
export class NewsView extends BaseModel {
  @Column({nullable:true})
  userId!: number

  @Column({nullable : true})
  newsId! : number

  @Column({ type: 'timestamp' })
  firstDate!: string;

  @Column({ type: 'timestamp' })
  lastDate!: string;

  @Column({ default: 1 })
  count!: number;

  @ManyToOne(() => User,{createForeignKeyConstraints : false})
  user?: User;

  @ManyToOne(() => News, {createForeignKeyConstraints : false})
  news?: News;
}