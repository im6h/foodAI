import { createParamDecorator } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export interface UserIdentity {
  sub: number;
  role: string;
}

export const CurrentUser = createParamDecorator((data, req) => {
  return {
    ...req.user,
    role: req.headers.role,
  };
});

export const TokenGuard = AuthGuard('jwt');
