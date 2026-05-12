import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { BookCategoryPublicService } from '../../services/bookCategory/bookCategory.public.service';
import { BookCategoryListPublicDto } from '../../dtos/bookCategories/public/bookCategory.list.public.dto';
import { BookCategoryDetailPublicDto } from '../../dtos/bookCategories/public/bookCategory.detail.public.dto';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Controller('public/bookCategory')
export class bookCategoryPublicController {

  constructor(private service : BookCategoryPublicService) {
  }

  @Get()
  @ApiOkResponse({type : () => BookCategoryListPublicDto})
  async getAll(@Query() filters : PaginationFilters){
    return await this.service.getAll(filters)
  }

  @Get(':id')
  @ApiOkResponse({type : () => BookCategoryDetailPublicDto})
  async getOne(@Param('id',ParseIntPipe)id: number){
    return await this.service.getOne(id)
  }
}