import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ColorsPublicService } from '../../services/color/colors.public.service';
import { ColorsListPublicDto } from '../../dtos/colors/public/colors.list.public.dto';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@ApiTags('Colors - Public')
@Controller('public/colors')
@UseFilters(GlobalFilters)
export class ColorsPublicController {
  constructor(private readonly service: ColorsPublicService) {}

  @Get()
  @ApiOkResponse({ type: () => ColorsListPublicDto, isArray: true })
  async getAll(@Query()filters: PaginationFilters) {
    return await this.service.getAll(filters);
  }
}
