import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { User } from '../../auth/entities/users.entity';

@Entity('souvenir-likes')
export class SouvenirLikes extends BaseModel{
  @Column()
  userId! : number

  @ManyToOne(() => User,(user) => user.souvenirLikes)
  user! : User

  @Column()
  souvenirId! : number
}
