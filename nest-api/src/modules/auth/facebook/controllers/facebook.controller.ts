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
import { FacebookService } from '../facebook.service';

@ApiTags('Authentication')
@Controller('auth/facebook')
export class FacebookController {
  constructor(
    @Inject(forwardRef(() => TokenService))
    private readonly tokenService: TokenService,
    private readonly facebookService: FacebookService,
  ) {}

  @ApiOperation({ summary: 'Connect with facebook' })
  // @UseGuards(AuthGuard('facebook-token'))
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       access_token: { type: 'string' },
  //     },
  //   },
  // })
  @Post()
  async connectWithFacebook(@Body() body) {
    const user = await this.facebookService.findOrCreate(body.data);
    return this.tokenService.login(user.id);
  }
}
