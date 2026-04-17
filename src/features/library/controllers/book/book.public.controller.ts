import { Controller, Get, Param, ParseIntPipe, Query, Req, UseFilters } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { BookPublicService } from '../../services/book/book.public.service';
import { BookDetailPublicDto } from '../../dtos/book/public/book.detail.public.dto';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import type {Request} from 'express';
import { getFullPath } from '../../../../core/utils/pathHelper';
import { PaginationResult } from '../../../common/dtos/pagination-result';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Controller('public/book')
@UseFilters(GlobalFilters)
export class BookPublicController{

  constructor(private service : BookPublicService) {
  }
  @Get()
  @ApiOkResponse({type : () => PaginationResult,isArray:true})
  async getAll(@Req() req:Request, @Query()filters : PaginationFilters){
    const result = await this.service.getAll(filters)
    result.data.forEach((item) => (item.image = getFullPath(req,item.image)))
    return result
  }

  @Get(':id')
  @ApiOkResponse({type : () => BookDetailPublicDto})
  async getOne(@Param('id',ParseIntPipe) id : number){
    return await this.service.getOne(id)
  }
}