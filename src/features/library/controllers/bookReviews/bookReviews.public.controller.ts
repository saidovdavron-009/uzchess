import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { BookReviewsPublicService } from '../../services/bookReviews/bookReviews.public.service';
import { BookReviewsListPublicDto } from '../../dtos/bookReviews/public/bookReviews.list.public.dto';
import { BookReviewsDetailPublicDto } from '../../dtos/bookReviews/public/bookReviews.detail.public.dto';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Controller('public/bookReviews')
export class BookReviewsPublicController{

  constructor(private service : BookReviewsPublicService) {
  }
  @Get()
  @ApiOkResponse({type : () => BookReviewsListPublicDto,isArray : true})
  async getAll(@Query() filters : PaginationFilters){
    return await this.service.getAll(filters)
  }

  @Get(':id')
  @ApiOkResponse({type : () => BookReviewsDetailPublicDto})
  async getOne(@Param('id' , ParseIntPipe) id : number){
    return await this.service.getOne(id)
  }
}