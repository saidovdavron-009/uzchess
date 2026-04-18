import { Injectable, NotFoundException } from '@nestjs/common';
import { BookCreateAdminDto } from '../../dtos/book/admin/book.create.admin.dto';
import { Book } from '../../entities/book.entity';
import { plainToInstance } from 'class-transformer';
import { BookListAdminDto } from '../../dtos/book/admin/book.list.admin.dto';
import { BookUpdateAdminDto } from '../../dtos/book/admin/book.update.admin.dto';
import { NewsRepository } from '../../../news/repository/news/news.repository';

@Injectable()
export class BookAdminService{

  constructor(private readonly repo: NewsRepository) {
  }

  async create(payload : BookCreateAdminDto,image : Express.Multer.File){
    const book = Book.create(payload)
    if(image){
      book.image = image.path
    }
    await Book.save(book)
    return book
  }

  async getAll(userId? : number){
    const books = await Book.createQueryBuilder('book')
      .leftJoinAndSelect('book.likes', 'likes',"likes.userId = :userId",{userId : userId ?? 0})
      .leftJoinAndSelect('book.author','authorId')
      .leftJoinAndSelect('book.category','categoryId')
      .leftJoinAndSelect('book.difficulty','difficultyId')
      .leftJoinAndSelect('book.language','languageId')
      .getMany()

    if(userId){
      for (const book of books){
      // @ts-ignore
        book.isLike = !!(book.likes && book.likes.length > 0)
      }
    }

    const books2 = await Book.find({relations : {likes : true},where : {likes : {userId : userId!}}})
    return plainToInstance(BookListAdminDto,books,{excludeExtraneousValues : true})
  }

  async getOne(id : number){
    const book = await Book.findOneBy({ id });
    if(!book){
      throw new NotFoundException('book with given id not found')
    }

    return book
  }

  async update(id : number,payload : BookUpdateAdminDto,image : Express.Multer.File){
    const book = await Book.findOneBy({ id });
    if(!book){
      throw new NotFoundException('book with given id not found')
    }

    Object.assign(
      book,
      Object.fromEntries(
        Object.entries(payload).filter(([key,value]) => value)
      )
    )

    if(image){
      book.image = image.path
    }

    await Book.save(book)
    return book
  }

  async delete(id : number){
    const book = await Book.findOneBy({ id });
    if(!book){
      throw new NotFoundException('book with given id not found')
    }

    await Book.remove(book)
  }
}