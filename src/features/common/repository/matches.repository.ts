import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { MatchesEntity } from '../entities/matches.entity';

@Injectable()
export class MatchesRepository extends BaseRepository<MatchesEntity>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(MatchesEntity)
    protected readonly repo: Repository<MatchesEntity>
  ) {
    super();
  }
}