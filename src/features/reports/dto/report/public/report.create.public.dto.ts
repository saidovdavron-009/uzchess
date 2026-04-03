import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsDateString, MaxLength } from 'class-validator';
import { ReportType } from '../../../../../core/enum/enum';
import { ApiProperty } from '@nestjs/swagger';

export class ReportCreatePublicDto {
  @IsInt()
  @ApiProperty()
  categoryId: number;

  @IsEnum(ReportType)
  @ApiProperty()
  target: ReportType;

  @IsInt()
  @ApiProperty()
  targetId: number;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  @ApiProperty()
  description?: string;
}