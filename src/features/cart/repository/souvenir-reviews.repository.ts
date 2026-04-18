
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { SouvenirReviews } from '../entities/souvenirReviews.entity';

@Injectable()
export class SouvenirReviewsRepository extends BaseRepository<SouvenirReviews>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(SouvenirReviews)
    protected readonly repo: Repository<SouvenirReviews>
  ) {
    super();
  }
}