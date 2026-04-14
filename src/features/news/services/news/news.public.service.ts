import { News } from '../../entities/news.entity';
import { plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsListPublicDto } from '../../dtos/news/public/news.list.public.dto';
import { NewsFilter } from '../../filters/news.filter';
import { FindOptionsWhere, ILike } from 'typeorm';
import { NewsPaginatedResultDto } from '../../news.paginated-result.dto';

@Injectable()
export class NewsPublicService{
  async getAll(filters : NewsFilter){
    let whereOptions: FindOptionsWhere<News> = {}
    const take = filters.size ?? Number(process.env.DEFAULT_SIZE)
    const currentPage = filters.page ?? Number(process.env.DEFAULT_PAGE)
    const skip = (currentPage - 1) * take

    if(filters.search){
      whereOptions.title = ILike(`%${filters.search}%`)
    }

    const totalCount = await News.countBy(whereOptions)
    const totalPages = Math.ceil(totalCount / take)
    const nextPage = currentPage < totalPages ? currentPage + 1 : null
    let news = await News.find({ where : whereOptions, skip : skip,take : take})
    const data = plainToInstance(NewsListPublicDto,news, {excludeExtraneousValues: true})
    return {totalPages,currentPage,nextPage,totalCount,data} as NewsPaginatedResultDto
  }

  async getOne(id : number){
    const news = await News.findOneBy({ id });
    if(!news){
      throw new NotFoundException('News with given id not found')
    }
    return news
  }
}