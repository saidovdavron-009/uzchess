import { ApiOkResponse } from '@nestjs/swagger';
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MatchesPublicService } from '../../services/matches/matches.public.service';
import { MatchListPublicDto } from '../../dtos/matches/public/match.list.public.dto';
import { PaginationFilters } from '../../filters/pagination.filter';

@Controller('public/matches')
export class MatchesPublicController {
  constructor(private readonly service: MatchesPublicService) {}

  @Get()
  @ApiOkResponse({type: ()=> MatchListPublicDto})
  async getAll(@Query() filters : PaginationFilters){
    return await this.service.getAll(filters);
  }

  @Get(':id')
  @ApiOkResponse({type: () => MatchListPublicDto})
  async getOne(@Param('id', ParseIntPipe) id: number){
    return await this.service.getOne(id)
  }
}