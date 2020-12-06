import { IDynamicStorageRbac, IStorageRbac } from 'nestjs-rbac';
import { Injectable } from '@nestjs/common';
import { PermissionEntity } from '../entities/permission.entity';
import { RoleEntity } from '../entities/role.entity';
import { getManager } from 'typeorm';
import { RolePermissionEntity } from '../entities/role-permission.entity';
import { LIST_ACTION, DEFAULT_ADMIN_ROLE_NAME } from '../constants';

interface TypeMap<T> {
  [key: string]: T;
}

@Injectable()
export class DynamicStorageService implements IDynamicStorageRbac {

  async getRbac(): Promise<IStorageRbac> {
    const [roles, permissions] = await Promise.all([
      getManager().createQueryBuilder(RoleEntity, 'Role').where('isActive = 1').getMany(),
      getManager().createQueryBuilder(PermissionEntity, 'RolePermission').where('isActive = 1').getMany(),
    ]);

    // empty data, use default
    if (roles.length === 0 || permissions.length === 0) {
      return;
    }

    const rolePermissions = await getManager().createQueryBuilder(RolePermissionEntity, 'RolePermissionRelation')
      .where('roleId IN (:roles) AND permissionId IN (:permissions)', {
        roles: roles.map(role => role.id),
        permissions: permissions.map(permission => permission.id),
      }).getMany();
    // map role & permission
    const roleMap: TypeMap<RoleEntity> = roles.reduce(
      (r, role) => ({
        ...r,
        [role.id]: role,
      }),
      {},
    );

    const permMap: TypeMap<PermissionEntity> = permissions.reduce(
      (r, permission) => ({
        ...r,
        [permission.id]: permission,
      }),
      {},
    );
    const roleList = [];
    roles.forEach(role => {
      roleList.push(role.code);
    });

    const permissionList = {};
    permissions.forEach(p => {
      permissionList[p.resource] = LIST_ACTION;
    });
    const grantList = {};
    const checkAdmin = roles.findIndex(r => r.code === DEFAULT_ADMIN_ROLE_NAME) > -1;
    if (checkAdmin) {
      grantList[DEFAULT_ADMIN_ROLE_NAME] = [];
      permissions.forEach(p => {
        LIST_ACTION.forEach(a => {
          grantList[DEFAULT_ADMIN_ROLE_NAME].push(`${p.resource}@${a}`);
        });
      });
    } else {
      rolePermissions.forEach(rp => {
        const role = roleMap[rp.roleId];
        const perm = permMap[rp.permissionId];
        if (!grantList[role.code]) {
          grantList[role.code] = [];
        }
        LIST_ACTION.forEach(a => {
          if (rp[a] === 1) {
            grantList[role.code].push(`${perm.resource}@${a}`);
          }
        });
      });
    }
    const grants: IStorageRbac = {
      roles: roleList,
      permissions: permissionList,
      grants: grantList,
      filters: {},
    };
    return grants;
  }
}
