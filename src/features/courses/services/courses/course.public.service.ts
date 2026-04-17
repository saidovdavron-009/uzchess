import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from '../../entities/course.entity';
import { PaginationFilters } from '../../../common/filters/pagination.filter';
import { PaginatedResult } from '../../../common/dtos/pagination-result';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoursePublicService{

  constructor(private readonly config : ConfigService) {
  }

  async getAll(filters: PaginationFilters) {
    const take = filters.size ?? this.config.getOrThrow<number>('DEFAULT_SIZE');
    const currentPage = filters.page ?? this.config.getOrThrow<number>('DEFAULT_PAGE');
    const skip = (currentPage - 1) * take;

    const totalCount = await Course.count();
    const totalPages = Math.ceil(totalCount / take);

    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const data = await Course.find({ skip: skip, take: take });

    return { totalCount, totalPages, previousPage, currentPage, nextPage, data } as PaginatedResult;

  }
  
  async getOne(id : number){
    const course = await Course.findOneBy({ id });
    if(!course){
      throw new NotFoundException('course with given id not found')
    }

    return course
  }
}