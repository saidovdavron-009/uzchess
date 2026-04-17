import { Injectable } from '@nestjs/common';
import { News } from '../../entities/news.entity';
import { NewsView } from '../../entities/newsViews.entity';

@Injectable()
export class NewsViewsAdminRepository{
  async save(entity:NewsView){
    return await NewsView.save(entity)
  }

  async getOneById(id : number){
    return await NewsView.findOneBy({ id })
  }

  async getAll(){
  }

  async delete(entity : NewsView){
    return await NewsView.remove(entity)
  }
}