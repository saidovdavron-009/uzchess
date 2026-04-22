import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BookListPublicDto } from '../../dtos/book/public/book.list.public.dto';
import { BookRepository } from '../../repository/book.repository';
import { BookFilters } from '../../filters/book.filters';

@Injectable()
export class BookPublicService{
  constructor(private readonly repo: BookRepository) {}

  async getAll(filters: BookFilters) {
    const book = await this.repo.getAll(filters)
    book.data = plainToInstance(BookListPublicDto, book.data, { excludeExtraneousValues: true })
    return book
  }

  async getOne(id : number){
    const book = await this.repo.getOneById(id);
    if(!book){
      throw new NotFoundException('book with given id not found')
    }

    return book
  }
}
