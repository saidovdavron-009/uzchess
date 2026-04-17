import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '../../entities/book.entity';
import { PaginatedResult } from '../../../common/dtos/pagination-result';
import { PaginationFilters } from '../../../common/filters/pagination.filter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BookPublicService{

  constructor(private readonly config : ConfigService) {
  }

  async getAll(filters: PaginationFilters) {
    const take = filters.size ?? this.config.getOrThrow<number>('DEFAULT_SIZE');
    const currentPage = filters.page ?? this.config.getOrThrow<number>('DEFAULT_PAGE');
    const skip = (currentPage - 1) * take;

    const totalCount = await Book.count();
    const totalPages = Math.ceil(totalCount / take);

    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const data = await Book.find({ skip: skip, take: take });

    return { totalCount, totalPages, previousPage, currentPage, nextPage, data } as PaginatedResult;
  }
  
  async getOne(id : number){
    const book = await Book.findOneBy({ id });
    if(!book){
      throw new NotFoundException('book with given id not found')
    }

    return book
  }
}