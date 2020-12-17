import { Pagination } from '@/custom/dtos/pagination';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser, TokenGuard, UserIdentity } from '../auth/auth.decorator';
import { ImagesService } from './images.service';
import { ImagesBodyPostForm } from './images.form';

@ApiTags('Images')
@UseGuards(TokenGuard)
@ApiBearerAuth()
@Controller('images')
export class ImagesController {
  constructor(private readonly service: ImagesService) {}

  @Get()
  async getImages(
    @CurrentUser() identity: UserIdentity,
    @Query() pagination: Pagination,
  ) {
    const res = await this.service.getImages(identity, pagination);
    return res;
  }

  @Post()
  async uploadImage(
    @CurrentUser() identity: UserIdentity,
    @Body() payload: ImagesBodyPostForm,
  ) {
    const res = await this.service.uploadImage(identity, payload.link);
    return res;
  }
}
