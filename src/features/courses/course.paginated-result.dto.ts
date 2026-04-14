import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CourseListPublicDto } from './dtos/courses/public/course.list.public.dto';

export class CoursePaginatedResultDto {
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
  @ApiProperty({type : () => CourseListPublicDto, isArray : true})
  @Type(() => CourseListPublicDto)
  data! : CourseListPublicDto[]
}