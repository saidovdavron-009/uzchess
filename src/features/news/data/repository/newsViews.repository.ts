import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../../core/repositories/base-repository';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsView } from '../entities/newsViews.entity';

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