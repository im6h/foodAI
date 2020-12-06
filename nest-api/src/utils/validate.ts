import { ErrorCode } from '@/common/constants';
import { BadRequestException } from '@nestjs/common';

export function validateEmail(validateString: string): boolean {
  const regexString = new RegExp(
    '^[a-z][a-z0-9_.]{1,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$',
  );
  if (validateString === undefined || !validateString) {
    throw new BadRequestException({
      target: validateString,
      property: 'username',
      error: {
        message: ErrorCode.EMAIL_INVALID,
      },
    });
  }
  const result = regexString.exec(validateString);
  if (result) {
    return true;
  }
  return false;
}

export function validatePassword(validateString: string): boolean {
  if (validateString === undefined || !validateString) {
    throw new BadRequestException({
      target: validateString,
      property: 'password',
      error: {
        message: ErrorCode.PASSWORD_INVALID,
      },
    });
  }
  if (validateString.length > 7) {
    return true;
  }
  return false;
}

export function validateUsername(validateString: string): boolean {
  const regexString = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;
  if (validateString === undefined) {
    throw new BadRequestException({
      target: validateString,
      property: 'email',
      error: {
        message: ErrorCode.USERNAME_INVALID,
      },
    });
  }
  const result = regexString.exec(validateString);
  if (result) {
    return true;
  }
  return false;
}
