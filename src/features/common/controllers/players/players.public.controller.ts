import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger'
import { PlayersListPublicDto } from '../../dtos/players/public/players.list.public.dto';
import { PlayersPublicService } from '../../services/players/players.public.service';
import { PlayersDetailPublicDto } from '../../dtos/players/public/players.detail.public.dto';
import { PaginationFilters } from '../../filters/pagination.filter';

@Controller('public/player')
export class PlayersPublicController{
  constructor(private service : PlayersPublicService) {
  }
  @Get()
  @ApiOkResponse({type : () => PlayersListPublicDto,isArray : true})
  async  getAll(@Query() filters : PaginationFilters){
    return await this.service.getAll(filters)
  }

  @Get(':id')
  @ApiOkResponse({type : () => PlayersDetailPublicDto})
  async  getOne(@Param('id',ParseIntPipe) id : number){
    return await this.service.getOne(id)
  }
}