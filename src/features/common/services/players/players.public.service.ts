import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PlayersListPublicDto } from '../../dtos/players/public/players.list.public.dto';
import { PlayersRepository } from '../../repository/players.repository';
import { PaginationFilters } from '../../filters/pagination.filter';

@Injectable()
export class PlayersPublicService{
  constructor(private readonly repo: PlayersRepository) {}

  async getAll(filters: PaginationFilters){
    const player = await this.repo.getAll(filters)
    player.data = plainToInstance(PlayersListPublicDto,player.data,{excludeExtraneousValues : true})
    return player
  }

  async getOne(id : number){
    const player = await this.repo.getOneById(id)
    if(!player){
      throw new NotFoundException('player with given id not found')
    }
    return player
  }
}
