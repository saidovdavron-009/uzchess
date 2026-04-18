import { Injectable, NotFoundException } from '@nestjs/common';
import { BookCategory } from '../../entities/bookCategory.entity';
import { plainToInstance } from 'class-transformer';
import { BookCategoryListPublicDto } from '../../dtos/bookCategories/public/bookCategory.list.public.dto';
import { NewsRepository } from '../../../news/repository/news/news.repository';
import { BookCategoryRepository } from '../../repository/bookCategory.repository';
import { BookCategoryFilters } from '../../filters/bookCategory.filters';

@Injectable()
export class BookCategoryPublicService{

  constructor(private readonly repo: BookCategoryRepository) {
  }

  async getAll(filters:BookCategoryFilters){
    const bookCategory = await this.repo.getAll(filters)
    bookCategory.data = plainToInstance(BookCategoryListPublicDto,bookCategory.data,{excludeExtraneousValues : true})
    return bookCategory
  }

  async getOne(id : number){
    const bookCategories = await this.repo.getOneById(id)
    if(!bookCategories){
      throw new NotFoundException('BookCategory with given id not found')
    }
    return bookCategories
  }
}