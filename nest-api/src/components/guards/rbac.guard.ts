import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  RbacService,
  IRole,
  ParamsFilter,
  RBAC_REQUEST_FILTER,
} from 'nestjs-rbac';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class RBAcGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rbacService: RbacService, // @InjectRepository(UserEntity) // private userRepository: Repository<UserEntity>,
  ) // tslint:disable-next-line: one-line
  {
    //
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: IRole = request.user;

    if (!user) {
      throw new ForbiddenException('Getting user was failed.');
    }

    const permissions = this.reflector.get<string[]>(
      'RBACPermissions',
      context.getHandler(),
    );

    if (!permissions) {
      throw new ForbiddenException('Bad permission.');
    }

    try {
      const userF = await getRepository(UserEntity).findOne({
        where: { id: request.user.sub },
        relations: ['roles'],
      });
      if (
        !userF.roles ||
        !Array.isArray(userF.roles) ||
        userF.roles.length <= 0
      ) {
        throw new ForbiddenException('Access denny. No role');
      }

      const filter = new ParamsFilter();
      filter.setParam(RBAC_REQUEST_FILTER, { ...request });

      for (const role of userF.roles) {
        const checkRole = (await this.rbacService.getRole(
          role.code,
          filter,
        )).can(...permissions);

        if (checkRole) {
          return true;
        }
      }
      return false;
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }
}
