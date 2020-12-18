import { Module, DynamicModule, Type } from '@nestjs/common';
import { TokenService } from '../token.service';
import { GoogleStrategy } from './google.strategy';
import { GoogleController } from './controllers/google.controller';
import { GoogleService } from './google.service';
import { GoogleConfig, GOOGLE_CONFIG_KEY } from './google.config';
import { UserGoogleEntity } from './entities/google.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForwardReference } from '@nestjs/common/interfaces';

@Module({})
export class GoogleModule {
  public static CONFIG = 'GOOLE_MODULE_CONFIG';

  static register(
    config: GoogleConfig,
    imports: Array<
      Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
    > = [],
  ): DynamicModule {
    return {
      module: GoogleModule,
      imports: [
        TypeOrmModule.forFeature([UserGoogleEntity]),
        ...imports,
      ],
      providers: [
        GoogleService,
        GoogleStrategy,
        {
          provide: GOOGLE_CONFIG_KEY,
          useValue: config,
        },
        TokenService,
      ],
      controllers: [GoogleController],
    };
  }
}
