import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseLessonCreateAdminDto } from '../../dtos/courseLessons/admin/courseLesson.create.admin.dto';
import { CourseLesson } from '../../entities/courseLesson.entity';
import { plainToInstance } from 'class-transformer';
import { CourseLessonListAdminDto } from '../../dtos/courseLessons/admin/courseLesson.list.admin.dto';
import { CourseLessonUpdateAdminDto } from '../../dtos/courseLessons/admin/courseLesson.update.admin.dto';
import { CourseLikeRepository as CourseLessonRepository } from '../../repository/courseLesson.repository';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Injectable()
export class CourseLessonAdminService{
  constructor(private readonly repo: CourseLessonRepository) {}

  async create(payload : CourseLessonCreateAdminDto,video : Express.Multer.File){
    const courseLesson = payload as CourseLesson;
    if(video){
      courseLesson.video= video.path
    }
    return await this.repo.save(courseLesson)
  }

  async getAll(filters: PaginationFilters){
    const courseLesson = await this.repo.getAll(filters)
    courseLesson.data = plainToInstance(CourseLessonListAdminDto,courseLesson.data,{excludeExtraneousValues : true})
    return courseLesson
  }

  async getOne(id : number){
    const courseLesson = await this.repo.getOneById(id);
    if(!courseLesson){
      throw new NotFoundException('courseLesson with given id not found')
    }

    return courseLesson
  }

  async update(id : number,payload : CourseLessonUpdateAdminDto,video : Express.Multer.File){
    const courseLesson = await this.repo.getOneById(id);
    if(!courseLesson){
      throw new NotFoundException('courseLesson with given id not found')
    }

    Object.assign(
      courseLesson,
      Object.fromEntries(
        Object.entries(payload).filter(([key,value]) => value)
      )
    )

    if(video){
      courseLesson.video= video.path
    }

    await this.repo.save(courseLesson)
    return courseLesson
  }

  async delete(id : number){
    const courseLesson = await this.repo.getOneById(id);
    if(!courseLesson){
      throw new NotFoundException('courseLesson with given id not found')
    }

    await this.repo.delete(courseLesson)
  }
}
