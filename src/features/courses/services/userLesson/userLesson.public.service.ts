import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserLessonListPublicDto } from '../../dtos/userLesson/public/userLesson.list.public.dto';
import { UserLessonRepository } from '../../repository/userLesson.repository';
import { UserLessonFilters } from '../../filters/userLesson.filters';

@Injectable()
export class UserLessonPublicService {
  constructor(private readonly repo: UserLessonRepository) {
  }

  async getAll(filters: UserLessonFilters) {
    const userLesson = await this.repo.getAll(filters);
    userLesson.data = plainToInstance(UserLessonListPublicDto, userLesson.data, { excludeExtraneousValues: true });
    return userLesson;
  }

  async getOne(id: number) {
    const userLesson = await this.repo.getOneById(id);
    if (!userLesson) {
      throw new NotFoundException('userLesson with given id not found');
    }
    return userLesson;
  }
}