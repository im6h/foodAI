import { Injectable, Inject } from '@nestjs/common';
import axios from 'axios';
import { RECAPTCHA_CONFIG_KEY, ReCaptChaConfig } from './recaptcha.config';

@Injectable()
export class ReCaptChaService {
  constructor(
    @Inject(RECAPTCHA_CONFIG_KEY) private readonly config: ReCaptChaConfig,
  ) {}

  async checkToken({ ggReCaptCha }): Promise<boolean> {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${
      this.config.reCaptChaSecret
    }&response=${ggReCaptCha}`;
    const res = await axios.post(url);
    return res.data.success === true;
  }
}
