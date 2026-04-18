import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { Souvenir } from '../entities/souvenir.entity';
import { Course } from '../../courses/entities/course.entity';
import { SouvenirFilter } from '../filters/souvenir.filter';

@Injectable()
export class SouvenirRepository extends BaseRepository<Souvenir>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(Souvenir)
    protected readonly repo: Repository<Souvenir>
  ) {
    super();
  }

  public async getAll(filters : SouvenirFilter){
    const whereOptions: FindOptionsWhere<Course> = {}

    if(filters.search){
      whereOptions.title = ILike(`%${filters.search}%`)
    }
    return await super.getAll(filters, whereOptions)
  }
}