import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DifficultyListPublicDto } from '../../dtos/difficulties/public/difficulty.list.public.dto';
import { DifficultyRepository } from '../../repository/difficulty.repository';
import { PaginationFilters } from '../../filters/pagination.filter';

@Injectable()
export class DifficultyPublicService{
  constructor(private readonly repo: DifficultyRepository) {}

  async getAll(filters: PaginationFilters){
    const difficult = await this.repo.getAll(filters)
    difficult.data = plainToInstance(DifficultyListPublicDto,difficult.data,{excludeExtraneousValues:true})
    return difficult
  }

  async getOne(id : number){
    const difficult = await this.repo.getOneById(id)
    if(!difficult){
      throw new NotFoundException('difficult with given id not found')
    }

    return difficult
  }
}
