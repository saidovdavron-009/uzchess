import { Allow, IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';


export class CourseLessonCreateAdminDto {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  courseId!: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  difficultyId!: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  courseSectionId!: number;

  @IsString()
  @ApiProperty()
  title!: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  content?: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  thumbnail?: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  video!: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty()
  order?: number;

  @IsDateString()
  @ApiProperty()
  date!: string;

  @IsBoolean()
  @Type(() => Boolean)
  @ApiProperty()
  isFree!: boolean;
}