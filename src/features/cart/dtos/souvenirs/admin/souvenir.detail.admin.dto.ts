import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class SouvenirImageDetailAdminDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  image!: string;
}

export class SouvenirColorsDetailAdminDto {
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

export class SouvenirColorDetailAdminDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty({ type: () => SouvenirColorsDetailAdminDto })
  @Type(() => SouvenirColorsDetailAdminDto)
  colors!: SouvenirColorsDetailAdminDto;
}

export class SouvenirDetailAdminDto {
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
  @ApiProperty({ type: () => SouvenirImageDetailAdminDto, isArray: true })
  @Type(() => SouvenirImageDetailAdminDto)
  souvenirImage!: SouvenirImageDetailAdminDto[];

  @Expose()
  @ApiProperty({ type: () => SouvenirColorDetailAdminDto, isArray: true })
  @Type(() => SouvenirColorDetailAdminDto)
  souvenirColor!: SouvenirColorDetailAdminDto[];

  @Expose()
  @ApiProperty()
  createdAt!: string;

  @Expose()
  @ApiProperty()
  updatedAt!: string;
}
