import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { SouvenirImages } from '../entities/souvenirImages.entity';

@Injectable()
export class SouvenirImageRepository extends BaseRepository<SouvenirImages>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(SouvenirImages)
    protected readonly repo: Repository<SouvenirImages>
  ) {
    super();
  }
}