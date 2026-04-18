import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportCategory } from '../entity/reportCategories.entity';

@Injectable()
export class ReportCategoryRepository extends BaseRepository<ReportCategory>{
  constructor(
    protected readonly config : ConfigService,
    @InjectRepository(ReportCategory)
    protected readonly repo: Repository<ReportCategory>
  ) {
    super();
  }
}
