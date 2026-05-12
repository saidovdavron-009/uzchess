import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { LanguagePublicService } from '../../services/languages/language.public.service';
import { LanguageListPublicDto } from '../../dtos/languages/public/language.list.public.dto';
import { PaginationFilters } from '../../filters/pagination.filter';

@Controller('public/language')
export class LanguagePublicController {

  constructor(private service : LanguagePublicService) {
  }

  @Get()
  @ApiOkResponse({ type: () => LanguageListPublicDto, isArray: true })
  async getAll(@Query() filters : PaginationFilters) {
    return await this.service.getAll(filters)
  }

  @Get(':id')
  async getOne(@Param('id',ParseIntPipe) id: number) {
    return await this.service.getOne(id)
  }
}