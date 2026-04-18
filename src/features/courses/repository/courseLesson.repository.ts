import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { CourseLesson } from '../entities/courseLesson.entity';

@Injectable()
export class CourseLikeRepository extends BaseRepository<CourseLesson>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(CourseLesson)
    protected readonly repo: Repository<CourseLesson>
  ) {
    super();
  }
}