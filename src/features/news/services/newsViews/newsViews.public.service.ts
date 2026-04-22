import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { NewsViewsListPublicDto } from '../../dtos/newsViews/public/newsViews.list.public.dto';
import { NewsViewsRepository } from '../../repository/newsViews/newsViews.repository';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Injectable()
export class NewsViewsPublicService{
  constructor(private readonly repo: NewsViewsRepository) {}

  async getAll(filters: PaginationFilters){
    const newsViews = await this.repo.getAll(filters)
    newsViews.data = plainToInstance(NewsViewsListPublicDto,newsViews.data,{excludeExtraneousValues : true})
    return newsViews
  }

  async getOne(id : number){
    const newsViews = await this.repo.getOneById(id);
    if(!newsViews){
      throw new NotFoundException('newsViews with given id not found')
    }
    return newsViews
  }
}