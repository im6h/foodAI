import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../entities/role.entity';
import { Repository, In } from 'typeorm';
import { RolePermissionEntity } from '../entities/role-permission.entity';
import { PermissionEntity } from '../entities/permission.entity';
import { LIST_ACTION, DEFAULT_ADMIN_ROLE_NAME } from '../constants';
import { CreateRole } from '../dto/create.role.dto';
import { getConnection } from 'typeorm';
import { UpdateRole } from '../dto/udpate.role.dto';
import { ErrorCode } from '@/common/constants';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

interface TypeMap<T> {
  [key: string]: T;
}

@Injectable()
export class RolesService extends TypeOrmCrudService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRespository: Repository<PermissionEntity>,
  ) {
    super(repository);
  }

  async getPermissionsByRoles(roles) {
    const permissions = await this.permissionRespository.find({
      isActive: true,
    });

    if (roles.length === 0 || permissions.length === 0) {
      return {};
    }

    const rolePermissions = await this.rolePermissionRepository.find({
      where: {
        roleId: In(roles.map(role => role.id)),
        permissionId: In(permissions.map(permission => permission.id)),
      },
    });

    const grantList = {};
    const permMap: TypeMap<PermissionEntity> = permissions.reduce(
      (r, permission) => ({
        ...r,
        [permission.id]: permission,
      }),
      {},
    );
    const checkAdmin =
      roles.findIndex(r => r.code === DEFAULT_ADMIN_ROLE_NAME) > -1;
    if (checkAdmin) {
      permissions.forEach(p => {
        LIST_ACTION.forEach(a => {
          grantList[`${p.resource}@${a}`] = 1;
        });
      });
    } else {
      rolePermissions.forEach(rp => {
        const perm = permMap[rp.permissionId];
        LIST_ACTION.forEach(a => {
          if (rp[a] === 1 || rp[a] === true) {
            grantList[`${perm.resource}@${a}`] = 1;
          }
        });
      });
    }
    return grantList;
  }

  async create(payload: CreateRole) {
    const {
      code,
      title,
      isActive,
      description,
      permissions,
      typeRole,
    } = payload;
    const checkRole = await this.repository.findOne({
      code,
    });

    if (checkRole) {
      throw new BadRequestException([
        {
          target: payload,
          property: 'code',
          children: [],
          constraints: {
            code: ErrorCode.ROLE_CODE_DUPLICATE,
          },
        },
      ]);
    }
    const roleSave = await getConnection().transaction(async manager => {
      const mRole = manager.create(RoleEntity, {
        code,
        title,
        description,
        isActive,
        typeRole,
      });
      const role: RoleEntity = await manager.save(mRole);
      const roleId = role.id;
      if (permissions && Array.isArray(permissions)) {
        const lPermissions = [];
        permissions.forEach(p => {
          const per = p as any;
          if (per && per.id) {
            const grand = {
              roleId,
              permissionId: per.id,
            };
            LIST_ACTION.forEach(a => {
              grand[a] = per[a] === true || per[a] === 'true';
            });
            lPermissions.push(grand);
          }
        });
        const mRolePermissions = manager.create(
          RolePermissionEntity,
          lPermissions,
        );
        await manager.save(mRolePermissions);
      }
      return role;
    });
    return this.findOneById(roleSave.id);
  }

  async updateById(id: string, payload: UpdateRole) {
    const {
      code,
      title,
      isActive,
      description,
      permissions,
      typeRole,
    } = payload;
    const role = await this.repository.findOne({
      id,
    });
    if (!role) {
      throw new NotFoundException();
    }

    const checkRole = await this.repository
      .createQueryBuilder('role')
      .where('role.code = (:code) AND role.id <> (:id)', { code, id })
      .getOne();
    if (checkRole) {
      throw new BadRequestException([
        {
          target: payload,
          property: 'code',
          children: [],
          constraints: {
            code: ErrorCode.ROLE_CODE_DUPLICATE,
          },
        },
      ]);
    }
    await this.repository.update(id, {
      code,
      title,
      description,
      typeRole,
      isActive,
    });
    await getConnection().transaction(async manager => {
      const roleId = role.id;
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(RolePermissionEntity)
        .where('roleId = :roleId', { roleId })
        .execute();
      if (permissions && Array.isArray(permissions)) {
        const lPermissions = [];
        permissions.forEach(p => {
          const per = p as any;
          if (per && per.id) {
            const grand = {
              roleId,
              permissionId: per.id,
            };
            LIST_ACTION.forEach(a => {
              grand[a] = per[a] === true || per[a] === 'true';
            });
            lPermissions.push(grand);
          }
        });
        const mRolePermissions = manager.create(
          RolePermissionEntity,
          lPermissions,
        );
        await manager.save(mRolePermissions);
      }
    });
    return this.findOneById(role.id);
  }

  async findOneById(id: string) {
    const role = await this.repository.findOne({
      id,
    });

    const permissionMap = await this.permissionRespository.find({
      isActive: true,
    });

    const rolePermissions = await this.rolePermissionRepository.find({
      where: {
        roleId: role.id,
        permissionId: In(permissionMap.map(permission => permission.id)),
      },
    });

    const permMap: TypeMap<PermissionEntity> = rolePermissions.reduce(
      (r, permission) => ({
        ...r,
        [permission.permissionId]: permission,
      }),
      {},
    );

    const permissions = [];
    permissionMap.forEach(p => {
      let pr: any = permMap[p.id] || {
        create: false,
        update: false,
        delete: false,
        read: false,
        import: false,
        export: false,
      };

      if (role.code === DEFAULT_ADMIN_ROLE_NAME) {
        pr = {
          create: true,
          update: true,
          delete: true,
          read: true,
          import: true,
          export: true,
        };
      }

      if (pr.roleId) {
        delete pr.roleId;
      }
      if (pr.permissionId) {
        delete pr.permissionId;
      }
      permissions.push({
        ...p,
        ...pr,
      });
    });
    return { ...role, permissions };
  }

  findByCode(code) {
    return this.repository.find({
      where: {
        code,
        isActive: true,
      },
    });
  }
}
