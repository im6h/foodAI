import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { jwtConstants } from '../constants';
import { UsersService } from '../../users/services/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { TokenService } from '../token.service';
import { ZaloService } from './zalo.service';
import { ZaloController } from './controllers/zalo.controller';
import { UserZaloEntity } from './entities/zalo.entity';
import { ZALO_CONFIG_KEY, ZaloConfig } from './zalo.config';
import { RoleEntity } from '@/modules/roles/entities/role.entity';
import { UserBasicEntity } from '../basic/entities/basic.entity';

const jwtModuleRegister = JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '60s' },
});

const zaloConfig: ZaloConfig = {
  clientId: process.env.ZALO_APP_ID,
  clientSecret: process.env.ZALO_APP_SECRET,
};
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserZaloEntity, RoleEntity, UserBasicEntity]),
    jwtModuleRegister,
  ],
  controllers: [ZaloController],
  providers: [
    ZaloService,
    UsersService,
    TokenService,
    {
      provide: ZALO_CONFIG_KEY,
      useValue: zaloConfig,
    },
  ],
  exports: [ZaloService],
})
export class ZaloModule {}
