import { Injectable, NotFoundException } from '@nestjs/common';
import { UserLessonCreateAdminDto } from '../../dtos/userLesson/admin/userLesson.create.admin.dto';
import { UserLesson } from '../../entities/userLesson.entity';
import { plainToInstance } from 'class-transformer';
import { UserLessonListAdminDto } from '../../dtos/userLesson/admin/userLesson.list.admin.dto';
import { UserLessonUpdateAdminDto } from '../../dtos/userLesson/admin/userLesson.update.admin.dto';
import { UserLessonRepository } from '../../repository/userLesson.repository';
import { UserLessonFilters } from '../../filters/userLesson.filters';

@Injectable()
export class UserLessonAdminService {
  constructor(private readonly repo: UserLessonRepository) {
  }

  async create(payload: UserLessonCreateAdminDto) {
    const userLesson = payload as UserLesson;
    return await this.repo.save(userLesson);
  }

  async getAll(filters: UserLessonFilters) {
    const userLesson = await this.repo.getAll(filters);
    userLesson.data = plainToInstance(UserLessonListAdminDto, userLesson.data, { excludeExtraneousValues: true });
    return userLesson;
  }

  async getOne(id: number) {
    const userLesson = await this.repo.getOneById(id);
    if (!userLesson) {
      throw new NotFoundException('userLesson with given id not found');
    }
    return userLesson;
  }

  async update(id: number, payload: UserLessonUpdateAdminDto) {
    const userLesson = await this.repo.getOneById(id);
    if (!userLesson) {
      throw new NotFoundException('userLesson with given id not found');
    }

    Object.assign(
      userLesson,
      Object.fromEntries(
        Object.entries(payload).filter(([key, value]) => value !== undefined),
      ),
    );

    await this.repo.save(userLesson);
    return userLesson;
  }

  async delete(id: number) {
    const userLesson = await this.repo.getOneById(id);
    if (!userLesson) {
      throw new NotFoundException('userLesson with given id not found');
    }
    await this.repo.delete(userLesson);
  }
}