import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ColorsAdminService } from '../../services/colors.admin.service';
import { ColorsCreateAdminDto } from '../../dtos/colors/admin/colors.create.admin.dto';
import { ColorsUpdateAdminDto } from '../../dtos/colors/admin/colors.update.admin.dto';
import { ColorsListAdminDto } from '../../dtos/colors/admin/colors.list.admin.dto';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import { AuthenticationGuard } from '../../../../core/guard/authentication.guard';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enum/enum';

@ApiTags('Colors - Admin')
@ApiBearerAuth()
@Controller('admin/colors')
@UseGuards(AuthenticationGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@UseFilters(GlobalFilters)
export class ColorsAdminController {
  constructor(private readonly service: ColorsAdminService) {}

  @Post()
  async create(@Body() payload: ColorsCreateAdminDto) {
    return await this.service.create(payload);
  }

  @Get()
  @ApiOkResponse({ type: () => ColorsListAdminDto, isArray: true })
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: ColorsUpdateAdminDto) {
    return await this.service.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.service.delete(id);
  }
}
