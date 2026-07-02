import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { UserLesson } from '../entities/userLesson.entity';
import { UserLessonFilters } from '../filters/userLesson.filters';

@Injectable()
export class UserLessonRepository extends BaseRepository<UserLesson> {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(UserLesson)
    protected readonly repo: Repository<UserLesson>,
  ) {
    super();
  }

  public async getAll(filters: UserLessonFilters) {
    const whereOptions: FindOptionsWhere<UserLesson> = {};

    if (filters.userid) {
      whereOptions.userid = filters.userid;
    }

    if (filters.CourseLessonId) {
      whereOptions.CourseLessonId = filters.CourseLessonId;
    }

    return await super.getAll(filters, whereOptions);
  }
}