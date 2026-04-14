import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Course } from '../../entities/course.entity';
import { CourseListPublicDto } from '../../dtos/courses/public/course.list.public.dto';
import { CourseFilter } from '../../filters/course.filter';
import { FindOptionsWhere, ILike } from 'typeorm';
import { CoursePaginatedResultDto } from '../../course.paginated-result.dto';

@Injectable()
export class CoursePublicService{
  async getAll(filters : CourseFilter){
    let whereOptions: FindOptionsWhere<Course> = {}
    const take = filters.size ?? Number(process.env.DEFAULT_SIZE)
    const currentPages = filters.page ?? Number(process.env.DEFAULT_PAGE)
    const skip = (currentPages - 1) * take

    if(filters.search){
      whereOptions.title = ILike(`%${filters.search}%`)
    }

    const totalCount = await Course.countBy(whereOptions)
    const totalPages = Math.ceil(totalCount / take)
    const nextPage = currentPages < totalPages ? currentPages + 1 : null
    const course = await Course.find({where: whereOptions,skip: skip,take: take})
    const data = plainToInstance(CourseListPublicDto,course, { excludeExtraneousValues : true})
    return {totalPages,currentPages,nextPage,totalCount,data} as CoursePaginatedResultDto
  }
  
  async getOne(id : number){
    const course = await Course.findOneBy({ id });
    if(!course){
      throw new NotFoundException('course with given id not found')
    }

    return course
  }
}