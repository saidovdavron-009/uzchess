import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { CourseSection } from '../entities/courseSection.entity';

@Injectable()
export class CourseSectionRepository extends BaseRepository<CourseSection>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(CourseSection)
    protected readonly repo: Repository<CourseSection>
  ) {
    super();
  }
}