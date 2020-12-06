import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TokenGuard } from '@/modules/auth/auth.decorator';
import { EstateService } from '../services/estate.service';
import { EstateCreate } from '../dto/estate.create.dto';
import { UserIdentity, CurrentUser } from '../../auth/auth.decorator';
import { Pagination } from '@/custom/dtos/pagination';
@ApiTags('Estate')
@UseGuards(TokenGuard)
@ApiBearerAuth()
@Controller('estate')
export class EstateController {
  constructor(private readonly estateService: EstateService) {}

  @Get()
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy về danh sách bất động sản đã lưu dựa vào userId',
  })
  @HttpCode(HttpStatus.OK)
  async getEstates(
    @CurrentUser() identity: UserIdentity,
    @Query() pagination: Pagination,
  ): Promise<object> {
    return await this.estateService.findByUserId(identity, pagination);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Lưu một bất động sản vào danh sách cá nhân',
  })
  @HttpCode(HttpStatus.CREATED)
  async addEstate(
    @CurrentUser() identity: UserIdentity,
    @Body() payload: EstateCreate,
  ) {
    return await this.estateService.add(identity, payload);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Bỏ lưu một bất động sản',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeEstate(
    @CurrentUser() identity: UserIdentity,
    @Param() paramrs: any,
  ): Promise<void> {
    return await this.estateService.remove(identity, paramrs.id);
  }
}
