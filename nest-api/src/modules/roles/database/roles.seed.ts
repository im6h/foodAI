/* tslint:disable:no-var-requires */
require('dotenv').config();

import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PermissionEntity } from '../entities/permission.entity';
import { RoleEntity, TypeRole } from '../entities/role.entity';
import { RolePermissionEntity } from '../entities/role-permission.entity';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const permissions = [
      {
        title: 'Thông tin tài khoản',
        resource: 'user',
        action: '*',
        isActive: true,
      },
    ];

    const permissionData = await connection
      .getRepository(PermissionEntity)
      .createQueryBuilder('RolePermission')
      .getMany();

    const pers = permissionData.map(p => p.resource);
    const iPermissions = [];
    permissions.forEach(p => {
      if (!pers.includes(p.resource)) {
        iPermissions.push(p);
      }
    });

    await connection.getRepository(PermissionEntity).save(iPermissions);
    const pData = await connection
      .getRepository(PermissionEntity)
      .createQueryBuilder('RolePermission')
      .getMany();

    const roleData = await connection.getRepository(RoleEntity).findOne({
      code: 'admin',
    });

    if (!roleData) {
      await connection.getRepository(RoleEntity).insert({
        code: 'admin',
        title: 'Admin System',
        isActive: true,
        typeRole: TypeRole.IS_ADMIN,
      });
    }

    const rData = await connection.getRepository(RoleEntity).findOne({
      code: 'admin',
    });
    pData.forEach(async p => {
      const rp = await connection.getRepository(RolePermissionEntity).findOne({
        roleId: rData.id,
        permissionId: p.id,
      });
      if (!rp) {
        await connection.getRepository(RolePermissionEntity).save({
          roleId: rData.id,
          permissionId: p.id,
          read: true,
          create: true,
          update: true,
          delete: true,
          import: true,
          export: true,
        });
      }
    });
  }
}
