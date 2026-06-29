import { Allow, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CourseUpdateAdminDto{
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  authorId? : number

  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  @IsOptional()
  categoryId? : number

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  languageId?:number

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  difficultyId? : number

  @IsString()
  @ApiProperty()
  @IsOptional()
  @MaxLength(128)
  title? : string

  @IsOptional()
  @Allow()
  @ApiProperty({type : 'string' , format : 'binary'})
  image? : string

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty()
  price? : number

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  newPrice? : number

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  reviewsCount? : number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Type(() => Number)
  rating?:number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Type(() => Number)
  sectionsCount? : number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Type(() => Number)
  lessonsCount? : number
}