import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { SetPasswordDto } from '../dtos/users/public/set-password.dto';
import { LoginType, OtpType } from '../../../core/enum/enum';
import { ResendOtpDto } from '../dtos/users/public/resend-otp.dto';

@Injectable()
export class UserRepository extends BaseRepository<User>{
  constructor(
    protected readonly config : ConfigService,
    @InjectRepository(User)
    protected readonly repo: Repository<User>
  ) {
    super();
  }

  async getOneBYLogin(login:string){
    return await this.repo.findOneBy({login : ILike(login)})
  }

  async getOneByUser(payload: SetPasswordDto) {
    return await this.repo.findOne({
      where: {
        login: payload.login,
        code: payload.code,
        type: OtpType.REGISTER
      } as any
    });
  }
}
