import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import AuthenticationGuard from '../../../../core/guard/authentication.guard';
import { BookLikesPublicService } from '../../services/bookLikes/bookLikes.public.service';
import type {Request} from 'express';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enum/enum';

@ApiTags('BookLike - Public')
@ApiBearerAuth()
@Controller('public/book-like')
@UseGuards(AuthenticationGuard)
@Roles(Role.ADMIN,Role.SUPER_ADMIN)
export class BookLikesPublicController{

  constructor(private readonly service : BookLikesPublicService) {}

  @Post(':bookId')
  async toggleLike(@Req() request : Request, @Param('bookId',ParseIntPipe) id : number){
    // @ts-ignore
    return await this.service.toggleLike(id, request.user.id)
  }
}