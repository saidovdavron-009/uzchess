import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';

@Injectable()
export class UserRepository extends BaseRepository<User>{
  constructor(
    protected readonly config : ConfigService,
    @InjectRepository(User)
    protected readonly repo: Repository<User>
  ) {
    super();
  }
}
