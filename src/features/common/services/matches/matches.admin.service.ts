import { Injectable, NotFoundException } from '@nestjs/common';
import { MatchesEntity } from '../../entities/matches.entity';
import { MatchesCreateAdminDto } from '../../dtos/matches/admin/matches.create.admin.dto';
import { MatchesUpdateUpdateDto } from '../../dtos/matches/admin/matches.update.update.dto';
import { plainToInstance } from 'class-transformer';
import { MatchesListAdminDto } from '../../dtos/matches/admin/matches.list.admin.dto';
import { MatchesRepository } from '../../repository/matches.repository';
import { PaginationFilters } from '../../filters/pagination.filter';

@Injectable()
export class MatchesAdminService {
  constructor(private readonly repo: MatchesRepository) {}

  async create(payload : MatchesCreateAdminDto,moves : Express.Multer.File){
    const matches = {...payload} as MatchesEntity
    if(moves){
      matches.moves = moves.path
    }
    return await this.repo.save(matches)
  }

  async getAll(filters: PaginationFilters) {
    const matches = await this.repo.getAll(filters)
    matches.data = plainToInstance(MatchesListAdminDto,matches.data,{excludeExtraneousValues:true});
    return matches
  }

  async getOne(id: number) {
    const matches = await this.repo.getOneById(id);

    if (!matches) {
      throw new NotFoundException('Matches with given id not found');
    }

    return matches;
  }

  async delete(id: number) {
    const matches = await this.repo.getOneById(id);

    if (!matches) {
      throw new NotFoundException('Matches with given id not found');
    }

    await this.repo.delete(matches);
  }

  async update(id: number, payload: MatchesUpdateUpdateDto,moves : Express.Multer.File) {
    const matches = await this.repo.getOneById(id);
    if (!matches) {
      throw new NotFoundException('Matches with given id not found');
    }
    Object.assign(
      matches,
      Object.fromEntries(
        Object.entries(payload).filter(([key,value]) => value)
      )
    )
    if(moves){
      matches.moves = moves.path
    }
    await this.repo.save(matches)
    return matches
  }
}
