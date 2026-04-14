import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '../../../core/base-model';
import { SouvenirImages } from './souvenirImages.entity';
import { SouvenirReviews } from './souvenirReviews.entity';
import { SouvenirColor } from './souvenirColor.entity';

@Entity('souvenirs')
export class Souvenir extends BaseModel{
  @Column({type :  'varchar', length : 128})
  title! : string

  @Column({type : 'text'})
  description! : string

  @Column({type : 'decimal'})
  price! : number

  @OneToMany(() => SouvenirImages,(souvenirImage) => souvenirImage.souvenir)
  souvenirImage! : SouvenirImages[]

  @OneToMany(() => SouvenirReviews,(souvenirReviews) => souvenirReviews.souvenir)
  souvenirReviews! : SouvenirReviews[]

  @OneToMany(() => SouvenirColor,(souvenirColor) => souvenirColor.souvenir)
  souvenirColor!: SouvenirColor[]
}