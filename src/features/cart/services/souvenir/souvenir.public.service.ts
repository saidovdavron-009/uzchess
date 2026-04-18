import { Injectable, NotFoundException } from '@nestjs/common';
import { Souvenir } from '../../entities/souvenir.entity';
import { plainToInstance } from 'class-transformer';
import { SouvenirDetailPublicDto } from '../../dtos/souvenirs/public/souvenir.detail.public.dto';
import { PaginationFilters } from '../../../common/filters/pagination.filter';
import { PaginatedResult } from '../../../common/dtos/pagination-result';
import { ConfigService } from '@nestjs/config';
import { SouvenirRepository } from '../../repository/souvenir.repository';
import { SouvenirListPublicDto } from '../../dtos/souvenirs/public/souvenir.list.public.dto';

@Injectable()
export class SouvenirPublicService {

  constructor(private readonly repo: SouvenirRepository) {
  }

  async getAll(filters: PaginationFilters) {
    const souvenir = await this.repo.getAll(filters)
    souvenir.data = plainToInstance(SouvenirListPublicDto,souvenir.data,{excludeExtraneousValues:true})
    return souvenir
  }

  async getOne(id: number) {
    const souvenir = await this.repo.getOneById(id)
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }
    return plainToInstance(SouvenirDetailPublicDto, souvenir, { excludeExtraneousValues: true });
  }
}
