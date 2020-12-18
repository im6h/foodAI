import { Controller, UseGuards, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TokenGuard } from '@/modules/auth/auth.decorator';
import { RolesService } from '../services/roles.service';
import { Crud } from '@nestjsx/crud';
import { RoleEntity } from '../entities/role.entity';
import { CreateRole } from '../dto/create.role.dto';
import { UpdateRole } from '../dto/udpate.role.dto';
import { RoleParam } from '../dto/query.role.dto';

@ApiTags('Roles')
@Crud({
  params: {
    id: {
      type: 'uuid',
      field: 'id',
      primary: true,
    },
  },
  model: {
    type: RoleEntity,
  },
  query: {
    join: {
      brand: {
        eager: true,
        required: false,
      },
    },
  },
  routes: {
    only: [
      'getManyBase',
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
@Controller('roles')
export class RolesController {
  constructor(
    public readonly service: RolesService,
    // private readonly initRoleService: InitRoleService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @Post()
  @ApiOperation({ summary: 'Create role.' })
  public async create(@Body() body: CreateRole) {
    return await this.service.create(body);
  }

  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update' })
  public async udpateOne(@Param() params: RoleParam, @Body() body: UpdateRole) {
    const { id } = params;
    return await this.service.updateById(id, body);
  }

  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get role.' })
  public async getOne(@Param() params: RoleParam) {
    const { id } = params;
    return await this.service.findOneById(id);
  }
}
