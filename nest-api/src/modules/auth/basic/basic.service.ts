import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';

import { TokenResponse } from '../token.response';
import { TokenService } from '../token.service';
import { BasicForm } from './forms/basic.form';
import { UserBasicEntity } from './entities/basic.entity';
import { ChangePasswordForm } from './forms/change-password.form';
import { UsersService } from '@/modules/users/services';
import { MailerService } from '@nest-modules/mailer';
import { TokenEntity } from './entities/token.entity';
import {
  STATUS_IN_ACTIVE,
  STATUS_DECLINE,
  STATUS_PENDING,
} from '@/modules/users/constants';
import { ErrorCode } from '@/common/constants';
import { Config } from '@/config';
import { makeRandomNumber } from '@/utils/string';
import { activeMailHtml } from '@/utils/activeMailHtml';
import {validateEmail, validateUsername} from '@/utils/validate';

@Injectable()
export class BasicService {
  constructor(
    @InjectRepository(UserBasicEntity)
    private readonly basicRepository: Repository<UserBasicEntity>,

    private readonly usersService: UsersService,

    private readonly tokenService: TokenService,

    private readonly mailerService: MailerService,
  ) {}

  async findById(userId: number): Promise<UserBasicEntity | undefined> {
    const userByUserId = await this.basicRepository.findOne({
      where: {
        id: userId,
      },
      // select: ['userId', 'password'],
    });
    return userByUserId;
  }

  async findIdentity(credential: string): Promise<UserBasicEntity | undefined> {
    const userByUsername = await this.basicRepository.findOne({
      where: {
        username: credential,
      },
    });

    if (userByUsername) {
      return userByUsername;
    } else {
      const userByEmail = await this.basicRepository.findOne({
        where: {
          email: credential,
        },
      });
      if (userByEmail) {
        return userByEmail;
      }
    }
    return null;
  }

  async findIdentityByEmail(
    email: string,
  ): Promise<UserBasicEntity | undefined> {
    const model = await this.basicRepository.findOne({
      where: {
        email,
      },
    });

    return model;
  }

  async compareHash(plaintext: string, cyphertext: string): Promise<boolean> {
    // bcrypt
    if (cyphertext.includes('$')) {
      return bcrypt.compareSync(plaintext, cyphertext);
    }

    const md5 = crypto
      .createHash('md5')
      .update(plaintext)
      .digest('hex');
    return md5 === cyphertext;
  }

  async authenticate(payload: BasicForm): Promise<TokenResponse> {
    if (!validateUsername(payload.uid) && !validateEmail(payload.uid)) {
      throw new BadRequestException({
        payload: {
          message: ErrorCode.USERNAME_INVALID,
        },
      });
    }
    const user = await this.findIdentity(payload.uid);
    if (!user) {
      throw new BadRequestException({
        payload: {
          message: ErrorCode.ACCOUNT_PASSWORD_INVALID,
        },
      });
    }

    const isEqual = await this.compareHash(payload.password, user.password);
    if (!isEqual) {
      throw new BadRequestException([
        {
          payload: {
            message: ErrorCode.ACCOUNT_PASSWORD_INVALID,
          },
        },
      ]);
    }

    return await this.tokenService.login(user.id);
  }

  async changePassword(
    userId: number,
    payload: ChangePasswordForm,
  ): Promise<any> {
    const basicProfile = await this.basicRepository.findOne({
      where: {
        userId,
      },
    });

    if (!basicProfile) {
      throw new NotFoundException({
        payload: {
          message: ErrorCode.ACCOUNT_NOT_EXISTS,
        },
      });
    }

    // validate old password
    const isEqual = await this.compareHash(
      payload.currentPassword,
      basicProfile.password,
    );
    if (!isEqual) {
      throw new BadRequestException({
        payload: {
          message: ErrorCode.PASSWORD_INVALID,
        },
      });
    }

    basicProfile.password = payload.newPassword;
    await this.basicRepository.update(
      {
        id: userId,
      },
      {
        password: bcrypt.hashSync(payload.newPassword, 12),
      },
    );
    return {
      payload: {
        message: 'change_password_ok',
      },
    };
  }
  async sendEmail(foundBasic: UserBasicEntity) {
    return await getConnection().transaction(async manager => {
      const newPassword = makeRandomNumber(9);
      await manager.update(
        UserBasicEntity,
        { userId: foundBasic.id },
        { password: bcrypt.hashSync(newPassword, 12) },
      );
      this.mailerService
        .sendMail({
          to: foundBasic.email,
          from: Config.EMAIL_FROM,
          subject: 'New password',
          text: 'New Password',
          html: `New password ${newPassword}`,
        })
        .catch(e => {
          console.log(e);
        });
    });
  }

  async forgotPassword(email: string) {
    const foundBasic = await this.basicRepository.findOne({ email });
    if (!foundBasic) {
      throw new NotFoundException({
        payload: {
          message: ErrorCode.ACCOUNT_NOT_EXISTS,
        },
      });
    }
    await this.sendEmail(foundBasic);
    return {
      payload: {
        message: 'send_mail_ok',
      },
    };
  }
}
