import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { SouvenirColor } from './souvenirColor.entity';

@Entity('color')
export class Colors extends BaseModel{
  @Column({type : 'varchar',length : 128})
  title! : string

  @Column({type : 'varchar',length : 10})
  color! : string

  @OneToMany(() => SouvenirColor,(souvenirColor) => souvenirColor.colors)
  souvenirColor! : SouvenirColor[]
}