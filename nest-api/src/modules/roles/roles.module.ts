import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RBAcModule } from 'nestjs-rbac';
import { RoleEntity } from './entities/role.entity';
import { PermissionEntity } from './entities/permission.entity';
import { RolePermissionEntity } from './entities/role-permission.entity';
import { RolesService } from './services/roles.service';
import { PermissionsController } from './controllers/permissions.controller';
import { PermissionsService } from './services/permissions.service';
import { DynamicStorageService } from './services/init.role.service';

@Module({
  imports: [
    RBAcModule.forDynamic(DynamicStorageService),
    TypeOrmModule.forFeature([
      RoleEntity,
      RolePermissionEntity,
      PermissionEntity,
    ]),
  ],
  controllers: [RolesController, PermissionsController],
  providers: [ RolesService, PermissionsService],
  exports: [RolesService],
})
export class RolesModule {}
