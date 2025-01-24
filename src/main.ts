import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: true,
    }));

  await app.listen(3000);
}
bootstrap();
