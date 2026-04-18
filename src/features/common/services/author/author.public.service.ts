import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from '../../entities/author.entity';
import { plainToInstance } from 'class-transformer';
import { AuthorListPublicDto } from '../../dtos/author/public/author.list.public.dto';
import { PaginationFilters } from '../../filters/pagination.filter';
import { AuthorRepository } from '../../repository/author.repository';

@Injectable()
export class AuthorPublicService{

  constructor(private readonly repo : AuthorRepository) {
  }

  async getAll(filters : PaginationFilters){
    const author = await this.repo.getAll(filters)
    author.data = plainToInstance(AuthorListPublicDto,author.data,{excludeExtraneousValues:true})
    return author
  }

  async getOne(id : number){
    const author = await this.repo.getOneById(id)
    if(!author){
      throw new NotFoundException('Author with given id not found')
    }

    return author
  }
}