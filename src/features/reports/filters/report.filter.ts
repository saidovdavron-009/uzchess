import { PaginationFilters } from '../../common/filters/pagination.filter';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReportFilter extends PaginationFilters{
  @IsString()
  @IsOptional()
  @ApiProperty({ required:false })
  search! : string
}