import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { NewsViewsListPublicDto } from '../../dtos/newsViews/public/newsViews.list.public.dto';
import { NewsViewsPublicService } from '../../../application/services/newsViews/newsViews.public.service';
import { PaginationFilters } from '../../../../common/filters/pagination.filter';

@Controller('public/newsViews')
export class NewsViewsPublicController{

  constructor(private service : NewsViewsPublicService) {
  }
  @Get()
  @ApiOkResponse({type : () => NewsViewsListPublicDto,isArray : true})
  async getAll(@Query() filters:PaginationFilters){
    return await this.service.getAll(filters)
  }

  @Get(':id')
  @ApiOkResponse({type : () => NewsViewsListPublicDto})
  async getOne(@Param('id' ,ParseIntPipe) id : number){
    return await this.service.getOne(id)
  }
}