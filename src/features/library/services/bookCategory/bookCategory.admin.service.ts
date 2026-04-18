import { Injectable, NotFoundException } from '@nestjs/common';
import { BookCategory } from '../../entities/bookCategory.entity';
import { plainToInstance } from 'class-transformer';
import { BookCategoryListAdminDto } from '../../dtos/bookCategories/admin/bookCategory.list.admin.dto';
import { BookCategoryCreateAdminDto } from '../../dtos/bookCategories/admin/bookCategory.create.admin.dto';
import { BookCategoryUpdateAdminDto } from '../../dtos/bookCategories/admin/bookCategory.update.admin.dto';
import { BookCategoryRepository } from '../../repository/bookCategory.repository';
import { PaginationFilters } from '../../../common/filters/pagination.filter';
import { News } from '../../../news/entities/news.entity';

@Injectable()
export class BookCategoryAdminService{

  constructor(private readonly repo : BookCategoryRepository) {
  }

  async getAll(filters : PaginationFilters){
    const bookCategory = await this.repo.getAll(filters)
    bookCategory.data = plainToInstance(BookCategoryListAdminDto,bookCategory.data,{excludeExtraneousValues : true})
    return bookCategory
  }

  async getOne(id : number){
    const bookCategories = await this.repo.getOneById(id)
    if(!bookCategories){
      throw new NotFoundException('BookCategory with given id not found')
    }
    return bookCategories
  }

  async create(payload : BookCategoryCreateAdminDto){
    let news = {...payload} as BookCategory
    return await this.repo.save(news)
  }

  async update(id : number,payload:BookCategoryUpdateAdminDto){
    const bookCategory = await this.repo.getOneById(id)
    if(!bookCategory){
      throw new NotFoundException('bookCategory with given id not found')
    }

    Object.assign(
      bookCategory,
      Object.fromEntries(
        Object.entries(payload).filter(([key, value]) => value)
      )
    )
    await this.repo.save(bookCategory)
    return bookCategory
  }

  async delete(id){
    const bookCategory = await this.repo.getOneById(id)
    if(!bookCategory){
      throw new NotFoundException('bookCatgory with given id not found')
    }

    await this.repo.delete(bookCategory)
  }
}