import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { CourseReview } from '../entities/courseReviews.entity';

@Injectable()
export class CourseReviewsRepository extends BaseRepository<CourseReview>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(CourseReview)
    protected readonly repo: Repository<CourseReview>
  ) {
    super();
  }
}