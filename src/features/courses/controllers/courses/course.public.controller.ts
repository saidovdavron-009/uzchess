import { Controller, Get, Param, ParseIntPipe, Query, Req, UseFilters } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CoursePublicService } from '../../services/courses/course.public.service';
import { CourseListPublicDto } from '../../dtos/courses/public/course.list.public.dto';
import { CourseDetailPublicDto } from '../../dtos/courses/public/course.detail.public.dto';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import type {Request} from 'express';
import { getFullPath } from '../../../../core/utils/pathHelper';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Controller('public/courses')
@UseFilters(GlobalFilters)
export class CoursePublicController{

  constructor(private service : CoursePublicService) {
  }

  @Get()
  @ApiOkResponse({type : () => CourseListPublicDto,isArray:true})
  async getAll(@Req()req : Request,@Query()filters : PaginationFilters){
    const result =  await this.service.getAll(filters)
    result.data.forEach((item) => (item.image = getFullPath(req,item.image)))
    return result
  }

  @Get(':id')
  @ApiOkResponse({type : () => CourseDetailPublicDto})
  async getOne(@Param('id',ParseIntPipe)id : number){
    return await this.service.getOne(id)
  }
}