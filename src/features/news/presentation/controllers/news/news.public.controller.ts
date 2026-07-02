import { Controller, Get, Param, ParseIntPipe, Query, UseFilters } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { NewsDetailPublicDto } from '../../dtos/news/public/news.detail.public.dto';
import { NewsPublicService } from '../../../application/services/news/news.public.service';
import { GlobalFilters } from '../../../../../core/filters/global.filters';
import { PaginationResult } from '../../../../common/dtos/pagination-result';
import { PaginationFilters } from '../../../../common/filters/pagination.filter';
import { NewsListPublicDto } from '../../dtos/news/public/news.list.public.dto';
import { NewsFilter } from '../../filters/news.filter';

@Controller('public/news')
@UseFilters(GlobalFilters)
export class NewsPublicController {

  constructor(private service : NewsPublicService) {
  }

  @Get()
  @ApiOkResponse({type : () => NewsListPublicDto, isArray : true})
  async getAll(@Query() filters : NewsFilter)  {
    return await this.service.getAll(filters)
  }

  @Get(':id')
  @ApiOkResponse({type : () => NewsDetailPublicDto})
  async getOne(@Param('id',ParseIntPipe) id: number){
    return await this.service.getOne(id)
  }
}