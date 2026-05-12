import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtpCode } from '../entities/otpCodes.entity';

@Injectable()
export class OtpCodeRepository extends BaseRepository<OtpCode> {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(OtpCode)
    protected readonly repo: Repository<OtpCode>,
  ) {
    super();
  }

  async getOneByUserId(userId: number) {
    return await this.repo.findOneBy({ userId: userId });
  }
}
