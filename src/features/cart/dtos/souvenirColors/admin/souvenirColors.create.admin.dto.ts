import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SouvenirColorsCreateAdminDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty()
  souvenirId!: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty()
  colorId!: number;
}
