import { Entity, Column, OneToMany} from 'typeorm';
// import { Course } from './courses.entity';
import { BaseModel } from '../../../core/module/base-model';
import { Course } from './course.entity';

@Entity('coursecategories')
export class CourseCategory extends BaseModel {
  @Column({ length: 64, unique: true })
  title!: string;

  @OneToMany(() => Course, (course) => course.category)
  courses!: Course[];
}