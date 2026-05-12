import { Module } from '@nestjs/common';
import { UsersAdminService } from './services/users/users.admin.service';
import { UsersAdminController } from './controllers/users/users.admin.controller';
import { UsersPublicService } from './services/users/users.public.service';
import { UsersPublicController } from './controllers/users/users.public.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleConfig } from '../../config/jwt-module.config';
import { OtpCodePublicService } from './services/otpCodes/otp-code.public.service';
import { UserRepository } from './repositories/user.repository';
import { OtpCodeRepository } from './repositories/otp.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { OtpCode } from './entities/otpCodes.entity';

@Module({
  providers : [
    UserRepository,
    OtpCodeRepository,
    UsersAdminService,
    UsersPublicService,
    OtpCodePublicService,
  ],
  imports : [
    JwtModule.register(jwtModuleConfig),
    TypeOrmModule.forFeature([User,OtpCode])
  ],
  controllers : [
    UsersAdminController,
    UsersPublicController
  ]
})

export class AuthModule {}