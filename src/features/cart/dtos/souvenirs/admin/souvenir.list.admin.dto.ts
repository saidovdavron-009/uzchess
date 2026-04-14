import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class SouvenirImageAdminDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  image!: string;
}

export class SouvenirListAdminDto {
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
  @ApiProperty({ type: () => SouvenirImageAdminDto, isArray: true })
  @Type(() => SouvenirImageAdminDto)
  souvenirImage!: SouvenirImageAdminDto[];

  @Expose()
  @ApiProperty()
  createdAt!: string;
}
