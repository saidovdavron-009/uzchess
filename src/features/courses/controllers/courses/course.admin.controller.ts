import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CourseAdminService } from '../../services/courses/course.admin.service';
import { ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { CoursesCreateAdminDto } from '../../dtos/courses/admin/course.create.admin.dto';
import { CourseListAdminDto } from '../../dtos/courses/admin/course.list.admin.dto';
import { CourseDetailAdminDto } from '../../dtos/courses/admin/course.detail.admin.dto';
import { CourseUpdateAdminDto } from '../../dtos/courses/admin/course.update.admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../../config/multer.config';

@Controller('admin/courses')
export class CourseAdminController{

  constructor(private service : CourseAdminService) {
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image',{
    storage : storageOptions,limits : {
      fileSize : 1024 * 256
    }
  }))
  async create(@Body() payload : CoursesCreateAdminDto,@UploadedFile() image : Express.Multer.File){
    return await this.service.create(payload,image)
  }

  @Get()
  @ApiOkResponse({type : () => CourseListAdminDto,isArray:true})
  async getAll(){
    return await this.service.getAll()
  }

  @Get(':id')
  @ApiOkResponse({type : () => CourseDetailAdminDto})
  async getOne(@Param('id',ParseIntPipe)id : number){
    return await this.service.getOne(id)
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image',{storage : storageOptions}))
  async update(@Param('id',ParseIntPipe)id : number,@Body() payload : CourseUpdateAdminDto,@UploadedFile() image : Express.Multer.File){
    return await this.service.update(id,payload,image)
  }

  @Delete(':id')
  async delete(@Param('id')id : number ){
    return await this.service.delete(id)
  }
}