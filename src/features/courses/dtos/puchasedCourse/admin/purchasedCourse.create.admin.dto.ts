import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class PurchasedCourseCreateAdminDto{
  @ApiProperty()
  @IsNumber()
  userId!: number;

  @ApiProperty()
  @IsNumber()
  courseId!: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isCompleted!: boolean;

  @ApiProperty()
  @IsDateString()
  date!: string;
}