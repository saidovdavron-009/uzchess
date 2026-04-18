import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { SouvenirLikes } from '../entities/souvenir.likes.entity';

@Injectable()
export class SouvenirLikesRepository extends BaseRepository<SouvenirLikes>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(SouvenirLikes)
    protected readonly repo: Repository<SouvenirLikes>
  ) {
    super();
  }
}