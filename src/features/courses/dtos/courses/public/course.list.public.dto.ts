import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { AuthorListPublicDto } from '../../../../common/dtos/author/public/author.list.public.dto';
import { CourseCategoryListPublicDto } from '../../courseCategories/public/courseCategory.list.public.dto';
import { LanguageListPublicDto } from '../../../../common/dtos/languages/public/language.list.public.dto';
import { DifficultyListPublicDto } from '../../../../common/dtos/difficulties/public/difficulty.list.public.dto';

export class CourseListPublicDto {
  @Expose()
  @ApiProperty()
  @Type(() => AuthorListPublicDto)
  author!: AuthorListPublicDto;

  @Expose()
  @ApiProperty()
  @Type(() => CourseCategoryListPublicDto)
  category!: CourseCategoryListPublicDto;

  @Expose()
  @ApiProperty()
  @Type(() => LanguageListPublicDto)
  language!: LanguageListPublicDto;

  @Expose()
  @ApiProperty()
  @Type(() => DifficultyListPublicDto)
  difficulty!: DifficultyListPublicDto;

  @Expose()
  @ApiProperty()
  id: number

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  image!: string;

  @Expose()
  @ApiProperty()
  price!: number;

  @Expose()
  @ApiProperty()
  newPrice?: number;

  @Expose()
  @ApiProperty()
  reviewsCount!: number;

  @Expose()
  @ApiProperty()
  rating?: number;

  @Expose()
  @ApiProperty()
  sectionsCount!: number;

  @Expose()
  @ApiProperty()
  lessonsCount!: number;

  @Expose()
  @ApiProperty()
  isLike: boolean;
}