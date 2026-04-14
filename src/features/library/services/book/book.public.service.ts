import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '../../entities/book.entity';
import { plainToInstance } from 'class-transformer';
import { BookListPublicDto } from '../../dtos/book/public/book.list.public.dto';
import { LibraryFilter } from '../../filters/library.filter';
import { FindOptionsWhere, ILike } from 'typeorm';
import { LibraryPaginatedResultDto } from '../../library.paginated-result.dto';

@Injectable()
export class BookPublicService{
  async getAll(filters : LibraryFilter){
    let whereOptions : FindOptionsWhere<Book> = {}
    const take = filters.size ?? Number(process.env.DEFAULT_SIZE)
    const currentPages = filters.page ?? Number(process.env.DEFAULT_PAGE)
    const skip = (currentPages - 1) * take

    if(filters.search){
      whereOptions.title = ILike(`%${filters.search}%`)
    }

    const totalCount = await Book.countBy(whereOptions)
    const totalPages = Math.ceil(totalCount / take)
    const nextPages = currentPages < totalPages ? currentPages + 1 : null
    let book = await Book.find({ where : whereOptions, skip : skip,take : take})
    const data = plainToInstance(BookListPublicDto,book,{excludeExtraneousValues : true})
    return {totalPages,currentPages,nextPages,totalCount,data} as LibraryPaginatedResultDto
  }
  
  async getOne(id : number){
    const book = await Book.findOneBy({ id });
    if(!book){
      throw new NotFoundException('book with given id not found')
    }

    return book
  }
}