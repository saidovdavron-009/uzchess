import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CourseReviewPublicService } from '../../services/courseReviews/courseReviews.public.service';
import { CourseReviewsListPublicDto } from '../../dtos/courseReviews/public/courseReviews.list.public.dto';
import { CourseReviewsDetailPublicDto } from '../../dtos/courseReviews/public/courseReviews.detail.public.dto';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Controller('public/courseReviews')
export class CourseReviewPublicController {

  constructor(private service: CourseReviewPublicService) {
  }

  @Get()
  @ApiOkResponse({ type: () => CourseReviewsListPublicDto, isArray: true })
  async getAll(@Query() filters : PaginationFilters) {
    return await this.service.getAll(filters);
  }

  @Get(':id')
  @ApiOkResponse({ type: () => CourseReviewsDetailPublicDto })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }
}