import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as uuid from 'uuid';

import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserIdentity } from '../../auth/auth.decorator';
import { UpdateProfileForm } from '../forms/update-profile.forms';
import { RolesService } from '../../roles/services/roles.service';
import { UserBasicEntity } from '@/modules/auth/basic/entities/basic.entity';
import { ErrorCode } from '@/common/constants';

export interface FileInfo {
  fieldname: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserBasicEntity)
    private basicRepository: Repository<UserBasicEntity>,
  ) {}

  async fetchCurrent(identity: UserIdentity) {
    const userBasic = await this.basicRepository.findOne({
      where: { id: identity.sub },
      select: [
        'email',
        'username',
        'age',
        'timeEat',
        'dateOfBirth',
        'width',
        'height',
      ],
    });

    if (!userBasic) {
      throw new NotFoundException({
        message: ErrorCode.USER_NOT_EXISTS,
      });
    }
    return userBasic;
  }

  /**
   * Update Profile
   */
  async update(user: UserIdentity, profile: UpdateProfileForm): Promise<any> {
    await this.basicRepository.update(user.sub, profile);
    const userUpdate = await this.basicRepository.findOne({
      where: {
        id: user.sub,
      },
      select: [
        'email',
        'username',
        'age',
        'timeEat',
        'dateOfBirth',
        'width',
        'height',
      ],
    });
    return userUpdate;
  }

  async updateAvatar(identity: UserIdentity, file: FileInfo) {
    // const user = await this.fetchCurrent(identity);
    // const oldAvatar = user.avatar;
    // // fs.writeFile();
    // const name = '/users/' + uuid.v4() + '.jpg';
    // fs.writeFileSync(process.env.ASSET_DIR + name, file.buffer);
    // if (oldAvatar) {
    //   fs.unlink(process.env.ASSET_DIR + user.avatar, () => {
    //     // old
    //   });
    // }
    // await this.userRepository.update(user.id, {
    //   avatar: name,
    // });
  }
}
