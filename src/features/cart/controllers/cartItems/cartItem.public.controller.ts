import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CartItemPublicService } from '../../services/cartItem.public.service';
import { CartItemCreatePublicDto } from '../../dtos/cartItems/public/cartItem.create.public.dto';
import { CartItemUpdatePublicDto } from '../../dtos/cartItems/public/cartItem.update.public.dto';
import { CartItemListPublicDto } from '../../dtos/cartItems/public/cartItem.list.public.dto';
import { AuthenticationGuard } from '../../../../core/guard/authentication.guard';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enum/enum';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import type { Request } from 'express';

@ApiTags('Cart - Public')
@ApiBearerAuth()
@Controller('public/cart')
@UseGuards(AuthenticationGuard)
@Roles(Role.USER, Role.ADMIN, Role.SUPER_ADMIN)
@UseFilters(GlobalFilters)
export class CartItemPublicController {
  constructor(private readonly service: CartItemPublicService) {}

  @Post()
  async addToCart(@Req() req: Request, @Body() payload: CartItemCreatePublicDto) {
    // @ts-ignore
    return await this.service.addToCart(payload, req.user.id as number);
  }

  @Get()
  @ApiOkResponse({ type: () => CartItemListPublicDto, isArray: true })
  async getCart(@Req() req: Request) {
    // @ts-ignore
    return await this.service.getCart(req.user.id as number);
  }

  @Patch(':id')
  async updateQuantity(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CartItemUpdatePublicDto,
  ) {
    // @ts-ignore
    return await this.service.updateQuantity(id, req.user.id as number, payload);
  }

  @Delete(':id')
  async removeFromCart(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    // @ts-ignore
    return await this.service.removeFromCart(id, req.user.id as number);
  }
}
