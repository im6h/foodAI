import {
  Controller,
  Delete,
  Param,
  UseGuards,
  Patch,
  Body,
  Post,
  Put,
  Query,
  Get,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserEntity } from '../entities/user.entity';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { DeleteUserForm } from '../forms/delete-user.form';
import {
  TokenGuard,
  CurrentUser,
  UserIdentity,
} from '../../auth/auth.decorator';
import { UpdateUser } from '../dto/user.update.dto';
import { UpdateStatusUser } from '../dto/user.updateStatus.dto';
import { UpdateUserParam } from '../dto/user.update.param.dto';
import { CreateUser } from '../dto/user.create.dto';
import { UserListQueryClient } from '../dto/user.list.dto';
import { Pagination } from '@/custom/dtos/pagination';
/* tslint:disable */
// @ApiTags('Users')
// @Crud({
//   model: {
//     type: UserEntity,
//   },
//   query: {
//     join: {
//       basic: {
//         eager: true,
//         required: false,
//       },
//       roles: {
//         eager: true,
//         required: false,
//       },
//     },
//   },
//   routes: {
//     only: ['getOneBase'],
//     getOneBase: {
//       decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
//     },
//   },
// })
/* tslint:enable */
@Controller('users')
export class UsersController {
  // constructor(public service: UsersService) {}
  // @ApiBearerAuth()
  // @UseGuards(TokenGuard)
  // @ApiOperation({ summary: 'Create one User' })
  // @Post()
  // async create(@Body() body: CreateUser) {
  //   return await this.service.create(body);
  // }
  // @ApiBearerAuth()
  // @UseGuards(TokenGuard)
  // @ApiOperation({ summary: 'Get many user' })
  // @Get()
  // async getMany(
  //   @Query() pagination: Pagination,
  //   @Query() query: UserListQueryClient,
  //   @CurrentUser() identity: UserIdentity,
  // ) {
  //   return await this.service.getManyUser(pagination, query, identity);
  // }
  // @ApiBearerAuth()
  // @UseGuards(TokenGuard)
  // @ApiOperation({ summary: 'Get many user by role' })
  // @Get('/by-roles')
  // async getManyByRole(
  //   @Query() pagination: Pagination,
  //   @Query() query: UserListQueryClient,
  // ) {
  //   return await this.service.getManyUserByRole(pagination, query);
  // }
  // @ApiBearerAuth()
  // @UseGuards(TokenGuard)
  // @Put(':id')
  // @ApiOperation({ summary: 'approve' })
  // public async approve(
  //   @Param() params: UpdateUserParam,
  //   @Body() body: UpdateStatusUser,
  // ) {
  //   const { id } = params;
  //   return await this.service.approve(id, body);
  // }
  // @ApiBearerAuth()
  // @UseGuards(TokenGuard)
  // @Patch(':id')
  // @ApiOperation({ summary: 'Change one UserEntity' })
  // public async update(
  //   @Param() params: UpdateUserParam,
  //   @Body() body: UpdateUser,
  // ) {
  //   const { id } = params;
  //   return await this.service.update(id, body);
  // }
  // @ApiBearerAuth()
  // @UseGuards(TokenGuard)
  // @ApiOperation({ summary: 'Delete one User' })
  // @Delete(':id')
  // async deteleUser(@Param() params: DeleteUserForm) {
  //   const { id } = params;
  //   return await this.service.deleteUser(id);
  // }
}
