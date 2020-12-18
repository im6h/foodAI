import { Controller, Post, Body } from '@nestjs/common';
import { ZaloForm } from '../forms/zalo.form';
import { ZaloService } from '../zalo.service';
import { TokenResponse } from '../../token.response';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth/zalo')
export class ZaloController {
  constructor(private readonly zaloService: ZaloService) {}

  @ApiOperation({ summary: 'Login with zalo token' })
  @Post()
  async login(@Body() payload: ZaloForm): Promise<TokenResponse> {
    return await this.zaloService.authenticate(payload);
  }
}
