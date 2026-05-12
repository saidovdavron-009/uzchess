import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsViewsRepository } from '../../../data/repository/newsViews.repository';
import { NewsViewsCreateAdminDto } from '../../../presentation/dtos/newsViews/admin/newsViews.create.admin.dto';
import { NewsView } from '../../../data/entities/newsViews.entity';
import { PaginationFilters } from '../../../../common/filters/pagination.filter';
import { plainToInstance } from 'class-transformer';
import { NewsViewsListAdminDto } from '../../../presentation/dtos/newsViews/admin/newsViews.list.admin.dto';
import { NewsViewsUpdateAdminDto } from '../../../presentation/dtos/newsViews/admin/newsViews.update.admin.dto';


@Injectable()
export class NewsViewsAdminService{
  constructor(private readonly repo: NewsViewsRepository) {}

  async create(payload : NewsViewsCreateAdminDto){
    const newsViews = {...payload } as NewsView;
    await this.repo.save(newsViews)
    return newsViews
  }

  async getAll(filters : PaginationFilters){
    const newsViews = await this.repo.getAll(filters)
    return plainToInstance(NewsViewsListAdminDto,newsViews,{excludeExtraneousValues : true})
  }

  async getOne(id : number){
    const newsViews = await this.repo.getOneById(id);
    if(!newsViews){
      throw new NotFoundException('newsViews with given id not found')
    }
    return newsViews
  }

  async update(id : number,payload : NewsViewsUpdateAdminDto){
    const newsViews = await this.repo.getOneById(id);
    if(!newsViews){
      throw new NotFoundException('newsViews with given id not found')
    }

    Object.assign(
      newsViews,
      Object.fromEntries(
        Object.entries(payload).filter(([key,value]) => value)
      )
    )

    await this.repo.save(newsViews)
    return newsViews
  }

  async delete(id : number){
    const newsViews = await this.repo.getOneById(id);
    if(!newsViews){
      throw new NotFoundException('newsViews with given id not found')
    }

    await this.repo.delete(newsViews)
  }
}