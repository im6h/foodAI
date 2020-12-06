import { Injectable, BadRequestException } from '@nestjs/common';
import {
  RegisterForm,
  ActiveForm,
  ActiveTokenForm,
  ResendTokenForm,
} from './register.form';
import { BasicService } from '../basic/basic.service';
import { getConnection } from 'typeorm';
import { UserBasicEntity } from '../basic/entities/basic.entity';
import { ErrorCode } from '@/common/constants';
import { validateEmail, validateUsername } from '@/utils/validate';
@Injectable()
export class RegisterService {
  constructor(private readonly basicService: BasicService) {}

  async check(payload: RegisterForm): Promise<boolean> {
    // check username is exist
    const username = await this.basicService.findIdentity(payload.username);
    // check email is exist
    const email = await this.basicService.findIdentityByEmail(payload.email);

    if (username) {
      throw new BadRequestException({
        payload: {
          message: ErrorCode.ACCOUNT_EXIST,
        },
      });
    }
    if (email) {
      throw new BadRequestException({
        payload: {
          message: ErrorCode.EMAIL_EXISTS,
        },
      });
    }
    return true;
  }

  async create(payload: RegisterForm) {
    if (!validateUsername(payload.username)) {
      throw new BadRequestException({
        message: ErrorCode.USERNAME_INVALID,
      });
    }
    if (!validateEmail(payload.email)) {
      throw new BadRequestException({
        message: ErrorCode.EMAIL_INVALID,
      });
    }
    // check username and email is exist
    const check = await this.check(payload);
    // create user in basic user
    if (check) {
      return await getConnection().transaction(async manager => {
        const basic = manager.create(UserBasicEntity, {
          ...payload,
        });

        await manager.save(basic);
        return {
          message: 'create_ok',
        };
      });
    }
  }
}
