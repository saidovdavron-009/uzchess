import { plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationFilters } from '../../../../common/filters/pagination.filter';
import { NewsListAdminDto } from '../../../presentation/dtos/news/admin/news.list.admin.dto';
import { NewsCreateAdminDto } from '../../../presentation/dtos/news/admin/news.create.admin.dto';
import { News } from '../../../data/entities/news.entity';
import { NewsUpdateAdminDto } from '../../../presentation/dtos/news/admin/news.update.admin.dto';
import { INewsRepository } from '../../repository/news.repository.interface';

@Injectable()
export class NewsAdminService{
  constructor(private readonly repo: INewsRepository) {
  }

  async getAll(filters : PaginationFilters){
    const news = await this.repo.getAll(filters)
    news.data =  plainToInstance(NewsListAdminDto,news.data, {excludeExtraneousValues: true})
    return news
  }

  async getOne(id : number){
    const news = await this.repo.getOneById(id)
    if(!news){
      throw new NotFoundException('News with given id not found')
    }
    return plainToInstance(NewsListAdminDto,news, {excludeExtraneousValues: true})
  }

  async create(payload : NewsCreateAdminDto,image : Express.Multer.File){
    let news = {...payload,image: image.path} as News
    return await this.repo.save(news)
  }

  async update(id : number,payload : NewsUpdateAdminDto,image : Express.Multer.File){
    const news = await this.repo.getOneById(id)
    if(!news){
      throw new NotFoundException('News with given id not found')
    }

    Object.assign(
      news,
      Object.fromEntries(
        Object.entries(payload).filter(([key, value]) => value)
      )
    )
    if(image){
      news.image = image.path
    }
    return await this.repo.save(news)
  }

  async delete(id : number){
    const news = await this.repo.getOneById(id)
    if(!news){
      throw new NotFoundException('News with given id not found')
    }

    return await this.repo.delete(news)
  }
}