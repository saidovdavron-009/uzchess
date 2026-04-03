import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsDateString, MaxLength } from 'class-validator';
import { ReportType } from '../../../../../core/enum/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReportCreatePublicDto {
  @Expose()
  @ApiProperty()
  categoryId: number;

  @Expose()
  @ApiProperty()
  target: ReportType;

  @Expose()
  @ApiProperty()
  targetId: number;

  @Expose()
  @IsOptional()
  @ApiProperty()
  description?: string;
}