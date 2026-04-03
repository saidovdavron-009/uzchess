import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { LanguageListAdminDto } from '../../../../common/dtos/languages/admin/language.list.admin.dto';
import { DifficultyListAdminDto } from '../../../../common/dtos/difficulties/admin/difficulty.list.admin.dto';
import { BookCategoryListAdminDto } from '../../bookCategories/admin/bookCategory.list.admin.dto';
import { AuthorListAdminDto } from '../../../../common/dtos/author/admin/author.list.admin.dto';

export class BookListAdminDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose({name : 'author'})
  @ApiProperty()
  @Type(() => AuthorListAdminDto)
  authorId!: AuthorListAdminDto;

  @Expose({name : 'category'})
  @ApiProperty()
  @Type(() => BookCategoryListAdminDto)
  categoryId!: BookCategoryListAdminDto;

  @Expose({name : 'language'})
  @ApiProperty()
  @Type(() => LanguageListAdminDto)
  languageId!: LanguageListAdminDto;

  @Expose({name : 'difficulty'})
  @ApiProperty()
  @Type(() => DifficultyListAdminDto)
  difficultyId!: DifficultyListAdminDto;

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
  newPrice!: number;

  @Expose()
  @ApiProperty()
  rating!: number;

  @Expose()
  @ApiProperty()
  reviewCount!: number;

  @Expose()
  @ApiProperty()
  pages!: number;

  @Expose()
  @ApiProperty()
  pubDate!: string;

  @Expose()
  @ApiProperty()
  isLike! : boolean
}