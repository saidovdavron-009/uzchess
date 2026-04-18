import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { OtpCode } from '../entities/otpCodes.entity';

@Injectable()
export class OtpCodeRepository extends BaseRepository<OtpCode>{
  constructor(
    protected readonly config : ConfigService,
    @InjectRepository(OtpCode)
    protected readonly repo: Repository<OtpCode>
  ) {
    super();
  }
}
