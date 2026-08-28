import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { getCorsOrigins, getEnvironment } from './config/env';

async function bootstrap(): Promise<void> {
  const environment = getEnvironment();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.use(helmet());
  app.enableCors({
    origin: getCorsOrigins(environment),
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');
  app.enableShutdownHooks();

  await app.listen(environment.API_PORT, environment.API_HOST);

  Logger.log(
    `Namo Ride API listening on ${environment.API_HOST}:${environment.API_PORT}`,
    'Bootstrap',
  );
}

void bootstrap();
