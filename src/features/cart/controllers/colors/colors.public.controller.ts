import { Controller, Get, UseFilters } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ColorsPublicService } from '../../services/colors.public.service';
import { ColorsListPublicDto } from '../../dtos/colors/public/colors.list.public.dto';
import { GlobalFilters } from '../../../../core/filters/global.filters';

@ApiTags('Colors - Public')
@Controller('public/colors')
@UseFilters(GlobalFilters)
export class ColorsPublicController {
  constructor(private readonly service: ColorsPublicService) {}

  @Get()
  @ApiOkResponse({ type: () => ColorsListPublicDto, isArray: true })
  async getAll() {
    return await this.service.getAll();
  }
}
