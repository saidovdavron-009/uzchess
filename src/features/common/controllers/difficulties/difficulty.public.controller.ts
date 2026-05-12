import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { DifficultyPublicService } from '../../services/difficulties/difficulty.public.service';
import { DifficultyListPublicDto } from '../../dtos/difficulties/public/difficulty.list.public.dto';
import { PaginationFilters } from '../../filters/pagination.filter';

@Controller('public/difficulty')
export class DifficultyPublicController{
  constructor(private service : DifficultyPublicService) {
  }
  @Get()
  @ApiOkResponse({type : () => DifficultyListPublicDto,isArray:true})
  async getAll(@Query() filters : PaginationFilters){
    return await this.service.getAll(filters)
  }

  @Get(':id')
  @ApiOkResponse({type : () => DifficultyListPublicDto})
  async getOne(@Param('id',ParseIntPipe)id : number){
    return await this.service.getOne(id)
  }
}