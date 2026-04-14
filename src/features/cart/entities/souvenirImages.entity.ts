import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { Souvenir } from './souvenir.entity';

@Entity('souvenir-image')
export class SouvenirImages extends BaseModel{
  @Column()
  souvenirId! : number

  @Column()
  image! : string

  @ManyToOne(() => Souvenir,(souvenir) => souvenir.souvenirImage)
  souvenir! : Souvenir
}