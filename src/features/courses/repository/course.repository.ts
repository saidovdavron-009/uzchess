import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { BookFilters } from '../filters/book.filters';
import { Course } from '../entities/course.entity';

@Injectable()
export class CourseRepository extends BaseRepository<Course>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(Course)
    protected readonly repo: Repository<Course>
  ) {
    super();
  }

  public async getAll(filters : BookFilters){
    const whereOptions: FindOptionsWhere<Course> = {}

    if(filters.search){
      whereOptions.title = ILike(`%${filters.search}%`)
    }
    return await super.getAll(filters, whereOptions)
  }
}