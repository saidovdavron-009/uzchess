import { Controller, Get, Param, ParseIntPipe, Query, UseFilters } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { BookPublicService } from '../../services/book/book.public.service';
import { BookDetailPublicDto } from '../../dtos/book/public/book.detail.public.dto';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import { PaginationResult } from '../../../common/dtos/pagination-result';
import { PaginationFilters } from '../../../common/filters/pagination.filter';
import { BookListPublicDto } from '../../dtos/book/public/book.list.public.dto';
import { BookFilters } from '../../filters/book.filters';

@Controller('public/book')
@UseFilters(GlobalFilters)
export class BookPublicController{

  constructor(private service : BookPublicService) {
  }
  @Get()
  @ApiOkResponse({type : () => BookListPublicDto,isArray:true})
  async getAll(@Query()filters : BookFilters){
    return await this.service.getAll(filters)
  }

  @Get(':id')
  @ApiOkResponse({type : () => BookDetailPublicDto})
  async getOne(@Param('id',ParseIntPipe) id : number){
    return await this.service.getOne(id)
  }
}