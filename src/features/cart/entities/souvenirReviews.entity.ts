import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { Souvenir } from './souvenir.entity';
import { User } from '../../auth/entities/users.entity';

@Entity('souvenir-review')
export class SouvenirReviews extends BaseModel{
  @Column()
  userId! : number

  @ManyToOne(() => User,(user) => user.souvenirReview)
  user! : User

  @Column()
  souvenirId! : number

  @ManyToOne(() => Souvenir,(souvenir) => souvenir.souvenirReviews)
  souvenir! : Souvenir

  @Column()
  rating! : number

  @Column({ length: 512, nullable: true })
  comment!: string;
}