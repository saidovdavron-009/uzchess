import { Injectable, NotFoundException } from '@nestjs/common';
import { CartItem } from '../entities/cartItem.entity';
import { plainToInstance } from 'class-transformer';
import { CartItemCreatePublicDto } from '../dtos/cartItems/public/cartItem.create.public.dto';
import { CartItemUpdatePublicDto } from '../dtos/cartItems/public/cartItem.update.public.dto';
import { CartItemListPublicDto } from '../dtos/cartItems/public/cartItem.list.public.dto';

@Injectable()
export class CartItemPublicService {
  async addToCart(payload: CartItemCreatePublicDto, userId: number) {
    const existing = await CartItem.findOneBy({
      userId,
      target: payload.target,
      targetId: payload.targetId,
    });

    if (existing) {
      existing.quantity += payload.quantity ?? 1;
      await CartItem.save(existing);
      return existing;
    }

    const cartItem = CartItem.create({
      ...payload,
      userId,
      quantity: payload.quantity ?? 1,
    } as CartItem);
    await CartItem.save(cartItem);
    return cartItem;
  }

  async getCart(userId: number) {
    const items = await CartItem.findBy({ userId });
    return plainToInstance(CartItemListPublicDto, items, { excludeExtraneousValues: true });
  }

  async updateQuantity(id: number, userId: number, payload: CartItemUpdatePublicDto) {
    const item = await CartItem.findOneBy({ id, userId });
    if (!item) {
      throw new NotFoundException('Cart item with given id not found');
    }
    item.quantity = payload.quantity;
    await CartItem.save(item);
    return item;
  }

  async removeFromCart(id: number, userId: number) {
    const item = await CartItem.findOneBy({ id, userId });
    if (!item) {
      throw new NotFoundException('Cart item with given id not found');
    }
    await CartItem.remove(item);
  }
}
