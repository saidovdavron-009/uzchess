import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { Book } from '../entities/book.entity';
import { BookFilters } from '../filters/book.filters';
import { BookCategory } from '../entities/bookCategory.entity';
import { BookLike } from '../entities/bookLikes.entity';

@Injectable()
export class BookLikeRepository extends BaseRepository<BookLike>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(BookLike)
    protected readonly repo: Repository<BookLike>
  ) {
    super();
  }
}