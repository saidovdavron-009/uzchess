import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { CourseCategory } from '../entities/courseCategory.entity';

@Injectable()
export class CourseCategoryRepository extends BaseRepository<CourseCategory>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(CourseCategory)
    protected readonly repo: Repository<CourseCategory>
  ) {
    super();
  }
}