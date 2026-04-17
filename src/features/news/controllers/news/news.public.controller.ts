import { Controller, Get, Param, ParseIntPipe, Query, Req, UseFilters } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { NewsPublicService } from '../../services/news/news.public.service';
import { NewsDetailPublicDto } from '../../dtos/news/public/news.detail.public.dto';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import type{Request} from 'express';
import { getFullPath } from '../../../../core/utils/pathHelper';
import { PaginationResult } from '../../../common/dtos/pagination-result';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Controller('public/news')
@UseFilters(GlobalFilters)
export class NewsPublicController {

  constructor(private service : NewsPublicService) {
  }

  @Get()
  @ApiOkResponse({type : () => PaginationResult, isArray : true})
  async getAll(@Req() req: Request, @Query() filters : PaginationFilters)  {
    const result = await this.service.getAll(filters)
    // @ts-ignore
    result.data.forEach((item) => (item.image = getFullPath(req,item.image)))
    return result
  }

  @Get(':id')
  @ApiOkResponse({type : () => NewsDetailPublicDto})
  async getOne(@Param('id',ParseIntPipe) id: number){
    return await this.service.getOne(id)
  }
}