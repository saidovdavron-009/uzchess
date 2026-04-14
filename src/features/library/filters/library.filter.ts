import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class LibraryFilter {
  @IsString()
  @IsOptional()
  @ApiProperty({required : false})
  search? : string

  @IsInt()
  @IsOptional()
  @ApiProperty({required : false})
  @Type(() => Number)
  page?: number

  @IsInt()
  @IsOptional()
  @ApiProperty({required : false})
  @Type(() => Number)
  size?: number
}