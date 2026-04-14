import { IsEnum, IsInt, IsOptional, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CartItemType } from '../../../../../core/enum/enum';

export class CartItemCreatePublicDto {
  @IsEnum(CartItemType)
  @ApiProperty({ enum: CartItemType })
  target!: CartItemType;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty()
  targetId!: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: false, default: 1 })
  quantity?: number;
}
