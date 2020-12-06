import './env';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { SentryInterceptor } from './components/sentry/sentry.interceptor';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  app.useGlobalInterceptors(new SentryInterceptor());
  // app.setGlobalPrefix('v1');

  app.use(helmet());
  if (
    !process.env.NODE_ENV ||
    (process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== 'development')
  ) {
    app.enableCors();
  } else {
    app.enableCors();
  }

  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const serverSwagger = process.env.SWAGGER_URL || `http://127.0.0.1:${port}/`;
  const options = new DocumentBuilder()
    .setTitle('API Backend')
    .setDescription('API Server')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(`${serverSwagger}`, 'Dev Server')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  if (
    process.env.NODE_ENV &&
    (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'production')
  ) {
    Sentry.init({
      dsn: process.env.SENTRY_DNS || '',
      environment: process.env.NODE_ENV || 'local',
    });
  }
  /* tslint:disable */
  console.log(`Start at:http://127.0.0.1:${port}`); // eslint-disable-line
  await app.startAllMicroservicesAsync();
  /* tslint:enable */
  await app.listen(port);
  // await appMicro.listenAsync();
}

bootstrap();
