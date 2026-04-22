import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { MatchesListAdminDto } from '../../dtos/matches/admin/matches.list.admin.dto';
import { MatchesRepository } from '../../repository/matches.repository';
import { PaginationFilters } from '../../filters/pagination.filter';

@Injectable()
export class MatchesPublicService {
  constructor(private readonly repo: MatchesRepository) {}

  async getAll(filters: PaginationFilters){
    const matches = await this.repo.getAll(filters)
    matches.data = plainToInstance(MatchesListAdminDto,matches.data,{excludeExtraneousValues : true});
    return matches
  }

  async getOne(id: number){
    const matches = await this.repo.getOneById(id)

    if(!matches){
      throw new NotFoundException('Matches with given id not found')
    }

    return matches;
  }
}
