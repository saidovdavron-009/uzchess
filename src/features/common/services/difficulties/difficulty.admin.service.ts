import { Injectable, NotFoundException } from '@nestjs/common';
import { Difficulty } from '../../entities/difficulty.entity';
import { DifficultyCreateAdminDto } from '../../dtos/difficulties/admin/difficulty.create.admin.dto';
import { plainToInstance } from 'class-transformer';
import { DifficultyListAdminDto } from '../../dtos/difficulties/admin/difficulty.list.admin.dto';
import { DifficultyUpdateAdminDto } from '../../dtos/difficulties/admin/difficulty.update.admin.dto';
import { ConfigService } from '@nestjs/config';
import { DifficultyRepository } from '../../repository/difficulty.repository';
import { PaginationFilters } from '../../filters/pagination.filter';

@Injectable()
export class DifficultyAdminService{

  constructor(
    private readonly repo:DifficultyRepository,
    private readonly joi : ConfigService
  ) {
  }

  async create(payload : DifficultyCreateAdminDto,icon: Express.Multer.File){
    const difficult = {...payload,icon:icon.path} as Difficulty
    await this.repo.save(difficult)
  }

  async getAll(filters: PaginationFilters ){
    const difficult = await this.repo.getAll(filters)

    for (let difficulty of difficult.data){
      difficulty.icon = this.joi.getOrThrow<string>('BASE_URL') + '/' + difficulty.icon
    }
    return plainToInstance(DifficultyListAdminDto,difficult,{excludeExtraneousValues:true})
  }

  async getOne(id : number){
    const difficult = await this.repo.getOneById(id)
    if(!difficult){
      throw new NotFoundException('difficult with given id not found')
    }

    return difficult
  }

  async update(id : number,payload : DifficultyUpdateAdminDto,icon : Express.Multer.File){
    const difficult = await this.repo.getOneById(id)
    if(!difficult){
      throw new NotFoundException('difficult with given id not found')
    }

    Object.assign(
      difficult,
      Object.fromEntries(
        Object.entries(payload).filter(([key,value]) => value)
      )
    )

    if (icon) {
      difficult.icon = icon.path;
    }

    await this.repo.save(difficult)
    return difficult
  }

  async delete(id: number){
    const difficult = await this.repo.getOneById(id)
    if(!difficult){
      throw new NotFoundException('difficult with given id not found')
    }

    await this.repo.delete(difficult)
  }
}