import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { Book } from '../entities/book.entity';
import { BookFilters } from '../filters/book.filters';

@Injectable()
export class BookRepository extends BaseRepository<Book>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(Book)
    protected readonly repo: Repository<Book>
  ) {
    super();
  }

  public async getAll(filters : BookFilters){
    const whereOptions: FindOptionsWhere<Book> = {}

    if(filters.search){
      whereOptions.title = ILike(`%${filters.search}%`)
    }
    return await super.getAll(filters, whereOptions)
  }
}