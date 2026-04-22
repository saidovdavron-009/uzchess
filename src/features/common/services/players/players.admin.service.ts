import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayersCreateAdminDto } from '../../dtos/players/admin/players.create.admin.dto';
import { Player } from '../../entities/players.entity';
import { plainToInstance } from 'class-transformer';
import { PlayersListAdminDto } from '../../dtos/players/admin/players.list.admin.dto';
import { PlayersUpdateAdminDto } from '../../dtos/players/admin/players.update.admin.dto';
import { PlayersRepository } from '../../repository/players.repository';
import { PaginationFilters } from '../../filters/pagination.filter';

@Injectable()
export class PlayersAdminService{
  constructor(private readonly repo: PlayersRepository) {}

  async create(payload : PlayersCreateAdminDto,image : Express.Multer.File){
    const player = {...payload} as Player
    if(image){
      player.image = image.path
    }
    return await this.repo.save(player)
  }

  async getAll(filters: PaginationFilters){
    const player = await this.repo.getAll(filters)
    player.data = plainToInstance(PlayersListAdminDto,player.data,{excludeExtraneousValues : true})
    return player
  }

  async getOne(id : number){
    const player = await this.repo.getOneById(id)
    if(!player){
      throw new NotFoundException('player with given id not found')
    }
    return player
  }

  async update(id: number, payload: PlayersUpdateAdminDto, image: Express.Multer.File) {
    const player = await this.repo.getOneById(id);
    if (!player) {
      throw new NotFoundException('Player with given id not found');
    }

    Object.assign(
      player,
      Object.fromEntries(
        Object.entries(payload).filter(([key, value]) => value)
      )
    );

    if (image) {
      player.image = image.path;
    }

    await this.repo.save(player);
    return player;
  }

  async delete(id: number) {
    const player = await this.repo.getOneById(id);
    if (!player) {
      throw new NotFoundException('Player with given id not found');
    }

    await this.repo.delete(player);
  }
}
