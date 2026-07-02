import { Controller, Get, Param, ParseIntPipe, Query, UseFilters } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CoursePublicService } from '../../services/courses/course.public.service';
import { CourseListPublicDto } from '../../dtos/courses/public/course.list.public.dto';
import { CourseDetailPublicDto } from '../../dtos/courses/public/course.detail.public.dto';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import { PaginationFilters } from '../../../common/filters/pagination.filter';
import { CourseFilters } from '../../filters/course.filters';

@Controller('public/courses')
@UseFilters(GlobalFilters)
export class CoursePublicController {

  constructor(private service: CoursePublicService) {
  }

  @Get()
  @ApiOkResponse({ type: () => CourseListPublicDto, isArray: true })
  async getAll(@Query() filters: CourseFilters) {
    return await this.service.getAll(filters);
  }

  @Get(':id')
  @ApiOkResponse({ type: () => CourseDetailPublicDto })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }
}