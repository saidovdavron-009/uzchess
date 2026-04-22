import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CourseCategoryListPublicDto } from '../../dtos/courseCategories/public/courseCategory.list.public.dto';
import { CourseCategoryRepository } from '../../repository/courseCategory.repository';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Injectable()
export class CourseCategoryPublicService{
  constructor(private readonly repo: CourseCategoryRepository) {}

  async getAll(filters: PaginationFilters){
    const courseCategory = await this.repo.getAll(filters)
    courseCategory.data = plainToInstance(CourseCategoryListPublicDto,courseCategory.data,{excludeExtraneousValues : true})
    return courseCategory
  }

  async getOne(id : number){
    const courseCategory = await this.repo.getOneById(id);
    if(!courseCategory){
      throw new NotFoundException('courseCategory with given id not found')
    }
    return courseCategory
  }
}
