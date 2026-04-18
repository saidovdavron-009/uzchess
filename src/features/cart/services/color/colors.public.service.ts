import { Injectable } from '@nestjs/common';
import { Colors } from '../../entities/colors.entity';
import { plainToInstance } from 'class-transformer';
import { ColorsListPublicDto } from '../../dtos/colors/public/colors.list.public.dto';
import { ColorsRepository } from '../../repository/colors.repository';
import { ColorFilter } from '../../filters/color.filter';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Injectable()
export class ColorsPublicService {

  constructor(private readonly repo: ColorsRepository ){}

  async getAll(filters : PaginationFilters) {
    const colors = await this.repo.getAll(filters)
    return plainToInstance(ColorsListPublicDto, colors, { excludeExtraneousValues: true });
  }
}
