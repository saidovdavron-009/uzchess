import { Controller, Get, Param, ParseIntPipe, Query, Req, UseFilters } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SouvenirPublicService } from '../../services/souvenir.public.service';
import {
  SouvenirDetailPublicDto,
  SouvenirImageDetailPublicDto,
} from '../../dtos/souvenirs/public/souvenir.detail.public.dto';
import { SouvenirListPublicDto, SouvenirImagePublicDto } from '../../dtos/souvenirs/public/souvenir.list.public.dto';
import { SouvenirPaginatedResultDto } from '../../souvenir.paginated-result.dto';
import { SouvenirFilter } from '../../filters/souvenir.filter';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import { getFullPath } from '../../../../core/utils/pathHelper';
import type { Request } from 'express';

@ApiTags('Souvenir - Public')
@Controller('public/souvenir')
@UseFilters(GlobalFilters)
export class SouvenirPublicController {
  constructor(private readonly service: SouvenirPublicService) {}

  @Get()
  @ApiOkResponse({ type: () => SouvenirPaginatedResultDto })
  async getAll(@Req() req: Request, @Query() filters: SouvenirFilter) {
    const result = await this.service.getAll(filters);
    result.data.forEach((item: SouvenirListPublicDto) => {
      item.souvenirImage?.forEach((img: SouvenirImagePublicDto) => {
        img.image = getFullPath(req, img.image) as string;
      });
    });
    return result;
  }

  @Get(':id')
  @ApiOkResponse({ type: () => SouvenirDetailPublicDto })
  async getOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const souvenir = await this.service.getOne(id);
    for (const img of (souvenir.souvenirImage ?? []) as SouvenirImageDetailPublicDto[]) {
      img.image = getFullPath(req, img.image) as string;
    }
    return souvenir;
  }
}