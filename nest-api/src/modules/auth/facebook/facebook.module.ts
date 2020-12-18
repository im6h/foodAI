import { Module, DynamicModule, Type } from '@nestjs/common';
import { TokenService } from '../token.service';
import { FacebookStrategy } from './facebook.strategy';
import { FacebookController } from './controllers/facebook.controller';
import { FacebookService } from './facebook.service';
import { FacebookConfig, FACEBOOK_CONFIG_KEY } from './facebook.config';
import { UserFacebookEntity } from './entities/facebook.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForwardReference } from '@nestjs/common/interfaces';

@Module({})
export class FacebookModule {
  public static CONFIG = 'FACEBOOK_MODULE_CONFIG';

  static register(
    config: FacebookConfig,
    imports: Array<
      Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
    > = [],
  ): DynamicModule {
    return {
      module: FacebookModule,
      imports: [
        TypeOrmModule.forFeature([UserFacebookEntity]),
        ...imports,
      ],
      providers: [
        FacebookService,
        FacebookStrategy,
        {
          provide: FACEBOOK_CONFIG_KEY,
          useValue: config,
        },
        TokenService,
      ],
      controllers: [FacebookController],
    };
  }
}
