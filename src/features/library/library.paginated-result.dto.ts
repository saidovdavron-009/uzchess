import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BookListPublicDto } from './dtos/book/public/book.list.public.dto';

export class LibraryPaginatedResultDto {
  @Expose()
  @ApiProperty()
  totalPages!: number

  @Expose()
  @ApiProperty()
  currentPages!: number

  @Expose()
  @ApiProperty()
  nextPage?: number

  @Expose()
  @ApiProperty()
  totalCount!: number

  @Expose()
  @ApiProperty({type : () => BookListPublicDto, isArray : true})
  @Type(() => BookListPublicDto)
  data! : BookListPublicDto[]
}