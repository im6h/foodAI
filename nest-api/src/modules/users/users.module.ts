import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

import { UsersService, ProfileService } from './services';
import { UsersController, ProfileController } from './controllers';
import { UserEntity } from './entities/user.entity';
import { RolesService } from '../roles/services/roles.service';
import { RoleEntity } from '../roles/entities/role.entity';
import { RolePermissionEntity } from '../roles/entities/role-permission.entity';
import { PermissionEntity } from '../roles/entities/permission.entity';
import { UserBasicEntity } from '../auth/basic/entities/basic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      RolePermissionEntity,
      PermissionEntity,
      UserBasicEntity,
    ]),
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
  ],
  controllers: [UsersController, ProfileController],
  providers: [UsersService, ProfileService, RolesService],
  exports: [UsersService],
})
export class UsersModule {}
