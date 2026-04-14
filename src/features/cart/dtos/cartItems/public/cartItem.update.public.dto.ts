import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CartItemUpdatePublicDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ minimum: 1 })
  quantity!: number;
}
