import { BadRequestException, Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { UsersService } from '@/modules/users/services';
import { Repository, getConnection } from 'typeorm';
import { UserGoogleEntity } from './entities/google.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { STATUS_ACTIVE, TYPE_GOOGLE } from '@/modules/users/constants';

@Injectable()
export class GoogleService {
  constructor(
    @InjectRepository(UserGoogleEntity)
    private readonly googleRepository: Repository<UserGoogleEntity>,
    private readonly usersService: UsersService,
  ) {}

  async findOrCreate(profile: any): Promise<UserEntity> {
    // const userBase = await this.usersService.findOne({
    //   email: profile.profileObj.email,
    // });
    // if (userBase) {
    //   throw new BadRequestException([
    //     {
    //       target: profile.profileObj,
    //       property: 'email',
    //       children: [],
    //       constraints: {
    //         invalid: 'Mail đã được sử dụng',
    //       },
    //     },
    //   ]);
    // }
    const googleInfo = await this.googleRepository.findOne({
      googleId: profile.profileObj.googleId,
    });

    // login as google
    if (googleInfo) {
      return await this.usersService.findOne({
        id: googleInfo.userId,
        status: STATUS_ACTIVE,
      });
    }

    return await getConnection().transaction(async manager => {
      // const avatar = (profile._json && profile._json.picture) || '';

      const userProfile = manager.create(UserEntity, {
        firstName: profile.profileObj.familyName,
        lastName: profile.profileObj.givenName,
        email: profile.profileObj.email,
        type: TYPE_GOOGLE,
        status: STATUS_ACTIVE,
      });

      const account: UserEntity = await manager.save(userProfile);
      const socialAccount = manager.create(UserGoogleEntity, {
        googleId: profile.profileObj.googleId,
        userId: account.id,
        data: profile.profileObj,
      });

      await manager.save(socialAccount);

      return account;
    });
  }
}
