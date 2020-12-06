import { Injectable, Inject } from '@nestjs/common';
import { Strategy as GoogleTokenStrategy } from 'passport-token-google2';
import { use } from 'passport';
import { GoogleConfig, GOOGLE_CONFIG_KEY } from './google.config';
import { GoogleService } from './google.service';

@Injectable()
export class GoogleStrategy {
  static PROVIDE_NAME = 'GOOGLE_STRATEGY';

  constructor(
    @Inject(GOOGLE_CONFIG_KEY)
    private readonly config: GoogleConfig,
    private readonly googleService: GoogleService,
  ) {
    this.init();
  }

  init() {
    use(
      new GoogleTokenStrategy(
        {
          clientID: this.config.clientId,
          clientSecret: this.config.clientSecret,
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: any,
        ) => {
          const user = await this.googleService.findOrCreate(profile);
          return done(null, { sub: user.id });
        },
      ),
    );
  }
}
