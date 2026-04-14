import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SouvenirCreateAdminDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @ApiProperty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description!: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  price!: number;
}
