import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserLessonAdminService } from '../../services/userLesson/userLesson.admin.service';
import { UserLessonCreateAdminDto } from '../../dtos/userLesson/admin/userLesson.create.admin.dto';
import { UserLessonUpdateAdminDto } from '../../dtos/userLesson/admin/userLesson.update.admin.dto';
import { UserLessonListAdminDto } from '../../dtos/userLesson/admin/userLesson.list.admin.dto';
import { UserLessonDetailAdminDto } from '../../dtos/userLesson/admin/userLesson.detail.admin.dto';
import { UserLessonFilters } from '../../filters/userLesson.filters';

@Controller('admin/userLesson')
export class UserLessonAdminController {

  constructor(private service: UserLessonAdminService) {
  }

  @Post()
  async create(@Body() payload: UserLessonCreateAdminDto) {
    return await this.service.create(payload);
  }

  @Get()
  @ApiOkResponse({ type: () => UserLessonListAdminDto, isArray: true })
  async getAll(@Query() filters: UserLessonFilters) {
    return await this.service.getAll(filters);
  }

  @Get(':id')
  @ApiOkResponse({ type: () => UserLessonDetailAdminDto })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UserLessonUpdateAdminDto) {
    return await this.service.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.service.delete(id);
  }
}