import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationFilters } from '../../common/filters/pagination.filter';

export class SouvenirFilter extends PaginationFilters {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  search?: number;
}