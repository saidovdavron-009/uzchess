import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class SouvenirImageDetailPublicDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  image!: string;
}

export class SouvenirColorsDetailPublicDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  color!: string;
}

export class SouvenirColorDetailPublicDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty({ type: () => SouvenirColorsDetailPublicDto })
  @Type(() => SouvenirColorsDetailPublicDto)
  colors!: SouvenirColorsDetailPublicDto;
}

export class SouvenirDetailPublicDto {
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
  @ApiProperty({ type: () => SouvenirImageDetailPublicDto, isArray: true })
  @Type(() => SouvenirImageDetailPublicDto)
  souvenirImage!: SouvenirImageDetailPublicDto[];

  @Expose()
  @ApiProperty({ type: () => SouvenirColorDetailPublicDto, isArray: true })
  @Type(() => SouvenirColorDetailPublicDto)
  souvenirColor!: SouvenirColorDetailPublicDto[];

  @Expose()
  @ApiProperty()
  createdAt!: string;

  @Expose()
  @ApiProperty()
  updatedAt!: string;
}
