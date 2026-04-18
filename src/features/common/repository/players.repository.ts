import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { Player } from '../entities/players.entity';

@Injectable()
export class PlayersRepository extends BaseRepository<Player>{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(Player)
    protected readonly repo: Repository<Player>
  ) {
    super();
  }
}