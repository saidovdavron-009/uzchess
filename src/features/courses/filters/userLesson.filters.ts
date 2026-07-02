import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginationFilters } from '../../common/filters/pagination.filter';

export class UserLessonFilters extends PaginationFilters {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  userid?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  CourseLessonId?: number;
}