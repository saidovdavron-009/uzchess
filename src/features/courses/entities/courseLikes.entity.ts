import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/module/base-model';
import { User } from '../../auth/entities/users.entity';
import { Course } from './course.entity';

@Entity('courseLikes')
export class CourseLike extends BaseModel {
  @Column()
  userId! : number

  @Column()
  courseId! : number

  @Column({ type: 'timestamp' })
  date!: Date;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Course)
  course!: Course;
}