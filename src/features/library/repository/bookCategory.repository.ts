import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { Book } from '../entities/book.entity';
import { BookFilters } from '../filters/book.filters';
import { BookCategory } from '../entities/bookCategory.entity';

@Injectable()
export class BookCategoryRepository extends BaseRepository<BookCategory>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(BookCategory)
    protected readonly repo: Repository<BookCategory>
  ) {
    super();
  }
}