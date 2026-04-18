import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../../core/repositories/base-repository';
import { News } from '../../entities/news.entity';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { NewsFilter } from '../../filters/news.filter';

@Injectable()
export class NewsRepository extends BaseRepository<News>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(News)
    protected readonly repo: Repository<News>
  ) {
    super();
  }

  public async getAll(filters : NewsFilter){
    const whereOptions: FindOptionsWhere<News> = {}

    if(filters.search){
      whereOptions.title = ILike(`%${filters.search}%`)
    }
    return await super.getAll(filters, whereOptions)
  }
}