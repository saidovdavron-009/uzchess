import { plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsRepository } from '../../../data/repository/news.repository';
import { PaginationFilters } from '../../../../common/filters/pagination.filter';
import { NewsListAdminDto } from '../../../presentation/dtos/news/admin/news.list.admin.dto';
import { INewsRepository } from '../../repository/news.repository.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NewsPublicService {

  constructor(private readonly repo: INewsRepository, private readonly config: ConfigService) {
  }

  async getAll(filters: PaginationFilters) {
    const news = await this.repo.getAll(filters);
    for (let n of news.data) {
      n.image = this.config.getOrThrow('BASE_URL') + '/' + n.image;
    }
    news.data = plainToInstance(NewsListAdminDto, news.data, { excludeExtraneousValues: true });
    return news;
  }

  async getOne(id: number) {
    const news = await this.repo.getOneById(id);
    if (!news) {
      throw new NotFoundException('News with given id not found');
    }
    return news;
  }
}