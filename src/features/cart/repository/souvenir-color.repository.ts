import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { SouvenirColor } from '../entities/souvenirColor.entity';

@Injectable()
export class SouvenirColorRepository extends BaseRepository<SouvenirColor>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(SouvenirColor)
    protected readonly repo: Repository<SouvenirColor>
  ) {
    super();
  }
}