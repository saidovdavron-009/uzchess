import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SouvenirReviewsPublicService } from '../../services/souvenirReviews.public.service';
import { SouvenirReviewsCreatePublicDto } from '../../dtos/souvenirReviews/public/souvenirReviews.create.public.dto';
import { SouvenirReviewsListPublicDto } from '../../dtos/souvenirReviews/public/souvenirReviews.list.public.dto';
import { AuthenticationGuard } from '../../../../core/guard/authentication.guard';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enum/enum';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import type { Request } from 'express';

@ApiTags('SouvenirReviews - Public')
@Controller('public/souvenir-reviews')
@UseFilters(GlobalFilters)
export class SouvenirReviewsPublicController {
  constructor(private readonly service: SouvenirReviewsPublicService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Roles(Role.USER, Role.ADMIN, Role.SUPER_ADMIN)
  async create(@Req() req: Request, @Body() payload: SouvenirReviewsCreatePublicDto) {
    // @ts-ignore
    return await this.service.create(payload, req.user.id as number);
  }

  @Get(':souvenirId')
  @ApiOkResponse({ type: () => SouvenirReviewsListPublicDto, isArray: true })
  async getAllBySouvenir(@Param('souvenirId', ParseIntPipe) souvenirId: number) {
    return await this.service.getAllBySouvenir(souvenirId);
  }
}
