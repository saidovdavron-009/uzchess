import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ColorsUpdateAdminDto {
  @IsString()
  @IsOptional()
  @MaxLength(128)
  @ApiProperty({ required: false })
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  @ApiProperty({ required: false, description: 'Hex color value e.g. #FF0000' })
  color?: string;
}
