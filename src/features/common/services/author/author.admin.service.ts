import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from '../../entities/author.entity';
import { AuthorCreateAdminDto } from '../../dtos/author/admin/author.create.admin.dto';
import { plainToInstance } from 'class-transformer';
import { AuthorListAdminDto } from '../../dtos/author/admin/author.list.admin.dto';
import { AuthorUpdateAdminDto } from '../../dtos/author/admin/author.update.admin.dto';
import { AuthorRepository } from '../../repository/author.repository';
import { PaginationFilters } from '../../filters/pagination.filter';

@Injectable()
export class AuthorAdminService{
  constructor(private readonly repo:AuthorRepository) {
  }
  async create(payload : AuthorCreateAdminDto){
    const author = {...payload} as Author
    return await this.repo.save(author)
  }

  async getAll(filters:PaginationFilters){
    const author = await this.repo.getAll(filters)
    author.data = plainToInstance(AuthorListAdminDto,author.data,{excludeExtraneousValues:true})
    return author
  }

  async getOne(id : number){
    const author = await this.repo.getOneById(id)
    if(!author){
      throw new NotFoundException('Author with given id not found')
    }

    return author
  }

  async update(id : number,payload : AuthorUpdateAdminDto){
   const author = await this.repo.getOneById(id)
    if(!author){
      throw new NotFoundException('author with given id not found')
    }
    Object.assign(
      author,
      Object.fromEntries(
        Object.entries(payload).filter(([key,value]) => value)
      )
    )
    await this.repo.save(author)
    return author
  }

  async delete(id : number){
    const author = await this.repo.getOneById(id)
    if(!author){
      throw new NotFoundException('News with given id not found')
    }

    await this.repo.delete(author)
  }
}