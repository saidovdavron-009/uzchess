import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseSection } from '../../entities/courseSection.entity';
import { plainToInstance } from 'class-transformer';
import { CourseSectionListAdminDto } from '../../dtos/courseSection/admin/courseSection.list.admin.dto';
import { CourseSectionUpdateAdminDto } from '../../dtos/courseSection/admin/courseSection.update.admin.dto';
import { CourseSectionCreateAdminDto } from '../../dtos/courseSection/admin/courseSection.create.admin.dto';
import { CourseSectionRepository } from '../../repository/courseSection.repository';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Injectable()
export class CourseSectionAdminService{
  constructor(private readonly repo: CourseSectionRepository) {}

  async getAll(filters: PaginationFilters){
    const courseSection = await this.repo.getAll(filters)
    courseSection.data = plainToInstance(CourseSectionListAdminDto,courseSection.data,{excludeExtraneousValues : true})
    return courseSection
  }

  async getOne(id : number){
    const courseSection = await this.repo.getOneById(id);
    if(!courseSection){
      throw new NotFoundException('courseSection with given id not found')
    }

    return courseSection
  }

  async create(payload : CourseSectionCreateAdminDto){
    const courseSection = {...payload} as CourseSection
    return await this.repo.save(courseSection)
  }

  async update(id : number,payload :CourseSectionUpdateAdminDto){
    const courseSection = await this.repo.getOneById(id);
    if(!courseSection){
      throw new NotFoundException('courseSection with given id not found')
    }
    Object.assign(
      courseSection,
      Object.fromEntries(
        Object.entries(payload).filter(([key,value]) => value)
      )
    )
    await this.repo.save(courseSection)
    return courseSection
  }

  async delete(id : number){
    const courseSection = await this.repo.getOneById(id);
    if(!courseSection){
      throw new NotFoundException('courseSection with given id not found')
    }

    await this.repo.delete(courseSection)
  }
}
