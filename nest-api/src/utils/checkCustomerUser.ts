import { BadRequestException } from '@nestjs/common';
import { ErrorCode } from '@/common/constants';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { getRepository } from 'typeorm';

export const checkCustomerUser = async (payload) => {
  const foundUserEmail = await getRepository(UserEntity).findOne({ email: payload.email });
  const foundUserPhone = await getRepository(UserEntity).findOne({ phoneNumber: payload.phoneNumber });
  if (foundUserEmail && foundUserPhone) {
    throw new BadRequestException([
      {
        target: payload,
        property: 'email',
        children: [],
        constraints: {
          email: ErrorCode.CUSTOMER_DUPLICATE_EMAIL,
        },
      },
      {
        target: payload,
        property: 'phoneNumber',
        children: [],
        constraints: {
          phoneNumber: ErrorCode.CUSTOMER_DUPLICATE_PHONE,
        },
      },
    ]);
  }
  if (foundUserEmail) {
    throw new BadRequestException([
      {
        target: payload,
        property: 'email',
        children: [],
        constraints: {
          email: ErrorCode.CUSTOMER_DUPLICATE_EMAIL,
        },
      },
    ]);
  }
  if (foundUserPhone) {
    throw new BadRequestException([
      {
        target: payload,
        property: 'phoneNumber',
        children: [],
        constraints: {
          phoneNumber: ErrorCode.CUSTOMER_DUPLICATE_PHONE,
        },
      },
    ]);
  }
};
