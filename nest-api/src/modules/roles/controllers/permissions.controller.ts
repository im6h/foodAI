import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TokenGuard } from '@/modules/auth/auth.decorator';
// import { InitRoleService } from '../services/init-role.service';
import { Crud } from '@nestjsx/crud';
import { PermissionsService } from '../services/permissions.service';
import { PermissionEntity } from '../entities/permission.entity';

@ApiTags('Roles')
@Crud({
  model: {
    type: PermissionEntity,
  },
  routes: {
    only: [
      'getManyBase',
      'getOneBase',
      'createOneBase',
      'updateOneBase',
      'deleteOneBase',
    ],
    getManyBase: {
      decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
    },
    createOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
    },
    getOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
    },
    updateOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
    },
    deleteOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
    },
  },
})
@Controller('permissions')
export class PermissionsController {
  constructor(public readonly service: PermissionsService) {}
}
