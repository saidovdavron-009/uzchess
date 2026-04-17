import { Injectable } from '@nestjs/common';
import { News } from '../../entities/news.entity';

@Injectable()
export class NewsAdminRepository {
  async save(entity: News) {
    return await News.save(entity);
  }

  async getOneById(id: number) {
    return await News.findOneBy({ id });
  }

  async getAll() {
    return await News.find();
  }

  async delete(entity: News) {
    return await News.remove(entity);
  }
}