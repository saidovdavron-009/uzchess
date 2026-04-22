import { User } from '../../entities/users.entity';
import { UserCreateAdminDto } from '../../dtos/users/admin/users.create.admin.dto';
import { plainToInstance } from 'class-transformer';
import { UserListAdminDto } from '../../dtos/users/admin/users.list.admin.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersUpdateAdminDto } from '../../dtos/users/admin/users.update.admin.dto';
import { UserRepository } from '../../repositories/user.repository';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

export class UsersAdminService{
  constructor(private readonly repo: UserRepository) {
  }

  async create(payload : UserCreateAdminDto,profileImage? : Express.Multer.File){
    const existingUser = await this.repo.getOneBYLogin(payload.login);

    if(existingUser){
      throw new ConflictException('Bu login allaqachon mavjut')
    }

    const user = payload as User
    if(profileImage){
      user.profileImage = profileImage.path
    }
    await this.repo.save(user)
    return user
  }

  async getAll(filters:PaginationFilters){
    const users = await this.repo.getAll(filters)
    users.data = plainToInstance(UserListAdminDto,users.data,{excludeExtraneousValues : true})
    return users
  }

  async getOne(id : number){
    const users = await this.repo.getOneById(id)
    if(!users){
      throw new NotFoundException('Users with given id not found')
    }
    return users
  }

  async update(id : number,payload : UsersUpdateAdminDto,profileImage : Express.Multer.File){
    const users = await this.repo.getOneById(id)
    if(!users){
      throw new NotFoundException('Users with given id not found')
    }

    if(payload.login){
      const existingUser = await this.repo.getOneBYLogin(payload.login)

      if(existingUser && existingUser.id !== id){
        throw new ConflictException('Bu login allaqachon band')
      }
    }

    Object.assign(
      users,
      Object.fromEntries(
        Object.entries(payload).filter(([key,value]) => value)
      )
    )

    if(profileImage){
      users.profileImage = profileImage.path
    }

    await this.repo.save(users)
    return users
  }

  async delete(id : number){
    const users = await this.repo.getOneById(id)
    if(!users){
      throw new NotFoundException('Users with given id not found')
    }

    await this.repo.delete(users)
  }
}