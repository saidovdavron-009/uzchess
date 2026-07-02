import { Controller, Get, Param, ParseIntPipe, Query, UseFilters } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SouvenirPublicService } from '../../services/souvenir/souvenir.public.service';
import { SouvenirDetailPublicDto } from '../../dtos/souvenirs/public/souvenir.detail.public.dto';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import { PaginationResult } from '../../../common/dtos/pagination-result';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@ApiTags('Souvenir - Public')
@Controller('public/souvenir')
@UseFilters(GlobalFilters)
export class SouvenirPublicController {
  constructor(private readonly service: SouvenirPublicService) {}

  @Get()
  @ApiOkResponse({ type: () => PaginationResult })
  async getAll(@Query() filters: PaginationFilters) {
    return await this.service.getAll(filters);
  }

  @Get(':id')
  @ApiOkResponse({ type: () => SouvenirDetailPublicDto })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }
}