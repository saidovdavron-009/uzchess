import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PurchasedCourseListPublicDto } from '../../dtos/puchasedCourse/public/purchasedCourse.list.public.dto';
import { PurchasedCourseRepository } from '../../repository/purchasedCourse.repository';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Injectable()
export class PurchasedCoursePublicService{
  constructor(private readonly repo: PurchasedCourseRepository) {}

  async getAll(filters: PaginationFilters){
    const purchasedCourse = await this.repo.getAll(filters)
    purchasedCourse.data = plainToInstance(PurchasedCourseListPublicDto,purchasedCourse.data,{excludeExtraneousValues :true})
    return purchasedCourse
  }

  async getOne(id : number){
    const purchasedCourse = await this.repo.getOneById(id);
    if(!purchasedCourse){
      throw new NotFoundException('purchaseCourse with given id not found')
    }

    return purchasedCourse
  }
}
