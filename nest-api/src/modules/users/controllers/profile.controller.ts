import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  CurrentUser,
  TokenGuard,
  UserIdentity,
} from '@/modules/auth/auth.decorator';

import { UserEntity } from '../entities/user.entity';
import { UpdateProfileForm } from '../forms/update-profile.forms';
import { ProfileService } from '../services';
import { title } from 'process';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiBearerAuth()
  @ApiOperation({ tags: ['Get current profile'] })
  @UseGuards(TokenGuard)
  @Get()
  async currentProfile(@CurrentUser() identity: UserIdentity): Promise<any> {
    const user = await this.profileService.fetchCurrent(identity);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  @ApiBearerAuth()
  @ApiOperation({ tags: ['Update profile'] })
  @Post()
  @UseGuards(TokenGuard)
  async update(
    @CurrentUser() identity: UserIdentity,
    @Body() payload: UpdateProfileForm,
  ) {
    await this.profileService.update(identity, payload);
    const user = await this.profileService.fetchCurrent(identity);
    return user;
  }

  // @ApiBearerAuth()
  // @ApiOperation({ tags: ['Update avatar of current profile'] })
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       avatar: {
  //         type: 'string',
  //         format: 'binary',
  //         description: 'new avatar file',
  //       },
  //     },
  //     required: ['avatar'],
  //   },
  // })
  // @Post('avatar')
  // @UseInterceptors(FileInterceptor('avatar'))
  // @UseGuards(TokenGuard)
  // async updateAvatar(
  //   @CurrentUser() identity: UserIdentity,
  //   @UploadedFile() file,
  // ) {
  //   return this.profileService.updateAvatar(identity, file);
  // }

  // @Get('/encrypt')
  // @ApiBearerAuth()
  // @UseGuards(TokenGuard)
  // async encrypt(
  //   @CurrentUser() identity: UserIdentity,
  // ) {
  //   const userToken = {
  //     time: moment().valueOf(),
  //     userId: identity.sub,
  //     role: identity.role,
  //   };

  //   return {
  //     token: encrypt(JSON.stringify(userToken)),
  //   };
  // }
}
