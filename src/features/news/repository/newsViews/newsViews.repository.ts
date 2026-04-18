import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../../core/repositories/base-repository';
import { NewsView } from '../../entities/newsViews.entity';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NewsViewsRepository extends BaseRepository<NewsView> {
  constructor(
    protected readonly config : ConfigService,
    @InjectRepository(NewsView)
    protected readonly repo : Repository<NewsView>
  ) {
    super();
  }
}