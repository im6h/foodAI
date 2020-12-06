import { Module, CacheModule } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { AuthModule } from '@/modules/auth/auth.module';
import { TerminusModuleRegister } from '@/components/monitors';
import { MailerRegister } from '@/components/mailer/mailer.register';
import { AppService } from './app.service';
import { ImagesModule } from '@/modules/images/images.module';
@Module({
  imports: [
    RedisModule.register({
      url: process.env.REDIS_URL,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      charset: 'utf8mb4',
      synchronize: true,
      logging: true,
    }),
    CacheModule.register(),
    TerminusModuleRegister,
    MailerRegister,
    ImagesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService],
  exports: [RedisModule],
})
export class AppModule {}
