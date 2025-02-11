import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const port = process.env.PORT || 3000;

  app.enableCors({ origin: '*' });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: false,
    forbidNonWhitelisted: true,
    }));

    // app.enableCors({
    //   origin: 'https://localhost:8080',
    //   allowedHeaders: 'Content-Type,Authorization',
    // });
    

  await app.listen(port);
}
bootstrap();
