import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { Colors } from './colors.entity';
import { Souvenir } from './souvenir.entity';

@Entity('souvenirColor')
export class SouvenirColor extends BaseModel{
  @Column()
  souvenirId! : number

  @ManyToOne(() => Souvenir,(souvenir) => souvenir.souvenirColor)
  souvenir! : Souvenir

  @Column()
  colorId! : number

  @ManyToOne(() => Colors,(color) => color.souvenirColor)
  colors! : Colors
}
