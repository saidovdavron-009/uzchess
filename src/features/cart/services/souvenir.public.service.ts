import { Injectable, NotFoundException } from '@nestjs/common';
import { Souvenir } from '../entities/souvenir.entity';
import { plainToInstance } from 'class-transformer';
import { SouvenirDetailPublicDto } from '../dtos/souvenirs/public/souvenir.detail.public.dto';
import { PaginationFilters } from '../../common/filters/pagination.filter';
import { PaginatedResult } from '../../common/dtos/pagination-result';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SouvenirPublicService {

  constructor(private readonly config : ConfigService) {
  }

  async getAll(filters: PaginationFilters) {
    const take = filters.size ?? this.config.getOrThrow<number>('DEFAULT_SIZE');
    const currentPage = filters.page ?? this.config.getOrThrow<number>('DEFAULT_PAGE');
    const skip = (currentPage - 1) * take;

    const totalCount = await Souvenir.count();
    const totalPages = Math.ceil(totalCount / take);

    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const data = await Souvenir.find({ skip: skip, take: take });

    return { totalCount, totalPages, previousPage, currentPage, nextPage, data } as PaginatedResult;
  }

  async getOne(id: number) {
    const souvenir = await Souvenir.findOne({
      where: { id },
      relations: ['souvenirImage', 'souvenirColor', 'souvenirColor.colors'],
    });
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }
    return plainToInstance(SouvenirDetailPublicDto, souvenir, { excludeExtraneousValues: true });
  }
}
