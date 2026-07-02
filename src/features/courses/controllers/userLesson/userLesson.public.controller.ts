import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserLessonPublicService } from '../../services/userLesson/userLesson.public.service';
import { UserLessonListPublicDto } from '../../dtos/userLesson/public/userLesson.list.public.dto';
import { UserLessonDetailPublicDto } from '../../dtos/userLesson/public/userLesson.detail.public.dto';
import { UserLessonFilters } from '../../filters/userLesson.filters';

@Controller('public/userLesson')
export class UserLessonPublicController {

  constructor(private service: UserLessonPublicService) {
  }

  @Get()
  @ApiOkResponse({ type: () => UserLessonListPublicDto, isArray: true })
  async getAll(@Query() filters: UserLessonFilters) {
    return await this.service.getAll(filters);
  }

  @Get(':id')
  @ApiOkResponse({ type: () => UserLessonDetailPublicDto })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }
}