import { Injectable, Inject } from '@nestjs/common';
import FacebookTokenStrategy = require('passport-facebook-token');
import { use } from 'passport';
import { FacebookService } from './facebook.service';
import { FacebookConfig, FACEBOOK_CONFIG_KEY } from './facebook.config';

@Injectable()
export class FacebookStrategy {
  static PROVIDE_NAME = 'FACEBOOK_STRATEGY';

  constructor(
    @Inject(FACEBOOK_CONFIG_KEY)
    private readonly config: FacebookConfig,
    private readonly facebookService: FacebookService,
  ) {
    this.init();
  }

  init() {
    use(
      new FacebookTokenStrategy(
        {
          clientID: this.config.clientId,
          clientSecret: this.config.clientSecret,
          fbGraphVersion: 'v5.0',
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: any,
        ) => {
          const user = await this.facebookService.findOrCreate(profile);
          return done(null, { sub: user.id });
        },
      ),
    );
  }
}
