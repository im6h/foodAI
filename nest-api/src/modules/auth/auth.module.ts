import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { TokenService } from './token.service';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { LoginController } from './basic/controllers/login.controller';
import { BasicService } from './basic/basic.service';
import { UserBasicEntity } from './basic/entities/basic.entity';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/services/users.service';
import { UsersModule } from '../users/users.module';
import { ReCapChaModule } from '@/components/recaptcha/recaptcha.module';
import { RoleEntity } from '../roles/entities/role.entity';
import { UserRegisterEntity } from '../auth/register/register.entity';

const jwtModuleRegister = JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '60s' },
});

@Module({
  imports: [
    UsersModule,
    ReCapChaModule,
    TypeOrmModule.forFeature([
      UserEntity,
      UserBasicEntity,
      RoleEntity,
      UserBasicEntity,
      UserRegisterEntity,
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    jwtModuleRegister,
  ],
  controllers: [RegisterController, LoginController, AuthController],
  providers: [
    RegisterService,
    BasicService,
    JwtStrategy,
    TokenService,
    UsersService,
  ],
  exports: [TokenService, BasicService, RegisterService],
})
export class AuthModule {}
