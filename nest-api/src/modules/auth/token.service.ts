import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as uuid from 'uuid';
import { TokenResponse } from './token.response';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class TokenService {
  static REFRESH_TOKEN_PREFIX = 'refresh ';

  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) { }

  async revokeRefreshToken(token: string): Promise<void> {
    await this.redisService
      .getClient()
      .del(TokenService.REFRESH_TOKEN_PREFIX + token);
  }

  async createRefreshToken(id: number): Promise<string> {
    const refreshToken = uuid.v4();
    await this.redisService
      .getClient()
      .set(TokenService.REFRESH_TOKEN_PREFIX + refreshToken, id);
    return refreshToken;
  }

  async login(id: number): Promise<TokenResponse> {
    const roles = ['admin'];
    const payload = { sub: id, roles };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: await this.createRefreshToken(id),
    };
  }

  async refresh(token: string): Promise<TokenResponse> {
    const userId = await this.redisService
      .getClient()
      .get(TokenService.REFRESH_TOKEN_PREFIX + token);

    if (!userId) {
      throw new ForbiddenException();
    }

    await this.revokeRefreshToken(token);
    return await this.login(parseInt(userId, 0));
  }
}
