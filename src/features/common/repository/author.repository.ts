import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { BookFilters } from '../filters/book.filters';
import { Author } from '../entities/author.entity';
import { PaginationFilters } from '../filters/pagination.filter';
import { AuthorFilters } from '../filters/author.filters';

@Injectable()
export class AuthorRepository extends BaseRepository<Author>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(Author)
    protected readonly repo: Repository<Author>
  ) {
    super();
  }

  public async getAll(filters:AuthorFilters){
    const whereOptions:FindOptionsWhere<Author> = {}

    if(filters.search){
      whereOptions.fullName = ILike(`%${filters.search}%`)
    }
    return await super.getAll(filters,whereOptions)
  }
}