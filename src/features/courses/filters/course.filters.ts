import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationFilters } from '../../common/filters/pagination.filter';

export class CourseFilters extends PaginationFilters {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  languageId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  categoryId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  difficultyId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  rating?: number;

  @IsString()
  @IsOptional()
  @MinLength(0)
  @ApiProperty({ required: false })
  search?: string;

}