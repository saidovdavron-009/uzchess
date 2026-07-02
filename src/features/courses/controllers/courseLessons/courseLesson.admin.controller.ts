import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CourseLessonAdminService } from '../../services/courseLessons/courseLesson.admin.service';
import { CourseLessonCreateAdminDto } from '../../dtos/courseLessons/admin/courseLesson.create.admin.dto';
import { ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { CourseLessonListAdminDto } from '../../dtos/courseLessons/admin/courseLesson.list.admin.dto';
import { CourseLessonUpdateAdminDto } from '../../dtos/courseLessons/admin/courseLesson.update.admin.dto';
import { CourseLessonDetailAdminDto } from '../../dtos/courseLessons/admin/courseLesson.detail.admin.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../../config/multer.config';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Controller('admin/courseLesson')
export class CourseLessonAdminController {

  constructor(private service: CourseLessonAdminService) {
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
      ],
      {
        storage: storageOptions,
        limits: { fileSize: 500 * 1024 * 1024 },
      },
    ),
  )
  async create(
    @Body() payload: CourseLessonCreateAdminDto,
    @UploadedFiles()
    files: {video: Express.Multer.File[], thumbnail: Express.Multer.File[]},
  ) {
    const video = files.video?.[0];
    const thumbnail = files.thumbnail?.[0];

    if (!video) {
      throw new BadRequestException('Video fayli majburiy');
    }

    return await this.service.create(payload,video, thumbnail);
  }

  @Get()
  @ApiOkResponse({ type: () => CourseLessonListAdminDto, isArray: true })
  async getAll(@Query() filters: PaginationFilters) {
    return await this.service.getAll(filters);
  }

  @Get(':id')
  @ApiOkResponse({ type: () => CourseLessonDetailAdminDto })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'thumbnail', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      {
        storage: storageOptions,
        limits: { fileSize: 500 * 1024 * 1024 },
      },
    ),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CourseLessonUpdateAdminDto,
    @UploadedFiles()
    files: { thumbnail: Express.Multer.File[]; video: Express.Multer.File[] },
  ) {
    return await this.service.update(
      id,
      payload,
      files.thumbnail?.[0],
      files.video?.[0],
    );
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.service.delete(id);
  }
}