import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import axios from 'axios';
import _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';

import { TokenResponse } from '../token.response';
import { TokenService } from '../token.service';
import { ZaloForm } from './forms/zalo.form';
import { UserZaloEntity } from './entities/zalo.entity';
import { UsersService } from '@/modules/users/services';
import { STATUS_ACTIVE, TYPE_ZALO } from '@/modules/users/constants';
import { UserEntity } from '../../users/entities/user.entity';
import { ZALO_CONFIG_KEY, ZaloConfig } from './zalo.config';

@Injectable()
export class ZaloService {
  private zaloApiMe: string = 'https://graph.zalo.me/v2.0/me';
  private zaloAccessCode: string = 'https://oauth.zaloapp.com/v3/access_token';

  constructor(
    @InjectRepository(UserZaloEntity)
    private readonly zaloRepository: Repository<UserZaloEntity>,
    @Inject(ZALO_CONFIG_KEY)
    private readonly config: ZaloConfig,

    private readonly usersService: UsersService,

    private readonly tokenService: TokenService,
  ) {}

  async authenticate(payload: ZaloForm): Promise<TokenResponse> {
    const zaloInfo = await this.getZaloAccessToken(payload);
    const zaloUser = await this.zaloRepository.findOne({
      zaloId: zaloInfo.id,
    });

    if (zaloUser) {
      const user = await this.usersService.findOne({
        id: zaloUser.userId,
        status: STATUS_ACTIVE,
      });
      return await this.tokenService.login(user.id);
    }
    return await getConnection().transaction(async manager => {
      // const avatar =
      //   (zaloInfo.picture &&
      //     zaloInfo.picture.data &&
      //     zaloInfo.picture.data.url) ||
      //   '';
      // let [firstName, lastName] = zaloInfo.name.split(' ');

      let firstName = zaloInfo.name;
      let lastName = zaloInfo.name;
      const userProfile = manager.create(UserEntity, {
        firstName,
        lastName,
        email: '',
        status: STATUS_ACTIVE,
        type: TYPE_ZALO,
      });

      const account: UserEntity = await manager.save(userProfile);
      const socialAccount = manager.create(UserZaloEntity, {
        zaloId: zaloInfo.id,
        userId: account.id,
        data: zaloInfo,
      });

      await manager.save(socialAccount);

      return await this.tokenService.login(account.id);
    });
  }

  async fetchZaloInfo(accessToken: string, payload: ZaloForm): Promise<any> {
    const url = `${
      this.zaloApiMe
    }?fields=id%2Cbirthday%2Cname%2Cgender%2Cpicture&access_token=${accessToken}`;
    const zaloInfo = await axios.get(url);

    if (zaloInfo.data && !zaloInfo.data.error) {
      return zaloInfo.data;
    }

    const message =
      (zaloInfo && zaloInfo.data && zaloInfo.data.message) ||
      'Can not login with zalo';
    throw new BadRequestException([
      {
        target: payload,
        property: 'access_token',
        children: [],
        constraints: {
          invalid: message,
        },
      },
    ]);
  }

  async getZaloAccessToken(payload: ZaloForm): Promise<any> {
    const url = `${this.zaloAccessCode}?app_id=${
      this.config.clientId
    }&app_secret=${this.config.clientSecret}&code=${payload.access_token}`;
    const getToken = await axios.get(url);
    if (getToken.data && !getToken.data.error) {
      return this.fetchZaloInfo(getToken.data.access_token, payload);
    }

    const message =
      (getToken && getToken.data && getToken.data.error_description) ||
      'Can not login with zalo';
    throw new BadRequestException([
      {
        target: payload,
        property: 'access_token',
        children: [],
        constraints: {
          invalid: message,
        },
      },
    ]);
  }
}
