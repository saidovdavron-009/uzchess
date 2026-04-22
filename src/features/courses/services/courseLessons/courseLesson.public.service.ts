import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CourseLessonListPublicDto } from '../../dtos/courseLessons/public/courseLesson.list.public.dto';
import { CourseLikeRepository as CourseLessonRepository } from '../../repository/courseLesson.repository';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Injectable()
export class CourseLessonPublicService{
  constructor(private readonly repo: CourseLessonRepository) {}

  async getAll(filters: PaginationFilters){
    const courseLesson = await this.repo.getAll(filters)
    courseLesson.data = plainToInstance(CourseLessonListPublicDto,courseLesson.data,{excludeExtraneousValues : true})
    return courseLesson
  }

  async getOne(id : number){
    const courseLesson = await this.repo.getOneById(id);
    if(!courseLesson){
      throw new NotFoundException('courseLesson with given id not found')
    }
    return courseLesson
  }
}
