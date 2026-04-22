import { Injectable, NotFoundException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer';
import { BookReviewsListPublicDto } from '../../dtos/bookReviews/public/bookReviews.list.public.dto';
import { BookReviewsRepository } from '../../repository/bookReviews.repository';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Injectable()
export class BookReviewsPublicService {
  constructor(private readonly repo: BookReviewsRepository) {}

  async getAll(filters: PaginationFilters){
    const bookReviews = await this.repo.getAll(filters)
    bookReviews.data = plainToInstance(BookReviewsListPublicDto,bookReviews.data,{excludeExtraneousValues : true})
    return bookReviews
  }

  async getOne(id : number){
    const bookReviews = await this.repo.getOneById(id);
    if(!bookReviews){
      throw new NotFoundException('bookReviews with given id not found')
    }

    return bookReviews
  }
}
