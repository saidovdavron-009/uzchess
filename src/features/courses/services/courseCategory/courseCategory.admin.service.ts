import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseCategoryListAdminDto } from '../../dtos/courseCategories/admin/courseCategory.list.admin.dto';
import { CourseCategory } from '../../entities/courseCategory.entity';
import { plainToInstance } from 'class-transformer';
import { CourseCategoryCreateAdminDto } from '../../dtos/courseCategories/admin/courseCategory.create.admin.dto';
import { CourseCategoryUpdateAdminDto } from '../../dtos/courseCategories/admin/courseCategory.update.admin.dto';
import { CourseCategoryRepository } from '../../repository/courseCategory.repository';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Injectable()
export class CourseCategoryAdminService{
  constructor(private readonly repo: CourseCategoryRepository) {}

  async create(payload : CourseCategoryCreateAdminDto){
    const courseCategory = {...payload} as CourseCategory
    return await this.repo.save(courseCategory)
  }

  async getAll(filters: PaginationFilters){
    const courseCategory = await this.repo.getAll(filters)
    courseCategory.data = plainToInstance(CourseCategoryListAdminDto,courseCategory.data,{excludeExtraneousValues : true})
    return courseCategory
  }

  async getOne(id : number){
    const courseCategory = await this.repo.getOneById(id);
    if(!courseCategory){
      throw new NotFoundException('courseCategory with given id not found')
    }
    return courseCategory
  }

  async update(id : number,payload : CourseCategoryUpdateAdminDto){
    const courseCategory = await this.repo.getOneById(id);
    if(!courseCategory){
      throw new NotFoundException('courseCategory with given id not found')
    }

    Object.assign(
      courseCategory,
      Object.fromEntries(
        Object.entries(payload).filter(([key,value]) => value)
      )
    )

    await this.repo.save(courseCategory)
    return courseCategory
  }

  async delete(id : number){
    const courseCategory = await this.repo.getOneById(id);
    if(!courseCategory){
      throw new NotFoundException('courseCategory with given id not found')
    }

    await this.repo.delete(courseCategory)
  }
}
