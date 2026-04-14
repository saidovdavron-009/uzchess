import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SouvenirColorsAdminService } from '../../services/souvenirColors.admin.service';
import { SouvenirColorsCreateAdminDto } from '../../dtos/souvenirColors/admin/souvenirColors.create.admin.dto';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import { AuthenticationGuard } from '../../../../core/guard/authentication.guard';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enum/enum';

@ApiTags('SouvenirColors - Admin')
@ApiBearerAuth()
@Controller('admin/souvenir-colors')
@UseGuards(AuthenticationGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@UseFilters(GlobalFilters)
export class SouvenirColorsAdminController {
  constructor(private readonly service: SouvenirColorsAdminService) {}

  @Post()
  async addColor(@Body() payload: SouvenirColorsCreateAdminDto) {
    return await this.service.addColor(payload);
  }

  @Delete(':id')
  async removeColor(@Param('id', ParseIntPipe) id: number) {
    return await this.service.removeColor(id);
  }
}
