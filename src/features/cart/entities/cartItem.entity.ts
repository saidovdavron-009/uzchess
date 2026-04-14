import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { CartItemType } from '../../../core/enum/enum';
import { User } from '../../auth/entities/users.entity';

@Entity('cart_items')
export class CartItem extends BaseModel {
  @Column()
  userId!: number;

  @Column({ type: 'enum', enum: CartItemType })
  target!: CartItemType;

  @Column()
  targetId!: number;

  @Column({ default: 1 })
  quantity!: number;

  @ManyToOne(() => User)
  user!: User;
}
