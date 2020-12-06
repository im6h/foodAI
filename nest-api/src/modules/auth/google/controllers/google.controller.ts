import {
  Controller,
  Post,
  UseGuards,
  forwardRef,
  Inject,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';
import { TokenResponse } from '../../token.response';
import { AuthGuard } from '@nestjs/passport';
import { TokenService } from '../../token.service';
import { CurrentUser, UserIdentity } from '../../auth.decorator';
import { GoogleService } from '../google.service';
import { UserEntity } from '@/modules/users/entities/user.entity';

@ApiTags('Authentication')
@Controller('auth/google')
export class GoogleController {
  constructor(
    @Inject(forwardRef(() => TokenService))
    private readonly tokenService: TokenService,
    private readonly googleService: GoogleService,
  ) {}

  @ApiOperation({ summary: 'Connect with google' })
  // @UseGuards(AuthGuard('google-token'))
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       access_token: { type: 'string' },
  //     },
  //   },
  // })
  @Post()
  async connectWithGoogle(@Body() body) {
    const user = await this.googleService.findOrCreate(body.data);
    return this.tokenService.login(user.id);
  }
}
