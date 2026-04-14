import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SouvenirUpdatePublicDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(128)
  title!: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @ApiProperty()
  price!: number;
}