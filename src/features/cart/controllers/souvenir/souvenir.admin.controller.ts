import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SouvenirAdminService } from '../../services/souvenir/souvenir.admin.service';
import { SouvenirCreateAdminDto } from '../../dtos/souvenirs/admin/souvenir.create.admin.dto';
import { SouvenirUpdateAdminDto } from '../../dtos/souvenirs/admin/souvenir.update.admin.dto';
import { SouvenirListAdminDto } from '../../dtos/souvenirs/admin/souvenir.list.admin.dto';
import { SouvenirDetailAdminDto } from '../../dtos/souvenirs/admin/souvenir.detail.admin.dto';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import { AuthenticationGuard } from '../../../../core/guard/authentication.guard';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enum/enum';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@ApiTags('Souvenir - Admin')
@ApiBearerAuth()
@Controller('admin/souvenir')
@UseGuards(AuthenticationGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@UseFilters(GlobalFilters)
export class SouvenirAdminController {
  constructor(private readonly service: SouvenirAdminService) {}

  @Post()
  async create(@Body() payload: SouvenirCreateAdminDto) {
    return await this.service.create(payload);
  }

  @Get()
  @ApiOkResponse({ type: () => SouvenirListAdminDto, isArray: true })
  async getAll(@Query()filters:PaginationFilters) {
    return await this.service.getAll(filters);
  }

  @Get(':id')
  @ApiOkResponse({ type: () => SouvenirDetailAdminDto })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: SouvenirUpdateAdminDto) {
    return await this.service.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.service.delete(id);
  }
}
