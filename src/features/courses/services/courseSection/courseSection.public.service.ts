import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CourseSectionListPublicDto } from '../../dtos/courseSection/public/courseSection.list.public.dto';
import { CourseSectionRepository } from '../../repository/courseSection.repository';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Injectable()
export class CourseSectionPublicService{
  constructor(private readonly repo: CourseSectionRepository) {}

  async getAll(filters: PaginationFilters){
    const courseSection = await this.repo.getAll(filters)
    courseSection.data = plainToInstance(CourseSectionListPublicDto,courseSection.data,{excludeExtraneousValues : true})
    return courseSection
  }

  async getOne(id : number){
    const courseSection = await this.repo.getOneById(id);
    if(!courseSection){
      throw new NotFoundException('courseSection with given id not found')
    }

    return courseSection
  }
}
