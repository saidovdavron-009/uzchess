import { Injectable, NotFoundException } from '@nestjs/common';
import { PurchasedCourseCreateAdminDto } from '../../dtos/puchasedCourse/admin/purchasedCourse.create.admin.dto';
import { PurchasedCourse } from '../../entities/purchasedCourse.entity';
import { plainToInstance } from 'class-transformer';
import { PurchasedCourseListAdminDto } from '../../dtos/puchasedCourse/admin/purchasedCourse.list.admin.dto';
import { PurchasedCoursesUpdateAdminDto } from '../../dtos/puchasedCourse/admin/purchasedCourse.update.admin.dto';
import { PurchasedCourseRepository } from '../../repository/purchasedCourse.repository';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Injectable()
export class PurchasedCourseAdminService{
  constructor(private readonly repo: PurchasedCourseRepository) {}

  async create(payload : PurchasedCourseCreateAdminDto){
    const purchasedCourse = {...payload} as PurchasedCourse
    return await this.repo.save(purchasedCourse)
  }

  async getAll(filters: PaginationFilters){
    const purchasedCourse = await this.repo.getAll(filters)
    purchasedCourse.data = plainToInstance(PurchasedCourseListAdminDto,purchasedCourse.data,{excludeExtraneousValues :true})
    return purchasedCourse
  }

  async getOne(id : number){
    const purchasedCourse = await this.repo.getOneById(id);
    if(!purchasedCourse){
      throw new NotFoundException('purchaseCourse with given id not found')
    }

    return purchasedCourse
  }

  async update(id : number,payload : PurchasedCoursesUpdateAdminDto){
    const purchasedCourse = await this.repo.getOneById(id);
    if(!purchasedCourse){
      throw new NotFoundException('purchaseCourse with given id not found')
    }
    Object.assign(
      purchasedCourse,
      Object.fromEntries(
        Object.entries(payload).filter(([key,value]) => value)
      )
    )
    await this.repo.save(purchasedCourse)
    return purchasedCourse
  }

  async delete(id : number){
    const purchasedCourse = await this.repo.getOneById(id);
    if(!purchasedCourse){
      throw new NotFoundException('purchaseCourse with given id not found')
    }

    await this.repo.delete(purchasedCourse)
  }
}
