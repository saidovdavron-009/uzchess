import { Controller, Param, ParseIntPipe, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SouvenirLikesPublicService } from '../../services/souvenir-likes/souvenirLikes.public.service';
import { AuthenticationGuard } from '../../../../core/guard/authentication.guard';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enum/enum';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import type { Request } from 'express';

@ApiTags('SouvenirLikes - Public')
@ApiBearerAuth()
@Controller('public/souvenir-likes')
@UseGuards(AuthenticationGuard)
@Roles(Role.USER, Role.ADMIN, Role.SUPER_ADMIN)
@UseFilters(GlobalFilters)
export class SouvenirLikesPublicController {
  constructor(private readonly service: SouvenirLikesPublicService) {}

  @Post(':souvenirId')
  async toggleLike(
    @Req() req: Request,
    @Param('souvenirId', ParseIntPipe) souvenirId: number,
  ) {
    // @ts-ignore
    return await this.service.toggleLike(souvenirId, req.user.id as number);
  }
}
