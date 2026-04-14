import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class SouvenirImagePublicDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  image!: string;
}

export class SouvenirListPublicDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  description!: string;

  @Expose()
  @ApiProperty()
  price!: number;

  @Expose()
  @ApiProperty({ type: () => SouvenirImagePublicDto, isArray: true })
  @Type(() => SouvenirImagePublicDto)
  souvenirImage!: SouvenirImagePublicDto[];
}
