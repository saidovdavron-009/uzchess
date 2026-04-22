import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { SouvenirFilter } from '../filters/souvenir.filter';
import { CartItem } from '../entities/cartItem.entity';
import { CartItemCreatePublicDto } from '../dtos/cartItems/public/cartItem.create.public.dto';
import { CartItemType } from '../../../core/enum/enum';

@Injectable()
export class CartItemRepository extends BaseRepository<CartItem>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(CartItem)
    protected readonly repo: Repository<CartItem>
  ) {
    super();
  }

  async getOneByUserId(id:number,userId:number){
    return await this.repo.findOneBy({ id, userId });
  }


  async getOneByAdd(userId: number, target: CartItemType, targetId: number){
    return await this.repo.findOneBy({
      userId : userId,
      target : target,
      targetId : targetId
    });
  }
}