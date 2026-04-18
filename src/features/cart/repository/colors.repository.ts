import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { Colors } from '../entities/colors.entity';

@Injectable()
export class ColorsRepository extends BaseRepository<Colors>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(Colors)
    protected readonly repo: Repository<Colors>
  ) {
    super();
  }
}