import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ColorsCreateAdminDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @ApiProperty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty({ description: 'Hex color value e.g. #FF0000' })
  color!: string;
}
