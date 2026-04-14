import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SouvenirReviewsCreatePublicDto {
  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  souvenirId!: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  @ApiProperty({ minimum: 1, maximum: 5 })
  rating!: number;

  @IsString()
  @IsOptional()
  @MaxLength(512)
  @ApiProperty({ required: false })
  comment?: string;
}
