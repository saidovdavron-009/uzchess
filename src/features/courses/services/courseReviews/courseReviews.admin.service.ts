import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CourseReview } from '../../entities/courseReviews.entity';
import { CourseReviewsListAdminDto } from '../../dtos/courseReviews/admin/courseReviews.list.admin.dto';
import { CourseReviewsCreateAdminDto } from '../../dtos/courseReviews/admin/courseReviews.create.admin.dto';
import { CourseReviewsUpdateAdminDto } from '../../dtos/courseReviews/admin/courseReviews.update.admin.dto';
import { CourseReviewsRepository } from '../../repository/courseReviews.repository';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Injectable()
export class CourseReviewAdminService {
  constructor(private readonly repo: CourseReviewsRepository) {}

  async getAll(filters: PaginationFilters) {
    const items = await this.repo.getAll(filters)
    items.data = plainToInstance(CourseReviewsListAdminDto, items.data, { excludeExtraneousValues: true });
    return items
  }

  async getOne(id: number) {
    const item = await this.repo.getOneById(id);
    if (!item) {
      throw new NotFoundException('CourseReview with given id not found');
    }
    return item;
  }

  async create(payload: CourseReviewsCreateAdminDto) {
    const item = {...payload} as CourseReview
    return await this.repo.save(item)
  }

  async update(id: number, payload: CourseReviewsUpdateAdminDto) {
    const item = await this.repo.getOneById(id);
    if (!item) {
      throw new NotFoundException('CourseReview with given id not found');
    }
    Object.assign(
      item,
      Object.fromEntries(
        Object.entries(payload).filter(([key, value]) => value)
      )
    );
    await this.repo.save(item)
    return item;
  }

  async delete(id: number) {
    const item = await this.repo.getOneById(id);
    if (!item) {
      throw new NotFoundException('CourseReview with given id not found');
    }
    await this.repo.delete(item)
  }
}
