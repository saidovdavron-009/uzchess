import { plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsListAdminDto } from '../../dtos/news/admin/news.list.admin.dto';
import { PaginationFilters } from '../../../common/filters/pagination.filter';
import { NewsRepository } from '../../repository/news/news.repository';

@Injectable()
export class NewsPublicService{

  constructor(private readonly repo : NewsRepository) {
  }

  async getAll(filters : PaginationFilters){
    const news = await this.repo.getAll(filters)
    news.data = plainToInstance(NewsListAdminDto,news.data, {excludeExtraneousValues: true})
    return news
  }

  async getOne(id : number){
    const news = await this.repo.getOneById(id)
    if(!news){
      throw new NotFoundException('News with given id not found')
    }
    return news
  }
}