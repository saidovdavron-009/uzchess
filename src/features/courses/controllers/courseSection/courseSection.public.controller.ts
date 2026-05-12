import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CourseSectionPublicService } from '../../services/courseSection/courseSection.public.service';
import { CourseCategoryListPublicDto } from '../../dtos/courseCategories/public/courseCategory.list.public.dto';
import { CourseCategoryDetailPublicDto } from '../../dtos/courseCategories/public/courseCategory.detail.public.dto';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Controller('public/courseSection')
export class CourseSectionPublicController{

  constructor(private service : CourseSectionPublicService) {
  }

  @Get()
  @ApiOkResponse({type : () => CourseCategoryListPublicDto,isArray:true})
  async getAll(@Query() filters : PaginationFilters){
    return await this.service.getAll(filters)
  }

  @Get(':id')
  @ApiOkResponse({type : () => CourseCategoryDetailPublicDto})
  async getOne(@Param('id',ParseIntPipe)id : number){
    return await this.service.getOne(id)
  }
}