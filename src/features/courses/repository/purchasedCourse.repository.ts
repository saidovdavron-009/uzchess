
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { PurchasedCourse } from '../entities/purchasedCourse.entity';

@Injectable()
export class PurchasedCourseRepository extends BaseRepository<PurchasedCourse>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(PurchasedCourse)
    protected readonly repo: Repository<PurchasedCourse>
  ) {
    super();
  }
}