import { Module } from '@nestjs/common';

import { RECAPTCHA_CONFIG_KEY, ReCaptChaConfig } from './recaptcha.config';

import { ReCaptChaService } from './recaptcha.service';

const reCaptChaConfig: ReCaptChaConfig = {
  reCaptChaSecret: process.env.CAPTCHA_SECRET,
};
@Module({
  imports: [],
  controllers: [],
  providers: [
    ReCaptChaService,
    {
      provide: RECAPTCHA_CONFIG_KEY,
      useValue: reCaptChaConfig,
    },
  ],
  exports: [ReCaptChaService],
})
export class ReCapChaModule {}
