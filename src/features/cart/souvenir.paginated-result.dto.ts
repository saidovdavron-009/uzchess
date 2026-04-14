import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { SouvenirListPublicDto } from './dtos/souvenirs/public/souvenir.list.public.dto';

export class SouvenirPaginatedResultDto {
  @Expose()
  @ApiProperty()
  totalPages!: number;

  @Expose()
  @ApiProperty()
  currentPage!: number;

  @Expose()
  @ApiProperty()
  nextPage?: number;

  @Expose()
  @ApiProperty()
  totalCount!: number;

  @Expose()
  @ApiProperty({ type: () => SouvenirListPublicDto, isArray: true })
  @Type(() => SouvenirListPublicDto)
  data!: SouvenirListPublicDto[];
}
