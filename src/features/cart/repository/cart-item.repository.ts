import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { SouvenirFilter } from '../filters/souvenir.filter';
import { CartItem } from '../entities/cartItem.entity';

@Injectable()
export class CartItemRepository extends BaseRepository<CartItem>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(CartItem)
    protected readonly repo: Repository<CartItem>
  ) {
    super();
  }
}