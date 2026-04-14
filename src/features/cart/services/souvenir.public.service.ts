import { Injectable, NotFoundException } from '@nestjs/common';
import { Souvenir } from '../entities/souvenir.entity';
import { plainToInstance } from 'class-transformer';
import { SouvenirListPublicDto } from '../dtos/souvenirs/public/souvenir.list.public.dto';
import { SouvenirDetailPublicDto } from '../dtos/souvenirs/public/souvenir.detail.public.dto';
import { SouvenirFilter } from '../filters/souvenir.filter';
import { FindOptionsWhere, ILike } from 'typeorm';
import { SouvenirPaginatedResultDto } from '../souvenir.paginated-result.dto';

@Injectable()
export class SouvenirPublicService {
  async getAll(filters: SouvenirFilter): Promise<SouvenirPaginatedResultDto> {
    const whereOptions: FindOptionsWhere<Souvenir> = {};
    const take = filters.size ?? Number(process.env.DEFAULT_SIZE);
    const currentPage = filters.page ?? Number(process.env.DEFAULT_PAGE);
    const skip = (currentPage - 1) * take;

    if (filters.search) {
      whereOptions.title = ILike(`%${filters.search}%`);
    }

    const totalCount = await Souvenir.countBy(whereOptions);
    const totalPages = Math.ceil(totalCount / take);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    const souvenirs = await Souvenir.find({
      where: whereOptions,
      skip,
      take,
      relations: ['souvenirImage'],
    });

    const data = plainToInstance(SouvenirListPublicDto, souvenirs, {
      excludeExtraneousValues: true,
    });

    return { totalPages, currentPage, nextPage, totalCount, data } as SouvenirPaginatedResultDto;
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
