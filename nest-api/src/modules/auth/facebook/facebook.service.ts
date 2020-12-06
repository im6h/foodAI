import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { UsersService } from '@/modules/users/services';
import { Repository, getConnection } from 'typeorm';
import { UserFacebookEntity } from './entities/facebook.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { STATUS_ACTIVE, TYPE_FACEBOOK } from '@/modules/users/constants';

@Injectable()
export class FacebookService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(UserFacebookEntity)
    private readonly facebookRepository: Repository<UserFacebookEntity>,
  ) {}

  async findOrCreate(profile: any): Promise<UserEntity> {
    console.log('profile', profile);
    const facebook = await this.facebookRepository.findOne({
      facebookId: profile.id,
    });

    // login as facebook
    if (facebook) {
      return await this.usersService.findOne({
        id: facebook.userId,
        status: STATUS_ACTIVE,
      });
    }

    return await getConnection().transaction(async manager => {
      // const avatar = _.get(profile, 'photos[0]?.value');

      const userProfile = manager.create(UserEntity, {
        firstName: profile.name,
        lastName: profile.name,
        email: profile.email,
        type: TYPE_FACEBOOK,
        status: STATUS_ACTIVE,
      });

      const account: UserEntity = await manager.save(userProfile);
      const socialAccount = manager.create(UserFacebookEntity, {
        facebookId: profile.id,
        userId: account.id,
        data: profile,
      });

      await manager.save(socialAccount);

      return account;
    });
  }
}
