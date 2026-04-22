import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CourseReviewsListPublicDto } from '../../dtos/courseReviews/public/courseReviews.list.public.dto';
import { CourseReviewsRepository } from '../../repository/courseReviews.repository';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Injectable()
export class CourseReviewPublicService {
  constructor(private readonly repo: CourseReviewsRepository) {}

  async getAll(filters: PaginationFilters) {
    const items = await this.repo.getAll(filters)
    items.data = plainToInstance(CourseReviewsListPublicDto, items.data, { excludeExtraneousValues: true });
    return items
  }

  async getOne(id: number) {
    const item = await this.repo.getOneById(id);
    if (!item) {
      throw new NotFoundException('CourseReview with given id not found');
    }
    return item;
  }
}
