import { Allow, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CoursesCreateAdminDto{
  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  authorId! : number

  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  categoryId! : number

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  languageId!:number

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  difficultyId! : number

  @IsString()
  @ApiProperty()
  @MaxLength(128)
  title! : string

  @Allow()
  @ApiProperty({type : 'string' , format : 'binary'})
  image! : string

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  price! : number

  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  newPrice! : number

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  reviewsCount! : number

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  rating?:number

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  sectionsCount! : number

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  lessonsCount!: number
}