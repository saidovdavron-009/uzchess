import { Injectable } from '@nestjs/common';
import { Colors } from '../entities/colors.entity';
import { plainToInstance } from 'class-transformer';
import { ColorsListPublicDto } from '../dtos/colors/public/colors.list.public.dto';

@Injectable()
export class ColorsPublicService {
  async getAll() {
    const colors = await Colors.find();
    return plainToInstance(ColorsListPublicDto, colors, { excludeExtraneousValues: true });
  }
}
