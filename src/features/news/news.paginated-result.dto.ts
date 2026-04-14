import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { NewsListPublicDto } from './dtos/news/public/news.list.public.dto';

export class NewsPaginatedResultDto {
  @Expose()
  @ApiProperty()
  totalPages!: number

  @Expose()
  @ApiProperty()
  currentPage!: number

  @Expose()
  @ApiProperty()
  nextPage?: number

  @Expose()
  @ApiProperty()
  totalCount!: number

  @Expose()
  @ApiProperty({type : () => NewsListPublicDto, isArray : true})
  @Type(() => NewsListPublicDto)
  data! : NewsListPublicDto[]
}