import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SouvenirReviewsListPublicDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  userId!: number;

  @Expose()
  @ApiProperty()
  souvenirId!: number;

  @Expose()
  @ApiProperty()
  rating!: number;

  @Expose()
  @ApiProperty()
  comment!: string;

  @Expose()
  @ApiProperty()
  createdAt!: string;
}
