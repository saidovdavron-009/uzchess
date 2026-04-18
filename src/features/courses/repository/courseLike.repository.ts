import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { CourseLike } from '../entities/courseLikes.entity';

@Injectable()
export class CourseLikeRepository extends BaseRepository<CourseLike>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(CourseLike)
    protected readonly repo: Repository<CourseLike>
  ) {
    super();
  }
}