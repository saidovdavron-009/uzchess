import { PaginationFilters } from '../../common/filters/pagination.filter';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewsFilter extends PaginationFilters{
  @IsOptional()
  @IsString()
  @ApiProperty({required : false})
  search?: string
}