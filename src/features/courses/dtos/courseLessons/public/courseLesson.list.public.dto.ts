import {IsOptional} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class CourseLessonListPublicDto {
  @Expose()
  @ApiProperty()
  id!: number

  @ApiProperty()
  @Expose()
  courseId! : number

  @ApiProperty()1
  @Expose()
  courseSectionId! : number

  @ApiProperty()
  @Expose()
  title! : string

  @ApiProperty()
  @Expose()
  @IsOptional()
  content? : string

  @ApiProperty()
  @Expose()
  @IsOptional()
  thumbnail? : string

  @ApiProperty()
  @Expose()
  video! : string

  @ApiProperty()
  @IsOptional()
  @Expose()
  order? : number

  @ApiProperty()
  @Expose()
  date! : string

  @ApiProperty()
  @Expose()
  isFree! : boolean
}