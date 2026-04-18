import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entity/report.entity';

@Injectable()
export class ReportRepository extends BaseRepository<Report>{
  constructor(
    protected readonly config : ConfigService,
    @InjectRepository(Report)
    protected readonly repo: Repository<Report>
  ) {
    super();
  }
}
