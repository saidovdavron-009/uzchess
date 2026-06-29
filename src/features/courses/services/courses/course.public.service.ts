import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CourseListPublicDto } from '../../dtos/courses/public/course.list.public.dto';
import { CourseRepository } from '../../repository/course.repository';
import { CourseFilters } from '../../filters/course.filters';

@Injectable()
export class CoursePublicService {
  constructor(private readonly repo: CourseRepository) {}

  async getAll(filters: CourseFilters) {
    const course = await this.repo.getAll(filters);
    course.data = plainToInstance(CourseListPublicDto, course.data, { excludeExtraneousValues: true });
    return course;
  }

  async getOne(id: number) {
    const course = await this.repo.getOneById(id, ['difficulty']);
    if (!course) {
      throw new NotFoundException('course with given id not found');
    }
    return course
  }
}